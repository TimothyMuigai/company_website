import { NextRequest, NextResponse } from "next/server";
import { UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoDocumentClient, getDynamoTableName } from "@/lib/awsDynamo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiKey = typeof body?.api_key === "string" ? body.api_key : "";
    const apiKeyPreview = typeof body?.api_key_preview === "string" ? body.api_key_preview : "";

    if (!apiKey && !apiKeyPreview) {
      return NextResponse.json({ error: "Missing api_key or api_key_preview in request body." }, { status: 400 });
    }

    const client = getDynamoDocumentClient();
    const tableName = getDynamoTableName();

    let targetKey = apiKey;

    // If only a preview was provided, try to find the full key server-side
    if (!targetKey && apiKeyPreview) {
      // preview is like 'dt_live_abcd...'
      const prefix = apiKeyPreview.replace(/\.\.\.$/, "");

      const scanRes = await client.send(
        new ScanCommand({
          TableName: tableName,
          FilterExpression: "begins_with(api_key, :p)",
          ExpressionAttributeValues: { ":p": prefix },
          Limit: 1,
        }),
      );

      const items = Array.isArray(scanRes.Items) ? scanRes.Items : [];
      if (items.length === 0) {
        return NextResponse.json({ error: "API key not found" }, { status: 404 });
      }
      // @ts-ignore
      targetKey = items[0].api_key;
    }

    await client.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { api_key: targetKey },
        UpdateExpression: "SET #s = :revoked",
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: { ":revoked": "revoked" },
      }),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("/api/revoke-key error", error);
    return NextResponse.json({ error: "Unable to revoke API key." }, { status: 500 });
  }
}

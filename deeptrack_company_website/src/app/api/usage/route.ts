import { NextRequest, NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoDocumentClient, getDynamoTableName } from "@/lib/awsDynamo";

export async function GET(request: NextRequest) {
  try {
    const clientId = request.nextUrl.searchParams.get("clientId") || "";
    if (!clientId) {
      return NextResponse.json({ error: "Missing clientId query parameter." }, { status: 400 });
    }

    const client = getDynamoDocumentClient();
    const tableName = getDynamoTableName();

    const result = await client.send(
      new QueryCommand({
        TableName: tableName,
        IndexName: "client_id-index",
        KeyConditionExpression: "client_id = :cid",
        ExpressionAttributeValues: {
          ":cid": clientId,
        },
      }),
    );

    const items = Array.isArray(result.Items) ? result.Items : [];
    const totalScans = items.reduce((sum, item) => sum + (typeof item.scans_used === "number" ? item.scans_used : 0), 0);

    return NextResponse.json({
      keys: items.map((item) => ({
        api_key_preview: typeof item.api_key === "string" ? item.api_key.slice(0, 12) + "..." : "",
        scans_used: typeof item.scans_used === "number" ? item.scans_used : 0,
        status: typeof item.status === "string" ? item.status : "unknown",
        created_at: typeof item.created_at === "string" ? item.created_at : "",
        plan: typeof item.plan === "string" ? item.plan : "",
      })),
      total_scans: totalScans,
    });
  } catch (error) {
    console.error("/api/usage error", error);
    return NextResponse.json({ error: "Unable to load usage." }, { status: 500 });
  }
}

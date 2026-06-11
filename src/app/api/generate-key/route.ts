import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoDocumentClient, getDynamoTableName } from "@/lib/awsDynamo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientId = typeof body?.clientId === "string" ? body.clientId : "unknown";
    const clientName = typeof body?.clientName === "string" ? body.clientName : "";

    const apiKey = "dt_live_" + crypto.randomBytes(24).toString("hex");
    const client = getDynamoDocumentClient();
    const tableName = getDynamoTableName();

    await client.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          api_key: apiKey,
          client_id: clientId,
          client_name: clientName,
          created_at: new Date().toISOString(),
          status: "active",
          scans_used: 0,
          plan: "payg",
        },
      }),
    );

    return NextResponse.json({ api_key: apiKey, created_at: new Date().toISOString() });
  } catch (error) {
    console.error("/api/generate-key error", error);
    return NextResponse.json(
      { error: "Unable to create API key." },
      { status: 500 },
    );
  }
}

import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getDynamoDocumentClient, getDynamoTableName } from "@/lib/awsDynamo";

export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch (e) {
      body = {};
    }
    const clientId = typeof body?.clientId === "string" ? body.clientId : "unknown";
    const clientName = typeof body?.clientName === "string" ? body.clientName : "";

    // If a DEEPTRACK_API_BASE_URL is configured, proxy the request server-side
    // to the upstream Deeptrack gateway to avoid browser CORS issues.
    const baseUrl = process.env.DEEPTRACK_API_BASE_URL;
    if (baseUrl) {
      try {
        const upstream = await fetch(`${baseUrl}/keys/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ client_id: clientId, client_name: clientName, plan: body?.plan ?? "basic" }),
          cache: "no-store",
        });

        const text = await upstream.text();
        let data: unknown;
        try {
          data = JSON.parse(text as string);
        } catch (e) {
          data = text;
        }

        if (upstream.ok && data && (data as any).api_key) {
          return NextResponse.json(data, { status: 200 });
        }

        console.warn("Upstream key generation failed or returned no api_key, falling back to local generation", { status: upstream.status, details: data });
        // fall through to local generation
      } catch (e) {
        console.error("Upstream key generation request failed, falling back to local generation", e);
        // fall through to local generation
      }
    }

    // Fallback: generate and persist locally in DynamoDB
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

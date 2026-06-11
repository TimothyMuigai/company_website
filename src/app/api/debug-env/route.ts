import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    AWS_REGION: process.env.AWS_REGION || "❌ MISSING",
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID 
      ? `${process.env.AWS_ACCESS_KEY_ID.slice(0, 4)}...${process.env.AWS_ACCESS_KEY_ID.slice(-4)} (${process.env.AWS_ACCESS_KEY_ID.length} chars)`
      : "❌ MISSING",
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY 
      ? `${process.env.AWS_SECRET_ACCESS_KEY.slice(0, 4)}...${process.env.AWS_SECRET_ACCESS_KEY.slice(-4)} (${process.env.AWS_SECRET_ACCESS_KEY.length} chars)`
      : "❌ MISSING",
    DYNAMODB_TABLE: process.env.DYNAMODB_TABLE || "❌ MISSING",
    NEXT_PUBLIC_GOTHAM_ENDPOINT: process.env.NEXT_PUBLIC_GOTHAM_ENDPOINT || "❌ MISSING",
  });
}

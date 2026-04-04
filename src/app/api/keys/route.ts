import { NextRequest, NextResponse } from "next/server";

const DEFAULT_BASE_URL = "https://facedetectionsystem-staging.onrender.com";

export async function POST(request: NextRequest) {
  const baseUrl = process.env.DEEPTRACK_API_BASE_URL || DEFAULT_BASE_URL;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const upstream = await fetch(`${baseUrl}/keys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await upstream.json();
  if (!upstream.ok) {
    return NextResponse.json(
      {
        error: "Deeptrack key creation failed",
        details: data,
      },
      { status: upstream.status },
    );
  }

  return NextResponse.json(data, { status: 200 });
}

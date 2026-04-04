import { NextRequest, NextResponse } from "next/server";

const DEFAULT_BASE_URL = "https://facedetectionsystem-staging.onrender.com";

export const DEEPTRACK_ADMIN_BASE_URL =
  process.env.DEEPTRACK_API_BASE_URL || DEFAULT_BASE_URL;

export function getAdminSecret() {
  return (
    process.env.DEEPTRACK_ADMIN_SECRET ||
    process.env.ADMIN_API_KEY ||
    ""
  ).trim();
}

export function buildAdminHeaders(contentTypeJson = false) {
  const secret = getAdminSecret();
  const headers: Record<string, string> = {
    "X-Admin-Secret": secret,
  };

  if (contentTypeJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

export function ensureAdminConfigured() {
  if (!getAdminSecret()) {
    return NextResponse.json(
      { error: "Missing DEEPTRACK_ADMIN_SECRET environment variable" },
      { status: 500 },
    );
  }

  return null;
}

export async function parseBody(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function toUpstreamError(status: number, errorBody: unknown) {
  return NextResponse.json(
    {
      error: "Deeptrack API request failed",
      details: errorBody,
    },
    { status },
  );
}

import { NextRequest, NextResponse } from "next/server";

const DEFAULT_BASE_URL = "https://facedetectionsystem-test-auth.onrender.com";

export const DEEPTRACK_ADMIN_BASE_URL =
  process.env.DEEPTRACK_API_BASE_URL || DEFAULT_BASE_URL;

export function getAuthToken(request: NextRequest): string {
  return request.headers.get("Authorization") || "";
}

export function buildAdminHeaders(request: NextRequest, contentTypeJson = false) {
  const headers: Record<string, string> = {
    "Authorization": getAuthToken(request),
  };
  if (contentTypeJson) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}

export function ensureAdminConfigured(request: NextRequest) {
  if (!getAuthToken(request)) {
    return NextResponse.json(
      { error: "Missing Authorization header" },
      { status: 401 },
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
    { error: "Deeptrack API request failed", details: errorBody },
    { status },
  );
}
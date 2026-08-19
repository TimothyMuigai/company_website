import { NextRequest, NextResponse } from "next/server";
import {
  DEEPTRACK_ADMIN_BASE_URL,
  buildAdminHeaders,
  ensureAdminConfigured,
  parseBody,
  toUpstreamError,
} from "../_utils";

export async function GET() {
  const configError = ensureAdminConfigured();
  if (configError) return configError;

  const response = await fetch(`${DEEPTRACK_ADMIN_BASE_URL}/admin/keys`, {
    method: "GET",
    headers: buildAdminHeaders(),
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok) {
    return toUpstreamError(response.status, data);
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest) {
  const configError = ensureAdminConfigured();
  if (configError) return configError;

  const body = await parseBody(request);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const response = await fetch(`${DEEPTRACK_ADMIN_BASE_URL}/admin/keys`, {
    method: "POST",
    headers: buildAdminHeaders(true),
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok) {
    return toUpstreamError(response.status, data);
  }

  return NextResponse.json(data, { status: 200 });
}

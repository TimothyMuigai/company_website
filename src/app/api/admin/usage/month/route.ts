import { NextRequest, NextResponse } from "next/server";
import {
  DEEPTRACK_ADMIN_BASE_URL,
  buildAdminHeaders,
  ensureAdminConfigured,
  toUpstreamError,
} from "../../../admin/_utils";

export async function GET(request: NextRequest) {
  const configError = ensureAdminConfigured(request);
  if (configError) return configError;

  const response = await fetch(`${DEEPTRACK_ADMIN_BASE_URL}/admin/usage/month`, {
    method: "GET",
    headers: buildAdminHeaders(request),
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok) return toUpstreamError(response.status, data);

  return NextResponse.json(data, { status: 200 });
}
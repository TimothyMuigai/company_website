import { NextRequest, NextResponse } from "next/server";
import {
  DEEPTRACK_ADMIN_BASE_URL,
  buildAdminHeaders,
  ensureAdminConfigured,
  parseBody,
  toUpstreamError,
} from "../../../../admin/_utils";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ keyId: string }> },
) {
  const configError = ensureAdminConfigured();
  if (configError) return configError;

  const body = await parseBody(request);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { keyId } = await params;
  const response = await fetch(
    `${DEEPTRACK_ADMIN_BASE_URL}/admin/keys/${keyId}/plan`,
    {
      method: "PATCH",
      headers: buildAdminHeaders(true),
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  const data = await response.json();
  if (!response.ok) {
    return toUpstreamError(response.status, data);
  }

  return NextResponse.json(data, { status: 200 });
}

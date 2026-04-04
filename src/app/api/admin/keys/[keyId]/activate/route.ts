import { NextResponse } from "next/server";
import {
  DEEPTRACK_ADMIN_BASE_URL,
  buildAdminHeaders,
  ensureAdminConfigured,
  toUpstreamError,
} from "../../../../admin/_utils";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ keyId: string }> },
) {
  const configError = ensureAdminConfigured();
  if (configError) return configError;

  const { keyId } = await params;
  const response = await fetch(
    `${DEEPTRACK_ADMIN_BASE_URL}/admin/keys/${keyId}/activate`,
    {
      method: "PATCH",
      headers: buildAdminHeaders(),
      cache: "no-store",
    },
  );

  const data = await response.json();
  if (!response.ok) {
    return toUpstreamError(response.status, data);
  }

  return NextResponse.json(data, { status: 200 });
}

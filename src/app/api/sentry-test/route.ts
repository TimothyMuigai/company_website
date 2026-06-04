import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

/** Dev-only: visit GET /api/sentry-test to send a test error to Sentry */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
  }
  const err = new Error("DeepTrack Sentry test error — safe to ignore");
  Sentry.captureException(err);
  return NextResponse.json({
    ok: true,
    message: "Test error sent to Sentry. Check your Sentry Issues tab.",
  });
}

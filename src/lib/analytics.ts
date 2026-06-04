import posthog from "posthog-js";

export function isPostHogEnabled(): boolean {
  return Boolean(
    typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY
  );
}

export function trackEvent(
  event: string,
  properties?: Record<string, string | number | boolean | null>
) {
  if (!isPostHogEnabled()) return;
  posthog.capture(event, {
    project: "deeptrack.io",
    ...properties,
  });
}

export const AnalyticsEvents = {
  BOOK_DEMO_SUBMITTED: "book_demo_submitted",
  CONTACT_SUBMITTED: "contact_submitted",
  LEAD_SUBMITTED: "lead_submitted",
  WAITLIST_JOINED: "waitlist_joined",
  REQUEST_ACCESS_SUBMITTED: "request_access_submitted",
  CONSOLE_SCAN_STARTED: "console_scan_started",
} as const;

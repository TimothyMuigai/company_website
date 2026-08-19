// Client-safe helpers for building calendar URLs and formatting event data.

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startsAt: string; // ISO
  endsAt: string; // ISO
  url?: string;
}

function toBasicISO(iso: string): string {
  // 2026-08-14T09:00:00Z -> 20260814T090000Z
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function googleCalendarUrl(e: CalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${toBasicISO(e.startsAt)}/${toBasicISO(e.endsAt)}`,
    details: e.description + (e.url ? `\n\nMore info: ${e.url}` : ""),
    location: e.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarUrl(e: CalendarEvent): string {
  // Works for Outlook.com and Microsoft 365. Events added here appear in Teams calendar
  // for the same account automatically.
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: e.title,
    body: e.description + (e.url ? `\n\nMore info: ${e.url}` : ""),
    location: e.location,
    startdt: new Date(e.startsAt).toISOString(),
    enddt: new Date(e.endsAt).toISOString(),
  });
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function icsDownloadUrl(reference: string): string {
  return `/api/public/bookings/${reference}/ics`;
}

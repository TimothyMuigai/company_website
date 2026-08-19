// Server-safe .ics file builder. Pure string manipulation, no runtime deps.

interface IcsInput {
  uid: string;
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string;
  organizerName?: string;
  organizerEmail?: string;
  url?: string;
}

function fmt(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Fold long lines per RFC 5545 (max 75 octets).
function fold(line: string): string {
  if (line.length <= 74) return line;
  const chunks: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    chunks.push(rest.slice(0, 74));
    rest = rest.slice(74);
  }
  chunks.push(rest);
  return chunks.join("\r\n ");
}

export function buildIcs(input: IcsInput): string {
  const now = fmt(new Date().toISOString());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Centric Essentials Consulting//Event Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${input.uid}@centricessentialsconsulting.co.ke`,
    `DTSTAMP:${now}`,
    `DTSTART:${fmt(input.startsAt)}`,
    `DTEND:${fmt(input.endsAt)}`,
    `SUMMARY:${escapeIcsText(input.title)}`,
    `DESCRIPTION:${escapeIcsText(input.description + (input.url ? `\n\nMore info: ${input.url}` : ""))}`,
    `LOCATION:${escapeIcsText(input.location)}`,
    input.url ? `URL:${input.url}` : null,
    input.organizerEmail
      ? `ORGANIZER;CN=${escapeIcsText(input.organizerName ?? "Centric Essentials")}:mailto:${input.organizerEmail}`
      : null,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean) as string[];

  return lines.map(fold).join("\r\n");
}

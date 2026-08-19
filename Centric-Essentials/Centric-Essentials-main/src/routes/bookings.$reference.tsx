import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getBookingByReference } from "@/lib/events.functions";
import { googleCalendarUrl, outlookCalendarUrl, icsDownloadUrl } from "@/lib/calendar";

export const Route = createFileRoute("/bookings/$reference")({
  loader: async ({ params }) => {
    const booking = await getBookingByReference({ data: { reference: params.reference } });
    if (!booking || !booking.event) throw notFound();
    return { booking };
  },
  component: BookingConfirmationPage,
  head: () => ({
    meta: [
      { title: "Booking Confirmation — Centric Essentials Consulting" },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => (
    <div className="py-32 text-center px-6">
      <h1 className="text-4xl font-bold tracking-tighter mb-4">Booking not found</h1>
      <p className="text-muted-foreground">Check your confirmation email for the correct link.</p>
    </div>
  ),
  errorComponent: () => (
    <div className="py-32 text-center px-6">
      <h1 className="text-4xl font-bold tracking-tighter mb-4">Could not load booking</h1>
    </div>
  ),
});

function BookingConfirmationPage() {
  const { booking } = Route.useLoaderData();
  const event = booking.event!;
  const calEvent = {
    title: event.title,
    description: event.description + (event.meeting_link ? `\n\nJoin: ${event.meeting_link}` : ""),
    location: event.location,
    startsAt: event.starts_at,
    endsAt: event.ends_at,
  };
  const isPaid = booking.status === "paid";

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block h-px w-12 bg-primary mb-8" />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
          {isPaid ? "Booking Confirmed / 01" : "Reservation Received / 01"}
        </span>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-6">
          {isPaid ? "You're all set." : "Reservation received."}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-12">
          {isPaid
            ? `A confirmation has been sent to ${booking.attendee_email}. Add the session to your calendar below.`
            : `We've held your seat. Complete payment to confirm your place. Confirmation email will be sent to ${booking.attendee_email}.`}
        </p>

        <div className="border border-border p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Reference
              </div>
              <div className="font-bold font-mono">{booking.reference}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Attendee
              </div>
              <div className="font-bold">{booking.attendee_name}</div>
              <div className="text-sm text-muted-foreground">{booking.seats} seat(s)</div>
            </div>
            <div className="md:col-span-2">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Training
              </div>
              <div className="text-2xl font-bold tracking-tight mb-1">{event.title}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(event.starts_at).toLocaleString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                — {event.location}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
            Add to your calendar
          </span>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href={googleCalendarUrl(calEvent)}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border p-6 hover:border-primary hover:-translate-y-[2px] transition-all"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                01
              </div>
              <div className="font-bold text-lg mb-1">Google Calendar</div>
              <div className="text-xs text-muted-foreground">Opens Google in a new tab.</div>
            </a>
            <a
              href={outlookCalendarUrl(calEvent)}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border p-6 hover:border-primary hover:-translate-y-[2px] transition-all"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                02
              </div>
              <div className="font-bold text-lg mb-1">Outlook / Teams</div>
              <div className="text-xs text-muted-foreground">
                Appears in your Teams calendar automatically.
              </div>
            </a>
            <a
              href={icsDownloadUrl(booking.reference)}
              className="border border-border p-6 hover:border-primary hover:-translate-y-[2px] transition-all"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                03
              </div>
              <div className="font-bold text-lg mb-1">Apple / iCal (.ics)</div>
              <div className="text-xs text-muted-foreground">
                Works with Apple Calendar, Outlook desktop, any calendar app.
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/events"
            className="px-8 py-4 border border-border font-bold uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-colors"
          >
            Browse more events
          </Link>
          <Link
            to="/"
            className="px-8 py-4 font-bold uppercase tracking-widest text-xs hover:text-primary transition-colors"
          >
            Back home →
          </Link>
        </div>
      </div>
    </section>
  );
}

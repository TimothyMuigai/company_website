import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, CTABand } from "@/components/site-chrome";
import { listPublishedEvents } from "@/lib/events.functions";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({
    meta: [
      { title: "Upcoming Trainings & Events — Centric Essentials Consulting" },
      {
        name: "description",
        content:
          "Book upcoming corporate training and executive workshops on creative problem-solving and analytical decision-making. Live cohorts and hybrid sessions.",
      },
      { property: "og:title", content: "Upcoming Trainings & Events" },
      {
        property: "og:description",
        content: "Book upcoming corporate training and executive workshops.",
      },
    ],
  }),
});

function formatMoney(cents: number, currency: string) {
  if (cents === 0) return "Free";
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(
    cents / 100,
  );
}
function formatDate(iso: string, tz: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
    timeZoneName: "short",
  }).format(new Date(iso));
}

function EventsPage() {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events", "published"],
    queryFn: () => listPublishedEvents(),
  });

  return (
    <>
      <PageHeader
        eyebrow="Events / 01"
        title={<>Upcoming trainings <span className="text-primary">& workshops.</span></>}
        intro="Live cohorts and executive workshops. Book your seat, receive an instant calendar invite for Google, Outlook / Teams, and Apple."
      />

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          {isLoading && (
            <div className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Loading events…
            </div>
          )}
          {!isLoading && (events?.length ?? 0) === 0 && (
            <div className="border border-border p-16 text-center">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                Schedule
              </div>
              <h2 className="text-2xl font-bold mb-3">No upcoming events</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                New training cohorts are announced regularly. Contact us to enquire about custom
                sessions for your team.
              </p>
              <Link
                to="/contact"
                className="inline-block mt-8 px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:-translate-y-[2px] transition-transform"
              >
                Enquire
              </Link>
            </div>
          )}
          <div className="border border-border divide-y divide-border">
            {events?.map((event, i) => (
              <Link
                key={event.id}
                to="/events/$slug"
                params={{ slug: event.slug }}
                className="grid md:grid-cols-12 gap-6 p-8 hover:bg-secondary/50 transition-colors group"
              >
                <div className="md:col-span-2">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                    E.{String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {formatDate(event.starts_at, event.timezone)}
                  </div>
                </div>
                <div className="md:col-span-6">
                  <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{event.summary}</p>
                  {event.facilitator && (
                    <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Led by {event.facilitator}
                    </div>
                  )}
                </div>
                <div className="md:col-span-2 text-sm">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                    Location
                  </div>
                  <div>{event.location}</div>
                </div>
                <div className="md:col-span-2 flex md:flex-col md:items-end justify-between gap-2">
                  <div className="text-2xl font-bold tracking-tighter">
                    {formatMoney(event.price_cents, event.currency)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest border-b border-primary pb-1">
                    Book →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Need custom training for your team?"
        body="We design bespoke cohorts for corporate and SME clients across regions."
        ctaLabel="Talk to Us"
      />
    </>
  );
}

import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { getEventBySlug, createBooking } from "@/lib/events.functions";

export const Route = createFileRoute("/events/$slug")({
  loader: async ({ params }) => {
    const event = await getEventBySlug({ data: { slug: params.slug } });
    if (!event) throw notFound();
    return { event };
  },
  component: EventDetailPage,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.event.title ?? "Event"} — Centric Essentials Consulting` },
      { name: "description", content: loaderData?.event.summary ?? "" },
      { property: "og:title", content: loaderData?.event.title ?? "Event" },
      { property: "og:description", content: loaderData?.event.summary ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="py-32 text-center px-6">
      <h1 className="text-4xl font-bold tracking-tighter mb-4">Event not found</h1>
      <p className="text-muted-foreground">This event may have ended or been unlisted.</p>
    </div>
  ),
  errorComponent: () => (
    <div className="py-32 text-center px-6">
      <h1 className="text-4xl font-bold tracking-tighter mb-4">Unable to load event</h1>
    </div>
  ),
});

function money(cents: number, currency: string) {
  if (cents === 0) return "Free";
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}
function date(iso: string, tz: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
    timeZoneName: "short",
  }).format(new Date(iso));
}

function EventDetailPage() {
  const { event } = Route.useLoaderData();
  const { data: fresh } = useQuery({
    queryKey: ["event", event.slug],
    queryFn: () => getEventBySlug({ data: { slug: event.slug } }),
    initialData: event,
  });
  const e = fresh ?? event;
  const seatsLeft = Math.max(0, e.capacity - (e.seats_taken ?? 0));

  const navigate = useNavigate();
  const book = useServerFn(createBooking);
  const [submitting, setSubmitting] = useState(false);
  const [seats, setSeats] = useState(1);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    setSubmitting(true);
    try {
      const res = await book({
        data: {
          event_id: e.id,
          attendee_name: String(fd.get("name") || ""),
          attendee_email: String(fd.get("email") || ""),
          attendee_phone: String(fd.get("phone") || ""),
          company: String(fd.get("company") || ""),
          seats: Number(fd.get("seats") || 1),
          notes: String(fd.get("notes") || ""),
        },
      });
      if (res.requiresPayment) {
        toast.success("Reservation created — payment step coming soon");
      } else {
        toast.success("You're booked!");
      }
      navigate({ to: "/bookings/$reference", params: { reference: res.reference } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create booking");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="pt-24 pb-16 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="inline-block h-px w-12 bg-primary mb-8" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
              Training / {e.slug}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-balance mb-6">
              {e.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{e.summary}</p>
          </div>
          <div className="lg:col-span-4">
            <div className="border border-border p-8 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  When
                </div>
                <div className="font-bold">{date(e.starts_at, e.timezone)}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Ends {date(e.ends_at, e.timezone)}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Where
                </div>
                <div className="font-bold">{e.location}</div>
              </div>
              {e.facilitator && (
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                    Facilitator
                  </div>
                  <div className="font-bold">{e.facilitator}</div>
                </div>
              )}
              <div className="border-t border-border pt-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Price per seat
                </div>
                <div className="text-3xl font-bold tracking-tighter">
                  {money(e.price_cents, e.currency)}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {seatsLeft > 0 ? `${seatsLeft} seats remaining` : "Sold out"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
              About this training
            </span>
            <div className="prose prose-neutral max-w-none whitespace-pre-line text-foreground/90 leading-relaxed">
              {e.description}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-border p-8 sticky top-32">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
                Reserve your seat
              </span>
              {seatsLeft === 0 ? (
                <p className="text-muted-foreground">
                  This session is fully booked. Contact us to join the waitlist.
                </p>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <Field name="name" label="Full name" required maxLength={120} />
                  <Field name="email" label="Email" type="email" required maxLength={254} />
                  <Field name="phone" label="Phone (optional)" type="tel" maxLength={40} />
                  <Field name="company" label="Company / Organization (optional)" maxLength={200} />
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      Seats
                    </label>
                    <input
                      name="seats"
                      type="number"
                      min={1}
                      max={Math.min(20, seatsLeft)}
                      value={seats}
                      onChange={(ev) => setSeats(Number(ev.target.value))}
                      className="w-full border border-border bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      Notes (optional)
                    </label>
                    <textarea
                      name="notes"
                      maxLength={1000}
                      rows={3}
                      className="w-full border border-border bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        Total
                      </div>
                      <div className="text-2xl font-bold tracking-tighter">
                        {money(e.price_cents * seats, e.currency)}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:-translate-y-[2px] transition-transform disabled:opacity-50"
                    >
                      {submitting ? "Booking…" : e.price_cents === 0 ? "Confirm Booking" : "Reserve Seat"}
                    </button>
                  </div>
                  {e.price_cents > 0 && (
                    <p className="text-[11px] text-muted-foreground">
                      You'll be redirected to secure payment after reservation.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  maxLength,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className="w-full border border-border bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
      />
    </div>
  );
}

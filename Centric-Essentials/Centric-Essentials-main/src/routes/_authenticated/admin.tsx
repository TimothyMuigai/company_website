import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  adminListEvents,
  adminUpsertEvent,
  adminDeleteEvent,
  adminListBookings,
  isCurrentUserAdmin,
  claimFirstAdmin,
} from "@/lib/events.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin — Centric Essentials" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

interface EventRow {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  location: string;
  meeting_link: string | null;
  starts_at: string;
  ends_at: string;
  timezone: string;
  capacity: number;
  price_cents: number;
  currency: string;
  is_published: boolean;
  facilitator: string | null;
}

function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60_000);
  return local.toISOString().slice(0, 16);
}

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"events" | "bookings">("events");
  const [editing, setEditing] = useState<EventRow | "new" | null>(null);

  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const { data: adminCheck, isLoading: checking } = useQuery({
    queryKey: ["is-admin"],
    queryFn: () => checkAdmin(),
  });

  const listEvents = useServerFn(adminListEvents);
  const listBookings = useServerFn(adminListBookings);
  const upsert = useServerFn(adminUpsertEvent);
  const del = useServerFn(adminDeleteEvent);

  const { data: events } = useQuery({
    queryKey: ["admin", "events"],
    queryFn: () => listEvents(),
    enabled: adminCheck?.isAdmin === true,
  });
  const { data: bookings } = useQuery({
    queryKey: ["admin", "bookings"],
    queryFn: () => listBookings(),
    enabled: adminCheck?.isAdmin === true,
  });

  const upsertMut = useMutation({
    mutationFn: (v: { id?: string; event: any }) => upsert({ data: v }),
    onSuccess: () => {
      toast.success("Saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin", "events"] });
      qc.invalidateQueries({ queryKey: ["events", "published"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Save failed"),
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin", "events"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  useEffect(() => {
    if (!checking && adminCheck && !adminCheck.isAdmin) {
      toast.error("Admin access required. Ask an existing admin to grant your account.");
    }
  }, [checking, adminCheck]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (checking) {
    return <div className="py-32 text-center font-mono text-xs uppercase tracking-widest">Loading…</div>;
  }

  if (!adminCheck?.isAdmin) {
    return <NoAdmin onGranted={() => qc.invalidateQueries({ queryKey: ["is-admin"] })} onSignOut={signOut} />;
  }


  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-2">
              Admin console
            </span>
            <h1 className="text-4xl font-bold tracking-tighter">Manage events & bookings</h1>
          </div>
          <button
            onClick={signOut}
            className="text-[11px] font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-primary"
          >
            Sign out
          </button>
        </div>

        <div className="flex gap-8 border-b border-border mb-8">
          {(["events", "bookings"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-4 text-[11px] font-bold uppercase tracking-widest border-b-2 -mb-px ${
                tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "events" && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setEditing("new")}
                className="px-6 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:-translate-y-[2px] transition-transform"
              >
                + New event
              </button>
            </div>
            <div className="border border-border divide-y divide-border">
              {(events ?? []).map((e) => (
                <div key={e.id} className="grid md:grid-cols-12 gap-4 p-6">
                  <div className="md:col-span-6">
                    <div className="font-bold text-lg">{e.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(e.starts_at).toLocaleString()} — {e.location}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground mt-1">/{e.slug}</div>
                  </div>
                  <div className="md:col-span-2 text-sm">
                    {e.price_cents === 0
                      ? "Free"
                      : new Intl.NumberFormat("en-US", { style: "currency", currency: e.currency }).format(
                          e.price_cents / 100,
                        )}
                  </div>
                  <div className="md:col-span-2 text-sm">
                    {e.is_published ? "Published" : "Draft"}
                  </div>
                  <div className="md:col-span-2 flex gap-3 justify-end text-[11px] font-bold uppercase tracking-widest">
                    <button
                      onClick={() => setEditing(e as EventRow)}
                      className="border-b border-primary pb-0.5 hover:text-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this event? This cannot be undone.")) deleteMut.mutate(e.id);
                      }}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {(events ?? []).length === 0 && (
                <div className="p-12 text-center text-muted-foreground">
                  No events yet. Create the first one.
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div className="border border-border divide-y divide-border">
            {(bookings ?? []).map((b: any) => (
              <div key={b.id} className="grid md:grid-cols-12 gap-4 p-6">
                <div className="md:col-span-3">
                  <div className="font-mono text-xs">{b.reference}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(b.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="font-bold">{b.attendee_name}</div>
                  <div className="text-sm text-muted-foreground">{b.attendee_email}</div>
                  {b.company && (
                    <div className="text-xs text-muted-foreground">{b.company}</div>
                  )}
                </div>
                <div className="md:col-span-3 text-sm">
                  <div className="font-bold">{b.event?.title}</div>
                  <div className="text-xs text-muted-foreground">{b.seats} seat(s)</div>
                </div>
                <div className="md:col-span-2 text-right">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {b.status}
                  </div>
                  <div className="font-bold">
                    {b.amount_cents === 0
                      ? "Free"
                      : new Intl.NumberFormat("en-US", { style: "currency", currency: b.currency }).format(
                          b.amount_cents / 100,
                        )}
                  </div>
                </div>
              </div>
            ))}
            {(bookings ?? []).length === 0 && (
              <div className="p-12 text-center text-muted-foreground">No bookings yet.</div>
            )}
          </div>
        )}

        {editing && (
          <EventFormModal
            initial={editing === "new" ? null : editing}
            onClose={() => setEditing(null)}
            onSubmit={(payload, id) => upsertMut.mutate({ id, event: payload })}
            saving={upsertMut.isPending}
          />
        )}
      </div>
    </section>
  );
}

function NoAdmin({ onGranted, onSignOut }: { onGranted: () => void; onSignOut: () => void }) {
  const claim = useServerFn(claimFirstAdmin);
  const [busy, setBusy] = useState(false);
  async function grant() {
    setBusy(true);
    try {
      await claim();
      toast.success("You're now the admin.");
      onGranted();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not claim admin");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
          Access restricted
        </span>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Admin only</h1>
        <p className="text-muted-foreground mb-8">
          If you're the site owner setting this up for the first time, claim admin below.
          Otherwise, ask an existing admin to grant you access.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={grant}
            disabled={busy}
            className="px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:-translate-y-[2px] transition-transform disabled:opacity-50"
          >
            {busy ? "Claiming…" : "Claim first admin"}
          </button>
          <button
            onClick={onSignOut}
            className="px-8 py-4 border border-border font-bold uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-colors"
          >
            Sign out
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-6">
          The claim button only works if no admin exists yet — it locks itself after the first use.
        </p>
      </div>
    </section>
  );
}


function EventFormModal({
  initial,
  onClose,
  onSubmit,
  saving,
}: {
  initial: EventRow | null;
  onClose: () => void;
  onSubmit: (payload: any, id?: string) => void;
  saving: boolean;
}) {
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const startsLocal = String(fd.get("starts_at"));
    const endsLocal = String(fd.get("ends_at"));
    const payload = {
      slug: String(fd.get("slug") || "").trim(),
      title: String(fd.get("title") || "").trim(),
      summary: String(fd.get("summary") || "").trim(),
      description: String(fd.get("description") || "").trim(),
      location: String(fd.get("location") || "").trim(),
      meeting_link: String(fd.get("meeting_link") || "").trim(),
      starts_at: new Date(startsLocal).toISOString(),
      ends_at: new Date(endsLocal).toISOString(),
      timezone: String(fd.get("timezone") || "Africa/Nairobi"),
      capacity: Number(fd.get("capacity") || 30),
      price_cents: Math.round(Number(fd.get("price") || 0) * 100),
      currency: String(fd.get("currency") || "USD").toUpperCase(),
      is_published: fd.get("is_published") === "on",
      facilitator: String(fd.get("facilitator") || "").trim(),
    };
    onSubmit(payload, initial?.id);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto p-6">
      <div className="bg-background border border-border max-w-3xl w-full my-12 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tighter">
            {initial ? "Edit event" : "New event"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Field name="title" label="Title" defaultValue={initial?.title} required maxLength={200} />
            <Field
              name="slug"
              label="Slug (URL)"
              defaultValue={initial?.slug}
              required
              maxLength={200}
              pattern="[a-z0-9-]+"
            />
          </div>
          <Field
            name="summary"
            label="One-line summary"
            defaultValue={initial?.summary}
            required
            maxLength={500}
          />
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Description
            </label>
            <textarea
              name="description"
              required
              maxLength={5000}
              rows={5}
              defaultValue={initial?.description}
              className="w-full border border-border bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field name="location" label="Location" defaultValue={initial?.location} required maxLength={300} />
            <Field
              name="meeting_link"
              label="Meeting link (optional)"
              type="url"
              defaultValue={initial?.meeting_link ?? ""}
              maxLength={500}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Starts
              </label>
              <input
                name="starts_at"
                type="datetime-local"
                required
                defaultValue={initial ? toLocalInput(initial.starts_at) : ""}
                className="w-full border border-border bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Ends
              </label>
              <input
                name="ends_at"
                type="datetime-local"
                required
                defaultValue={initial ? toLocalInput(initial.ends_at) : ""}
                className="w-full border border-border bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
            <Field
              name="timezone"
              label="Timezone (IANA)"
              defaultValue={initial?.timezone ?? "Africa/Nairobi"}
              required
              maxLength={80}
            />
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <Field
              name="capacity"
              label="Capacity"
              type="number"
              defaultValue={String(initial?.capacity ?? 30)}
              required
            />
            <Field
              name="price"
              label="Price"
              type="number"
              step="0.01"
              defaultValue={String((initial?.price_cents ?? 0) / 100)}
              required
            />
            <Field
              name="currency"
              label="Currency (ISO)"
              defaultValue={initial?.currency ?? "USD"}
              required
              maxLength={3}
            />
            <Field
              name="facilitator"
              label="Facilitator"
              defaultValue={initial?.facilitator ?? ""}
              maxLength={200}
            />
          </div>
          <label className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={initial?.is_published ?? true}
              className="w-4 h-4"
            />
            <span className="text-sm">Published (visible on the public events page)</span>
          </label>
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-border font-bold uppercase tracking-widest text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  maxLength,
  pattern,
  step,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  step?: string;
  defaultValue?: string;
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
        pattern={pattern}
        step={step}
        defaultValue={defaultValue}
        className="w-full border border-border bg-transparent px-4 py-3 focus:outline-none focus:border-primary"
      />
    </div>
  );
}

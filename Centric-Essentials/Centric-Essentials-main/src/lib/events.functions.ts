
   
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

function publicClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

// Logs the real Postgres error server-side, throws a safe generic message to the browser.
function fail(context: string, error: unknown, publicMessage: string): never {
  console.error(`[events.functions] ${context}:`, error);
  throw new Error(publicMessage);
}

const EVENT_COLS =
  "id, slug, title, summary, description, location, meeting_link, starts_at, ends_at, timezone, capacity, price_cents, currency, is_published, facilitator";

// --- PUBLIC READS ---

export const listPublishedEvents = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLS)
    .eq("is_published", true)
    .gte("ends_at", new Date().toISOString())
    .order("starts_at", { ascending: true });
  if (error) fail("listPublishedEvents", error, "Unable to load events");
  return data ?? [];
});

export const getEventBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => z.object({ slug: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: event, error } = await supabase
      .from("events")
      .select(EVENT_COLS)
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) fail("getEventBySlug", error, "Unable to load event");
    if (!event) return null;

    // seats remaining — count paid + reserved bookings
    const { count } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("event_id", event.id)
      .in("status", ["reserved", "paid"]);
    return { ...event, seats_taken: count ?? 0 };
  });

// --- BOOKING ---

const bookingSchema = z.object({
  event_id: z.string().uuid(),
  attendee_name: z.string().trim().min(1).max(120),
  attendee_email: z.string().trim().email().max(254),
  attendee_phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  seats: z.number().int().min(1).max(20),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: event, error: evErr } = await supabase
      .from("events")
      .select("id, price_cents, currency, capacity, is_published, title")
      .eq("id", data.event_id)
      .maybeSingle();
    if (evErr) fail("createBooking:lookupEvent", evErr, "Unable to process booking");
    if (!event || !event.is_published) throw new Error("Event not available");

    const { count } = await supabase
      .from("bookings")
      .select("seats", { count: "exact", head: true })
      .eq("event_id", event.id)
      .in("status", ["reserved", "paid"]);
    const taken = count ?? 0;
    if (taken + data.seats > event.capacity) {
      throw new Error(`Only ${Math.max(0, event.capacity - taken)} seats left`);
    }

    const amount = event.price_cents * data.seats;
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        event_id: data.event_id,
        attendee_name: data.attendee_name,
        attendee_email: data.attendee_email,
        attendee_phone: data.attendee_phone || null,
        company: data.company || null,
        seats: data.seats,
        notes: data.notes || null,
        amount_cents: amount,
        currency: event.currency,
        status: amount === 0 ? "paid" : "reserved",
      })
      .select("reference")
      .single();
    if (error) fail("createBooking:insert", error, "Unable to complete booking");
    return { reference: booking.reference, requiresPayment: amount > 0 };
  });

export const getBookingByReference = createServerFn({ method: "GET" })
  .inputValidator((data: { reference: string }) =>
    z.object({ reference: z.string().trim().min(4).max(64) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .select(
        "id, reference, attendee_name, attendee_email, seats, status, amount_cents, currency, event:events(id, slug, title, summary, description, location, meeting_link, starts_at, ends_at, timezone)",
      )
      .eq("reference", data.reference)
      .maybeSingle();
    if (error) fail("getBookingByReference", error, "Unable to load booking");
    return booking;
  });

// --- ADMIN ---

const eventSchema = z.object({
  slug: z.string().trim().min(1).max(200).regex(/^[a-z0-9-]+$/, "lowercase, digits, dashes only"),
  title: z.string().trim().min(1).max(200),
  summary: z.string().trim().min(1).max(500),
  description: z.string().trim().min(1).max(5000),
  location: z.string().trim().min(1).max(300),
  meeting_link: z.string().trim().url().max(500).optional().or(z.literal("")),
  starts_at: z.string().datetime({ offset: true }),
  ends_at: z.string().datetime({ offset: true }),
  timezone: z.string().trim().max(80),
  capacity: z.number().int().min(1).max(1000),
  price_cents: z.number().int().min(0).max(100_000_000),
  currency: z.string().trim().length(3).toUpperCase(),
  is_published: z.boolean(),
  facilitator: z.string().trim().max(200).optional().or(z.literal("")),
});

async function requireAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("is_admin");
  if (error) fail("requireAdmin", error, "Unable to verify permissions");
  if (!data) throw new Error("Forbidden: admin only");
}

export const adminListEvents = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("events")
      .select(EVENT_COLS)
      .order("starts_at", { ascending: true });
    if (error) fail("adminListEvents", error, "Unable to load events");
    return data ?? [];
  });

export const adminUpsertEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().uuid().optional(), event: eventSchema }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      ...data.event,
      meeting_link: data.event.meeting_link || null,
      facilitator: data.event.facilitator || null,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("events").update(row).eq("id", data.id);
      if (error) fail("adminUpsertEvent:update", error, "Unable to save event");
      return { id: data.id };
    }
    const { data: inserted, error } = await supabaseAdmin
      .from("events")
      .insert(row)
      .select("id")
      .single();
    if (error) fail("adminUpsertEvent:insert", error, "Unable to save event");
    return { id: inserted.id };
  });

export const adminDeleteEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("events").delete().eq("id", data.id);
    if (error) fail("adminDeleteEvent", error, "Unable to delete event");
    return { ok: true };
  });

export const adminListBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .select(
        "id, reference, attendee_name, attendee_email, attendee_phone, company, seats, status, amount_cents, currency, created_at, event:events(id, title, slug, starts_at)",
      )
      .order("created_at", { ascending: false });
    if (error) fail("adminListBookings", error, "Unable to load bookings");
    return data ?? [];
  });

export const isCurrentUserAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("is_admin");
    if (error) {
      console.error("[events.functions] isCurrentUserAdmin:", error);
      return { isAdmin: false };
    }
    return { isAdmin: Boolean(data) };
  });

// Bootstrap: grants admin to the caller ONLY if no admins exist yet.
// Locks itself after the first successful use.
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: countErr } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countErr) fail("claimFirstAdmin:count", countErr, "Unable to process request");
    if ((count ?? 0) > 0) {
      throw new Error("Admin already exists. Ask an existing admin to grant you access.");
    }
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) fail("claimFirstAdmin:insert", error, "Unable to grant admin access");
    return { ok: true };
  });
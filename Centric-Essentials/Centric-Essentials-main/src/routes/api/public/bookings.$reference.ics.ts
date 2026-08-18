import { createFileRoute } from "@tanstack/react-router";
import { buildIcs } from "@/lib/ics";

export const Route = createFileRoute("/api/public/bookings/$reference/ics")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const reference = String(params.reference || "").trim();
        if (!/^[A-Za-z0-9-]{4,64}$/.test(reference)) {
          return new Response("Invalid reference", { status: 400 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin
          .from("bookings")
          .select(
            "id, reference, event:events(title, description, location, meeting_link, starts_at, ends_at)",
          )
          .eq("reference", reference)
          .maybeSingle();
        if (error) return new Response("Server error", { status: 500 });
        if (!data || !data.event) return new Response("Not found", { status: 404 });

        const event = data.event as {
          title: string;
          description: string;
          location: string;
          meeting_link: string | null;
          starts_at: string;
          ends_at: string;
        };

        const ics = buildIcs({
          uid: data.id,
          title: event.title,
          description: event.description,
          location: event.location + (event.meeting_link ? ` (${event.meeting_link})` : ""),
          startsAt: event.starts_at,
          endsAt: event.ends_at,
          organizerName: "Centric Essentials Consulting",
        });

        return new Response(ics, {
          headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": `attachment; filename="${reference}.ics"`,
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});

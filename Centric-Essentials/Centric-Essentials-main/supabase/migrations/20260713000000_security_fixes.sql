-- Move has_role out of the API-exposed public schema so it can't be called
-- directly via RPC by authenticated users, while still working inside RLS policies.
CREATE SCHEMA IF NOT EXISTS private;
ALTER FUNCTION public.has_role(UUID, public.app_role) SET SCHEMA private;

REVOKE ALL ON FUNCTION private.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.has_role(UUID, public.app_role) TO service_role;
REVOKE USAGE ON SCHEMA private FROM PUBLIC, anon, authenticated;

-- Secure booking lookup: attendee needs BOTH the reference code AND the email
-- used at booking time. This lets customers view their own confirmation
-- without any broad SELECT policy on the bookings table.
CREATE OR REPLACE FUNCTION public.get_booking_by_reference(p_reference TEXT, p_email TEXT)
RETURNS TABLE (
  id UUID,
  reference TEXT,
  attendee_name TEXT,
  seats INTEGER,
  status public.booking_status,
  amount_cents INTEGER,
  currency TEXT,
  event_id UUID,
  created_at TIMESTAMPTZ
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT id, reference, attendee_name, seats, status, amount_cents, currency, event_id, created_at
  FROM public.bookings
  WHERE reference = p_reference AND lower(attendee_email) = lower(p_email)
$$;

REVOKE ALL ON FUNCTION public.get_booking_by_reference(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_booking_by_reference(TEXT, TEXT) TO anon, authenticated;
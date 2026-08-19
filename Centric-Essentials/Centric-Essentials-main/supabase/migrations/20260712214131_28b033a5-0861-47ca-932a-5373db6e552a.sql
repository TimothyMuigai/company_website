
-- Tighten anon booking policy: require valid published event
DROP POLICY "Anyone can create booking" ON public.bookings;
DROP POLICY "Authenticated can create booking" ON public.bookings;

CREATE POLICY "Anyone books published event" ON public.bookings FOR INSERT TO anon
WITH CHECK (EXISTS (SELECT 1 FROM public.events e WHERE e.id = event_id AND e.is_published = true));

CREATE POLICY "Authenticated books published event" ON public.bookings FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.events e WHERE e.id = event_id AND e.is_published = true));

-- Lock down has_role execution to authenticated only (policies still work)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

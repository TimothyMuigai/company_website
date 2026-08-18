-- Safe to expose via RPC: only ever checks the CALLING user's own admin status,
-- never an arbitrary user_id, so it can't be used to enumerate other users' roles.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT private.has_role(auth.uid(), 'admin') $$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

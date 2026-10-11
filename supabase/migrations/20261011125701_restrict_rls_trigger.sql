-- The dashboard's automatic-RLS event trigger does not need client execution.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

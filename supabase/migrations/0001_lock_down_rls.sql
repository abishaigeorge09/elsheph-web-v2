-- ============================================================================
-- FORMS/RLS LOCKDOWN — run once in the Supabase SQL editor
-- (project gunbkdzoesgiyseinvhw, the tab is already open).
--
-- Before: `contacts` and `university_contacts` carried WITH CHECK (true)
-- INSERT policies for anon — anyone with the public URL and anon key (both
-- shipped in every page load by definition) could write unlimited rows from
-- a browser console.
--
-- After: direct table access for anon/authenticated is fully revoked. The
-- ONLY write path is two SECURITY DEFINER functions that demand a secret;
-- the site's API routes hold it in server env (FORM_SUBMIT_SECRET). The
-- functions store only the secret's SHA-256 — the plaintext never exists in
-- the database.
--
-- To rotate the secret later: generate a new one, update FORM_SUBMIT_SECRET
-- in Vercel + .env.local, and re-run this file with the new hash swapped in.
-- ============================================================================

create extension if not exists pgcrypto with schema extensions;

create or replace function public.submit_contact(
  p_name text, p_email text, p_message text, p_secret text
) returns void language plpgsql security definer set search_path = '' as $fn$
begin
  if encode(extensions.digest(p_secret, 'sha256'), 'hex')
     <> '9db31d18454d886b39c9d98d305398c622b75856262760e313ca55960186c358' then
    raise exception 'not allowed';
  end if;
  if length(trim(p_name)) < 2 or length(trim(p_message)) < 10
     or p_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid submission';
  end if;
  insert into public.contacts (name, email, message)
    values (trim(p_name), trim(p_email), trim(p_message));
end $fn$;

create or replace function public.submit_university_contact(
  p_name text, p_email text, p_university text, p_role text,
  p_message text, p_secret text
) returns void language plpgsql security definer set search_path = '' as $fn$
begin
  if encode(extensions.digest(p_secret, 'sha256'), 'hex')
     <> '9db31d18454d886b39c9d98d305398c622b75856262760e313ca55960186c358' then
    raise exception 'not allowed';
  end if;
  if length(trim(p_name)) < 2 or length(trim(p_message)) < 10
     or length(trim(p_university)) < 2
     or p_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid submission';
  end if;
  insert into public.university_contacts (name, email, university, role, message)
    values (trim(p_name), trim(p_email), trim(p_university), trim(p_role), trim(p_message));
end $fn$;

revoke execute on function public.submit_contact(text,text,text,text) from public;
grant execute on function public.submit_contact(text,text,text,text) to anon;
revoke execute on function public.submit_university_contact(text,text,text,text,text,text) from public;
grant execute on function public.submit_university_contact(text,text,text,text,text,text) to anon;

-- Drop every existing policy on the two tables, whatever it was named.
do $pol$
declare pol record;
begin
  for pol in
    select policyname, tablename from pg_policies
    where schemaname = 'public'
      and tablename in ('contacts', 'university_contacts')
  loop
    execute format('drop policy %I on public.%I', pol.policyname, pol.tablename);
  end loop;
end $pol$;

-- RLS stays enabled; with no policies plus revoked grants, the public roles
-- get nothing.
alter table public.contacts enable row level security;
alter table public.university_contacts enable row level security;
revoke insert, select, update, delete on public.contacts from anon, authenticated;
revoke insert, select, update, delete on public.university_contacts from anon, authenticated;

select 'lockdown applied' as status;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to service_role;

create table private.website_submissions (
  submission_id text primary key,
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('contact', 'newsletter')),
  email text not null check (length(email) between 3 and 254),
  name text, company text, team_size text, service text, message text,
  source text not null check (source in ('contact', 'footer', 'apps')),
  newsletter_consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'reviewed', 'closed'))
);
create index website_submissions_created_at_idx on private.website_submissions (created_at desc);

create table private.newsletter_subscribers (
  email text primary key,
  consent_at timestamptz not null default now(),
  source text not null,
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed')),
  unsubscribed_at timestamptz,
  consent_version text not null default 'website-v1'
);

alter table private.website_submissions enable row level security;
alter table private.newsletter_subscribers enable row level security;
revoke all on private.website_submissions, private.newsletter_subscribers from public, anon, authenticated;
grant select, insert, update on private.website_submissions, private.newsletter_subscribers to service_role;

-- One transaction stores the inquiry and its optional newsletter consent.
-- Invoker privileges and explicit grants restrict this RPC to the server role.
create function public.record_website_submission(submission jsonb)
returns void language plpgsql security invoker set search_path = '' as $$
declare inserted_id text;
begin
  insert into private.website_submissions
    (submission_id, kind, email, name, company, team_size, service, message, source, newsletter_consent)
  values
    (submission->>'submission_id', submission->>'kind', lower(submission->>'email'),
     submission->>'name', submission->>'company', submission->>'team_size',
     submission->>'service', submission->>'message', submission->>'source',
     (submission->>'newsletter_consent')::boolean)
  on conflict (submission_id) do nothing returning submission_id into inserted_id;

  if inserted_id is not null and (submission->>'newsletter_consent')::boolean then
    insert into private.newsletter_subscribers (email, source)
    values (lower(submission->>'email'), submission->>'source')
    -- Never let a replay silently re-subscribe someone who opted out.
    on conflict (email) do nothing;
  end if;
end;
$$;
revoke all on function public.record_website_submission(jsonb) from public, anon, authenticated;
grant execute on function public.record_website_submission(jsonb) to service_role;

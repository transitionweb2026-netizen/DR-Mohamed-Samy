-- Content edit history — a safety net so a content-destroying mistake
-- (whatever the cause: a bad script, a bad save, human error) can never
-- again be unrecoverable. A BEFORE UPDATE trigger snapshots a row's
-- previous content into a history table before every change, regardless
-- of what made the change. /admin's page editor can browse and restore
-- from this history. Safe to re-run: every statement is guarded.

-- ============================================================================
-- 1. page_sections_history
-- ============================================================================
create table if not exists page_sections_history (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references page_sections (id) on delete cascade,
  content jsonb not null,
  schema jsonb not null,
  changed_at timestamptz not null default now(),
  changed_by uuid references profiles (id) on delete set null
);

create index if not exists page_sections_history_section_id_idx
  on page_sections_history (section_id, changed_at desc);

create or replace function log_page_section_change()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if (old.content is distinct from new.content) or (old.schema is distinct from new.schema) then
    insert into page_sections_history (section_id, content, schema, changed_by)
    values (old.id, old.content, old.schema, old.updated_by);
  end if;
  return new;
end;
$$;

drop trigger if exists page_sections_before_update on page_sections;
create trigger page_sections_before_update
  before update on page_sections
  for each row execute function log_page_section_change();

alter table page_sections_history enable row level security;
drop policy if exists "page_sections_history_editor_read" on page_sections_history;
create policy "page_sections_history_editor_read" on page_sections_history
  for select using (is_editor_or_admin());
-- No insert/update/delete policy for any API role - only the trigger
-- function (security definer) ever writes to this table, so history
-- entries can't be edited or deleted through the API, only through
-- direct database access.

-- ============================================================================
-- 2. page_seo_history
-- ============================================================================
create table if not exists page_seo_history (
  id uuid primary key default gen_random_uuid(),
  seo_id uuid not null references page_seo (id) on delete cascade,
  seo_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image_id uuid,
  twitter_title text,
  twitter_description text,
  twitter_image_id uuid,
  robots_index boolean,
  robots_follow boolean,
  structured_data jsonb,
  changed_at timestamptz not null default now(),
  changed_by uuid references profiles (id) on delete set null
);

create index if not exists page_seo_history_seo_id_idx
  on page_seo_history (seo_id, changed_at desc);

create or replace function log_page_seo_change()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if (
    old.seo_title is distinct from new.seo_title or
    old.meta_description is distinct from new.meta_description or
    old.canonical_url is distinct from new.canonical_url or
    old.og_title is distinct from new.og_title or
    old.og_description is distinct from new.og_description or
    old.og_image_id is distinct from new.og_image_id or
    old.twitter_title is distinct from new.twitter_title or
    old.twitter_description is distinct from new.twitter_description or
    old.twitter_image_id is distinct from new.twitter_image_id or
    old.robots_index is distinct from new.robots_index or
    old.robots_follow is distinct from new.robots_follow or
    old.structured_data is distinct from new.structured_data
  ) then
    insert into page_seo_history (
      seo_id, seo_title, meta_description, canonical_url,
      og_title, og_description, og_image_id,
      twitter_title, twitter_description, twitter_image_id,
      robots_index, robots_follow, structured_data, changed_by
    )
    values (
      old.id, old.seo_title, old.meta_description, old.canonical_url,
      old.og_title, old.og_description, old.og_image_id,
      old.twitter_title, old.twitter_description, old.twitter_image_id,
      old.robots_index, old.robots_follow, old.structured_data, old.updated_by
    );
  end if;
  return new;
end;
$$;

drop trigger if exists page_seo_before_update on page_seo;
create trigger page_seo_before_update
  before update on page_seo
  for each row execute function log_page_seo_change();

alter table page_seo_history enable row level security;
drop policy if exists "page_seo_history_admin_read" on page_seo_history;
create policy "page_seo_history_admin_read" on page_seo_history
  for select using (is_admin());

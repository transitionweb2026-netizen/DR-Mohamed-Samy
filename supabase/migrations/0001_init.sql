-- Lumina Liver Care CMS — initial schema
-- Run this once in the Supabase SQL Editor (or via `supabase db push`) on a
-- fresh project. Safe to re-run: every statement is guarded with
-- IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS so re-applying it after
-- a partial run won't error out.

-- ============================================================================
-- 1. Roles
-- ============================================================================
do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type app_role as enum ('admin', 'editor');
  end if;
end $$;

-- ============================================================================
-- 2. profiles — one row per Supabase Auth user, carries the CMS role
-- ============================================================================
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role app_role not null default 'editor',
  created_at timestamptz not null default now()
);

-- New auth.users signups get a profile row automatically (defaults to editor;
-- an admin promotes them afterwards via the Users screen).
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Helper used throughout RLS policies below.
create or replace function is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function is_editor_or_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

-- ============================================================================
-- 3. pages — one row per route, plus one 'global' pseudo-page for
--    Navbar/Footer/shared content that isn't specific to any single route.
-- ============================================================================
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  path text, -- null for the 'global' pseudo-page (not a real route)
  label text not null,
  sort_order int not null default 0
);

-- ============================================================================
-- 4. page_sections — schema (field-type manifest) + content (actual values)
--    per named section within a page. See lib/cms/types.ts for the shape.
-- ============================================================================
create table if not exists page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references pages (id) on delete cascade,
  section_key text not null,
  label text not null,
  sort_order int not null default 0,
  schema jsonb not null default '{}'::jsonb,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references profiles (id) on delete set null,
  unique (page_id, section_key)
);

-- ============================================================================
-- 5. media_assets — uploaded images/videos (Supabase Storage-backed)
-- ============================================================================
create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket_path text not null,
  mime_type text,
  width int,
  height int,
  size_bytes int,
  original_filename text,
  alt_text jsonb not null default '{}'::jsonb,
  uploaded_by uuid references profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- 6. page_seo — one row per page per locale
-- ============================================================================
create table if not exists page_seo (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references pages (id) on delete cascade,
  locale text not null,
  seo_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image_id uuid references media_assets (id) on delete set null,
  twitter_title text,
  twitter_description text,
  twitter_image_id uuid references media_assets (id) on delete set null,
  robots_index boolean not null default true,
  robots_follow boolean not null default true,
  structured_data jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references profiles (id) on delete set null,
  unique (page_id, locale)
);

-- ============================================================================
-- 7. Row Level Security
-- ============================================================================
alter table profiles enable row level security;
alter table pages enable row level security;
alter table page_sections enable row level security;
alter table media_assets enable row level security;
alter table page_seo enable row level security;

-- profiles: a user reads their own row; admins read/write every row.
drop policy if exists "profiles_select_own_or_admin" on profiles;
create policy "profiles_select_own_or_admin" on profiles
  for select using (id = auth.uid() or is_admin());

drop policy if exists "profiles_admin_write" on profiles;
create policy "profiles_admin_write" on profiles
  for all using (is_admin()) with check (is_admin());

-- pages / page_sections / media_assets: public read, editor-or-admin write.
drop policy if exists "pages_public_read" on pages;
create policy "pages_public_read" on pages for select using (true);
drop policy if exists "pages_editor_write" on pages;
create policy "pages_editor_write" on pages
  for all using (is_editor_or_admin()) with check (is_editor_or_admin());

drop policy if exists "page_sections_public_read" on page_sections;
create policy "page_sections_public_read" on page_sections for select using (true);
drop policy if exists "page_sections_editor_write" on page_sections;
create policy "page_sections_editor_write" on page_sections
  for all using (is_editor_or_admin()) with check (is_editor_or_admin());

drop policy if exists "media_assets_public_read" on media_assets;
create policy "media_assets_public_read" on media_assets for select using (true);
drop policy if exists "media_assets_editor_write" on media_assets;
create policy "media_assets_editor_write" on media_assets
  for all using (is_editor_or_admin()) with check (is_editor_or_admin());

-- page_seo: public read, ADMIN-ONLY write (editors cannot touch SEO).
drop policy if exists "page_seo_public_read" on page_seo;
create policy "page_seo_public_read" on page_seo for select using (true);
drop policy if exists "page_seo_admin_write" on page_seo;
create policy "page_seo_admin_write" on page_seo
  for all using (is_admin()) with check (is_admin());

-- ============================================================================
-- 8. Storage — public "media" bucket for uploaded images/videos
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_bucket_public_read" on storage.objects;
create policy "media_bucket_public_read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media_bucket_editor_write" on storage.objects;
create policy "media_bucket_editor_write" on storage.objects
  for insert with check (bucket_id = 'media' and is_editor_or_admin());

drop policy if exists "media_bucket_editor_update" on storage.objects;
create policy "media_bucket_editor_update" on storage.objects
  for update using (bucket_id = 'media' and is_editor_or_admin())
  with check (bucket_id = 'media' and is_editor_or_admin());

drop policy if exists "media_bucket_editor_delete" on storage.objects;
create policy "media_bucket_editor_delete" on storage.objects
  for delete using (bucket_id = 'media' and is_editor_or_admin());

-- ============================================================================
-- 9. Seed the 8 page rows (7 real routes + 1 "global" pseudo-page).
--    Section/content rows are populated by scripts/seed-cms.ts, not here.
-- ============================================================================
insert into pages (slug, path, label, sort_order) values
  ('home', '', 'Home', 0),
  ('about', '/about', 'About the Doctor', 1),
  ('services', '/services', 'Services', 2),
  ('reviews', '/reviews', 'Patient Reviews', 3),
  ('videos', '/videos', 'Videos', 4),
  ('articles', '/articles', 'Articles', 5),
  ('contact', '/contact', 'Contact', 6),
  ('global', null, 'Global (Navbar / Footer / Shared)', 7)
on conflict (slug) do nothing;

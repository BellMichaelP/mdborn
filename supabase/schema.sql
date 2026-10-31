-- Run once in the Supabase SQL editor for the mdborn project.

create table if not exists public.pieces (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'shotgun-shell-flags',
  description text not null default '',
  size text not null default '',
  status text not null default 'available',
  nonprofit text not null default '',
  featured boolean not null default false,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.pieces enable row level security;

-- Anyone can view the gallery.
create policy "Public can read pieces" on public.pieces
  for select using (true);

-- Only signed-in users can change pieces. Public sign-ups must be turned off
-- (Authentication > Sign In / Providers > Allow new users to sign up = off),
-- so the only signed-in user is the admin account you create by hand.
create policy "Admin can insert pieces" on public.pieces
  for insert to authenticated with check (true);
create policy "Admin can update pieces" on public.pieces
  for update to authenticated using (true);
create policy "Admin can delete pieces" on public.pieces
  for delete to authenticated using (true);

-- Public image bucket for artwork photos.
insert into storage.buckets (id, name, public)
values ('art', 'art', true)
on conflict (id) do nothing;

create policy "Admin can upload art" on storage.objects
  for insert to authenticated with check (bucket_id = 'art');
create policy "Admin can update art" on storage.objects
  for update to authenticated using (bucket_id = 'art');
create policy "Admin can delete art" on storage.objects
  for delete to authenticated using (bucket_id = 'art');

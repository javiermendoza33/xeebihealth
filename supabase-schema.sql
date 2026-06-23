-- Run this in your Supabase SQL editor to set up XeebiHealth

-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  role text not null default 'patient' check (role in ('patient', 'doctor', 'admin')),
  avatar_url text,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'patient')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row-level security
alter table public.profiles enable row level security;
create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ── Intake submissions ────────────────────────────────────────────────────────
create table if not exists public.intake_submissions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users on delete cascade not null,
  care_type   text not null,
  answers     jsonb not null default '{}',
  submitted_at timestamptz default now()
);

alter table public.intake_submissions enable row level security;

-- Patients can insert and read their own submissions
create policy "Patients can insert own submissions" on public.intake_submissions
  for insert with check (auth.uid() = user_id);

create policy "Patients can view own submissions" on public.intake_submissions
  for select using (auth.uid() = user_id);

-- Admins can read all submissions
create policy "Admins can view all submissions" on public.intake_submissions
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

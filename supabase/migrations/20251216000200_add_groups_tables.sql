-- Add group_id to posts
alter table posts
add column if not exists group_id uuid references groups(id) on delete cascade;

-- Group Members
create table group_members (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  group_id uuid references groups(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  role text default 'member' not null, -- 'admin', 'member'
  
  constraint unique_group_member unique (group_id, user_id)
);

alter table group_members enable row level security;

create policy "Group members are viewable by everyone."
  on group_members for select
  using ( true );

create policy "Authenticated users can join groups."
  on group_members for insert
  with check ( auth.role() = 'authenticated' );

create policy "Members can leave groups."
  on group_members for delete
  using ( auth.uid() = user_id );

-- Update realtime
alter publication supabase_realtime add table group_members;

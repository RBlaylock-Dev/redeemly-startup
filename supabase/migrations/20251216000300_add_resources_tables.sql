-- Resources (already exists in init.sql, but ensuring we have all columns)
-- In init.sql: title, description, url, category, tags, user_id
-- We might want to ensure 'tags' defaults to empty array if not present, but init.sql defined it as text[].

-- Resource Bookmarks
create table resource_bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  resource_id uuid references resources(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  
  constraint unique_bookmark unique (resource_id, user_id)
);

alter table resource_bookmarks enable row level security;

create policy "Bookmarks are viewable by owner."
  on resource_bookmarks for select
  using ( auth.uid() = user_id );

create policy "Authenticated users can create bookmarks."
  on resource_bookmarks for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can delete own bookmarks."
  on resource_bookmarks for delete
  using ( auth.uid() = user_id );

-- Update realtime
alter publication supabase_realtime add table resources;
alter publication supabase_realtime add table resource_bookmarks;

-- Allow authenticated users to create resources (init.sql didn't explicitly enable insert for resources)
-- init.sql only had "Resources are viewable by everyone."

create policy "Authenticated users can insert resources."
  on resources for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own resources."
  on resources for update
  using ( auth.uid() = user_id );

create policy "Users can delete own resources."
  on resources for delete
  using ( auth.uid() = user_id );

-- Create saved_verses table
create table saved_verses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references profiles(id) not null,
  reference text not null,
  text text not null,
  translation text default 'WEB',
  
  -- Combine user_id and reference to prevent duplicate saves of the exact same verse?
  -- Optional, but good practice.
  constraint unique_user_verse unique (user_id, reference)
);

-- RLS
alter table saved_verses enable row level security;

create policy "Users can view own saved verses"
  on saved_verses for select
  using ( auth.uid() = user_id );

create policy "Users can insert own saved verses"
  on saved_verses for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete own saved verses"
  on saved_verses for delete
  using ( auth.uid() = user_id );

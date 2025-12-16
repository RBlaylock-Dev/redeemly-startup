-- Comments
create table comments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  content text not null
);

alter table comments enable row level security;

create policy "Comments are viewable by everyone."
  on comments for select
  using ( true );

create policy "Authenticated users can create comments."
  on comments for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own comments."
  on comments for update
  using ( auth.uid() = user_id );

create policy "Users can delete own comments."
  on comments for delete
  using ( auth.uid() = user_id );

-- Reactions
create table reactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  type text not null,
  
  -- Prevent multiple reactions of same type on same post by same user?
  -- Or just unique(post_id, user_id) if we only allow one reaction per post per user?
  -- The spec says "Amen / Prayed / Encouraged". Usually these are mutually exclusive or not. 
  -- Let's make them unique per user per post for simplicity (one reaction per post).
  -- Actually, Facebook/LinkedIn allow one. Let's enforce unique(post_id, user_id).
  constraint unique_reaction_per_user_post unique (post_id, user_id)
);

alter table reactions enable row level security;

create policy "Reactions are viewable by everyone."
  on reactions for select
  using ( true );

create policy "Authenticated users can create reactions."
  on reactions for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can delete own reactions."
  on reactions for delete
  using ( auth.uid() = user_id );

-- Update realtime publication
alter publication supabase_realtime add table comments;
alter publication supabase_realtime add table reactions;
alter publication supabase_realtime add table posts;

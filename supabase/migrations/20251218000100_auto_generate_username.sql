-- Update function to handle new user signup with auto-generated username
create or replace function public.handle_new_user()
returns trigger as $$
declare
  username_val text;
begin
  -- Generate a username from email or default
  -- format: emailprefix_randomNumbers
  username_val := split_part(new.email, '@', 1) || '_' || floor(random() * 10000)::text;

  insert into public.profiles (id, full_name, avatar_url, username)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    username_val
  );
  return new;
end;
$$ language plpgsql security definer;

-- Backfill existing profiles that have null username
-- Using a simple predictable format for backfill to avoid collisions easily
UPDATE profiles 
SET username = 'user_' || substr(id::text, 1, 8) 
WHERE username IS NULL;

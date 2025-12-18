-- Create a function that runs on message insert
create or replace function public.handle_new_message_notification()
returns trigger as $$
begin
  -- Insert into notifications table
  -- Note: We assume 'message' is a valid type or text. 
  -- If type is an enum, we might need to alter it, but usually text is fine if no constraint.
  -- Based on notification-bell.tsx, type expects 'reaction' | 'comment' | 'system'. 
  -- We will use 'system' for now or update the frontend to handle 'message'.
  -- Let's use 'system' as a fallback if strict, but 'message' is cleaner. 
  -- We'll insert 'message' and update the frontend type definition.
  
  insert into public.notifications (recipient_id, sender_id, type, entity_id)
  values (new.receiver_id, new.sender_id, 'message', new.id);
  
  return new;
end;
$$ language plpgsql security definer;

-- Create the trigger
create trigger on_new_message
  after insert on public.messages
  for each row execute procedure public.handle_new_message_notification();

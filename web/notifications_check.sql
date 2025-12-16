-- 1. Create notifications table if not exists
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient_id UUID REFERENCES auth.users(id) NOT NULL,
    actor_id UUID REFERENCES profiles(id) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('reaction', 'comment', 'system')),
    entity_id UUID NOT NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('post', 'comment', 'group')),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 3. Policies
CREATE POLICY "Users can view their own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = recipient_id);

CREATE POLICY "System/Users can insert notifications"
ON public.notifications FOR INSERT
WITH CHECK (true); -- Server actions handle logic, or auth.uid() checks

CREATE POLICY "Users can update their own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = recipient_id);

-- 4. Enable Realtime (CRITICAL FOR BELL TO RING)
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.messages;

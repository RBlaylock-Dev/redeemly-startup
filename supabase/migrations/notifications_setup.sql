-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  actor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('reaction', 'comment', 'system')),
  entity_id UUID NOT NULL, -- ID of the post, comment, etc.
  entity_type TEXT NOT NULL CHECK (entity_type IN ('post', 'comment', 'group')),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications" 
ON notifications FOR SELECT 
TO authenticated 
USING (auth.uid() = recipient_id);

-- System/Triggers usually insert, but for now allow authenticated users to insert 
-- (e.g., via server actions acting on behalf of the actor)
CREATE POLICY "Users can insert notifications" 
ON notifications FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = actor_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" 
ON notifications FOR UPDATE 
TO authenticated 
USING (auth.uid() = recipient_id);

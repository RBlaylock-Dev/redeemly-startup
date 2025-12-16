-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages sent to them or by them
CREATE POLICY "Users can view own messages" 
ON messages FOR SELECT 
TO authenticated 
USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);

-- Users can insert messages where they are the sender
CREATE POLICY "Users can send messages" 
ON messages FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = sender_id);

-- Enable Realtime for messages
alter publication supabase_realtime add table messages;

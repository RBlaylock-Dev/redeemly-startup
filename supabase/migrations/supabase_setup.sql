-- 1. Add image_url column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Create a new storage bucket for post images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up security policies for the bucket
-- Allow public access to view images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'post-images' );

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK ( bucket_id = 'post-images' );

-- Allow users to update/delete their own images (optional, good practice)
CREATE POLICY "Users can update own images" 
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'post-images' AND auth.uid() = owner );

CREATE POLICY "Users can delete own images" 
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'post-images' AND auth.uid() = owner );

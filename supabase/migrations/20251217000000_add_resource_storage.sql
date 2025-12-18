-- Add type column to resources
ALTER TABLE resources ADD COLUMN IF NOT EXISTS type text DEFAULT 'Article';

-- Storage Bucket for Resources
INSERT INTO storage.buckets (id, name, public)
VALUES ('resource-files', 'resource-files', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for Storage
CREATE POLICY "Resource files are viewable by everyone"
ON storage.objects FOR SELECT
USING ( bucket_id = 'resource-files' );

CREATE POLICY "Authenticated users can upload resource files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'resource-files'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own resource files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'resource-files'
  AND auth.uid() = owner
);

CREATE POLICY "Users can delete their own resource files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'resource-files'
  AND auth.uid() = owner
);

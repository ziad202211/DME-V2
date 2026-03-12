-- Fix Storage RLS policies to allow admin operations from client
-- Run this in your Supabase SQL Editor

-- Drop existing restrictive storage policies
DROP POLICY IF EXISTS "Public can view service images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload service images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update service images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete service images" ON storage.objects;

DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;

DROP POLICY IF EXISTS "Public can view about images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload about images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update about images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete about images" ON storage.objects;

DROP POLICY IF EXISTS "Public can view hero images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload hero images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update hero images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete hero images" ON storage.objects;

DROP POLICY IF EXISTS "Public can view home images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload home images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update home images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete home images" ON storage.objects;

DROP POLICY IF EXISTS "Public can view team photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload team photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update team photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete team photos" ON storage.objects;

DROP POLICY IF EXISTS "Public can view brand assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload brand assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update brand assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete brand assets" ON storage.objects;

DROP POLICY IF EXISTS "Public can view documents" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update documents" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete documents" ON storage.objects;

DROP POLICY IF EXISTS "Admins can view contact attachments" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload contact attachments" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update contact attachments" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete contact attachments" ON storage.objects;

-- Create new permissive storage policies
-- Public buckets - allow full access for development
CREATE POLICY "Allow full access to service images" ON storage.objects FOR ALL USING (bucket_id = 'service-images');
CREATE POLICY "Allow full access to project images" ON storage.objects FOR ALL USING (bucket_id = 'project-images');
CREATE POLICY "Allow full access to about images" ON storage.objects FOR ALL USING (bucket_id = 'about-images');
CREATE POLICY "Allow full access to hero images" ON storage.objects FOR ALL USING (bucket_id = 'hero-images');
CREATE POLICY "Allow full access to home images" ON storage.objects FOR ALL USING (bucket_id = 'home-images');
CREATE POLICY "Allow full access to team photos" ON storage.objects FOR ALL USING (bucket_id = 'team-photos');
CREATE POLICY "Allow full access to brand assets" ON storage.objects FOR ALL USING (bucket_id = 'brand-assets');
CREATE POLICY "Allow full access to documents" ON storage.objects FOR ALL USING (bucket_id = 'documents');
CREATE POLICY "Allow full access to contact attachments" ON storage.objects FOR ALL USING (bucket_id = 'contact-attachments');

-- Verify storage policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage'
ORDER BY policyname;

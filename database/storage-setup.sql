-- Storage Buckets Setup for DME Website
-- Run this in your Supabase SQL Editor

-- Create storage buckets for different content types

-- 1. Service Images Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'service-images',
  'service-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- 2. Project Images Bucket  
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  10485760, -- 10MB limit (projects may have larger images)
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- 3. About Page Images Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'about-images',
  'about-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- 4. Home Page Hero Images Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'hero-images',
  'hero-images',
  true,
  10485760, -- 10MB limit for hero backgrounds
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- 5. Team Member Photos Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'team-photos',
  'team-photos',
  true,
  3145728, -- 3MB limit for profile photos
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- 6. Company Logo/Brand Assets Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'brand-assets',
  'brand-assets',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- 7. Documents/Files Bucket (for PDFs, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  true,
  10485760, -- 10MB limit for documents
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
) ON CONFLICT (id) DO NOTHING;

-- 8. Contact Form Attachments Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'contact-attachments',
  'contact-attachments',
  false, -- Private bucket for contact attachments
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain']
) ON CONFLICT (id) DO NOTHING;

-- Create Row Level Security (RLS) policies for public buckets

-- Service Images - Public read access
CREATE POLICY "Public can view service images" ON storage.objects 
FOR SELECT USING (bucket_id = 'service-images');

CREATE POLICY "Admins can upload service images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'service-images' AND auth.role() = 'service_role');

CREATE POLICY "Admins can update service images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'service-images' AND auth.role() = 'service_role');

CREATE POLICY "Admins can delete service images" ON storage.objects 
FOR DELETE USING (bucket_id = 'service-images' AND auth.role() = 'service_role');

-- Project Images - Public read access
CREATE POLICY "Public can view project images" ON storage.objects 
FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'service_role');

CREATE POLICY "Admins can update project images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'project-images' AND auth.role() = 'service_role');

CREATE POLICY "Admins can delete project images" ON storage.objects 
FOR DELETE USING (bucket_id = 'project-images' AND auth.role() = 'service_role');

-- About Images - Public read access
CREATE POLICY "Public can view about images" ON storage.objects 
FOR SELECT USING (bucket_id = 'about-images');

CREATE POLICY "Admins can upload about images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'about-images' AND auth.role() = 'service_role');

CREATE POLICY "Admins can update about images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'about-images' AND auth.role() = 'service_role');

CREATE POLICY "Admins can delete about images" ON storage.objects 
FOR DELETE USING (bucket_id = 'about-images' AND auth.role() = 'service_role');

-- Hero Images - Public read access
CREATE POLICY "Public can view hero images" ON storage.objects 
FOR SELECT USING (bucket_id = 'hero-images');

CREATE POLICY "Admins can upload hero images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'hero-images' AND auth.role() = 'service_role');

CREATE POLICY "Admins can update hero images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'hero-images' AND auth.role() = 'service_role');

CREATE POLICY "Admins can delete hero images" ON storage.objects 
FOR DELETE USING (bucket_id = 'hero-images' AND auth.role() = 'service_role');

-- Team Photos - Public read access
CREATE POLICY "Public can view team photos" ON storage.objects 
FOR SELECT USING (bucket_id = 'team-photos');

CREATE POLICY "Admins can upload team photos" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'team-photos' AND auth.role() = 'service_role');

CREATE POLICY "Admins can update team photos" ON storage.objects 
FOR UPDATE USING (bucket_id = 'team-photos' AND auth.role() = 'service_role');

CREATE POLICY "Admins can delete team photos" ON storage.objects 
FOR DELETE USING (bucket_id = 'team-photos' AND auth.role() = 'service_role');

-- Brand Assets - Public read access
CREATE POLICY "Public can view brand assets" ON storage.objects 
FOR SELECT USING (bucket_id = 'brand-assets');

CREATE POLICY "Admins can upload brand assets" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'brand-assets' AND auth.role() = 'service_role');

CREATE POLICY "Admins can update brand assets" ON storage.objects 
FOR UPDATE USING (bucket_id = 'brand-assets' AND auth.role() = 'service_role');

CREATE POLICY "Admins can delete brand assets" ON storage.objects 
FOR DELETE USING (bucket_id = 'brand-assets' AND auth.role() = 'service_role');

-- Documents - Public read access
CREATE POLICY "Public can view documents" ON storage.objects 
FOR SELECT USING (bucket_id = 'documents');

CREATE POLICY "Admins can upload documents" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'service_role');

CREATE POLICY "Admins can update documents" ON storage.objects 
FOR UPDATE USING (bucket_id = 'documents' AND auth.role() = 'service_role');

CREATE POLICY "Admins can delete documents" ON storage.objects 
FOR DELETE USING (bucket_id = 'documents' AND auth.role() = 'service_role');

-- Contact Attachments - Private (only admins can access)
CREATE POLICY "Admins can view contact attachments" ON storage.objects 
FOR SELECT USING (bucket_id = 'contact-attachments' AND auth.role() = 'service_role');

CREATE POLICY "Admins can upload contact attachments" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'contact-attachments' AND auth.role() = 'service_role');

CREATE POLICY "Admins can update contact attachments" ON storage.objects 
FOR UPDATE USING (bucket_id = 'contact-attachments' AND auth.role() = 'service_role');

CREATE POLICY "Admins can delete contact attachments" ON storage.objects 
FOR DELETE USING (bucket_id = 'contact-attachments' AND auth.role() = 'service_role');

-- Verify buckets were created
SELECT * FROM storage.buckets ORDER BY name;

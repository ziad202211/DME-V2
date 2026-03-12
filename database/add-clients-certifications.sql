-- Add clients and certifications tables for the about page
-- Run this in your Supabase SQL Editor

-- Create storage buckets for client logos and certification images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'about-clients',
  'about-clients',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'about-certifications',
  'about-certifications',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage buckets
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Client logos are viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Client logos can be uploaded by admins" ON storage.objects;
DROP POLICY IF EXISTS "Certification images are viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Certification images can be uploaded by admins" ON storage.objects;

-- Create storage policies for client logos
CREATE POLICY "Client logos are viewable by everyone" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'about-clients'
  );

CREATE POLICY "Client logos can be uploaded by admins" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'about-clients' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

CREATE POLICY "Client logos can be updated by admins" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'about-clients' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

CREATE POLICY "Client logos can be deleted by admins" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'about-clients' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

-- Create storage policies for certification images
CREATE POLICY "Certification images are viewable by everyone" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'about-certifications'
  );

CREATE POLICY "Certification images can be uploaded by admins" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'about-certifications' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

CREATE POLICY "Certification images can be updated by admins" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'about-certifications' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

CREATE POLICY "Certification images can be deleted by admins" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'about-certifications' AND
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

-- Table for clients
CREATE TABLE IF NOT EXISTS about_clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for certifications
CREATE TABLE IF NOT EXISTS about_certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE about_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_certifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "About clients are viewable by everyone" ON about_clients;
DROP POLICY IF EXISTS "About clients can be managed by admins" ON about_clients;
DROP POLICY IF EXISTS "About certifications are viewable by everyone" ON about_certifications;
DROP POLICY IF EXISTS "About certifications can be managed by admins" ON about_certifications;

-- Create policies for clients
CREATE POLICY "About clients are viewable by everyone" ON about_clients
  FOR SELECT USING (true);

CREATE POLICY "About clients can be managed by admins" ON about_clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

-- Create policies for certifications
CREATE POLICY "About certifications are viewable by everyone" ON about_certifications
  FOR SELECT USING (true);

CREATE POLICY "About certifications can be managed by admins" ON about_certifications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

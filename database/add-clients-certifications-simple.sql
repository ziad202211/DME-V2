-- Add clients and certifications tables for the about page
-- Run this in your Supabase SQL Editor
-- Note: Storage buckets must be created manually via Supabase Dashboard

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

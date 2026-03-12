-- Fix RLS policies for clients and certifications tables
-- Run this if you're getting authentication errors

-- Drop existing policies
DROP POLICY IF EXISTS "About clients are viewable by everyone" ON about_clients;
DROP POLICY IF EXISTS "About clients can be managed by admins" ON about_clients;
DROP POLICY IF EXISTS "About certifications are viewable by everyone" ON about_certifications;
DROP POLICY IF EXISTS "About certifications can be managed by admins" ON about_certifications;

-- Create simpler policies - allow all operations for now (restrict in production)
CREATE POLICY "Enable all operations for clients" ON about_clients
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for certifications" ON about_certifications
  FOR ALL USING (true) WITH CHECK (true);

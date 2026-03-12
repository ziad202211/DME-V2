-- Simplified permissions fix for about page tables
-- Run this in your Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "About settings are viewable by everyone" ON about_settings;
DROP POLICY IF EXISTS "About settings can be managed by admins" ON about_settings;
DROP POLICY IF EXISTS "About statistics are viewable by everyone" ON about_statistics;
DROP POLICY IF EXISTS "About statistics can be managed by admins" ON about_statistics;
DROP POLICY IF EXISTS "Team members are viewable by everyone" ON team_members;
DROP POLICY IF EXISTS "Team members can be managed by admins" ON team_members;

-- Create simple policies - temporarily allow all operations
-- You can restrict this later once authentication is properly set up
CREATE POLICY "Allow all operations on about_settings" ON about_settings
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on about_statistics" ON about_statistics
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on team_members" ON team_members
  FOR ALL USING (true);

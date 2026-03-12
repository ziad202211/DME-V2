-- Fix RLS policies to allow admin operations from client
-- Run this in your Supabase SQL Editor

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admin full access for projects" ON projects;
DROP POLICY IF EXISTS "Admin full access for services" ON services;
DROP POLICY IF EXISTS "Admin full access for about content" ON about_content;
DROP POLICY IF EXISTS "Admin full access for footer content" ON footer_content;
DROP POLICY IF EXISTS "Admin full access for contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin full access for home content" ON home_content;
DROP POLICY IF EXISTS "Admin full access for contact settings" ON contact_settings;
DROP POLICY IF EXISTS "Admin full access for project_services" ON project_services;

-- Create new policies that allow admin operations from client
-- Using a simple approach for development - in production, you'd want proper JWT auth

-- Projects table policies
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON projects FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON projects FOR DELETE USING (true);

-- Services table policies
CREATE POLICY "Enable read access for all users" ON services FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON services FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON services FOR DELETE USING (true);

-- Project services junction table policies
CREATE POLICY "Enable read access for all users" ON project_services FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON project_services FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON project_services FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON project_services FOR DELETE USING (true);

-- About content policies
CREATE POLICY "Enable read access for all users" ON about_content FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON about_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON about_content FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON about_content FOR DELETE USING (true);

-- Footer content policies
CREATE POLICY "Enable read access for all users" ON footer_content FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON footer_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON footer_content FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON footer_content FOR DELETE USING (true);

-- Contact messages policies
CREATE POLICY "Enable read access for all users" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON contact_messages FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON contact_messages FOR DELETE USING (true);

-- Home content policies
CREATE POLICY "Enable read access for all users" ON home_content FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON home_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON home_content FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON home_content FOR DELETE USING (true);

-- Contact settings policies
CREATE POLICY "Enable read access for all users" ON contact_settings FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON contact_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON contact_settings FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON contact_settings FOR DELETE USING (true);

-- Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('projects', 'services', 'project_services', 'about_content', 'footer_content', 'contact_messages', 'home_content', 'contact_settings')
ORDER BY tablename, policyname;

-- Update about page schema to support header photo, statistics, and enhanced team management
-- Run this in your Supabase SQL Editor

-- First, let's add new tables for better organization

-- Table for about page settings (header photo, etc.)
CREATE TABLE IF NOT EXISTS about_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for statistics
CREATE TABLE IF NOT EXISTS about_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  number TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  photo_url TEXT,
  description TEXT,
  linkedin_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default statistics
INSERT INTO about_statistics (label, number, icon_name, order_index) VALUES
('Years Combined Experience', '50+', 'Building2', 0),
('Projects Delivered', '950+', 'Briefcase', 1),
('Clients Served', '508', 'Users', 2),
('Certifications', '+17', 'ShieldCheck', 3)
ON CONFLICT DO NOTHING;

-- Insert default header photo setting
INSERT INTO about_settings (key, value) VALUES
('header_photo_url', '/about-hero.webp')
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE about_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "About settings are viewable by everyone" ON about_settings;
DROP POLICY IF EXISTS "About settings can be managed by admins" ON about_settings;
DROP POLICY IF EXISTS "About statistics are viewable by everyone" ON about_statistics;
DROP POLICY IF EXISTS "About statistics can be managed by admins" ON about_statistics;
DROP POLICY IF EXISTS "Team members are viewable by everyone" ON team_members;
DROP POLICY IF EXISTS "Team members can be managed by admins" ON team_members;

-- Create policies
CREATE POLICY "About settings are viewable by everyone" ON about_settings
  FOR SELECT USING (true);

CREATE POLICY "About settings can be managed by admins" ON about_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

CREATE POLICY "About statistics are viewable by everyone" ON about_statistics
  FOR SELECT USING (true);

CREATE POLICY "About statistics can be managed by admins" ON about_statistics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

CREATE POLICY "Team members are viewable by everyone" ON team_members
  FOR SELECT USING (true);

CREATE POLICY "Team members can be managed by admins" ON team_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.email = 'admin@dme.com'
    )
  );

-- Insert existing team members from data
INSERT INTO team_members (name, position, photo_url, description, linkedin_url, order_index) VALUES
('Angad Ahuja, M.E.M', 'President', '/team/angad.jpg', 'Strategic leader with a Master''s in Engineering Management.', NULL, 0),
('Moatassem Ghoniema, PhD, PMP, PSP, CQM', 'Executive Vice President', '/team/Moatassem.jpg', 'Civil engineering expert specializing in infrastructure project delivery.', NULL, 1),
('Adil Moutanabi, MCP, MSCT', 'Vice President, Technology Group; IT & GIS', '/team/Adil.jpg', 'Technology leader focused on IT systems and digital infrastructure.', NULL, 2),
('Musab Altamimi, P.E., PMP, CCM', 'Senior Vice President – Civil Engineering', '/team/Musab.jpg', 'Experienced civil engineer leading complex infrastructure programs.', NULL, 3),
('Abraham Naqeeb, ENV SP, CQM', 'Vice President, Construction Inspection & Construction Management', '/team/Abraham.jpg', 'Over 34 years in construction management, QA/QC, trenchless technologies, and geotechnical engineering. Expert in claims avoidance, contract administration, and mentoring teams.', NULL, 4),
('Art Shapiro, P.E., PMP', 'Vice President', '/team/Art.jpg', '40+ years in utility infrastructure, managing water/wastewater projects. Expert in regulatory compliance, capital budgets, and organizational best practices.', NULL, 5),
('Nagy Elansary, P.E., MBA, PSP, EVP, CFCC', 'Vice President, Project Controls, Scheduling & Claims', '/team/Nagy.jpg', '38+ years in project controls, scheduling, and dispute resolution for projects up to $ 1 B. Provides litigation support and expert testimony across diverse sectors.', NULL, 6)
ON CONFLICT DO NOTHING;

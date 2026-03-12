-- Add WebP image URL columns to relevant tables for performance optimization
-- Run this in your Supabase SQL Editor

-- Add WebP column to about_certifications table
ALTER TABLE about_certifications 
ADD COLUMN webp_image_url TEXT;

-- Add WebP column to about_clients table  
ALTER TABLE about_clients 
ADD COLUMN webp_logo_url TEXT;

-- Add WebP column to team_members table
ALTER TABLE team_members 
ADD COLUMN webp_photo_url TEXT;

-- Add WebP column to projects table
ALTER TABLE projects 
ADD COLUMN webp_image_url TEXT;

-- Add WebP column to services table
ALTER TABLE services 
ADD COLUMN webp_image_url TEXT;

-- Add WebP column to about_content table
ALTER TABLE about_content 
ADD COLUMN webp_image_url TEXT;

-- Add WebP column to home_content table
ALTER TABLE home_content 
ADD COLUMN webp_hero_background_image TEXT;

-- Create indexes for better performance on WebP columns
CREATE INDEX idx_about_certifications_webp_image_url ON about_certifications(webp_image_url) WHERE webp_image_url IS NOT NULL;
CREATE INDEX idx_about_clients_webp_logo_url ON about_clients(webp_logo_url) WHERE webp_logo_url IS NOT NULL;
CREATE INDEX idx_team_members_webp_photo_url ON team_members(webp_photo_url) WHERE webp_photo_url IS NOT NULL;
CREATE INDEX idx_projects_webp_image_url ON projects(webp_image_url) WHERE webp_image_url IS NOT NULL;
CREATE INDEX idx_services_webp_image_url ON services(webp_image_url) WHERE webp_image_url IS NOT NULL;
CREATE INDEX idx_about_content_webp_image_url ON about_content(webp_image_url) WHERE webp_image_url IS NOT NULL;
CREATE INDEX idx_home_content_webp_hero_background_image ON home_content(webp_hero_background_image) WHERE webp_hero_background_image IS NOT NULL;

-- Comments for documentation
COMMENT ON COLUMN about_certifications.webp_image_url IS 'WebP-optimized version of the certification image for better performance';
COMMENT ON COLUMN about_clients.webp_logo_url IS 'WebP-optimized version of the client logo for better performance';
COMMENT ON COLUMN team_members.webp_photo_url IS 'WebP-optimized version of the team member photo for better performance';
COMMENT ON COLUMN projects.webp_image_url IS 'WebP-optimized version of the project image for better performance';
COMMENT ON COLUMN services.webp_image_url IS 'WebP-optimized version of the service image for better performance';
COMMENT ON COLUMN about_content.webp_image_url IS 'WebP-optimized version of the about content image for better performance';
COMMENT ON COLUMN home_content.webp_hero_background_image IS 'WebP-optimized version of the hero background image for better performance';

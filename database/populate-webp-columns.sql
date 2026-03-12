-- Step 1: Populate WebP columns with existing image URLs
-- Run this in your Supabase SQL Editor first

-- Update about_certifications with existing image URLs
UPDATE about_certifications 
SET webp_image_url = image_url 
WHERE image_url IS NOT NULL AND webp_image_url IS NULL;

-- Update about_clients with existing logo URLs  
UPDATE about_clients 
SET webp_logo_url = logo_url 
WHERE logo_url IS NOT NULL AND webp_logo_url IS NULL;

-- Update team_members with existing photo URLs
UPDATE team_members 
SET webp_photo_url = photo_url 
WHERE photo_url IS NOT NULL AND webp_photo_url IS NULL;

-- Update projects with existing image URLs
UPDATE projects 
SET webp_image_url = image_url 
WHERE image_url IS NOT NULL AND webp_image_url IS NULL;

-- Update services with existing image URLs
UPDATE services 
SET webp_image_url = image_url 
WHERE image_url IS NOT NULL AND webp_image_url IS NULL;

-- Update about_content with existing image URLs
UPDATE about_content 
SET webp_image_url = image_url 
WHERE image_url IS NOT NULL AND webp_image_url IS NULL;

-- Update home_content with existing hero background image
UPDATE home_content 
SET webp_hero_background_image = hero_background_image 
WHERE hero_background_image IS NOT NULL AND webp_hero_background_image IS NULL;

-- Show results
SELECT 'about_certifications' as table_name, COUNT(*) as total_records, 
       COUNT(webp_image_url) as webp_populated 
FROM about_certifications
WHERE image_url IS NOT NULL

UNION ALL

SELECT 'about_clients' as table_name, COUNT(*) as total_records, 
       COUNT(webp_logo_url) as webp_populated 
FROM about_clients
WHERE logo_url IS NOT NULL

UNION ALL

SELECT 'team_members' as table_name, COUNT(*) as total_records, 
       COUNT(webp_photo_url) as webp_populated 
FROM team_members
WHERE photo_url IS NOT NULL

UNION ALL

SELECT 'projects' as table_name, COUNT(*) as total_records, 
       COUNT(webp_image_url) as webp_populated 
FROM projects
WHERE image_url IS NOT NULL

UNION ALL

SELECT 'services' as table_name, COUNT(*) as total_records, 
       COUNT(webp_image_url) as webp_populated 
FROM services
WHERE image_url IS NOT NULL

UNION ALL

SELECT 'about_content' as table_name, COUNT(*) as total_records, 
       COUNT(webp_image_url) as webp_populated 
FROM about_content
WHERE image_url IS NOT NULL

UNION ALL

SELECT 'home_content' as table_name, COUNT(*) as total_records, 
       COUNT(webp_hero_background_image) as webp_populated 
FROM home_content
WHERE hero_background_image IS NOT NULL

ORDER BY table_name;

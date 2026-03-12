-- Debug admin user issue
-- Run this in your Supabase SQL Editor

-- Check existing admin users
SELECT * FROM admin_users;

-- If you want to update the existing admin user password:
UPDATE admin_users 
SET password_hash = 'admin123' 
WHERE email = 'admin@dme.com';

-- Or if you want to delete and recreate:
DELETE FROM admin_users WHERE email = 'admin@dme.com';

-- Then insert the new admin user
INSERT INTO admin_users (
  email,
  password_hash,
  name,
  role
) VALUES (
  'admin@dme.com',
  'admin123',
  'Admin User',
  'admin'
);

-- Verify the admin user
SELECT * FROM admin_users WHERE email = 'admin@dme.com';

-- Fix authentication issue
-- Run this in your Supabase SQL Editor

-- First, let's check if the table exists and has data
SELECT COUNT(*) as user_count FROM admin_users;

-- If no users exist, create the admin user
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
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  name = EXCLUDED.name,
  role = EXCLUDED.role;

-- Verify the user was created/updated
SELECT * FROM admin_users WHERE email = 'admin@dme.com';

-- Test the exact query our app uses
SELECT * FROM admin_users 
WHERE email = 'admin@dme.com' AND password_hash = 'admin123';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'admin_users';

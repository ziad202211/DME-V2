-- Test RLS and admin user access
-- Run this in your Supabase SQL Editor

-- Temporarily disable RLS to test
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Now try to create the admin user
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
  password_hash = EXCLUDED.password_hash;

-- Check if user exists
SELECT * FROM admin_users WHERE email = 'admin@dme.com';

-- Test the exact query
SELECT * FROM admin_users 
WHERE email = 'admin@dme.com' AND password_hash = 'admin123';

-- Re-enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Check if RLS policies exist
SELECT * FROM pg_policies WHERE tablename = 'admin_users';

-- If no policies exist, create them
CREATE POLICY "Admin users full access" ON admin_users FOR ALL USING (auth.role() = 'service_role');

-- Test with RLS enabled (using service role)
-- This should work in the SQL Editor but might fail from the app

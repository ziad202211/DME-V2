-- Create admin user for DME website
-- Run this in your Supabase SQL Editor at: https://plnhdtilidgpxwmxpzwa.supabase.co

-- Insert admin user with default credentials
-- Email: admin@dme.com
-- Password: admin123 (will be hashed below)

-- First, let's create a simple password hash (for development only)
-- In production, you should use proper password hashing

INSERT INTO admin_users (
  email,
  password_hash,
  name,
  role
) VALUES (
  'admin@dme.com',
  'admin123', -- Plain text for development - CHANGE THIS IN PRODUCTION
  'Admin User',
  'admin'
);

-- You can also create additional admin users if needed
INSERT INTO admin_users (
  email,
  password_hash,
  name,
  role
) VALUES (
  'editor@dme.com',
  'editor123',
  'Editor User',
  'editor'
);

-- Verify the admin user was created
SELECT * FROM admin_users;

-- Add services column to projects table if it doesn't exist
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS services TEXT[] DEFAULT '{}';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_projects_services ON projects USING GIN(services);

-- Enable RLS (Row Level Security) if not already enabled
-- (This assumes projects table already has RLS enabled)

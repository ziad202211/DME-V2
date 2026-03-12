-- DME Content Management System Schema

-- Services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT,
  icon TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT,
  client TEXT,
  location TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'completed',
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  gallery TEXT[], -- Array of image URLs
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project services junction table
CREATE TABLE project_services (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, service_id)
);

-- About content table
CREATE TABLE about_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL, -- 'mission', 'vision', 'history', 'team'
  title TEXT,
  content TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread', -- 'unread', 'read', 'replied'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Footer content table
CREATE TABLE footer_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL, -- 'company', 'services', 'contact', 'social'
  title TEXT,
  content JSONB, -- Flexible content structure
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table (for authentication)
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin', -- 'admin', 'editor'
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Home content table
CREATE TABLE home_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_description TEXT,
  hero_cta_text TEXT,
  hero_cta_link TEXT,
  hero_background_image TEXT,
  about_title TEXT,
  about_description TEXT,
  about_image TEXT,
  services_title TEXT,
  services_description TEXT,
  projects_title TEXT,
  projects_description TEXT,
  cta_title TEXT,
  cta_description TEXT,
  cta_button_text TEXT,
  cta_button_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact settings table
CREATE TABLE contact_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_title TEXT,
  contact_description TEXT,
  contact_address TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  contact_hours TEXT,
  contact_form_title TEXT,
  contact_form_description TEXT,
  map_embed_url TEXT,
  social_facebook TEXT,
  social_twitter TEXT,
  social_linkedin TEXT,
  social_instagram TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for project services" ON project_services FOR SELECT USING (true);
CREATE POLICY "Public read access for about content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public read access for footer content" ON footer_content FOR SELECT USING (true);
CREATE POLICY "Public read access for home content" ON home_content FOR SELECT USING (true);
CREATE POLICY "Public read access for contact settings" ON contact_settings FOR SELECT USING (true);

-- Policies for contact messages (insert only for public)
CREATE POLICY "Public insert for contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Policies for admin users
CREATE POLICY "Admin users full access" ON admin_users FOR ALL USING (auth.role() = 'service_role');

-- Policies for services (admin full access)
CREATE POLICY "Admin full access for services" ON services FOR ALL USING (auth.role() = 'service_role');

-- Policies for projects (admin full access)
CREATE POLICY "Admin full access for projects" ON projects FOR ALL USING (auth.role() = 'service_role');

-- Policies for project services (admin full access)
CREATE POLICY "Admin full access for project services" ON project_services FOR ALL USING (auth.role() = 'service_role');

-- Policies for about content (admin full access)
CREATE POLICY "Admin full access for about content" ON about_content FOR ALL USING (auth.role() = 'service_role');

-- Policies for footer content (admin full access)
CREATE POLICY "Admin full access for footer content" ON footer_content FOR ALL USING (auth.role() = 'service_role');

-- Policies for contact messages (admin full access)
CREATE POLICY "Admin full access for contact messages" ON contact_messages FOR ALL USING (auth.role() = 'service_role');

-- Policies for home content (admin full access)
CREATE POLICY "Admin full access for home content" ON home_content FOR ALL USING (auth.role() = 'service_role');

-- Policies for contact settings (admin full access)
CREATE POLICY "Admin full access for contact settings" ON contact_settings FOR ALL USING (auth.role() = 'service_role');

-- Indexes for better performance
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_featured ON services(featured);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_about_content_section ON about_content(section);
CREATE INDEX idx_footer_content_section ON footer_content(section);
CREATE INDEX idx_project_services_project_id ON project_services(project_id);
CREATE INDEX idx_project_services_service_id ON project_services(service_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON about_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_footer_content_updated_at BEFORE UPDATE ON footer_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_home_content_updated_at BEFORE UPDATE ON home_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_settings_updated_at BEFORE UPDATE ON contact_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

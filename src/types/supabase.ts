export interface Service {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  icon?: string;
  image_url?: string;
  webp_image_url?: string;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  client?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  status: string;
  featured: boolean;
  image_url?: string;
  webp_image_url?: string;
  gallery?: string[];
  services?: string[];
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectService {
  project_id: string;
  service_id: string;
}

export interface AboutContent {
  id: string;
  section: string;
  title?: string;
  content?: string;
  image_url?: string;
  webp_image_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface AboutSetting {
  id: string;
  key: string;
  value?: string;
  created_at: string;
  updated_at: string;
}

export interface AboutStatistic {
  id: string;
  label: string;
  number: string;
  icon_name: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo_url?: string;
  webp_photo_url?: string;
  description?: string;
  linkedin_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface AboutClient {
  id: string;
  name: string;
  logo_url?: string;
  webp_logo_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface AboutCertification {
  id: string;
  name: string;
  image_url?: string;
  webp_image_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface FooterContent {
  id: string;
  section: string;
  title?: string;
  content: any;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'editor';
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Service>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Project>;
      };
      project_services: {
        Row: ProjectService;
        Insert: Omit<ProjectService, ''>;
        Update: Partial<ProjectService>;
      };
      about_content: {
        Row: AboutContent;
        Insert: Omit<AboutContent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<AboutContent>;
      };
      about_settings: {
        Row: AboutSetting;
        Insert: Omit<AboutSetting, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<AboutSetting>;
      };
      about_statistics: {
        Row: AboutStatistic;
        Insert: Omit<AboutStatistic, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<AboutStatistic>;
      };
      team_members: {
        Row: TeamMember;
        Insert: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<TeamMember>;
      };
      about_clients: {
        Row: AboutClient;
        Insert: Omit<AboutClient, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<AboutClient>;
      };
      about_certifications: {
        Row: AboutCertification;
        Insert: Omit<AboutCertification, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<AboutCertification>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, 'id' | 'created_at' | 'status'>;
        Update: Partial<ContactMessage>;
      };
      footer_content: {
        Row: FooterContent;
        Insert: Omit<FooterContent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<FooterContent>;
      };
      admin_users: {
        Row: AdminUser;
        Insert: Omit<AdminUser, 'id' | 'created_at' | 'updated_at' | 'last_login'>;
        Update: Partial<AdminUser>;
      };
      home_content: {
        Row: any;
        Insert: any;
        Update: any;
      };
      contact_settings: {
        Row: any;
        Insert: any;
        Update: any;
      };
    };
  };
}

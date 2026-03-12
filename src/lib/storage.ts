import { supabase } from './supabase';

// Storage bucket names
export const BUCKETS = {
  SERVICE_IMAGES: 'service-images',
  PROJECT_IMAGES: 'project-images',
  ABOUT_IMAGES: 'about-images',
  HERO_IMAGES: 'hero-images',
  TEAM_PHOTOS: 'team-photos',
  BRAND_ASSETS: 'brand-assets',
  DOCUMENTS: 'documents',
  CONTACT_ATTACHMENTS: 'contact-attachments'
} as const;

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  [BUCKETS.SERVICE_IMAGES]: 5 * 1024 * 1024, // 5MB
  [BUCKETS.PROJECT_IMAGES]: 10 * 1024 * 1024, // 10MB
  [BUCKETS.ABOUT_IMAGES]: 5 * 1024 * 1024, // 5MB
  [BUCKETS.HERO_IMAGES]: 10 * 1024 * 1024, // 10MB
  [BUCKETS.TEAM_PHOTOS]: 3 * 1024 * 1024, // 3MB
  [BUCKETS.BRAND_ASSETS]: 5 * 1024 * 1024, // 5MB
  [BUCKETS.DOCUMENTS]: 10 * 1024 * 1024, // 10MB
  [BUCKETS.CONTACT_ATTACHMENTS]: 5 * 1024 * 1024 // 5MB
} as const;

// Allowed MIME types
export const ALLOWED_MIME_TYPES = {
  [BUCKETS.SERVICE_IMAGES]: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  [BUCKETS.PROJECT_IMAGES]: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  [BUCKETS.ABOUT_IMAGES]: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  [BUCKETS.HERO_IMAGES]: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  [BUCKETS.TEAM_PHOTOS]: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  [BUCKETS.BRAND_ASSETS]: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  [BUCKETS.DOCUMENTS]: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  [BUCKETS.CONTACT_ATTACHMENTS]: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain']
} as const;

// Upload file to storage
export const uploadFile = async (
  bucket: keyof typeof BUCKETS,
  file: File,
  path?: string
): Promise<{ url: string; error: Error | null }> => {
  try {
    // Validate file size
    const maxSize = FILE_SIZE_LIMITS[bucket];
    if (file.size > maxSize) {
      throw new Error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
    }

    // Validate MIME type
    const allowedTypes = ALLOWED_MIME_TYPES[bucket];
    if (!allowedTypes.includes(file.type as any)) {
      throw new Error(`File type ${file.type} is not allowed`);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = path ? `${path}/${timestamp}-${file.name}` : `${timestamp}-${file.name}`;
    
    // Upload file
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600', // 1 hour cache
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return { url: publicUrl, error: null };
  } catch (error) {
    return { url: '', error: error as Error };
  }
};

// Delete file from storage
export const deleteFile = async (
  bucket: keyof typeof BUCKETS,
  path: string
): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    return { error: error as Error || null };
  } catch (error) {
    return { error: error as Error };
  }
};

// Get public URL for a file
export const getPublicUrl = (
  bucket: keyof typeof BUCKETS,
  path: string
): string => {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return publicUrl;
};

// List files in a bucket/path
export const listFiles = async (
  bucket: keyof typeof BUCKETS,
  path?: string,
  limit: number = 100
): Promise<{ files: any[]; error: Error | null }> => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path, { limit });

    if (error) throw error;

    return { files: data || [], error: null };
  } catch (error) {
    return { files: [], error: error as Error };
  }
};

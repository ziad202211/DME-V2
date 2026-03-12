/**
 * Image conversion utilities for WebP optimization
 */

export interface ImageConversionOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  preserveAspectRatio?: boolean;
}

/**
 * Convert an image file to WebP format using Canvas API
 * This works in the browser and provides better compression
 */
export const convertToWebP = async (
  file: File,
  options: ImageConversionOptions = {}
): Promise<File> => {
  const {
    quality = 0.8,
    maxWidth = 1920,
    maxHeight = 1080,
    preserveAspectRatio = true
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    const img = new Image();
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (maxWidth && width > maxWidth) {
        if (preserveAspectRatio) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        } else {
          width = maxWidth;
        }
      }
      
      if (maxHeight && height > maxHeight) {
        if (preserveAspectRatio) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        } else {
          height = maxHeight;
        }
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and convert
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
              type: 'image/webp',
              lastModified: Date.now()
            });
            resolve(webpFile);
          } else {
            reject(new Error('Failed to convert image to WebP'));
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Check if WebP is supported in the current browser
 */
export const isWebPSupported = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Get optimized image URL with WebP fallback
 * Use WebP URL if available and supported, otherwise fallback to original
 */
export const getOptimizedImageUrl = (
  originalUrl: string,
  webpUrl?: string
): string => {
  // If no WebP URL provided, return original
  if (!webpUrl || webpUrl === originalUrl) {
    return originalUrl;
  }
  
  // Check if WebP is supported
  if (isWebPSupported()) {
    return webpUrl;
  }
  
  return originalUrl;
};

/**
 * Get optimized image URL from database record
 * Automatically extracts WebP URL based on available fields
 */
export const getOptimizedImageUrlFromRecord = (
  record: any,
  originalUrlField: string,
  webpUrlField?: string
): string => {
  const originalUrl = record[originalUrlField];
  if (!originalUrl) return '';
  
  // If WebP field not specified, try to guess it
  const webpField = webpUrlField || `${originalUrlField.replace('_url', '')}_webp_url`;
  const webpUrl = record[webpField];
  
  return getOptimizedImageUrl(originalUrl, webpUrl);
};

/**
 * Convert multiple images to WebP in parallel
 */
export const convertMultipleToWebP = async (
  files: File[],
  options?: ImageConversionOptions
): Promise<File[]> => {
  const conversions = files.map(file => convertToWebP(file, options));
  return Promise.all(conversions);
};

/**
 * Create a WebP version of an image and upload to Supabase
 */
export const uploadWebPVersion = async (
  file: File,
  bucket: string,
  path: string,
  supabase: any,
  options?: ImageConversionOptions
): Promise<{ webpUrl: string; webpPath: string }> => {
  try {
    // Convert to WebP
    const webpFile = await convertToWebP(file, options);
    
    // Generate WebP path
    const webpPath = path.replace(/\.[^/.]+$/, '.webp');
    
    // Upload WebP version
    const { error } = await supabase.storage
      .from(bucket)
      .upload(webpPath, webpFile, {
        contentType: 'image/webp',
        upsert: true
      });

    if (error) {
      throw new Error(`Failed to upload WebP: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(webpPath);

    return {
      webpUrl: publicUrl,
      webpPath
    };
  } catch (error) {
    console.error('WebP conversion failed:', error);
    throw error;
  }
};

/**
 * Generate responsive image sizes
 */
export const generateResponsiveSizes = async (
  file: File,
  bucket: string,
  basePath: string,
  supabase: any,
  sizes: { width: number; height: number; suffix: string }[] = [
    { width: 320, height: 240, suffix: '-small' },
    { width: 768, height: 576, suffix: '-medium' },
    { width: 1920, height: 1080, suffix: '-large' }
  ]
): Promise<{ size: string; url: string; path: string }[]> => {
  const results = [];

  for (const size of sizes) {
    try {
      const webpFile = await convertToWebP(file, {
        maxWidth: size.width,
        maxHeight: size.height,
        quality: 0.8
      });

      const sizePath = basePath.replace(/\.[^/.]+$/, `${size.suffix}.webp`);
      
      const { error } = await supabase.storage
        .from(bucket)
        .upload(sizePath, webpFile, {
          contentType: 'image/webp',
          upsert: true
        });

      if (!error) {
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(sizePath);

        results.push({
          size: size.suffix,
          url: publicUrl,
          path: sizePath
        });
      }
    } catch (error) {
      console.error(`Failed to generate ${size.suffix} size:`, error);
    }
  }

  return results;
};

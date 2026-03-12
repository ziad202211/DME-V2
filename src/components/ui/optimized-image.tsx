import { useState, useEffect } from 'react';
import { getOptimizedImageUrl } from '@/lib/image-conversion';

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage component that automatically uses WebP when supported
 * and falls back to original format when needed
 */
export const OptimizedImage = ({
  src,
  webpSrc,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  fallbackSrc = '/placeholder-image.png',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Determine the best image source to use
    const optimizedUrl = getOptimizedImageUrl(src, webpSrc);
    setImageSrc(optimizedUrl);
    setHasError(false);
  }, [src, webpSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Try fallback sources in order
      if (imageSrc !== src && src) {
        setImageSrc(src);
      } else if (imageSrc !== fallbackSrc && fallbackSrc) {
        setImageSrc(fallbackSrc);
      }
      onError?.();
    }
  };

  const handleLoad = () => {
    setHasError(false);
    onLoad?.();
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};

export default OptimizedImage;

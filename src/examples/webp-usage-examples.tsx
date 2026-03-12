/**
 * Usage examples for WebP optimized images
 * 
 * This file shows how to use the new WebP functionality in your frontend components
 */

import { getOptimizedImageUrlFromRecord } from '@/lib/image-conversion';

// Example 1: Using in a certification component
export const CertificationCard = ({ certification }) => {
  const optimizedImageUrl = getOptimizedImageUrlFromRecord(
    certification,
    'image_url',
    'webp_image_url'
  );

  return (
    <div className="certification-card">
      <img 
        src={optimizedImageUrl} 
        alt={certification.name}
        loading="lazy"
      />
      <h3>{certification.name}</h3>
    </div>
  );
};

// Example 2: Using in a team member component
export const TeamMemberCard = ({ member }) => {
  const optimizedPhotoUrl = getOptimizedImageUrlFromRecord(
    member,
    'photo_url',
    'webp_photo_url'
  );

  return (
    <div className="team-member">
      <img 
        src={optimizedPhotoUrl} 
        alt={member.name}
        className="team-photo"
      />
      <div className="team-info">
        <h4>{member.name}</h4>
        <p>{member.position}</p>
      </div>
    </div>
  );
};

// Example 3: Using in a client logo component
export const ClientLogo = ({ client }) => {
  const optimizedLogoUrl = getOptimizedImageUrlFromRecord(
    client,
    'logo_url',
    'webp_logo_url'
  );

  return (
    <img 
      src={optimizedLogoUrl} 
      alt={client.name}
      className="client-logo"
    />
  );
};

// Example 4: Manual usage with getOptimizedImageUrl
import { getOptimizedImageUrl } from '@/lib/image-conversion';

export const AboutHero = ({ imageUrl, webpImageUrl }) => {
  const optimizedUrl = getOptimizedImageUrl(imageUrl, webpImageUrl);

  return (
    <div className="hero-section">
      <img 
        src={optimizedUrl} 
        alt="About hero"
        className="hero-image"
      />
    </div>
  );
};

// Example 5: Fallback for older browsers
export const ImageWithFallback = ({ record, imageField, webpField, alt, ...props }) => {
  const optimizedUrl = getOptimizedImageUrlFromRecord(record, imageField, webpField);
  const originalUrl = record[imageField];

  return (
    <img 
      src={optimizedUrl} 
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        // Fallback to original if WebP fails to load
        if (target.src !== originalUrl) {
          target.src = originalUrl;
        }
      }}
      alt={alt}
      {...props}
    />
  );
};

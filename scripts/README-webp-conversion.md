# WebP Conversion Script

This script converts all existing images in your Supabase project to WebP format for better performance.

## What it does

1. **Database Images**: Finds all image URLs in your database tables and converts them to WebP
2. **Storage Images**: Processes all images in your Supabase storage buckets
3. **Updates Database**: Stores WebP URLs in the corresponding `webp_*` columns

## Prerequisites

1. ✅ Run the `add-webp-columns.sql` script first to add WebP columns to your tables
2. ✅ Run the `populate-webp-columns.sql` script to copy existing image URLs to WebP columns
3. ✅ Deploy the `convert-image` edge function
4. ✅ Install dependencies: `npm install`

## Usage

### Quick Start
```bash
npm run convert:webp
```

### Manual Run
```bash
node scripts/convert-existing-images.js
```

## What gets processed

### Database Tables
- `about_certifications` → `webp_image_url`
- `about_clients` → `webp_logo_url`  
- `team_members` → `webp_photo_url`
- `projects` → `webp_image_url`
- `services` → `webp_image_url`
- `about_content` → `webp_image_url`
- `home_content` → `webp_hero_background_image`

### Storage Buckets
- `clients/`
- `images/`
- `team/`

### Image Formats
- `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.tiff`

## Output

The script will show progress like:
```
🔄 Processing database images...
📁 Processing about_certifications...
🔄 Converting about_certifications id=1: images/cert1.jpg
✓ Updated about_certifications id=1 with WebP URL
✓ Converted: https://.../storage/v1/object/public/images/cert1.webp

📁 Processing storage bucket images...
📁 Processing bucket: clients
Found 8 image files in clients
🔄 Converting clients/01-removebg-preview.png
✓ Converted: https://.../storage/v1/object/public/clients/01-removebg-preview.webp
```

## Notes

- ⚠️ **Backup First**: Always backup your database before running bulk operations
- 🔄 **Idempotent**: Running multiple times won't create duplicates
- ⏱️ **Time**: Processing time depends on number of images and network speed
- 📊 **Progress**: The script shows real-time progress for each conversion

## Troubleshooting

### Permission Errors
Make sure your service role key has proper permissions:
- Storage: read/write access to all buckets
- Database: update permissions on all tables

### Edge Function Errors
Check the Supabase logs if conversions fail:
```bash
supabase functions logs convert-image
```

### Missing Dependencies
```bash
npm install dotenv @supabase/supabase-js
```

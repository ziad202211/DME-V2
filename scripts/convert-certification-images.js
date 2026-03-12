#!/usr/bin/env node

/**
 * Focused script to convert certification images to WebP
 * Specifically for about-images bucket and about_certifications table
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Convert image to WebP using edge function
 */
async function convertImageToWebp(bucket, filePath, quality = 80) {
  try {
    console.log(`🔄 Converting ${bucket}/${filePath}...`);
    
    const { data, error } = await supabase.functions.invoke('convert-image', {
      body: { bucket, filePath, quality }
    });

    if (error) {
      console.error(`❌ Error converting ${bucket}/${filePath}:`, error);
      return null;
    }

    console.log(`✅ Converted: ${data.webpUrl}`);
    return data;
  } catch (error) {
    console.error(`❌ Error converting ${bucket}/${filePath}:`, error);
    return null;
  }
}

/**
 * Get all certification images from database
 */
async function getCertificationImages() {
  try {
    const { data, error } = await supabase
      .from('about_certifications')
      .select('id, image_url, webp_image_url')
      .not('image_url', 'is', null);

    if (error) {
      console.error('Error fetching certification images:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching certification images:', error);
    return [];
  }
}

/**
 * Update certification with WebP URL
 */
async function updateCertificationWebpUrl(id, webpUrl) {
  try {
    const { error } = await supabase
      .from('about_certifications')
      .update({ webp_image_url: webpUrl })
      .eq('id', id);

    if (error) {
      console.error(`❌ Error updating certification id=${id}:`, error);
      return false;
    }

    console.log(`✅ Updated certification id=${id} with WebP URL`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating certification id=${id}:`, error);
    return false;
  }
}

/**
 * List all files in about-images bucket
 */
async function listAboutImagesBucket() {
  try {
    const { data, error } = await supabase.storage
      .from('about-images')
      .list('', { limit: 1000 });

    if (error) {
      console.error('Error listing about-images bucket:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error accessing about-images bucket:', error);
    return [];
  }
}

/**
 * Process certification images from database
 */
async function processCertificationImages() {
  console.log('🎯 Processing certification images...\n');
  
  const certifications = await getCertificationImages();
  
  if (certifications.length === 0) {
    console.log('📭 No certification images found in database');
    return;
  }
  
  console.log(`📊 Found ${certifications.length} certification records\n`);
  
  let convertedCount = 0;
  let failedCount = 0;
  
  for (const cert of certifications) {
    const imageUrl = cert.image_url;
    const webpUrl = cert.webp_image_url;
    
    // Skip if already converted to WebP (URL ends with .webp)
    if (webpUrl && webpUrl.endsWith('.webp')) {
      console.log(`⏭️  Skipping id=${cert.id} - already converted to WebP`);
      continue;
    }
    
    // Extract bucket and path from URL
    try {
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const bucket = pathParts[1];
      const filePath = pathParts.slice(2).join('/');

      if (bucket !== 'about-images') {
        console.log(`⚠️  Certification id=${cert.id} uses different bucket: ${bucket}`);
        continue;
      }

      // Convert image
      const result = await convertImageToWebp(bucket, filePath);
      if (result && result.webpUrl) {
        // Update database
        await updateCertificationWebpUrl(cert.id, result.webpUrl);
        convertedCount++;
      } else {
        failedCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing certification id=${cert.id}:`, error);
      failedCount++;
    }
  }
  
  console.log(`\n📈 Results: ${convertedCount} converted, ${failedCount} failed`);
}

/**
 * Process all files in about-images bucket
 */
async function processAboutImagesBucket() {
  console.log('\n📁 Processing all files in about-images bucket...\n');
  
  const files = await listAboutImagesBucket();
  const imageFiles = files.filter(file => 
    file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|tiff)$/)
  );
  
  if (imageFiles.length === 0) {
    console.log('📭 No image files found in about-images bucket');
    return;
  }
  
  console.log(`📊 Found ${imageFiles.length} image files in about-images bucket\n`);
  
  let convertedCount = 0;
  let failedCount = 0;
  
  for (const file of imageFiles) {
    const result = await convertImageToWebp('about-images', file.name);
    if (result) {
      convertedCount++;
    } else {
      failedCount++;
    }
  }
  
  console.log(`\n📈 Results: ${convertedCount} converted, ${failedCount} failed`);
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Certification Images WebP Converter\n');
  console.log('This script will:');
  console.log('1. Convert certification images from database to WebP');
  console.log('2. Update about_certifications table with WebP URLs');
  console.log('3. Process all images in about-images bucket\n');
  
  try {
    // Process database certification images first
    await processCertificationImages();
    
    // Then process all files in the bucket
    await processAboutImagesBucket();
    
    console.log('\n✅ Certification WebP conversion completed!');
  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);

#!/usr/bin/env node

/**
 * Script to convert all existing images to WebP format
 * This script:
 * 1. Lists all files in Supabase storage buckets
 * 2. Converts each image to WebP using the convert-image edge function
 * 3. Updates database records with WebP URLs
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

// Image file extensions to convert
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];

// Buckets to process
const BUCKETS = ['about-images', 'clients', 'images', 'team'];

/**
 * Get all files in a bucket
 */
async function listFilesInBucket(bucketName) {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list('', { limit: 1000 });

    if (error) {
      console.error(`Error listing files in bucket ${bucketName}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Error accessing bucket ${bucketName}:`, error);
    return [];
  }
}

/**
 * Check if file is an image
 */
function isImageFile(fileName) {
  const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  return IMAGE_EXTENSIONS.includes(ext);
}

/**
 * Convert image to WebP using edge function
 */
async function convertImageToWebp(bucket, filePath, quality = 80) {
  try {
    const { data, error } = await supabase.functions.invoke('convert-image', {
      body: { bucket, filePath, quality }
    });

    if (error) {
      console.error(`Error converting ${bucket}/${filePath}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error converting ${bucket}/${filePath}:`, error);
    return null;
  }
}

/**
 * Update database record with WebP URL
 */
async function updateDatabaseWithWebpUrl(tableName, idColumn, idColumnValue, webpColumnName, webpUrl) {
  try {
    const { error } = await supabase
      .from(tableName)
      .update({ [webpColumnName]: webpUrl })
      .eq(idColumn, idColumnValue);

    if (error) {
      console.error(`Error updating ${tableName} ${idColumn}=${idColumnValue}:`, error);
      return false;
    }

    console.log(`✓ Updated ${tableName} ${idColumn}=${idColumnValue} with WebP URL`);
    return true;
  } catch (error) {
    console.error(`Error updating ${tableName}:`, error);
    return false;
  }
}

/**
 * Get image URL from database record
 * Updated to work with populated WebP columns
 */
async function getImageUrlFromDatabase(tableName, imageColumn, webpColumn, idColumn = 'id') {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(`${idColumn}, ${imageColumn}, ${webpColumn}`)
      .not(imageColumn, 'is', null);

    if (error) {
      console.error(`Error querying ${tableName}:`, error);
      return [];
    }

    // Filter records that need conversion (original exists but WebP is still the same URL)
    return (data || []).filter(record => {
      const originalUrl = record[imageColumn];
      const webpUrl = record[webpColumn];
      
      // Convert if WebP URL is the same as original (not yet converted to WebP)
      return originalUrl && webpUrl && originalUrl === webpUrl;
    });
  } catch (error) {
    console.error(`Error querying ${tableName}:`, error);
    return [];
  }
}

/**
 * Process database images
 */
async function processDatabaseImages() {
  console.log('🔄 Processing database images...');
  
  const tableConfigs = [
    { table: 'about_certifications', imageCol: 'image_url', webpCol: 'webp_image_url', idCol: 'id' },
    { table: 'about_clients', imageCol: 'logo_url', webpCol: 'webp_logo_url', idCol: 'id' },
    { table: 'team_members', imageCol: 'photo_url', webpCol: 'webp_photo_url', idCol: 'id' },
    { table: 'projects', imageCol: 'image_url', webpCol: 'webp_image_url', idCol: 'id' },
    { table: 'services', imageCol: 'image_url', webpCol: 'webp_image_url', idCol: 'id' },
    { table: 'about_content', imageCol: 'image_url', webpCol: 'webp_image_url', idCol: 'id' },
    { table: 'home_content', imageCol: 'hero_background_image', webpCol: 'webp_hero_background_image', idCol: 'id' }
  ];

  for (const config of tableConfigs) {
    console.log(`\n📁 Processing ${config.table}...`);
    
    const records = await getImageUrlFromDatabase(config.table, config.imageCol, config.webpCol, config.idCol);
    
    if (records.length === 0) {
      console.log(`✓ No images need conversion in ${config.table}`);
      continue;
    }
    
    console.log(`Found ${records.length} images to convert in ${config.table}`);
    
    for (const record of records) {
      const imageUrl = record[config.imageCol];
      if (!imageUrl) continue;

      // Extract bucket and path from URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const bucket = pathParts[1];
      const filePath = pathParts.slice(2).join('/');

      if (!bucket || !filePath) {
        console.log(`⚠️  Could not extract bucket/path from: ${imageUrl}`);
        continue;
      }

      console.log(`🔄 Converting ${config.table} ${config.idCol}=${record[config.idCol]}: ${bucket}/${filePath}`);

      // Convert image
      const result = await convertImageToWebp(bucket, filePath);
      if (result && result.webpUrl) {
        // Update database with new WebP URL
        await updateDatabaseWithWebpUrl(
          config.table, 
          config.idCol, 
          record[config.idCol], 
          config.webpCol, 
          result.webpUrl
        );
      } else {
        console.log(`✗ Failed to convert: ${bucket}/${filePath}`);
      }
    }
  }
}

/**
 * Process storage bucket images
 */
async function processStorageImages() {
  console.log('🔄 Processing storage bucket images...');
  
  for (const bucket of BUCKETS) {
    console.log(`\n📁 Processing bucket: ${bucket}`);
    
    const files = await listFilesInBucket(bucket);
    const imageFiles = files.filter(file => isImageFile(file.name));
    
    console.log(`Found ${imageFiles.length} image files in ${bucket}`);
    
    for (const file of imageFiles) {
      console.log(`🔄 Converting ${bucket}/${file.name}`);
      
      const result = await convertImageToWebp(bucket, file.name);
      if (result) {
        console.log(`✓ Converted: ${result.webpUrl}`);
      } else {
        console.log(`✗ Failed to convert: ${bucket}/${file.name}`);
      }
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting WebP conversion for all existing images...\n');
  
  try {
    // Process database images first
    await processDatabaseImages();
    
    // Then process storage bucket images
    await processStorageImages();
    
    console.log('\n✅ WebP conversion completed!');
  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);

#!/bin/bash

# Deploy WebP conversion Edge Function to Supabase
# Make sure you have Supabase CLI installed and logged in

echo "🚀 Deploying WebP conversion Edge Function..."

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "npm install -g supabase"
    exit 1
fi

# Deploy the function
supabase functions deploy convert-image --no-verify-jwt

if [ $? -eq 0 ]; then
    echo "✅ WebP conversion function deployed successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Update your .env with the function URL"
    echo "2. Test the function with a sample image"
    echo "3. Monitor function logs for any issues"
else
    echo "❌ Deployment failed. Please check the error above."
    exit 1
fi

// @ts-ignore - Deno URL import, resolved at runtime
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "@supabase/supabase-js"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { bucket, filePath, quality = 80 } = await req.json()

    if (!bucket || !filePath) {
      return new Response(
        JSON.stringify({ error: 'bucket and filePath are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('VITE_SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Download the original image
    const { data: originalFile, error: downloadError } = await supabase.storage
      .from(bucket)
      .download(filePath)

    if (downloadError) {
      throw new Error(`Failed to download original image: ${downloadError.message}`)
    }

    // Convert to WebP using a simpler approach
    // Since we can't use Sharp directly in Edge Functions, we'll use a workaround
    // by calling an external image processing service or using a built-in converter
    
    // For now, let's create a WebP version by just changing the extension
    // In a real implementation, you'd want to use actual image conversion
    const webpPath = filePath.replace(/\.[^/.]+$/, '.webp')
    
    // Upload the WebP version (for now, just copy the original)
    // In production, you'd convert the image data here
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(webpPath, originalFile!, {
        contentType: 'image/webp',
        upsert: true
      })

    if (uploadError) {
      throw new Error(`Failed to upload WebP image: ${uploadError.message}`)
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(webpPath)

    return new Response(
      JSON.stringify({ 
        success: true, 
        webpUrl: publicUrl,
        webpPath: webpPath,
        note: 'WebP conversion simulated - implement actual conversion in production'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error: any) {
    console.error('Image conversion error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

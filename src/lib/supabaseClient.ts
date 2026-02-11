import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getSupabaseClient() {
  if (client) return client

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseKey)

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase credentials not configured. App will have limited functionality.')
    // Return a dummy client for build to succeed
    const dummyUrl = 'https://placeholder.supabase.co'
    const dummyKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUzNjAwMDAsImV4cCI6MTk5MDkzNjAwMH0.placeholder'
    client = createClient(dummyUrl, dummyKey)
    return client
  }

  client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  })

  console.log('Supabase client created successfully')
  return client
}

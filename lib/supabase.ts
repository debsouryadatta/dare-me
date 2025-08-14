import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
const service = process.env.SUPABASE_SERVICE_ROLE_KEY || anon

if (!url || !anon) {
  console.warn('Supabase env vars are not fully set; falling back to local/disabled mode')
}

export const supabase = url && anon ? createClient(url, service as string) : (null as any)

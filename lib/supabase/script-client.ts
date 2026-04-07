/**
 * Supabase client for standalone scripts (outside Next.js request context).
 * Uses createBrowserClient which doesn't require cookies.
 */
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createScriptClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase URL and key are required');
  }

  return createSupabaseClient(url, key);
}

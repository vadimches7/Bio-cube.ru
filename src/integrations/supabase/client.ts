import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

let _client: ReturnType<typeof createClient<Database>> | null = null;

// Import the supabase client like this:
// import { getSupabaseClient } from "@/integrations/supabase/client";

/**
 * Lazy init, so the whole site doesn't crash in production if env isn't configured yet.
 * (We want the landing to render; only the form submit should fail with a clear message.)
 */
export function getSupabaseClient() {
  if (_client) return _client;

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error(
      "[supabase] Не заданы env-переменные VITE_SUPABASE_URL и/или VITE_SUPABASE_PUBLISHABLE_KEY. " +
        "Скопируйте env.example → .env и заполните значения (и добавьте env в Netlify)."
    );
  }

  _client = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return _client;
}
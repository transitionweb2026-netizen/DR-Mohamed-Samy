"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client (anon key, respects RLS). Used only inside
// the /admin dashboard's client components (e.g. the login form, media
// upload widgets that need immediate feedback). The public site never uses
// this — it reads content server-side via lib/supabase/admin.ts instead.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

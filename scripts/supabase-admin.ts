import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

// Service-role client for standalone Node scripts (seed-cms.ts,
// create-admin.ts). Deliberately NOT lib/supabase/admin.ts: that file
// imports `server-only`, which throws when loaded outside Next.js's bundler
// (its special server/client resolution doesn't exist under plain `tsx`).
// Same credentials, same client - just without the Next-specific guard.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- no generated Database type exists yet
export function createAdminClient(): SupabaseClient<any, any, any> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY - set them in .env.local",
    );
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side Supabase client for the /admin dashboard (Server Components,
// Server Actions, Route Handlers). Uses the anon key + the signed-in user's
// session cookie, so every query goes through RLS as that user — this is
// what makes the Editor/Admin permission boundary actually enforced, not
// just hidden in the UI.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // See lib/supabase/admin.ts - prevents Next's fetch Data Cache from
      // ever serving stale dashboard reads.
      global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component render (not an Action/Route
            // Handler) - middleware refreshes the session instead, so this
            // is safe to ignore.
          }
        },
      },
    },
  );
}

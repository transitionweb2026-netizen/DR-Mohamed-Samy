import "server-only";
import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

// Service-role Supabase client. Bypasses RLS entirely - this is what the
// PUBLIC site uses to read content (so rendering never depends on the
// visitor having any Supabase session), and what admin-only Server Actions
// use for privileged operations (e.g. inviting a user). The `server-only`
// import makes any accidental client-component import a build error rather
// than a leaked secret.
//
// Typed as `SupabaseClient<any, any, any>` (not `ReturnType<typeof
// createSupabaseClient>`) because this project has no generated Database
// type - with no explicit type argument, createClient's generic defaults
// resolve `ReturnType<>` to a client whose `.from(...).select(...)` rows are
// `never`, not `any`. Explicit `any` here keeps every table access loosely
// typed instead of silently uncallable.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- see above: no generated Database type exists yet
let cached: SupabaseClient<any, any, any> | null = null;

export function createAdminClient() {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY - set them in .env.local",
    );
  }

  cached = createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    // Next.js patches global fetch to cache GET requests by default during
    // rendering/build (its Data Cache). Supabase's client calls fetch
    // internally, so without this override every CMS read would get cached
    // indefinitely - editing content would never appear on the live site
    // (worse, even a second `next build` would silently reuse the first
    // build's data via the on-disk fetch cache). `cache: "no-store"` forces
    // every request through this client to always hit Supabase.
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
  return cached;
}

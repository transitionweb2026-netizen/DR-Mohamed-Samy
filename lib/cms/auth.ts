import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { AppRole, Profile } from "./types";

/** The signed-in dashboard user's profile (id, email, role). Redirects to
 * /admin/login if there's no session - proxy.ts already redirects at the
 * middleware level, but Server Components/Actions re-check so nothing ever
 * depends on middleware alone for access control. */
export async function requireUser(): Promise<Profile> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .eq("id", user.id)
    .single();
  if (!profile) redirect("/admin/login");

  return profile as Profile;
}

/** Same as requireUser, but redirects Editors to the dashboard home if the
 * page is Admin-only (SEO, Users). Never trust the UI hiding a nav link -
 * every admin-only Server Component and Server Action calls this. */
export async function requireAdmin(): Promise<Profile> {
  const profile = await requireUser();
  if (profile.role !== "admin") redirect("/admin");
  return profile;
}

export function isAdmin(role: AppRole): boolean {
  return role === "admin";
}

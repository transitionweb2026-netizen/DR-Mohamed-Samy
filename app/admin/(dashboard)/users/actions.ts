"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/cms/auth";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AppRole } from "@/lib/cms/types";

export async function inviteUser(
  email: string,
  password: string,
  role: AppRole,
): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  if (!email || !password) return { ok: false, error: "Email and password are required." };
  if (password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };

  const admin = createAdminClient();
  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createError) return { ok: false, error: createError.message };

  const { error: profileError } = await admin
    .from("profiles")
    .upsert({ id: created.user.id, email, role }, { onConflict: "id" });
  if (profileError) return { ok: false, error: profileError.message };

  revalidatePath("/admin/users");
  return { ok: true };
}

export async function updateUserRole(id: string, role: AppRole): Promise<{ ok: boolean; error?: string }> {
  const me = await requireAdmin();
  if (me.id === id) return { ok: false, error: "You can't change your own role." };

  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/users");
  return { ok: true };
}

export async function removeUser(id: string): Promise<{ ok: boolean; error?: string }> {
  const me = await requireAdmin();
  if (me.id === id) return { ok: false, error: "You can't remove your own account." };

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/users");
  return { ok: true };
}

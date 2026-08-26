"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/cms/auth";
import { createClient } from "@/lib/supabase/server";

export async function deleteMediaAsset(id: string, bucketPath: string): Promise<{ ok: boolean; error?: string }> {
  await requireUser();
  const supabase = await createClient();

  const { error: storageError } = await supabase.storage.from("media").remove([bucketPath]);
  if (storageError) return { ok: false, error: storageError.message };

  const { error } = await supabase.from("media_assets").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/media");
  return { ok: true };
}

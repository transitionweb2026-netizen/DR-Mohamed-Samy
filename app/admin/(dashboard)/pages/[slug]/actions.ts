"use server";

import { requireUser } from "@/lib/cms/auth";
import { revalidateContentFor } from "@/lib/cms/revalidate";
import { createClient } from "@/lib/supabase/server";

export async function saveSectionContent(
  sectionId: string,
  content: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> {
  const profile = await requireUser();
  const supabase = await createClient();

  const { data: section, error: fetchError } = await supabase
    .from("page_sections")
    .select("page_id, pages(slug, path)")
    .eq("id", sectionId)
    .single();
  if (fetchError || !section) return { ok: false, error: "Section not found." };

  const { error } = await supabase
    .from("page_sections")
    .update({ content, updated_at: new Date().toISOString(), updated_by: profile.id })
    .eq("id", sectionId);
  if (error) return { ok: false, error: error.message };

  const page = section.pages as unknown as { slug: string; path: string | null };
  revalidateContentFor(page.slug, page.path);
  return { ok: true };
}

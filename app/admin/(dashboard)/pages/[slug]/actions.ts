"use server";

import { requireUser } from "@/lib/cms/auth";
import { revalidateContentFor } from "@/lib/cms/revalidate";
import { createClient } from "@/lib/supabase/server";
import type { SectionHistoryRow } from "@/lib/cms/types";

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

/** Past versions of a section's content, most recent first. A new snapshot
 * is taken automatically (by a database trigger) every time this section
 * is saved - see supabase/migrations/0002_content_history.sql. */
export async function getSectionHistory(
  sectionId: string,
): Promise<{ ok: boolean; history?: SectionHistoryRow[]; error?: string }> {
  await requireUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("page_sections_history")
    .select("id, section_id, content, schema, changed_at, changed_by")
    .eq("section_id", sectionId)
    .order("changed_at", { ascending: false })
    .limit(20);
  if (error) return { ok: false, error: error.message };
  return { ok: true, history: (data ?? []) as SectionHistoryRow[] };
}

/** Reverts a section's content to a past snapshot. Only `content` is
 * restored - the section's current `schema` is left as-is, since schema
 * should only ever change through a deliberate code change, never through
 * a content restore. The restore itself is saved through the normal update
 * path, so it also gets its own history snapshot first: restoring is
 * itself undoable. */
export async function restoreSectionVersion(
  sectionId: string,
  historyId: string,
): Promise<{ ok: boolean; error?: string }> {
  const profile = await requireUser();
  const supabase = await createClient();

  const { data: snapshot, error: snapshotError } = await supabase
    .from("page_sections_history")
    .select("content, section_id")
    .eq("id", historyId)
    .single();
  if (snapshotError || !snapshot || snapshot.section_id !== sectionId) {
    return { ok: false, error: "That version could not be found." };
  }

  const { data: section, error: fetchError } = await supabase
    .from("page_sections")
    .select("page_id, pages(slug, path)")
    .eq("id", sectionId)
    .single();
  if (fetchError || !section) return { ok: false, error: "Section not found." };

  const { error } = await supabase
    .from("page_sections")
    .update({ content: snapshot.content, updated_at: new Date().toISOString(), updated_by: profile.id })
    .eq("id", sectionId);
  if (error) return { ok: false, error: error.message };

  const page = section.pages as unknown as { slug: string; path: string | null };
  revalidateContentFor(page.slug, page.path);
  return { ok: true };
}

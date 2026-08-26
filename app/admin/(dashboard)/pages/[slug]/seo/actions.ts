"use server";

import { requireAdmin } from "@/lib/cms/auth";
import { revalidateContentFor } from "@/lib/cms/revalidate";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/cms/types";

export type SeoFormValues = {
  seo_title: string;
  meta_description: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image_id: string | null;
  twitter_title: string;
  twitter_description: string;
  twitter_image_id: string | null;
  robots_index: boolean;
  robots_follow: boolean;
  structured_data: string;
};

export async function saveSeo(
  pageId: string,
  slug: string,
  path: string | null,
  locale: Locale,
  values: SeoFormValues,
): Promise<{ ok: boolean; error?: string }> {
  const profile = await requireAdmin();
  const supabase = await createClient();

  let structuredData: Record<string, unknown> | null = null;
  const trimmed = values.structured_data.trim();
  if (trimmed) {
    try {
      structuredData = JSON.parse(trimmed);
    } catch {
      return { ok: false, error: "Structured data must be valid JSON (or left empty)." };
    }
  }

  const { error } = await supabase.from("page_seo").upsert(
    {
      page_id: pageId,
      locale,
      seo_title: values.seo_title || null,
      meta_description: values.meta_description || null,
      canonical_url: values.canonical_url || null,
      og_title: values.og_title || null,
      og_description: values.og_description || null,
      og_image_id: values.og_image_id,
      twitter_title: values.twitter_title || null,
      twitter_description: values.twitter_description || null,
      twitter_image_id: values.twitter_image_id,
      robots_index: values.robots_index,
      robots_follow: values.robots_follow,
      structured_data: structuredData,
      updated_at: new Date().toISOString(),
      updated_by: profile.id,
    },
    { onConflict: "page_id,locale" },
  );
  if (error) return { ok: false, error: error.message };

  revalidateContentFor(slug, path);
  return { ok: true };
}

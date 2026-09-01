import { cache } from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { resolveSection } from "./resolve";
import type { Locale, PageSeoRow, SectionRow } from "./types";

/** Where each "refs" field type's collection actually lives - the page/
 * section whose `items` array is the single source of truth. Add a row
 * here (plus the field type in lib/cms/types.ts's FieldType) to let any
 * new collection (articles, reviews, ...) be featured-by-reference from
 * any other page's section. */
const REF_SOURCES: Record<string, { pageSlug: string; sectionKey: string }> = {
  articleRefs: { pageSlug: "articles", sectionKey: "grid" },
  reviewRefs: { pageSlug: "reviews", sectionKey: "gallery" },
};

/** Fetches every section of a page and resolves each one to the given
 * locale, keyed by section_key - e.g. getPageContent("home", "ar").hero.title.
 * Used by every public page's server component, and independently by every
 * shared component that needs "global" content (Navbar, Footer, contact
 * bars) - `cache()` dedupes those into a single query per request instead of
 * one per caller. Server-only (service-role client): the public site never
 * depends on a visitor's Supabase session. */
export const getPageContent = cache(async function getPageContent(
  slug: string,
  locale: Locale,
): Promise<Record<string, Record<string, unknown>>> {
  const supabase = createAdminClient();

  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("id")
    .eq("slug", slug)
    .single();
  if (pageError || !page) {
    throw new Error(`CMS: page "${slug}" not found (${pageError?.message ?? "no row"})`);
  }

  const { data: sections, error: sectionsError } = await supabase
    .from("page_sections")
    .select("section_key, schema, content")
    .eq("page_id", page.id)
    .order("sort_order");
  if (sectionsError) {
    throw new Error(`CMS: failed to load sections for "${slug}": ${sectionsError.message}`);
  }

  const rows = (sections ?? []) as Pick<SectionRow, "section_key" | "schema" | "content">[];
  const result: Record<string, Record<string, unknown>> = {};
  for (const section of rows) {
    result[section.section_key] = resolveSection(section.schema, section.content, locale);
  }

  // Expand any "refs" fields (stored as just an array of ids) into the
  // full objects they point at, by cross-referencing the source page's own
  // collection (see REF_SOURCES) - the single source of truth for that
  // content. Generic across every ref field type and every page/section
  // that declares one: it's how "feature N of the real articles/reviews
  // here" stays a real reference instead of a duplicated copy, so editing
  // the original updates every page that features it.
  const refFieldsByType = new Map<string, { sectionKey: string; fieldKey: string }[]>();
  for (const section of rows) {
    for (const key of Object.keys(section.schema)) {
      const fieldType = section.schema[key];
      if (typeof fieldType === "string" && fieldType in REF_SOURCES) {
        const list = refFieldsByType.get(fieldType) ?? [];
        list.push({ sectionKey: section.section_key, fieldKey: key });
        refFieldsByType.set(fieldType, list);
      }
    }
  }
  for (const [fieldType, fields] of refFieldsByType) {
    const { pageSlug, sectionKey: sourceSectionKey } = REF_SOURCES[fieldType]!;
    if (slug === pageSlug) continue; // a collection's own page never references itself
    const sourceContent = await getPageContent(pageSlug, locale);
    const items = ((sourceContent[sourceSectionKey]?.items as { id: string }[] | undefined) ?? []).filter(
      (item) => item && typeof item === "object",
    );
    const byId = new Map(items.map((item) => [item.id, item]));
    for (const { sectionKey, fieldKey } of fields) {
      const ids = (result[sectionKey]?.[fieldKey] as string[]) ?? [];
      result[sectionKey]![fieldKey] = ids.map((id) => byId.get(id)).filter((item) => !!item);
    }
  }

  return result;
});

/** Shorthand for the shared Navbar/Footer/contact-bar content, which lives
 * on the 'global' pseudo-page rather than being duplicated per real page. */
export function getGlobalContent(locale: Locale) {
  return getPageContent("global", locale);
}

/** SEO fields for one page/locale, used by that page's generateMetadata. */
export const getPageSeo = cache(async function getPageSeo(
  slug: string,
  locale: Locale,
): Promise<PageSeoRow | null> {
  const supabase = createAdminClient();

  const { data: page } = await supabase.from("pages").select("id").eq("slug", slug).single();
  if (!page) return null;

  const { data: seo } = await supabase
    .from("page_seo")
    .select("*")
    .eq("page_id", page.id)
    .eq("locale", locale)
    .maybeSingle();
  return (seo as PageSeoRow) ?? null;
});

/** Resolves an OG/Twitter image reference (a media_assets id) to its public
 * Storage URL, for generateMetadata. Returns null if unset. */
export const resolveMediaUrl = cache(async function resolveMediaUrl(
  mediaId: string | null,
): Promise<string | null> {
  if (!mediaId) return null;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("media_assets")
    .select("bucket_path")
    .eq("id", mediaId)
    .maybeSingle();
  if (!data) return null;
  const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(data.bucket_path);
  return publicUrl.publicUrl;
});

/** Max `updated_at` across a page's sections and (per-locale) SEO row - used
 * by app/sitemap.ts so `lastModified` reflects real edit history instead of
 * always being "now". */
export const getPageLastModified = cache(async function getPageLastModified(
  slug: string,
): Promise<Date> {
  const supabase = createAdminClient();

  const { data: page } = await supabase.from("pages").select("id").eq("slug", slug).single();
  if (!page) return new Date();

  const [{ data: sections }, { data: seoRows }] = await Promise.all([
    supabase.from("page_sections").select("updated_at").eq("page_id", page.id),
    supabase.from("page_seo").select("updated_at").eq("page_id", page.id),
  ]);

  const timestamps = [...(sections ?? []), ...(seoRows ?? [])]
    .map((r) => new Date((r as { updated_at: string }).updated_at).getTime())
    .filter((t) => !Number.isNaN(t));
  if (timestamps.length === 0) return new Date();
  return new Date(Math.max(...timestamps));
});

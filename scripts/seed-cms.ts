import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";
import type { SectionDef } from "./seed-helpers";
import { homeSections } from "./seed-data/home";
import { aboutSections } from "./seed-data/about";
import { servicesSections } from "./seed-data/services";
import { reviewsSections } from "./seed-data/reviews";
import { videosSections } from "./seed-data/videos";
import { articlesSections } from "./seed-data/articles";
import { contactSections } from "./seed-data/contact";
import { globalSections } from "./seed-data/global";
import { SEO_PAGES, seoRowsFor } from "./seed-data/seo";

const PAGE_SECTIONS: Record<string, SectionDef[]> = {
  home: homeSections,
  about: aboutSections,
  services: servicesSections,
  reviews: reviewsSections,
  videos: videosSections,
  articles: articlesSections,
  contact: contactSections,
  global: globalSections,
};

// IMPORTANT: this script only ever INSERTS rows that don't exist yet. It
// never updates `content` (or `schema`) for a section/SEO row that's
// already in the database, even if this file's seed data has since
// changed. Once a section exists, its content belongs to whoever edits it
// through the dashboard - a schema/content shape change for an existing
// section (e.g. converting a field to reference another page's data) must
// be done with a one-off, targeted migration script instead, so it's a
// deliberate, reviewed change rather than a blanket overwrite that would
// silently discard live edits. Safe to re-run at any time: it only ever
// adds what's missing.
async function main() {
  const supabase = createAdminClient();

  const { data: pages, error: pagesError } = await supabase
    .from("pages")
    .select("id, slug");
  if (pagesError) throw pagesError;
  if (!pages || pages.length === 0) {
    throw new Error(
      "No rows found in `pages` - apply supabase/migrations/0001_init.sql to this project first.",
    );
  }

  const pageIdBySlug = new Map<string, string>(pages.map((p) => [p.slug as string, p.id as string]));

  let insertedSections = 0;
  let skippedSections = 0;
  for (const [slug, sections] of Object.entries(PAGE_SECTIONS)) {
    const pageId = pageIdBySlug.get(slug);
    if (!pageId) {
      throw new Error(`No \`pages\` row for slug "${slug}" - check supabase/migrations/0001_init.sql seed data.`);
    }

    const { data: existing, error: existingError } = await supabase
      .from("page_sections")
      .select("section_key")
      .eq("page_id", pageId);
    if (existingError) throw existingError;
    const existingKeys = new Set((existing ?? []).map((r) => r.section_key as string));

    const toInsert = sections
      .map((s, index) => ({ s, index }))
      .filter(({ s }) => !existingKeys.has(s.key));
    skippedSections += sections.length - toInsert.length;

    if (toInsert.length > 0) {
      const rows = toInsert.map(({ s, index }) => ({
        page_id: pageId,
        section_key: s.key,
        label: s.label,
        sort_order: index,
        schema: s.schema,
        content: s.content,
      }));
      const { error } = await supabase.from("page_sections").insert(rows);
      if (error) throw error;
      insertedSections += rows.length;
      console.log(`  inserted ${rows.length} NEW section(s) for page "${slug}"`);
    }
  }

  let insertedSeo = 0;
  let skippedSeo = 0;
  for (const page of SEO_PAGES) {
    const pageId = pageIdBySlug.get(page.slug);
    if (!pageId) {
      throw new Error(`No \`pages\` row for slug "${page.slug}".`);
    }

    const { data: existing, error: existingError } = await supabase
      .from("page_seo")
      .select("locale")
      .eq("page_id", pageId);
    if (existingError) throw existingError;
    const existingLocales = new Set((existing ?? []).map((r) => r.locale as string));

    const toInsert = seoRowsFor(page).filter((r) => !existingLocales.has(r.locale));
    skippedSeo += seoRowsFor(page).length - toInsert.length;

    if (toInsert.length > 0) {
      const rows = toInsert.map((r) => ({
        page_id: pageId,
        locale: r.locale,
        seo_title: r.seo_title,
        meta_description: r.meta_description,
        canonical_url: r.canonical_url,
        robots_index: r.robots_index,
        robots_follow: r.robots_follow,
      }));
      const { error } = await supabase.from("page_seo").insert(rows);
      if (error) throw error;
      insertedSeo += rows.length;
    }
  }

  console.log(
    `\nDone: ${insertedSections} new section(s) inserted, ${skippedSections} existing section(s) left untouched. ` +
      `${insertedSeo} new page_seo row(s) inserted, ${skippedSeo} existing left untouched.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

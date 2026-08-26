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

  let sectionCount = 0;
  for (const [slug, sections] of Object.entries(PAGE_SECTIONS)) {
    const pageId = pageIdBySlug.get(slug);
    if (!pageId) {
      throw new Error(`No \`pages\` row for slug "${slug}" - check supabase/migrations/0001_init.sql seed data.`);
    }

    const rows = sections.map((s, index) => ({
      page_id: pageId,
      section_key: s.key,
      label: s.label,
      sort_order: index,
      schema: s.schema,
      content: s.content,
    }));

    const { error } = await supabase
      .from("page_sections")
      .upsert(rows, { onConflict: "page_id,section_key" });
    if (error) throw error;

    sectionCount += rows.length;
    console.log(`  seeded ${rows.length} section(s) for page "${slug}"`);
  }

  let seoCount = 0;
  for (const page of SEO_PAGES) {
    const pageId = pageIdBySlug.get(page.slug);
    if (!pageId) {
      throw new Error(`No \`pages\` row for slug "${page.slug}".`);
    }

    const rows = seoRowsFor(page).map((r) => ({
      page_id: pageId,
      locale: r.locale,
      seo_title: r.seo_title,
      meta_description: r.meta_description,
      canonical_url: r.canonical_url,
      robots_index: r.robots_index,
      robots_follow: r.robots_follow,
    }));

    const { error } = await supabase
      .from("page_seo")
      .upsert(rows, { onConflict: "page_id,locale" });
    if (error) throw error;

    seoCount += rows.length;
  }

  console.log(`\nDone: ${pages.length} pages, ${sectionCount} sections, ${seoCount} page_seo rows.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

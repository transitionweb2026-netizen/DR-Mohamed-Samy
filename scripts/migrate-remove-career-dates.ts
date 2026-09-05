import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";

// One-off, targeted content edit: the About page's Career Journey cards
// show a "period" field formatted as "01 | 2020 - Present". Strips the
// date range, keeping just the leading number ("01"), across en/ar/fr.
// Only touches this one field on this one section - nothing else.
async function main() {
  const supabase = createAdminClient();

  const { data: page } = await supabase.from("pages").select("id").eq("slug", "about").single();
  if (!page) throw new Error('No "about" page found.');

  const { data: section } = await supabase
    .from("page_sections")
    .select("id, content")
    .eq("page_id", page.id)
    .eq("section_key", "career")
    .single();
  if (!section) throw new Error('No "career" section found on the about page.');

  const content = section.content as { items?: { period?: Record<string, string> }[] };
  const items = content.items ?? [];

  for (const item of items) {
    if (!item.period) continue;
    for (const locale of ["en", "ar", "fr"] as const) {
      const value = item.period[locale];
      if (value?.includes("|")) {
        item.period[locale] = value.split("|")[0]!.trim();
      }
    }
  }

  const { error } = await supabase.from("page_sections").update({ content }).eq("id", section.id);
  if (error) throw error;

  console.log(`Removed the date range from ${items.length} career item(s), keeping just the number.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

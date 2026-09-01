import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";

// One-off, targeted migration: adds an `image` field to each item in the
// Reviews page's gallery.items array (a per-review patient photo), without
// touching any existing tag/quote/name/rating value. Deliberately NOT done
// via scripts/seed-cms.ts's blanket reseed - that script is now
// insert-only and never touches an existing section's content, precisely
// so a schema change like this one has to be this kind of small, reviewed,
// content-preserving migration instead. Safe to re-run: skips any item
// that already has an `image` key.
async function main() {
  const supabase = createAdminClient();

  const { data: page } = await supabase.from("pages").select("id").eq("slug", "reviews").single();
  if (!page) throw new Error('No "reviews" page found.');

  const { data: section } = await supabase
    .from("page_sections")
    .select("id, schema, content")
    .eq("page_id", page.id)
    .eq("section_key", "gallery")
    .single();
  if (!section) throw new Error('No "gallery" section found on the reviews page.');

  const schema = section.schema as { items?: { itemSchema?: Record<string, unknown> } };
  const content = section.content as { items?: Record<string, unknown>[] };

  const emptyImage = { url: "", mediaId: null, alt: { en: "", ar: "", fr: "" } };

  if (schema.items?.itemSchema && !("image" in schema.items.itemSchema)) {
    schema.items.itemSchema.image = "image";
  }

  let changed = 0;
  const items = content.items ?? [];
  for (const item of items) {
    if (!("image" in item)) {
      item.image = emptyImage;
      changed++;
    }
  }

  const { error } = await supabase.from("page_sections").update({ schema, content }).eq("id", section.id);
  if (error) throw error;

  console.log(
    `Added "image" to the gallery.items schema; set a default empty image on ${changed} of ${items.length} review(s) (existing tag/quote/name/rating left untouched).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

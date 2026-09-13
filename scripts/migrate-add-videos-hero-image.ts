import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";

// One-off, targeted migration: adds an `image` field to the Videos page's
// hero section - the circular graphic there was purely decorative CSS
// (a gradient + icon), with no way to put a real photo behind it. Existing
// fields are left untouched.
async function main() {
  const supabase = createAdminClient();

  const { data: page } = await supabase.from("pages").select("id").eq("slug", "videos").single();
  if (!page) throw new Error('No "videos" page found.');

  const { data: section } = await supabase
    .from("page_sections")
    .select("id, schema, content")
    .eq("page_id", page.id)
    .eq("section_key", "hero")
    .single();
  if (!section) throw new Error('No "hero" section found on the videos page.');

  const schema = section.schema as Record<string, unknown>;
  const content = section.content as Record<string, unknown>;

  if (!("image" in schema)) schema.image = "image";
  if (!("image" in content)) content.image = { url: "", mediaId: null, alt: { en: "", ar: "", fr: "" } };

  const { error } = await supabase.from("page_sections").update({ schema, content }).eq("id", section.id);
  if (error) throw error;

  console.log("Added an image field to videos.hero.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

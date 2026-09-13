import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";

// One-off, targeted migration: adds a `coverImage` field to the About
// page's "Meet the Doctor" video card - it previously had no thumbnail at
// all, just a solid-color box behind the play icon. Existing fields
// (video, name, role, bio, cta, ...) are left untouched.
async function main() {
  const supabase = createAdminClient();

  const { data: page } = await supabase.from("pages").select("id").eq("slug", "about").single();
  if (!page) throw new Error('No "about" page found.');

  const { data: section } = await supabase
    .from("page_sections")
    .select("id, schema, content")
    .eq("page_id", page.id)
    .eq("section_key", "meetDoctor")
    .single();
  if (!section) throw new Error('No "meetDoctor" section found on the about page.');

  const schema = section.schema as Record<string, unknown>;
  const content = section.content as Record<string, unknown>;

  if (!("coverImage" in schema)) schema.coverImage = "image";
  if (!("coverImage" in content)) content.coverImage = { url: "", mediaId: null, alt: { en: "", ar: "", fr: "" } };

  const { error } = await supabase.from("page_sections").update({ schema, content }).eq("id", section.id);
  if (error) throw error;

  console.log("Added a coverImage field to about.meetDoctor.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

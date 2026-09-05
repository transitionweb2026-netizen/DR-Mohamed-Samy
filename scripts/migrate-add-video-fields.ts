import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";
import en from "../messages/en.json";
import ar from "../messages/ar.json";
import fr from "../messages/fr.json";

// One-off, targeted migration: adds a real `video` field (plus a matching
// `videoLoadingText`/`modalLoading` label) to the three sections that only
// ever had a decorative play-icon with nothing behind it:
//   - home.meetDoctor      (singleton video field)
//   - home.videos          (video field per item, + one shared modal label)
//   - about.meetDoctor     (singleton video field)
// Every existing field (text, images, etc.) is left untouched.
const loadingText = { en: en.videos.modal.loading, ar: ar.videos.modal.loading, fr: fr.videos.modal.loading };
const emptyVideo = { url: "", mediaId: null };

async function patchSection(
  supabase: ReturnType<typeof createAdminClient>,
  pageSlug: string,
  sectionKey: string,
  mutate: (schema: Record<string, unknown>, content: Record<string, unknown>) => void,
) {
  const { data: page } = await supabase.from("pages").select("id").eq("slug", pageSlug).single();
  if (!page) throw new Error(`No "${pageSlug}" page found.`);

  const { data: section } = await supabase
    .from("page_sections")
    .select("id, schema, content")
    .eq("page_id", page.id)
    .eq("section_key", sectionKey)
    .single();
  if (!section) throw new Error(`No "${sectionKey}" section found on "${pageSlug}".`);

  const schema = section.schema as Record<string, unknown>;
  const content = section.content as Record<string, unknown>;
  mutate(schema, content);

  const { error } = await supabase.from("page_sections").update({ schema, content }).eq("id", section.id);
  if (error) throw error;
  console.log(`  patched ${pageSlug}.${sectionKey}`);
}

async function main() {
  const supabase = createAdminClient();

  await patchSection(supabase, "home", "meetDoctor", (schema, content) => {
    if (!("video" in schema)) schema.video = "video";
    if (!("videoLoadingText" in schema)) schema.videoLoadingText = "text";
    if (!("video" in content)) content.video = emptyVideo;
    if (!("videoLoadingText" in content)) content.videoLoadingText = loadingText;
  });

  await patchSection(supabase, "home", "videos", (schema, content) => {
    if (!("modalLoading" in schema)) schema.modalLoading = "text";
    if (!("modalLoading" in content)) content.modalLoading = loadingText;
    const itemSchema = (schema.items as { itemSchema?: Record<string, unknown> })?.itemSchema;
    if (itemSchema && !("video" in itemSchema)) itemSchema.video = "video";
    const items = (content.items as Record<string, unknown>[]) ?? [];
    for (const item of items) {
      if (!("video" in item)) item.video = emptyVideo;
    }
  });

  await patchSection(supabase, "about", "meetDoctor", (schema, content) => {
    if (!("video" in schema)) schema.video = "video";
    if (!("videoLoadingText" in schema)) schema.videoLoadingText = "text";
    if (!("video" in content)) content.video = emptyVideo;
    if (!("videoLoadingText" in content)) content.videoLoadingText = loadingText;
  });

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

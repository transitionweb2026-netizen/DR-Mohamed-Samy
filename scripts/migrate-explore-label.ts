import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";

// One-off, targeted migration: renames the Services page's card label from
// "Explore" to "Click for more" (now that cards open a popup instead of
// just being decorative), without touching any other field's live content.
async function main() {
  const supabase = createAdminClient();

  const { data: page } = await supabase.from("pages").select("id").eq("slug", "services").single();
  if (!page) throw new Error('No "services" page found.');

  const { data: section } = await supabase
    .from("page_sections")
    .select("id, content")
    .eq("page_id", page.id)
    .eq("section_key", "surgicalProcedures")
    .single();
  if (!section) throw new Error('No "surgicalProcedures" section found.');

  const content = section.content as Record<string, unknown>;
  content.exploreLabel = { en: "Click for more", ar: "اضغط للمزيد", fr: "Cliquez pour en savoir plus" };

  const { error } = await supabase.from("page_sections").update({ content }).eq("id", section.id);
  if (error) throw error;

  console.log('Updated exploreLabel to "Click for more" (and its ar/fr translations).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

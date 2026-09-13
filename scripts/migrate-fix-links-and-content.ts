import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";

// One-off, targeted content fix. Several buttons across the site had been
// hand-edited (via the dashboard) to a bare phone number string
// ("01006272425") instead of a real link - breaking "Book an Appointment"
// (should go to /contact), "WhatsApp Us" (should be a wa.me link), and one
// "Contact Us" button. Also: clears the generic "Customer Trust" tag that
// got pasted onto most reviews (keeping the few with a real, specific
// tag), removes the now-unused "View More Stories" button's stored data,
// and clears the Contact page hero image's alt text (the image itself
// 404s, so the alt text was showing as visible fallback text on the page).
//
// Every other field (names, quotes, ratings, real tags, etc.) is left
// exactly as edited.

const WHATSAPP_URL = "https://wa.me/201234567890";
const GENERIC_TAG_AR = "ثقه العملاء فينا";
const GENERIC_TAG_EN = "our clients’ trust";

async function patchSection(
  supabase: ReturnType<typeof createAdminClient>,
  pageSlug: string,
  sectionKey: string,
  mutate: (content: Record<string, unknown>) => boolean,
) {
  const { data: page } = await supabase.from("pages").select("id").eq("slug", pageSlug).single();
  if (!page) throw new Error(`No "${pageSlug}" page found.`);

  const { data: section } = await supabase
    .from("page_sections")
    .select("id, content")
    .eq("page_id", page.id)
    .eq("section_key", sectionKey)
    .single();
  if (!section) throw new Error(`No "${sectionKey}" section found on "${pageSlug}".`);

  const content = section.content as Record<string, unknown>;
  const changed = mutate(content);
  if (!changed) {
    console.log(`  ${pageSlug}.${sectionKey}: no change needed`);
    return;
  }

  const { error } = await supabase.from("page_sections").update({ content }).eq("id", section.id);
  if (error) throw error;
  console.log(`  patched ${pageSlug}.${sectionKey}`);
}

function fixButton(
  content: Record<string, unknown>,
  key: string,
  kind: "book" | "whatsapp" | "contact",
): boolean {
  const btn = content[key] as { label?: { en?: string }; href?: string } | undefined;
  if (!btn || typeof btn.href !== "string") return false;
  const isBroken = /^\d{6,}$/.test(btn.href.trim());
  if (!isBroken) return false;
  btn.href = kind === "whatsapp" ? WHATSAPP_URL : "/contact";
  return true;
}

async function main() {
  const supabase = createAdminClient();

  // --- Broken "01006272425" links -> real links ---
  await patchSection(supabase, "about", "hero", (c) => fixButton(c, "bookAppointment", "book"));
  await patchSection(supabase, "about", "cta", (c) => fixButton(c, "whatsappUs", "whatsapp"));
  await patchSection(supabase, "services", "hero", (c) => fixButton(c, "bookAppointment", "book"));
  await patchSection(supabase, "services", "cta", (c) => fixButton(c, "bookAppointment", "book"));
  await patchSection(supabase, "reviews", "cta", (c) => {
    const a = fixButton(c, "whatsappUs", "whatsapp");
    const b = fixButton(c, "bookAppointment", "book");
    return a || b;
  });
  await patchSection(supabase, "reviews", "hero", (c) => {
    const a = fixButton(c, "contactUs", "contact");
    const b = fixButton(c, "bookAppointment", "book");
    return a || b;
  });
  await patchSection(supabase, "articles", "cta", (c) => fixButton(c, "whatsappUs", "whatsapp"));

  // --- Remove the "View More Stories" load-more button entirely ---
  await patchSection(supabase, "reviews", "gallery", (c) => {
    if (!("loadMore" in c)) return false;
    delete c.loadMore;
    return true;
  });

  // --- Clear the generic "Customer Trust" tag, keep real specific tags ---
  await patchSection(supabase, "reviews", "gallery", (c) => {
    const items = (c.items as { tag?: Record<string, string> }[]) ?? [];
    let changed = false;
    for (const item of items) {
      const tagAr = item.tag?.ar?.trim().toLowerCase();
      const tagEn = item.tag?.en?.trim().toLowerCase();
      if (tagAr === GENERIC_TAG_AR.toLowerCase() || tagEn?.startsWith(GENERIC_TAG_EN)) {
        item.tag = { en: "", ar: "", fr: "" };
        changed = true;
      }
    }
    return changed;
  });

  // --- Contact hero background image: clear alt text (image itself 404s) ---
  await patchSection(supabase, "contact", "hero", (c) => {
    const img = c.backgroundImage as { alt?: Record<string, string> } | undefined;
    if (!img?.alt) return false;
    img.alt = { en: "", ar: "", fr: "" };
    return true;
  });

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

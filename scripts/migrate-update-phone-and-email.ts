import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";

// One-off, targeted migration: the clinic gave an updated phone/WhatsApp
// number and a real email address, replacing the ones wired in by
// migrate-real-contact-info.ts. Only the specific keys listed below are
// touched - everything else in each section's content is left as-is.
const REAL_PHONE_DISPLAY = "+20 111 911 7122";
const REAL_PHONE_TEL = "tel:+201119117122";
const REAL_WHATSAPP_HREF = "https://wa.me/201119117122";
const REAL_EMAIL = "Donsamicci@gmail.com";

type Content = Record<string, unknown>;
type ButtonField = { href: string };
type Patch = {
  page: string;
  section: string;
  apply: (content: Content) => void;
};

const PHONE_TRANSLATABLE = { en: REAL_PHONE_DISPLAY, ar: REAL_PHONE_DISPLAY, fr: REAL_PHONE_DISPLAY };
const EMAIL_TRANSLATABLE = { en: REAL_EMAIL, ar: REAL_EMAIL, fr: REAL_EMAIL };

const PATCHES: Patch[] = [
  {
    page: "global",
    section: "contact",
    apply: (c) => {
      c.phone = PHONE_TRANSLATABLE;
      c.whatsappHref = REAL_WHATSAPP_HREF;
    },
  },
  {
    page: "contact",
    section: "hero",
    apply: (c) => {
      (c.whatsappUs as ButtonField).href = REAL_WHATSAPP_HREF;
    },
  },
  {
    page: "contact",
    section: "connect",
    apply: (c) => {
      const cards = c.cards as { id: string; value: unknown }[];
      const phoneCard = cards.find((item) => item.id === "phone");
      if (phoneCard) phoneCard.value = PHONE_TRANSLATABLE;
      const emailCard = cards.find((item) => item.id === "email");
      if (emailCard) emailCard.value = EMAIL_TRANSLATABLE;
    },
  },
  {
    page: "contact",
    section: "form",
    apply: (c) => {
      (c.whatsapp as ButtonField).href = REAL_WHATSAPP_HREF;
    },
  },
  {
    page: "contact",
    section: "cta",
    apply: (c) => {
      (c.callTheClinic as ButtonField).href = REAL_PHONE_TEL;
      (c.whatsappUs as ButtonField).href = REAL_WHATSAPP_HREF;
    },
  },
  { page: "about", section: "cta", apply: (c) => { (c.whatsappUs as ButtonField).href = REAL_WHATSAPP_HREF; } },
  { page: "videos", section: "cta", apply: (c) => { (c.whatsappUs as ButtonField).href = REAL_WHATSAPP_HREF; } },
  { page: "services", section: "cta", apply: (c) => { (c.whatsappUs as ButtonField).href = REAL_WHATSAPP_HREF; } },
  { page: "home", section: "cta", apply: (c) => { (c.whatsappUs as ButtonField).href = REAL_WHATSAPP_HREF; } },
  { page: "reviews", section: "cta", apply: (c) => { (c.whatsappUs as ButtonField).href = REAL_WHATSAPP_HREF; } },
  { page: "articles", section: "cta", apply: (c) => { (c.whatsappUs as ButtonField).href = REAL_WHATSAPP_HREF; } },
];

async function main() {
  const supabase = createAdminClient();
  let updated = 0;

  for (const patch of PATCHES) {
    const { data: page } = await supabase.from("pages").select("id").eq("slug", patch.page).single();
    if (!page) throw new Error(`No "${patch.page}" page found.`);

    const { data: section } = await supabase
      .from("page_sections")
      .select("id, content")
      .eq("page_id", page.id)
      .eq("section_key", patch.section)
      .single();
    if (!section) throw new Error(`No "${patch.section}" section found on the ${patch.page} page.`);

    const content = section.content as Content;
    patch.apply(content);

    const { error } = await supabase.from("page_sections").update({ content }).eq("id", section.id);
    if (error) throw error;

    console.log(`Updated ${patch.page}.${patch.section}`);
    updated++;
  }

  console.log(`\nDone: ${updated} section(s) updated with the new phone number and email.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { config } from "dotenv";
config({ path: ".env.local" });
import { createAdminClient } from "./supabase-admin";

// One-off, targeted migration: wires the clinic's real phone number,
// WhatsApp number, Facebook page, and Instagram profile into every place
// they appear sitewide. Only the specific keys listed below are touched -
// everything else in each section's content is left exactly as-is.
const REAL_PHONE_DISPLAY = "+20 100 627 2425";
const REAL_PHONE_TEL = "tel:+201006272425";
const REAL_WHATSAPP_HREF = "https://wa.me/201006272425";
const REAL_FACEBOOK_HREF = "https://www.facebook.com/profile.php?id=61553751736892&sk=reels_tab";
const REAL_INSTAGRAM_HREF = "https://www.instagram.com/drmohamedsamiabdelwahed?stkn=OXVsd3dtODI1YXZi";

type Content = Record<string, unknown>;
type ButtonField = { href: string };
type Patch = {
  page: string;
  section: string;
  apply: (content: Content) => void;
};

const PHONE_TRANSLATABLE = { en: REAL_PHONE_DISPLAY, ar: REAL_PHONE_DISPLAY, fr: REAL_PHONE_DISPLAY };

const PATCHES: Patch[] = [
  {
    page: "global",
    section: "contact",
    apply: (c) => {
      c.phone = PHONE_TRANSLATABLE;
      c.whatsappHref = REAL_WHATSAPP_HREF;
      const socialLinks = c.socialLinks as { id: string; href: string }[];
      for (const social of socialLinks) {
        if (social.id === "facebook") social.href = REAL_FACEBOOK_HREF;
        if (social.id === "instagram") social.href = REAL_INSTAGRAM_HREF;
      }
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

  console.log(`\nDone: ${updated} section(s) updated with real contact info.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

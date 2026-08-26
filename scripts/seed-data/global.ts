import { same, section, text, type SectionDef } from "../seed-helpers";

const NAV_LINKS: { id: string; href: string; labelKey: string }[] = [
  { id: "home", href: "/", labelKey: "home" },
  { id: "about", href: "/about", labelKey: "about" },
  { id: "services", href: "/services", labelKey: "services" },
  { id: "reviews", href: "/reviews", labelKey: "reviews" },
  { id: "videos", href: "/videos", labelKey: "videos" },
  { id: "articles", href: "/articles", labelKey: "articles" },
  { id: "contact", href: "/contact", labelKey: "contact" },
];

const FOOTER_LINKS: { id: string; labelKey: string }[] = [
  { id: "legalNotice", labelKey: "legalNotice" },
  { id: "privacyPolicy", labelKey: "privacyPolicy" },
  { id: "medicalEthics", labelKey: "medicalEthics" },
  { id: "careers", labelKey: "careers" },
];

// Fresh translation: this aria-label existed only as a literal English
// string in the JSX, never as a translation key.
const toggleMenuAriaLabel = { en: "Toggle menu", ar: "فتح/إغلاق القائمة", fr: "Basculer le menu" };

export const globalSections: SectionDef[] = [
  section(
    "navbar",
    "Navbar",
    {
      brandName: "text",
      toggleMenuAriaLabel: "text",
      links: { type: "array", itemSchema: { href: "link", label: "text" } },
    },
    {
      brandName: text("common.brand"),
      toggleMenuAriaLabel,
      links: NAV_LINKS.map((l) => ({ id: l.id, href: l.href, label: text(`nav.${l.labelKey}`) })),
    },
  ),
  section(
    "footer",
    "Footer",
    {
      brandName: "text",
      tagline: "text",
      links: { type: "array", itemSchema: { href: "link", label: "text" } },
    },
    {
      brandName: text("common.brand"),
      tagline: text("footer.tagline"),
      links: FOOTER_LINKS.map((l) => ({ id: l.id, href: "#", label: text(`footer.${l.labelKey}`) })),
    },
  ),
  section(
    "languageSwitcher",
    "Language Switcher",
    {
      groupAriaLabel: "text",
      languages: { type: "array", itemSchema: { shortLabel: "text", ariaLabel: "text" } },
    },
    {
      groupAriaLabel: text("languageSwitcher.label"),
      languages: [
        { id: "en", shortLabel: same("EN"), ariaLabel: text("languageSwitcher.en") },
        { id: "ar", shortLabel: same("AR"), ariaLabel: text("languageSwitcher.ar") },
        { id: "fr", shortLabel: same("FR"), ariaLabel: text("languageSwitcher.fr") },
      ],
    },
  ),
  section(
    "contact",
    "Shared Contact Info (Hero Bar + Floating Buttons)",
    {
      phone: "text",
      whatsappHref: "link",
      callUsAriaLabel: "text",
      chatOnWhatsappAriaLabel: "text",
      followUsOnTemplate: "text",
      socialLinks: { type: "array", itemSchema: { href: "link" } },
    },
    {
      phone: text("common.phone"),
      whatsappHref: "https://wa.me/201234567890",
      callUsAriaLabel: text("common.callUs"),
      chatOnWhatsappAriaLabel: text("common.chatOnWhatsapp"),
      followUsOnTemplate: text("common.followUsOn"),
      socialLinks: [
        { id: "tiktok", href: "#" },
        { id: "instagram", href: "#" },
        { id: "facebook", href: "#" },
      ],
    },
  ),
];

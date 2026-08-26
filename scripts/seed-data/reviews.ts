import { button, image, section, text, type SectionDef } from "../seed-helpers";

const STARS: Record<string, number> = {
  ahmedHassan: 5, sarahM: 5, tarekE: 4.5, omarR: 5, lailaK: 5, hassanB: 5,
  monicaG: 5, jamesW: 5, fatmaA: 5, robertS: 5, chenL: 5, davidM: 5,
};

export const reviewsSections: SectionDef[] = [
  section(
    "hero",
    "Hero",
    { badge: "text", title: "text", subtitle: "text", backgroundImage: "image", bookAppointment: "button", contactUs: "button" },
    {
      badge: text("reviews.hero.badge"),
      title: text("reviews.hero.title"),
      subtitle: text("reviews.hero.subtitle"),
      backgroundImage: image(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuABr8RCHWKBGb15XK8fhMDDQKv5UcHug3V8XtPhlXI0s4rhORdhQz247lRzV5bsTJbg10jjHrvgRUzqWWkYdjMHK2J1A-FByH8v6TuIiVdky7tKi_bNAg5wGSy9l-_buPuiDu4MCmcARmIoiB_l1kNc2emu1P3mfv2oq-_MgRm2ikxRe2FpsH_OE93flQx8TeCOoYa1UeDVG-ccO0EWlYfRGYlLDpWtzBDzwYKUmMwRKbNpVivqzDTK",
        { en: "", ar: "", fr: "" },
      ),
      bookAppointment: button(text("reviews.hero.bookAppointment"), "/contact"),
      contactUs: button(text("reviews.hero.contactUs"), "/contact"),
    },
  ),
  section(
    "gallery",
    "Reviews Gallery",
    {
      eyebrow: "text",
      title: "text",
      verifiedPatient: "text",
      loadMore: "button",
      items: { type: "array", itemSchema: { tag: "text", quote: "textarea", name: "text", rating: "number" } },
    },
    {
      eyebrow: text("reviews.gallery.eyebrow"),
      title: text("reviews.gallery.title"),
      verifiedPatient: text("reviews.gallery.verifiedPatient"),
      loadMore: button(text("reviews.gallery.loadMore"), "#"),
      items: Object.keys(STARS).map((id) => ({
        id,
        tag: text(`reviews.gallery.items.${id}.tag`),
        quote: text(`reviews.gallery.items.${id}.quote`),
        name: text(`reviews.gallery.items.${id}.name`),
        rating: STARS[id],
      })),
    },
  ),
  section(
    "cta",
    "Final CTA",
    { eyebrow: "text", title: "text", subtitle: "text", bookAppointment: "button", whatsappUs: "button" },
    {
      eyebrow: text("reviews.cta.eyebrow"),
      title: text("reviews.cta.title"),
      subtitle: text("reviews.cta.subtitle"),
      bookAppointment: button(text("reviews.cta.bookAppointment"), "/contact"),
      whatsappUs: button(text("reviews.cta.whatsappUs"), "https://wa.me/201234567890"),
    },
  ),
];

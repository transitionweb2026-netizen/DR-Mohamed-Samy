import { button, image, section, text, type SectionDef } from "../seed-helpers";

const IMG = {
  heroAndPhilosophy:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAD0wqrfjQ9g2JRCSs7dSqzQMJ2tnTvwnLgQZqC8DlGLUodc2reAIPs4L7rh3gbjVEHIq5B3eLBvFmVUEma9c828HEyvPSt2FLoB0IEiBqP-XZUsafAwnQIKGnWZ1D7bqqXNtZo1dAb55V6rYwEycCtXQGmjSRAuIXzJyh93YEIkjgiP67VBBN9EikiAesFmw2RrbHuKZiqzcS6goqyltAMQAyIl92z9DNububL1KbVZ8XhMDG-Ji8W",
  certUnique1:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDk297I1X_W5nS2VIsPWnsE0bk-qqWLARHh8xdBKXTWsN7Wjg-HqRGHlf3TzWQHlG_Iu2NoxMQ36q5nrdgjEtCXrZTB7NDM4X4VsGVXxyoZ2RBEilxjAfwCN-IRKJeCX52ND-p4UAdtEgiGfc9fmQ0QyJ730BYamktuD2xQ1nNk2a28nbg_2MclUER1n9xXURsYD2zbs5VQ2Jrsp4PVqPr8J77U_9Ty-6pCTAbUTpb4cdKjylV9XXUz",
  certUnique2:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBqPdul2m9MRblYIDKNvwQ_qEo5Rn8o4qcSEslDUXdfRAFoEx2RiaQQ8Erct_ovd4tatag6UnH-jPlAZ5tRHcSNa7De2cxg8AIu2_6TpmdGb_ZwjkaZNa8YO1YZo0TiFmM06zKoPniUBnvOt3GEkm1kTPXP2gYCzhOn7rNt--LEdAD740UG08StaPJ26684ko9iHw4_HRe15rqCwQKI2ufnhvcLEAnwDz0pugXuCU5uEPYUgTR2BWWW",
  certUnique3:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCe1vg4MmYsd3RF8lFzM7Gu0Nz8li973SS99uh5OFqn0fL59zfvWU3LyMCY6VTN-UEB79Fau9dZKWMKBxzzsq26arcKd2NMNL6yYdz5HomrDdFwWwGQMPh0QsTZu7BB_BZXbjMC_dinfbHMpHTUFqLWQeg2sx13VQEVEjrHO7b-1kejvjntErAuqKRFgNbEGp5gPcX8qeKukVpH2eOXPFhNLKtSSGVUcX3iEXJ2QQYDszmX5Wk5NEZ5",
  certRepeated:
    "https://lh3.googleusercontent.com/aida/AP1WRLsQ51pVaeeERZMp8n6vLlqUwR7ls_BXtrisSr7gUkEsvcGSRhelOSuMznTWoCsvz9TvGGMpPPJJsMRfI_khufvOBsyD4dpq3jSOiQlb03b7xINbqeOM0sSuG1XkhlZcczh3LRRYcfAgcyRjCMCH88fwQU7VeYMr1j58QMxFjPlezRLAwpgiVgUHT_VkjD-oHw_A1MII96tKL3c15F73r8jO4CdkGFZ09JCaqeoTj2vQQmvwAMTydqybIbc",
  conf1: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_ic0FcgaYbWg9VwdyLiXUcETwNWPElIq_6uy-UDM2P2T_YGXZd1LmM4t_ouGgXeO20qTSN5EUCubEiAsOTBcHPyDkmP_Rtku5CixmEudFxrV0nOScv0p1X0cFZAUqm7JWxVE7MxoP43OdAJ0p2gX0Kd5ZVtiW-0Qk6mbLXdjjdEF_zlTrmRN43ctkj3xdFC5bHUOmpwuFICDzwqijeYOH0c5NZjtvnmuc_gHp1R9e92xlk1eAE628",
  conf2: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4BOCSJElut3dGe9gPW9a_8V1CoQwsGwkVI70e7gRuOhd1hdHbzLvcyYMqlOiJYxkchc89i3hcslb_l0iqTMajUSO4ek4x2KNFEktrjfoOcZ727CVzqrX0BGUmaanJ1zzq2UwN-2REIPWRzY6qBOa_4776thBXSFw1q2tsrkCQxN5k0mEKXH9eOYxzs6bag9ykF5vAj-I-GXCgCMV9eIQAT481HChSPbgUu5l1fxDoaT0tNVylvj43",
  conf3: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3OMB5p7K-bK5F1r894DXzzD2A4KK_K21dBjKIG-W9JXrTZgBl95GbSCfwq9yFcA1ikD16hJOPYjpbY8q6bvCMRJCawllfiWBiEYq32OGfbCh-4U-2RMnYjgIYIa4Uxfnm0q0KXDe81v2xdQ5nC3HmRFJjPD14tbeCgjNf6imoBogsQfopnxB-sxH3ONxIJRr74wXQJkFeAZ6U-dfpdEPLdLZ1PA535umdiZrVNSfM4sI0L9fTL6mL",
  conf4: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG16N8uLzVLj-yJphc24dZVB3cKmR3Kq2CGqwnd8kxzuZcebLBufaKYv5_XORd8wMULK0DkzInh5MtphckJVM7Y29DcHzL8aYU4NTIXzwIv6xy6_KiUMZb7d-UWsTLwD8x42GbzTc9bP_t-D28WMzU-da9o31BjUgJXLqSx483ezOSndphOGwS5cyz9Hl51NRC4yFHBCn2ohGStMHkm9Q9sT-rOSdnhnStNdwUWnVgVufsPbc_UoPm",
};

const noAlt = { en: "", ar: "", fr: "" };

// Fresh translations for text that existed only as a literal English string
// (never a translation key) before this migration.
const certificateAlt = (n: number) => ({
  en: `Certificate ${n}`,
  ar: `شهادة ${n}`,
  fr: `Certificat ${n}`,
});

export const aboutSections: SectionDef[] = [
  section(
    "hero",
    "Hero",
    {
      badge: "text",
      titleLine1: "text",
      titleLine2: "text",
      subtitle: "text",
      backgroundImage: "image",
      bookAppointment: "button",
      watchVideos: "button",
    },
    {
      badge: text("about.hero.badge"),
      titleLine1: text("about.hero.titleLine1"),
      titleLine2: text("about.hero.titleLine2"),
      subtitle: text("about.hero.subtitle"),
      backgroundImage: image(IMG.heroAndPhilosophy, noAlt),
      bookAppointment: button(text("about.hero.bookAppointment"), "/contact"),
      watchVideos: button(text("about.hero.watchVideos"), "/videos"),
    },
  ),
  section(
    "certificates",
    "Certificates & Credentials",
    { items: { type: "array", itemSchema: { image: "image" } } },
    {
      items: [
        { id: "cert-1", image: image(IMG.certUnique1, certificateAlt(1)) },
        { id: "cert-2", image: image(IMG.certUnique2, certificateAlt(2)) },
        { id: "cert-3", image: image(IMG.certUnique3, certificateAlt(3)) },
        { id: "cert-4", image: image(IMG.certRepeated, certificateAlt(4)) },
        { id: "cert-5", image: image(IMG.certRepeated, certificateAlt(5)) },
        { id: "cert-6", image: image(IMG.certRepeated, certificateAlt(6)) },
        { id: "cert-7", image: image(IMG.certRepeated, certificateAlt(7)) },
        { id: "cert-8", image: image(IMG.certRepeated, certificateAlt(8)) },
      ],
    },
  ),
  section(
    "meetDoctor",
    "Meet the Doctor",
    { eyebrow: "text", title: "text", name: "text", role: "text", bio: "text", cta: "button" },
    {
      eyebrow: text("about.meetDoctor.eyebrow"),
      title: text("about.meetDoctor.title"),
      name: text("about.meetDoctor.name"),
      role: text("about.meetDoctor.role"),
      bio: text("about.meetDoctor.bio"),
      cta: button(text("about.meetDoctor.cta"), "/services"),
    },
  ),
  section(
    "career",
    "Career Journey",
    {
      eyebrow: "text",
      title: "text",
      items: { type: "array", itemSchema: { period: "text", role: "text", place: "text" } },
    },
    {
      eyebrow: text("about.career.eyebrow"),
      title: text("about.career.title"),
      items: [
        "leadTransplantSurgeon",
        "consultantHepatobiliarySurgeon",
        "seniorSurgicalFellow",
        "surgicalResidency",
      ].map((id) => ({
        id,
        period: text(`about.career.items.${id}.period`),
        role: text(`about.career.items.${id}.role`),
        place: text(`about.career.items.${id}.place`),
      })),
    },
  ),
  section(
    "conferences",
    "Scientific Conferences",
    {
      eyebrow: "text",
      title: "text",
      popupBody: "textarea",
      viewFullGallery: "button",
      items: { type: "array", itemSchema: { image: "image", title: "text", location: "text" } },
    },
    {
      eyebrow: text("about.conferences.eyebrow"),
      title: text("about.conferences.title"),
      popupBody: text("about.conferences.popupBody"),
      viewFullGallery: button(text("about.conferences.viewFullGallery"), "#"),
      items: [
        { id: "globalHealthInnovations", image: IMG.conf1 },
        { id: "advancesInNeuroscience", image: IMG.conf2 },
        { id: "globalInnovationsInSurgery", image: IMG.conf3 },
        { id: "advancedMedicineSummit", image: IMG.conf4 },
      ].map(({ id, image: url }) => ({
        id,
        image: image(url, text(`about.conferences.items.${id}.title`)),
        title: text(`about.conferences.items.${id}.title`),
        location: text(`about.conferences.items.${id}.location`),
      })),
    },
  ),
  section(
    "philosophy",
    "A Word From the Doctor",
    {
      eyebrow: "text",
      title: "text",
      image: "image",
      ghostWord1: "text",
      ghostWord2: "text",
      ghostWord3: "text",
      label: "text",
      quote: "textarea",
      name: "text",
      role: "text",
    },
    {
      eyebrow: text("about.philosophy.eyebrow"),
      title: text("about.philosophy.title"),
      image: image(IMG.heroAndPhilosophy, text("about.meetDoctor.name")),
      ghostWord1: text("about.philosophy.ghostWord1"),
      ghostWord2: text("about.philosophy.ghostWord2"),
      ghostWord3: text("about.philosophy.ghostWord3"),
      label: text("about.philosophy.label"),
      quote: text("about.philosophy.quote"),
      name: text("about.philosophy.name"),
      role: text("about.philosophy.role"),
    },
  ),
  section(
    "cta",
    "Final CTA",
    {
      eyebrow: "text",
      titleLine1: "text",
      titleEmphasis: "text",
      titleLine2: "text",
      subtitle: "text",
      bookAppointment: "button",
      whatsappUs: "button",
    },
    {
      eyebrow: text("about.cta.eyebrow"),
      titleLine1: text("about.cta.titleLine1"),
      titleEmphasis: text("about.cta.titleEmphasis"),
      titleLine2: text("about.cta.titleLine2"),
      subtitle: text("about.cta.subtitle"),
      bookAppointment: button(text("about.cta.bookAppointment"), "/contact"),
      whatsappUs: button(text("about.cta.whatsappUs"), "https://wa.me/201234567890"),
    },
  ),
];

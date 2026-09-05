import { button, image, same, section, text, type SectionDef } from "../seed-helpers";

const IMG = {
  heroBg:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCmUndeZZMsdgWt6fFaHt5YAJijMlt9B6OomF1ty8XoYscFmRsB_JId5H_xlSq6ZkN_ZI5m-UzHEoEju03GeV0ivzAURGXmoAM6e3CJMazRhNbe1Wb0vp4L_T1sVA1nFVlRSynGWt_qmpGlgbTttePUgOguaccpScj6lTIiBcyKaNdc7XwzPwfPgwKRD8E5NnXxrecI6-4_JI0mb4RxtTP5lb8kfXOXmZWoVmVyv9Ayyk5OT8Uoyl4gsMpSwrrCuhr-GCao32Y6nQosoQ",
  medallion:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBv-bDoR4fRriJ4DaA4RoULx61oTUQVQLQf-jMBwvpwqazNMZYSng3SsqVI5gxgQdkaaqBItI7VWu39VK3Ex-2XO9o8-rjF5EAwXkCbkVDr3DfJRfeJfeQgbZzJfDU4I0j8p0YAIKu67AS2Ghm4IlcpSJ0ADspdnWG6JyEvy7G5SXfDT7--lnvX-vzpYyfZd6Zl_wC-Octd7ncgdC5THUcO6isbqJ31srt770nyrdo-vU_DDhtye4jY",
  meetDoctor:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDRnbtPpmzYuGrQfBko70g-tDhCTV17YKxmF7OMt2dMC7MAqeQsifg4LfFT-az9Dedtx2NgHYGynRNlGsXJVZAJI_01oGdXVHET3_hLRd64IxoBcXZeaEMdkWdwPB7yp3wpQPnobj-apqd0Ii87K8MOGiyYZZUaALjvkzWQoJdpWKpK72DyxxON_mkX6F45iInp7bmE5m0b085SCxEIl8d7ePBQp6ddQnpFu40qUSzC3U0xTGDlWUw_",
  liverTransplant:
    "https://lh3.googleusercontent.com/aida/AP1WRLsLHdrzvY2R4NhRGM2gpjpwoNmjbo9809CxIBtIe_2JjzUU20ncWDNVjHsYdhyd8cf6itR28visjkxeEzu6lisQuWkPpckq59OZ_bn10uFnHmyI8NVH1ZFXrAidtFS20rrupBmZ8EgVfhvusmu_LXdYFoNFtVe1ylv0p-KznQ2q7XUzg9BNBzt9VgSSjePeMI5hunZouPrAguwvH-4RQkjlzF5uSMfXXzpoeOrNsPZUKkS0csObpRBZcMk",
  liverSurgery:
    "https://lh3.googleusercontent.com/aida/AP1WRLvIOt25d2uYY1wchBSBCEEGewpzKrs_FMkLzrR1mDvyVjqK-gpzE-ok2-VOGBpWeg0urOovlfte9QQOM1os2nX1smxMvu8cpjsaM6RMhLpq9Sm9QP1i4B9hHqRJnvLt9varUrtCVOgmJ6rNHIULHHiZMCHjnOXdCt-HPu6n-szwyfCCUUe556yo1L8f-_bkvyIXmldeHw9WBlj0itVhhzG40v7YffWch4BTXIl8iUHFN7pcRaNYfuwP5HA",
  pancreaticSurgery:
    "https://lh3.googleusercontent.com/aida/AP1WRLswCfC7ZHXACjZT4uM7K9ZSzzd98a7smCLib_sUWc5iDsLamotyJNIxDLobE-p781iTETzbUJwhaRqYaI3YJGN_yHCec4qLYJou6RP9toBymF0HE5rj7rjJg9pl42KiJ-PU8oCJc0kK7lNu3VKNNHmuek8im09z1wTO-nSCXanZIiHQHEcVm5zORtP61Tv-P6yQ6-Vn1-6DHQzuxAEFbixpHFWuztdN9cMBIygI3fcDaAd0xuXTktqqEfM",
  biliaryGallbladder:
    "https://lh3.googleusercontent.com/aida/AP1WRLtx6aFjwj1uLC1aKxpWpLstALK4NauFVaLdd8ILgdoi6UWNktZ4yh-FELn_NN2BBiF0Kf5zczJmXqlyGkBJT5S74Wy9e2wW4B4VdH_GOIqC3kMyB0TBvKPRNVfOIChqANZ8avAzkPFHaFxPtZwG6PRzpsm5Ios1oUVgrPidbr0P2gPUmb12QuxuE1Tb9s0y9oS6zrFBdfmkXVteLUvRO-Sw4gGihXLLYojpf2-TiWBn1X11pFBeOZschg",
  advancedCirrhosis:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuApZ-AtljGQaSil2hAEWHjOPejq0yRo5Ed2nZ3h3W7lx50prhEcn_sgXuBZHokZWzmpcfieB-4JkIyvADcRTg-pU7vtvCZROUFtr6RoCb0kXI8qp2L5fRUmlAefQ2N4uNfkbwRdLwGv8RpxPhBBELH3n6vDAX-ljbZmZvGB8V7tMEXlf0olNDsL1j79Vq_9dDu6ul_aQAkUXP_A_yqYYsItiAMuQBGUh_Z33LVwk-Q01sFlLZmGYCE3",
  liverTumors:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDgoNhJ9X9EXgh3Ac-O4m8SyMtUHX5yTXx8lEz9du-IpkmjyKrrwYT81y-DbILT6eEfuwipnajcfpC8FbgbhLJ52mlXp07TMsal54qTxnoyfMHftZgCTAmGkwjKbdTdJB-CJ6EnfPCR99_iK93t_n1PV01RgVG-ZKKaKqWTzCv_ccbBiIaidNWG9RaqrHxP9PKfA5sX7GW1wDHSa-fxU0bu8gihYQx_o8N8x1BcRL_b3W_TY5C91crA",
  biliaryObstructions:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD6bbLdq-1pEyi49AU7jLNA-of2VdCk-0heZ_wmfVxesoBWdLU0qAeS_kxcM0zXqokBJFNoQAV5EWeHMtFfUquzCGMqVUglHjHuxoI-guk_bbVvD2nF_fsGW1MG06nZcRYiQm5-kj6JqUdUWVSdjjXMpU75DmREpvmiNWj-ehzQqr3yzzBMaY3sJfA6GaX4RZ-VvJCCT0VWT63d7rW-ql16YhIEbVOBwOtQxqLN3SPisagdE8to6cvT",
  metabolicLiverDisease:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBa6N6Zcj_ZydIEZp7PuhbxGdwRwCwgkSDj2Anc7YXLNkoH4BUwv79unCMjdh-N9jWYklCoUSsiPLoeAERHDDbzOx1uIqVcbh_cRZFbkzniyWwiJxujZUNqNvzGL4Yzbv3Dt04Qc6LuIhcxXb_yP4IQxE9tSLrtM8mOM7C7C5cOPeH33UJmpgYsK1VUdkfsCklNNislXRcgZqd6xDDRzXd2olusuI1AajWZ7E3z9rS-fJXaliVAG5HA",
  liverTransplantProcess:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCmUndeZZMsdgWt6fFaHt5YAJijMlt9B6OomF1ty8XoYscFmRsB_JId5H_xlSq6ZkN_ZI5m-UzHEoEju03GeV0ivzAURGXmoAM6e3CJMazRhNbe1Wb0vp4L_T1sVA1nFVlRSynGWt_qmpGlgbTttePUgOguaccpScj6lTIiBcyKaNdc7XwzPwfPgwKRD8E5NnXxrecI6-4_JI0mb4RxtTP5lb8kfXOXmZWoVmVyv9Ayyk5OT8Uoyl4gsMpSwrrCuhr-GCao32Y6nQosoQ",
  patientJourney:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDRnbtPpmzYuGrQfBko70g-tDhCTV17YKxmF7OMt2dMC7MAqeQsifg4LfFT-az9Dedtx2NgHYGynRNlGsXJVZAJI_01oGdXVHET3_hLRd64IxoBcXZeaEMdkWdwPB7yp3wpQPnobj-apqd0Ii87K8MOGiyYZZUaALjvkzWQoJdpWKpK72DyxxON_mkX6F45iInp7bmE5m0b085SCxEIl8d7ePBQp6ddQnpFu40qUSzC3U0xTGDlWUw_",
  advancedRobotics:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBv-bDoR4fRriJ4DaA4RoULx61oTUQVQLQf-jMBwvpwqazNMZYSng3SsqVI5gxgQdkaaqBItI7VWu39VK3Ex-2XO9o8-rjF5EAwXkCbkVDr3DfJRfeJfeQgbZzJfDU4I0j8p0YAIKu67AS2Ghm4IlcpSJ0ADspdnWG6JyEvy7G5SXfDT7--lnvX-vzpYyfZd6Zl_wC-Octd7ncgdC5THUcO6isbqJ31srt770nyrdo-vU_DDhtye4jY",
};

const heroBgAlt = {
  en: "A brightly lit, futuristic medical clinic operating room overlooking a serene morning cityscape.",
  ar: "غرفة عمليات مستقبلية مضاءة بإضاءة ساطعة تطل على أفق المدينة في صباح هادئ.",
  fr: "Une salle d'opération médicale futuriste et lumineuse surplombant un paysage urbain matinal serein.",
};
const medallionAlt = { en: "3D Liver Medallion", ar: "ميدالية الكبد ثلاثية الأبعاد", fr: "Médaillon 3D du foie" };

export const homeSections: SectionDef[] = [
  section(
    "hero",
    "Hero",
    {
      title: "text",
      subtitle: "text",
      backgroundImage: "image",
      medallionImage: "image",
      bookAppointment: "button",
      watchVideos: "button",
    },
    {
      title: text("home.hero.title"),
      subtitle: text("home.hero.subtitle"),
      backgroundImage: image(IMG.heroBg, heroBgAlt),
      medallionImage: image(IMG.medallion, medallionAlt),
      bookAppointment: button(text("home.hero.bookAppointment"), "/contact"),
      watchVideos: button(text("home.hero.watchVideos"), "/videos"),
    },
  ),
  section(
    "stats",
    "Statistics",
    {
      items: {
        type: "array",
        itemSchema: { icon: "icon", value: "text", label: "text" },
      },
    },
    {
      items: [
        { id: "years", icon: "military_tech", value: same("+20"), label: text("home.stats.yearsExperience") },
        { id: "success", icon: "verified", value: same("98%"), label: text("home.stats.successRate") },
        { id: "patients", icon: "groups", value: same("+5000"), label: text("home.stats.recoveredPatients") },
        { id: "surgeries", icon: "local_hospital", value: same("+1000"), label: text("home.stats.successfulSurgeries") },
        { id: "centers", icon: "business", value: same("+15"), label: text("home.stats.specializedCenters") },
      ],
    },
  ),
  section(
    "meetDoctor",
    "Meet the Doctor",
    {
      eyebrow: "text",
      title: "text",
      image: "image",
      video: "video",
      videoLoadingText: "text",
      name: "text",
      role: "text",
      bio: "text",
      cta: "button",
    },
    {
      eyebrow: text("home.meetDoctor.eyebrow"),
      title: text("home.meetDoctor.title"),
      image: image(IMG.meetDoctor, text("home.meetDoctor.imageAlt")),
      video: { url: "", mediaId: null },
      videoLoadingText: text("videos.modal.loading"),
      name: text("home.meetDoctor.name"),
      role: text("home.meetDoctor.role"),
      bio: text("home.meetDoctor.bio"),
      cta: button(text("home.meetDoctor.cta"), "/about"),
    },
  ),
  section(
    "majorSurgeries",
    "Major Surgeries",
    {
      eyebrow: "text",
      title: "text",
      cta: "button",
      items: { type: "array", itemSchema: { image: "image", title: "text", desc: "text" } },
    },
    {
      eyebrow: text("home.majorSurgeries.eyebrow"),
      title: text("home.majorSurgeries.title"),
      cta: button(text("home.majorSurgeries.cta"), "/services"),
      items: [
        { id: "liverTransplant", image: image(IMG.liverTransplant, text("home.majorSurgeries.items.liverTransplant.title")), title: text("home.majorSurgeries.items.liverTransplant.title"), desc: text("home.majorSurgeries.items.liverTransplant.desc") },
        { id: "liverSurgery", image: image(IMG.liverSurgery, text("home.majorSurgeries.items.liverSurgery.title")), title: text("home.majorSurgeries.items.liverSurgery.title"), desc: text("home.majorSurgeries.items.liverSurgery.desc") },
        { id: "pancreaticSurgery", image: image(IMG.pancreaticSurgery, text("home.majorSurgeries.items.pancreaticSurgery.title")), title: text("home.majorSurgeries.items.pancreaticSurgery.title"), desc: text("home.majorSurgeries.items.pancreaticSurgery.desc") },
        { id: "biliaryGallbladder", image: image(IMG.biliaryGallbladder, text("home.majorSurgeries.items.biliaryGallbladder.title")), title: text("home.majorSurgeries.items.biliaryGallbladder.title"), desc: text("home.majorSurgeries.items.biliaryGallbladder.desc") },
      ],
    },
  ),
  section(
    "majorTreatments",
    "Major Treatments",
    {
      eyebrow: "text",
      title: "text",
      cta: "button",
      items: { type: "array", itemSchema: { image: "image", title: "text", desc: "text" } },
    },
    {
      eyebrow: text("home.majorTreatments.eyebrow"),
      title: text("home.majorTreatments.title"),
      cta: button(text("home.majorTreatments.cta"), "/services"),
      items: [
        { id: "advancedCirrhosis", image: image(IMG.advancedCirrhosis, text("home.majorTreatments.items.advancedCirrhosis.title")), title: text("home.majorTreatments.items.advancedCirrhosis.title"), desc: text("home.majorTreatments.items.advancedCirrhosis.desc") },
        { id: "liverTumors", image: image(IMG.liverTumors, text("home.majorTreatments.items.liverTumors.title")), title: text("home.majorTreatments.items.liverTumors.title"), desc: text("home.majorTreatments.items.liverTumors.desc") },
        { id: "biliaryObstructions", image: image(IMG.biliaryObstructions, text("home.majorTreatments.items.biliaryObstructions.title")), title: text("home.majorTreatments.items.biliaryObstructions.title"), desc: text("home.majorTreatments.items.biliaryObstructions.desc") },
        { id: "metabolicLiverDisease", image: image(IMG.metabolicLiverDisease, text("home.majorTreatments.items.metabolicLiverDisease.title")), title: text("home.majorTreatments.items.metabolicLiverDisease.title"), desc: text("home.majorTreatments.items.metabolicLiverDisease.desc") },
      ],
    },
  ),
  section(
    "patientStories",
    "Patient Stories",
    {
      eyebrow: "text",
      title: "text",
      subtitle: "text",
      verifiedLabel: "text",
      cta: "button",
      // References into the Reviews page's own `gallery.items` (single
      // source of truth) rather than duplicated quote/name/tag content -
      // see lib/cms/queries.ts's reviewRefs resolution. Editing one of
      // these reviews on the Reviews page updates this preview too.
      items: "reviewRefs",
    },
    {
      eyebrow: text("home.patientStories.eyebrow"),
      title: text("home.patientStories.title"),
      subtitle: text("home.patientStories.subtitle"),
      verifiedLabel: text("reviews.gallery.verifiedPatient"),
      cta: button(text("home.patientStories.cta"), "/reviews"),
      items: ["ahmedHassan", "sarahM", "tarekE", "omarR", "lailaK", "hassanB"],
    },
  ),
  section(
    "whyUs",
    "Why Choose the Doctor",
    {
      eyebrow: "text",
      title: "text",
      portraitImage: "image",
      portraitName: "text",
      portraitRole: "text",
      cta: "button",
      items: { type: "array", itemSchema: { icon: "icon", title: "text", desc: "text" } },
    },
    {
      eyebrow: text("home.whyUs.eyebrow"),
      title: text("home.whyUs.title"),
      portraitImage: image(IMG.meetDoctor, text("home.whyUs.portraitName")),
      portraitName: text("home.whyUs.portraitName"),
      portraitRole: text("home.whyUs.portraitRole"),
      cta: button(text("home.whyUs.cta"), "/about"),
      // Preserved as 5 identical entries (verbatim from the source design -
      // now independently editable per-item rather than one shared string x5).
      items: Array.from({ length: 5 }, (_, i) => ({
        id: `reason-${i + 1}`,
        icon: "workspace_premium",
        title: text("home.whyUs.reasonTitle"),
        desc: text("home.whyUs.reasonDesc"),
      })),
    },
  ),
  section(
    "videos",
    "Latest Videos",
    {
      eyebrow: "text",
      title: "text",
      cta: "button",
      modalLoading: "text",
      items: { type: "array", itemSchema: { image: "image", video: "video", tag: "text", title: "text" } },
    },
    {
      eyebrow: text("home.videos.eyebrow"),
      title: text("home.videos.title"),
      cta: button(text("home.videos.cta"), "/videos"),
      modalLoading: text("videos.modal.loading"),
      items: [
        { id: "liverTransplantProcess", image: image(IMG.liverTransplantProcess, text("home.videos.items.liverTransplantProcess.title")), video: { url: "", mediaId: null }, tag: text("home.videos.items.liverTransplantProcess.tag"), title: text("home.videos.items.liverTransplantProcess.title") },
        { id: "patientJourney", image: image(IMG.patientJourney, text("home.videos.items.patientJourney.title")), video: { url: "", mediaId: null }, tag: text("home.videos.items.patientJourney.tag"), title: text("home.videos.items.patientJourney.title") },
        { id: "advancedRobotics", image: image(IMG.advancedRobotics, text("home.videos.items.advancedRobotics.title")), video: { url: "", mediaId: null }, tag: text("home.videos.items.advancedRobotics.tag"), title: text("home.videos.items.advancedRobotics.title") },
      ],
    },
  ),
  section(
    "insights",
    "Insights & FAQ",
    {
      eyebrow: "text",
      title: "text",
      readArticle: "text",
      articlesCta: "button",
      // References into the Articles page's own `grid.items` (single
      // source of truth) rather than duplicated title/image content - see
      // lib/cms/queries.ts's articleRefs resolution. Editing one of these
      // articles on the Articles page updates this preview automatically.
      articles: "articleRefs",
      faq: { type: "array", itemSchema: { q: "text", a: "textarea" } },
    },
    {
      eyebrow: text("home.insights.eyebrow"),
      title: text("home.insights.title"),
      readArticle: text("common.readArticle"),
      articlesCta: button(text("home.insights.articlesCta"), "/articles"),
      articles: ["understandingYourLiver", "roadToRecovery", "roboticAssistance", "futureOfHepatology"],
      faq: ["recovery", "successRates", "roboticSurgery", "internationalPatients", "insurance", "scheduleConsultation"].map(
        (id) => ({ id, q: text(`home.insights.faq.${id}.q`), a: text(`home.insights.faq.${id}.a`) }),
      ),
    },
  ),
  section(
    "cta",
    "Final CTA",
    {
      eyebrow: "text",
      title: "text",
      subtitle: "text",
      bookAppointment: "button",
      whatsappUs: "button",
    },
    {
      eyebrow: text("home.cta.eyebrow"),
      title: text("home.cta.title"),
      subtitle: text("home.cta.subtitle"),
      bookAppointment: button(text("home.cta.bookAppointment"), "/contact"),
      whatsappUs: button(text("home.cta.whatsappUs"), "https://wa.me/201234567890"),
    },
  ),
];

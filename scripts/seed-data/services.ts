import { button, image, joinText, section, text, type SectionDef } from "../seed-helpers";

const SURGICAL_IMG: Record<string, string> = {
  liverTransplantation:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCYkoDWxYm9pmiQfT4Juo4vTOIym3nTyXBevciF8C2cXkUOFSBQ4wR3KuTour8KK7wnyybXPCZCbeogxFvGiMkUlOP9cuQrG32HywJboYRi3RY688nk1hWts7rmoXsPcEU2erx1TMkAL1daSEntVaM42JRcv9uZV69xgJ7az2G1skwjOWKitfw2J3gGMMjxJfnAzvK1TPRpLipFANpEO9b4GSu0dSCi8E5peVihWA9fIi9HjPWJ78xT",
  whippleProcedure:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBshnm5nKH3j7bLu9YLwPpVc0VU2ttuF5HjTG-mk2_x8OoNuMzndvnGQEgW7Et3mX2cyvMHTt7beeyUc65r57Qu7HuogTZxi1X4h_gam6SH3uOZmiYJlL5ZM7a-18SQ6S-eAD0S_wxZ1Vh59VZNvNL42d3vO34CHqmni4pImrbnG_oP_fe_z-Dbk7_x4cN7p0LhL7o5zOyMXNUKf6nvvfFbPB94OTrJ_8iap72k9AKVNT3DudYWCT6-",
  liverResection:
    "https://lh3.googleusercontent.com/aida/AP1WRLu6-ZyWk8_X0sF-Rj3deaTmlASOnQI3V-tzd2e2xvOoRUEJXu44rKlazhOXd6-wskJOKQbkPbnbai0-E2bZVUV_ZPiYQfSGHkpDAeW--gmHr-aCJj6KuRnZniE0wv8RuYp5WRBoSGRg6GBNRfH0SmjATfzeDR286J1P4G3tvLR8I_kv3MstjGzSIbGb8RogRIE3G6LQdyPJooUW60QIO5eabUGw3MPSD7ukyjJJ_7Mp-QkWf-vk7l2pGXg",
  liverTumorSurgery:
    "https://lh3.googleusercontent.com/aida/AP1WRLs9iBCjL-D7QPB7sv-KBdd7tn7NDCjs7eJDknFA7xtWqG7AN2nLgmVZ_YR40IE7asadbHxnI6DFxH6ZTx9N3NtidwGDjKXk7u4ORp8V2wLh6jrgHfNhdUJaDABdXQCN3g8yBltSDNjg7-w_VTuniNlKZtZu7G7sy5rrek6UbiNoYTkvvjjtwuO8lDDd6hdKJi6ARKkaVNyiCtnhTunmh1PwdEhlTWbd2zIND7NAgcN47gnxvXhKual2Llk",
  pancreaticSurgery:
    "https://lh3.googleusercontent.com/aida/AP1WRLv1SWE3jrbaedGpAG_db3F9ZOFxwOjun064pR-a-1sxkV1PQZ-5FjYrKRn39S7NMCNrnvg14ljEJ6s_4XXyxqU5mhrL7A-jtknWKOWjAtnSLLBUi36PcnAwwe301nlLuTLBglG6G3sn2uQbuyMleMqxyvFevJ0C85RUNjvGzHgTHuEvAcc6VHyM69EmRXQtIDJsfPmfqHWZBTXJ5gzdHUeKepuS3_yDlvmSIpuEd2YKJLQmgsKRzeGuI1g",
  biliaryTractSurgery:
    "https://lh3.googleusercontent.com/aida/AP1WRLuyA6p_ZrR-RO5osIZIWrNAdBWEXXT0_tqDEKREXvc6FqgXDc4ZU8A9wZUmsbHMLPXk6VsAdgOIHmP0eZc7-DuhqwnoaesTRYD-cgOcSIJmzL0BAffmat_kI-CutiZF5ho-Y8d8khblzB0Ix9-XmcNK_ZD-8QlvWsLJk3B2CYvdnDxvSxZsJoNRrgU7W4ckq6s5328SkommCQ0iRa7V6LaVoW0Ue5tFjbEn0g7A4GiOW7RDkfW9Zwoi_MA",
  complexGallbladder:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDYwohRGdYUsFwXQesTOseD6EbqpUmnyy9VPsRp83CeqoK-5ekHA5TMeXbYavzXJ0R41MzIUfsUQ4r_fs-qtS78CAzQVpI08ifR_SvAGhS2rravKlGlwHZu_if9WFVHXgaZcXFLJnswmTOXI7ROaOEPq-rdemDeaMtcSmvsIKo60CpgqnT_PGv-ZTik0Dw4gTbhLVnb_sWlQlwPhgAeMzRuNsVAO8TITRaEuG6yBHeRgMeu5P4lL8IZ",
  advHepatobiliary:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCPlGxkvnE9qvFPYI94_eHWaG9yV8nm_03gSdEIGsNIcFW7CUOmka1MecHrrQ-8N6PMzSI11kFJ_xg51FBd3tKbi1XVAzfLeW7jcDESvoOGJ0YpUvWWcP1-bwFJKxDmzy6hNOfeLt0lFKSvXoRpKuMEF8gG3_kzZVxIzpFPrE-XAhiNJS4ozbrrnUQtgPeTMlOJFlcoFlAFWBuS-P6lEfWJeojKe3y_FDPaEI0Ego9cybOcUx1eiV__",
};

const TREATMENT_IMG: Record<string, string> = {
  liverTumors:
    "https://lh3.googleusercontent.com/aida/AP1WRLvqaH9gsagiS3FWqCA15KaK6b9lp9KFz_2heZZRdn_xUQCn_xHLI5vXqbd8NQmam9dylQIS3B3EwPqpG7-8N-BhiOC6CpBsa93jHxXaaAzwkuFLgop-Urr4SXKXpFwvm0hH1KtJ0YR-vbVVzc_Txl25ZFNkUS_z9ax-e37oFu62Ih8qI1TNJ_NjdYpTovhkZtJiw9FQ4TPUUDZ_SBJTGXKrL2t2oIWC6AL5oUCOXK7Azo1tD3yIxIpa0Hg",
  liverCancer:
    "https://lh3.googleusercontent.com/aida/AP1WRLt_A-YmBGMy-djlFnpuD2OT6rWJptYbcHKNwd61rChdX9CWg-eRlYwNa_g0xVpoZyFxcSGDtkLT5oYQ7vlHovVP7eeqtYgqGPQSrtWr8kVahLYK_kJ9tKgZ_3XEcLxAgTAdJnpSYkXHQTzXesb37JDYnd_0wTK8SvezQMXsq9qGz_f6tDgbpDeLagjrQxvbkh5fSp41AkMK75UqZnLgL0ty_P_2Qm2fiJPHQLKciA5Z5v4-rkYdB33qmw",
  pancreaticCancer:
    "https://lh3.googleusercontent.com/aida/AP1WRLswCfC7ZHXACjZT4uM7K9ZSzzd98a7smCLib_sUWc5iDsLamotyJNIxDLobE-p781iTETzbUJwhaRqYaI3YJGN_yHCec4qLYJou6RP9toBymF0HE5rj7rjJg9pl42KiJ-PU8oCJc0kK7lNu3VKNNHmuek8im09z1wTO-nSCXanZIiHQHEcVm5zORtP61Tv-P6yQ6-Vn1-6DHQzuxAEFbixpHFWuztdN9cMBIygI3fcDaAd0xuXTktqqEfM",
  bileDuctTumors:
    "https://lh3.googleusercontent.com/aida/AP1WRLtx6aFjwj1uLC1aKxpWpLstALK4NauFVaLdd8ILgdoi6UWNktZ4yh-FELn_NN2BBiF0Kf5zczJmXqlyGkBJT5S74Wy9e2wW4B4VdH_GOIqC3kMyB0TBvKPRNVfOIChqANZ8avAzkPFHaFxPtZwG6PRzpsm5Ios1oUVgrPidbr0P2gPUmb12QuxuE1Tb9s0y9oS6zrFBdfmkXVteLUvRO-Sw4gGihXLLYojpf2-TiWBn1X11pFBeOZschg",
  pancreaticTumors:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxRzIthFOQ1wxRAEiFwNiSAPE1y0EB-VBAAOibsHaNO5tdij_25Uf1c3J2y8b_tJzzVCOEbPo_qvMGjUPSSUljrPNwvn41_D4oZaJfJnVJoLiGoE00IZayok-0QUhjurJq_w0067kkklbchnKdpHw3WK8KNYLy2p3n1fjfrnfqyNL59C94VuWqrUUPnOgvVV-0XaF8LupiSHlPdVEW_XdGSgI6SmOghCCdwwt4l9h3jB9U-bA2ijSs",
  gallbladderTumors:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA1-OysxlYeqn-kSiHRC94Z7-0lmIJDVKS2XrSUH4f3LIyzEWppgg15XOSt5OKCnzBjhIlW9oK9dbmZPkID-rwspzarU6Cw5ws8EP4r1jSAH94smYpL5dqOHfJC_p5NY10_48gnfEWh-1wvRBj3tL_vckjD88rzburkJ87GqmedbHWbqa2sS9gE_vx4J07WurCA3UMSkg9MWAc7fF6cqfXGt7Ln7uAynoMpRRNxsN9p5Y0wgfzVxKJB",
  complexLiverDiseases:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBvDfcd11dyBbeuKiOhbatvlI3n8T5Zs4U1fyHN8HKMJ9C3T1xLu9jy4uEJvnIdf1wl_iR9fVScU-zAHXmCBYKWBt8wKWzgDb4B6hVvYNOt3tDRNuMGDY3ajvYLFkDDmbgoXvvvPoES_cneY2XH_H4iWgkVwxYoaoZEpfAh18Ebsez8vG6dKsCdmdRm9YG_pHlit3wLZMtru_UX2KQk63N6iSbln7P8AzU6s7ROQi77k44NTQMK5UQd",
  hepatobiliaryConditions:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAArBDnEy6HK0Y3nmttdP6zRTzIYgcl5OuQAJKE-O--YDFaDZSbBwFSibJfrK8CUwpAuG5XcxpevVFAkk1EEzrgAIRoyqRIRFjkljfzJjJUmgoC46jbsM2xpZhhay4C8iEi5mXhHjj5l1KWO8tT_7d6xf7DOJfdHEyTOCKWrSXv-uxx4DM2t41H_WX3_mTws04G_oLyHsMswchQdTiBl0ctJXU-bp1rgnyPCX7ZEpKEOTCFKJmostPt",
};

const heroBgAlt = { en: "", ar: "", fr: "" };

function procedureItem(id: string, key: "surgicalProcedures" | "specializedTreatments", imgMap: Record<string, string>) {
  return {
    id,
    image: image(imgMap[id]!, text(`services.${key}.items.${id}.title`)),
    title: text(`services.${key}.items.${id}.title`),
    desc: text(`services.${key}.items.${id}.desc`),
  };
}

export const servicesSections: SectionDef[] = [
  section(
    "hero",
    "Hero",
    { badge: "text", titleLine1: "text", titleLine2: "text", titleLine3: "text", backgroundImage: "image", exploreProcedures: "button", bookAppointment: "button" },
    {
      badge: text("services.hero.badge"),
      titleLine1: text("services.hero.titleLine1"),
      titleLine2: text("services.hero.titleLine2"),
      titleLine3: text("services.hero.titleLine3"),
      backgroundImage: image(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBFYpJdfsOtVmShSnLB7zvs_KZz0NlTMMlxgnZO7HaQVouILpI1_ONbF5XRE9E1Q7gxoyLI32Oj5uZlkFnmKXbPujw70tZcnxgGU_Aa61AMJ9S3ldw-M6pAv5OMg6yFhSleBY3gRmmnqrMB1VAZBHsuAnCstHGKReyB52KxB3xLG5ZiRnCnsgPfx0aCnvaPJTzUvAkrcgNYT2UPc4DwwVXmJEeaCRXizNs6YvRw0eTMDtVtn6cqvbVk",
        heroBgAlt,
      ),
      exploreProcedures: button(text("services.hero.exploreProcedures"), "#surgical-procedures"),
      bookAppointment: button(text("services.hero.bookAppointment"), "/contact"),
    },
  ),
  section(
    "surgicalProcedures",
    "Surgical Procedures",
    {
      title: "text",
      subtitle: "text",
      exploreLabel: "text",
      items: { type: "array", itemSchema: { image: "image", title: "text", desc: "text" } },
    },
    {
      title: text("services.surgicalProcedures.title"),
      subtitle: text("services.surgicalProcedures.subtitle"),
      exploreLabel: text("services.surgicalProcedures.explore"),
      items: Object.keys(SURGICAL_IMG).map((id) => procedureItem(id, "surgicalProcedures", SURGICAL_IMG)),
    },
  ),
  section(
    "specializedTreatments",
    "Specialized Treatments",
    {
      title: "text",
      subtitle: "text",
      items: { type: "array", itemSchema: { image: "image", title: "text", desc: "text" } },
    },
    {
      title: text("services.specializedTreatments.title"),
      subtitle: text("services.specializedTreatments.subtitle"),
      items: Object.keys(TREATMENT_IMG).map((id) => procedureItem(id, "specializedTreatments", TREATMENT_IMG)),
    },
  ),
  section(
    "cta",
    "Final CTA",
    {
      eyebrow: "text",
      title: "text",
      bookAppointment: "button",
      whatsappUs: "button",
      options: { type: "array", itemSchema: { number: "text", label: "text" } },
    },
    {
      eyebrow: text("services.hero.badge"),
      title: joinText(text("services.cta.titleLine1"), text("services.cta.titleLine2")),
      bookAppointment: button(text("common.bookAppointment"), "/contact"),
      whatsappUs: button(text("common.whatsappUs"), "https://wa.me/201234567890"),
      options: [
        { id: "option1", number: { en: "01", ar: "01", fr: "01" }, label: text("services.cta.option1") },
        { id: "option2", number: { en: "02", ar: "02", fr: "02" }, label: text("services.cta.option2") },
        { id: "option3", number: { en: "03", ar: "03", fr: "03" }, label: text("services.cta.option3") },
      ],
    },
  ),
];

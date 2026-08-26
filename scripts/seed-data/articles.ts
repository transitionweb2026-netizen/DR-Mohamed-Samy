import { button, image, joinText, section, text, type SectionDef } from "../seed-helpers";

const ARTICLE_IMG: Record<string, string> = {
  understandingYourLiver:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAVVZygLn3qRswzY1427qBP2JA6H7Hv7DNajCVKPjacNxB5TelKmu22iGUXNdqafwG09SpTBN21qtxVECPH7bjXRDatKix-e2nmRvLHenH2wWTTfa4TDen5rkmVKGGbUa9tCyln1pdSMTWZGgr2tylKECwjXC9NTqSKBFAqy2YhQeA_X04sdhYuFsWa5DZjfKetLA1zD8HRnabDI67vWZR2lnzMCBvp_RjrAuRG8-Xifp5B8Im1y7Xz",
  biliaryTreeMapping:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBm3XTmDg8IA2CfLP4is0IFpsJFTZ3ObC4bJV5otfDKgpIIrzKbWQWtsu8FO7iT-Yz9lL6NMf9u95gkCfvyeOsAlqv89dZpqhJ7BuLej9b-1TJvGTYrOWG8U3L3h57NAl2MnS2zWDlwyYgz1rHDrATxuRX1ccE3_KdX7IjF8oeQiiW1rrcB2FquepQbrjAmr7dti9jmJaRD4Bx6K-gs-Lqd_QTSbA8J0pnneZJ77N8NFL2YK9TP4cwX",
  roadToRecovery:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAjvBGwKa3vRwBMyX_OL4k1GtG_hPfF2fmV9yKVDsA9onRw81cQ9l9yGM-YDzoXVjfErooVrILD2kDvCi8rtCcWgZ8cqqcci4bG3rcQ2c1HDaVwL9mJ89Z8-yJH6LnFf766SWRdLoQAfHXmBFb1MC_zInQZzVkoFxu15PsnOXsaq5d-odCWrh4XsNY9BDDxwcsKjZUjF1NvO_g8alQOGqYDASPSYKyjvyjL-h8-7hn5_-2bCkKCzrYP",
  roboticAssistance:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBnTI3dIS82iU3FvcvwDJjUNXZ6LYba6OFgMREpvPd9qAUjpWM8BSbCmh51Qko-EBWC3iS01yb8fTUP4rZnvI5r8ESpsB0ge5h5T0iBgl9_aahdAzfLfUG4iU5NZLHKNsfUQmKHeQ4gXaQdH5A6_nPyfUaUDWG75C3gcwZBN0iz0zDL6snmOTOyIG1cn90b-TbC7WqJ7X8C6OV-hgyBE4woo4yn4rSMvxq_r2ZRHH4LNE-R3JHJX4dT",
  advancedSterilization:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA7aSa6ddeBmLAcZ6QK0Pw0-715_ZAp7Y7gaPJ5xKC9hlkMLNSrmU_V-oE_g9JeN7BLBAgB6_JS--iIFPm8fYQs5upncqfTO-fxzIp7mkY-tBvI3_S390xQSG5weOFyHoqh1GCIR7lNzHJs1_3nZbDvV6BghWwN1nmeBNTiYhhaVbCCE_VzZf44Ok2RsbqzYUFxYc1C6L7ekahWVDlFCurJPyq3wmfqocrSzWYT1lkUmLTseHK-_mdl",
  scientificConferences:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCILOmYD4hlsRfuFPxZ76fhp4hp_O4jalWck8pX8u_bDQjpjuVRLCxJyWa_3XLG_SWZ3KR1KTmh781K03zOvGLLOVnd2vPzetxHHxoyFLAzsq5QiPjEtNcIpqzgir-k2xajMOAHPbLdyTpX3jxsSO-HJ7vY_NaHANEFJvJKtZhHlRm8xK99V6caZTTrP8NRDg4Wd_sELGYH7g_JZUYEy5n-pYYPMe2VJA1WkcGliWGWpnnXWOy-dtNb",
  multidisciplinaryCare:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB0Nh8MrVcViOUgldhb86RIYVFSiVkaL2srthrPYHZWmhl1gjjfDiNTBl7Jsc1lGG2gX7spvOcVIlYoEJYhIH9QWtHAdagzI9cwkhtn7UVPeoSOZFc9uogbfwshYGZFBj7hwWozTE0pSFFdwhzTb7v5daDVzAHrGXlTAY4sesguH0K7lhl6NVIin2OchdiJBtkzB_sC-Q-4yTXRrqnG8K7Hq4flf_CO_DzoxgDxr2vg43Tnxhdz9DE1",
  futureOfHepatology:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAE4vIseia-EYulnu-dDGDb9RzxgV-4DUqZh_69wCKTi2kofrPP6eQq7wnQQM0CUdONfXn6mumyMQXWfUlbCUBAaI2BoYlHmhRP0IFZPpf4jlesqggbH6hSakYftwp3puvyjU7ojlbssxp-m8InTw8EHyu7WHyk6dWTFa83xTAPDDQI2sNn1i40fSAX--yEHlgqcR1KYHSEeKJhyNw_7BEUv2GWUEgYiIn4QCw6MSypXFPAFEPsUmsg",
};

// Fresh translations: these alts existed only as literal English strings
// baked into the JSX, never as translation keys.
const heroBgAlt = {
  en: "Abstract representation of medical knowledge and research, featuring soft teal glowing lines intersecting like a digital neural network over a bright, clinical white background.",
  ar: "تمثيل تجريدي للمعرفة والبحث الطبي، يظهر خطوطاً متوهجة بلون تركوازي ناعم تتقاطع كأنها شبكة عصبية رقمية فوق خلفية بيضاء سريرية مشرقة.",
  fr: "Représentation abstraite du savoir et de la recherche médicale, avec de douces lignes lumineuses turquoise s'entrecroisant comme un réseau neuronal numérique sur un fond blanc clinique lumineux.",
};
const featuredImageAlt = {
  en: "Cinematic 3D medical visual of a human liver",
  ar: "تصور طبي سينمائي ثلاثي الأبعاد للكبد البشري",
  fr: "Visuel médical 3D cinématographique d'un foie humain",
};

export const articlesSections: SectionDef[] = [
  section(
    "hero",
    "Hero",
    { title: "text", subtitle: "text", backgroundImage: "image", exploreArticles: "button", bookAppointment: "button" },
    {
      title: text("articles.hero.title"),
      subtitle: text("articles.hero.subtitle"),
      backgroundImage: image(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAE4vIseia-EYulnu-dDGDb9RzxgV-4DUqZh_69wCKTi2kofrPP6eQq7wnQQM0CUdONfXn6mumyMQXWfUlbCUBAaI2BoYlHmhRP0IFZPpf4jlesqggbH6hSakYftwp3puvyjU7ojlbssxp-m8InTw8EHyu7WHyk6dWTFa83xTAPDDQI2sNn1i40fSAX--yEHlgqcR1KYHSEeKJhyNw_7BEUv2GWUEgYiIn4QCw6MSypXFPAFEPsUmsg",
        heroBgAlt,
      ),
      exploreArticles: button(text("articles.hero.exploreArticles"), "#articles"),
      bookAppointment: button(text("articles.hero.bookAppointment"), "/contact"),
    },
  ),
  section("intro", "Intro", { title: "text" }, { title: text("articles.intro.title") }),
  section(
    "featured",
    "Featured Article",
    { bgWord: "text", badge: "text", tag: "text", title: "text", desc: "textarea", cta: "button", image: "image" },
    {
      bgWord: text("articles.featured.bgWord"),
      badge: text("articles.featured.badge"),
      tag: text("articles.featured.tag"),
      title: text("articles.featured.title"),
      desc: text("articles.featured.desc"),
      cta: button(text("articles.featured.cta"), "#"),
      image: image(
        "https://lh3.googleusercontent.com/aida/AP1WRLvfpYDc6FcWRf7-8U3C022k5lqz6X4F33J3wNJWA3d3PJDmSIxDKF8YeLsDNDqENKK24a16X-efDIK0eC7DUEB4q--EjimQ5Kzy8S0-KdKwTBHGN3qI3lYTViUsgMsGfkhC1-qa8tZ259TOEJVmNtmEMrAHIGX1_Tsc99FrRKU1INWaoe-A4GqF3vTM1zfVH1YZ-8p2OZIfphx1Jsb2af_Kn9GdgCT-I_IoOpTWoxZfDC49dp8JH-YTS3k",
        featuredImageAlt,
      ),
    },
  ),
  section(
    "grid",
    "Articles Grid",
    {
      readArticle: "text",
      items: { type: "array", itemSchema: { image: "image", tag: "text", title: "text", href: "link" } },
    },
    {
      readArticle: text("common.readArticle"),
      items: Object.keys(ARTICLE_IMG).map((id) => ({
        id,
        image: image(ARTICLE_IMG[id]!, text(`articles.grid.items.${id}.title`)),
        tag: text(`articles.grid.items.${id}.tag`),
        title: text(`articles.grid.items.${id}.title`),
        href: "#",
      })),
    },
  ),
  section(
    "cta",
    "Final CTA",
    { label: "text", title: "text", cta: "button", whatsappUs: "button" },
    {
      label: text("articles.cta.label"),
      title: joinText(text("articles.cta.titleLine1"), text("articles.cta.titleLine2")),
      cta: button(text("articles.cta.cta"), "/contact"),
      whatsappUs: button(text("common.whatsappUs"), "https://wa.me/201234567890"),
    },
  ),
];

"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const MAJOR_SURGERIES = [
  {
    id: "liverTransplant",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLsLHdrzvY2R4NhRGM2gpjpwoNmjbo9809CxIBtIe_2JjzUU20ncWDNVjHsYdhyd8cf6itR28visjkxeEzu6lisQuWkPpckq59OZ_bn10uFnHmyI8NVH1ZFXrAidtFS20rrupBmZ8EgVfhvusmu_LXdYFoNFtVe1ylv0p-KznQ2q7XUzg9BNBzt9VgSSjePeMI5hunZouPrAguwvH-4RQkjlzF5uSMfXXzpoeOrNsPZUKkS0csObpRBZcMk",
  },
  {
    id: "liverSurgery",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLvIOt25d2uYY1wchBSBCEEGewpzKrs_FMkLzrR1mDvyVjqK-gpzE-ok2-VOGBpWeg0urOovlfte9QQOM1os2nX1smxMvu8cpjsaM6RMhLpq9Sm9QP1i4B9hHqRJnvLt9varUrtCVOgmJ6rNHIULHHiZMCHjnOXdCt-HPu6n-szwyfCCUUe556yo1L8f-_bkvyIXmldeHw9WBlj0itVhhzG40v7YffWch4BTXIl8iUHFN7pcRaNYfuwP5HA",
  },
  {
    id: "pancreaticSurgery",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLswCfC7ZHXACjZT4uM7K9ZSzzd98a7smCLib_sUWc5iDsLamotyJNIxDLobE-p781iTETzbUJwhaRqYaI3YJGN_yHCec4qLYJou6RP9toBymF0HE5rj7rjJg9pl42KiJ-PU8oCJc0kK7lNu3VKNNHmuek8im09z1wTO-nSCXanZIiHQHEcVm5zORtP61Tv-P6yQ6-Vn1-6DHQzuxAEFbixpHFWuztdN9cMBIygI3fcDaAd0xuXTktqqEfM",
  },
  {
    id: "biliaryGallbladder",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLtx6aFjwj1uLC1aKxpWpLstALK4NauFVaLdd8ILgdoi6UWNktZ4yh-FELn_NN2BBiF0Kf5zczJmXqlyGkBJT5S74Wy9e2wW4B4VdH_GOIqC3kMyB0TBvKPRNVfOIChqANZ8avAzkPFHaFxPtZwG6PRzpsm5Ios1oUVgrPidbr0P2gPUmb12QuxuE1Tb9s0y9oS6zrFBdfmkXVteLUvRO-Sw4gGihXLLYojpf2-TiWBn1X11pFBeOZschg",
  },
];

const MAJOR_TREATMENTS = [
  {
    id: "advancedCirrhosis",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuApZ-AtljGQaSil2hAEWHjOPejq0yRo5Ed2nZ3h3W7lx50prhEcn_sgXuBZHokZWzmpcfieB-4JkIyvADcRTg-pU7vtvCZROUFtr6RoCb0kXI8qp2L5fRUmlAefQ2N4uNfkbwRdLwGv8RpxPhBBELH3n6vDAX-ljbZmZvGB8V7tMEXlf0olNDsL1j79Vq_9dDu6ul_aQAkUXP_A_yqYYsItiAMuQBGUh_Z33LVwk-Q01sFlLZmGYCE3",
  },
  {
    id: "liverTumors",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgoNhJ9X9EXgh3Ac-O4m8SyMtUHX5yTXx8lEz9du-IpkmjyKrrwYT81y-DbILT6eEfuwipnajcfpC8FbgbhLJ52mlXp07TMsal54qTxnoyfMHftZgCTAmGkwjKbdTdJB-CJ6EnfPCR99_iK93t_n1PV01RgVG-ZKKaKqWTzCv_ccbBiIaidNWG9RaqrHxP9PKfA5sX7GW1wDHSa-fxU0bu8gihYQx_o8N8x1BcRL_b3W_TY5C91crA",
  },
  {
    id: "biliaryObstructions",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6bbLdq-1pEyi49AU7jLNA-of2VdCk-0heZ_wmfVxesoBWdLU0qAeS_kxcM0zXqokBJFNoQAV5EWeHMtFfUquzCGMqVUglHjHuxoI-guk_bbVvD2nF_fsGW1MG06nZcRYiQm5-kj6JqUdUWVSdjjXMpU75DmREpvmiNWj-ehzQqr3yzzBMaY3sJfA6GaX4RZ-VvJCCT0VWT63d7rW-ql16YhIEbVOBwOtQxqLN3SPisagdE8to6cvT",
  },
  {
    id: "metabolicLiverDisease",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa6N6Zcj_ZydIEZp7PuhbxGdwRwCwgkSDj2Anc7YXLNkoH4BUwv79unCMjdh-N9jWYklCoUSsiPLoeAERHDDbzOx1uIqVcbh_cRZFbkzniyWwiJxujZUNqNvzGL4Yzbv3Dt04Qc6LuIhcxXb_yP4IQxE9tSLrtM8mOM7C7C5cOPeH33UJmpgYsK1VUdkfsCklNNislXRcgZqd6xDDRzXd2olusuI1AajWZ7E3z9rS-fJXaliVAG5HA",
  },
];

const PATIENT_STORIES = [
  { id: "sarahJohnson", shape: "rounded-full" },
  { id: "michaelChen", shape: "rounded-t-full rounded-b-3xl" },
  { id: "ahmedHassan", shape: "rounded-[100px]" },
  { id: "elenaRodriguez", shape: "rounded-b-[80px] rounded-t-3xl" },
  { id: "robertTaylor", shape: "rounded-[40px]" },
  {
    id: "fatimaAlSayed",
    shape:
      "rounded-tl-[100px] rounded-br-[100px] rounded-tr-3xl rounded-bl-3xl",
  },
];

// Every "reason" card is identical placeholder copy in the source page --
// preserved verbatim (not rewritten) per the migration's no-content-changes
// rule, duplicated exactly as many times as the original.
const WHY_US_REASON_COUNT = 5;

const LATEST_VIDEOS = [
  {
    id: "liverTransplantProcess",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmUndeZZMsdgWt6fFaHt5YAJijMlt9B6OomF1ty8XoYscFmRsB_JId5H_xlSq6ZkN_ZI5m-UzHEoEju03GeV0ivzAURGXmoAM6e3CJMazRhNbe1Wb0vp4L_T1sVA1nFVlRSynGWt_qmpGlgbTttePUgOguaccpScj6lTIiBcyKaNdc7XwzPwfPgwKRD8E5NnXxrecI6-4_JI0mb4RxtTP5lb8kfXOXmZWoVmVyv9Ayyk5OT8Uoyl4gsMpSwrrCuhr-GCao32Y6nQosoQ",
  },
  {
    id: "patientJourney",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRnbtPpmzYuGrQfBko70g-tDhCTV17YKxmF7OMt2dMC7MAqeQsifg4LfFT-az9Dedtx2NgHYGynRNlGsXJVZAJI_01oGdXVHET3_hLRd64IxoBcXZeaEMdkWdwPB7yp3wpQPnobj-apqd0Ii87K8MOGiyYZZUaALjvkzWQoJdpWKpK72DyxxON_mkX6F45iInp7bmE5m0b085SCxEIl8d7ePBQp6ddQnpFu40qUSzC3U0xTGDlWUw_",
  },
  {
    id: "advancedRobotics",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv-bDoR4fRriJ4DaA4RoULx61oTUQVQLQf-jMBwvpwqazNMZYSng3SsqVI5gxgQdkaaqBItI7VWu39VK3Ex-2XO9o8-rjF5EAwXkCbkVDr3DfJRfeJfeQgbZzJfDU4I0j8p0YAIKu67AS2Ghm4IlcpSJ0ADspdnWG6JyEvy7G5SXfDT7--lnvX-vzpYyfZd6Zl_wC-Octd7ncgdC5THUcO6isbqJ31srt770nyrdo-vU_DDhtye4jY",
  },
];

const ARTICLES = [
  {
    id: "postSurgeryNutrition",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuApZ-AtljGQaSil2hAEWHjOPejq0yRo5Ed2nZ3h3W7lx50prhEcn_sgXuBZHokZWzmpcfieB-4JkIyvADcRTg-pU7vtvCZROUFtr6RoCb0kXI8qp2L5fRUmlAefQ2N4uNfkbwRdLwGv8RpxPhBBELH3n6vDAX-ljbZmZvGB8V7tMEXlf0olNDsL1j79Vq_9dDu6ul_aQAkUXP_A_yqYYsItiAMuQBGUh_Z33LVwk-Q01sFlLZmGYCE3",
  },
  {
    id: "liverRegeneration",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgoNhJ9X9EXgh3Ac-O4m8SyMtUHX5yTXx8lEz9du-IpkmjyKrrwYT81y-DbILT6eEfuwipnajcfpC8FbgbhLJ52mlXp07TMsal54qTxnoyfMHftZgCTAmGkwjKbdTdJB-CJ6EnfPCR99_iK93t_n1PV01RgVG-ZKKaKqWTzCv_ccbBiIaidNWG9RaqrHxP9PKfA5sX7GW1wDHSa-fxU0bu8gihYQx_o8N8x1BcRL_b3W_TY5C91crA",
  },
  {
    id: "roboticSurgeryBenefits",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6bbLdq-1pEyi49AU7jLNA-of2VdCk-0heZ_wmfVxesoBWdLU0qAeS_kxcM0zXqokBJFNoQAV5EWeHMtFfUquzCGMqVUglHjHuxoI-guk_bbVvD2nF_fsGW1MG06nZcRYiQm5-kj6JqUdUWVSdjjXMpU75DmREpvmiNWj-ehzQqr3yzzBMaY3sJfA6GaX4RZ-VvJCCT0VWT63d7rW-ql16YhIEbVOBwOtQxqLN3SPisagdE8to6cvT",
  },
  {
    id: "livingDonorInformation",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa6N6Zcj_ZydIEZp7PuhbxGdwRwCwgkSDj2Anc7YXLNkoH4BUwv79unCMjdh-N9jWYklCoUSsiPLoeAERHDDbzOx1uIqVcbh_cRZFbkzniyWwiJxujZUNqNvzGL4Yzbv3Dt04Qc6LuIhcxXb_yP4IQxE9tSLrtM8mOM7C7C5cOPeH33UJmpgYsK1VUdkfsCklNNislXRcgZqd6xDDRzXd2olusuI1AajWZ7E3z9rS-fJXaliVAG5HA",
  },
];

const FAQ_IDS = [
  "recovery",
  "successRates",
  "roboticSurgery",
  "internationalPatients",
  "insurance",
  "scheduleConsultation",
] as const;

export default function HomeClient() {
  const t = useTranslations("home");
  const ctaSectionRef = useRef<HTMLElement>(null);
  const [isCtaVisible, setIsCtaVisible] = useState(false);

  useEffect(() => {
    const section = ctaSectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsCtaVisible(true);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="route-home">
      <main className="relative z-10 pt-32 pb-0">
        {/* 1. Hero Section */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 relative mb-section-gap">
          <div className="relative rounded-3xl overflow-hidden glass-panel min-h-[819px] flex flex-col md:flex-row items-center">
            <div className="absolute inset-0 z-0">
              <img
                alt="A brightly lit, futuristic medical clinic operating room overlooking a serene morning cityscape. Soft, high-key lighting creates a pristine, clean environment. Subtle teal and white gradients dominate the color palette, reflecting advanced medical technology and a sense of renewed hope."
                className="w-full h-full object-cover mix-blend-overlay"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmUndeZZMsdgWt6fFaHt5YAJijMlt9B6OomF1ty8XoYscFmRsB_JId5H_xlSq6ZkN_ZI5m-UzHEoEju03GeV0ivzAURGXmoAM6e3CJMazRhNbe1Wb0vp4L_T1sVA1nFVlRSynGWt_qmpGlgbTttePUgOguaccpScj6lTIiBcyKaNdc7XwzPwfPgwKRD8E5NnXxrecI6-4_JI0mb4RxtTP5lb8kfXOXmZWoVmVyv9Ayyk5OT8Uoyl4gsMpSwrrCuhr-GCao32Y6nQosoQ"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent"></div>
            </div>
            <div className="relative z-10 w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center items-start gap-stack-md">
              <h1 className="font-hero-headline-mobile md:font-hero-headline text-primary md:text-[80px] leading-tight tracking-wider">
                {t("hero.title")}
              </h1>
              <p className="font-body-lg max-w-lg text-xl md:text-2xl leading-relaxed opacity-90 text-white">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4 mt-4 items-center">
                <button className="bg-gradient-to-r from-secondary to-primary text-on-primary px-10 py-4 rounded-full font-label-sm shadow-[0_10px_30px_rgba(24,213,184,0.4)] glow-hover transition-all flex items-center gap-3 hover:-translate-y-1 active:scale-95 border-t border-white/20">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    calendar_month
                  </span>
                  {t("hero.bookAppointment")}
                </button>
                <button className="glass-panel text-primary px-10 py-4 rounded-full font-label-sm hover:bg-white/60 transition-all flex items-center gap-3 hover:-translate-y-1 active:scale-95 shadow-lg">
                  <span className="material-symbols-outlined">
                    play_circle
                  </span>
                  {t("hero.watchVideos")}
                </button>
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-primary/30 shadow-[0_0_15px_rgba(24,213,184,0.4)] flex-shrink-0 flex items-center justify-center ml-2">
                  <img
                    alt="3D Liver Medallion"
                    className="w-full h-full object-cover animate-[spin_30s_linear_infinite]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv-bDoR4fRriJ4DaA4RoULx61oTUQVQLQf-jMBwvpwqazNMZYSng3SsqVI5gxgQdkaaqBItI7VWu39VK3Ex-2XO9o8-rjF5EAwXkCbkVDr3DfJRfeJfeQgbZzJfDU4I0j8p0YAIKu67AS2Ghm4IlcpSJ0ADspdnWG6JyEvy7G5SXfDT7--lnvX-vzpYyfZd6Zl_wC-Octd7ncgdC5THUcO6isbqJ31srt770nyrdo-vU_DDhtye4jY"
                  />
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-2/5 h-full flex justify-center items-center p-8"></div>
            {/* Floating Social Bar */}
            <div className="absolute end-8 bottom-8 glass-panel rounded-full p-2 flex flex-col gap-4 z-20">
              <a
                className="p-2 rounded-full hover:bg-primary-container/20 text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">call</span>
              </a>
              <a
                className="p-2 rounded-full hover:bg-primary-container/20 text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">mail</span>
              </a>
              <a
                className="p-2 rounded-full hover:bg-primary-container/20 text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">share</span>
              </a>
            </div>
          </div>
        </section>

        {/* 2. Statistics */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mb-section-gap -mt-32 relative z-20 perspective-container h-[400px]">
          <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 pointer-events-none z-0 overflow-hidden">
            <svg
              className="w-full h-full drop-shadow-[0_0_10px_rgba(24,213,184,0.5)]"
              preserveAspectRatio="none"
              viewBox="0 0 1000 200"
            >
              <path
                className="neon-path"
                d="M -100 100 C 150 100, 150 50, 300 100 C 450 150, 450 50, 600 100 C 750 150, 750 100, 900 100 C 1050 100, 1050 100, 1100 100"
                fill="none"
                stroke="rgba(24, 213, 184, 0.4)"
                strokeWidth="4"
              />
            </svg>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 h-full relative z-10">
            <div
              className="glass-capsule float-anim rounded-t-full rounded-b-3xl p-6 w-40 md:w-48 h-56 md:h-64 flex flex-col items-center justify-center text-center gap-3"
              style={{
                transform: "rotate3d(0, 1, 0, 10deg)",
                animationDelay: "0s",
              }}
            >
              <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center drop-shadow-[0_0_10px_rgba(24,213,184,0.5)]">
                <span
                  className="material-symbols-outlined text-4xl text-primary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  military_tech
                </span>
              </div>
              <h3 className="font-section-title text-primary-container text-3xl md:text-4xl drop-shadow-[0_0_8px_rgba(24,213,184,0.6)]">
                +20
              </h3>
              <p className="font-label-sm text-on-surface-variant z-10">
                {t("stats.yearsExperience")}
              </p>
            </div>
            <div
              className="glass-capsule float-anim rounded-b-full rounded-t-3xl p-6 w-40 md:w-48 h-56 md:h-64 flex flex-col items-center justify-center text-center gap-3"
              style={{
                transform: "translateY(20px) rotate3d(1, 0, 0, -10deg)",
                animationDelay: "1.2s",
              }}
            >
              <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center drop-shadow-[0_0_10px_rgba(24,213,184,0.5)]">
                <span
                  className="material-symbols-outlined text-4xl text-primary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  verified
                </span>
              </div>
              <h3 className="font-section-title text-primary-container text-3xl md:text-4xl drop-shadow-[0_0_8px_rgba(24,213,184,0.6)]">
                98%
              </h3>
              <p className="font-label-sm text-on-surface-variant z-10">
                {t("stats.successRate")}
              </p>
            </div>
            <div
              className="glass-capsule float-anim rounded-full p-6 w-44 md:w-52 h-64 md:h-72 flex flex-col items-center justify-center text-center gap-3 border-primary/50"
              style={{ transform: "translateZ(30px)", animationDelay: "0.6s" }}
            >
              <div className="w-20 h-20 rounded-full bg-primary-container/30 flex items-center justify-center drop-shadow-[0_0_15px_rgba(24,213,184,0.8)]">
                <span
                  className="material-symbols-outlined text-5xl text-primary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  groups
                </span>
              </div>
              <h3 className="font-section-title text-primary-container text-4xl md:text-5xl drop-shadow-[0_0_12px_rgba(24,213,184,0.8)]">
                +5000
              </h3>
              <p className="font-label-sm text-on-surface-variant z-10 font-bold">
                {t("stats.recoveredPatients")}
              </p>
            </div>
            <div
              className="glass-capsule float-anim rounded-t-full rounded-b-3xl p-6 w-40 md:w-48 h-56 md:h-64 flex flex-col items-center justify-center text-center gap-3"
              style={{
                transform: "translateY(-15px) rotate3d(0, 1, 0, -10deg)",
                animationDelay: "1.8s",
              }}
            >
              <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center drop-shadow-[0_0_10px_rgba(24,213,184,0.5)]">
                <span
                  className="material-symbols-outlined text-4xl text-primary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  local_hospital
                </span>
              </div>
              <h3 className="font-section-title text-primary-container text-3xl md:text-4xl drop-shadow-[0_0_8px_rgba(24,213,184,0.6)]">
                +1000
              </h3>
              <p className="font-label-sm text-on-surface-variant z-10">
                {t("stats.successfulSurgeries")}
              </p>
            </div>
            <div
              className="glass-capsule float-anim rounded-b-full rounded-t-3xl p-6 w-40 md:w-48 h-56 md:h-64 flex flex-col items-center justify-center text-center gap-3"
              style={{
                transform: "rotate3d(1, 1, 0, 10deg)",
                animationDelay: "2.4s",
              }}
            >
              <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center drop-shadow-[0_0_10px_rgba(24,213,184,0.5)]">
                <span
                  className="material-symbols-outlined text-4xl text-primary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  business
                </span>
              </div>
              <h3 className="font-section-title text-primary-container text-3xl md:text-4xl drop-shadow-[0_0_8px_rgba(24,213,184,0.6)]">
                +15
              </h3>
              <p className="font-label-sm text-on-surface-variant z-10">
                {t("stats.specializedCenters")}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Video/Intro */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mb-section-gap">
          <div className="text-center mb-12 flex flex-col gap-2">
            <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
              {t("meetDoctor.eyebrow")}
            </span>
            <h2 className="font-section-title text-primary md:text-5xl">
              {t("meetDoctor.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-30"></div>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 items-center perspective-container">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-10 border border-primary/10 rounded-[40px] animate-[spin_20s_linear_infinite] opacity-30 pointer-events-none"></div>
              <div className="absolute -inset-6 border-2 border-primary/5 rounded-[50px] animate-[spin_30s_linear_infinite_reverse] opacity-20 pointer-events-none"></div>
              <div className="glass-panel p-3 rounded-[32px] aspect-video relative overflow-hidden group cursor-pointer shadow-[0_20px_50px_rgba(0,107,91,0.2)] border-white/40">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
                <img
                  alt={t("meetDoctor.imageAlt")}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRnbtPpmzYuGrQfBko70g-tDhCTV17YKxmF7OMt2dMC7MAqeQsifg4LfFT-az9Dedtx2NgHYGynRNlGsXJVZAJI_01oGdXVHET3_hLRd64IxoBcXZeaEMdkWdwPB7yp3wpQPnobj-apqd0Ii87K8MOGiyYZZUaALjvkzWQoJdpWKpK72DyxxON_mkX6F45iInp7bmE5m0b085SCxEIl8d7ePBQp6ddQnpFu40qUSzC3U0xTGDlWUw_"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-background/10 group-hover:bg-background/5 transition-colors">
                  <div className="w-20 h-20 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform border border-white/50">
                    <span
                      className="material-symbols-outlined text-4xl"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      play_arrow
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6 items-start">
              <div className="flex flex-col gap-1">
                <h3 className="font-section-title text-primary text-4xl">
                  {t("meetDoctor.name")}
                </h3>
                <p className="font-label-sm text-secondary font-bold tracking-wider uppercase">
                  {t("meetDoctor.role")}
                </p>
              </div>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                {t("meetDoctor.bio")}
              </p>
              <button className="glass-capsule px-10 py-4 rounded-full text-primary font-bold flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(24,213,184,0.3)] transition-all mt-4">
                {t("meetDoctor.cta")}
                <span className="material-symbols-outlined icon-rtl-flip">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. Key Procedures */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mb-section-gap">
          <div className="text-center mb-16 flex flex-col gap-2">
            <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
              {t("majorSurgeries.eyebrow")}
            </span>
            <h2 className="font-section-title text-primary md:text-5xl drop-shadow-[0_2px_4px_rgba(0,107,91,0.3)] relative inline-block mx-auto">
              {t("majorSurgeries.title")}
              <div className="absolute -inset-2 bg-primary/5 blur-xl rounded-full -z-10"></div>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
            {MAJOR_SURGERIES.map((item) => (
              <div
                key={item.id}
                className="glass-capsule group relative h-[500px] rounded-[40px] overflow-hidden flex flex-col items-center justify-end p-8 text-center transition-all duration-500 border-white/40 shadow-[0_20px_50px_rgba(0,107,91,0.2)]"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background z-10"></div>
                  <img
                    alt={t(`majorSurgeries.items.${item.id}.title`)}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:translate-z-10 transition-all duration-700"
                    src={item.img}
                  />
                  <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px] pointer-events-none"></div>
                </div>
                <div className="relative z-20 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-card-title text-primary text-2xl mb-2 drop-shadow-[0_0_8px_rgba(24,213,184,0.6)]">
                    {t(`majorSurgeries.items.${item.id}.title`)}
                  </h3>
                  <p className="font-body-md text-on-surface-variant leading-tight">
                    {t(`majorSurgeries.items.${item.id}.desc`)}
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-primary/20 rounded-[40px] pointer-events-none group-hover:border-primary/60 group-hover:shadow-[inset_0_0_30px_rgba(24,213,184,0.3)] transition-all"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <button className="glass-capsule px-12 py-5 rounded-full text-primary font-bold flex items-center gap-4 hover:shadow-[0_15px_45px_rgba(24,213,184,0.4)] transition-all group">
              {t("majorSurgeries.cta")}
              <span className="material-symbols-outlined icon-rtl-flip group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </section>

        {/* 5. Major Treatments */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mb-section-gap">
          <div className="text-center mb-16 flex flex-col gap-2">
            <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
              {t("majorTreatments.eyebrow")}
            </span>
            <h2 className="font-section-title text-primary md:text-5xl drop-shadow-[0_2px_4px_rgba(0,107,91,0.3)] relative inline-block mx-auto">
              {t("majorTreatments.title")}
              <div className="absolute -inset-2 bg-primary/5 blur-xl rounded-full -z-10"></div>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
            {MAJOR_TREATMENTS.map((item) => (
              <div
                key={item.id}
                className="glass-capsule group relative h-[500px] rounded-[40px] overflow-hidden flex flex-col items-center justify-end p-8 text-center transition-all duration-500 border-white/40 shadow-[0_20px_50px_rgba(0,107,91,0.2)]"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background z-10"></div>
                  <img
                    alt={t(`majorTreatments.items.${item.id}.title`)}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:translate-z-10 transition-all duration-700"
                    src={item.img}
                  />
                  <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px] pointer-events-none"></div>
                </div>
                <div className="relative z-20 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-card-title text-primary text-2xl mb-2 drop-shadow-[0_0_8px_rgba(24,213,184,0.6)]">
                    {t(`majorTreatments.items.${item.id}.title`)}
                  </h3>
                  <p className="font-body-md text-on-surface-variant leading-tight">
                    {t(`majorTreatments.items.${item.id}.desc`)}
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-primary/20 rounded-[40px] pointer-events-none group-hover:border-primary/60 group-hover:shadow-[inset_0_0_30px_rgba(24,213,184,0.3)] transition-all"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <button className="glass-capsule px-12 py-5 rounded-full text-primary font-bold flex items-center gap-4 hover:shadow-[0_15px_45px_rgba(24,213,184,0.4)] transition-all group">
              {t("majorTreatments.cta")}
              <span className="material-symbols-outlined icon-rtl-flip group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </section>

        {/* 6. Patient Stories */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mb-section-gap relative z-10">
          <div className="text-center mb-16 flex flex-col gap-2">
            <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
              {t("patientStories.eyebrow")}
            </span>
            <h2 className="font-section-title text-primary md:text-5xl drop-shadow-[0_0_15px_rgba(24,213,184,0.6)] relative inline-block mx-auto">
              {t("patientStories.title")}
              <div className="absolute -inset-4 bg-primary-container/10 blur-2xl rounded-full -z-10 animate-pulse"></div>
            </h2>
            <p className="font-body-lg text-on-surface-variant mt-2">
              {t("patientStories.subtitle")}
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 perspective-container">
            {PATIENT_STORIES.map((story) => (
              <div
                key={story.id}
                className={`glass-capsule group relative h-[450px] ${story.shape} flex flex-col items-center justify-center p-8 text-center transition-all duration-500 border-white/40 shadow-[0_20px_50px_rgba(0,107,91,0.2)]`}
              >
                <span className="material-symbols-outlined absolute top-12 text-6xl opacity-10 text-primary group-hover:-translate-z-10 transition-transform duration-500">
                  format_quote
                </span>
                <div className="relative z-20 group-hover:translate-z-20 transition-transform duration-500">
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-primary text-sm"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-body-md text-on-surface-variant italic mb-6 px-4">
                    &quot;{t(`patientStories.items.${story.id}.quote`)}&quot;
                  </p>
                  <h4 className="font-card-title text-primary text-xl">
                    {t(`patientStories.items.${story.id}.name`)}
                  </h4>
                  <span className="font-label-sm text-secondary uppercase tracking-widest mt-2 block">
                    {t(`patientStories.items.${story.id}.tag`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <button className="glass-capsule px-12 py-5 rounded-full text-primary font-bold flex items-center gap-4 hover:shadow-[0_15px_45px_rgba(24,213,184,0.4)] transition-all group">
              {t("patientStories.cta")}
              <span className="material-symbols-outlined icon-rtl-flip group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </section>

        {/* 7. Why Dr. Mohamed Samy Abdelwahid */}
        <section className="w-full py-24 mb-section-gap relative overflow-hidden bg-surface text-on-background">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/10 blur-[150px] rounded-full"></div>
          </div>
          <div className="max-w-container-max mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-16 flex flex-col gap-2">
              <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
                {t("whyUs.eyebrow")}
              </span>
              <h2 className="font-section-title text-primary md:text-6xl drop-shadow-[0_10px_20px_rgba(0,107,91,0.2)] relative inline-block mx-auto">
                {t("whyUs.title")}
                <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full -z-10"></div>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
            </div>
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-[45%] relative h-[700px] perspective-container group flex items-center justify-center h-[850px] scale-110">
                <div className="absolute inset-0 max-w-sm mx-auto h-full flex items-center justify-center">
                  <div className="absolute w-[85%] h-[80%] rounded-[40px] glass-panel opacity-40 transition-all duration-700 group-hover:-translate-x-12 group-hover:translate-y-4 group-hover:-rotate-6 group-hover:scale-95"></div>
                  <div className="absolute w-[90%] h-[85%] rounded-[40px] glass-panel opacity-60 transition-all duration-700 group-hover:-translate-x-6 group-hover:translate-y-2 group-hover:-rotate-3 group-hover:scale-95 z-0"></div>
                  <div className="absolute w-[90%] h-[85%] rounded-[40px] glass-panel opacity-60 transition-all duration-700 group-hover:translate-x-6 group-hover:translate-y-2 group-hover:rotate-3 group-hover:scale-95 z-0"></div>
                  <div className="absolute w-[85%] h-[80%] rounded-[40px] glass-panel opacity-40 transition-all duration-700 group-hover:translate-x-12 group-hover:translate-y-4 group-hover:rotate-6 group-hover:scale-95 z-0"></div>
                </div>
                <div className="relative z-20 w-full max-w-md h-[90%] glass-panel rounded-[40px] p-4 flex flex-col justify-end overflow-hidden shadow-[0_30px_60px_rgba(0,107,91,0.2)] border-primary/30 group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10"></div>
                  <img
                    alt={t("whyUs.portraitName")}
                    className="absolute inset-0 w-full h-full object-cover object-top rounded-[32px] opacity-90"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRnbtPpmzYuGrQfBko70g-tDhCTV17YKxmF7OMt2dMC7MAqeQsifg4LfFT-az9Dedtx2NgHYGynRNlGsXJVZAJI_01oGdXVHET3_hLRd64IxoBcXZeaEMdkWdwPB7yp3wpQPnobj-apqd0Ii87K8MOGiyYZZUaALjvkzWQoJdpWKpK72DyxxON_mkX6F45iInp7bmE5m0b085SCxEIl8d7ePBQp6ddQnpFu40qUSzC3U0xTGDlWUw_"
                  />
                  <div className="relative z-20 text-center pb-6">
                    <h3 className="font-section-title text-primary text-3xl drop-shadow-[0_0_10px_rgba(24,213,184,0.4)]">
                      {t("whyUs.portraitName")}
                    </h3>
                    <p className="font-label-sm text-secondary tracking-[0.2em] uppercase mt-2">
                      {t("whyUs.portraitRole")}
                    </p>
                  </div>
                  <div className="absolute inset-0 rounded-[40px] border-2 border-primary/20 shadow-[inset_0_0_40px_rgba(24,213,184,0.2)] pointer-events-none"></div>
                </div>
              </div>
              <div className="w-full lg:w-[55%] flex flex-col items-start gap-8">
                <div className="flex flex-col gap-6 relative w-full ps-6">
                  <div className="absolute start-0 top-4 bottom-4 w-1 bg-gradient-to-b from-primary/80 via-primary-fixed/50 to-transparent rounded-full shadow-[0_0_10px_rgba(24,213,184,0.6)]">
                    <div className="w-full h-20 bg-white/80 rounded-full animate-[float_3s_ease-in-out_infinite]"></div>
                  </div>
                  {Array.from({ length: WHY_US_REASON_COUNT }).map((_, i) => (
                    <div
                      key={i}
                      className="glass-panel p-6 rounded-2xl flex items-center gap-6 border-s-4 border-s-primary hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          workspace_premium
                        </span>
                      </div>
                      <div>
                        <h4 className="font-card-title text-xl text-primary mb-1">
                          {t("whyUs.reasonTitle")}
                        </h4>
                        <p className="font-body-md text-on-surface-variant opacity-80 leading-snug">
                          {t("whyUs.reasonDesc")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="glass-capsule px-10 py-4 rounded-full text-primary font-bold flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(24,213,184,0.3)] transition-all">
                    {t("whyUs.cta")}
                    <span className="material-symbols-outlined icon-rtl-flip">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Latest Videos */}
        <section className="w-full py-24 mb-section-gap relative overflow-hidden bg-background text-on-background">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full"></div>
          </div>
          <div className="max-w-container-max mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-16 flex flex-col gap-2">
              <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
                {t("videos.eyebrow")}
              </span>
              <h2 className="font-section-title text-primary md:text-6xl drop-shadow-[0_10px_20px_rgba(0,107,91,0.2)] relative inline-block mx-auto">
                {t("videos.title")}
                <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full -z-10"></div>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {LATEST_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="group relative aspect-[9/16] rounded-[50px] glass-panel p-2 overflow-hidden shadow-[0_20px_50px_rgba(0,107,91,0.2)] border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(24,213,184,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-white/10 pointer-events-none z-20 transition-opacity duration-500 group-hover:opacity-100 opacity-60"></div>
                  <div className="w-full h-full rounded-[40px] overflow-hidden relative">
                    <img
                      alt={t(`videos.items.${video.id}.title`)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={video.img}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:translate-z-10 border border-white/50">
                        <span
                          className="material-symbols-outlined text-3xl"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          play_arrow
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-8 start-8 end-8 text-white">
                      <span className="font-label-sm text-primary-container tracking-widest uppercase mb-1 block">
                        {t(`videos.items.${video.id}.tag`)}
                      </span>
                      <h4 className="font-card-title text-xl">
                        {t(`videos.items.${video.id}.title`)}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-16">
              <button className="glass-capsule px-12 py-5 rounded-full text-primary font-bold flex items-center gap-4 hover:shadow-[0_15px_45px_rgba(24,213,184,0.4)] transition-all group">
                {t("videos.cta")}
                <span className="material-symbols-outlined icon-rtl-flip group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 9. Articles + FAQ */}
        <section className="w-full py-24 mb-section-gap relative overflow-hidden bg-surface text-on-background">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/5 blur-[150px] rounded-full"></div>
          </div>
          <div className="max-w-container-max mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-16 flex flex-col gap-2">
              <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
                {t("insights.eyebrow")}
              </span>
              <h2 className="font-section-title text-primary md:text-6xl drop-shadow-[0_10px_20px_rgba(0,107,91,0.2)] relative inline-block mx-auto">
                {t("insights.title")}
                <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full -z-10"></div>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
            </div>
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="w-full lg:w-1/2 flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-6">
                  {ARTICLES.map((article) => (
                    <div
                      key={article.id}
                      className="glass-panel group relative aspect-square rounded-[32px] overflow-hidden p-2 border-white/40 shadow-lg hover:shadow-[0_20px_40px_rgba(24,213,184,0.3)] transition-all duration-500"
                    >
                      <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                        <img
                          alt={t(`insights.articles.${article.id}`)}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          src={article.img}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 start-4 end-4">
                          <h4 className="font-card-title text-white text-lg leading-tight group-hover:-translate-y-1 transition-transform">
                            {t(`insights.articles.${article.id}`)}
                          </h4>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/5 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
                <button className="glass-capsule px-10 py-4 rounded-full text-primary font-bold flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(24,213,184,0.3)] transition-all self-center group">
                  {t("insights.articlesCta")}
                  <span className="material-symbols-outlined icon-rtl-flip group-hover:translate-x-2 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {FAQ_IDS.map((id) => (
                  <div
                    key={id}
                    className="glass-panel p-6 rounded-[32px] border-white/40 shadow-md hover:shadow-[0_10px_25px_rgba(24,213,184,0.2)] transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-card-title text-primary text-xl">
                        {t(`insights.faq.${id}.q`)}
                      </h4>
                      <span className="material-symbols-outlined text-primary group-hover:rotate-180 transition-transform">
                        expand_more
                      </span>
                    </div>
                    <div className="mt-4 text-on-surface-variant font-body-md hidden group-hover:block">
                      {t(`insights.faq.${id}.a`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10. Immersive CTA */}
        <section
          ref={ctaSectionRef}
          className="w-full relative overflow-hidden bg-background py-32 flex flex-col items-center min-h-[700px] perspective-container z-20"
          id="immersive-cta"
        >
          <div className="absolute inset-0 z-0"></div>
          <div className="relative z-20 w-full max-w-4xl px-4 flex flex-col items-center justify-center h-full">
            <div
              className={`bg-white/40 backdrop-blur-[40px] border border-white/80 rounded-[60px] p-12 md:p-20 shadow-[0_20px_60px_rgba(0,107,91,0.15)] flex flex-col items-center text-center w-full cta-island transition-all duration-1000 ease-out hover:shadow-[0_30px_80px_rgba(24,213,184,0.25)] relative overflow-hidden group ${isCtaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center gap-6">
                <span className="font-label-sm text-primary tracking-[0.2em] uppercase font-bold">
                  {t("cta.eyebrow")}
                </span>
                <h2 className="font-section-title text-on-background md:text-5xl leading-tight drop-shadow-[0_4px_10px_rgba(255,255,255,0.8)]">
                  {t("cta.title")}
                </h2>
                <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto">
                  {t("cta.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 mt-8 w-full justify-center">
                  <button className="bg-primary/90 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold shadow-[0_10px_30px_rgba(24,213,184,0.5)] transition-all flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95 border border-white/30 hover:bg-primary hover:shadow-[0_15px_40px_rgba(24,213,184,0.7)] group/btn w-full sm:w-auto">
                    {t("cta.bookAppointment")}{" "}
                    <span className="material-symbols-outlined icon-rtl-flip group-hover/btn:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  <button className="bg-white/30 backdrop-blur-md text-primary px-10 py-5 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95 border-2 border-primary/40 hover:bg-white/50 hover:border-primary group/btn2 w-full sm:w-auto">
                    <span className="material-symbols-outlined group-hover/btn2:scale-110 transition-transform">
                      chat
                    </span>{" "}
                    {t("cta.whatsappUs")}
                  </button>
                </div>
                <p className="font-body-md text-primary mt-6 tracking-wide font-medium">
                  {t("cta.phone")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import HeroContactBar from "@/components/HeroContactBar";
import CtaBanner from "@/components/CtaBanner";
import CertificateGallery from "./CertificateGallery";

const TIMELINE_IDS = [
  "leadTransplantSurgeon",
  "consultantHepatobiliarySurgeon",
  "seniorSurgicalFellow",
  "surgicalResidency",
] as const;

const TIMELINE_DOTS: Record<(typeof TIMELINE_IDS)[number], string> = {
  leadTransplantSurgeon: "bg-primary shadow-[0_0_15px_#18d5b8] group-hover:scale-125",
  consultantHepatobiliarySurgeon:
    "bg-primary/40 shadow-[0_0_10px_rgba(24,213,184,0.3)] group-hover:bg-primary group-hover:shadow-[0_0_15px_#18d5b8] group-hover:scale-125",
  seniorSurgicalFellow:
    "bg-primary/40 shadow-[0_0_10px_rgba(24,213,184,0.3)] group-hover:bg-primary group-hover:shadow-[0_0_15px_#18d5b8] group-hover:scale-125",
  surgicalResidency:
    "bg-primary/40 shadow-[0_0_10px_rgba(24,213,184,0.3)] group-hover:bg-primary group-hover:shadow-[0_0_15px_#18d5b8] group-hover:scale-125",
};

const CONFERENCES = [
  {
    id: "globalHealthInnovations",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_ic0FcgaYbWg9VwdyLiXUcETwNWPElIq_6uy-UDM2P2T_YGXZd1LmM4t_ouGgXeO20qTSN5EUCubEiAsOTBcHPyDkmP_Rtku5CixmEudFxrV0nOScv0p1X0cFZAUqm7JWxVE7MxoP43OdAJ0p2gX0Kd5ZVtiW-0Qk6mbLXdjjdEF_zlTrmRN43ctkj3xdFC5bHUOmpwuFICDzwqijeYOH0c5NZjtvnmuc_gHp1R9e92xlk1eAE628",
  },
  {
    id: "advancesInNeuroscience",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4BOCSJElut3dGe9gPW9a_8V1CoQwsGwkVI70e7gRuOhd1hdHbzLvcyYMqlOiJYxkchc89i3hcslb_l0iqTMajUSO4ek4x2KNFEktrjfoOcZ727CVzqrX0BGUmaanJ1zzq2UwN-2REIPWRzY6qBOa_4776thBXSFw1q2tsrkCQxN5k0mEKXH9eOYxzs6bag9ykF5vAj-I-GXCgCMV9eIQAT481HChSPbgUu5l1fxDoaT0tNVylvj43",
  },
  {
    id: "globalInnovationsInSurgery",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3OMB5p7K-bK5F1r894DXzzD2A4KK_K21dBjKIG-W9JXrTZgBl95GbSCfwq9yFcA1ikD16hJOPYjpbY8q6bvCMRJCawllfiWBiEYq32OGfbCh-4U-2RMnYjgIYIa4Uxfnm0q0KXDe81v2xdQ5nC3HmRFJjPD14tbeCgjNf6imoBogsQfopnxB-sxH3ONxIJRr74wXQJkFeAZ6U-dfpdEPLdLZ1PA535umdiZrVNSfM4sI0L9fTL6mL",
  },
  {
    id: "advancedMedicineSummit",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG16N8uLzVLj-yJphc24dZVB3cKmR3Kq2CGqwnd8kxzuZcebLBufaKYv5_XORd8wMULK0DkzInh5MtphckJVM7Y29DcHzL8aYU4NTIXzwIv6xy6_KiUMZb7d-UWsTLwD8x42GbzTc9bP_t-D28WMzU-da9o31BjUgJXLqSx483ezOSndphOGwS5cyz9Hl51NRC4yFHBCn2ohGStMHkm9Q9sT-rOSdnhnStNdwUWnVgVufsPbc_UoPm",
  },
];

type ConferenceId = (typeof CONFERENCES)[number]["id"];

export default function AboutClient() {
  const t = useTranslations("about");
  const [activeConference, setActiveConference] = useState<{
    id: ConferenceId;
    img: string;
  } | null>(null);
  useEffect(() => {
    document.body.style.overflow = activeConference ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeConference]);

  return (
    <div className="route-about bg-background text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* 1. About Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-section-gap overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full mix-blend-overlay opacity-80"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAD0wqrfjQ9g2JRCSs7dSqzQMJ2tnTvwnLgQZqC8DlGLUodc2reAIPs4L7rh3gbjVEHIq5B3eLBvFmVUEma9c828HEyvPSt2FLoB0IEiBqP-XZUsafAwnQIKGnWZ1D7bqqXNtZo1dAb55V6rYwEycCtXQGmjSRAuIXzJyh93YEIkjgiP67VBBN9EikiAesFmw2RrbHuKZiqzcS6goqyltAMQAyIl92z9DNububL1KbVZ8XhMDG-Ji8W")',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/40"></div>
        </div>
        <div className="max-w-container-max mx-auto px-4 md:px-glass-padding w-full relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block glass-card px-4 py-2 rounded-full mb-6 border border-primary/30">
              <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold">
                {t("hero.badge")}
              </span>
            </div>
            <h1 className="font-hero-headline-mobile md:font-hero-headline text-hero-headline-mobile md:text-hero-headline text-primary mb-4 leading-tight">
              {t("hero.titleLine1")}
              <br />
              {t("hero.titleLine2")}
            </h1>
            <p className="font-body-lg text-body-lg text-surface-container-lowest mb-10 max-w-2xl opacity-90">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary-glass font-body-md text-body-md px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  calendar_month
                </span>
                {t("hero.bookAppointment")}
              </button>
              <button className="btn-secondary-glass font-body-md text-body-md px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold">
                <span className="material-symbols-outlined icon-fill">
                  play_circle
                </span>
                {t("hero.watchVideos")}
              </button>
            </div>
          </div>
        </div>
        <HeroContactBar />
      </section>

      {/* 2. Certificates & Credentials */}
      <section className="py-section-gap relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[600px] flex items-center justify-center -mt-20">
          <svg
            className="w-[200%] md:w-full h-full min-w-[2000px] drop-shadow-[0_0_15px_rgba(24,213,184,0.4)]"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 2000 200"
          >
            <path
              className="cable-path"
              d="M -100 100 Q 250 50, 500 100 T 1000 100 T 1500 100 T 2100 100"
              fill="none"
              id="main-cable"
              stroke="rgba(24, 213, 184, 0.2)"
              strokeLinecap="round"
              strokeWidth="12"
            />
            <path
              className="cable-path"
              d="M -100 100 Q 250 50, 500 100 T 1000 100 T 1500 100 T 2100 100"
              fill="none"
              id="core-cable"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <path
              className="cable-path cable-pulse"
              d="M -100 100 Q 250 50, 500 100 T 1000 100 T 1500 100 T 2100 100"
              fill="none"
              id="pulse-cable"
              stroke="#18D5B8"
              strokeLinecap="round"
              strokeWidth="6"
              style={{ animationDuration: "4s" }}
            />
          </svg>
        </div>
        <CertificateGallery />
      </section>

      {/* 3. Meet Dr. Mohamed Samy Abdelwahid */}
      <section className="py-section-gap relative overflow-hidden bg-surface">
        <div className="max-w-container-max mx-auto px-4 md:px-glass-padding relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold block mb-4">
              {t("meetDoctor.eyebrow")}
            </span>
            <h2 className="font-hero-headline text-5xl md:text-7xl liquid-text-embossed drop-shadow-[0_10px_20px_rgba(24,213,184,0.3)] text-primary">
              {t("meetDoctor.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-3xl pointer-events-none z-0"></div>
            <div className="relative z-10">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border-[8px] border-white/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,107,91,0.2),inset_0_0_40px_rgba(24,213,184,0.2)] relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-white/30 pointer-events-none z-10"></div>
                <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-6xl opacity-40 group-hover:scale-110 transition-transform duration-500">
                    play_circle
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-start">
              <h3 className="font-hero-headline text-3xl text-primary mb-2">
                {t("meetDoctor.name")}
              </h3>
              <p className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold mb-6">
                {t("meetDoctor.role")}
              </p>
              <p className="font-body-lg text-body-lg mb-8 opacity-90 leading-relaxed text-on-background">
                {t("meetDoctor.bio")}
              </p>
              <button className="btn-primary-glass font-body-md text-body-md px-8 py-3 rounded-full flex items-center justify-center gap-2 font-bold">
                {t("meetDoctor.cta")}
                <span className="material-symbols-outlined icon-rtl-flip">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Career Journey */}
      <section
        className="py-section-gap relative bg-background overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <div className="max-w-container-max mx-auto px-glass-padding relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold block mb-4">
              {t("career.eyebrow")}
            </span>
            <h2 className="font-hero-headline text-5xl md:text-7xl liquid-text-embossed drop-shadow-[0_10px_20px_rgba(24,213,184,0.3)] text-primary">
              {t("career.title")}
            </h2>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
              {TIMELINE_IDS.map((id) => (
                <div
                  key={id}
                  className="group relative glass-panel p-8 rounded-[2rem] border border-white/60 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
                >
                  <div
                    className={`absolute -top-3 start-1/2 -translate-x-1/2 w-6 h-6 rounded-full transition-all ${TIMELINE_DOTS[id]}`}
                  ></div>
                  <div className="text-center">
                    <span className="font-label-sm text-label-sm text-primary/60 block mb-2 font-bold">
                      {t(`career.items.${id}.period`)}
                    </span>
                    <h3 className="font-card-title text-xl text-on-surface mb-1">
                      {t(`career.items.${id}.role`)}
                    </h3>
                    <p className="font-body-md text-sm text-primary/80">
                      {t(`career.items.${id}.place`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Scientific Conferences */}
      <section className="py-section-gap relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-container-max mx-auto px-4 md:px-glass-padding relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold block mb-4">
              {t("conferences.eyebrow")}
            </span>
            <h2 className="font-hero-headline text-5xl md:text-7xl liquid-text-embossed drop-shadow-[0_10px_20px_rgba(24,213,184,0.3)] text-primary">
              {t("conferences.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONFERENCES.map((conf) => (
              <div
                key={conf.id}
                className="straight-capsule flex flex-col h-[400px] group"
                onClick={() => setActiveConference(conf)}
              >
                <div className="h-2/3 w-full relative overflow-hidden">
                  <img
                    alt={t(`conferences.items.${conf.id}.title`)}
                    className="w-full h-full object-cover relative z-0"
                    src={conf.img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                </div>
                <div className="h-1/3 flex flex-col justify-center items-center p-4 text-center relative z-20 bg-white/10 backdrop-blur-sm border-t border-white/30">
                  <h3 className="font-card-title text-lg text-primary mb-1 group-hover:text-white transition-colors duration-300">
                    {t(`conferences.items.${conf.id}.title`)}
                  </h3>
                  <p className="font-label-sm text-xs group-hover:text-white/80 transition-colors duration-300 text-surface-container-lowest">
                    {t(`conferences.items.${conf.id}.location`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-screen Conference Popup */}
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 ${activeConference ? "active" : ""}`}
          id="conference-popup"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-surface/80 to-surface/90"
            onClick={() => setActiveConference(null)}
          ></div>
          <div className="popup-content relative w-full max-w-5xl bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_30px_60px_rgba(0,107,91,0.15),inset_0_0_40px_rgba(24,213,184,0.2)] overflow-hidden flex flex-col md:flex-row">
            <button
              className="absolute top-4 end-4 z-50 w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 text-primary transition-colors border border-white/60 shadow-lg"
              onClick={() => setActiveConference(null)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-full md:w-3/5 h-[40vh] md:h-[70vh] relative">
              {activeConference && (
                <img
                  alt={t("conferences.viewFullGallery")}
                  className="w-full h-full object-cover"
                  id="popup-image"
                  src={activeConference.img}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 pointer-events-none"></div>
            </div>
            <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 pointer-events-none -z-10"></div>
              {activeConference && (
                <>
                  <span
                    className="font-label-sm text-sm text-primary tracking-widest uppercase font-bold mb-3 block"
                    id="popup-location"
                  >
                    {t(`conferences.items.${activeConference.id}.location`)}
                  </span>
                  <h3
                    className="font-hero-headline text-4xl text-primary mb-6 leading-tight"
                    id="popup-title"
                  >
                    {t(`conferences.items.${activeConference.id}.title`)}
                  </h3>
                </>
              )}
              <p className="font-body-md text-on-surface-variant opacity-90 leading-relaxed mb-8">
                {t("conferences.popupBody")}
              </p>
              <div className="flex gap-4 mt-auto">
                <button className="btn-primary-glass font-body-md text-sm px-6 py-3 rounded-xl flex-1 font-bold text-center">
                  {t("conferences.viewFullGallery")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. A Word From The Doctor */}
      <section
        className="py-section-gap relative overflow-hidden bg-surface"
        id="doctor-philosophy"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
        <div className="max-w-container-max mx-auto px-4 md:px-glass-padding relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold block mb-4">
              {t("philosophy.eyebrow")}
            </span>
            <h2 className="font-hero-headline text-5xl md:text-7xl liquid-text-embossed drop-shadow-[0_10px_20px_rgba(24,213,184,0.3)] text-primary">
              {t("philosophy.title")}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-16 relative">
            <div className="w-full md:w-[45%] relative group">
              <div className="absolute -inset-8 z-0">
                <div className="absolute top-0 start-4 w-full h-full bg-white/10 backdrop-blur-sm border border-white/40 rounded-[3rem] transform -rotate-3 transition-transform duration-700 group-hover:-rotate-6"></div>
                <div className="absolute top-4 -start-4 w-full h-full bg-white/10 backdrop-blur-sm border border-white/40 rounded-[3rem] transform rotate-2 transition-transform duration-700 group-hover:rotate-4"></div>
                <div className="absolute -top-4 -end-4 w-full h-full bg-white/5 backdrop-blur-md border border-white/20 rounded-[3rem] transform rotate-1 transition-transform duration-700 group-hover:rotate-2"></div>
              </div>
              <div className="relative z-10 aspect-[3/4] rounded-[3rem] overflow-hidden border-[12px] border-white/60 shadow-[0_30px_60px_rgba(0,107,91,0.15),inset_0_0_40px_rgba(24,213,184,0.2)] backdrop-blur-md">
                <img
                  alt={t("meetDoctor.name")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD0wqrfjQ9g2JRCSs7dSqzQMJ2tnTvwnLgQZqC8DlGLUodc2reAIPs4L7rh3gbjVEHIq5B3eLBvFmVUEma9c828HEyvPSt2FLoB0IEiBqP-XZUsafAwnQIKGnWZ1D7bqqXNtZo1dAb55V6rYwEycCtXQGmjSRAuIXzJyh93YEIkjgiP67VBBN9EikiAesFmw2RrbHuKZiqzcS6goqyltAMQAyIl92z9DNububL1KbVZ8XhMDG-Ji8W"
                />
                <div className="absolute inset-0 border-[1px] border-primary/30 rounded-[3rem] pointer-events-none shadow-[inset_0_0_30px_rgba(24,213,184,0.4)]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </div>
            </div>
            <div className="w-full md:w-[55%] relative">
              <div className="absolute inset-0 -z-10 flex flex-col justify-around opacity-10 pointer-events-none select-none">
                <span className="font-hero-headline text-8xl text-primary transform -translate-x-10 transition-transform duration-1000 hover:translate-x-0">
                  {t("philosophy.ghostWord1")}
                </span>
                <span className="font-hero-headline text-8xl text-primary self-end translate-x-10 transition-transform duration-1000 hover:-translate-x-0">
                  {t("philosophy.ghostWord2")}
                </span>
                <span className="font-hero-headline text-8xl text-primary transform -translate-x-5 transition-transform duration-1000 hover:translate-x-5">
                  {t("philosophy.ghostWord3")}
                </span>
              </div>
              <div className="glass-panel p-12 rounded-[2.5rem] border border-white/80 relative overflow-hidden">
                <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold mb-6 block">
                  {t("philosophy.label")}
                </span>
                <blockquote className="font-body-lg text-2xl md:text-3xl text-on-surface leading-relaxed mb-10 italic">
                  &lsquo;{t("philosophy.quote")}&rsquo;
                </blockquote>
                <div className="mt-auto">
                  <div className="h-px w-32 bg-gradient-to-r from-primary to-transparent mb-4"></div>
                  <p className="font-hero-headline text-2xl text-primary">
                    {t("philosophy.name")}
                  </p>
                  <p className="font-label-sm text-label-sm text-surface-container-lowest uppercase tracking-widest">
                    {t("philosophy.role")}
                  </p>
                </div>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <CtaBanner
        eyebrow={t("cta.eyebrow")}
        primaryLabel={t("cta.bookAppointment")}
        subtitle={t("cta.subtitle")}
        title={`${t("cta.titleLine1")} ${t("cta.titleEmphasis")} ${t("cta.titleLine2")}`}
        whatsappLabel={t("cta.whatsappUs")}
      />
    </div>
  );
}

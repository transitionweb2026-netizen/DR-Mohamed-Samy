"use client";

import HeroContactBar, { type HeroContactBarContent } from "@/components/HeroContactBar";
import CtaBanner from "@/components/CtaBanner";

type ButtonContent = { label: string; href: string };
type ImageContent = { url: string; mediaId: string | null; alt: string };

export type HomeContent = {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: ImageContent;
    medallionImage: ImageContent;
    bookAppointment: ButtonContent;
    watchVideos: ButtonContent;
  };
  stats: { items: { id: string; icon: string; value: string; label: string }[] };
  meetDoctor: {
    eyebrow: string;
    title: string;
    image: ImageContent;
    name: string;
    role: string;
    bio: string;
    cta: ButtonContent;
  };
  majorSurgeries: {
    eyebrow: string;
    title: string;
    cta: ButtonContent;
    items: { id: string; image: ImageContent; title: string; desc: string }[];
  };
  majorTreatments: {
    eyebrow: string;
    title: string;
    cta: ButtonContent;
    items: { id: string; image: ImageContent; title: string; desc: string }[];
  };
  patientStories: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: ButtonContent;
    items: { id: string; quote: string; name: string; tag: string }[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    portraitImage: ImageContent;
    portraitName: string;
    portraitRole: string;
    cta: ButtonContent;
    items: { id: string; icon: string; title: string; desc: string }[];
  };
  videos: {
    eyebrow: string;
    title: string;
    cta: ButtonContent;
    items: { id: string; image: ImageContent; tag: string; title: string }[];
  };
  insights: {
    eyebrow: string;
    title: string;
    articlesCta: ButtonContent;
    articles: { id: string; image: ImageContent; title: string }[];
    faq: { id: string; q: string; a: string }[];
  };
  cta: { eyebrow: string; title: string; subtitle: string; bookAppointment: ButtonContent; whatsappUs: ButtonContent };
};

const STORY_SHAPES: Record<string, string> = {
  sarahJohnson: "rounded-full",
  michaelChen: "rounded-t-full rounded-b-3xl",
  ahmedHassan: "rounded-[100px]",
  elenaRodriguez: "rounded-b-[80px] rounded-t-3xl",
  robertTaylor: "rounded-[40px]",
  fatimaAlSayed: "rounded-tl-[100px] rounded-br-[100px] rounded-tr-3xl rounded-bl-3xl",
};

export default function HomeClient({
  content,
  heroContactBarContent,
}: {
  content: HomeContent;
  heroContactBarContent: HeroContactBarContent;
}) {
  const { hero, stats, meetDoctor, majorSurgeries, majorTreatments, patientStories, whyUs, videos, insights, cta } =
    content;

  return (
    <div className="route-home">
      <main className="relative z-10 pt-32 pb-0">
        {/* 1. Hero Section */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 relative mb-section-gap">
          <div className="relative rounded-3xl overflow-hidden glass-panel min-h-[819px] flex flex-col md:flex-row items-center">
            <div className="absolute inset-0 z-0">
              <img
                alt={hero.backgroundImage.alt}
                className="w-full h-full object-cover mix-blend-overlay"
                src={hero.backgroundImage.url}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent"></div>
            </div>
            <div className="relative z-10 w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center items-start gap-stack-md">
              <h1 className="font-hero-headline-mobile md:font-hero-headline text-primary md:text-[80px] leading-tight tracking-wider">
                {hero.title}
              </h1>
              <p className="font-body-lg max-w-lg text-xl md:text-2xl leading-relaxed opacity-90 text-white">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 mt-4 items-center">
                <a
                  className="bg-gradient-to-r from-secondary to-primary text-on-primary px-10 py-4 rounded-full font-label-sm shadow-[0_10px_30px_rgba(24,213,184,0.4)] glow-hover transition-all flex items-center gap-3 hover:-translate-y-1 active:scale-95 border-t border-white/20"
                  href={hero.bookAppointment.href}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    calendar_month
                  </span>
                  {hero.bookAppointment.label}
                </a>
                <a
                  className="glass-panel text-primary px-10 py-4 rounded-full font-label-sm hover:bg-white/60 transition-all flex items-center gap-3 hover:-translate-y-1 active:scale-95 shadow-lg"
                  href={hero.watchVideos.href}
                >
                  <span className="material-symbols-outlined">play_circle</span>
                  {hero.watchVideos.label}
                </a>
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-primary/30 shadow-[0_0_15px_rgba(24,213,184,0.4)] flex-shrink-0 flex items-center justify-center ml-2">
                  <img
                    alt={hero.medallionImage.alt}
                    className="w-full h-full object-cover animate-[spin_30s_linear_infinite]"
                    src={hero.medallionImage.url}
                  />
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-2/5 h-full flex justify-center items-center p-8"></div>
            <HeroContactBar content={heroContactBarContent} />
          </div>
        </section>

        {/* 2. Statistics */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mb-section-gap -mt-32 relative z-20 perspective-container min-h-[400px] py-8 lg:py-0">
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
            {stats.items.map((stat, i) => {
              const shapes = [
                "glass-capsule float-anim rounded-t-full rounded-b-3xl p-6 w-40 md:w-48 h-56 md:h-64 flex flex-col items-center justify-center text-center gap-3",
                "glass-capsule float-anim rounded-b-full rounded-t-3xl p-6 w-40 md:w-48 h-56 md:h-64 flex flex-col items-center justify-center text-center gap-3",
                "glass-capsule float-anim rounded-full p-6 w-44 md:w-52 h-64 md:h-72 flex flex-col items-center justify-center text-center gap-3 border-primary/50",
                "glass-capsule float-anim rounded-t-full rounded-b-3xl p-6 w-40 md:w-48 h-56 md:h-64 flex flex-col items-center justify-center text-center gap-3",
                "glass-capsule float-anim rounded-b-full rounded-t-3xl p-6 w-40 md:w-48 h-56 md:h-64 flex flex-col items-center justify-center text-center gap-3",
              ];
              const transforms = [
                { transform: "rotate3d(0, 1, 0, 10deg)", animationDelay: "0s" },
                { transform: "translateY(20px) rotate3d(1, 0, 0, -10deg)", animationDelay: "1.2s" },
                { transform: "translateZ(30px)", animationDelay: "0.6s" },
                { transform: "translateY(-15px) rotate3d(0, 1, 0, -10deg)", animationDelay: "1.8s" },
                { transform: "rotate3d(1, 1, 0, 10deg)", animationDelay: "2.4s" },
              ];
              const iconSize = i === 2 ? "w-20 h-20" : "w-16 h-16";
              const iconTextSize = i === 2 ? "text-5xl" : "text-4xl";
              const valueTextSize = i === 2 ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl";
              return (
                <div key={stat.id} className={shapes[i % shapes.length]} style={transforms[i % transforms.length]}>
                  <div
                    className={`${iconSize} rounded-full bg-primary-container/20 flex items-center justify-center drop-shadow-[0_0_10px_rgba(24,213,184,0.5)]`}
                  >
                    <span
                      className={`material-symbols-outlined ${iconTextSize} text-primary`}
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {stat.icon}
                    </span>
                  </div>
                  <h3
                    className={`font-section-title text-primary-container ${valueTextSize} drop-shadow-[0_0_8px_rgba(24,213,184,0.6)]`}
                  >
                    {stat.value}
                  </h3>
                  <p className={`font-label-sm text-on-surface-variant z-10 ${i === 2 ? "font-bold" : ""}`}>
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Video/Intro */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mb-section-gap">
          <div className="text-center mb-12 flex flex-col gap-2">
            <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
              {meetDoctor.eyebrow}
            </span>
            <h2 className="font-section-title text-primary md:text-5xl">{meetDoctor.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-30"></div>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 items-center perspective-container">
            <div className="w-full lg:w-1/2 relative overflow-hidden lg:overflow-visible">
              <div className="absolute -inset-10 border border-primary/10 rounded-[40px] animate-[spin_20s_linear_infinite] opacity-30 pointer-events-none"></div>
              <div className="absolute -inset-6 border-2 border-primary/5 rounded-[50px] animate-[spin_30s_linear_infinite_reverse] opacity-20 pointer-events-none"></div>
              <div className="glass-panel p-3 rounded-[32px] aspect-video relative overflow-hidden group cursor-pointer shadow-[0_20px_50px_rgba(0,107,91,0.2)] border-white/40">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
                <img
                  alt={meetDoctor.image.alt}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  src={meetDoctor.image.url}
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
                <h3 className="font-section-title text-primary text-4xl">{meetDoctor.name}</h3>
                <p className="font-label-sm text-secondary font-bold tracking-wider uppercase">{meetDoctor.role}</p>
              </div>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">{meetDoctor.bio}</p>
              <a
                className="glass-capsule px-10 py-4 rounded-full text-primary font-bold flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(24,213,184,0.3)] transition-all mt-4"
                href={meetDoctor.cta.href}
              >
                {meetDoctor.cta.label}
                <span className="material-symbols-outlined icon-rtl-flip">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4. Key Procedures */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mb-section-gap">
          <div className="text-center mb-16 flex flex-col gap-2">
            <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
              {majorSurgeries.eyebrow}
            </span>
            <h2 className="font-section-title text-primary md:text-5xl drop-shadow-[0_2px_4px_rgba(0,107,91,0.3)] relative inline-block mx-auto">
              {majorSurgeries.title}
              <div className="absolute -inset-2 bg-primary/5 blur-xl rounded-full -z-10"></div>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
            {majorSurgeries.items.map((item) => (
              <div
                key={item.id}
                className="glass-capsule group relative h-[500px] rounded-[40px] overflow-hidden flex flex-col items-center justify-end p-8 text-center transition-all duration-500 border-white/40 shadow-[0_20px_50px_rgba(0,107,91,0.2)]"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background z-10"></div>
                  <img
                    alt={item.image.alt}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:translate-z-10 transition-all duration-700"
                    src={item.image.url}
                  />
                  <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px] pointer-events-none"></div>
                </div>
                <div className="relative z-20 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-card-title text-primary text-2xl mb-2 drop-shadow-[0_0_8px_rgba(24,213,184,0.6)]">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant leading-tight">{item.desc}</p>
                </div>
                <div className="absolute inset-0 border-2 border-primary/20 rounded-[40px] pointer-events-none group-hover:border-primary/60 group-hover:shadow-[inset_0_0_30px_rgba(24,213,184,0.3)] transition-all"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <a
              className="glass-capsule px-12 py-5 rounded-full text-primary font-bold flex items-center gap-4 hover:shadow-[0_15px_45px_rgba(24,213,184,0.4)] transition-all group"
              href={majorSurgeries.cta.href}
            >
              {majorSurgeries.cta.label}
              <span className="material-symbols-outlined icon-rtl-flip group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
        </section>

        {/* 5. Major Treatments */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mb-section-gap">
          <div className="text-center mb-16 flex flex-col gap-2">
            <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
              {majorTreatments.eyebrow}
            </span>
            <h2 className="font-section-title text-primary md:text-5xl drop-shadow-[0_2px_4px_rgba(0,107,91,0.3)] relative inline-block mx-auto">
              {majorTreatments.title}
              <div className="absolute -inset-2 bg-primary/5 blur-xl rounded-full -z-10"></div>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
            {majorTreatments.items.map((item) => (
              <div
                key={item.id}
                className="glass-capsule group relative h-[500px] rounded-[40px] overflow-hidden flex flex-col items-center justify-end p-8 text-center transition-all duration-500 border-white/40 shadow-[0_20px_50px_rgba(0,107,91,0.2)]"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background z-10"></div>
                  <img
                    alt={item.image.alt}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:translate-z-10 transition-all duration-700"
                    src={item.image.url}
                  />
                  <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px] pointer-events-none"></div>
                </div>
                <div className="relative z-20 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-card-title text-primary text-2xl mb-2 drop-shadow-[0_0_8px_rgba(24,213,184,0.6)]">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant leading-tight">{item.desc}</p>
                </div>
                <div className="absolute inset-0 border-2 border-primary/20 rounded-[40px] pointer-events-none group-hover:border-primary/60 group-hover:shadow-[inset_0_0_30px_rgba(24,213,184,0.3)] transition-all"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <a
              className="glass-capsule px-12 py-5 rounded-full text-primary font-bold flex items-center gap-4 hover:shadow-[0_15px_45px_rgba(24,213,184,0.4)] transition-all group"
              href={majorTreatments.cta.href}
            >
              {majorTreatments.cta.label}
              <span className="material-symbols-outlined icon-rtl-flip group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
        </section>

        {/* 6. Patient Stories */}
        <section className="max-w-container-max mx-auto px-4 md:px-8 mb-section-gap relative z-10">
          <div className="text-center mb-16 flex flex-col gap-2">
            <span className="font-label-sm text-primary tracking-[0.2em] uppercase opacity-80">
              {patientStories.eyebrow}
            </span>
            <h2 className="font-section-title text-primary md:text-5xl drop-shadow-[0_0_15px_rgba(24,213,184,0.6)] relative inline-block mx-auto">
              {patientStories.title}
              <div className="absolute -inset-4 bg-primary-container/10 blur-2xl rounded-full -z-10 animate-pulse"></div>
            </h2>
            <p className="font-body-lg text-on-surface-variant mt-2">{patientStories.subtitle}</p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 perspective-container">
            {patientStories.items.map((story) => (
              <div
                key={story.id}
                className={`glass-capsule group relative h-[450px] ${STORY_SHAPES[story.id] ?? "rounded-[40px]"} flex flex-col items-center justify-center p-8 text-center transition-all duration-500 border-white/40 shadow-[0_20px_50px_rgba(0,107,91,0.2)]`}
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
                  <p className="font-body-md text-on-surface-variant italic mb-6 px-4">&quot;{story.quote}&quot;</p>
                  <h4 className="font-card-title text-primary text-xl">{story.name}</h4>
                  <span className="font-label-sm text-secondary uppercase tracking-widest mt-2 block">
                    {story.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <a
              className="glass-capsule px-12 py-5 rounded-full text-primary font-bold flex items-center gap-4 hover:shadow-[0_15px_45px_rgba(24,213,184,0.4)] transition-all group"
              href={patientStories.cta.href}
            >
              {patientStories.cta.label}
              <span className="material-symbols-outlined icon-rtl-flip group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </a>
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
                {whyUs.eyebrow}
              </span>
              <h2 className="font-section-title text-primary md:text-6xl drop-shadow-[0_10px_20px_rgba(0,107,91,0.2)] relative inline-block mx-auto">
                {whyUs.title}
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
                    alt={whyUs.portraitImage.alt}
                    className="absolute inset-0 w-full h-full object-cover object-top rounded-[32px] opacity-90"
                    src={whyUs.portraitImage.url}
                  />
                  <div className="relative z-20 text-center pb-6">
                    <h3 className="font-section-title text-primary text-3xl drop-shadow-[0_0_10px_rgba(24,213,184,0.4)]">
                      {whyUs.portraitName}
                    </h3>
                    <p className="font-label-sm text-secondary tracking-[0.2em] uppercase mt-2">
                      {whyUs.portraitRole}
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
                  {whyUs.items.map((reason) => (
                    <div
                      key={reason.id}
                      className="glass-panel p-6 rounded-2xl flex items-center gap-6 border-s-4 border-s-primary hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {reason.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-card-title text-xl text-primary mb-1">{reason.title}</h4>
                        <p className="font-body-md text-on-surface-variant opacity-80 leading-snug">{reason.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <a
                    className="glass-capsule px-10 py-4 rounded-full text-primary font-bold flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(24,213,184,0.3)] transition-all"
                    href={whyUs.cta.href}
                  >
                    {whyUs.cta.label}
                    <span className="material-symbols-outlined icon-rtl-flip">arrow_forward</span>
                  </a>
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
                {videos.eyebrow}
              </span>
              <h2 className="font-section-title text-primary md:text-6xl drop-shadow-[0_10px_20px_rgba(0,107,91,0.2)] relative inline-block mx-auto">
                {videos.title}
                <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full -z-10"></div>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {videos.items.map((video) => (
                <div
                  key={video.id}
                  className="group relative aspect-[9/16] rounded-[50px] glass-panel p-2 overflow-hidden shadow-[0_20px_50px_rgba(0,107,91,0.2)] border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(24,213,184,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-white/10 pointer-events-none z-20 transition-opacity duration-500 group-hover:opacity-100 opacity-60"></div>
                  <div className="w-full h-full rounded-[40px] overflow-hidden relative">
                    <img
                      alt={video.image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={video.image.url}
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
                        {video.tag}
                      </span>
                      <h4 className="font-card-title text-xl">{video.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-16">
              <a
                className="glass-capsule px-12 py-5 rounded-full text-primary font-bold flex items-center gap-4 hover:shadow-[0_15px_45px_rgba(24,213,184,0.4)] transition-all group"
                href={videos.cta.href}
              >
                {videos.cta.label}
                <span className="material-symbols-outlined icon-rtl-flip group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </a>
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
                {insights.eyebrow}
              </span>
              <h2 className="font-section-title text-primary md:text-6xl drop-shadow-[0_10px_20px_rgba(0,107,91,0.2)] relative inline-block mx-auto">
                {insights.title}
                <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full -z-10"></div>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 opacity-40"></div>
            </div>
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="w-full lg:w-1/2 flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-6">
                  {insights.articles.map((article) => (
                    <div
                      key={article.id}
                      className="glass-panel group relative aspect-square rounded-[32px] overflow-hidden p-2 border-white/40 shadow-lg hover:shadow-[0_20px_40px_rgba(24,213,184,0.3)] transition-all duration-500"
                    >
                      <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                        <img
                          alt={article.image.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          src={article.image.url}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 start-4 end-4">
                          <h4 className="font-card-title text-white text-lg leading-tight group-hover:-translate-y-1 transition-transform">
                            {article.title}
                          </h4>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/5 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
                <a
                  className="glass-capsule px-10 py-4 rounded-full text-primary font-bold flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(24,213,184,0.3)] transition-all self-center group"
                  href={insights.articlesCta.href}
                >
                  {insights.articlesCta.label}
                  <span className="material-symbols-outlined icon-rtl-flip group-hover:translate-x-2 transition-transform">
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {insights.faq.map((faq) => (
                  <div
                    key={faq.id}
                    className="glass-panel p-6 rounded-[32px] border-white/40 shadow-md hover:shadow-[0_10px_25px_rgba(24,213,184,0.2)] transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-card-title text-primary text-xl">{faq.q}</h4>
                      <span className="material-symbols-outlined text-primary group-hover:rotate-180 transition-transform">
                        expand_more
                      </span>
                    </div>
                    <div className="mt-4 text-on-surface-variant font-body-md hidden group-hover:block">{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10. Immersive CTA */}
        <CtaBanner
          eyebrow={cta.eyebrow}
          primaryHref={cta.bookAppointment.href}
          primaryLabel={cta.bookAppointment.label}
          subtitle={cta.subtitle}
          title={cta.title}
          whatsappHref={cta.whatsappUs.href}
          whatsappLabel={cta.whatsappUs.label}
          phone={heroContactBarContent.phone}
        />
      </main>
    </div>
  );
}

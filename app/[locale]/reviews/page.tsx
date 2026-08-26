import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/alternates";
import ScrollRevealInit from "@/components/ScrollRevealInit";
import HeroContactBar from "@/components/HeroContactBar";
import CtaBanner from "@/components/CtaBanner";

const REVIEW_IDS = [
  "ahmedHassan",
  "sarahM",
  "tarekE",
  "omarR",
  "lailaK",
  "hassanB",
  "monicaG",
  "jamesW",
  "fatmaA",
  "robertS",
  "chenL",
  "davidM",
] as const;

const REVIEW_STARS: Record<(typeof REVIEW_IDS)[number], number> = {
  ahmedHassan: 5,
  sarahM: 5,
  tarekE: 4.5,
  omarR: 5,
  lailaK: 5,
  hassanB: 5,
  monicaG: 5,
  jamesW: 5,
  fatmaA: 5,
  robertS: 5,
  chenL: 5,
  davidM: 5,
};

function Stars({ count }: { count: number }) {
  const full = Math.floor(count);
  const half = count % 1 !== 0;
  return (
    <div className="flex text-tertiary-container">
      {Array.from({ length: full }).map((_, i) => (
        <span
          key={`full-${i}`}
          className="material-symbols-outlined text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
      {half && (
        <span
          className="material-symbols-outlined text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star_half
        </span>
      )}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("reviews.title"),
    description: t("reviews.description"),
    alternates: { languages: localeAlternates("/reviews") },
  };
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("reviews");

  return (
    <div className="route-reviews">
      <ScrollRevealInit />
      <main>
        {/* 1. Hero */}
        <section className="relative pt-40 pb-20 min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center w-full h-full opacity-60"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABr8RCHWKBGb15XK8fhMDDQKv5UcHug3V8XtPhlXI0s4rhORdhQz247lRzV5bsTJbg10jjHrvgRUzqWWkYdjMHK2J1A-FByH8v6TuIiVdky7tKi_bNAg5wGSy9l-_buPuiDu4MCmcARmIoiB_l1kNc2emu1P3mfv2oq-_MgRm2ikxRe2FpsH_OE93flQx8TeCOoYa1UeDVG-ccO0EWlYfRGYlLDpWtzBDzwYKUmMwRKbNpVivqzDTK')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-surface-container/80 via-background/60 to-background backdrop-blur-[10px]"></div>
          </div>
          <div className="relative z-10 w-full max-w-[1450px] mx-auto px-glass-padding text-center">
            <span className="inline-block font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-4 px-4 py-1 rounded-full bg-surface-container border border-white/50 backdrop-blur-md">
              {t("hero.badge")}
            </span>
            <h1 className="font-hero-headline-mobile md:font-hero-headline text-hero-headline-mobile md:text-hero-headline text-on-surface mb-6 max-w-4xl mx-auto drop-shadow-sm">
              {t("hero.title")}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-primary font-label-sm text-label-sm px-8 py-4 rounded-full w-full sm:w-auto flex items-center justify-center gap-2">
                {t("hero.bookAppointment")}
                <span
                  className="material-symbols-outlined icon-rtl-flip"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  arrow_forward
                </span>
              </button>
              <button className="btn-secondary font-label-sm text-label-sm px-8 py-4 rounded-full w-full sm:w-auto">
                {t("hero.contactUs")}
              </button>
            </div>
          </div>
          <HeroContactBar />
        </section>

        {/* 2. Reviews Gallery */}
        <section className="py-section-gap px-4 sm:px-8 max-w-[1450px] mx-auto relative z-10">
          <div className="text-center mb-16 reveal-on-scroll is-visible">
            <span className="font-label-sm text-label-sm text-primary mb-2 block uppercase tracking-widest">
              {t("gallery.eyebrow")}
            </span>
            <h2 className="font-section-title text-section-title text-on-surface">
              {t("gallery.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
            {REVIEW_IDS.map((id, i) => (
              <div
                key={id}
                className="glass-capsule p-8 flex flex-col h-full reveal-on-scroll"
                style={{ transitionDelay: `${(i % 4) * 100}ms` }}
              >
                <div className="waveform-bg"></div>
                <div className="hologram-quote">&quot;</div>
                <div className="relative z-10 flex-grow">
                  <div className="inline-block px-3 py-1 bg-surface-container-high rounded-full border border-white/40 font-label-sm text-[10px] text-secondary mb-4">
                    {t(`gallery.items.${id}.tag`)}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant italic mb-6">
                    &quot;{t(`gallery.items.${id}.quote`)}&quot;
                  </p>
                </div>
                <div className="relative z-10 mt-auto pt-4 border-t border-white/30 flex items-center justify-between">
                  <div>
                    <p className="font-card-title text-card-title text-on-surface text-sm">
                      {t(`gallery.items.${id}.name`)}
                    </p>
                    <p className="font-label-sm text-label-sm text-primary flex items-center gap-1 text-[10px]">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>{" "}
                      {t("gallery.verifiedPatient")}
                    </p>
                  </div>
                  <Stars count={REVIEW_STARS[id]} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center reveal-on-scroll is-visible">
            <button className="btn-secondary font-label-sm text-label-sm px-6 py-2 rounded-full">
              {t("gallery.loadMore")}
            </button>
          </div>
        </section>

        {/* 3. Final CTA */}
        <CtaBanner
          eyebrow={t("cta.eyebrow")}
          primaryLabel={t("cta.bookAppointment")}
          subtitle={t("cta.subtitle")}
          title={t("cta.title")}
          whatsappLabel={t("cta.whatsappUs")}
        />
      </main>
    </div>
  );
}

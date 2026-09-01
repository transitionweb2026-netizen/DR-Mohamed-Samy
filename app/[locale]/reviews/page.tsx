import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/alternates";
import ScrollRevealInit from "@/components/ScrollRevealInit";
import HeroContactBar, { type HeroContactBarContent } from "@/components/HeroContactBar";
import CtaBanner from "@/components/CtaBanner";
import Stars from "@/components/Stars";
import { getGlobalContent, getPageContent, getPageSeo } from "@/lib/cms/queries";
import type { Locale } from "@/lib/cms/types";

type ButtonContent = { label: string; href: string };
type ImageContent = { url: string; mediaId: string | null; alt: string };
type ReviewItem = { id: string; tag: string; quote: string; name: string; rating: number };

type ReviewsContent = {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    backgroundImage: ImageContent;
    bookAppointment: ButtonContent;
    contactUs: ButtonContent;
  };
  gallery: {
    eyebrow: string;
    title: string;
    verifiedPatient: string;
    loadMore: ButtonContent;
    items: ReviewItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bookAppointment: ButtonContent;
    whatsappUs: ButtonContent;
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const seo = await getPageSeo("reviews", locale);
  return {
    title: seo?.seo_title,
    description: seo?.meta_description ?? undefined,
    alternates: { languages: localeAlternates("/reviews"), canonical: seo?.canonical_url ?? undefined },
    robots:
      seo && (!seo.robots_index || !seo.robots_follow)
        ? { index: seo.robots_index, follow: seo.robots_follow }
        : undefined,
  };
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const [content, global] = await Promise.all([
    getPageContent("reviews", locale) as unknown as Promise<ReviewsContent>,
    getGlobalContent(locale),
  ]);
  const heroContactBarContent = global.contact as unknown as HeroContactBarContent;
  const { hero, gallery, cta } = content;

  return (
    <div className="route-reviews">
      <ScrollRevealInit />
      <main>
        {/* 1. Hero */}
        <section className="relative pt-40 pb-20 min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center w-full h-full opacity-60"
              style={{ backgroundImage: `url('${hero.backgroundImage.url}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-surface-container/80 via-background/60 to-background backdrop-blur-[10px]"></div>
          </div>
          <div className="relative z-10 w-full max-w-[1450px] mx-auto px-glass-padding text-center">
            <span className="inline-block font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-4 px-4 py-1 rounded-full bg-surface-container border border-white/50 backdrop-blur-md">
              {hero.badge}
            </span>
            <h1 className="font-hero-headline-mobile md:font-hero-headline text-hero-headline-mobile md:text-hero-headline text-on-surface mb-6 max-w-4xl mx-auto drop-shadow-sm">
              {hero.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                className="btn-primary font-label-sm text-label-sm px-8 py-4 rounded-full w-full sm:w-auto flex items-center justify-center gap-2"
                href={hero.bookAppointment.href}
              >
                {hero.bookAppointment.label}
                <span
                  className="material-symbols-outlined icon-rtl-flip"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  arrow_forward
                </span>
              </a>
              <a
                className="btn-secondary font-label-sm text-label-sm px-8 py-4 rounded-full w-full sm:w-auto text-center"
                href={hero.contactUs.href}
              >
                {hero.contactUs.label}
              </a>
            </div>
          </div>
          <HeroContactBar content={heroContactBarContent} />
        </section>

        {/* 2. Reviews Gallery */}
        <section className="py-section-gap px-4 sm:px-8 max-w-[1450px] mx-auto relative z-10">
          <div className="text-center mb-16 reveal-on-scroll is-visible">
            <span className="font-label-sm text-label-sm text-primary mb-2 block uppercase tracking-widest">
              {gallery.eyebrow}
            </span>
            <h2 className="font-section-title text-section-title text-on-surface">
              {gallery.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
            {gallery.items.map((item, i) => (
              <div
                key={item.id}
                className="glass-capsule p-8 flex flex-col h-full reveal-on-scroll"
                style={{ transitionDelay: `${(i % 4) * 100}ms` }}
              >
                <div className="waveform-bg"></div>
                <div className="hologram-quote">&quot;</div>
                <div className="relative z-10 flex-grow">
                  <div className="inline-block px-3 py-1 bg-surface-container-high rounded-full border border-white/40 font-label-sm text-[10px] text-secondary mb-4">
                    {item.tag}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant italic mb-6">
                    &quot;{item.quote}&quot;
                  </p>
                </div>
                <div className="relative z-10 mt-auto pt-4 border-t border-white/30 flex items-center justify-between">
                  <div>
                    <p className="font-card-title text-card-title text-on-surface text-sm">
                      {item.name}
                    </p>
                    <p className="font-label-sm text-label-sm text-primary flex items-center gap-1 text-[10px]">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>{" "}
                      {gallery.verifiedPatient}
                    </p>
                  </div>
                  <Stars count={item.rating} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center reveal-on-scroll is-visible">
            <a className="btn-secondary font-label-sm text-label-sm px-6 py-2 rounded-full inline-block" href={gallery.loadMore.href}>
              {gallery.loadMore.label}
            </a>
          </div>
        </section>

        {/* 3. Final CTA */}
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

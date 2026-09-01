"use client";

import { useEffect, useState } from "react";
import HeroContactBar, { type HeroContactBarContent } from "@/components/HeroContactBar";
import CtaBanner from "@/components/CtaBanner";
import ShaderBackground from "./ShaderBackground";

type ButtonContent = { label: string; href: string };
type ImageContent = { url: string; mediaId: string | null; alt: string };
type ArticleItem = { id: string; image: ImageContent; tag: string; title: string; body: string };

export type ArticlesContent = {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: ImageContent;
    exploreArticles: ButtonContent;
    bookAppointment: ButtonContent;
  };
  intro: { title: string };
  featured: {
    bgWord: string;
    badge: string;
    tag: string;
    title: string;
    desc: string;
    body: string;
    ctaLabel: string;
    image: ImageContent;
  };
  grid: { readArticle: string; items: ArticleItem[] };
  cta: { label: string; title: string; cta: ButtonContent; whatsappUs: ButtonContent };
};

type OpenArticle = { tag: string; title: string; body: string; image: ImageContent };

function ArticleModal({ article, onClose }: { article: OpenArticle | null; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = article ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300 ${
        article ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-surface/90 to-surface/95 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className={`popup-content relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_30px_60px_rgba(0,107,91,0.15),inset_0_0_40px_rgba(24,213,184,0.2)] transition-all duration-300 ${
          article ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          className="sticky top-4 float-end me-4 z-50 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center hover:bg-white/90 text-primary transition-colors border border-white/60 shadow-lg"
          onClick={onClose}
          type="button"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        {article && (
          <div className="p-8 md:p-12 pt-16">
            <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
              <img alt={article.image.alt} className="w-full h-full object-cover" src={article.image.url} />
            </div>
            <span className="inline-block bg-primary-container/30 text-primary px-4 py-1 rounded-full font-label-sm uppercase tracking-wider border border-primary/20 mb-4">
              {article.tag}
            </span>
            <h3 className="font-hero-headline text-3xl md:text-5xl text-primary text-glow leading-tight uppercase mb-6">
              {article.title}
            </h3>
            <div className="font-body-lg text-on-surface-variant whitespace-pre-line leading-relaxed space-y-4">
              {article.body}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ArticlesClient({
  content,
  heroContactBarContent,
}: {
  content: ArticlesContent;
  heroContactBarContent: HeroContactBarContent;
}) {
  const { hero, intro, featured, grid, cta } = content;
  const [openArticle, setOpenArticle] = useState<OpenArticle | null>(null);

  return (
    <div className="route-articles bg-background text-on-surface font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      <main>
        {/* Articles Hero */}
        <section className="relative min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt={hero.backgroundImage.alt}
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
              src={hero.backgroundImage.url}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
          </div>
          <div className="max-w-[1450px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 lg:col-start-3 text-center space-y-6">
              <h1 className="font-hero-headline-mobile md:font-hero-headline text-primary text-glow uppercase leading-tight">
                {hero.title}
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  className="bg-gradient-to-r from-secondary to-primary text-on-primary px-8 py-4 rounded-full font-body-lg hover:opacity-90 transition-opacity btn-primary-glow w-full sm:w-auto text-center"
                  href={hero.exploreArticles.href}
                >
                  {hero.exploreArticles.label}
                </a>
                <a
                  className="glass-panel text-secondary px-8 py-4 rounded-full font-body-lg hover:bg-white/50 transition-colors w-full sm:w-auto text-center"
                  href={hero.bookAppointment.href}
                >
                  {hero.bookAppointment.label}
                </a>
              </div>
            </div>
          </div>
          <HeroContactBar content={heroContactBarContent} />
        </section>

        {/* Articles Intro */}
        <section className="py-12" id="articles">
          <div className="max-w-[1450px] mx-auto px-6 text-center">
            <h2 className="font-section-title text-primary uppercase text-glow tracking-widest">
              {intro.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto mt-4 rounded-full"></div>
          </div>
        </section>

        {/* Featured Hero Article */}
        <section className="py-8">
          <div className="max-w-[1450px] mx-auto px-6 relative lg:min-h-[80vh] flex items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-surface-container/20 backdrop-blur-[40px] rounded-[40%] rotate-12 z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-hero-headline text-[120px] md:text-[240px] text-primary/5 select-none pointer-events-none z-0 uppercase tracking-widest">
              {featured.bgWord}
            </div>
            <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
              <div className="lg:col-span-7 relative group">
                <button
                  className="relative overflow-visible transition-transform duration-700 ease-out group-hover:scale-105 text-start w-full"
                  onClick={() =>
                    setOpenArticle({ tag: featured.tag, title: featured.title, body: featured.body, image: featured.image })
                  }
                  type="button"
                >
                  <div className="rounded-[3rem] overflow-hidden border border-white/40 shadow-2xl">
                    <img
                      alt={featured.image.alt}
                      className="w-full h-full object-cover aspect-square lg:aspect-video"
                      src={featured.image.url}
                    />
                  </div>
                  <div className="absolute -top-8 start-4 glass-panel px-6 py-2 rounded-full font-label-sm tracking-[0.2em] text-primary/40 z-20">
                    {featured.badge}
                  </div>
                </button>
              </div>
              <div className="lg:col-span-5 lg:-ms-24 relative z-20">
                <div className="space-y-6 transition-transform duration-500 hover:translate-x-2">
                  <span className="inline-block bg-primary-container/30 text-primary px-4 py-1 rounded-full font-label-sm uppercase tracking-wider border border-primary/20">
                    {featured.tag}
                  </span>
                  <h3 className="font-hero-headline text-5xl md:text-7xl text-primary text-glow leading-[0.9] uppercase">
                    {featured.title}
                  </h3>
                  <p className="font-body-lg text-on-surface-variant text-xl max-w-md">
                    {featured.desc}
                  </p>
                  <button
                    className="inline-flex items-center gap-4 bg-gradient-to-r from-secondary to-primary text-on-primary px-10 py-5 rounded-full font-body-lg hover:opacity-90 transition-all btn-primary-glow group/btn"
                    onClick={() =>
                      setOpenArticle({ tag: featured.tag, title: featured.title, body: featured.body, image: featured.image })
                    }
                    type="button"
                  >
                    {featured.ctaLabel}
                    <span className="material-symbols-outlined icon-rtl-flip transition-transform group-hover/btn:translate-x-2">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-16 mb-24">
          <div className="max-w-[1450px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {grid.items.map((item) => (
                <button
                  className="group block h-full text-start w-full"
                  key={item.id}
                  onClick={() => setOpenArticle({ tag: item.tag, title: item.title, body: item.body, image: item.image })}
                  type="button"
                >
                  <div className="glass-panel rounded-xl overflow-hidden hover-lift h-full flex flex-col border-s-4 border-s-primary/50 hover:border-s-primary transition-all">
                    <div className="relative h-48 overflow-hidden p-2">
                      <div className="w-full h-full rounded-lg overflow-hidden relative">
                        <img
                          alt={item.image.alt}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          src={item.image.url}
                        />
                        <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors"></div>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <span className="font-label-sm text-secondary uppercase tracking-widest mb-2">
                        {item.tag}
                      </span>
                      <h4 className="font-card-title text-on-surface text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="mt-auto flex items-center text-sm text-outline group-hover:text-secondary transition-colors pt-4 border-t border-white/20">
                        {grid.readArticle}{" "}
                        <span className="material-symbols-outlined icon-rtl-flip text-[16px] ms-1">
                          chevron_right
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CtaBanner
          backdrop={<ShaderBackground />}
          eyebrow={cta.label}
          primaryHref={cta.cta.href}
          primaryLabel={cta.cta.label}
          title={cta.title}
          whatsappHref={cta.whatsappUs.href}
          whatsappLabel={cta.whatsappUs.label}
          phone={heroContactBarContent.phone}
        />
      </main>

      <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
    </div>
  );
}

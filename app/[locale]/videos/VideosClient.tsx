"use client";

import { useState } from "react";
import HeroContactBar, { type HeroContactBarContent } from "@/components/HeroContactBar";
import CtaBanner from "@/components/CtaBanner";

type ButtonContent = { label: string; href: string };
type ImageContent = { url: string; mediaId: string | null; alt: string };
type VideoItem = { id: string; image: ImageContent; title: string; desc: string };

export type VideosContent = {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    watchLatest: ButtonContent;
    bookAppointment: ButtonContent;
  };
  grid: { eyebrow: string; title: string; items: VideoItem[] };
  cta: { badge: string; title: string; bookAppointment: ButtonContent; whatsappUs: ButtonContent };
  modal: { loading: string };
};

export default function VideosClient({
  content,
  heroContactBarContent,
}: {
  content: VideosContent;
  heroContactBarContent: HeroContactBarContent;
}) {
  const { hero, grid, cta, modal } = content;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="route-videos font-body-md text-on-surface antialiased flex flex-col min-h-screen">
      {/* Videos Hero */}
      <header className="relative pt-[120px] pb-16 px-4 md:px-8 max-w-container-max mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 mt-4">
        <div className="absolute inset-0 z-[-1] overflow-hidden rounded-3xl opacity-20">
          <div className="absolute w-[800px] h-[800px] bg-primary-container/30 rounded-full blur-[100px] -top-[200px] -end-[200px]"></div>
          <div className="absolute w-[600px] h-[600px] bg-tertiary-container/20 rounded-full blur-[80px] bottom-0 start-0"></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start z-10">
          <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-4 glass-card px-4 py-2 rounded-full inline-block">
            {hero.badge}
          </span>
          <h1 className="font-hero-headline-mobile md:font-hero-headline text-hero-headline-mobile md:text-hero-headline text-primary mb-6 glow-text">
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md">{hero.subtitle}</p>
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              className="bg-gradient-to-r from-secondary to-primary text-on-primary px-8 py-3 rounded-full font-label-sm text-label-sm shadow-[0_0_20px_rgba(24,213,184,0.3)] border-t border-white/50 hover:scale-105 transition-transform flex items-center gap-2"
              href={hero.watchLatest.href}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_circle
              </span>
              {hero.watchLatest.label}
            </a>
            <a
              className="glass-card text-secondary px-8 py-3 rounded-full font-label-sm text-label-sm hover:bg-white/50 transition-colors"
              href={hero.bookAppointment.href}
            >
              {hero.bookAppointment.label}
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center z-10 relative">
          <div className="w-full max-w-md aspect-square rounded-full glass-card flex items-center justify-center relative overflow-hidden border-2 border-white/60 p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-surface-dim opacity-50"></div>
            <span
              className="material-symbols-outlined text-[120px] text-primary/30 absolute z-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              medical_information
            </span>
            <div className="w-3/4 h-3/4 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-inner flex items-center justify-center z-10 relative animate-pulse">
              <span
                className="material-symbols-outlined text-[80px] text-primary-container drop-shadow-[0_0_15px_rgba(24,213,184,0.8)]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
          </div>
        </div>
        <HeroContactBar content={heroContactBarContent} />
      </header>

      {/* Main Videos Section */}
      <section
        className="py-16 px-4 md:px-8 max-w-container-max mx-auto w-full flex-grow z-10 relative"
        id="videos-grid"
      >
        <div className="text-center mb-16">
          <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-2 block">
            {grid.eyebrow}
          </span>
          <h2 className="font-section-title text-section-title text-primary">{grid.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {grid.items.map((item) => (
            <div
              key={item.id}
              className="video-pod glass-card rounded-2xl overflow-hidden aspect-[9/16] relative cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/5 transition-colors"></div>
              <img
                alt={item.image.alt}
                className="thumbnail absolute inset-0 w-full h-full object-cover z-0"
                src={item.image.url}
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-surface/90 via-surface/40 to-transparent">
                <span
                  className="material-symbols-outlined play-btn text-white text-5xl mb-4 drop-shadow-md"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_circle
                </span>
                <h3 className="font-card-title text-card-title text-primary mb-2">{item.title}</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant line-clamp-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <CtaBanner
        eyebrow={cta.badge}
        primaryHref={cta.bookAppointment.href}
        primaryLabel={cta.bookAppointment.label}
        title={cta.title}
        whatsappHref={cta.whatsappUs.href}
        whatsappLabel={cta.whatsappUs.label}
        phone={heroContactBarContent.phone}
      />

      {/* Video Modal */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-background/80 backdrop-blur-sm transition-opacity duration-300 ${isModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`glass-card w-full max-w-4xl rounded-3xl p-2 relative shadow-2xl transition-all duration-300 ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          <button
            className="absolute -top-4 -end-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-lg hover:scale-110 transition-transform z-10"
            onClick={() => setIsModalOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="w-full aspect-video bg-black rounded-2xl flex items-center justify-center overflow-hidden">
            <span className="text-white/50 font-body-md">{modal.loading}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

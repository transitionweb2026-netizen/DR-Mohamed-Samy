"use client";

import { useState } from "react";
import HeroContactBar, { type HeroContactBarContent } from "@/components/HeroContactBar";
import CtaBanner from "@/components/CtaBanner";
import VideoModal, { type OpenVideo } from "@/components/VideoModal";

type ButtonContent = { label: string; href: string };
type ImageContent = { url: string; mediaId: string | null; alt: string };
type VideoContent = { url: string; mediaId: string | null };
type VideoItem = { id: string; image: ImageContent; video: VideoContent; title: string; desc: string };

export type VideosContent = {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    image: ImageContent;
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
  const [openVideo, setOpenVideo] = useState<OpenVideo | null>(null);

  return (
    <div className="route-videos font-body-md text-on-surface antialiased flex flex-col min-h-screen">
      {/* Videos Hero */}
      <header className="relative min-h-screen flex items-center pt-32 pb-section-gap px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {hero.image.url ? (
            <img
              alt={hero.image.alt}
              className="w-full h-full object-cover mix-blend-overlay opacity-80"
              src={hero.image.url}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-surface-dim opacity-50"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/40"></div>
        </div>
        <div className="max-w-container-max mx-auto w-full relative z-10">
          <div className="max-w-2xl flex flex-col items-start">
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
              onClick={() => setOpenVideo({ title: item.title, videoUrl: item.video.url, loadingText: modal.loading })}
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

      <VideoModal onClose={() => setOpenVideo(null)} video={openVideo} />
    </div>
  );
}

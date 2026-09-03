"use client";

import { useEffect, useState } from "react";
import HeroContactBar, { type HeroContactBarContent } from "@/components/HeroContactBar";
import CtaBanner from "@/components/CtaBanner";

type ButtonContent = { label: string; href: string };
type ImageContent = { url: string; mediaId: string | null; alt: string };
type ProcedureItem = { id: string; image: ImageContent; title: string; desc: string };

export type ServicesContent = {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    backgroundImage: ImageContent;
    exploreProcedures: ButtonContent;
    bookAppointment: ButtonContent;
  };
  surgicalProcedures: {
    title: string;
    subtitle: string;
    exploreLabel: string;
    items: ProcedureItem[];
  };
  specializedTreatments: {
    title: string;
    subtitle: string;
    items: ProcedureItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    bookAppointment: ButtonContent;
    whatsappUs: ButtonContent;
    options: { id: string; number: string; label: string }[];
  };
};

type OpenService = { title: string; desc: string; image: ImageContent };

function ServiceModal({ service, onClose }: { service: OpenService | null; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = service ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300 ${
        service ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-surface/90 to-surface/95 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className={`popup-content relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_30px_60px_rgba(0,107,91,0.15),inset_0_0_40px_rgba(24,213,184,0.2)] transition-all duration-300 ${
          service ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          className="sticky top-4 float-end me-4 z-50 w-10 h-10 rounded-full bg-white/70 flex items-center justify-center hover:bg-white/90 text-primary transition-colors border border-white/60 shadow-lg"
          onClick={onClose}
          type="button"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        {service && (
          <div className="p-8 md:p-12 pt-16">
            <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={service.image.alt} className="w-full h-full object-cover" src={service.image.url} />
            </div>
            <h3 className="font-hero-headline text-3xl md:text-5xl text-primary text-glow leading-tight uppercase mb-6">
              {service.title}
            </h3>
            <p className="font-body-lg text-on-surface-variant whitespace-pre-line leading-relaxed">{service.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  desc,
  img,
  exploreLabel,
  onOpen,
}: {
  title: string;
  desc: string;
  img: string;
  exploreLabel: string;
  onOpen: () => void;
}) {
  return (
    <button
      className="glass-card rounded-3xl p-4 flex flex-col h-[450px] group cursor-pointer hover:-translate-y-2 transition-transform duration-500 text-start w-full"
      onClick={onOpen}
      type="button"
    >
      <div className="relative w-full flex-1 rounded-2xl overflow-hidden mb-4 bg-black/5">
        <img
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          src={img}
        />
      </div>
      <h3 className="font-card-title text-card-title text-primary mb-2">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">{desc}</p>
      <div className="mt-auto flex items-center text-primary font-label-sm text-label-sm uppercase tracking-widest border-t border-white/20 pt-4">
        <span>{exploreLabel}</span>
      </div>
    </button>
  );
}

export default function ServicesClient({
  content,
  heroContactBarContent,
}: {
  content: ServicesContent;
  heroContactBarContent: HeroContactBarContent;
}) {
  const { hero, surgicalProcedures, specializedTreatments, cta } = content;
  const [openService, setOpenService] = useState<OpenService | null>(null);

  return (
    <div className="route-services font-body-md text-on-background antialiased relative min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-[150px] pb-section-gap min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-white/30 backdrop-blur-sm z-0"></div>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-overlay opacity-30 z-[-1]"
          style={{ backgroundImage: `url("${hero.backgroundImage.url}")` }}
        ></div>
        <div className="max-w-container-max mx-auto px-6 w-full z-10 relative">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 rounded-full border border-primary-container text-primary-container font-label-sm text-label-sm uppercase tracking-[0.2em] mb-6 backdrop-blur-md bg-white/10">
              {hero.badge}
            </span>
            <h1 className="font-hero-headline text-hero-headline text-primary mb-8 text-glow leading-tight">
              {hero.titleLine1}
              <br />
              {hero.titleLine2}
              <br />
              {hero.titleLine3}
            </h1>
            <div className="flex flex-wrap gap-4 mt-10">
              <a
                className="primary-btn text-on-primary px-8 py-4 rounded-full font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform"
                href={hero.exploreProcedures.href}
              >
                {hero.exploreProcedures.label}{" "}
                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              </a>
              <a
                className="glass-card text-primary px-8 py-4 rounded-full font-label-sm text-label-sm uppercase tracking-wider hover:bg-white/50 transition-colors"
                href={hero.bookAppointment.href}
              >
                {hero.bookAppointment.label}
              </a>
            </div>
          </div>
        </div>
        <HeroContactBar content={heroContactBarContent} />
      </section>

      {/* Surgical Procedures */}
      <section className="py-section-gap relative z-10 max-w-container-max mx-auto w-full px-6" id="surgical-procedures">
        <div className="mb-12 text-center">
          <h2 className="font-section-title text-section-title text-primary">{surgicalProcedures.title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mt-4">
            {surgicalProcedures.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
          {surgicalProcedures.items.map((item) => (
            <ServiceCard
              desc={item.desc}
              exploreLabel={surgicalProcedures.exploreLabel}
              img={item.image.url}
              key={item.id}
              onOpen={() => setOpenService({ title: item.title, desc: item.desc, image: item.image })}
              title={item.title}
            />
          ))}
        </div>
      </section>

      {/* Specialized Treatments */}
      <section className="py-section-gap relative z-10 max-w-container-max mx-auto w-full px-6">
        <div className="mb-12 text-center">
          <h2 className="font-section-title text-section-title text-primary">{specializedTreatments.title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mt-4">
            {specializedTreatments.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
          {specializedTreatments.items.map((item) => (
            <ServiceCard
              desc={item.desc}
              exploreLabel={surgicalProcedures.exploreLabel}
              img={item.image.url}
              key={item.id}
              onOpen={() => setOpenService({ title: item.title, desc: item.desc, image: item.image })}
              title={item.title}
            />
          ))}
        </div>
      </section>

      {/* Final CTA - The Decision Point */}
      <CtaBanner
        eyebrow={cta.eyebrow}
        primaryHref={cta.bookAppointment.href}
        primaryLabel={cta.bookAppointment.label}
        title={cta.title}
        whatsappHref={cta.whatsappUs.href}
        whatsappLabel={cta.whatsappUs.label}
        phone={heroContactBarContent.phone}
      >
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 max-w-2xl w-full">
          {cta.options.map((option, index) => (
            <button
              className={
                index === cta.options.length - 1
                  ? "primary-btn flex-1 rounded-[32px] p-6 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-300 group"
                  : "glass-card flex-1 rounded-[32px] p-6 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-300 group border-primary/30 hover:border-primary"
              }
              key={option.id}
            >
              <span
                className={
                  index === cta.options.length - 1
                    ? "font-section-title text-2xl text-on-primary opacity-70 group-hover:opacity-100 transition-opacity"
                    : "font-section-title text-2xl text-primary opacity-50 group-hover:opacity-100 transition-opacity"
                }
              >
                {option.number}
              </span>
              <span
                className={
                  index === cta.options.length - 1
                    ? "font-card-title text-sm text-on-primary text-center"
                    : "font-card-title text-sm text-primary text-center"
                }
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </CtaBanner>

      <ServiceModal onClose={() => setOpenService(null)} service={openService} />
    </div>
  );
}

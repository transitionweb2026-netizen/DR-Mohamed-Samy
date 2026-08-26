"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type CtaBannerProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref?: string;
  whatsappLabel: string;
  whatsappHref?: string;
  showPhone?: boolean;
  /** CMS "global" contact phone number, shown under the buttons when
   * showPhone is true. Passed as a prop (rather than fetched here) because
   * this is a client component. */
  phone?: string;
  /** Page-specific extra content (e.g. Services' 3 diagnosis-path cards),
   * rendered between the subtitle and the button row. */
  children?: ReactNode;
  /** Page-specific animated backdrop (e.g. Articles' ShaderBackground),
   * rendered behind the glass card, still inside the shared section shell. */
  backdrop?: ReactNode;
};

// Unified final-CTA banner, used identically on every page: the same glass
// card, reveal-on-scroll animation, and button treatment that only the
// Home page originally had. Page-specific content (Services' 3 capsules)
// slots in via `children` so the surrounding chrome stays consistent
// without discarding what's unique to that page.
export default function CtaBanner({
  eyebrow,
  title,
  subtitle,
  primaryLabel,
  primaryHref = "/contact",
  whatsappLabel,
  whatsappHref = "https://wa.me/201234567890",
  showPhone = true,
  phone,
  children,
  backdrop,
}: CtaBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-background py-24 md:py-32 flex flex-col items-center perspective-container z-20"
    >
      {backdrop}
      <div className="relative z-20 w-full max-w-4xl px-4 flex flex-col items-center justify-center">
        <div
          className={`bg-white/40 backdrop-blur-[40px] border border-white/80 rounded-[40px] md:rounded-[60px] p-8 md:p-20 shadow-[0_20px_60px_rgba(0,107,91,0.15)] flex flex-col items-center text-center w-full cta-island transition-all duration-1000 ease-out hover:shadow-[0_30px_80px_rgba(24,213,184,0.25)] relative overflow-hidden group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center gap-6 w-full">
            <span className="font-label-sm text-primary tracking-[0.2em] uppercase font-bold">
              {eyebrow}
            </span>
            <h2 className="font-section-title text-on-background text-3xl md:text-5xl leading-tight drop-shadow-[0_4px_10px_rgba(255,255,255,0.8)]">
              {title}
            </h2>
            {subtitle && (
              <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
            {children}
            <div className="flex flex-col sm:flex-row gap-6 mt-8 w-full justify-center">
              <a
                className="bg-primary/90 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold shadow-[0_10px_30px_rgba(24,213,184,0.5)] transition-all flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95 border border-white/30 hover:bg-primary hover:shadow-[0_15px_40px_rgba(24,213,184,0.7)] group/btn w-full sm:w-auto"
                href={primaryHref}
              >
                {primaryLabel}
                <span className="material-symbols-outlined icon-rtl-flip group-hover/btn:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
              <a
                className="bg-white/30 backdrop-blur-md text-primary px-10 py-5 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95 border-2 border-primary/40 hover:bg-white/50 hover:border-primary group/btn2 w-full sm:w-auto"
                href={whatsappHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined group-hover/btn2:scale-110 transition-transform">
                  chat
                </span>
                {whatsappLabel}
              </a>
            </div>
            {showPhone && phone && (
              <p className="font-body-md text-primary mt-6 tracking-wide font-medium">
                {phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

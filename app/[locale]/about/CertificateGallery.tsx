"use client";

import { useEffect, useRef } from "react";

type ImageContent = { url: string; mediaId: string | null; alt: string };
export type CertificateItem = { id: string; image: ImageContent };

// Ports the original inline <script> almost verbatim: on every gallery
// scroll it re-computes each card's distance from the visual center and
// imperatively sets transform/opacity/z-index (a hanging "cable" spring
// effect), and re-draws the connecting SVG cable path with a sine wave
// tied to scroll position. This is a continuous, per-frame DOM
// measurement/paint loop, so it stays as direct DOM manipulation (matching
// the source) rather than being rewritten as React state.
export default function CertificateGallery({ items }: { items: CertificateItem[] }) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const paths = gallery
      .closest("section")
      ?.querySelectorAll<SVGPathElement>(".cable-path");
    let lastScroll = 0;

    const handleScroll = () => {
      const cards = gallery.querySelectorAll<HTMLElement>(".cert-card");
      const galleryCenter = gallery.scrollLeft + gallery.offsetWidth / 2;
      const scrollDelta = gallery.scrollLeft - lastScroll;
      lastScroll = gallery.scrollLeft;

      const waveOffset = Math.sin(gallery.scrollLeft / 200) * 20;
      const currentPath = `M -100 ${100 + waveOffset} Q 250 ${50 - waveOffset}, 500 ${100 + waveOffset} T 1000 ${100 - waveOffset} T 1500 ${100 + waveOffset} T 2100 ${100 - waveOffset}`;

      paths?.forEach((p) => {
        p.setAttribute("d", currentPath);
        if (p.id === "pulse-cable") {
          const currentSpeed = Math.max(1, 4 - Math.abs(scrollDelta) / 50);
          p.style.animationDuration = `${currentSpeed}s`;
        }
      });

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distanceFromCenter = Math.abs(galleryCenter - cardCenter);
        const normalizedDistance = Math.min(
          1,
          distanceFromCenter / (gallery.offsetWidth / 1.5),
        );

        const scale = Math.max(0.85, 1.1 - normalizedDistance * 0.25);
        const opacity = Math.max(0.4, 1 - normalizedDistance * 0.6);
        const translateY = normalizedDistance * 60;
        const rotation = (cardCenter - galleryCenter) / 100;

        card.style.transform = `scale(${scale}) translateY(${translateY}px) rotate(${rotation}deg)`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(Math.round(100 - normalizedDistance * 100));

        const connector = card.querySelector<HTMLElement>(".connector");
        if (connector) {
          const stretch = 1 + normalizedDistance * 0.5;
          connector.style.transform = `translateX(-50%) scaleY(${stretch})`;
        }
      });
    };

    gallery.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => gallery.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative z-10 w-full overflow-hidden py-12 pt-24">
      <div
        ref={galleryRef}
        className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-[20vw] pb-20 items-start md:px-[10vw] gap-6"
        id="certificate-gallery"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="snap-center shrink-0 transition-all duration-700 transform relative group aspect-[4/3] cert-card w-[180px] md:w-[270px]"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3 h-16 glass-connector rounded-full z-0 transition-transform duration-700 connector origin-top"></div>
            <div className="absolute -inset-4 bg-gradient-to-br from-white/40 to-transparent rounded-[2rem] blur-xl opacity-50 group-hover:opacity-80 transition-opacity z-10"></div>
            <div className="relative h-full w-full rounded-2xl overflow-hidden border-[6px] border-white/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,107,91,0.2),inset_0_0_40px_rgba(24,213,184,0.2)] z-20">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-white/30 pointer-events-none z-10"></div>
              <img
                alt={item.image.alt}
                className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                src={item.image.url}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

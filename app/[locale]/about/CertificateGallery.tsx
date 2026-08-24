"use client";

import { useEffect, useRef } from "react";

const CERTIFICATES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDk297I1X_W5nS2VIsPWnsE0bk-qqWLARHh8xdBKXTWsN7Wjg-HqRGHlf3TzWQHlG_Iu2NoxMQ36q5nrdgjEtCXrZTB7NDM4X4VsGVXxyoZ2RBEilxjAfwCN-IRKJeCX52ND-p4UAdtEgiGfc9fmQ0QyJ730BYamktuD2xQ1nNk2a28nbg_2MclUER1n9xXURsYD2zbs5VQ2Jrsp4PVqPr8J77U_9Ty-6pCTAbUTpb4cdKjylV9XXUz",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBqPdul2m9MRblYIDKNvwQ_qEo5Rn8o4qcSEslDUXdfRAFoEx2RiaQQ8Erct_ovd4tatag6UnH-jPlAZ5tRHcSNa7De2cxg8AIu2_6TpmdGb_ZwjkaZNa8YO1YZo0TiFmM06zKoPniUBnvOt3GEkm1kTPXP2gYCzhOn7rNt--LEdAD740UG08StaPJ26684ko9iHw4_HRe15rqCwQKI2ufnhvcLEAnwDz0pugXuCU5uEPYUgTR2BWWW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCe1vg4MmYsd3RF8lFzM7Gu0Nz8li973SS99uh5OFqn0fL59zfvWU3LyMCY6VTN-UEB79Fau9dZKWMKBxzzsq26arcKd2NMNL6yYdz5HomrDdFwWwGQMPh0QsTZu7BB_BZXbjMC_dinfbHMpHTUFqLWQeg2sx13VQEVEjrHO7b-1kejvjntErAuqKRFgNbEGp5gPcX8qeKukVpH2eOXPFhNLKtSSGVUcX3iEXJ2QQYDszmX5Wk5NEZ5",
  "https://lh3.googleusercontent.com/aida/AP1WRLsQ51pVaeeERZMp8n6vLlqUwR7ls_BXtrisSr7gUkEsvcGSRhelOSuMznTWoCsvz9TvGGMpPPJJsMRfI_khufvOBsyD4dpq3jSOiQlb03b7xINbqeOM0sSuG1XkhlZcczh3LRRYcfAgcyRjCMCH88fwQU7VeYMr1j58QMxFjPlezRLAwpgiVgUHT_VkjD-oHw_A1MII96tKL3c15F73r8jO4CdkGFZ09JCaqeoTj2vQQmvwAMTydqybIbc",
  "https://lh3.googleusercontent.com/aida/AP1WRLsQ51pVaeeERZMp8n6vLlqUwR7ls_BXtrisSr7gUkEsvcGSRhelOSuMznTWoCsvz9TvGGMpPPJJsMRfI_khufvOBsyD4dpq3jSOiQlb03b7xINbqeOM0sSuG1XkhlZcczh3LRRYcfAgcyRjCMCH88fwQU7VeYMr1j58QMxFjPlezRLAwpgiVgUHT_VkjD-oHw_A1MII96tKL3c15F73r8jO4CdkGFZ09JCaqeoTj2vQQmvwAMTydqybIbc",
  "https://lh3.googleusercontent.com/aida/AP1WRLsQ51pVaeeERZMp8n6vLlqUwR7ls_BXtrisSr7gUkEsvcGSRhelOSuMznTWoCsvz9TvGGMpPPJJsMRfI_khufvOBsyD4dpq3jSOiQlb03b7xINbqeOM0sSuG1XkhlZcczh3LRRYcfAgcyRjCMCH88fwQU7VeYMr1j58QMxFjPlezRLAwpgiVgUHT_VkjD-oHw_A1MII96tKL3c15F73r8jO4CdkGFZ09JCaqeoTj2vQQmvwAMTydqybIbc",
  "https://lh3.googleusercontent.com/aida/AP1WRLsQ51pVaeeERZMp8n6vLlqUwR7ls_BXtrisSr7gUkEsvcGSRhelOSuMznTWoCsvz9TvGGMpPPJJsMRfI_khufvOBsyD4dpq3jSOiQlb03b7xINbqeOM0sSuG1XkhlZcczh3LRRYcfAgcyRjCMCH88fwQU7VeYMr1j58QMxFjPlezRLAwpgiVgUHT_VkjD-oHw_A1MII96tKL3c15F73r8jO4CdkGFZ09JCaqeoTj2vQQmvwAMTydqybIbc",
  "https://lh3.googleusercontent.com/aida/AP1WRLsQ51pVaeeERZMp8n6vLlqUwR7ls_BXtrisSr7gUkEsvcGSRhelOSuMznTWoCsvz9TvGGMpPPJJsMRfI_khufvOBsyD4dpq3jSOiQlb03b7xINbqeOM0sSuG1XkhlZcczh3LRRYcfAgcyRjCMCH88fwQU7VeYMr1j58QMxFjPlezRLAwpgiVgUHT_VkjD-oHw_A1MII96tKL3c15F73r8jO4CdkGFZ09JCaqeoTj2vQQmvwAMTydqybIbc",
];

// Ports the original inline <script> almost verbatim: on every gallery
// scroll it re-computes each card's distance from the visual center and
// imperatively sets transform/opacity/z-index (a hanging "cable" spring
// effect), and re-draws the connecting SVG cable path with a sine wave
// tied to scroll position. This is a continuous, per-frame DOM
// measurement/paint loop, so it stays as direct DOM manipulation (matching
// the source) rather than being rewritten as React state.
export default function CertificateGallery() {
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
        {CERTIFICATES.map((src, i) => (
          <div
            key={i}
            className="snap-center shrink-0 transition-all duration-700 transform relative group aspect-[4/3] cert-card w-[180px] md:w-[270px]"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3 h-16 glass-connector rounded-full z-0 transition-transform duration-700 connector origin-top"></div>
            <div className="absolute -inset-4 bg-gradient-to-br from-white/40 to-transparent rounded-[2rem] blur-xl opacity-50 group-hover:opacity-80 transition-opacity z-10"></div>
            <div className="relative h-full w-full rounded-2xl overflow-hidden border-[6px] border-white/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,107,91,0.2),inset_0_0_40px_rgba(24,213,184,0.2)] z-20">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-white/30 pointer-events-none z-10"></div>
              <img
                alt={`Certificate ${i + 1}`}
                className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                src={src}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

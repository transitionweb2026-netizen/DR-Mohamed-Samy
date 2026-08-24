"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

// Shared floating navbar, reused on every route. The original 7 source
// pages each generated their own navbar with a different brand name
// ("Dr. Liver", "Dr. Mohamed Samy Abdelwahid", "Lumina Liver Care",
// "LIVERCARE ELITE") and every link was a dead `href="#"`. Per the chosen
// migration plan this is unified under the "Lumina Liver Care" brand
// (majority name across the source pages) with real routing wired up, and
// a working mobile menu is added since none of the source pages had one
// (the hamburger icon that a couple of them included had no behavior
// attached to it).
const NAV_LINK_HREFS = [
  "/",
  "/about",
  "/services",
  "/reviews",
  "/videos",
  "/articles",
] as const;

const NAV_LABEL_KEYS: Record<(typeof NAV_LINK_HREFS)[number], string> = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/reviews": "reviews",
  "/videos": "videos",
  "/articles": "articles",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max rounded-[2rem] md:rounded-full border border-outline-variant bg-surface-container-lowest/60 backdrop-blur-[40px] shadow-[0_20px_50px_rgba(2,23,24,0.05)] z-50">
      <div className="flex justify-between items-center px-6 md:px-glass-padding py-4">
        <Link className="font-hero-headline text-2xl text-primary" href="/">
          Lumina Liver Care
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINK_HREFS.map((href) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                className={
                  isActive
                    ? "text-primary font-bold border-b-2 border-primary pb-1 active:scale-95 duration-200"
                    : "text-on-surface-variant hover:text-primary transition-colors duration-300 active:scale-95 duration-200"
                }
                href={href}
              >
                {t(NAV_LABEL_KEYS[href])}
              </Link>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            className="bg-gradient-to-r from-secondary to-primary text-on-primary px-6 py-2 rounded-full font-label-sm hover:shadow-[0_0_15px_rgba(24,213,184,0.5)] transition-all active:scale-95"
            href="/contact"
          >
            {t("contact")}
          </Link>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className="text-primary p-1"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-1 px-6 pb-6 pt-2">
          {NAV_LINK_HREFS.map((href) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                className={
                  isActive
                    ? "text-primary font-bold py-3 border-b border-outline-variant/50"
                    : "text-on-surface-variant py-3 border-b border-outline-variant/50"
                }
                href={href}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(NAV_LABEL_KEYS[href])}
              </Link>
            );
          })}
          <Link
            className="mt-4 text-center bg-gradient-to-r from-secondary to-primary text-on-primary px-6 py-3 rounded-full font-label-sm"
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("contact")}
          </Link>
        </div>
      )}
    </nav>
  );
}

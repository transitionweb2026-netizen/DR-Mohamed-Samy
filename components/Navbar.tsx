"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import LanguageSwitcher, { type LanguageSwitcherContent } from "./LanguageSwitcher";

export type NavbarContent = {
  brandName: string;
  toggleMenuAriaLabel: string;
  links: { id: string; href: string; label: string }[];
};

// Shared floating navbar, reused on every route. All content (brand name,
// nav links, aria-labels) comes from the CMS's "global" page, edited once
// from the dashboard instead of duplicated per page.
export default function Navbar({
  content,
  languageSwitcherContent,
}: {
  content: NavbarContent;
  languageSwitcherContent: LanguageSwitcherContent;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max rounded-[2rem] lg:rounded-full border border-outline-variant bg-surface-container-lowest/60 backdrop-blur-[40px] shadow-[0_20px_50px_rgba(2,23,24,0.05)] z-50">
      <div className="flex justify-between items-center px-6 lg:px-glass-padding py-4">
        <Link
          className="font-hero-headline text-base whitespace-nowrap md:text-xl lg:text-2xl text-primary"
          href="/"
        >
          {content.brandName}
        </Link>
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {content.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.id}
                className={
                  isActive
                    ? "text-primary font-bold border-b-2 border-primary pb-1 active:scale-95 duration-200 whitespace-nowrap"
                    : "text-on-surface-variant hover:text-primary transition-colors duration-300 active:scale-95 duration-200 whitespace-nowrap"
                }
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex items-center">
          <LanguageSwitcher content={languageSwitcherContent} />
        </div>
        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher content={languageSwitcherContent} />
          <button
            aria-expanded={isMenuOpen}
            aria-label={content.toggleMenuAriaLabel}
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
        <div className="lg:hidden flex flex-col gap-1 px-6 pb-6 pt-2">
          {content.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.id}
                className={
                  isActive
                    ? "text-primary font-bold py-3 border-b border-outline-variant/50"
                    : "text-on-surface-variant py-3 border-b border-outline-variant/50"
                }
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

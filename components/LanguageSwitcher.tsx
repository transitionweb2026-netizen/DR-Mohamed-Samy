"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LANGUAGE_META: Record<
  (typeof routing.locales)[number],
  { flag: string; short: string }
> = {
  en: { flag: "🇬🇧", short: "EN" },
  ar: { flag: "🇸🇦", short: "AR" },
  fr: { flag: "🇫🇷", short: "FR" },
};

// Integrated into the existing navbar rather than a new component of its
// own design language: same glass/pill aesthetic, same font tokens. Switching
// locale keeps the current page (About stays About, etc.) via next-intl's
// locale-aware router -- it swaps only the locale segment of the pathname.
export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function selectLocale(nextLocale: (typeof routing.locales)[number]) {
    setIsOpen(false);
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("label")}
        className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm text-label-sm px-2 py-1 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60"
        disabled={isPending}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span aria-hidden="true">{LANGUAGE_META[locale as keyof typeof LANGUAGE_META].flag}</span>
        {LANGUAGE_META[locale as keyof typeof LANGUAGE_META].short}
        <span
          className="material-symbols-outlined text-base transition-transform duration-200 motion-reduce:transition-none"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          expand_more
        </span>
      </button>
      <div
        className={`absolute end-0 top-full mt-2 min-w-[10rem] rounded-2xl border border-outline-variant bg-surface-container-lowest/95 backdrop-blur-[40px] shadow-[0_20px_50px_rgba(2,23,24,0.15)] py-2 z-50 origin-top-end transition-all duration-200 motion-reduce:transition-none ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="listbox"
      >
        {routing.locales.map((loc) => (
          <button
            key={loc}
            aria-selected={loc === locale}
            className={`w-full flex items-center gap-3 px-4 py-2 text-start font-label-sm text-label-sm transition-colors ${
              loc === locale
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-primary hover:bg-primary-container/10"
            }`}
            onClick={() => selectLocale(loc)}
            role="option"
            type="button"
          >
            <span aria-hidden="true">{LANGUAGE_META[loc].flag}</span>
            {t(loc)}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export type LanguageSwitcherContent = {
  groupAriaLabel: string;
  languages: { id: string; shortLabel: string; ariaLabel: string }[];
};

// Three compact, always-visible language buttons -- replaces the previous
// "EN ▾" dropdown. Switching locale keeps the current page (About stays
// About, etc.) via next-intl's locale-aware router, which swaps only the
// locale segment of the pathname.
export default function LanguageSwitcher({ content }: { content: LanguageSwitcherContent }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function selectLocale(nextLocale: (typeof routing.locales)[number]) {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div
      aria-label={content.groupAriaLabel}
      className="flex items-center gap-1 rounded-full bg-surface-container/60 border border-outline-variant p-1"
      role="group"
    >
      {content.languages.map((lang) => {
        const isActive = lang.id === locale;
        return (
          <button
            key={lang.id}
            aria-current={isActive ? "true" : undefined}
            aria-label={lang.ariaLabel}
            className={
              isActive
                ? "px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold transition-all"
                : "px-3 py-1.5 rounded-full text-on-surface-variant hover:text-primary font-label-sm text-[11px] font-bold transition-all disabled:opacity-60"
            }
            disabled={isPending}
            onClick={() => selectLocale(lang.id as (typeof routing.locales)[number])}
            type="button"
          >
            {lang.shortLabel}
          </button>
        );
      })}
    </div>
  );
}

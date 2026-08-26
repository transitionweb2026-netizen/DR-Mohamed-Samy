"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LANGUAGE_SHORT: Record<(typeof routing.locales)[number], string> = {
  en: "EN",
  ar: "AR",
  fr: "FR",
};

// Three compact, always-visible language buttons -- replaces the previous
// "EN ▾" dropdown. Switching locale keeps the current page (About stays
// About, etc.) via next-intl's locale-aware router, which swaps only the
// locale segment of the pathname.
export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("languageSwitcher");
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
      aria-label={t("label")}
      className="flex items-center gap-1 rounded-full bg-surface-container/60 border border-outline-variant p-1"
      role="group"
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            aria-current={isActive ? "true" : undefined}
            aria-label={t(loc)}
            className={
              isActive
                ? "px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold transition-all"
                : "px-3 py-1.5 rounded-full text-on-surface-variant hover:text-primary font-label-sm text-[11px] font-bold transition-all disabled:opacity-60"
            }
            disabled={isPending}
            onClick={() => selectLocale(loc)}
            type="button"
          >
            {LANGUAGE_SHORT[loc]}
          </button>
        );
      })}
    </div>
  );
}

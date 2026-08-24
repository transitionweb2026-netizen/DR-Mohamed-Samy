import { routing } from "./routing";

// Builds the per-page hreflang alternate map, e.g. for pagePath="/about":
// { en: ".../en/about", ar: ".../ar/about", fr: ".../fr/about", "x-default": ".../en/about" }
// Used in every page's generateMetadata so each page links to its own
// translated equivalent, not just the homepage.
export function localeAlternates(pagePath: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${siteUrl}/${locale}${pagePath}`;
  }
  languages["x-default"] = `${siteUrl}/${routing.defaultLocale}${pagePath}`;
  return languages;
}

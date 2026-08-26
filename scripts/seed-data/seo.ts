import en from "../../messages/en.json";
import ar from "../../messages/ar.json";
import fr from "../../messages/fr.json";
import type { Locale } from "../../lib/cms/types";

const MESSAGES = { en, ar, fr } as const;

export type SeoPageDef = {
  slug: string;
  path: string;
  metaKey: keyof typeof en.meta;
};

export const SEO_PAGES: SeoPageDef[] = [
  { slug: "home", path: "", metaKey: "home" },
  { slug: "about", path: "/about", metaKey: "about" },
  { slug: "services", path: "/services", metaKey: "services" },
  { slug: "reviews", path: "/reviews", metaKey: "reviews" },
  { slug: "videos", path: "/videos", metaKey: "videos" },
  { slug: "articles", path: "/articles", metaKey: "articles" },
  { slug: "contact", path: "/contact", metaKey: "contact" },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export type SeoRowDef = {
  locale: Locale;
  seo_title: string;
  meta_description: string;
  canonical_url: string;
  robots_index: boolean;
  robots_follow: boolean;
};

export function seoRowsFor(page: SeoPageDef): SeoRowDef[] {
  return (Object.keys(MESSAGES) as Locale[]).map((locale) => {
    const meta = MESSAGES[locale].meta as typeof en.meta;
    const pageMeta = meta[page.metaKey] as { title: string; description: string };
    return {
      locale,
      seo_title: pageMeta.title,
      meta_description: pageMeta.description,
      canonical_url: `${SITE_URL}/${locale}${page.path}`,
      robots_index: true,
      robots_follow: true,
    };
  });
}

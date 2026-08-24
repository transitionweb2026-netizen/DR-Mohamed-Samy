import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const ROUTES = [
  "",
  "/about",
  "/services",
  "/reviews",
  "/videos",
  "/articles",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return ROUTES.map((route) => ({
    url: `${siteUrl}/${routing.defaultLocale}${route}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${siteUrl}/${locale}${route}`,
        ]),
      ),
    },
  }));
}

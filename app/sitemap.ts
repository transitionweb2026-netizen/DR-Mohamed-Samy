import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPageLastModified } from "@/lib/cms/queries";

const ROUTES: { slug: string; path: string }[] = [
  { slug: "home", path: "" },
  { slug: "about", path: "/about" },
  { slug: "services", path: "/services" },
  { slug: "reviews", path: "/reviews" },
  { slug: "videos", path: "/videos" },
  { slug: "articles", path: "/articles" },
  { slug: "contact", path: "/contact" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return Promise.all(
    ROUTES.map(async (route) => ({
      url: `${siteUrl}/${routing.defaultLocale}${route.path}`,
      lastModified: await getPageLastModified(route.slug),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            `${siteUrl}/${locale}${route.path}`,
          ]),
        ),
      },
    })),
  );
}

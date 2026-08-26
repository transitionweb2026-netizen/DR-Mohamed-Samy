import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/alternates";
import AboutClient, { type AboutContent } from "./AboutClient";
import type { HeroContactBarContent } from "@/components/HeroContactBar";
import { getGlobalContent, getPageContent, getPageSeo } from "@/lib/cms/queries";
import type { Locale } from "@/lib/cms/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const seo = await getPageSeo("about", locale);
  return {
    title: seo?.seo_title,
    description: seo?.meta_description ?? undefined,
    alternates: { languages: localeAlternates("/about"), canonical: seo?.canonical_url ?? undefined },
    robots:
      seo && (!seo.robots_index || !seo.robots_follow)
        ? { index: seo.robots_index, follow: seo.robots_follow }
        : undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const [content, global] = await Promise.all([
    getPageContent("about", locale) as unknown as Promise<AboutContent>,
    getGlobalContent(locale),
  ]);
  const heroContactBarContent = global.contact as unknown as HeroContactBarContent;

  return <AboutClient content={content} heroContactBarContent={heroContactBarContent} />;
}

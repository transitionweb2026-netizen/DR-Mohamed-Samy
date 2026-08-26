import type { Metadata } from "next";
import {
  Anton,
  Archivo_Narrow,
  Be_Vietnam_Pro,
  Cairo,
  Tajawal,
} from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar, { type NavbarContent } from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons, {
  type FloatingContactButtonsContent,
} from "@/components/FloatingContactButtons";
import type { LanguageSwitcherContent } from "@/components/LanguageSwitcher";
import { routing } from "@/i18n/routing";
import { getGlobalContent, getPageSeo } from "@/lib/cms/queries";
import type { Locale } from "@/lib/cms/types";

// All CMS content pages render per-request rather than being statically
// generated: content comes from Supabase and must always reflect the
// latest saved value the moment a page loads, with no build/deploy step
// or cache-invalidation window in between. Combined with the `no-store`
// fetch override in lib/supabase/admin.ts (which stops Next's Data Cache
// from caching the underlying Supabase requests), this guarantees a CMS
// edit is visible on the very next page load.
export const dynamic = "force-dynamic";
import "../globals.css";

// The original pages loaded these exact families/weights from Google Fonts
// via <link> tags. next/font self-hosts the same families/weights instead,
// which preserves the visual result while avoiding an external render-
// blocking request (a like-for-like technical upgrade, not a font change).
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-archivo-narrow",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

// Anton / Archivo Narrow / Be Vietnam Pro have no Arabic glyphs at all, so
// Arabic text in them would silently fall back to the browser default font.
// Cairo and Tajawal are the closest-feeling display/body pairing (geometric,
// modern) that actually cover Arabic -- loaded only for the "ar" locale via
// the CSS variable indirection in globals.css / tailwind.config.ts, so
// English and French visitors never fetch them.
const cairo = Cairo({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  weight: ["400", "500", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const [seo, global] = await Promise.all([
    getPageSeo("home", locale),
    getGlobalContent(locale),
  ]);
  const brandName = (global.navbar as unknown as { brandName: string }).brandName;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: `%s | ${brandName}`,
      default: seo?.seo_title ?? brandName,
    },
    description: seo?.meta_description ?? "",
    robots:
      seo && (!seo.robots_index || !seo.robots_follow)
        ? { index: seo.robots_index, follow: seo.robots_follow }
        : undefined,
    // Per-page hreflang alternates (e.g. /ar/about <-> /en/about) are set
    // in each page's own generateMetadata via i18n/alternates.ts -- a
    // static value here would make every route's alternates point at the
    // homepage instead of its own translated equivalent.
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale (next-intl requirement when
  // reading the locale from a route param instead of a request header).
  setRequestLocale(locale);

  const dir = locale === "ar" ? "rtl" : "ltr";

  const global = await getGlobalContent(locale);
  const navbarContent = global.navbar as unknown as NavbarContent;
  const languageSwitcherContent = global.languageSwitcher as unknown as LanguageSwitcherContent;
  const floatingContactContent = global.contact as unknown as FloatingContactButtonsContent;

  return (
    <html
      className={`scroll-smooth ${anton.variable} ${archivoNarrow.variable} ${beVietnamPro.variable} ${cairo.variable} ${tajawal.variable}`}
      dir={dir}
      lang={locale}
    >
      <head>
        {/* Material Symbols is not a standard next/font Google family, so it
            keeps its original <link> tag exactly as every source page had it. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body-md text-on-background bg-background relative overflow-x-hidden min-h-screen antialiased">
        <NextIntlClientProvider>
          <Navbar content={navbarContent} languageSwitcherContent={languageSwitcherContent} />
          {children}
          <Footer locale={locale} />
          <FloatingContactButtons content={floatingContactContent} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

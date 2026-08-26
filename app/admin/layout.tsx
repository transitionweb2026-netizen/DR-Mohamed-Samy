import type { Metadata } from "next";
import "../globals.css";

// The /admin dashboard lives outside next-intl's [locale] segment (it's an
// internal tool, not a translated public page - see proxy.ts), so unlike
// every public route it has no shared ancestor layout providing <html>/
// <body>. This is that root layout, kept deliberately minimal: no fonts,
// no locale/dir switching, no next-intl provider - none of that applies to
// an English-only internal dashboard.
export const metadata: Metadata = {
  title: "Lumina CMS",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}

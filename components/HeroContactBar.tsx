"use client";

const SOCIAL_PATHS: Record<string, string> = {
  tiktok:
    "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.02-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.72 2.7 21.3.28 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32A6.16 6.16 0 0012 5.84zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z",
  facebook:
    "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z",
};

export type HeroContactBarContent = {
  phone: string;
  socialLinks: { id: string; href: string }[];
  followUsOnTemplate: string;
};

// Unified social/contact pill used at the bottom-right corner of every hero
// section. All content (phone number, social hrefs) comes from the CMS's
// "global" page so it's edited once and reflected everywhere it appears.
export default function HeroContactBar({ content }: { content: HeroContactBarContent }) {
  const { phone, socialLinks, followUsOnTemplate } = content;
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <div className="absolute bottom-5 end-5 md:bottom-8 md:end-8 z-20 glass-panel rounded-full py-2 ps-5 pe-2 md:ps-6 md:pe-3 flex items-center gap-3 md:gap-4">
      <a
        className="flex items-center gap-2 text-primary font-label-sm text-label-sm whitespace-nowrap hover:opacity-80 transition-opacity"
        href={telHref}
      >
        <span className="hidden sm:inline">{phone}</span>
        <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            call
          </span>
        </span>
      </a>
      <div className="w-px h-6 bg-outline-variant/70 shrink-0"></div>
      <div className="flex items-center gap-2">
        {socialLinks.map((social) => (
          <a
            key={social.id}
            aria-label={followUsOnTemplate.replace("{platform}", social.id)}
            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors"
            href={social.href}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d={SOCIAL_PATHS[social.id] ?? ""}></path>
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

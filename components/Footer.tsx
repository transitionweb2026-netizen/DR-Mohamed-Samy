import { getGlobalContent } from "@/lib/cms/queries";
import type { Locale } from "@/lib/cms/types";

type FooterContent = {
  brandName: string;
  tagline: string;
  links: { id: string; href: string; label: string }[];
};

// Shared footer, reused on every route. Content comes from the CMS's
// "global" page (`cache()`-deduped with every other caller of
// getGlobalContent within the same request, so this costs nothing extra).
export default async function Footer({ locale }: { locale: Locale }) {
  const global = await getGlobalContent(locale);
  const content = global.footer as unknown as FooterContent;

  return (
    <footer className="bg-surface-container/40 backdrop-blur-[30px] w-full max-w-[1450px] mx-auto rounded-t-xl mt-section-gap border-t border-white/20 flex flex-col md:flex-row justify-between items-center px-glass-padding py-stack-md relative z-20">
      <div className="font-hero-headline text-primary text-lg mb-4 md:mb-0">
        {content.brandName}
      </div>
      <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0 font-label-sm text-label-sm">
        {content.links.map((link) => (
          <a
            key={link.id}
            className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="text-on-surface-variant font-label-sm text-label-sm text-center md:text-right">
        {content.tagline}
      </div>
    </footer>
  );
}

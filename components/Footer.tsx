// Shared footer, reused on every route. Based on the "Lumina Liver Care"
// branded footer already used by the Reviews/Videos/Articles source pages
// (the majority brand chosen for the unified navigation), reused here
// instead of duplicating a near-identical footer 7 times.
export default function Footer() {
  return (
    <footer className="bg-surface-container/40 backdrop-blur-[30px] w-full max-w-[1450px] mx-auto rounded-t-xl mt-section-gap border-t border-white/20 flex flex-col md:flex-row justify-between items-center px-glass-padding py-stack-md relative z-20">
      <div className="font-hero-headline text-primary text-lg mb-4 md:mb-0">
        Lumina Liver Care
      </div>
      <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0 font-label-sm text-label-sm">
        <a
          className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80"
          href="#"
        >
          Legal Notice
        </a>
        <a
          className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80"
          href="#"
        >
          Medical Ethics
        </a>
        <a
          className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80"
          href="#"
        >
          Careers
        </a>
      </div>
      <div className="text-on-surface-variant font-label-sm text-label-sm text-center md:text-right">
        © 2024 Lumina Liver Transplantation. Precision Surgery. Lifesaving
        Care.
      </div>
    </footer>
  );
}

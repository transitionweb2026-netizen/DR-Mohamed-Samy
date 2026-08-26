"use client";

import { useTranslations } from "next-intl";

const WHATSAPP_ICON_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

// Persistent floating action buttons, always visible while scrolling (unlike
// HeroContactBar, which lives inside each hero and scrolls away with it).
// Deliberately anchored to the opposite bottom corner (start vs. end) from
// HeroContactBar so the two never overlap in either LTR or RTL.
export default function FloatingContactButtons() {
  const t = useTranslations("common");
  const phone = t("phone");
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <div className="fixed bottom-5 start-5 md:bottom-8 md:start-8 z-40 flex flex-col gap-3">
      <a
        aria-label={t("callUs")}
        className="group relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,107,91,0.35)] transition-transform hover:scale-110 active:scale-95 bg-primary text-on-primary"
        href={telHref}
      >
        <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping motion-reduce:hidden"></span>
        <span
          className="material-symbols-outlined relative text-2xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          call
        </span>
      </a>
      <a
        aria-label={t("chatOnWhatsapp")}
        className="group relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 active:scale-95 bg-[#25D366] text-white"
        href="https://wa.me/201234567890"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/60 animate-ping motion-reduce:hidden [animation-delay:1s]"></span>
        <svg
          className="relative w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d={WHATSAPP_ICON_PATH}></path>
        </svg>
      </a>
    </div>
  );
}

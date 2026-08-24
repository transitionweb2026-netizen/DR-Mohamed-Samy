import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar", "fr"],
  defaultLocale: "en",
  // Every locale gets an explicit prefix, including the default ("/en"),
  // per the requested routing structure.
  localePrefix: "always",
  localeCookie: {
    // Remembers the visitor's chosen language for their next visit to "/".
    maxAge: 60 * 60 * 24 * 365,
  },
});

export type Locale = (typeof routing.locales)[number];

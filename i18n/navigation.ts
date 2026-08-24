import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware drop-in replacements for next/link and next/navigation.
// Using these everywhere (instead of the plain Next.js equivalents) is what
// makes the language switcher able to preserve the current page: passing
// `locale` to `router.replace` / `Link` swaps only the locale segment of
// the current pathname.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

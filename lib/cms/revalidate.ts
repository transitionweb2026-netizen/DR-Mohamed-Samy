import "server-only";
import { revalidatePath } from "next/cache";
import { LOCALES } from "./types";

/** Busts the public site's cache for whatever a CMS save just changed, so
 * the edit is visible on the very next request. "global" content (Navbar/
 * Footer/contact info) appears in the root layout of every locale, so it
 * revalidates the whole layout tree per locale rather than a single path. */
export function revalidateContentFor(slug: string, path: string | null) {
  if (slug === "global") {
    for (const locale of LOCALES) revalidatePath(`/${locale}`, "layout");
    return;
  }
  for (const locale of LOCALES) revalidatePath(`/${locale}${path ?? ""}`);
}

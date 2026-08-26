import en from "../messages/en.json";
import ar from "../messages/ar.json";
import fr from "../messages/fr.json";
import type { ButtonValue, ImageValue, SectionSchema, Translatable } from "../lib/cms/types";

const MESSAGES = { en, ar, fr } as const;

function get(obj: unknown, path: string): string {
  return (
    (path
      .split(".")
      .reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], obj) as
      | string
      | undefined) ?? ""
  );
}

/** Looks up the same key path in all 3 messages/*.json files. This is how
 * the seed script reuses the site's existing (carefully written) EN/AR/FR
 * copy instead of retyping it. */
export function text(keyPath: string): Translatable {
  return { en: get(MESSAGES.en, keyPath), ar: get(MESSAGES.ar, keyPath), fr: get(MESSAGES.fr, keyPath) };
}

/** For content that's identical across locales today (numerals like "+20",
 * "98%" - not translated in the source site because they're numbers, not
 * words). Still fully editable per-locale afterwards. */
export function same(value: string): Translatable {
  return { en: value, ar: value, fr: value };
}

/** For strings this migration is writing fresh translations for (the
 * previously-hardcoded, never-translated alt texts and labels found during
 * the content audit - e.g. image alts that were literal English strings
 * with no ar/fr equivalent anywhere in the codebase). */
export function fresh(t: Translatable): Translatable {
  return t;
}

export function image(url: string, alt: Translatable): ImageValue {
  return { url, mediaId: null, alt };
}

export function button(label: Translatable, href: string): ButtonValue {
  return { label, href };
}

export function joinText(...parts: Translatable[]): Translatable {
  return {
    en: parts.map((p) => p.en).join(" "),
    ar: parts.map((p) => p.ar).join(" "),
    fr: parts.map((p) => p.fr).join(" "),
  };
}

export type SectionDef = {
  key: string;
  label: string;
  schema: SectionSchema;
  content: Record<string, unknown>;
};

export function section(
  key: string,
  label: string,
  schema: SectionSchema,
  content: Record<string, unknown>,
): SectionDef {
  return { key, label, schema, content };
}

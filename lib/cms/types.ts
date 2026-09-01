export type Locale = "en" | "ar" | "fr";
export const LOCALES: Locale[] = ["en", "ar", "fr"];

export type Translatable = { en: string; ar: string; fr: string };

export type ImageValue = {
  /** Always a usable URL - either a Supabase Storage public URL (once
   * uploaded/replaced via the dashboard) or the original external URL
   * carried over from the pre-CMS site. */
  url: string;
  /** Set once the asset has been uploaded through the dashboard; null for
   * un-migrated legacy external images (they're still fully editable - the
   * dashboard just uploads a real file for them the first time someone
   * replaces one). */
  mediaId: string | null;
  alt: Translatable;
};

export type ButtonValue = {
  label: Translatable;
  href: string;
};

/** Leaf field types. `link`, `icon`, and `number` are stored as plain
 * (non-translatable) values; `text`/`textarea` are stored as Translatable;
 * `image`/`video` are stored as ImageValue; `button` is a ButtonValue (a
 * translatable label + a non-translatable href, edited together as one
 * widget in the dashboard since that's how nearly every CTA on the site is
 * shaped). `articleRefs` is stored as `string[]` of article ids (see
 * scripts/seed-data/articles.ts's `grid.items[].id`) - used where a section
 * on one page needs to feature a chosen subset of the real articles
 * defined on the Articles page, without duplicating their content. Editing
 * an article on the Articles page updates it everywhere it's referenced. */
export type FieldType =
  | "text"
  | "textarea"
  | "image"
  | "video"
  | "icon"
  | "link"
  | "number"
  | "button"
  | "articleRefs";

export type FieldSchema = FieldType | { type: "array"; itemSchema: SectionSchema };

/** A section's field-type manifest: field key -> its type (or "array" of a
 * sub-schema). This is what the dashboard walks to generically render a
 * form, and what lib/cms/resolve.ts walks to pick out the right locale. */
export type SectionSchema = { [fieldKey: string]: FieldSchema };

export type SectionRow = {
  id: string;
  page_id: string;
  section_key: string;
  label: string;
  sort_order: number;
  schema: SectionSchema;
  content: Record<string, unknown>;
  updated_at: string;
  updated_by: string | null;
};

export type PageRow = {
  id: string;
  slug: string;
  path: string | null;
  label: string;
  sort_order: number;
};

export type PageSeoRow = {
  id: string;
  page_id: string;
  locale: Locale;
  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_id: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image_id: string | null;
  robots_index: boolean;
  robots_follow: boolean;
  structured_data: Record<string, unknown> | null;
  updated_at: string;
  updated_by: string | null;
};

/** The resolved shape of one entry in the Articles page's `grid.items` -
 * what an `articleRefs` field expands each referenced id into (see
 * lib/cms/queries.ts). */
export type ResolvedArticle = {
  id: string;
  image: { url: string; mediaId: string | null; alt: string };
  tag: string;
  title: string;
  body: string;
};

export type AppRole = "admin" | "editor";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: AppRole;
  created_at: string;
};

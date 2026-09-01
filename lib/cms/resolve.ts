import type {
  ButtonValue,
  FieldSchema,
  ImageValue,
  Locale,
  SectionSchema,
  Translatable,
} from "./types";

/** Resolves one field's stored value down to the given locale, per its
 * schema type. Used server-side so the public site never sees the other
 * two languages' strings for a field it's about to render. */
function resolveField(schema: FieldSchema, value: unknown, locale: Locale): unknown {
  if (schema === "text" || schema === "textarea") {
    const t = value as Translatable | undefined;
    return t?.[locale] ?? "";
  }
  if (schema === "icon" || schema === "link" || schema === "number") {
    return value ?? null;
  }
  if (schema === "articleRefs" || schema === "reviewRefs") {
    // Just the chosen ids - not translatable. lib/cms/queries.ts expands
    // these into full article/review objects after this section-level
    // resolve pass, since that requires reading a different page's data.
    return (value as string[] | undefined) ?? [];
  }
  if (schema === "image" || schema === "video") {
    const v = value as ImageValue | undefined;
    return { url: v?.url ?? "", mediaId: v?.mediaId ?? null, alt: v?.alt?.[locale] ?? "" };
  }
  if (schema === "button") {
    const v = value as ButtonValue | undefined;
    return { label: v?.label?.[locale] ?? "", href: v?.href ?? "" };
  }
  if (typeof schema === "object" && schema.type === "array") {
    const items = (value as Record<string, unknown>[] | undefined) ?? [];
    return items.map((item) => resolveSection(schema.itemSchema, item, locale));
  }
  return value ?? null;
}

/** Resolves a whole section's content object against its schema, for one
 * locale. Array-item `id`s are passed through even though they're not part
 * of the itemSchema (they're bookkeeping, not a content field). */
export function resolveSection(
  schema: SectionSchema,
  content: Record<string, unknown> | null | undefined,
  locale: Locale,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const source = content ?? {};
  for (const key of Object.keys(schema)) {
    result[key] = resolveField(schema[key], source[key], locale);
  }
  if (source && typeof source === "object" && "id" in source) {
    result.id = (source as Record<string, unknown>).id;
  }
  return result;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { uploadMedia } from "@/lib/cms/media-client";
import { createClient } from "@/lib/supabase/client";
import type {
  ButtonValue,
  FieldSchema,
  ImageValue,
  Locale,
  SectionSchema,
  Translatable,
} from "@/lib/cms/types";

function humanize(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

export function defaultValueForField(schema: FieldSchema): unknown {
  if (schema === "text" || schema === "textarea") return { en: "", ar: "", fr: "" };
  if (schema === "icon" || schema === "link") return "";
  if (schema === "number") return 0;
  if (schema === "image") return { url: "", mediaId: null, alt: { en: "", ar: "", fr: "" } };
  if (schema === "video") return { url: "", mediaId: null };
  if (schema === "button") return { label: { en: "", ar: "", fr: "" }, href: "" };
  if (schema === "articleRefs" || schema === "reviewRefs") return [];
  if (typeof schema === "object" && schema.type === "array") return [];
  return null;
}

export function defaultItemFor(itemSchema: SectionSchema): Record<string, unknown> {
  const item: Record<string, unknown> = { id: crypto.randomUUID() };
  for (const key of Object.keys(itemSchema)) {
    item[key] = defaultValueForField(itemSchema[key]!);
  }
  return item;
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-slate-600 mb-1">{children}</label>;
}

function UploadButton({ accept, onUploaded }: { accept: string; onUploaded: (u: { url: string; mediaId: string }) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const uploaded = await uploadMedia(file);
      onUploaded(uploaded);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input accept={accept} className="hidden" onChange={handleFile} ref={inputRef} type="file" />
      <button
        className="text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-md transition-colors disabled:opacity-60"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        {busy ? "Uploading..." : "Upload / Replace"}
      </button>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

type AvailableItem = { id: string; title: string; imageUrl?: string };

/** Picker for any "refs" field (`articleRefs`, `reviewRefs`, ...): lets an
 * editor choose (and order) which entries of some other page's real
 * collection get featured here. Stores only ids, so editing the original
 * item's title/image/content on its own page is instantly reflected
 * everywhere it's referenced, with nothing to keep in sync manually.
 * `pageSlug`/`sectionKey` say where the source collection lives;
 * `extract` turns one of its raw stored items into a display label
 * (+ optional thumbnail) for this picker - each collection shape differs
 * (articles have images, reviews don't), so the caller decides how to
 * summarize an item rather than this component guessing. */
function CollectionRefField({
  fieldKey,
  value,
  onChange,
  pageSlug,
  sectionKey,
  sourceLabel,
  extract,
}: {
  fieldKey: string;
  value: string[];
  onChange: (value: string[]) => void;
  pageSlug: string;
  sectionKey: string;
  sourceLabel: string;
  extract: (item: Record<string, unknown>) => AvailableItem;
}) {
  const [available, setAvailable] = useState<AvailableItem[] | null>(null);
  const selected = value ?? [];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const supabase = createClient();
      const { data: page } = await supabase.from("pages").select("id").eq("slug", pageSlug).single();
      if (!page) {
        if (!cancelled) setAvailable([]);
        return;
      }
      const { data: section } = await supabase
        .from("page_sections")
        .select("content")
        .eq("page_id", page.id)
        .eq("section_key", sectionKey)
        .single();
      const items = ((section?.content as { items?: unknown[] } | undefined)?.items ?? []) as Record<
        string,
        unknown
      >[];
      if (!cancelled) setAvailable(items.map(extract));
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `extract` is a fresh closure per render by design (callers pass an inline fn); re-running the fetch on identity change would be wasteful and pageSlug/sectionKey are what actually vary
  }, [pageSlug, sectionKey]);

  function toggle(id: string) {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  }
  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= selected.length) return;
    const copy = selected.slice();
    [copy[index], copy[target]] = [copy[target]!, copy[index]!];
    onChange(copy);
  }
  function findItem(id: string) {
    return available?.find((a) => a.id === id);
  }

  return (
    <div className="sm:col-span-2">
      <FieldLabel>
        {humanize(fieldKey)} (featured items - source: {sourceLabel})
      </FieldLabel>
      {available === null ? (
        <p className="text-xs text-slate-400">Loading...</p>
      ) : (
        <>
          {selected.length > 0 && (
            <div className="space-y-2 mb-3">
              {selected.map((id, index) => {
                const item = findItem(id);
                return (
                  <div
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2"
                    key={id}
                  >
                    {item?.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="" className="w-10 h-10 object-cover rounded-md shrink-0" src={item.imageUrl} />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-slate-100 shrink-0" />
                    )}
                    <span className="flex-1 text-sm text-slate-800 truncate">{item?.title ?? id}</span>
                    <button
                      className="text-xs px-2 py-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                      type="button"
                    >
                      ↑
                    </button>
                    <button
                      className="text-xs px-2 py-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                      disabled={index === selected.length - 1}
                      onClick={() => move(index, 1)}
                      type="button"
                    >
                      ↓
                    </button>
                    <button
                      className="text-xs px-2 py-1 rounded hover:bg-red-100 text-red-600"
                      onClick={() => toggle(id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          <details>
            <summary className="text-xs font-medium text-teal-700 cursor-pointer">+ Add an item</summary>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {available
                .filter((a) => !selected.includes(a.id))
                .map((item) => (
                  <button
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 hover:border-teal-400 text-start"
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    type="button"
                  >
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="" className="w-8 h-8 object-cover rounded-md shrink-0" src={item.imageUrl} />
                    ) : (
                      <div className="w-8 h-8 rounded-md bg-slate-100 shrink-0" />
                    )}
                    <span className="text-xs text-slate-700 truncate">{item.title}</span>
                  </button>
                ))}
              {available.length === 0 && <p className="text-xs text-slate-400">No items found.</p>}
            </div>
          </details>
        </>
      )}
    </div>
  );
}

type FieldEditorProps = {
  fieldKey: string;
  schema: FieldSchema;
  value: unknown;
  locale: Locale;
  onChange: (value: unknown) => void;
};

export default function FieldEditor({ fieldKey, schema, value, locale, onChange }: FieldEditorProps) {
  if (schema === "text") {
    const t = (value as Translatable) ?? { en: "", ar: "", fr: "" };
    return (
      <div>
        <FieldLabel>{humanize(fieldKey)}</FieldLabel>
        <input
          className={inputClass}
          onChange={(e) => onChange({ ...t, [locale]: e.target.value })}
          value={t[locale] ?? ""}
        />
      </div>
    );
  }

  if (schema === "textarea") {
    const t = (value as Translatable) ?? { en: "", ar: "", fr: "" };
    return (
      <div>
        <FieldLabel>{humanize(fieldKey)}</FieldLabel>
        <textarea
          className={`${inputClass} min-h-[90px]`}
          onChange={(e) => onChange({ ...t, [locale]: e.target.value })}
          value={t[locale] ?? ""}
        />
      </div>
    );
  }

  if (schema === "icon") {
    const v = (value as string) ?? "";
    return (
      <div>
        <FieldLabel>{humanize(fieldKey)} (Material Symbols name)</FieldLabel>
        <div className="flex items-center gap-3">
          <input className={inputClass} onChange={(e) => onChange(e.target.value)} value={v} />
          <span className="material-symbols-outlined text-2xl text-slate-700 shrink-0">{v || "help"}</span>
        </div>
      </div>
    );
  }

  if (schema === "link") {
    const v = (value as string) ?? "";
    return (
      <div>
        <FieldLabel>{humanize(fieldKey)} (link)</FieldLabel>
        <input className={inputClass} onChange={(e) => onChange(e.target.value)} placeholder="/contact, https://..., tel:..." value={v} />
      </div>
    );
  }

  if (schema === "number") {
    const v = (value as number) ?? 0;
    return (
      <div>
        <FieldLabel>{humanize(fieldKey)}</FieldLabel>
        <input
          className={inputClass}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          type="number"
          value={v}
        />
      </div>
    );
  }

  if (schema === "image") {
    const v = (value as ImageValue) ?? { url: "", mediaId: null, alt: { en: "", ar: "", fr: "" } };
    return (
      <div>
        <FieldLabel>{humanize(fieldKey)} (image)</FieldLabel>
        <div className="flex items-start gap-3 mb-2">
          {v.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" className="w-24 h-24 object-cover rounded-lg border border-slate-200 shrink-0" src={v.url} />
          ) : (
            <div className="w-24 h-24 rounded-lg border border-dashed border-slate-300 shrink-0 flex items-center justify-center text-slate-300 text-xs">
              none
            </div>
          )}
          <UploadButton
            accept="image/*"
            onUploaded={(u) => onChange({ ...v, url: u.url, mediaId: u.mediaId })}
          />
        </div>
        <input
          className={inputClass}
          onChange={(e) => onChange({ ...v, alt: { ...v.alt, [locale]: e.target.value } })}
          placeholder="Alt text"
          value={v.alt?.[locale] ?? ""}
        />
      </div>
    );
  }

  if (schema === "video") {
    const v = (value as { url: string; mediaId: string | null }) ?? { url: "", mediaId: null };
    return (
      <div>
        <FieldLabel>{humanize(fieldKey)} (video)</FieldLabel>
        <div className="flex items-center gap-3">
          {v.url ? (
            <video className="w-32 h-20 object-cover rounded-lg border border-slate-200 shrink-0" controls src={v.url} />
          ) : (
            <div className="w-32 h-20 rounded-lg border border-dashed border-slate-300 shrink-0 flex items-center justify-center text-slate-300 text-xs">
              none
            </div>
          )}
          <UploadButton accept="video/*" onUploaded={(u) => onChange({ url: u.url, mediaId: u.mediaId })} />
        </div>
      </div>
    );
  }

  if (schema === "button") {
    const v = (value as ButtonValue) ?? { label: { en: "", ar: "", fr: "" }, href: "" };
    return (
      <div className="space-y-2">
        <FieldLabel>{humanize(fieldKey)} (button)</FieldLabel>
        <input
          className={inputClass}
          onChange={(e) => onChange({ ...v, label: { ...v.label, [locale]: e.target.value } })}
          placeholder="Label"
          value={v.label?.[locale] ?? ""}
        />
        <input
          className={inputClass}
          onChange={(e) => onChange({ ...v, href: e.target.value })}
          placeholder="Link (/contact, https://..., tel:...)"
          value={v.href ?? ""}
        />
      </div>
    );
  }

  if (schema === "articleRefs") {
    return (
      <CollectionRefField
        extract={(item) => ({
          id: item.id as string,
          title: ((item.title as Translatable | undefined)?.en as string) || (item.id as string),
          imageUrl: (item.image as ImageValue | undefined)?.url,
        })}
        fieldKey={fieldKey}
        onChange={onChange}
        pageSlug="articles"
        sectionKey="grid"
        sourceLabel="Articles page"
        value={(value as string[]) ?? []}
      />
    );
  }

  if (schema === "reviewRefs") {
    return (
      <CollectionRefField
        extract={(item) => {
          const name = ((item.name as Translatable | undefined)?.en as string) || (item.id as string);
          const quote = ((item.quote as Translatable | undefined)?.en as string) || "";
          const snippet = quote.length > 40 ? `${quote.slice(0, 40)}...` : quote;
          return { id: item.id as string, title: snippet ? `${name} - "${snippet}"` : name };
        }}
        fieldKey={fieldKey}
        onChange={onChange}
        pageSlug="reviews"
        sectionKey="gallery"
        sourceLabel="Reviews page"
        value={(value as string[]) ?? []}
      />
    );
  }

  if (typeof schema === "object" && schema.type === "array") {
    const items = (value as Record<string, unknown>[]) ?? [];
    const updateItem = (index: number, next: Record<string, unknown>) => {
      const copy = items.slice();
      copy[index] = next;
      onChange(copy);
    };
    const move = (index: number, dir: -1 | 1) => {
      const target = index + dir;
      if (target < 0 || target >= items.length) return;
      const copy = items.slice();
      [copy[index], copy[target]] = [copy[target]!, copy[index]!];
      onChange(copy);
    };
    const remove = (index: number) => {
      onChange(items.filter((_, i) => i !== index));
    };
    const add = () => {
      onChange([...items, defaultItemFor(schema.itemSchema)]);
    };

    return (
      <div>
        <FieldLabel>
          {humanize(fieldKey)} ({items.length})
        </FieldLabel>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={(item.id as string) ?? index} className="rounded-lg border border-slate-200 p-3 bg-slate-50/60">
              <div className="flex items-center justify-end gap-1 mb-2">
                <button
                  className="text-xs px-2 py-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  type="button"
                >
                  ↑
                </button>
                <button
                  className="text-xs px-2 py-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                  disabled={index === items.length - 1}
                  onClick={() => move(index, 1)}
                  type="button"
                >
                  ↓
                </button>
                <button
                  className="text-xs px-2 py-1 rounded hover:bg-red-100 text-red-600"
                  onClick={() => remove(index)}
                  type="button"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.keys(schema.itemSchema).map((itemKey) => (
                  <FieldEditor
                    fieldKey={itemKey}
                    key={itemKey}
                    locale={locale}
                    onChange={(v) => updateItem(index, { ...item, [itemKey]: v })}
                    schema={schema.itemSchema[itemKey]!}
                    value={item[itemKey]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-3 text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-md transition-colors"
          onClick={add}
          type="button"
        >
          + Add item
        </button>
      </div>
    );
  }

  return null;
}

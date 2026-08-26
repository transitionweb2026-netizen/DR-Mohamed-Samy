"use client";

import { useRef, useState } from "react";
import { uploadMedia } from "@/lib/cms/media-client";
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

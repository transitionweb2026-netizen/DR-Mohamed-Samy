"use client";

import { useRef, useState } from "react";
import { uploadMedia } from "@/lib/cms/media-client";
import { LOCALES, type Locale } from "@/lib/cms/types";
import type { SeoFormValues } from "@/app/admin/(dashboard)/pages/[slug]/seo/actions";

const LOCALE_LABEL: Record<Locale, string> = { en: "English", ar: "العربية", fr: "Français" };

type ImageRef = { id: string | null; url: string | null };
export type SeoLocaleData = SeoFormValues & { og_image_url: string | null; twitter_image_url: string | null };

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

function ImagePicker({ image, onChange, accept = "image/*" }: { image: ImageRef; onChange: (i: ImageRef) => void; accept?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const uploaded = await uploadMedia(file);
      onChange({ id: uploaded.mediaId, url: uploaded.url });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {image.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="" className="w-16 h-16 object-cover rounded-lg border border-slate-200" src={image.url} />
      ) : (
        <div className="w-16 h-16 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-300 text-[10px]">
          none
        </div>
      )}
      <input accept={accept} className="hidden" onChange={handleFile} ref={inputRef} type="file" />
      <button
        className="text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-md transition-colors disabled:opacity-60"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        {busy ? "Uploading..." : "Upload / Replace"}
      </button>
    </div>
  );
}

export default function SeoForm({
  pageId,
  slug,
  path,
  initial,
  onSave,
}: {
  pageId: string;
  slug: string;
  path: string | null;
  initial: Record<Locale, SeoLocaleData>;
  onSave: (
    pageId: string,
    slug: string,
    path: string | null,
    locale: Locale,
    values: SeoFormValues,
  ) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [data, setData] = useState(initial);
  const [locale, setLocale] = useState<Locale>("en");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const current = data[locale];

  function update(patch: Partial<SeoLocaleData>) {
    setData((prev) => ({ ...prev, [locale]: { ...prev[locale], ...patch } }));
    setStatus("idle");
  }

  async function handleSave() {
    setStatus("saving");
    setError(null);
    const values: SeoFormValues = {
      seo_title: current.seo_title,
      meta_description: current.meta_description,
      canonical_url: current.canonical_url,
      og_title: current.og_title,
      og_description: current.og_description,
      og_image_id: current.og_image_id,
      twitter_title: current.twitter_title,
      twitter_description: current.twitter_description,
      twitter_image_id: current.twitter_image_id,
      robots_index: current.robots_index,
      robots_follow: current.robots_follow,
      structured_data: current.structured_data,
    };
    const result = await onSave(pageId, slug, path, locale, values);
    if (result.ok) {
      setStatus("saved");
    } else {
      setStatus("error");
      setError(result.error ?? "Save failed.");
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        {LOCALES.map((loc) => (
          <button
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
              loc === locale ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            key={loc}
            onClick={() => setLocale(loc)}
            type="button"
          >
            {LOCALE_LABEL[loc]}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        <Field label="SEO title">
          <input className={inputClass} onChange={(e) => update({ seo_title: e.target.value })} value={current.seo_title} />
        </Field>
        <Field label="Meta description">
          <textarea
            className={`${inputClass} min-h-[80px]`}
            onChange={(e) => update({ meta_description: e.target.value })}
            value={current.meta_description}
          />
        </Field>
        <Field label="Canonical URL">
          <input className={inputClass} onChange={(e) => update({ canonical_url: e.target.value })} value={current.canonical_url} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          <Field label="OG title">
            <input className={inputClass} onChange={(e) => update({ og_title: e.target.value })} value={current.og_title} />
          </Field>
          <Field label="OG description">
            <input className={inputClass} onChange={(e) => update({ og_description: e.target.value })} value={current.og_description} />
          </Field>
        </div>
        <Field label="OG image">
          <ImagePicker
            image={{ id: current.og_image_id, url: current.og_image_url }}
            onChange={(i) => update({ og_image_id: i.id, og_image_url: i.url })}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          <Field label="Twitter title">
            <input className={inputClass} onChange={(e) => update({ twitter_title: e.target.value })} value={current.twitter_title} />
          </Field>
          <Field label="Twitter description">
            <input
              className={inputClass}
              onChange={(e) => update({ twitter_description: e.target.value })}
              value={current.twitter_description}
            />
          </Field>
        </div>
        <Field label="Twitter image">
          <ImagePicker
            image={{ id: current.twitter_image_id, url: current.twitter_image_url }}
            onChange={(i) => update({ twitter_image_id: i.id, twitter_image_url: i.url })}
          />
        </Field>

        <div className="flex items-center gap-6 pt-2 border-t border-slate-100">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              checked={current.robots_index}
              onChange={(e) => update({ robots_index: e.target.checked })}
              type="checkbox"
            />
            Indexable
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              checked={current.robots_follow}
              onChange={(e) => update({ robots_follow: e.target.checked })}
              type="checkbox"
            />
            Follow links
          </label>
        </div>

        <Field label="Structured data (JSON-LD, optional)">
          <textarea
            className={`${inputClass} min-h-[120px] font-mono text-xs`}
            onChange={(e) => update({ structured_data: e.target.value })}
            placeholder='{"@context": "https://schema.org", "@type": "MedicalOrganization", ...}'
            value={current.structured_data}
          />
        </Field>
      </div>

      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
        <button
          className="text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
          disabled={status === "saving"}
          onClick={handleSave}
          type="button"
        >
          {status === "saving" ? "Saving..." : "Save SEO"}
        </button>
        {status === "saved" && <span className="text-sm text-teal-700">Saved — live on the site now.</span>}
        {status === "error" && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
}

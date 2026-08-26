"use client";

import { useState } from "react";
import FieldEditor from "./FieldEditor";
import { LOCALES, type Locale, type SectionSchema } from "@/lib/cms/types";

const LOCALE_LABEL: Record<Locale, string> = { en: "English", ar: "العربية", fr: "Français" };

export default function SectionCard({
  sectionId,
  label,
  schema,
  initialContent,
  onSave,
}: {
  sectionId: string;
  label: string;
  schema: SectionSchema;
  initialContent: Record<string, unknown>;
  onSave: (sectionId: string, content: Record<string, unknown>) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [content, setContent] = useState<Record<string, unknown>>(initialContent);
  const [locale, setLocale] = useState<Locale>("en");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  function updateField(key: string, value: unknown) {
    setContent((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  async function handleSave() {
    setStatus("saving");
    setError(null);
    const result = await onSave(sectionId, content);
    if (result.ok) {
      setStatus("saved");
      setTimeout(() => setStatus((s) => (s === "saved" ? "idle" : s)), 2500);
    } else {
      setStatus("error");
      setError(result.error ?? "Save failed.");
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span className="font-medium text-slate-900">{label}</span>
        <span className="text-slate-400 text-sm">{open ? "Hide" : "Edit"}</span>
      </button>
      {open && (
        <div className="border-t border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.keys(schema).map((key) => (
              <FieldEditor
                fieldKey={key}
                key={key}
                locale={locale}
                onChange={(v) => updateField(key, v)}
                schema={schema[key]!}
                value={content[key]}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
            <button
              className="text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
              disabled={status === "saving"}
              onClick={handleSave}
              type="button"
            >
              {status === "saving" ? "Saving..." : "Save section"}
            </button>
            {status === "saved" && <span className="text-sm text-teal-700">Saved — live on the site now.</span>}
            {status === "error" && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

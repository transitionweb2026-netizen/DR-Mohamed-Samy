import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/cms/auth";
import SectionCard from "@/components/admin/SectionCard";
import { getSectionHistory, restoreSectionVersion, saveSectionContent } from "./actions";
import type { SectionSchema } from "@/lib/cms/types";

export default async function PageEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await requireUser();
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("pages")
    .select("id, slug, path, label")
    .eq("slug", slug)
    .single();
  if (!page) notFound();

  const { data: sections } = await supabase
    .from("page_sections")
    .select("id, section_key, label, sort_order, schema, content")
    .eq("page_id", page.id)
    .order("sort_order");

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-1">
        <Link className="text-sm text-teal-700 hover:underline" href="/admin">
          ← Back to Pages
        </Link>
        {profile.role === "admin" && page.slug !== "global" && (
          <Link className="text-sm text-teal-700 hover:underline" href={`/admin/pages/${page.slug}/seo`}>
            SEO settings →
          </Link>
        )}
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 mt-2 mb-1">{page.label}</h1>
      <p className="text-sm text-slate-500 mb-8">
        {(sections ?? []).length} section{(sections ?? []).length === 1 ? "" : "s"}. Click one to edit, choose a
        language, and save.
      </p>
      <div className="space-y-3">
        {(sections ?? []).map((section) => (
          <SectionCard
            initialContent={section.content as Record<string, unknown>}
            key={section.id}
            label={section.label}
            onGetHistory={getSectionHistory}
            onRestore={restoreSectionVersion}
            onSave={saveSectionContent}
            schema={section.schema as SectionSchema}
            sectionId={section.id}
          />
        ))}
      </div>
    </div>
  );
}

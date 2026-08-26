import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/cms/auth";
import SeoForm, { type SeoLocaleData } from "@/components/admin/SeoForm";
import { saveSeo } from "./actions";
import { LOCALES, type Locale, type PageSeoRow } from "@/lib/cms/types";

const EMPTY: SeoLocaleData = {
  seo_title: "",
  meta_description: "",
  canonical_url: "",
  og_title: "",
  og_description: "",
  og_image_id: null,
  og_image_url: null,
  twitter_title: "",
  twitter_description: "",
  twitter_image_id: null,
  twitter_image_url: null,
  robots_index: true,
  robots_follow: true,
  structured_data: "",
};

export default async function SeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireAdmin();
  const supabase = await createClient();

  const { data: page } = await supabase.from("pages").select("id, slug, path, label").eq("slug", slug).single();
  if (!page || page.slug === "global") notFound();

  const { data: seoRows } = await supabase
    .from("page_seo")
    .select("*")
    .eq("page_id", page.id);

  const imageIds = Array.from(
    new Set(
      (seoRows ?? []).flatMap((r: PageSeoRow) => [r.og_image_id, r.twitter_image_id]).filter((v): v is string => !!v),
    ),
  );
  const urlById = new Map<string, string>();
  if (imageIds.length > 0) {
    const { data: assets } = await supabase.from("media_assets").select("id, bucket_path").in("id", imageIds);
    for (const asset of assets ?? []) {
      const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(asset.bucket_path);
      urlById.set(asset.id, publicUrl.publicUrl);
    }
  }

  const initial = {} as Record<Locale, SeoLocaleData>;
  for (const locale of LOCALES) {
    const row = (seoRows ?? []).find((r: PageSeoRow) => r.locale === locale);
    initial[locale] = row
      ? {
          seo_title: row.seo_title ?? "",
          meta_description: row.meta_description ?? "",
          canonical_url: row.canonical_url ?? "",
          og_title: row.og_title ?? "",
          og_description: row.og_description ?? "",
          og_image_id: row.og_image_id,
          og_image_url: row.og_image_id ? (urlById.get(row.og_image_id) ?? null) : null,
          twitter_title: row.twitter_title ?? "",
          twitter_description: row.twitter_description ?? "",
          twitter_image_id: row.twitter_image_id,
          twitter_image_url: row.twitter_image_id ? (urlById.get(row.twitter_image_id) ?? null) : null,
          robots_index: row.robots_index,
          robots_follow: row.robots_follow,
          structured_data: row.structured_data ? JSON.stringify(row.structured_data, null, 2) : "",
        }
      : { ...EMPTY };
  }

  return (
    <div className="p-8 max-w-3xl">
      <Link className="text-sm text-teal-700 hover:underline" href={`/admin/pages/${page.slug}`}>
        ← Back to {page.label}
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900 mt-2 mb-1">SEO — {page.label}</h1>
      <p className="text-sm text-slate-500 mb-8">Admin only. One set of fields per language.</p>
      <SeoForm initial={initial} onSave={saveSeo} pageId={page.id} path={page.path} slug={page.slug} />
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/cms/auth";

export default async function PagesListPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: pages } = await supabase
    .from("pages")
    .select("id, slug, path, label, sort_order")
    .neq("slug", "global")
    .order("sort_order");

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">Pages</h1>
      <p className="text-sm text-slate-500 mb-8">
        Each page has its own sections. Open one to edit its content and SEO.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(pages ?? []).map((page) => (
          <Link
            key={page.id}
            className="block bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-400 hover:shadow-sm transition-all"
            href={`/admin/pages/${page.slug}`}
          >
            <p className="font-medium text-slate-900">{page.label}</p>
            <p className="text-sm text-slate-500 mt-1">{page.path === "" ? "/" : page.path}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

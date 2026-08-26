import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/cms/auth";
import MediaLibraryGrid from "@/components/admin/MediaLibraryGrid";
import { deleteMediaAsset } from "./actions";

export default async function MediaPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: assets } = await supabase
    .from("media_assets")
    .select("id, bucket_path, mime_type, original_filename")
    .order("created_at", { ascending: false });

  const items = (assets ?? []).map((asset) => {
    const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(asset.bucket_path);
    return {
      id: asset.id as string,
      url: publicUrl.publicUrl,
      mime_type: asset.mime_type as string | null,
      original_filename: asset.original_filename as string | null,
      bucket_path: asset.bucket_path as string,
    };
  });

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">Media Library</h1>
      <p className="text-sm text-slate-500 mb-8">
        Every image/video uploaded through any page editor also shows up here. Deleting one here removes it
        permanently — only delete files you know aren&apos;t used on a live page.
      </p>
      <MediaLibraryGrid items={items} onDelete={deleteMediaAsset} />
    </div>
  );
}

"use client";

import { createClient } from "@/lib/supabase/client";

export type UploadedMedia = { url: string; mediaId: string };

/** Uploads a file straight from the browser to the "media" Storage bucket
 * (RLS on storage.objects allows this for any signed-in editor/admin), then
 * records it in `media_assets` so it shows up in the Media Library and can
 * be referenced by id from OG/Twitter image pickers. Runs entirely against
 * the anon-key client - no server-role secret is ever exposed to the
 * browser. */
export async function uploadMedia(file: File): Promise<UploadedMedia> {
  const supabase = createClient();
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "";
  const path = `${crypto.randomUUID()}${ext ? `.${ext}` : ""}`;

  const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: asset, error: insertError } = await supabase
    .from("media_assets")
    .insert({
      bucket_path: path,
      mime_type: file.type || null,
      size_bytes: file.size,
      original_filename: file.name,
      uploaded_by: user?.id ?? null,
    })
    .select("id")
    .single();
  if (insertError) throw new Error(insertError.message);

  const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(path);
  return { url: publicUrl.publicUrl, mediaId: asset.id as string };
}

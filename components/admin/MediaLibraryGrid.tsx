"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { uploadMedia } from "@/lib/cms/media-client";

export type MediaAssetItem = {
  id: string;
  url: string;
  mime_type: string | null;
  original_filename: string | null;
  bucket_path: string;
};

export default function MediaLibraryGrid({
  items,
  onDelete,
}: {
  items: MediaAssetItem[];
  onDelete: (id: string, bucketPath: string) => Promise<{ ok: boolean; error?: string }>;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      await uploadMedia(file);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function handleDelete(item: MediaAssetItem) {
    if (!confirm(`Delete "${item.original_filename ?? item.bucket_path}"? This can't be undone.`)) return;
    startTransition(async () => {
      const result = await onDelete(item.id, item.bucket_path);
      if (result.ok) router.refresh();
      else setError(result.error ?? "Delete failed.");
    });
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <input accept="image/*,video/*" className="hidden" onChange={handleUpload} ref={inputRef} type="file" />
        <button
          className="text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          {uploading ? "Uploading..." : "Upload file"}
        </button>
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500">No media uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden group relative" key={item.id}>
              {item.mime_type?.startsWith("video/") ? (
                <video className="w-full aspect-square object-cover" src={item.url} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt={item.original_filename ?? ""} className="w-full aspect-square object-cover" src={item.url} />
              )}
              <div className="p-2">
                <p className="text-xs text-slate-500 truncate">{item.original_filename ?? item.bucket_path}</p>
              </div>
              <button
                className="absolute top-2 right-2 text-xs bg-white/90 hover:bg-red-50 hover:text-red-600 text-slate-600 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-60"
                disabled={isPending}
                onClick={() => handleDelete(item)}
                type="button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

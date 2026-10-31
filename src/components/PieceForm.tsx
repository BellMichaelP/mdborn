"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { refreshSite } from "@/app/admin/actions";
import type { Piece } from "@/lib/pieces";
import { categories, nonprofits, statuses } from "@/lib/site";
import { BUCKET, createBrowserSupabase, publicImageUrl } from "@/lib/supabase-browser";

const MAX_SIDE = 2000;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// Phone photos are often 5 to 10 MB. Shrink them before upload so pages load fast.
async function shrink(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject()), "image/jpeg", 0.85),
    );
  } catch {
    return file;
  }
}

export default function PieceForm({ piece }: { piece?: Piece }) {
  const router = useRouter();
  const [title, setTitle] = useState(piece?.title ?? "");
  const [category, setCategory] = useState(piece?.category ?? categories[0].slug);
  const [description, setDescription] = useState(piece?.description ?? "");
  const [size, setSize] = useState(piece?.size ?? "");
  const [status, setStatus] = useState(piece?.status ?? "available");
  const [nonprofit, setNonprofit] = useState(piece?.nonprofit ?? "");
  const [featured, setFeatured] = useState(piece?.featured ?? true);
  const [images, setImages] = useState<string[]>(piece?.images ?? []);
  const [uploading, setUploading] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const supabase = createBrowserSupabase();

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setError("");
    setUploading(files.length);
    const added: string[] = [];
    for (const file of Array.from(files)) {
      const blob = await shrink(file);
      const ext = blob.type === "image/jpeg" ? "jpg" : file.name.split(".").pop() || "jpg";
      const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
        contentType: blob.type || file.type,
        cacheControl: "31536000",
      });
      if (error) {
        setError(`A photo didn't upload: ${error.message}`);
      } else {
        added.push(path);
      }
      setUploading((n) => n - 1);
    }
    setImages((current) => [...current, ...added]);
  }

  function move(index: number, delta: number) {
    setImages((current) => {
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(index + delta, 0, item);
      return next;
    });
  }

  function remove(index: number) {
    setImages((current) => current.filter((_, i) => i !== index));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const row = {
      title: title.trim(),
      category,
      description: description.trim(),
      size: size.trim(),
      status,
      nonprofit: status === "given" ? nonprofit : "",
      featured,
      images,
    };
    let result;
    if (piece) {
      result = await supabase.from("pieces").update(row).eq("id", piece.id);
    } else {
      // Add a short suffix so two pieces with the same title get different web addresses.
      const slug = `${slugify(row.title) || "piece"}-${crypto.randomUUID().slice(0, 4)}`;
      result = await supabase.from("pieces").insert({ ...row, slug });
    }
    if (result.error) {
      setSaving(false);
      setError(`Couldn't save: ${result.error.message}`);
      return;
    }
    await refreshSite();
    router.push("/admin");
    router.refresh();
  }

  async function onDelete() {
    if (!piece || !window.confirm(`Delete "${piece.title}" from the site? This can't be undone.`)) return;
    setSaving(true);
    const { error } = await supabase.from("pieces").delete().eq("id", piece.id);
    if (error) {
      setSaving(false);
      setError(`Couldn't delete: ${error.message}`);
      return;
    }
    const uploaded = piece.images.filter((p) => !p.startsWith("/"));
    if (uploaded.length) await supabase.storage.from(BUCKET).remove(uploaded);
    await refreshSite();
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSave} className="space-y-7 bg-white p-6 md:p-8 rounded shadow-sm ring-1 ring-black/5">
      <section>
        <p className="label">Photos</p>
        <p className="text-sm text-ink/60 mb-3">The first photo is the main one shown in the gallery.</p>
        {images.length > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {images.map((path, i) => (
              <li key={path} className="rounded ring-1 ring-black/10 overflow-hidden">
                <div className="relative aspect-[4/3] bg-cream">
                  <Image src={publicImageUrl(path)} alt="" fill sizes="240px" className="object-cover" />
                  {i === 0 && (
                    <span className="absolute left-2 top-2 bg-navy text-white text-xs px-2 py-1 rounded">Main photo</span>
                  )}
                </div>
                <div className="flex text-sm">
                  <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="flex-1 py-2 hover:bg-cream disabled:opacity-30">
                    ← Move
                  </button>
                  <button type="button" onClick={() => remove(i)} className="flex-1 py-2 text-flag hover:bg-cream">
                    Remove
                  </button>
                  <button type="button" disabled={i === images.length - 1} onClick={() => move(i, 1)} className="flex-1 py-2 hover:bg-cream disabled:opacity-30">
                    Move →
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <label className="btn btn-outline text-navy cursor-pointer">
          {uploading > 0 ? `Uploading ${uploading} photo${uploading === 1 ? "" : "s"}…` : "+ Add Photos"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            disabled={uploading > 0}
            onChange={(e) => {
              onFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </section>

      <div>
        <label className="label" htmlFor="title">Name of the piece</label>
        <input id="title" className="field" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Example: Maryland Flag Tile Table" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="category">Type</label>
          <select id="category" className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="status">Status</label>
          <select id="status" className="field" value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {status === "given" && (
        <div>
          <label className="label" htmlFor="nonprofit">Which group received the donation? (optional)</label>
          <select id="nonprofit" className="field" value={nonprofit} onChange={(e) => setNonprofit(e.target.value)}>
            <option value="">Don&apos;t show</option>
            {nonprofits.map((n) => (
              <option key={n.name} value={n.name}>{n.name}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="label" htmlFor="description">Description</label>
        <textarea id="description" className="field min-h-36" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Materials, how it was made, the story behind it…" />
      </div>

      <div>
        <label className="label" htmlFor="size">Size (optional)</label>
        <input id="size" className="field" value={size} onChange={(e) => setSize(e.target.value)} placeholder='Example: 36" x 24"' />
      </div>

      <label className="flex items-center gap-3 text-lg">
        <input type="checkbox" className="h-5 w-5" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        Show on the home page
      </label>

      {error && <p className="text-flag font-semibold">{error}</p>}

      <div className="flex flex-wrap gap-4 items-center pt-2">
        <button className="btn btn-red" disabled={saving || uploading > 0}>
          {saving ? "Saving…" : piece ? "Save Changes" : "Add to Site"}
        </button>
        <button type="button" onClick={() => router.push("/admin")} className="btn btn-outline text-navy">
          Cancel
        </button>
        {piece && (
          <button type="button" onClick={onDelete} disabled={saving} className="ml-auto text-flag underline">
            Delete this piece
          </button>
        )}
      </div>
    </form>
  );
}

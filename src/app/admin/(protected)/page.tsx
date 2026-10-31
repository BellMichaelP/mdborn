import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/PieceCard";
import { getPieces } from "@/lib/pieces";
import { categoryLabel } from "@/lib/site";
import { publicImageUrl } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const pieces = await getPieces();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl text-navy">Your pieces</h1>
        <Link href="/admin/new" className="btn btn-red">+ Add a New Piece</Link>
      </div>
      {pieces.length === 0 ? (
        <p className="mt-10 text-lg">No pieces yet. Click &ldquo;Add a New Piece&rdquo; to put your first one on the site.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {pieces.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/edit/${p.id}`}
                className="flex gap-4 items-center bg-white p-4 rounded ring-1 ring-black/5 hover:ring-brass"
              >
                <div className="relative h-20 w-24 shrink-0 bg-cream rounded overflow-hidden">
                  {p.images[0] && (
                    <Image src={publicImageUrl(p.images[0])} alt="" fill sizes="96px" className="object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg text-navy truncate">{p.title}</p>
                  <p className="text-sm text-ink/60">
                    {categoryLabel(p.category)} · {p.images.length} photo{p.images.length === 1 ? "" : "s"}
                    {p.featured ? " · On home page" : ""}
                  </p>
                </div>
                <StatusBadge status={p.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

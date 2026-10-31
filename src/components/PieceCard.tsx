import Image from "next/image";
import Link from "next/link";
import type { Piece } from "@/lib/pieces";
import { categoryLabel, statusLabel } from "@/lib/site";
import { publicImageUrl } from "@/lib/supabase-browser";

const badgeColors: Record<string, string> = {
  available: "bg-flag text-white",
  given: "bg-navy text-white",
  "in-progress": "bg-brass text-white",
  display: "bg-ink/80 text-white",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-sm px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${badgeColors[status] ?? "bg-ink text-white"}`}
    >
      {statusLabel(status)}
    </span>
  );
}

export default function PieceCard({ piece }: { piece: Piece }) {
  const cover = piece.images[0];
  return (
    <Link
      href={`/gallery/${piece.slug}`}
      className="group block bg-white rounded shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[4/3] bg-cream">
        {cover ? (
          <Image
            src={publicImageUrl(cover)}
            alt={piece.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-ink/40">Photo coming soon</div>
        )}
        <div className="absolute left-3 top-3">
          <StatusBadge status={piece.status} />
        </div>
      </div>
      <div className="p-5">
        <p className="eyebrow">{categoryLabel(piece.category)}</p>
        <h3 className="mt-1 text-xl text-navy group-hover:text-flag">{piece.title}</h3>
        {piece.description && <p className="mt-2 text-ink/75 line-clamp-2">{piece.description}</p>}
      </div>
    </Link>
  );
}

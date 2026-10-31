import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PieceGallery from "@/components/PieceGallery";
import { StatusBadge } from "@/components/PieceCard";
import { getPiece } from "@/lib/pieces";
import { categoryLabel } from "@/lib/site";
import { publicImageUrl } from "@/lib/supabase";

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const piece = await getPiece(slug);
  return { title: piece?.title ?? "Piece not found", description: piece?.description };
}

export default async function PiecePage({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const piece = await getPiece(slug);
  if (!piece) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/gallery" className="text-flag font-semibold hover:underline">← Back to gallery</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <PieceGallery title={piece.title} images={piece.images.map(publicImageUrl)} />
        <div>
          <p className="eyebrow">{categoryLabel(piece.category)}</p>
          <h1 className="mt-2 text-3xl md:text-4xl text-navy">{piece.title}</h1>
          <div className="mt-4">
            <StatusBadge status={piece.status} />
          </div>
          {piece.description && (
            <p className="mt-6 text-ink/85 leading-relaxed whitespace-pre-line">{piece.description}</p>
          )}
          {piece.size && (
            <p className="mt-4">
              <strong>Size:</strong> {piece.size}
            </p>
          )}
          {piece.status === "given" && piece.nonprofit && (
            <p className="mt-4">
              <strong>Donation went to:</strong> {piece.nonprofit}
            </p>
          )}
          {piece.status === "available" ? (
            <div className="mt-8 rounded bg-cream p-6 ring-1 ring-black/5">
              <p className="font-display text-xl text-navy">Want this piece?</p>
              <p className="mt-2 text-ink/80">
                Make a donation to one of the veterans groups, then reach out so we can arrange getting it to you.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/nonprofits" className="btn btn-red">Choose a Group</Link>
                <Link href={`/contact?piece=${encodeURIComponent(piece.title)}`} className="btn btn-outline text-navy">
                  Ask About It
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded bg-cream p-6 ring-1 ring-black/5">
              <p className="text-ink/80">
                Like this one? I can make something similar for a donation to a veterans group.
              </p>
              <Link href="/contact" className="btn btn-red mt-4">Get in Touch</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

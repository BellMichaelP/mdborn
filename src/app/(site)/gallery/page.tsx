import type { Metadata } from "next";
import Link from "next/link";
import PieceCard from "@/components/PieceCard";
import { getPieces } from "@/lib/pieces";
import { categories, categoryLabel } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage({ searchParams }: PageProps<"/gallery">) {
  const { category } = await searchParams;
  const active = typeof category === "string" ? category : undefined;
  const pieces = await getPieces({ category: active });

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Gallery</p>
      <h1 className="mt-2 text-4xl text-navy">{active ? categoryLabel(active) : "All Work"}</h1>
      <p className="mt-4 text-ink/75 max-w-2xl">
        Pieces marked <strong>available</strong> can be yours in thanks for a donation to a veterans group. The rest
        have already found homes, or are still in the workshop.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <FilterLink href="/gallery" active={!active}>All</FilterLink>
        {categories.map((c) => (
          <FilterLink key={c.slug} href={`/gallery?category=${c.slug}`} active={active === c.slug}>
            {c.label}
          </FilterLink>
        ))}
      </div>

      {pieces.length === 0 ? (
        <p className="mt-12 text-ink/60">No pieces here yet. Check back soon.</p>
      ) : (
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((p) => (
            <PieceCard key={p.id} piece={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-5 py-2 font-semibold border ${
        active ? "bg-navy text-white border-navy" : "border-navy/25 text-navy hover:border-navy"
      }`}
    >
      {children}
    </Link>
  );
}

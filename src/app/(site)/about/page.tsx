import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About the Artist" };

// TODO(Michael): replace with your own story and add a photo of you in the workshop.
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">About the Artist</p>
      <h1 className="mt-2 text-4xl text-navy">{site.artist}</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
        <p>
          I was born and raised in Maryland, and I&apos;ve spent my life around people who served. Making flags by hand
          is my way of saying thank you.
        </p>
        <p>
          My shotgun shell flags are built from spent shells, sorted by color and set row by row to form the stripes
          and the field of stars. My tile tables lay out the American and Maryland flags in hand-cut tile on solid wood.
          Each piece takes many hours, and no two are exactly alike.
        </p>
        <p>
          I don&apos;t sell my work. When someone makes a donation to one of the veterans groups I support, I give
          them a piece in thanks. Every dollar goes straight to the veterans group.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/gallery" className="btn btn-red">See My Work</Link>
        <Link href="/how-it-works" className="btn btn-outline text-navy">How It Works</Link>
      </div>
    </div>
  );
}

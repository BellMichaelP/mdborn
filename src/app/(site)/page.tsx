import Image from "next/image";
import Link from "next/link";
import PieceCard from "@/components/PieceCard";
import { getPieces } from "@/lib/pieces";
import { categories, nonprofits, site } from "@/lib/site";
import { publicImageUrl } from "@/lib/supabase";

export const revalidate = 60;

export default async function HomePage() {
  const featured = (await getPieces({ featuredOnly: true })).slice(0, 6);
  const heroPiece = featured[0];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        {heroPiece?.images[0] && (
          <Image
            src={publicImageUrl(heroPiece.images[0])}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
          {/* Sponsor corner: Federal Top Gun Patriot box and Federal logo */}
          <div className="mb-10 flex w-40 flex-col items-center rounded bg-white p-3 text-center shadow-lg lg:absolute lg:right-5 lg:top-8 lg:mb-0 lg:w-52">
            <Image
              src="/brand/federal-logo.jpg"
              alt="Federal Ammunition"
              width={332}
              height={54}
              className="h-auto w-full"
            />
            <Image
              src="/brand/federal-top-gun-patriot-box.jpg"
              alt="Box of Federal Top Gun red, white, and blue Patriot shotgun shells"
              width={1024}
              height={600}
              className="mt-2 h-auto w-full"
            />
            <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-wider text-navy">
              Built with Federal Top Gun Patriot shells
            </p>
          </div>
          <p className="eyebrow">Handmade in Maryland</p>
          <h1 className="mt-4 text-4xl md:text-6xl leading-tight max-w-3xl">
            Flag art made by hand, given in thanks to those who give to veterans.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl">
            Shotgun shell flags and tile flag tables. None of it is for sale. Make a donation to a veterans group, and a
            piece can be yours.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/gallery" className="btn btn-red">See the Gallery</Link>
            <Link href="/how-it-works" className="btn btn-outline">How It Works</Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-5 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="eyebrow">Meet the Artist</p>
          <h2 className="mt-3 text-3xl md:text-4xl text-navy">Every piece starts with a flag and a cause.</h2>
          <p className="mt-5 text-ink/80 leading-relaxed">
            I&apos;m {site.artist}. I build American and Maryland flags out of spent shotgun shells and hand-set tile.
            I don&apos;t sell my work. Instead, each piece goes to someone who makes a gift to one of the veterans
            organizations I support.
          </p>
          <Link href="/about" className="btn btn-red mt-7">Read More</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          {categories.slice(0, 2).map((c) => (
            <Link
              key={c.slug}
              href={`/gallery?category=${c.slug}`}
              className="col-span-2 sm:col-span-1 rounded bg-cream p-7 ring-1 ring-black/5 hover:ring-brass"
            >
              <p className="font-display text-xl text-navy">{c.label}</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-flag font-semibold">View pieces</p>
            </Link>
          ))}
          <Link
            href="/nonprofits"
            className="col-span-2 rounded bg-flag text-white p-7 hover:bg-flag-dark"
          >
            <p className="font-display text-xl">{nonprofits.length} Veterans Groups Supported</p>
            <p className="mt-2 text-sm uppercase tracking-wider font-semibold text-white/85">Meet them</p>
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured Work</p>
              <h2 className="mt-2 text-3xl md:text-4xl text-navy">From the workshop</h2>
            </div>
            <Link href="/gallery" className="font-semibold uppercase tracking-wider text-flag hover:underline">
              Full gallery →
            </Link>
          </div>
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PieceCard key={p.id} piece={p} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow text-center">How It Works</p>
        <h2 className="mt-2 text-3xl md:text-4xl text-navy text-center">Give to veterans. Receive a piece.</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            ["1", "Choose a piece", "Browse the gallery and find a piece marked available."],
            ["2", "Make a donation", "Give directly to one of the four veterans groups. Your money never passes through me."],
            ["3", "Get your piece", "Send me your donation receipt, and we'll arrange pickup or delivery."],
          ].map(([n, title, text]) => (
            <div key={n} className="text-center px-4">
              <div className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-navy text-white font-display text-2xl">
                {n}
              </div>
              <h3 className="mt-4 text-xl text-navy">{title}</h3>
              <p className="mt-2 text-ink/75">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/how-it-works" className="btn btn-red">Learn More</Link>
        </div>
      </section>

      {/* Nonprofits */}
      <section className="bg-navy text-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow">Where Your Gift Goes</p>
          <h2 className="mt-2 text-3xl md:text-4xl">The veterans groups I support</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {nonprofits.map((n) => (
              <a
                key={n.name}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded border border-white/15 p-6 hover:border-brass hover:bg-white/5"
              >
                <h3 className="text-lg">{n.name}</h3>
                <p className="mt-3 text-white/75 text-[0.95rem]">{n.blurb}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-brass">Visit site →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="text-3xl md:text-4xl text-navy">Have a piece in mind?</h2>
        <p className="mt-4 text-lg text-ink/75">
          Ask about an available piece, or ask about a custom flag for a veteran in your life.
        </p>
        <Link href="/contact" className="btn btn-red mt-8">Get in Touch</Link>
      </section>
    </>
  );
}

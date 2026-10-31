import Link from "next/link";
import { nonprofits, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-navy-dark text-white/85 mt-auto">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-white">{site.name}</p>
          <p className="mt-3 text-white/70">{site.tagline}</p>
        </div>
        <div>
          <p className="eyebrow mb-3">Explore</p>
          <ul className="space-y-2">
            <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
            <li><Link href="/about" className="hover:text-white">About the Artist</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Veterans Groups</p>
          <ul className="space-y-2">
            {nonprofits.map((n) => (
              <li key={n.name}>
                <a href={n.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {n.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/55">
        © {new Date().getFullYear()} {site.artist}. Art is never sold. Every piece is given in thanks for a gift to veterans.
      </div>
    </footer>
  );
}

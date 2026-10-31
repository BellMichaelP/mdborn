"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/making-of/socom-flag", label: "Making Of" },
  { href: "/nonprofits", label: "Veterans Groups" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-navy text-white sticky top-0 z-30 shadow">
      <div className="mx-auto max-w-6xl px-5 flex items-center justify-between h-18 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid place-items-center h-11 w-11 rounded-full border-2 border-brass font-display text-lg">
            MD
          </span>
          <span className="font-display text-2xl tracking-wide">{site.name}</span>
        </Link>
        <nav className="hidden md:flex gap-7 text-[0.95rem] font-semibold uppercase tracking-wider">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`py-1 border-b-2 ${active ? "border-flag" : "border-transparent hover:border-brass"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <button
          className="md:hidden text-sm font-semibold uppercase tracking-wider border border-white/40 rounded px-3 py-2"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-white/15 px-5 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-lg border-b border-white/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
      <div className="stripe-rule" />
    </header>
  );
}

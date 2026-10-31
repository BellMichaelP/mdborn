import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-cream flex-1">
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-5 py-4 flex items-center justify-between">
          <Link href="/admin" className="font-display text-xl">MD Born Admin</Link>
          <Link href="/" className="text-white/80 hover:text-white">View site →</Link>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-5 py-10">{children}</div>
    </div>
  );
}

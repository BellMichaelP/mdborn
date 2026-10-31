import type { Metadata } from "next";
import { nonprofits } from "@/lib/site";

export const metadata: Metadata = { title: "Veterans Groups" };

export default function NonprofitsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="eyebrow">Veterans Groups</p>
      <h1 className="mt-2 text-4xl text-navy">Where your donation goes</h1>
      <p className="mt-5 text-lg text-ink/80 max-w-3xl">
        Choose any of these four organizations. You give to them directly on their own website, and they send you the
        receipt.
      </p>
      <div className="mt-10 grid gap-7 md:grid-cols-2">
        {nonprofits.map((n) => (
          <div key={n.name} className="rounded bg-white p-7 ring-1 ring-black/10 shadow-sm flex flex-col">
            <h2 className="text-2xl text-navy">{n.name}</h2>
            <p className="mt-3 text-ink/80 flex-1">{n.blurb}</p>
            <a href={n.url} target="_blank" rel="noopener noreferrer" className="btn btn-red mt-6 self-start">
              Visit and Donate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

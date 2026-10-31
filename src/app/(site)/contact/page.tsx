import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { piece } = await searchParams;
  const subject = typeof piece === "string" ? `Question about "${piece}"` : "Question about your flag art";
  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}`;

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-2 text-4xl text-navy">Get in touch</h1>
      <p className="mt-5 text-lg text-ink/80">
        Ask about an available piece, send your donation receipt, or ask about a custom flag for a veteran in your life.
      </p>
      <div className="mt-10 rounded bg-cream p-8 ring-1 ring-black/5">
        <p className="font-semibold">Email</p>
        <a href={mailto} className="mt-1 block text-2xl text-flag font-display break-all hover:underline">
          {site.contactEmail}
        </a>
        <a href={mailto} className="btn btn-red mt-6">Send an Email</a>
      </div>
    </div>
  );
}

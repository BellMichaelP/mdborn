import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "How It Works" };

const steps = [
  {
    title: "Find a piece you love",
    text: "Browse the gallery. Pieces marked “Available for a donation” are ready to go to a new home.",
  },
  {
    title: "Reach out",
    text: "Contact me about the piece you want. I'll tell you the suggested donation and answer any questions.",
  },
  {
    title: "Donate to a veterans group",
    text: "Give directly to one of the four veterans groups on this site, on their own website. Your money never passes through me.",
  },
  {
    title: "Send your receipt",
    text: "Forward me the donation receipt the group emails you. Your gift is tax-deductible according to the group's rules.",
  },
  {
    title: "Receive your piece",
    text: "We'll arrange pickup or delivery, and your piece will show in the gallery as given, with the group that received your gift.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">How It Works</p>
      <h1 className="mt-2 text-4xl text-navy">Give to veterans. Receive a piece of art.</h1>
      <p className="mt-5 text-lg text-ink/80">
        None of my art is for sale. Instead, each piece is a thank-you for a donation to a veterans group.
      </p>
      <ol className="mt-10 space-y-8">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-5">
            <span className="shrink-0 grid place-items-center h-12 w-12 rounded-full bg-navy text-white font-display text-xl">
              {i + 1}
            </span>
            <div>
              <h2 className="text-xl text-navy">{s.title}</h2>
              <p className="mt-1 text-ink/80">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/gallery" className="btn btn-red">Browse Available Pieces</Link>
        <Link href="/nonprofits" className="btn btn-outline text-navy">See the Veterans Groups</Link>
      </div>
    </div>
  );
}

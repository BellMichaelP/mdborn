import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About the Artist" };

const sections: { heading?: string; paragraphs: string[] }[] = [
  {
    paragraphs: [
      "I was born and raised in Maryland. My parents met at a dance at the Bainbridge Naval Training Center in Port Deposit. I've liked making things for as long as I can remember, from model rockets as a kid to woodworking in high school.",
      "One day I wandered out to the Montgomery County Airport, walked in, and said I wanted to fly helicopters. They told me, “No, you don't,” and convinced me there was a lot to learn first. Over the next six years I moved up from a Cessna 172 to a turboprop and then a jet. That's when I had the incredible good fortune to be introduced to Veterans Airlift Command, a nonprofit that lets pilots fly injured veterans and their families where they need to go.",
      "I was hooked. I started flying for them in 2011, and by our nation's 250th anniversary in 2026 I had flown more than 250 missions all over the United States. Along the way I've met hundreds of veterans and thousands of amazing people who give their time and fortunes to support them. What an unbelievable group of patriots. Veterans Airlift Command changed my life.",
    ],
  },
  {
    heading: "How the flags began",
    paragraphs: [
      "My main copilot, Mark Hogan, and my frequent friends and copilots Joe Fitzpatrick and Adam Kisielewski (himself a severely injured combat veteran) turn every mission into an adventure. We go places we never would have gone, meet people we never would have met, and do things we never would have done.",
      "On one of those missions I saw a small shotgun shell flag in a simple wood frame. I liked the design and thought I could make one myself. That's how it started. I built on that simple design to make larger flags: flags that wave in 3D, flat flags that look like they're waving, and flags shaped like maps, fish, and other animals. I've also made tile coffee tables and other tables showing the US and Maryland flags.",
      "My shotgun shell flags are built from spent shells, sorted by color and set row by row to form the stripes and the field of stars. My tile tables lay out the American and Maryland flags in hand-cut tile. Each piece takes many hours, and no two are exactly alike.",
    ],
  },
  {
    heading: "Why flags?",
    paragraphs: [
      "America didn't come from a shared ethnicity, religion, or ancient homeland the way many countries did, so we lean on symbols to hold us together. Our flag stands for an idea, liberty and self-government, more than a bloodline, and anyone can sign on to an idea. That's why so many immigrants take to it so strongly.",
      "History made it sacred. “The Star-Spangled Banner” was written about the flag still flying over Fort McHenry in 1814, and the Civil War turned the flag into something soldiers died to protect. The Pledge of Allegiance (1892), Flag Day, and the Flag Code followed, and generations of kids reciting the pledge every morning built a habit most countries don't have. At military funerals a folded flag goes to the family, tying the symbol to personal loss and service.",
      "We fly it everywhere: on porches, at ballgames, on clothing, and in moments like Iwo Jima and the flag raised at Ground Zero after 9/11. People of every political stripe claim it, even when they disagree about what it means. That deep link to service and sacrifice is a big reason flags made from shell casings hit people so hard.",
    ],
  },
  {
    heading: "Shells fired by Purple Heart veterans",
    paragraphs: [
      "A few years ago my buddy Adam suggested the flags would carry even more meaning if we used only shells fired by combat-wounded (Purple Heart) veterans and Gold Star family members. Since then I've donated shells to veterans groups to shoot at their events and send back to me for flags.",
      "The large 3' x 5' flag is made of 1,092 red, white, and blue shell casings, each one fired by a United States Purple Heart recipient, wounded in combat defending freedom around the world. Every shell stands for sacrifice: the battles fought for our nation, and the ongoing pursuit of peace and liberty worldwide.",
      "Recently we were proud to welcome a corporate sponsor. Federal Ammunition makes the Top Gun Patriot red, white, and blue shotgun shells that I prefer for these flags, and Federal has donated thousands of shells to be fired by veterans and returned to be made into flags.",
    ],
  },
  {
    heading: "Where the flags hang",
    paragraphs: [
      "On my third mission in 2011, I had the honor of meeting Brian Mast, now a Congressman. One of these flags was presented to Chairman Mast in recognition of his sacrifice and continued service to our country, and it hangs in his office on Capitol Hill.",
      "A similar flag hangs at the entrance of United States Special Operations Command at MacDill Air Force Base in Tampa, Florida. Over the years I've designed and donated many flags like these to raise awareness and money for veterans' causes.",
      "Through Veterans Airlift Command I also met Adam Kisielewski, the combat-wounded veteran who leads No Person Left Behind Outdoors. NPLB provides outdoor experiences and support services to veterans across the country and around the world.",
    ],
  },
  {
    heading: "These flags are not sold",
    paragraphs: [
      "I'm not a veteran myself, but I've spent much of my life around people who served. Making flags by hand is my way of saying thank you.",
      "These flags are not for sale. They're made to inspire support. If you'd like a piece of your own, I ask that you make a donation of $5,000 or more to one of the veterans groups I support. Every dollar goes straight to that group, and the tax-deductible donation is yours, not mine.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">About the Artist</p>
      <h1 className="mt-2 text-4xl text-navy">{site.artist}</h1>
      <div className="mt-8 text-lg leading-relaxed text-ink/85">
        {sections.map((section, i) => (
          <section key={i} className={i === 0 ? "space-y-5" : "mt-12 space-y-5"}>
            {section.heading && <h2 className="text-2xl text-navy">{section.heading}</h2>}
            {section.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </section>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/gallery" className="btn btn-red">See My Work</Link>
        <Link href="/how-it-works" className="btn btn-outline text-navy">How It Works</Link>
      </div>
    </div>
  );
}

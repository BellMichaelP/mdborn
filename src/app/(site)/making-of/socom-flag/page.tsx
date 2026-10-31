import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Making the 3D SOCOM Flag",
  description:
    "Step by step photos of how the wavy shotgun shell flag with the U.S. Special Operations Command seal was built.",
};

const dir = "/making-of/socom-flag";

// Photos are in build order. Captions only say what the photos show.
const steps = [
  {
    file: "01-img_1882.jpg",
    w: 1600,
    h: 1200,
    title: "The frame",
    caption: "It starts with a frame made from aluminum.",
  },
  {
    file: "02-img_1885.jpg",
    w: 1600,
    h: 1200,
    title: "The metal sheet",
    caption: "A sheet of galvanized metal goes on top of the frame.",
  },
  {
    file: "03-img_1886.jpg",
    w: 1600,
    h: 1200,
    title: "Bending the first curve",
    caption: "The sheet is bent to start the wave.",
  },
  {
    file: "04-img_1893.jpg",
    w: 1200,
    h: 1600,
    title: "Checking the fit",
    caption: "A row of shells is set along the curved edge to check how they follow the wave.",
  },
  {
    file: "05-img_1895.jpg",
    w: 1600,
    h: 1200,
    title: "The wave takes shape",
    caption: "More bends give the sheet its rolling shape.",
  },
  {
    file: "06-img_1896.jpg",
    w: 1200,
    h: 1600,
    title: "From above",
    caption: "The finished wave, seen from overhead.",
  },
  {
    file: "07-img_1898.jpg",
    w: 1600,
    h: 1200,
    title: "Side view",
    caption: "From the side you can see how the wave rises and falls over the frame.",
  },
  {
    file: "08-img_1904.jpg",
    w: 1600,
    h: 1200,
    title: "The first rows of shells",
    caption: "The first rows of blue shells go on, starting in the corner.",
  },
  {
    file: "09-img_1909.jpg",
    w: 1600,
    h: 1200,
    title: "Stripes going on",
    caption: "Row by row, the red and white stripes fill in.",
  },
  {
    file: "10-img_1910.jpg",
    w: 1600,
    h: 1200,
    title: "Every shell in place",
    caption: "All of the shells are on.",
  },
  {
    file: "11-img_1913.jpg",
    w: 1600,
    h: 1200,
    title: "The wave in the stripes",
    caption: "The stripes follow the wave of the metal underneath.",
  },
  {
    file: "12-img_2090.jpg",
    w: 1200,
    h: 1600,
    title: "Stars and seal",
    caption: "White stars and the U.S. Special Operations Command seal are added to the blue field.",
  },
  {
    file: "13-img_2091.jpg",
    w: 850,
    h: 1600,
    title: "Close-up of the seal",
    caption: "A closer look at the seal and stars.",
  },
  {
    file: "14-img_2243.jpg",
    w: 1600,
    h: 1200,
    title: "Finished",
    caption: "The finished flag.",
  },
  {
    file: "15-img_2245.jpg",
    w: 1600,
    h: 1200,
    title: "In 3D",
    caption: "Seen from the side, the flag looks like it is waving.",
  },
  {
    file: "16-img_2247.jpg",
    w: 1600,
    h: 1200,
    title: "At the Wounded Warriors Abilities Ranch event",
    caption: "The finished flag on display at a Wounded Warriors Abilities Ranch event.",
  },
];

export default function SocomFlagMakingOfPage() {
  const hero = steps[13];

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="eyebrow">The Making Of</p>
      <h1 className="mt-2 text-4xl md:text-5xl text-navy">The 3D SOCOM Flag</h1>
      <p className="mt-5 text-lg text-ink/80 max-w-3xl">
        This shotgun shell flag waves. It carries the seal of U.S. Special Operations Command in the blue field. Here
        is how it came together, one step at a time.
      </p>

      <div className="mt-10 overflow-hidden rounded-lg shadow">
        <Image
          src={`${dir}/${hero.file}`}
          alt="The finished 3D SOCOM shotgun shell flag"
          width={hero.w}
          height={hero.h}
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="w-full h-auto"
        />
      </div>

      <h2 className="mt-16 text-3xl text-navy">Storyboard</h2>
      <ol className="mt-8 grid gap-10 sm:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s.file} className="flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-navy/5">
              <Image
                src={`${dir}/${s.file}`}
                alt={s.title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className={s.h > s.w ? "object-contain" : "object-cover"}
              />
            </div>
            <div className="mt-4 flex gap-4">
              <span className="shrink-0 grid place-items-center h-10 w-10 rounded-full bg-navy text-white font-display">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl text-navy">{s.title}</h3>
                <p className="mt-1 text-ink/80">{s.caption}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 flex flex-wrap gap-4">
        <Link href="/gallery" className="btn btn-red">See the Gallery</Link>
        <Link href="/how-it-works" className="btn btn-outline text-navy">How It Works</Link>
      </div>
    </div>
  );
}

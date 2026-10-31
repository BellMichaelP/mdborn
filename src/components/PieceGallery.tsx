"use client";

import Image from "next/image";
import { useState } from "react";

export default function PieceGallery({ title, images }: { title: string; images: string[] }) {
  const [current, setCurrent] = useState(0);
  if (images.length === 0) {
    return <div className="aspect-[4/3] grid place-items-center bg-cream rounded text-ink/50">Photo coming soon</div>;
  }
  return (
    <div>
      <div className="relative aspect-[4/3] bg-cream rounded overflow-hidden">
        <Image
          src={images[current]}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setCurrent(i)}
              className={`relative aspect-square rounded overflow-hidden ring-2 ${i === current ? "ring-flag" : "ring-transparent"}`}
              aria-label={`Show photo ${i + 1}`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

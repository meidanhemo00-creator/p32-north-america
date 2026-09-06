"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { Container } from "@/components/Container";

type GalleryImage = {
  file: string;
  alt: string;
  span?: string;
  bw?: boolean;
  red?: boolean;
};

const IMAGES: GalleryImage[] = [
  { file: "gallery-01.webp", alt: "Undercover operative during an early Duvdevan operation, disguised among civilians", span: "md:row-span-2", bw: true },
  { file: "gallery-02.webp", alt: "Archival photograph of a Duvdevan arrest operation" },
  { file: "gallery-03.webp", alt: "Operator training at night with an anti-tank weapon, identity obscured" },
  { file: "gallery-04.webp", alt: "Duvdevan snipers positioned on a desert ridge", span: "md:col-span-2" },
  { file: "gallery-05.webp", alt: "A masked Duvdevan team preparing for an operation with a reconnaissance drone" },
  { file: "gallery-06.webp", alt: "Operators moving through a darkened structure during a raid", bw: true },
  { file: "gallery-07.webp", alt: "An operator escorts a detainee through a narrow stairwell, identity obscured", span: "md:row-span-2" },
  { file: "gallery-08.webp", alt: "A commander briefs operators before entering combat, faces obscured", red: true },
  { file: "gallery-09.webp", alt: "The aftermath of the October 7 attack on a border community", bw: true },
  { file: "gallery-10.webp", alt: "An operator prepares an armored vehicle at dusk during the Swords of Iron war" },
  { file: "gallery-11.webp", alt: "An operator and a military working dog rest between operations, faces obscured" },
  { file: "gallery-12.webp", alt: "Operators pack their gear on the ground after a mission, faces obscured", span: "md:col-span-2" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % IMAGES.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  return (
    <section id="gallery" className="ground-dark py-24 md:py-32">
      <Container>
        <div className="mb-14 max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="chapter-bar h-px w-10" />
            <span className="font-display text-xs uppercase tracking-[0.3em] text-red-bright">
              A Glimpse Into the Book
            </span>
          </div>
          <h2 className="font-display text-4xl uppercase leading-[1.08] text-paper sm:text-5xl">
            Photographs From Four Decades
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4 md:gap-4">
          {IMAGES.map((img, i) => (
            <button
              key={img.file}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative aspect-[4/5] w-full overflow-hidden md:aspect-auto ${img.span ?? ""}`}
            >
              <Image
                src={withBasePath(`/photos/duvdevan/gallery/${img.file}`)}
                alt={img.alt}
                fill
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${img.bw ? "grayscale" : ""}`}
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
              {img.red && <div className="absolute inset-0 bg-red/25 mix-blend-multiply" />}
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            </button>
          ))}
        </div>
      </Container>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close image"
            className="absolute right-5 top-5 font-display text-3xl text-paper/80 hover:text-paper"
          >
            &times;
          </button>
          <div className="relative h-full w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={withBasePath(`/photos/duvdevan/gallery/${IMAGES[active].file}`)}
              alt={IMAGES[active].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}

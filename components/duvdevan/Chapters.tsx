"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { Container } from "@/components/Container";

const CHAPTERS = [
  {
    n: "01",
    title: "The Establishment",
    range: "1986–1999",
    img: "ch1-establishment.webp",
    rotate: -6,
  },
  {
    n: "02",
    title: "The Neutralization",
    range: "2000–2002",
    img: "ch2-neutralization.webp",
    rotate: 4,
  },
  {
    n: "03",
    title: "The Evolution",
    range: "2014–2022",
    img: "ch3-evolution.webp",
    rotate: -3,
  },
  {
    n: "04",
    title: "The Precision",
    range: "2022–2023",
    img: "ch4-precision.webp",
    rotate: 5,
  },
  {
    n: "05",
    title: "The Impact",
    range: "October 7 & the Swords of Iron War",
    img: "ch5-impact.webp",
    rotate: -4,
  },
];

export function Chapters() {
  return (
    <section id="story" className="ground-dark relative overflow-hidden py-24 md:py-32">
      <Container>
        <div className="mb-16 max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="chapter-bar h-px w-10" />
            <span className="font-display text-xs uppercase tracking-[0.3em] text-red-bright">
              Forty Years
            </span>
          </div>
          <h2 className="font-display text-4xl uppercase leading-[1.08] text-paper sm:text-5xl">
            Five Chapters of an Unfinished Story
          </h2>
        </div>

        {/* Desktop: slightly rotated cards, photo and label kept in separate
            layers so overlap is purely decorative and never covers a title. */}
        <div className="hidden md:flex md:items-start md:justify-center md:gap-6 md:px-8">
          {CHAPTERS.map((c, i) => (
            <div key={c.n} className="group/card relative w-[18%] shrink-0" style={{ zIndex: CHAPTERS.length - i }}>
              <a
                href="#gallery"
                className="relative block aspect-[3/4] w-full origin-bottom overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition-transform duration-500 ease-out hover:z-20 hover:-translate-y-3 hover:rotate-0 focus:z-20 focus:-translate-y-3 focus:rotate-0"
                style={{ transform: `rotate(${c.rotate}deg)` }}
              >
                <Image
                  src={withBasePath(`/photos/duvdevan/chapters/${c.img}`)}
                  alt={`Photograph representing Chapter ${c.n}: ${c.title}, ${c.range}`}
                  fill
                  className="object-cover grayscale transition-[filter] duration-500 group-hover/card:grayscale-0"
                  sizes="20vw"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover/card:bg-black/0" />
              </a>
              <div className="mt-4 px-1">
                <span className="font-display block text-xl text-red-bright">{c.n}</span>
                <span className="font-display block text-xs uppercase leading-tight text-paper sm:text-sm">
                  {c.title}
                </span>
                <span className="font-body block text-[11px] text-paper/60">{c.range}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:hidden">
          {CHAPTERS.map((c) => (
            <a
              key={c.n}
              href="#gallery"
              className="relative aspect-[3/4] w-[68vw] shrink-0 snap-start overflow-hidden ring-1 ring-white/10"
            >
              <Image
                src={withBasePath(`/photos/duvdevan/chapters/${c.img}`)}
                alt={`Photograph representing Chapter ${c.n}: ${c.title}, ${c.range}`}
                fill
                className="object-cover"
                sizes="70vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="font-display block text-2xl text-red-bright">{c.n}</span>
                <span className="font-display block text-base uppercase leading-tight text-paper">{c.title}</span>
                <span className="font-body block text-xs text-paper/70">{c.range}</span>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-2 text-center font-display text-[10px] uppercase tracking-[0.3em] text-paper/40 md:hidden">
          Swipe to explore all five chapters
        </p>

        <p className="font-body mx-auto mt-16 max-w-2xl text-center text-base leading-relaxed text-paper/70 sm:text-lg">
          Born from operational necessity, the unit continued to evolve with every new
          reality—without losing the bond, responsibility and precision at the heart of
          its identity.
        </p>
      </Container>
    </section>
  );
}

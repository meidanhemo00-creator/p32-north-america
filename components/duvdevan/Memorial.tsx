"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { Container } from "@/components/Container";

type Group = {
  key: string;
  heading: string;
  count: number;
  prefix: string;
  direction: 1 | -1;
};

const GROUPS: Group[] = [
  { key: "fallen", heading: "Fallen of the Duvdevan Unit", count: 31, prefix: "fallen", direction: 1 },
  { key: "wars", heading: "Duvdevan Alumni Who Fell in Israel's Wars", count: 12, prefix: "wars", direction: -1 },
  { key: "terror", heading: "Duvdevan Alumni, Victims of Terror", count: 5, prefix: "terror", direction: 1 },
];

function MemorialRow({ group }: { group: Group }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const el = scrollerRef.current;
    if (!el) return;

    let last = performance.now();
    const speed = 28; // px/sec

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          let next = el.scrollLeft + group.direction * speed * dt;
          if (next >= max) next = 0;
          if (next <= 0) next = max;
          el.scrollLeft = next;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [group.direction]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const tiles = Array.from({ length: group.count }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="font-display text-lg uppercase tracking-wide text-paper/90 sm:text-xl">
          {group.heading}
        </h3>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label={`Scroll ${group.heading} left`}
            className="flex h-9 w-9 items-center justify-center border border-paper/25 text-paper/70 transition-colors hover:border-paper hover:text-paper"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label={`Scroll ${group.heading} right`}
            className="flex h-9 w-9 items-center justify-center border border-paper/25 text-paper/70 transition-colors hover:border-paper hover:text-paper"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        tabIndex={-1}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]"
      >
        {tiles.map((n) => (
          <div
            key={n}
            className="relative aspect-[260/440] w-[7.5rem] shrink-0 snap-start overflow-hidden bg-black focus-within:ring-1 focus-within:ring-red-bright sm:w-36"
            tabIndex={0}
          >
            <Image
              src={withBasePath(`/photos/duvdevan/memorial/${group.prefix}-${String(n).padStart(2, "0")}.webp`)}
              alt="Portrait and name of a fallen Duvdevan member, as printed in the book's memorial page"
              fill
              className="object-cover"
              sizes="150px"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Memorial() {
  return (
    <section id="memorial" className="ground-dark relative py-24 md:py-32">
      <Container>
        <div className="mb-14 max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="chapter-bar h-px w-10" />
            <span className="font-display text-xs uppercase tracking-[0.3em] text-red-bright">In Memory</span>
          </div>
          <h2 className="font-display text-4xl uppercase leading-[1.08] text-paper sm:text-5xl">
            In Memory of the Unit&rsquo;s Fallen
          </h2>
          <p className="font-body mt-6 text-base leading-relaxed text-paper/70 sm:text-lg">
            They belong not only to the unit&rsquo;s past. They are part of its identity,
            the path it has taken, and the meaning it continues to carry today.
          </p>
          <p className="font-body mt-3 text-sm text-paper/45">
            Names and ranks are shown exactly as printed in the book&rsquo;s memorial page, in
            their original Hebrew.
          </p>
        </div>

        <div className="flex flex-col gap-14">
          {GROUPS.map((g) => (
            <MemorialRow key={g.key} group={g} />
          ))}
        </div>
      </Container>
    </section>
  );
}

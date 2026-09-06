"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { PURCHASE_URL } from "@/lib/purchase";
import { Container } from "@/components/Container";

export function Hero() {
  const coverRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setTilt({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      {/* Background: dark, blurred, atmospheric alleyway */}
      <div className="absolute inset-0">
        <Image
          src={withBasePath("/photos/duvdevan/cover/hero-alley-bg.webp")}
          alt="An alleyway in the West Bank, photographed during a Duvdevan operation"
          fill
          priority
          className="scale-110 object-cover object-center opacity-45 blur-[2px] motion-safe:animate-[heroSlowScale_28s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/50" />
      </div>

      <Container className="relative z-10 grid items-center gap-12 py-32 md:grid-cols-2 md:py-24">
        {/* Copy */}
        <div className="order-2 md:order-1">
          <p className="font-display mb-5 text-xs uppercase tracking-[0.3em] text-red-bright md:text-sm">
            40 Years of the Duvdevan Unit
          </p>
          <h1 className="font-display text-[2.6rem] leading-[1.05] uppercase text-paper sm:text-6xl md:text-6xl lg:text-[4.2rem]">
            The Untold Story
            <br />
            of the IDF
            <br />
            Counter-Terrorism Unit
          </h1>
          <p className="font-body mt-6 max-w-md text-lg text-paper/80">
            Four decades. One human chain.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={PURCHASE_URL}
              className="font-display bg-red px-7 py-3.5 text-sm uppercase tracking-wider text-paper transition-colors hover:bg-red-bright"
            >
              Purchase the Book
            </a>
            <a
              href="#about"
              className="font-display border border-paper/40 px-7 py-3.5 text-sm uppercase tracking-wider text-paper/90 transition-colors hover:border-paper hover:text-paper"
            >
              Discover the Story
            </a>
          </div>
        </div>

        {/* Book cover mockup */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end" style={{ perspective: "1600px" }}>
          <div
            ref={coverRef}
            className="relative aspect-[210/280] w-56 shrink-0 transition-transform duration-300 ease-out will-change-transform sm:w-72 md:w-[22rem]"
            style={{
              transform: `rotateY(${-18 + tilt.x * 6}deg) rotateX(${6 - tilt.y * 4}deg) rotateZ(-1deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute inset-0 -z-10 translate-x-3 translate-y-4 bg-black/70 blur-2xl"
              aria-hidden="true"
            />
            {/* page-block edge for a physical feel */}
            <div
              className="absolute inset-y-1 -right-2 w-2 rounded-r-sm bg-gradient-to-r from-[#d8d3c8] to-[#b8b2a4]"
              style={{ transform: "translateZ(-4px)" }}
              aria-hidden="true"
            />
            <div className="relative h-full w-full overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              <Image
                src={withBasePath("/photos/duvdevan/cover/front-cover.webp")}
                alt={'"217" — 40 Years of the Duvdevan Unit: The Untold Story of the IDF Counter-Terrorism Unit, book cover'}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-10">
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-paper/50">Scroll</span>
          <div className="h-10 w-px overflow-hidden bg-paper/20">
            <div className="h-full w-full origin-top bg-paper/70 motion-safe:animate-[scrollLine_2.2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroSlowScale {
          from { transform: scale(1.1); }
          to { transform: scale(1.18); }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}

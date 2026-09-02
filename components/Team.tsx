"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { SectionImage } from "./SectionImage";
import { Container } from "./Container";

const TAGS = ["Operational Command", "Deep Tech R&D", "Field-Tested", "Multi-Domain"];

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blur = useTransform(scrollYProgress, [0, 0.6], [0, 10]);
  const blurFilter = useTransform(blur, (b) => `blur(${b}px) grayscale(1)`);
  const focusRadius = useTransform(scrollYProgress, [0.1, 0.6], [70, 9]);
  const clip = useTransform(focusRadius, (r) => `circle(${r}% at 62% 55%)`);

  const headOpacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 1]);
  const quoteOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.35, 0.6], [24, 0]);
  const detailOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const detailScale = useTransform(scrollYProgress, [0.5, 0.85], [0.85, 1]);
  const tagsOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  const markScale = useTransform(scrollYProgress, [0.6, 1], [1, 0.06]);
  const markOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 20 });
  const sy = useSpring(py, { stiffness: 40, damping: 20 });
  const driftX = useTransform(sx, (v) => `${v}px`);
  const driftY = useTransform(sy, (v) => `${v}px`);

  function handlePointerMove(e: React.PointerEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    px.set(nx * 26);
    py.set(ny * 26);
  }

  return (
    <section
      id="team"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative h-[190vh] bg-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ filter: blurFilter, x: driftX, y: driftY }} className="absolute inset-[-6%]">
          <SectionImage src="/images/team-crowd.svg" alt="Crowded urban crosswalk at night, one still figure among the blurred crowd" />
        </motion.div>
        <motion.div style={{ clipPath: clip }} className="absolute inset-[-6%]">
          <SectionImage src="/images/team-crowd.svg" alt="" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/20" />

        <Container className="relative flex h-full flex-col justify-between py-24 md:py-28">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-mist">
              05 — A Small Team for Big Challenges
            </p>
            <motion.h2
              style={{ opacity: headOpacity }}
              className="mt-6 font-sans text-6xl font-normal uppercase leading-[0.94] tracking-tight text-paper sm:text-8xl md:text-[7.5vw]"
            >
              The world sees
              <br />
              the outcome.
            </motion.h2>
          </div>

          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <motion.p
              style={{ opacity: quoteOpacity, y: quoteY }}
              className="glass-panel max-w-md rounded-sm p-6 font-mono text-base font-light lowercase leading-relaxed text-mist/90 md:p-7"
            >
              it almost never sees the people who built it. our team combines elite operational
              command experience with decades of proven technological innovation — we come from
              the units that faced these challenges, and bring the track record of scaling ideas
              into successful war capabilities based on advanced technology.
            </motion.p>

            <motion.div
              style={{ opacity: detailOpacity, scale: detailScale }}
              className="relative hidden h-40 w-32 shrink-0 overflow-hidden rounded-sm border border-paper/20 shadow-2xl shadow-black/60 md:block"
            >
              <SectionImage
                src="/images/team-crowd.svg"
                alt=""
                className="grayscale"
                style={{ objectPosition: "62% 58%", transform: "scale(2.4)" }}
              />
              <div className="absolute inset-0 border border-paper/10" />
              <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/70">
                Detail
              </span>
            </motion.div>
          </div>

          <motion.div style={{ opacity: tagsOpacity }} className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.25em] text-mist/60">
            {TAGS.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </motion.div>
        </Container>

        <motion.div
          style={{ scale: markScale, opacity: markOpacity }}
          className="pointer-events-none absolute bottom-14 left-1/2 h-16 w-px -translate-x-1/2 bg-mist"
        />
      </div>
    </section>
  );
}

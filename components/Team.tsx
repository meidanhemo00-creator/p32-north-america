"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { SectionImage } from "./SectionImage";
import { Container } from "./Container";
import { Glow } from "./Glow";
import { SectionLabel } from "./SectionLabel";

const TAGS = ["Operational Command", "Deep Tech R&D", "Field-Tested", "Multi-Domain"];

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blur = useTransform(scrollYProgress, [0, 0.6], [0, 10]);
  const blurFilter = useTransform(blur, (b) => `blur(${b}px) saturate(0.35) contrast(1.1)`);
  const focusRadius = useTransform(scrollYProgress, [0.1, 0.6], [70, 9]);
  const clip = useTransform(focusRadius, (r) => `circle(${r}% at 62% 55%)`);

  const headOpacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 1]);
  const quoteOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const quoteY = useTransform(scrollYProgress, [0.35, 0.6], [24, 0]);
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
      className="ground-dark relative h-[150vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Glow className="left-1/2 top-0 -translate-x-1/2" size={900} />
        <motion.div style={{ filter: blurFilter, x: driftX, y: driftY }} className="absolute inset-[-6%]">
          <SectionImage src="/photos/team-crossing.jpg" alt="Crowded urban crosswalk at night, one still figure among the blurred crowd" />
        </motion.div>
        <motion.div style={{ clipPath: clip }} className="absolute inset-[-6%]">
          <SectionImage src="/photos/team-crossing.jpg" alt="" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/20" />

        <Container className="relative flex h-full flex-col justify-between py-16 md:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <SectionLabel index="05" label="A Small Team for Big Challenges" tone="light" className="mb-6" />
            <motion.h2
              style={{ opacity: headOpacity }}
              className="break-normal font-sans text-[clamp(1.75rem,7.5vw,4.75rem)] font-normal uppercase leading-[0.98] tracking-tight text-paper"
            >
              The world sees
              <br />
              the outcome.
            </motion.h2>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <motion.p
              style={{ opacity: quoteOpacity, y: quoteY }}
              className="glass-panel max-w-md rounded-sm p-6 font-mono text-lg font-light lowercase leading-relaxed text-mist/90 md:p-7"
            >
              it almost never sees the people who built it. our team combines elite operational
              command experience with decades of proven technological innovation — we come from
              the units that faced these challenges, and bring the track record of scaling ideas
              into successful war capabilities based on advanced technology.
            </motion.p>
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

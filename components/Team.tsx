"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { AssetPlaceholder } from "./AssetPlaceholder";

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const blur = useTransform(scrollYProgress, [0, 0.6], [0, 10]);
  const blurFilter = useTransform(blur, (b) => `blur(${b}px) grayscale(1)`);
  const focusRadius = useTransform(scrollYProgress, [0.1, 0.6], [70, 9]);
  const clip = useTransform(focusRadius, (r) => `circle(${r}% at 50% 55%)`);

  const line1Opacity = useTransform(scrollYProgress, [0.15, 0.5], [0.15, 1]);
  const line2Opacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.5, 0.75], [20, 0]);

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
      className="relative h-[200vh] bg-charcoal"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ filter: blurFilter, x: driftX, y: driftY }} className="absolute inset-[-6%]">
          <AssetPlaceholder label="Crowded crosswalk, one still figure among the blur" />
        </motion.div>
        <motion.div style={{ clipPath: clip }} className="absolute inset-[-6%]">
          <AssetPlaceholder label="Same frame, sharp — the still figure" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/60" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center md:px-14">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-mist">
            A Small Team for Big Challenges
          </p>
          <motion.h2
            style={{ opacity: line1Opacity }}
            className="mt-6 max-w-3xl font-sans text-4xl font-bold leading-[1.05] text-paper sm:text-6xl md:text-7xl"
          >
            The world sees the outcome.
          </motion.h2>
          <motion.p
            style={{ opacity: line2Opacity, y: line2Y }}
            className="mt-4 max-w-lg font-mono text-sm font-light lowercase leading-relaxed text-mist/80 md:text-base"
          >
            it almost never sees the people who built it. our team combines elite operational
            command experience with decades of proven technological innovation — we come from the
            units that faced these challenges, and bring the track record of scaling ideas into
            successful war capabilities based on advanced technology.
          </motion.p>
        </div>

        <motion.div
          style={{ scale: markScale, opacity: markOpacity }}
          className="pointer-events-none absolute bottom-14 left-1/2 h-16 w-px -translate-x-1/2 bg-mist"
        />
      </div>
    </section>
  );
}

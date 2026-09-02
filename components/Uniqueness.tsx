"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

export function Uniqueness() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.75], [0, 1]);
  const numeralScale = useTransform(scrollYProgress, [0.75, 1], [0.4, 1]);
  const numeralOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 18 });
  const sy = useSpring(py, { stiffness: 80, damping: 18 });
  const skewX = useTransform(sy, [-1, 1], [-4, 4]);
  const skewY = useTransform(sx, [-1, 1], [3, -3]);

  function handlePointerMove(e: React.PointerEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      id="uniqueness"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative h-[180vh] bg-paper text-navy"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-6 md:px-14">
        <motion.div style={{ opacity: textOpacity }} className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-navy/60">Our Uniqueness</p>
          <h2 className="mt-4 font-sans text-[9vw] font-black uppercase leading-[0.9] sm:text-[6vw] md:text-[4.2vw]">
            An objective,
            <br />
            <span className="font-light normal-case italic">trusted executor.</span>
          </h2>
          <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-navy/70">
            p32 operates without conflict of interest. we manage the entire lifecycle — from
            scouting and development, to integration — to ensure an unfair advantage in the field.
          </p>
        </motion.div>

        <motion.svg
          style={{ skewX, skewY }}
          viewBox="0 0 1200 500"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] w-full opacity-70"
          fill="none"
        >
          <motion.path
            d="M0 420 C 250 420 260 120 480 120 C 620 120 620 320 760 320 C 900 320 900 60 1200 60"
            stroke="#001832"
            strokeWidth="2"
            style={{ pathLength }}
          />
          <motion.path
            d="M0 300 C 220 300 300 400 500 400 C 680 400 700 180 900 180 C 1050 180 1080 340 1200 340"
            stroke="#001832"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            style={{ pathLength }}
          />
        </motion.svg>

        <motion.div
          style={{ scale: numeralScale, opacity: numeralOpacity }}
          className="pointer-events-none absolute bottom-10 right-6 font-mono text-[18vw] font-bold leading-none text-navy/90 md:right-14 md:text-[9vw]"
        >
          01
        </motion.div>
      </div>
    </section>
  );
}

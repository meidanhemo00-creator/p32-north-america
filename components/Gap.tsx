"use client";

import { useRef, useState } from "react";
import { MotionValue, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { SectionImage } from "./SectionImage";

const PROBLEMS = [
  {
    tag: "01",
    title: "An Evolving Technological Landscape",
    body: "Today's tools age fast. What answered yesterday's threat rarely answers tomorrow's.",
    dir: { x: -1, y: -0.4 },
  },
  {
    tag: "02",
    title: "The Friction of Integrating Disparate Systems",
    body: "Best-in-class components rarely speak the same language once they're in the field.",
    dir: { x: 0, y: 1 },
  },
  {
    tag: "03",
    title: "The Extreme Security Risk of the Open Market",
    body: "Exposing operational needs to vendors is, itself, an exposure.",
    dir: { x: 1, y: -0.4 },
  },
];

function GapBlock({
  index,
  tag,
  title,
  body,
  dir,
  scrollYProgress,
  focused,
  setFocused,
}: {
  index: number;
  tag: string;
  title: string;
  body: string;
  dir: { x: number; y: number };
  scrollYProgress: MotionValue<number>;
  focused: number | null;
  setFocused: (i: number | null) => void;
}) {
  const manualOpen = useMotionValue(0);
  const springOpen = useSpring(manualOpen, { stiffness: 200, damping: 24 });
  const dragging = useRef(false);
  const startX = useRef(0);

  const scrollSpread = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  const x = useTransform([scrollSpread, springOpen], (v) => {
    const [s, m] = v as number[];
    return dir.x * (s * 140 + m);
  });
  const y = useTransform([scrollSpread, springOpen], (v) => {
    const [s, m] = v as number[];
    return dir.y * (s * 90 + m * 0.4);
  });
  const opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const isDimmed = focused !== null && focused !== index;

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    startX.current = e.clientX;
    (e.target as Element).setPointerCapture(e.pointerId);
  }
  function onPointerMoveHandler(e: React.PointerEvent) {
    if (!dragging.current) return;
    const delta = (e.clientX - startX.current) * dir.x;
    manualOpen.set(Math.max(0, Math.min(60, delta * 0.6)));
  }
  function onPointerUp() {
    dragging.current = false;
    manualOpen.set(0);
  }

  return (
    <motion.div
      style={{ x, y, opacity }}
      animate={{ scale: isDimmed ? 0.94 : 1, filter: isDimmed ? "brightness(0.55)" : "brightness(1)" }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setFocused(index)}
      onHoverEnd={() => setFocused(null)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMoveHandler}
      onPointerUp={onPointerUp}
      className="group relative w-full max-w-sm cursor-grab touch-pan-y select-none border border-mist/20 bg-navy/70 p-6 backdrop-blur-sm active:cursor-grabbing md:p-8"
    >
      <span className="font-mono text-xs text-mist/60">{tag}</span>
      <h3 className="mt-3 font-sans text-xl font-semibold leading-snug text-paper md:text-2xl">
        {title}
      </h3>
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        whileHover={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.3 }}
        className="mt-3 overflow-hidden font-mono text-sm leading-relaxed text-mist/80 group-focus-within:opacity-100"
      >
        {body}
      </motion.p>
    </motion.div>
  );
}

export function Gap() {
  const sectionRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 0.22]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section id="gap" ref={sectionRef} className="relative h-[220vh] bg-charcoal">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
          <SectionImage src="/images/gap-industrial.svg" alt="Dark industrial ceiling with surveillance domes, claustrophobic warehouse mood" />
        </motion.div>
        <div className="absolute inset-0 bg-charcoal/40" />

        <motion.div style={{ opacity: headOpacity }} className="relative px-6 pt-24 md:px-14 md:pt-28">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-mist">The Gap in Modern Defense</p>
          <h2 className="mt-3 max-w-3xl font-sans text-3xl font-light leading-tight text-paper md:text-5xl">
            Today&apos;s operational challenges are{" "}
            <span className="font-bold uppercase">threefold</span>.
          </h2>
        </motion.div>

        <div className="relative flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-6 pb-16 md:flex-row md:gap-8 md:overflow-visible md:px-14">
          {PROBLEMS.map((problem, i) => (
            <GapBlock
              key={problem.tag}
              index={i}
              {...problem}
              scrollYProgress={scrollYProgress}
              focused={focused}
              setFocused={setFocused}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

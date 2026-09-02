"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { SectionImage } from "./SectionImage";
import { Container } from "./Container";

const PROBLEMS = [
  {
    tag: "01",
    title: "An Evolving Technological Landscape",
    body: "Today's tools age fast. What answered yesterday's threat rarely answers tomorrow's.",
    dir: { x: -1, y: -0.4 },
    rotate: -4,
    tone: "dark" as const,
  },
  {
    tag: "02",
    title: "The Friction of Integrating Disparate Systems",
    body: "Best-in-class components rarely speak the same language once they're in the field.",
    dir: { x: 0, y: 1 },
    rotate: 2,
    tone: "light" as const,
  },
  {
    tag: "03",
    title: "The Extreme Security Risk of the Open Market",
    body: "Exposing operational needs to vendors is, itself, an exposure.",
    dir: { x: 1, y: -0.4 },
    rotate: -2,
    tone: "mist" as const,
  },
];

const TONE_CLASSES = {
  dark: "bg-charcoal/90 border-mist/15 text-paper",
  light: "bg-paper border-paper/40 text-navy",
  mist: "bg-black border-mist/20 text-paper",
};

function GapBlock({
  index,
  tag,
  title,
  body,
  dir,
  rotate,
  tone,
  scrollYProgress,
  focused,
  setFocused,
}: {
  index: number;
  tag: string;
  title: string;
  body: string;
  dir: { x: number; y: number };
  rotate: number;
  tone: "dark" | "light" | "mist";
  scrollYProgress: MotionValue<number>;
  focused: number | null;
  setFocused: (i: number | null) => void;
}) {
  const manualOpen = useMotionValue(0);
  const springOpen = useSpring(manualOpen, { stiffness: 200, damping: 24 });
  const dragging = useRef(false);
  const startX = useRef(0);

  // The angled/overlapping stack only makes sense once cards sit side by
  // side (md+); on a single mobile column, rotation just causes overlap.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const activeRotate = isDesktop ? rotate : 0;

  const scrollSpread = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  const x = useTransform([scrollSpread, springOpen], (v) => {
    const [s, m] = v as number[];
    return dir.x * (s * 100 + m);
  });
  const y = useTransform([scrollSpread, springOpen], (v) => {
    const [s, m] = v as number[];
    return dir.y * (s * 60 + m * 0.4);
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
      style={{ x, y, opacity, rotate: activeRotate }}
      animate={{
        scale: isDimmed ? 0.94 : focused === index ? 1.04 : 1,
        rotate: isDimmed ? activeRotate : focused === index ? 0 : activeRotate,
        zIndex: focused === index ? 20 : 10 - index,
      }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setFocused(index)}
      onHoverEnd={() => setFocused(null)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMoveHandler}
      onPointerUp={onPointerUp}
      className={`group relative flex h-72 w-full max-w-sm shrink-0 cursor-grab touch-pan-y select-none flex-col justify-between overflow-hidden rounded-sm border p-7 shadow-2xl shadow-black/40 backdrop-blur-sm active:cursor-grabbing md:-ml-14 md:h-80 md:w-80 md:p-8 md:first:ml-0 ${TONE_CLASSES[tone]}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-4 font-mono text-[9rem] font-black leading-none opacity-[0.08]"
      >
        {tag}
      </span>
      <span className="relative font-mono text-xs opacity-60">{tag}</span>
      <div className="relative">
        <h3 className="font-sans text-2xl font-normal uppercase leading-snug tracking-tight md:text-3xl">{title}</h3>
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mt-3 overflow-hidden font-mono text-base leading-relaxed opacity-75 group-focus-within:opacity-100"
        >
          {body}
        </motion.p>
      </div>
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
    <section id="gap" ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 grayscale">
          <SectionImage src="/images/gap-industrial.svg" alt="Dark industrial ceiling with surveillance domes, claustrophobic warehouse mood" />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />

        <Container>
          <motion.div style={{ opacity: headOpacity }} className="relative pt-24 md:pt-28">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-mist">02 — The Gap in Modern Defense</p>
            <h2 className="mt-4 max-w-3xl font-sans text-5xl font-normal uppercase leading-[0.98] tracking-tight text-paper md:text-7xl">
              Today&apos;s challenges are <span className="text-mist">threefold.</span>
            </h2>
          </motion.div>
        </Container>

        <div className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-y-auto px-6 pb-16 pt-8 md:flex-row md:gap-0 md:overflow-visible md:px-14">
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

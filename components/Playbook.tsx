"use client";

import { useRef, useState } from "react";
import { AnimatePresence, MotionValue, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Container } from "./Container";
import { Glow } from "./Glow";
import { SectionImage } from "./SectionImage";
import { SectionLabel } from "./SectionLabel";

const STEPS = [
  {
    tag: "01",
    title: "Mission Deconstruction",
    lead: "We reverse-engineer the problem to its core components.",
    body: "We break massive, seemingly impossible operational challenges down into distinct, solvable blocks — the \"what\" and the \"how,\" at a granular level, so no detail is left to chance.",
  },
  {
    tag: "02",
    title: "Technological Identification",
    lead: "Scanning the global landscape for deep tech that fits the gap.",
    body: "We continuously scout the global landscape — from defense innovations to cyber capabilities — to pinpoint the exact tools that match your specific mission gaps.",
  },
  {
    tag: "03",
    title: "Custom Development",
    lead: "When the market falls short, we build the solution ourselves.",
    body: "We shift from curators to creators, engineering purpose-built technologies from the ground up when existing solutions aren't enough.",
  },
  {
    tag: "04",
    title: "Orchestration & Integration",
    lead: "Turning disparate systems into one unified, frictionless organism.",
    body: "A pile of advanced technology is useless without synergy. We connect custom code, hardware, and sensors so they operate as one seamless, unified entity.",
  },
];

function DeconstructVisual({ progress }: { progress: MotionValue<number> }) {
  const gap = useTransform(progress, [0, 1], [0, 46]);
  const gx = useTransform(gap, (g) => `${g}px`);
  const negGx = useTransform(gap, (g) => `${-g}px`);
  return (
    <div className="relative h-56 w-56">
      <motion.div style={{ x: negGx, y: negGx }} className="absolute left-0 top-0 h-1/2 w-1/2 bg-mist" />
      <motion.div style={{ x: gx, y: negGx }} className="absolute right-0 top-0 h-1/2 w-1/2 bg-mist/70" />
      <motion.div style={{ x: negGx, y: gx }} className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-mist/70" />
      <motion.div style={{ x: gx, y: gx }} className="absolute bottom-0 right-0 h-1/2 w-1/2 bg-mist" />
    </div>
  );
}

function ScanVisual({ progress }: { progress: MotionValue<number> }) {
  const sweep = useTransform(progress, [0, 1], ["0%", "100%"]);
  const dots = Array.from({ length: 36 });
  return (
    <div className="relative grid h-56 w-56 grid-cols-6 gap-3 overflow-hidden">
      {dots.map((_, i) => (
        <span key={i} className="h-2 w-2 rounded-full bg-mist/30" />
      ))}
      <motion.div
        style={{ left: sweep }}
        className="absolute top-0 h-full w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-mist/70 to-transparent"
      />
    </div>
  );
}

function BuildVisual({ progress }: { progress: MotionValue<number> }) {
  const h1 = useTransform(progress, [0, 0.34], [0, 1]);
  const h2 = useTransform(progress, [0.33, 0.67], [0, 1]);
  const h3 = useTransform(progress, [0.66, 1], [0, 1]);
  const s1 = useTransform(h1, (v) => `${v * 100}%`);
  const s2 = useTransform(h2, (v) => `${v * 100}%`);
  const s3 = useTransform(h3, (v) => `${v * 100}%`);
  return (
    <div className="flex h-56 w-56 items-end gap-4">
      <motion.div style={{ height: s1 }} className="w-1/3 self-end bg-mist/50" />
      <motion.div style={{ height: s2 }} className="w-1/3 self-end bg-mist/75" />
      <motion.div style={{ height: s3 }} className="w-1/3 self-end bg-mist" />
    </div>
  );
}

function IntegrateVisual({ progress }: { progress: MotionValue<number> }) {
  const merge = useTransform(progress, [0, 1], [1, 0]);
  const off = useTransform(merge, (m) => m * 70);
  const nOff = useTransform(off, (v) => -v);
  return (
    <div className="relative flex h-56 w-56 items-center justify-center">
      <motion.div style={{ x: nOff }} className="absolute h-24 w-24 rounded-full bg-mist/60" />
      <motion.div style={{ x: off }} className="absolute h-24 w-24 rounded-full bg-mist/60" />
      <motion.div style={{ scale: useTransform(merge, (m) => 1 - m * 0.3 + 0.3) }} className="absolute h-24 w-24 rounded-full border-2 border-paper" />
    </div>
  );
}

const VISUALS = [DeconstructVisual, ScanVisual, BuildVisual, IntegrateVisual];

export function Playbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const stageFloat = useTransform(scrollYProgress, [0, 1], [0, STEPS.length - 0.001]);
  const [activeStage, setActiveStage] = useState(0);
  const [hoverOverride, setHoverOverride] = useState<number | null>(null);

  useMotionValueEvent(stageFloat, "change", (v) => {
    setActiveStage(Math.max(0, Math.min(STEPS.length - 1, Math.floor(v))));
  });

  // Fixed-length (4) array, same hook-call order every render — safe despite the loop.
  const stage0 = useTransform(scrollYProgress, [0 / 4, 1 / 4], [0, 1]);
  const stage1 = useTransform(scrollYProgress, [1 / 4, 2 / 4], [0, 1]);
  const stage2 = useTransform(scrollYProgress, [2 / 4, 3 / 4], [0, 1]);
  const stage3 = useTransform(scrollYProgress, [3 / 4, 4 / 4], [0, 1]);
  const stageProgresses = [stage0, stage1, stage2, stage3];

  const displayIndex = hoverOverride ?? activeStage;

  return (
    <section id="playbook" ref={sectionRef} className="ground-dark relative md:h-[240vh]">
      <div className="relative flex flex-col justify-center py-16 md:sticky md:top-0 md:h-screen md:overflow-hidden md:py-12">
        <div className="absolute inset-0 opacity-70 saturate-[0.5] contrast-[1.1]">
          <SectionImage src="/photos/playbook-command.jpg" alt="Operators at a darkened command console, wall of monitors ahead" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/40" />
        <Glow className="right-[10%] top-1/3 -translate-y-1/2" size={800} />

        <Container className="relative flex flex-col gap-6 md:gap-9">
          <SectionLabel index="04" label="The Playbook" tone="light" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5">
            {STEPS.map((step, i) => {
              const isActive = i === displayIndex;
              const CellVisual = VISUALS[i];
              return (
                <button
                  key={step.tag}
                  onMouseEnter={() => setHoverOverride(i)}
                  onMouseLeave={() => setHoverOverride(null)}
                  onFocus={() => setHoverOverride(i)}
                  onBlur={() => setHoverOverride(null)}
                  onClick={() => setHoverOverride(i)}
                  className="relative flex min-h-[130px] flex-col justify-between overflow-hidden rounded-sm border p-4 text-left backdrop-blur-sm transition-colors duration-300 sm:min-h-[210px] md:h-[300px] md:p-7"
                  style={{
                    borderColor: isActive ? "rgba(208,228,232,0.5)" : "rgba(208,228,232,0.12)",
                    backgroundColor: isActive ? "rgba(208,228,232,0.08)" : "rgba(0,0,0,0.25)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-sm transition-colors duration-300 md:text-base ${isActive ? "text-paper" : "text-mist/40"}`}>
                      {step.tag}
                    </span>
                    <div
                      aria-hidden="true"
                      className={`h-9 w-9 shrink-0 overflow-hidden transition-opacity duration-300 md:h-11 md:w-11 ${
                        isActive ? "opacity-70" : "opacity-0"
                      }`}
                    >
                      <div className="origin-top-right scale-[0.16] md:scale-[0.195]">
                        <CellVisual progress={stageProgresses[i]} />
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3
                      className={`break-normal font-sans text-lg uppercase leading-[1.05] tracking-tight transition-colors duration-300 md:text-2xl ${
                        isActive ? "text-paper" : "text-mist/55"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-2 font-sans text-sm font-light leading-snug text-mist md:text-base">{step.lead}</p>
                          <p className="mt-2 hidden font-mono text-xs leading-relaxed text-mist/80 md:block md:text-sm">
                            {step.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-center font-sans text-lg font-normal uppercase text-paper md:text-xl">
            We deliver defense. <span className="font-mono font-light lowercase text-mist">we execute.</span>
          </p>
        </Container>
      </div>
    </section>
  );
}

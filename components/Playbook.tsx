"use client";

import { useRef, useState } from "react";
import { MotionValue, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Container } from "./Container";
import { Glow } from "./Glow";

const STEPS = [
  {
    tag: "01",
    title: "Mission Deconstruction",
    lead: "We don't just look at the problem; we reverse-engineer it to its core components.",
    body: "We break massive, seemingly impossible operational challenges down into distinct, solvable blocks — the \"what\" and the \"how,\" at a granular level, so no detail is left to chance.",
  },
  {
    tag: "02",
    title: "Technological Identification",
    lead: "Scanning the global landscape for deep tech and existing innovations that fit the gap.",
    body: "We continuously scout the global landscape — from defense innovations to cyber capabilities — to pinpoint the exact tools that match your specific mission gaps.",
  },
  {
    tag: "03",
    title: "Custom Development",
    lead: "When the market falls short, we build. From AI architectures to specialized hardware.",
    body: "We shift from curators to creators, engineering purpose-built technologies from the ground up when existing solutions aren't enough.",
  },
  {
    tag: "04",
    title: "Orchestration & Integration",
    lead: "Turning disparate systems into a single, unified, and frictionless organism.",
    body: "A pile of advanced technology is useless without synergy. We connect custom code, hardware, and sensors so they operate as one seamless, unified entity.",
  },
];

function DeconstructVisual({ progress }: { progress: MotionValue<number> }) {
  const gap = useTransform(progress, [0, 1], [0, 46]);
  const gx = useTransform(gap, (g) => `${g}px`);
  const negGx = useTransform(gap, (g) => `${-g}px`);
  return (
    <div className="relative h-56 w-56 md:h-72 md:w-72">
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
    <div className="relative grid h-56 w-56 grid-cols-6 gap-3 overflow-hidden md:h-72 md:w-72">
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
    <div className="flex h-56 w-56 items-end gap-4 md:h-72 md:w-72">
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
    <div className="relative flex h-56 w-56 items-center justify-center md:h-72 md:w-72">
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

  const stageFloat = useTransform(scrollYProgress, [0, 1], [0, 5 - 0.001]);
  const [activeStage, setActiveStage] = useState(0);
  const [hoverOverride, setHoverOverride] = useState<number | null>(null);

  useMotionValueEvent(stageFloat, "change", (v) => {
    setActiveStage(Math.max(0, Math.min(4, Math.floor(v))));
  });

  // Fixed-length (5) array, same hook-call order every render — safe despite the loop.
  const stage0 = useTransform(scrollYProgress, [0 / 5, 1 / 5], [0, 1]);
  const stage1 = useTransform(scrollYProgress, [1 / 5, 2 / 5], [0, 1]);
  const stage2 = useTransform(scrollYProgress, [2 / 5, 3 / 5], [0, 1]);
  const stage3 = useTransform(scrollYProgress, [3 / 5, 4 / 5], [0, 1]);
  const stage4 = useTransform(scrollYProgress, [4 / 5, 5 / 5], [0, 1]);
  const stageProgresses = [stage0, stage1, stage2, stage3, stage4];

  const closingOpacity = useTransform(scrollYProgress, [0.82, 0.92, 1], [0, 1, 1]);
  const closingScale = useTransform(scrollYProgress, [0.82, 1], [0.9, 1]);

  const displayIndex = hoverOverride ?? activeStage;
  const isClosing = activeStage === 4 && hoverOverride === null;
  const Visual = VISUALS[Math.min(displayIndex, 3)];

  return (
    <section id="playbook" ref={sectionRef} className="relative h-[440vh] bg-navy">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Glow className="right-[10%] top-1/3 -translate-y-1/2" size={800} />
        <Container className="absolute left-0 right-0 top-8 md:top-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-mist">04 — The Playbook</span>
        </Container>

        {!isClosing ? (
          <Container className="flex h-full flex-col items-center justify-center gap-10 md:flex-row md:justify-between">
            <div className="max-w-xl">
              <div className="mb-8 flex gap-2 md:gap-3">
                {STEPS.map((s, i) => (
                  <button
                    key={s.tag}
                    onMouseEnter={() => setHoverOverride(i)}
                    onMouseLeave={() => setHoverOverride(null)}
                    onClick={() => setHoverOverride(i)}
                    className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                      i === displayIndex
                        ? "border-mist bg-mist text-navy"
                        : "border-mist/25 text-mist/50 hover:border-mist/50 hover:text-mist"
                    }`}
                  >
                    {s.tag}
                  </button>
                ))}
              </div>
              <motion.div key={displayIndex} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h3 className="font-sans text-4xl font-black uppercase leading-[0.95] text-paper md:text-6xl">
                  {STEPS[displayIndex].title}
                </h3>
                <p className="mt-4 font-sans text-lg font-light text-mist md:text-xl">{STEPS[displayIndex].lead}</p>
                <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-mist/70">
                  {STEPS[displayIndex].body}
                </p>
              </motion.div>
            </div>

            <div className="glass-panel flex items-center justify-center rounded-sm p-10">
              <Visual progress={stageProgresses[displayIndex]} />
            </div>
          </Container>
        ) : (
          <motion.div
            style={{ opacity: closingOpacity, scale: closingScale }}
            className="flex h-full flex-col items-center justify-center px-6 text-center"
          >
            <p className="font-sans text-4xl font-black uppercase text-paper sm:text-6xl md:text-7xl">
              We deliver defense.
              <br />
              <span className="font-mono font-light lowercase text-mist">we execute.</span>
            </p>
            <p className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-mist/70">
              From high-level architecture to the red button.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

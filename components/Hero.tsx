"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ParticleField } from "./ParticleField";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const entrance = useMotionValue(0);
  useEffect(() => {
    const controls = animate(entrance, 0.35, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [entrance]);

  const assembly = useTransform([entrance, scrollYProgress], (v) => {
    const [e, s] = v as number[];
    return Math.min(1, e + s * 0.75);
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.35, 0.8], [1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fieldScale = useTransform(scrollYProgress, [0.6, 1], [1, 1.6]);
  const fieldBlur = useTransform(scrollYProgress, [0.6, 1], [0, 14]);
  const fieldFilter = useTransform(fieldBlur, (b) => `blur(${b}px)`);

  return (
    <section id="top" ref={sectionRef} className="relative h-[180vh] bg-navy">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ scale: fieldScale, filter: fieldFilter }}
          className="absolute inset-0"
        >
          <ParticleField progress={assembly} className="h-full w-full" />
        </motion.div>

        <div className="relative flex h-full flex-col justify-end px-6 pb-24 md:px-14 md:pb-28">
          <motion.div style={{ opacity: headlineOpacity, y: headlineY }} className="max-w-4xl">
            <h1 className="font-sans text-[10.5vw] font-bold leading-[0.92] tracking-tight text-paper break-words sm:text-[9vw] md:text-[6.4vw]">
              Deconstructing
              <br />
              Challenges.
            </h1>
            <p className="mt-4 max-w-md font-mono text-lg font-light lowercase tracking-tight text-mist md:ml-24 md:text-2xl">
              reconstructing solutions.
            </p>
          </motion.div>

          <motion.p
            style={{ opacity: headlineOpacity }}
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-mist/70"
          >
            Scroll — 01 / 06
          </motion.p>
        </div>
      </div>
    </section>
  );
}

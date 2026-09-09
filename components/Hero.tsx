"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ParticleField } from "./ParticleField";
import { Container } from "./Container";
import { Glow } from "./Glow";
import { Marquee } from "./Marquee";
import { SectionImage } from "./SectionImage";
import { GridPattern } from "./GridPattern";
import { ScanLine } from "./ScanLine";
import { LogoMark } from "./Logo";

const TICKER = [
  "DEEP TECH",
  "CYBER CAPABILITIES",
  "CUSTOM HARDWARE",
  "AI ARCHITECTURES",
  "SENSOR FUSION",
  "SYSTEMS INTEGRATION",
];

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
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="top" ref={sectionRef} className="ground-dark relative h-[130vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4] saturate-[0.3] contrast-[1.1] blur-[1px]">
          <SectionImage src="/photos/hero-crowd.jpg" alt="Abstract overhead view of a crowd dispersing through a city street at night" />
        </div>
        <GridPattern className="text-mist/[0.1]" />
        <ScanLine className="opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
        <motion.div style={{ opacity: glowOpacity }}>
          <Glow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={1100} color="#d0e4e8" />
          <Glow className="right-0 bottom-[20%] translate-x-1/3" size={600} color="#001832" />
        </motion.div>

        <motion.div
          style={{ scale: fieldScale, filter: fieldFilter }}
          className="absolute inset-0"
        >
          <ParticleField progress={assembly} className="h-full w-full" />
        </motion.div>

        <div className="relative flex h-full flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <Container className="flex flex-col items-center">
              <motion.div style={{ opacity: headlineOpacity, y: headlineY }} className="mx-auto max-w-4xl">
                <h1 className="break-normal font-sans text-[clamp(1.625rem,7.5vw,5.25rem)] font-black uppercase leading-[0.98] tracking-[-0.01em] text-paper">
                  Deconstructing
                  <br />
                  Challenges.
                </h1>
                <p className="mx-auto mt-6 max-w-lg font-mono text-xl font-light lowercase tracking-tight text-paper md:text-2xl">
                  reconstructing solutions.
                </p>
                <div className="mt-9 flex justify-center">
                  <LogoMark className="h-8 w-8 opacity-90 md:h-10 md:w-10" />
                </div>
              </motion.div>
            </Container>
          </div>

          <motion.div style={{ opacity: headlineOpacity }} className="border-t border-paper/10">
            <Marquee items={TICKER} className="py-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

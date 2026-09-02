"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ParticleField } from "./ParticleField";
import { Container } from "./Container";
import { Glow } from "./Glow";
import { Marquee } from "./Marquee";

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
    <section id="top" ref={sectionRef} className="relative h-[180vh] bg-navy">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ opacity: glowOpacity }}>
          <Glow className="left-1/2 top-[8%] -translate-x-1/3" size={1100} />
          <Glow className="right-0 bottom-[20%] translate-x-1/3" size={700} color="#001832" />
        </motion.div>

        <motion.div
          style={{ scale: fieldScale, filter: fieldFilter }}
          className="absolute inset-0"
        >
          <ParticleField progress={assembly} className="h-full w-full" />
        </motion.div>

        <div className="relative flex h-full flex-col justify-end">
          <Container className="pb-16 md:pb-20">
            <motion.div style={{ opacity: headlineOpacity, y: headlineY }} className="max-w-4xl">
              <h1 className="font-sans text-[8.6vw] font-black uppercase leading-[0.86] tracking-tight text-paper break-words sm:text-[7vw] md:text-[6.6vw]">
                Deconstructing
                <br />
                <span className="text-mist">Challenges.</span>
              </h1>
              <p className="mt-5 max-w-md font-mono text-lg font-light lowercase tracking-tight text-mist md:ml-28 md:text-2xl">
                reconstructing solutions.
              </p>
            </motion.div>
          </Container>

          <motion.div style={{ opacity: headlineOpacity }} className="border-t border-mist/15">
            <Marquee items={TICKER} className="py-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

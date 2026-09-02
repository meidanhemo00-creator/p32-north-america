"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { SectionImage } from "./SectionImage";
import { Container } from "./Container";

export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.35, 0.15]);
  const tracking = useTransform(scrollYProgress, [0, 1], [-0.01, 0.06]);
  const letterSpacing = useTransform(tracking, (v) => `${v}em`);
  const subOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.15, 0.5], [30, 0]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const parallaxX = useTransform(sx, (v) => `${v}px`);
  const parallaxY = useTransform(sy, (v) => `${v}px`);

  function handlePointerMove(e: React.PointerEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    px.set(nx * -18);
    py.set(ny * -18);
  }

  return (
    <section
      id="vision"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="ground-dark relative h-[150vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ scale: imgScale, x: parallaxX, y: parallaxY }}
          className="absolute inset-[-5%] saturate-[0.55] contrast-[1.05]"
        >
          <SectionImage src="/photos/vision-orbit.jpg" alt="Earth from orbit at night, city-light grid visible on the surface" />
        </motion.div>
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <div className="glass-panel mx-auto max-w-3xl rounded-sm p-7 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-mist">01 — The Vision</p>
            <motion.h2
              style={{ letterSpacing }}
              className="mt-5 break-words font-sans text-[9.5vw] font-normal uppercase leading-[0.95] text-paper sm:text-[7vw] md:text-[4.6vw]"
            >
              Defense Solution
              <br />
              Architects
            </motion.h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-2xl font-light italic text-mist md:text-3xl">
              that will make your <span className="not-italic text-paper">mission possible</span>.
            </p>
            <motion.p
              style={{ opacity: subOpacity, y: subY }}
              className="mx-auto mt-6 max-w-md font-mono text-lg leading-relaxed text-mist/90"
            >
              trusted by nations and intelligence agencies around the globe to bridge the gap
              between complex operational needs and cutting-edge execution.
            </motion.p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-10 font-mono text-[11px] uppercase tracking-[0.25em] text-mist/50">
            <span>Global Reach</span>
            <span>Multi-Domain</span>
            <span>Classified-Ready</span>
          </div>
        </Container>
      </div>
    </section>
  );
}

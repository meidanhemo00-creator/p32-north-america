"use client";

import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

type Particle = {
  // scattered starting point (fragment state)
  sx: number;
  sy: number;
  // coalesced target point (reconstructed shape outline)
  tx: number;
  ty: number;
  size: number;
  drift: number;
  driftPhase: number;
};

/**
 * Canvas particle system used for the Hero's deconstruct/reconstruct motif
 * and reused (lighter density) for the Team section's crowd-scatter effect.
 *
 * `progress` (0 -> 1) drives coalescing from scattered fragments into the
 * target silhouette. On touch/reduced-motion devices the simulation still
 * runs but skips the pointer-repel physics, driven by scroll/progress alone.
 */
export function ParticleField({
  progress,
  density = 900,
  color = "#d0e4e8",
  shape = "diamond",
  interactive = true,
  className = "",
}: {
  progress: MotionValue<number>;
  density?: number;
  color?: string;
  shape?: "diamond" | "ring";
  interactive?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function targetPoint(i: number, count: number, w: number, h: number) {
      const cx = w / 2;
      const cy = h / 2;
      const t = i / count;
      if (shape === "ring") {
        const angle = t * Math.PI * 2;
        const r = Math.min(w, h) * 0.28;
        return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r * 0.6 };
      }
      // diamond / faceted mark silhouette echoing the logo's sparkle form
      const angle = t * Math.PI * 2;
      const wobble = Math.sin(angle * 4) * 0.18 + 1;
      const r = Math.min(w, h) * 0.24 * wobble;
      return { x: cx + Math.cos(angle) * r * 0.7, y: cy + Math.sin(angle) * r };
    }

    function build() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((density * (width * height)) / (1440 * 800));
      particles = new Array(Math.max(120, count)).fill(0).map((_, i) => {
        const target = targetPoint(i, Math.max(120, count), width, height);
        return {
          sx: Math.random() * width,
          sy: Math.random() * height,
          tx: target.x,
          ty: target.y,
          size: Math.random() * 1.6 + 0.4,
          drift: Math.random() * 10 + 4,
          driftPhase: Math.random() * Math.PI * 2,
        };
      });
    }

    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      pointer.current.active = true;
    }
    function handlePointerLeave() {
      pointer.current.active = false;
    }
    if (interactive && !reduced) {
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
    }

    let raf = 0;
    let t = 0;
    function frame() {
      t += reduced ? 0 : 0.016;
      const p = progress.get();
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = color;

      for (const particle of particles) {
        let x = particle.sx + (particle.tx - particle.sx) * p;
        let y = particle.sy + (particle.ty - particle.sy) * p;

        if (!reduced) {
          x += Math.sin(t * 0.6 + particle.driftPhase) * particle.drift * (1 - p * 0.6);
          y += Math.cos(t * 0.5 + particle.driftPhase) * particle.drift * (1 - p * 0.6);
        }

        if (pointer.current.active) {
          const dx = x - pointer.current.x;
          const dy = y - pointer.current.y;
          const dist = Math.hypot(dx, dy);
          const radius = 120;
          if (dist < radius && dist > 0.01) {
            const force = (1 - dist / radius) * 34;
            x += (dx / dist) * force;
            y += (dy / dist) * force;
          }
        }

        ctx!.globalAlpha = 0.35 + p * 0.55;
        ctx!.beginPath();
        ctx!.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density, color, shape, interactive]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

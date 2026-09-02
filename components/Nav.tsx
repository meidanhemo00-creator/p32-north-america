"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#vision", label: "Vision" },
  { href: "#playbook", label: "Playbook" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setSolid(v > (typeof window !== "undefined" ? window.innerHeight * 0.7 : 500));
  });

  const bg = useTransform(scrollY, [0, typeof window !== "undefined" ? window.innerHeight * 0.7 : 500], [
    "rgba(0,24,50,0)",
    "rgba(0,24,50,0.92)",
  ]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-0 transition-[backdrop-filter] duration-300"
        data-solid={solid}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <a href="#top" className="flex items-center gap-2" aria-label="P32 home">
            <Logo className="h-6 w-auto text-paper" />
          </a>

          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="#contact"
              className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-mist transition-colors hover:text-paper sm:inline-block"
            >
              Request a Briefing
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="group flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
            >
              <span className="h-px w-6 bg-paper transition-transform group-hover:translate-x-0.5" />
              <span className="h-px w-4 self-end bg-mist transition-transform group-hover:-translate-x-0.5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-start justify-center gap-3 bg-navy px-8 md:px-20"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 top-5 font-mono text-xs uppercase tracking-[0.2em] text-mist md:right-10 md:top-6"
            >
              Close
            </button>
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                className="font-sans text-[13vw] font-light leading-[1.05] text-paper transition-colors hover:text-mist md:text-[6vw]"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { PURCHASE_URL } from "@/lib/purchase";
import { Container } from "@/components/Container";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#story", label: "The Story" },
  { href: "#memorial", label: "In Memory" },
  { href: "#purchase", label: "Purchase" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex items-center gap-2 shrink-0" aria-label="217 / Duvdevan home">
          <Image
            src={withBasePath("/photos/duvdevan/brand/duvdevan-wordmark.webp")}
            alt="217 / Duvdevan"
            width={140}
            height={79}
            className="h-6 w-auto md:h-7"
            priority
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-sm uppercase tracking-wider text-paper/80 transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
          <a
            href={PURCHASE_URL}
            className="font-display rounded-none border border-red bg-red px-5 py-2.5 text-sm uppercase tracking-wider text-paper transition-colors hover:bg-red-bright"
          >
            Purchase the Book
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-paper transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[1.5px] w-full bg-paper transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[1.5px] w-full bg-paper transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-ink/95 backdrop-blur-md md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display py-3 text-base uppercase tracking-wider text-paper/85"
              >
                {l.label}
              </a>
            ))}
            <a
              href={PURCHASE_URL}
              onClick={() => setOpen(false)}
              className="font-display mt-2 inline-block bg-red px-5 py-3 text-center text-sm uppercase tracking-wider text-paper"
            >
              Purchase the Book
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}

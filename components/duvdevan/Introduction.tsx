import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { Container } from "@/components/Container";

export function Introduction() {
  return (
    <section id="about" className="ground-paper relative overflow-hidden py-24 md:py-36">
      <Container className="grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 lg:col-span-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="chapter-bar h-px w-10" />
            <span className="font-display text-xs uppercase tracking-[0.3em] text-red">Prologue</span>
          </div>

          <h2 className="font-display text-4xl uppercase leading-[1.08] text-ink sm:text-5xl">
            For the First Time,
            <br />
            the Story Emerges
            <br />
            From the Shadows.
          </h2>

          <blockquote className="font-body mt-10 border-l-2 border-red pl-6 text-xl italic leading-relaxed text-ink/80 sm:text-2xl">
            &ldquo;Our story was never written on paper. It was written in held breaths
            and silent footsteps across the stones of the casbahs.&rdquo;
          </blockquote>

          <p className="font-body mt-10 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
            For four decades, Duvdevan has operated where precision, courage and human
            judgment matter most. This book brings together the photographs, operations,
            turning points and people that shaped the unit from 1986 to the present day.
          </p>
        </div>

        <div className="relative md:col-span-5 lg:col-span-6">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-md translate-x-0 md:translate-x-10">
            <Image
              src={withBasePath("/photos/duvdevan/gallery/gallery-01.webp")}
              alt="Archival photograph of an early undercover operation, from the book's opening chapter"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 90vw, 40vw"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
          </div>
        </div>
      </Container>
    </section>
  );
}

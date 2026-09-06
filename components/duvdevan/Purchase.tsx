import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { PURCHASE_URL } from "@/lib/purchase";
import { Container } from "@/components/Container";

export function Purchase() {
  return (
    <section id="purchase" className="ground-dark relative overflow-hidden py-24 md:py-36">
      <Container className="grid items-center gap-16 md:grid-cols-12">
        <div className="order-2 flex justify-center md:order-1 md:col-span-5 md:justify-start">
          <div className="relative aspect-[210/280] w-56 shrink-0 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/10 sm:w-72">
            <Image
              src={withBasePath("/photos/duvdevan/cover/front-cover.webp")}
              alt={'"217" — 40 Years of the Duvdevan Unit: The Untold Story of the IDF Counter-Terrorism Unit, book cover'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 60vw, 25vw"
            />
          </div>
        </div>

        <div className="order-1 md:order-2 md:col-span-7">
          <h2 className="font-display text-3xl uppercase leading-[1.1] text-paper sm:text-4xl md:text-5xl">
            A Book Written in Their Honor.
            <br />
            Carried Forward in Their Memory.
          </h2>

          <p className="font-body mt-8 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
            Created to preserve the untold story of the Duvdevan Unit, this book traces
            four decades of operations, transformation, brotherhood and sacrifice.
          </p>
          <p className="font-body mt-5 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
            It was written in honor and in memory of the unit&rsquo;s fallen and its fallen
            alumni. One hundred percent of the proceeds from every purchase supports the
            Commemoration Department of Friends of Duvdevan—helping preserve their names,
            stories and legacy, and stand with the families who carry their memory
            forward.
          </p>

          <div className="mt-10">
            <a
              href={PURCHASE_URL}
              className="font-display inline-block bg-red px-8 py-4 text-sm uppercase tracking-wider text-paper transition-colors hover:bg-red-bright"
            >
              Purchase the Book
            </a>
          </div>

          <p className="font-display mt-10 text-xs uppercase tracking-[0.25em] text-paper/45">
            40 Years of the Duvdevan Unit
            <br />
            1986–2026
          </p>
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/Container";

export function FeaturedQuote() {
  return (
    <section className="ground-paper py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="chapter-bar mx-auto mb-8 block h-px w-10" />
          <p className="font-body text-2xl leading-snug text-ink/85 sm:text-3xl md:text-[2.4rem] md:leading-snug">
            &ldquo;When the homeland is under direct attack, you do not wait for orders;{" "}
            <span className="font-semibold text-ink">
              you drop everything and drive straight into the fire.
            </span>
            &rdquo;
          </p>
          <p className="font-display mt-10 text-xs uppercase tracking-[0.2em] text-ink/50">
            Duvdevan operators prepare to enter combat on the morning of October 7, 2023
          </p>
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="bg-ink py-10">
      <Container className="flex flex-col items-center gap-2 text-center">
        <span className="font-display text-sm uppercase tracking-[0.3em] text-paper/70">
          Friends of Duvdevan
        </span>
        <span className="font-body text-xs text-paper/40">
          © 2026 Friends of Duvdevan. All rights reserved.
        </span>
      </Container>
    </footer>
  );
}

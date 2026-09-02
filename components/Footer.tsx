import { LogoMark } from "./Logo";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-black py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist/70">
            Deconstructing Challenges. Reconstructing Solutions.
          </span>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-mist/50">
          <span>[ Placeholder — contact email ]</span>
          <span>[ Placeholder — HQ location ]</span>
          <span>[ Placeholder — LinkedIn / social ]</span>
        </div>

        <p className="font-mono text-xs text-mist/40">
          © {new Date().getFullYear()} P32 [ Placeholder — legal entity name ]. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

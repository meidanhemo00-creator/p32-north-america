import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-mist/15 bg-navy px-6 py-10 md:px-14">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-4 w-4 text-mist" />
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
      </div>
    </footer>
  );
}

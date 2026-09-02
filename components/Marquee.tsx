/**
 * Horizontal scrolling ticker used as a section-transition device (the
 * repeating capability/keyword strip pattern from the reference) rather
 * than a hard cut or dead gap between sections.
 */
export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className={`relative flex overflow-hidden ${className}`} aria-hidden="true">
      <div className="animate-marquee flex w-max shrink-0 items-center gap-10 pr-10">
        {loop.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-mist/50"
          >
            {item} <span className="ml-10 text-mist/25">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

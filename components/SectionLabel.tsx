/**
 * Shared section identifier: big tabular numeral + divider + label. Used
 * at the top of every numbered section so the number reads as an
 * intentional orientation device, not a barely-visible eyebrow tag.
 */
export function SectionLabel({
  index,
  label,
  tone = "light",
  className = "",
}: {
  index: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const numeral = tone === "light" ? "text-paper" : "text-navy";
  const rule = tone === "light" ? "bg-paper/30" : "bg-navy/30";
  const text = tone === "light" ? "text-mist" : "text-navy/60";

  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      <span className={`font-mono text-2xl font-normal tabular-nums leading-none md:text-3xl ${numeral}`}>
        {index}
      </span>
      <span className={`h-px w-8 md:w-12 ${rule}`} />
      <span className={`font-mono text-xs uppercase tracking-[0.25em] md:text-sm ${text}`}>{label}</span>
    </div>
  );
}

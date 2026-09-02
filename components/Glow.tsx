/**
 * Soft radial light source used as a section's atmospheric accent — the
 * glowing-object focal point pattern from the reference, in brand mist/navy
 * rather than an orange product-glow. Purely decorative, aria-hidden.
 */
export function Glow({
  className = "",
  color = "#d0e4e8",
  size = 900,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}55 0%, ${color}22 35%, transparent 70%)`,
      }}
    />
  );
}

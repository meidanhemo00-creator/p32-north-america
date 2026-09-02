/**
 * TEMPORARY PLACEHOLDER — not the real P32 logo.
 * No logo file has reached this environment, so this intentionally does NOT
 * attempt to reproduce the mark (wordmark styling or the sparkle icon).
 * It's plain text in a dashed frame so it reads unmistakably as "logo not
 * final yet" rather than as a stand-in design. Swap for the real SVG/vector
 * export the moment the file can be delivered — every usage below is the
 * only place that needs to change.
 */
export function LogoMark({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <rect x="4" y="4" width="32" height="32" rx="4" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="20" y="25" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={color}>
        ?
      </text>
    </svg>
  );
}

export function Logo({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <span
      className={className}
      role="img"
      aria-label="P32 (temporary placeholder logo)"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}
    >
      <span
        style={{
          border: `1.5px dashed ${color}`,
          borderRadius: "4px",
          padding: "0.1em 0.5em",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "1em",
          letterSpacing: "-0.02em",
          color,
          lineHeight: 1.6,
        }}
      >
        P32
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.5em",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          opacity: 0.6,
          color,
        }}
      >
        logo tbd
      </span>
    </span>
  );
}

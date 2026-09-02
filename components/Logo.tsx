/**
 * Recreated from the supplied logo image (P32 wordmark + 4-point sparkle mark).
 * PLACEHOLDER: swap for the real vector/SVG export as soon as it can be
 * delivered as an actual file — this is a hand-built approximation of what
 * was visually reviewed, not the production-accurate mark.
 */
export function LogoMark({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 4 C21 12 22 18 30 20 C22 22 21 28 20 36 C19 28 18 22 10 20 C18 18 19 12 20 4Z"
        fill={color}
      />
    </svg>
  );
}

export function Logo({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 168 44" className={className} role="img" aria-label="P32">
      <text
        x="0"
        y="34"
        fontFamily="var(--font-mono)"
        fontWeight={700}
        fontSize="34"
        letterSpacing="-1"
        fill={color}
      >
        P32
      </text>
      <g transform="translate(140, 4)">
        <path
          d="M12 0 C12.7 5 13.5 8.5 20 9.5 C13.5 10.5 12.7 14 12 19 C11.3 14 10.5 10.5 4 9.5 C10.5 8.5 11.3 5 12 0Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

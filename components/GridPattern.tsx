/**
 * Subtle tiled arrow-grid pattern for atmospheric depth behind hero/dark
 * sections — the fine graphic texture from the reference boards, kept low
 * opacity so it reads as material rather than noise.
 */
export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="p32-grid-arrow" width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M6 16 L14 8 M14 8 L14 12.5 M14 8 L9.5 8"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </pattern>
        <radialGradient id="p32-grid-fade" cx="50%" cy="30%" r="75%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="p32-grid-mask">
          <rect width="100%" height="100%" fill="url(#p32-grid-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#p32-grid-arrow)" mask="url(#p32-grid-mask)" />
    </svg>
  );
}

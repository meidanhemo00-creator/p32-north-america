/**
 * Subtle tiled node-network pattern for atmospheric depth behind dark
 * sections — fine crosshair lines with node points at each intersection,
 * reading as a data/circuit lattice rather than decoration. Kept low
 * opacity so it's material, not noise; color comes from `currentColor`
 * via the className's text color.
 */
export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="p32-node-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M32 0 V64 M0 32 H64" stroke="currentColor" strokeWidth="1" opacity="0.55" fill="none" />
          <circle cx="32" cy="32" r="2" fill="currentColor" />
          <circle cx="0" cy="0" r="1.4" fill="currentColor" opacity="0.7" />
          <circle cx="64" cy="0" r="1.4" fill="currentColor" opacity="0.7" />
          <circle cx="0" cy="64" r="1.4" fill="currentColor" opacity="0.7" />
          <circle cx="64" cy="64" r="1.4" fill="currentColor" opacity="0.7" />
        </pattern>
        <radialGradient id="p32-grid-fade" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="60%" stopColor="white" stopOpacity="0.45" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="p32-grid-mask">
          <rect width="100%" height="100%" fill="url(#p32-grid-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#p32-node-grid)" mask="url(#p32-grid-mask)" />
    </svg>
  );
}

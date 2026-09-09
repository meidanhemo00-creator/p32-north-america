/**
 * A slow, thin light sweep drifting down the section — "the system reading
 * itself." Pure CSS animation (cheap), aria-hidden, one per section max.
 */
export function ScanLine({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden ${className}`}>
      <div
        className="animate-scanline absolute inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 5%, #d0e4e8 50%, transparent 95%)",
          boxShadow: "0 0 12px 1px rgba(208,228,232,0.6)",
        }}
      />
    </div>
  );
}

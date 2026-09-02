/**
 * Stand-in for a supplied photograph that could not be embedded (no file
 * reached this build environment). Layout, aspect ratio, and motion hooks
 * are production-ready — drop a real <img>/<video> in place of this div
 * and all scroll/hover treatment above it keeps working unchanged.
 */
export function AssetPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`asset-pending absolute inset-0 ${className}`}
      data-asset-label={`Pending asset — ${label}`}
    />
  );
}

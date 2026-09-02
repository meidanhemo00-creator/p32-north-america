import { withBasePath } from "@/lib/basePath";

/**
 * Real P32 brand mark, pulled from the client's own Drive assets
 * (public/brand/). "light" = white wordmark + blue star, for dark
 * grounds (used almost everywhere on this site). "dark" = near-black
 * wordmark, for light grounds (e.g. the paper-background Uniqueness
 * section).
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static brand asset, not a photo needing optimization
    <img src={withBasePath("/brand/p32-star.png")} alt="" aria-hidden="true" className={className} />
  );
}

export function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const src = variant === "light" ? "/brand/p32-lockup-light.png" : "/brand/p32-lockup-dark.png";
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static brand asset, not a photo needing optimization
    <img src={withBasePath(src)} alt="P32" className={className} />
  );
}

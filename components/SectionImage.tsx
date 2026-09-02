import { withBasePath } from "@/lib/basePath";

/**
 * Renders one of the temporary section images. See
 * public/images/README.md for the full list of files, what each one
 * depicts, and how to swap in final photography without touching any
 * component code — every file here is referenced only by its path below.
 */
export function SectionImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  // eslint-disable-next-line @next/next/no-img-element -- SVG scene assets, not photos needing next/image optimization
  return <img src={withBasePath(src)} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${className}`} />;
}

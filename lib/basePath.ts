// Prefix for root-relative asset paths (e.g. "/images/foo.svg") so they
// resolve correctly under a subpath deployment like GitHub Pages project
// sites. Empty string everywhere else (local dev, a future root-domain
// deploy) — see next.config.ts.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}

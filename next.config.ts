import type { NextConfig } from "next";

// GITHUB_PAGES is set only by the .github/workflows/gh-pages.yml preview
// build. Everywhere else (local dev, a future real deploy) this is
// unset and the site builds with no base path, at the domain root.
const isGhPages = process.env.GITHUB_PAGES === "true";
const repoName = "p32-north-america";
const basePath = isGhPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

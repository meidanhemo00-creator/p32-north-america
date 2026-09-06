import type { Metadata } from "next";
import { Oswald, Host_Grotesk } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Set only by the GitHub Pages preview workflow (.github/workflows/gh-pages.yml) —
// keeps this temporary review deployment out of search engines without
// affecting a future real deploy, where this stays unset/indexable.
const isPreviewDeploy = process.env.GITHUB_PAGES === "true";

export const metadata: Metadata = {
  title: "217 / Duvdevan — 40 Years of the Duvdevan Unit",
  description:
    "The untold story of the IDF's Duvdevan counter-terrorism unit, told across four decades. A commemorative book honoring its fallen and veterans — 100% of proceeds support the Commemoration Department of Friends of Duvdevan.",
  metadataBase: new URL("https://duvdevan-book.example"),
  openGraph: {
    title: "217 / Duvdevan — 40 Years of the Duvdevan Unit",
    description:
      "Four decades. One human chain. The untold story of the IDF's Duvdevan counter-terrorism unit.",
    type: "website",
  },
  ...(isPreviewDeploy
    ? { robots: { index: false, follow: false, nocache: true } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${hostGrotesk.variable} antialiased`}>
        <svg className="grain-overlay" aria-hidden="true">
          <filter id="grainFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grainFilter)" />
        </svg>
        {children}
      </body>
    </html>
  );
}

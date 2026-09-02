import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "P32 — Defense Solution Architects",
  description:
    "P32 is a trusted, objective defense solution architect — deconstructing challenges and reconstructing solutions across scouting, custom development, and integration for nations and intelligence agencies worldwide.",
  metadataBase: new URL("https://p32.example"),
  openGraph: {
    title: "P32 — Defense Solution Architects",
    description:
      "Deconstructing Challenges. Reconstructing Solutions. Defense solution architects that make your mission possible.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jbMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

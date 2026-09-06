import { Nav } from "@/components/duvdevan/Nav";
import { Hero } from "@/components/duvdevan/Hero";
import { Introduction } from "@/components/duvdevan/Introduction";
import { Chapters } from "@/components/duvdevan/Chapters";
import { FeaturedQuote } from "@/components/duvdevan/FeaturedQuote";
import { Gallery } from "@/components/duvdevan/Gallery";
import { Memorial } from "@/components/duvdevan/Memorial";
import { Purchase } from "@/components/duvdevan/Purchase";
import { Footer } from "@/components/duvdevan/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Introduction />
        <Chapters />
        <FeaturedQuote />
        <Gallery />
        <Memorial />
        <Purchase />
      </main>
      <Footer />
    </>
  );
}

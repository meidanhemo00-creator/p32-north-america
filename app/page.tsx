import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Vision } from "@/components/Vision";
import { Gap } from "@/components/Gap";
import { Uniqueness } from "@/components/Uniqueness";
import { Playbook } from "@/components/Playbook";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Vision />
        <Gap />
        <Uniqueness />
        <Playbook />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

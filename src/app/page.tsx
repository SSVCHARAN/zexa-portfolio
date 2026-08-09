import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { Particles } from "@/components/magicui/particles";
import { KineticCursor } from "@/components/magicui/kinetic-cursor";

export default function Home() {
  return (
    <>
      <KineticCursor />
      <Navbar />
      <main className="w-full relative z-10">
        <Hero />
        <Works />
        <Services />
        <Process />
        <About />
      </main>
      <Contact />
    </>
  );
}

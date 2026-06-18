import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { Particles } from "@/components/magicui/particles";

export default function Home() {
  return (
    <>
      <Particles
        className="fixed inset-0 z-0 opacity-100 pointer-events-none"
        quantity={80}
        ease={60}
        color="#A07CFE"
        refresh
      />
      <Navbar />
      <main className="w-full relative z-10">
        <Hero />
        <Works />
        <Services />
        <About />
      </main>
      <Contact />
    </>
  );
}

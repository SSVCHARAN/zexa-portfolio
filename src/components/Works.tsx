"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { TextRevealByProgress } from "./magicui/text-reveal";
import { Particles } from "./magicui/particles";

const projects = [
  { name: "Zexa Interiors", url: "https://zexa-interiors.vercel.app/", category: "Interior Design", image: "/project_interior.png" },
  { name: "Zexa Interiors V2", url: "https://zexa-interiors-v2.vercel.app/", category: "Interior Design", image: "/project_interior_v2.png" },
  { name: "Zexa Constructions", url: "https://zexa-constructions.vercel.app/", category: "Architecture", image: "/project_architecture.png" },
  { name: "Zexa Constructions V2", url: "https://zexa-constructions-v2.vercel.app/", category: "Architecture", image: "/project_architecture_v2.png" },
  { name: "Loyal Clothing", url: "https://loyal-clothing.vercel.app/", category: "E-Commerce", image: "/project_ecommerce.png" },
  { name: "Loyal Clothing V2", url: "https://loyal-clothing-v2.vercel.app/", category: "E-Commerce", image: "/project_portfolio.png" },
  { name: "Zexa Events", url: "https://zexa-events.vercel.app/", category: "Event Management", image: "/project_saas.png" },
  { name: "Zexa Events V2", url: "https://zexa-events-v2.vercel.app/", category: "Event Management", image: "/project_agency.png" },
  { name: "Zexa Karting", url: "https://zexa-karting.vercel.app/", category: "Sports & Recreation", image: "/project-placeholder.png" },
];

export default function Works() {
  const targetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start 85%", "start 30%"]
  });

  const x = useTransform(scrollYProgress, (pos) => `calc(-${pos * 100}% + ${pos * 100}vw)`);

  return (
    <section ref={targetRef} id="works" className="relative h-[400vh] bg-[#18181B] text-[var(--color-soft-cream)]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12 md:py-24">
        
        {/* Background Particles */}
        <Particles 
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={300}
          ease={80}
          color="#8FAF9A"
          size={1.5}
          refresh
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full mb-8 md:mb-12 shrink-0 relative z-10">
          <motion.h2 
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <TextRevealByProgress progress={headerProgress} className="text-4xl md:text-5xl font-bold tracking-tight">
              Featured Experiences
            </TextRevealByProgress>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--foreground)]/70 max-w-2xl"
          >
            Dive into our proudest moments! Every single project here is a testament to our absolute obsession with jaw-dropping aesthetics and lightning-fast functionality.
          </motion.p>
        </div>

        <motion.div style={{ x }} className="flex gap-6 md:gap-8 px-4 md:px-8 w-max">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              onClick={() => window.open(project.url, '_blank')}
              whileHover={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="group relative block overflow-hidden rounded-2xl bg-[var(--foreground)]/5 w-[85vw] md:w-[40vw] lg:w-[30vw] aspect-[4/3] shrink-0 cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 40vw, 30vw"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/90 via-[var(--background)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[var(--color-sage-green)] text-sm font-semibold tracking-wider uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="text-2xl font-bold text-[var(--foreground)]">
                  {project.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

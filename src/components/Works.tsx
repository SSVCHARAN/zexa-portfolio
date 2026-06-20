"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Particles } from "./magicui/particles";

const projects = [
  { name: "Zexa Interiors", url: "https://zexa-interiors.vercel.app/", category: "Interior Design", image: "/interiors.png", position: "object-center" },
  { name: "Zexa Interiors V2", url: "https://zexa-interiors-v2.vercel.app/", category: "Interior Design", image: "/zexa interiors-v2.png", position: "object-center" },
  { name: "Zexa Constructions V2", url: "https://zexa-constructions-v2.vercel.app/", category: "Architecture", image: "/constructions-v2.png", position: "object-center" },
  { name: "Zexa Constructions", url: "https://zexa-constructions.vercel.app/", category: "Architecture", image: "/construction.png", position: "object-left-top" },
  { name: "Loyal Clothing", url: "https://loyal-clothing.vercel.app/", category: "E-Commerce", image: "/loyal clothing-v1.png", position: "object-left-top" },
  { name: "Loyal Clothing V2", url: "https://loyal-clothing-v2.vercel.app/", category: "E-Commerce", image: "/loyal clothing-v2.png", position: "object-center" },
  { name: "Zexa Events", url: "https://zexa-events.vercel.app/", category: "Event Management", image: "/zexa-events.png", position: "object-left-top" },
  { name: "Zexa Events V2", url: "https://zexa-events-v2.vercel.app/", category: "Event Management", image: "/zexa evernts-v2.png", position: "object-center" },
  { name: "Zexa Karting", url: "https://zexa-karting.vercel.app/", category: "Sports & Recreation", image: "/zexa-karting.png", position: "object-left-top" },
];

export default function Works() {
  return (
    <section id="works" className="relative w-full bg-[#18181B] text-[var(--color-soft-cream)] py-24 md:py-32 overflow-hidden">
      {/* Background Particles */}
      <Particles 
        className="absolute inset-0 z-0 pointer-events-none hidden md:block opacity-40"
        quantity={30}
        ease={80}
        color="#8FAF9A"
        refresh
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Featured Experiences
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-[var(--foreground)]/70 leading-relaxed"
          >
            Dive into our proudest moments. Every single project here is a testament to our absolute obsession with jaw-dropping aesthetics and lightning-fast functionality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {projects.map((project, index) => {
            // Custom grid layout mapping based on image aspect ratios and content
            const spans = [
              "md:col-span-4", "md:col-span-8", // Interiors
              "md:col-span-4", "md:col-span-8", // Constructions
              "md:col-span-8", "md:col-span-4", // Loyal
              "md:col-span-4", "md:col-span-8", // Events
              "md:col-span-12 lg:col-span-8 lg:col-start-3" // Karting
            ];
            let colSpanClass = spans[index] || "md:col-span-6";

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
                className={`${colSpanClass} group relative block overflow-hidden rounded-[2rem] bg-[#222225] aspect-[4/3] md:aspect-auto md:h-[400px] lg:h-[450px] xl:h-[500px] cursor-pointer`}
                onClick={() => window.open(project.url, '_blank')}
              >
                {/* Image */}
                <div className="absolute inset-0 w-full h-full transition-transform duration-1000 group-hover:scale-[1.03] ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    unoptimized
                    className={`object-cover ${project.position} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 lg:p-10 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <div className="overflow-hidden">
                    <p className="text-[#8FAF9A] text-xs md:text-sm font-bold tracking-widest uppercase mb-2 md:mb-3 opacity-90">
                      {project.category}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                      {project.name}
                    </h3>
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

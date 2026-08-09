"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ExternalLink, X, Sparkles, Layers } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Particles } from "./magicui/particles";
import { Magnetic } from "./magicui/magnetic";
import { sound } from "@/lib/sound";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  image: string;
  position: string;
  accent: string;
  stack?: string[];
}

const categories = ["All", "Interior Design", "Architecture", "E-Commerce", "Event Management", "Sports & Recreation"];

const projects: Project[] = [
  {
    id: "01",
    name: "Zexa Interiors",
    url: "https://zexa-interiors.vercel.app/",
    category: "Interior Design",
    description: "Bespoke interior design showcase featuring luxury spatial visualizers, fluid smooth motion, and editorial typography.",
    image: "/interiors.png",
    position: "object-center",
    accent: "#8FAF9A",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
  },
  {
    id: "02",
    name: "Zexa Interiors V2",
    url: "https://zexa-interiors-v2.vercel.app/",
    category: "Interior Design",
    description: "Next-generation interior studio platform with interactive project galleries, ambient lighting, and dark mode aesthetics.",
    image: "/zexa interiors-v2.png",
    position: "object-center",
    accent: "#A07CFE",
    stack: ["Next.js", "Tailwind v4", "Lucide React"],
  },
  {
    id: "03",
    name: "Zexa Constructions V2",
    url: "https://zexa-constructions-v2.vercel.app/",
    category: "Architecture",
    description: "High-end architecture & structural engineering portfolio built for enterprise commercial and residential developments.",
    image: "/constructions-v2.png",
    position: "object-center",
    accent: "#34D399",
    stack: ["React 19", "Framer Motion", "TypeScript"],
  },
  {
    id: "04",
    name: "Zexa Constructions",
    url: "https://zexa-constructions.vercel.app/",
    category: "Architecture",
    description: "Modern civil engineering & architectural design showcase with structural metrics and interactive project blueprints.",
    image: "/construction.png",
    position: "object-left-top",
    accent: "#F59E0B",
    stack: ["Next.js App Router", "Tailwind CSS"],
  },
  {
    id: "05",
    name: "Loyal Clothing",
    url: "https://loyal-clothing.vercel.app/",
    category: "E-Commerce",
    description: "Luxury streetwear & fashion e-commerce experience with minimalist typography, editorial lookbooks, and smooth shopping flow.",
    image: "/loyal clothing-v1.png",
    position: "object-left-top",
    accent: "#EC4899",
    stack: ["E-Commerce UI", "Framer Motion", "Tailwind"],
  },
  {
    id: "06",
    name: "Loyal Clothing V2",
    url: "https://loyal-clothing-v2.vercel.app/",
    category: "E-Commerce",
    description: "High-fashion e-commerce platform featuring cinematic product previews, instant cart drawers, and dark luxury branding.",
    image: "/loyal clothing-v2.png",
    position: "object-center",
    accent: "#8B5CF6",
    stack: ["Next.js 16", "Cinematic Motion", "Stripe"],
  },
  {
    id: "07",
    name: "Zexa Events",
    url: "https://zexa-events.vercel.app/",
    category: "Event Management",
    description: "Boutique event management platform featuring interactive booking schedules, venue showcases, and brand experience design.",
    image: "/zexa-events.png",
    position: "object-left-top",
    accent: "#3B82F6",
    stack: ["Interactive UI", "Calendar Sync", "Tailwind"],
  },
  {
    id: "08",
    name: "Zexa Events V2",
    url: "https://zexa-events-v2.vercel.app/",
    category: "Event Management",
    description: "Luxury event production & experiential agency portfolio with dynamic motion graphics, schedule booking, and high-impact visuals.",
    image: "/zexa evernts-v2.png",
    position: "object-center",
    accent: "#10B981",
    stack: ["Motion Graphics", "Framer Motion", "Next.js"],
  },
  {
    id: "09",
    name: "Zexa Karting",
    url: "https://zexa-karting.vercel.app/",
    category: "Sports & Recreation",
    description: "High-octane motorsport & karting arena platform featuring live race telemetry, venue reservations, and interactive track maps.",
    image: "/zexa-karting.png",
    position: "object-left-top",
    accent: "#EF4444",
    stack: ["Telemetry Dashboard", "Live Reservations"],
  },
];

export default function Works() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

  useEffect(() => {
    if (shouldReduceMotion || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cardElements.length === 0) return;

      cardElements.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 25%",
          end: "bottom top",
          onEnter: () => setActiveCardIndex(i),
          onEnterBack: () => setActiveCardIndex(i),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects, shouldReduceMotion]);

  return (
    <section 
      ref={containerRef}
      id="works" 
      className="relative w-full bg-[#18181B] text-white py-28 md:py-36 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 280, damping: 22 }}
            className="flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8FAF9A] mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF9A]" />
            <span>Selected Projects</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF9A]" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]"
          >
            Featured Experiences
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 280, damping: 22, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed"
          >
            Explore our portfolio of bespoke digital platforms. Scroll down to experience the cascading sticky card trail locking into place with custom offsets.
          </motion.p>
        </div>

        {/* Category Filter Pills & Deck Indicator */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="flex flex-wrap items-center gap-2 pb-2 overflow-x-auto"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playTabSwitch();
                  setActiveCategory(cat);
                  setActiveCardIndex(0);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 z-10 ${
                  activeCategory === cat ? "text-[#0A0A0E]" : "text-neutral-300 hover:text-white bg-white/5 border border-white/10"
                }`}
                data-cursor="FILTER"
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-[#8FAF9A] rounded-full z-0"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 350, damping: 25 }
                    }
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>

          {/* Active Card Indicator */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-neutral-300">
            <Layers className="w-4 h-4 text-[#8FAF9A]" />
            <span>STICKY SHOWCASE {String(activeCardIndex + 1).padStart(2, "0")} / {String(displayedProjects.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Sticky Stacking Card Trail with Progressive Offset Gaps */}
        <div className="relative flex flex-col gap-10 md:gap-16 pb-12">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => {
              // Responsive compact sticky top offset for mobile & desktop
              const stickyTopPx = isMobile ? Math.min(75 + index * 10, 135) : Math.min(90 + index * 12, 170);

              return (
                <motion.div
                  key={project.name}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  layoutId={`card-${project.id}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.1 }
                      : { type: "spring", stiffness: 280, damping: 22 }
                  }
                  className="sticky rounded-[2.5rem] border border-white/15 bg-[#1D1D22]/98 backdrop-blur-2xl shadow-[0_-12px_45px_rgba(0,0,0,0.7)] transition-all duration-300 overflow-hidden group cursor-pointer"
                  style={{
                    top: `${stickyTopPx}px`,
                    zIndex: index + 10,
                  }}
                  onClick={() => {
                    sound.playModalOpen();
                    setSelectedProject(project);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="EXPAND"
                >
                  <div className="p-6 sm:p-8 md:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column: Metadata */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-6">
                          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-[#8FAF9A]">
                            {project.id} / 09
                          </span>
                          <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-neutral-300">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 group-hover:text-[#8FAF9A] transition-colors duration-300">
                          {project.name}
                        </h3>

                        <p className="text-neutral-300/90 text-base sm:text-lg font-light leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Tech Stack Pills */}
                        {project.stack && (
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.stack.map(tech => (
                              <span key={tech} className="px-3 py-1 rounded-md bg-white/5 text-xs text-neutral-400 font-mono border border-white/5">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* CTAs */}
                      <div className="flex items-center gap-4">
                        <Magnetic strength={0.3}>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/10 hover:bg-[#8FAF9A] text-white hover:text-[#0A0A0E] font-bold text-sm border border-white/15 hover:border-[#8FAF9A] transition-all duration-300 shadow-lg"
                            data-cursor="VISIT"
                          >
                            <span>Visit Live Site</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </Magnetic>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playModalOpen();
                            setSelectedProject(project);
                          }}
                          className="text-xs font-semibold text-neutral-400 hover:text-white underline underline-offset-4"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Preview Image */}
                    <div 
                      className="lg:col-span-7 relative h-[260px] sm:h-[340px] md:h-[400px] lg:h-[440px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500"
                    >
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className={`object-cover ${project.position} opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />

                      {/* Gradient Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      
                      {/* Hover Badge */}
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:bg-[#8FAF9A] group-hover:text-[#0A0A0E] group-hover:scale-110 transition-all duration-300 shadow-xl">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View All / Show Less CTA Toggle Button */}
        {filteredProjects.length > 4 && (
          <div className="flex justify-center pt-6">
            <Magnetic strength={0.3}>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowAll(!showAll);
                }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-[#8FAF9A] text-white hover:text-[#0A0A0E] font-bold text-sm border border-white/20 hover:border-[#8FAF9A] transition-all duration-300 shadow-2xl"
                data-cursor="TOGGLE"
              >
                <span>{showAll ? "Show Top Projects (04)" : `View All Projects (${filteredProjects.length})`}</span>
                <Sparkles className="w-4 h-4 fill-current" />
              </button>
            </Magnetic>
          </div>
        )}
      </div>

      {/* Shared Element Layout Modal Quick View */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sound.playModalClose();
                setSelectedProject(null);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#18181B] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 text-white"
            >
              {/* Close Button */}
              <Magnetic strength={0.3} className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => {
                    sound.playModalClose();
                    setSelectedProject(null);
                  }}
                  className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  data-cursor="CLOSE"
                >
                  <X className="w-5 h-5" />
                </button>
              </Magnetic>

              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#8FAF9A] mb-3">
                <span>{selectedProject.id} / 09</span>
                <span>•</span>
                <span>{selectedProject.category}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black mb-4">{selectedProject.name}</h2>
              <p className="text-neutral-300 text-base sm:text-lg mb-8 leading-relaxed font-light">
                {selectedProject.description}
              </p>

              {/* Large Image Preview */}
              <div className="relative w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden mb-8 border border-white/10">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack?.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-md bg-white/10 text-xs font-mono text-neutral-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <Magnetic strength={0.4}>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#8FAF9A] text-[#0A0A0E] font-bold text-sm hover:bg-[#a3c4ae] transition-all shadow-lg"
                    data-cursor="LAUNCH"
                  >
                    <span>Launch Project</span>
                    <Sparkles className="w-4 h-4 fill-current" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

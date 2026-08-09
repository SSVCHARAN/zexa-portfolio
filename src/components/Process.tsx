"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Compass, Cpu, Layers, Rocket, CheckCircle2 } from "lucide-react";
import { Particles } from "./magicui/particles";
import { Magnetic } from "./magicui/magnetic";

const steps = [
  {
    number: "01",
    title: "Discovery & Architecture",
    icon: Compass,
    accent: "#8FAF9A",
    glow: "rgba(143, 175, 154, 0.4)",
    description: "We analyze target user flows, visual hierarchy, and brand positioning to map out a bespoke digital blueprint.",
    deliverables: ["User Journey Mapping", "Wireframe Architecture", "Tech Stack Strategy"],
    align: "left",
  },
  {
    number: "02",
    title: "Motion & UI Design",
    icon: Layers,
    accent: "#A07CFE",
    glow: "rgba(160, 124, 254, 0.4)",
    description: "Crafting editorial typography, dark obsidian palettes, and fluid interactive prototypes tuned to physical spring dynamics.",
    deliverables: ["Design System Tokens", "Spring Physics", "High-Contrast Dark Theme"],
    align: "right",
  },
  {
    number: "03",
    title: "High-Performance Build",
    icon: Cpu,
    accent: "#34D399",
    glow: "rgba(52, 211, 153, 0.4)",
    description: "Engineering clean Next.js 16 & React 19 code with Framer Motion, optimized for 60fps renders and sub-100ms load times.",
    deliverables: ["Next.js 16 App Router", "Framer Motion & GSAP", "Turbopack Bundling"],
    align: "left",
  },
  {
    number: "04",
    title: "Launch & Optimization",
    icon: Rocket,
    accent: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.4)",
    description: "Vercel global edge deployment, Lighthouse audit perfection, continuous telemetry, and ongoing partnership.",
    deliverables: ["Vercel Global Edge CDN", "99+ Lighthouse Score", "SLA Performance Warranty"],
    align: "right",
  },
];

import { sound } from "@/lib/sound";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      id="process" 
      className="py-28 px-4 md:px-8 relative overflow-hidden bg-[#0A0A0E] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Section Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 280, damping: 22 }}
            className="flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8FAF9A] mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF9A]" />
            <span>Our Methodology</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF9A]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight mb-6"
          >
            How We Build <span className="text-[#8FAF9A]">Excellence.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 280, damping: 22, delay: 0.2 }}
            className="text-lg text-neutral-300 font-light leading-relaxed"
          >
            Scroll down to advance through our 4-stage telemetry timeline with live glowing node ignitions.
          </motion.p>
        </div>

        {/* Scroll-Linked Telemetry Timeline Container */}
        <div className="relative max-w-5xl mx-auto py-8">
          
          {/* Central Vertical Cable Line Background */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[3px] bg-white/10 -translate-x-1/2 z-0" />

          {/* Active Scroll Progress Beam */}
          <motion.div
            style={{ height: shouldReduceMotion ? "100%" : lineHeight }}
            className="absolute left-6 lg:left-1/2 top-0 w-[3px] bg-gradient-to-b from-[#8FAF9A] via-[#A07CFE] to-[#34D399] -translate-x-1/2 z-0 shadow-[0_0_15px_#8FAF9A]"
          />

          {/* Timeline Step Cards */}
          <div className="space-y-16 lg:space-y-24 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isRight = step.align === "right";

              return (
                <div 
                  key={step.number}
                  className={`flex flex-col lg:flex-row items-center justify-between gap-8 relative pl-14 lg:pl-0 ${
                    isRight ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Faint Glowing Dot Blob Node */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.4 }}
                    whileInView={{ scale: 1.25, opacity: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute left-6 lg:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full z-20 border-2 border-white flex items-center justify-center pointer-events-none"
                    style={{
                      backgroundColor: step.accent,
                      borderColor: step.accent,
                      boxShadow: `0 0 25px ${step.accent}, 0 0 50px ${step.glow}`,
                    }}
                  />

                  {/* Stage Card Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, x: isRight ? 20 : -20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 280, damping: 22 }}
                    className="w-full lg:w-[45%] p-8 sm:p-10 rounded-3xl bg-[#18181B]/95 border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden group cursor-pointer"
                    data-cursor="STAGE"
                  >
                    {/* Background Soft Accent Glow */}
                    <div 
                      className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
                      style={{ backgroundColor: step.accent }}
                    />

                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: step.accent }}>
                        STAGE {step.number}
                      </span>
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10" style={{ color: step.accent }}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black mb-3 text-white">
                      {step.title}
                    </h3>

                    <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Key Deliverables Chips */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-3">
                        Key Deliverables
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((item) => (
                          <div 
                            key={item} 
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-neutral-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: step.accent }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Empty Spacer Column for Desktop Balance */}
                  <div className="hidden lg:block w-[45%]" />
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <Magnetic strength={0.3} className="inline-block">
            <a
              href="#contact"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playSparkle()}
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#8FAF9A] text-[#0A0A0E] font-bold text-base hover:bg-[#a3c4ae] transition-all shadow-[0_0_30px_rgba(143,175,154,0.3)]"
            >
              <span>Initiate Stage 01 Discovery</span>
              <Compass className="w-4 h-4" />
            </a>
          </Magnetic>
        </div>

      </div>
    </section>
  );
}

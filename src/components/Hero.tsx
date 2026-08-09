"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Particles } from "./magicui/particles";
import { Magnetic } from "./magicui/magnetic";
import Hero3DCanvas from "./Hero3DCanvas";
import HeroBackgroundCanvas from "./HeroBackgroundCanvas";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 220]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const shouldReduceMotion = useReducedMotion();

  // Interactive mouse spotlight with spring damping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 22 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0E] text-white pt-32 pb-20 md:pt-40 md:pb-28">
      {/* 1. Architectural SVG Grid Matrix Background */}
      <div className="absolute inset-0 z-0 opacity-[0.14] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid-matrix" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.2" fill="rgba(143, 175, 154, 0.5)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-matrix)" />
        </svg>
      </div>

      {/* 2. Interactive Constellation Web Matrix Canvas Background */}
      <HeroBackgroundCanvas />

      {/* Vignette Mask & Bottom Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,14,0.6)_65%,#0A0A0E_100%)] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#18181B] via-[#18181B]/80 to-transparent z-0 pointer-events-none" />

      {/* Grid Layout Container */}
      <motion.div
        style={shouldReduceMotion ? {} : { y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Category Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 280, damping: 22 }
            }
            className="flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#8FAF9A] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF9A]" />
            <span>Digital Experience & Web Architecture</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF9A]" />
          </motion.div>

          {/* Headline Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 260, damping: 20, delay: 0.1 }
            }
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 leading-[0.98] text-white"
          >
            Zexa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8FAF9A] via-[#A8B5A2] to-neutral-200">
              Designs
            </span>
          </motion.h1>

          {/* Editorial Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 280, damping: 22, delay: 0.2 }
            }
            className="text-lg sm:text-xl text-neutral-300/90 max-w-xl font-light leading-relaxed mb-10 drop-shadow-md"
          >
            We craft bespoke web architecture, immersive motion interfaces, and high-performance digital platforms that elevate ambitious brands.
          </motion.p>

          {/* Kinetic Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 280, damping: 22, delay: 0.3 }
            }
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start w-full sm:w-auto mb-14"
          >
            <Magnetic strength={0.4}>
              <a
                href="#works"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#8FAF9A] text-[#0A0A0E] font-bold text-base hover:bg-[#a3c4ae] transition-all duration-300 shadow-[0_0_30px_rgba(143,175,154,0.3)] hover:shadow-[0_0_40px_rgba(143,175,154,0.5)]"
                data-cursor="EXPLORE"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Explore Works</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-base border border-white/15 backdrop-blur-xl hover:border-white/30 transition-all duration-300 shadow-xl shadow-black/40"
                data-cursor="VIEW"
              >
                Our Services
              </a>
            </Magnetic>
          </motion.div>

          {/* Studio Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 280, damping: 22, delay: 0.4 }
            }
            className="w-full max-w-lg grid grid-cols-3 gap-2 sm:gap-4 pt-8 border-t border-white/10 text-center lg:text-left"
          >
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">9+</div>
              <div className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-widest font-semibold mt-1">Live Showcases</div>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="border-x border-white/10 px-1.5 sm:px-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#8FAF9A]">100%</div>
              <div className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-widest font-semibold mt-1">Bespoke Code</div>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-200">&lt; 100ms</div>
              <div className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-widest font-semibold mt-1">Render Speed</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: 3D Kinetic Polyhedron Canvas Monolith */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.1 }
              : { type: "spring", stiffness: 240, damping: 22, delay: 0.2 }
          }
          className="lg:col-span-5 h-[320px] sm:h-[420px] lg:h-[500px] w-full flex items-center justify-center relative"
        >
          {/* Subtle Ambient Ring Glow behind 3D Monolith */}
          <div className="absolute inset-0 bg-[#8FAF9A]/10 blur-[100px] rounded-full pointer-events-none" />
          <Hero3DCanvas />
        </motion.div>
      </motion.div>
    </section>
  );
}

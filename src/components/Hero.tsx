"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div style={{ y }} className="absolute -inset-y-[30%] inset-x-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Zexa Designs Hero"
          fill
          priority
          quality={100}
          unoptimized
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient Overlay for blending */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[var(--background)]/20 to-[var(--background)]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-panel p-8 md:p-16 rounded-3xl border border-white/20 backdrop-blur-xl bg-white/10 shadow-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--foreground)] mb-6"
          >
            Zexa Designs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-[var(--foreground)]/80 max-w-2xl mx-auto font-medium"
          >
            Crafting premium, highly-aesthetic digital experiences that elevate your brand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#works"
              className="px-8 py-4 rounded-full bg-[var(--foreground)] text-[var(--background)] font-semibold hover:scale-105 transition-transform duration-300"
            >
              View Our Work
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-full bg-transparent border border-[var(--foreground)] text-[var(--foreground)] font-semibold hover:bg-[var(--foreground)]/5 transition-colors duration-300"
            >
              Our Services
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-sm font-medium tracking-widest uppercase text-[var(--foreground)]/60">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-[var(--foreground)]/30"
        />
      </motion.div>
    </section>
  );
}

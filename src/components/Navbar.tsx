"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-4 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--foreground)]/10 shadow-sm" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Zexa.
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#works" className="text-[var(--foreground)]/80 hover:text-[var(--color-sage-green)] transition-colors">Works</a>
          <a href="#services" className="text-[var(--foreground)]/80 hover:text-[var(--color-sage-green)] transition-colors">Services</a>
          <a href="#about" className="text-[var(--foreground)]/80 hover:text-[var(--color-sage-green)] transition-colors">About</a>
          <a href="#contact" className="px-5 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:scale-105 transition-transform duration-300">
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

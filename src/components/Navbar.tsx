"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import { Magnetic } from "./magicui/magnetic";
import { SoundToggle } from "./SoundToggle";

const navItems = [
  { name: "Works", href: "#works" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("Works");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.1 }
          : { type: "spring", stiffness: 280, damping: 22 }
      }
      className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 md:pt-6 pointer-events-none"
    >
      <div
        className={`max-w-5xl mx-auto pointer-events-auto rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-[#18181B]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2.5 px-6"
            : "bg-white/[0.03] backdrop-blur-md border border-white/10 py-3.5 px-7 shadow-lg shadow-black/20"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo with Magnetic pull */}
          <Magnetic strength={0.25}>
            <a
              href="#"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-white group"
            >
              <span className="w-8 h-8 rounded-full bg-[#8FAF9A]/20 border border-[#8FAF9A]/40 flex items-center justify-center text-[#8FAF9A] group-hover:scale-110 group-hover:bg-[#8FAF9A] group-hover:text-[#18181B] transition-all duration-300">
                Z
              </span>
              <span className="tracking-tighter">
                Zexa<span className="text-[#8FAF9A]">.</span>
              </span>
            </a>
          </Magnetic>

          {/* Desktop Nav Items with Layout Pill */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium bg-white/5 p-1 rounded-full border border-white/5 relative">
            {navItems.map((item) => (
              <Magnetic key={item.name} strength={0.2}>
                <a
                  href={item.href}
                  onClick={() => setActiveTab(item.name)}
                  className="relative px-5 py-2 rounded-full text-neutral-300 hover:text-white transition-colors duration-200 block z-10"
                >
                  {activeTab === item.name && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/15 rounded-full z-0"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 350, damping: 25 }
                      }
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Magnetic CTA Button & Sound Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <SoundToggle />
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="relative group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#8FAF9A] text-[#18181B] font-bold text-sm hover:bg-[#a3c4ae] transition-all duration-300 shadow-[0_0_20px_rgba(143,175,154,0.3)]"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Let&apos;s Talk</span>
              </a>
            </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <Magnetic strength={0.2} className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Mobile Menu Dropdown with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 300, damping: 24 }
            }
            className="md:hidden pointer-events-auto mt-3 max-w-sm mx-auto p-6 rounded-3xl bg-[#18181B]/95 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 text-center"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  setActiveTab(item.name);
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-lg text-neutral-200 hover:text-[#8FAF9A] font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-2">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Audio Feedback</span>
              <SoundToggle />
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 rounded-full bg-[#8FAF9A] text-[#18181B] font-bold text-center mt-1 shadow-lg hover:bg-[#a3c4ae] transition-all"
            >
              Let&apos;s Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

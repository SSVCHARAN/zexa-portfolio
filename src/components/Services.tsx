"use client";

import { motion, useScroll, useReducedMotion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Sparkles, Zap, Shield, Crown } from "lucide-react";
import { useRef, useState } from "react";
import { ShineBorder } from "./magicui/shine-border";
import { TextRevealByProgress } from "./magicui/text-reveal";
import { Particles } from "./magicui/particles";
import { Magnetic } from "./magicui/magnetic";
import { sound } from "@/lib/sound";

interface FeatureItem {
  text: string;
  detail: string;
  glowing?: boolean;
}

interface ServiceTier {
  title: string;
  badge?: string;
  icon: typeof Zap;
  projectPrice: string;
  partnerPrice: string;
  description: string;
  features: FeatureItem[];
  highlighted: boolean;
  accent: string;
}

const services: ServiceTier[] = [
  {
    title: "Basic",
    icon: Zap,
    projectPrice: "$75",
    partnerPrice: "$45/mo",
    description: "Essential bespoke web architecture for ambitious small businesses.",
    features: [
      { text: "Custom UI/UX Architecture", detail: "Figma wireframes, editorial typography, and high-contrast dark theme styling." },
      { text: "Mobile Responsive Build", detail: "Optimized layouts for 375px mobile, tablet, and 1440px+ ultra-wide screens." },
      { text: "SEO & Performance Suite", detail: "Metadata tags, OpenGraph previews, and clean HTML5 semantic structure." },
    ],
    highlighted: false,
    accent: "#8FAF9A",
  },
  {
    title: "Standard",
    badge: "MOST POPULAR",
    icon: Crown,
    projectPrice: "$100",
    partnerPrice: "$75/mo",
    description: "Full-scale digital platform with cinematic scroll physics & CMS.",
    features: [
      { text: "Everything in Basic", detail: "Includes complete custom UI/UX design and responsive layout engineering." },
      { text: "Advanced CMS & Telemetry", detail: "Seamless dynamic content management with Next.js App Router & API routes." },
      { text: "Cinematic Scroll Physics", detail: "GSAP ScrollTrigger, Lenis smooth scrolling, and 3D depth deck stacking.", glowing: true },
      { text: "Tactile Audio Micro-Feedback", detail: "Web Audio API sound engine for magnetic hover & click interactions.", glowing: true },
    ],
    highlighted: true,
    accent: "#A07CFE",
  },
  {
    title: "Premium",
    badge: "ENTERPRISE",
    icon: Shield,
    projectPrice: "$150",
    partnerPrice: "$120/mo",
    description: "Bespoke digital flagship with interactive 3D elements & AI workflows.",
    features: [
      { text: "Everything in Standard", detail: "Includes full CMS, motion architecture, and complete sound engine." },
      { text: "Interactive 3D WebGL Monolith", detail: "Custom HTML5 Canvas & Three.js 3D wireframe matrices tied to cursor physics.", glowing: true },
      { text: "AI-Powered Automation", detail: "Custom API integrations, LLM workflows, and intelligent lead calculators.", glowing: true },
      { text: "24/7 Priority SLA & Warranty", detail: "Dedicated engineering response, uptime SLA, and continuous performance tuning." },
    ],
    highlighted: false,
    accent: "#34D399",
  },
];

function SpotlightCard({ service, billingMode }: { service: ServiceTier; billingMode: "project" | "partner" }) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const Icon = service.icon;
  const price = billingMode === "project" ? service.projectPrice : service.partnerPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.01 }}
      viewport={{ once: true }}
      transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 280, damping: 22 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => sound.playHover()}
      className={`relative p-8 sm:p-10 rounded-3xl border flex flex-col h-full bg-[#18181B]/95 backdrop-blur-2xl transition-all duration-300 overflow-visible group cursor-pointer ${
        service.highlighted
          ? "border-[#A07CFE]/50 shadow-[0_0_40px_rgba(160,124,254,0.2)]"
          : "border-white/10 hover:border-white/20 shadow-xl"
      }`}
      data-cursor="TIER"
    >
      {/* Live Mouse Radial Mesh Spotlight (Isolated with rounded overflow-hidden) */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div
          className="absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${service.accent}20, transparent 70%)`,
          }}
        />
      </div>

      {service.highlighted && <ShineBorder shineColor={["#A07CFE", "#8FAF9A", "#34D399"]} />}

      {/* Top Badge (Positioned proudly above top border without clipping) */}
      {service.badge && (
        <div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-full shadow-lg z-30"
          style={{ backgroundColor: service.accent, color: "#0A0A0E" }}
        >
          {service.badge}
        </div>
      )}

      {/* Header Info */}
      <div className="mb-8 relative z-10 text-left w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10" style={{ color: service.accent }}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            {billingMode === "project" ? "One-Time Build" : "Retainer Support"}
          </span>
        </div>

        <h3 className="text-3xl font-black mb-2 text-white">{service.title}</h3>
        <p className="text-sm text-neutral-300 font-light mb-6 leading-relaxed">
          {service.description}
        </p>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-semibold uppercase tracking-widest text-[#8FAF9A]">
            Custom Scope
          </span>
        </div>
      </div>

      {/* Interactive Feature Accordion List */}
      <div className="mb-8 flex-grow relative z-10 text-left w-full space-y-3">
        <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-3">
          Deliverables (Click to Inspect)
        </div>

        {service.features.map((feature, i) => {
          const isExpanded = expandedFeature === i;

          return (
            <div 
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                setExpandedFeature(isExpanded ? null : i);
              }}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                isExpanded 
                  ? "bg-white/10 border-white/20" 
                  : "bg-white/5 border-white/5 hover:bg-white/[0.08]"
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1 rounded-full ${feature.glowing ? "bg-[#8FAF9A]/20 text-[#8FAF9A]" : "bg-white/10 text-white"}`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={feature.glowing ? "text-[#8FAF9A] font-bold" : "text-neutral-200"}>
                    {feature.text}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${isExpanded ? "rotate-180 text-white" : ""}`} />
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-2 text-xs text-neutral-300 leading-relaxed font-light pl-7">
                      {feature.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Magnetic Action CTA */}
      <Magnetic strength={0.3} className="w-full relative z-10">
        <button 
          onClick={() => {
            sound.playClick();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full py-4 rounded-xl font-bold transition-all duration-300 text-sm shadow-lg flex items-center justify-center gap-2"
          style={{
            backgroundColor: service.highlighted ? service.accent : "rgba(255,255,255,0.06)",
            color: service.highlighted ? "#0A0A0E" : "#FFFFFF",
            border: `1px solid ${service.highlighted ? service.accent : "rgba(255,255,255,0.15)"}`,
          }}
        >
          <span>Request {service.title} Package</span>
          <Sparkles className="w-4 h-4 fill-current" />
        </button>
      </Magnetic>
    </motion.div>
  );
}

export default function Services() {
  const [billingMode, setBillingMode] = useState<"project" | "partner">("project");
  const headerRef = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start 85%", "start 30%"]
  });

  return (
    <section id="services" className="py-28 px-4 md:px-8 relative overflow-hidden bg-[#0D0D11]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[#8FAF9A]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 280, damping: 22 }}
            className="flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8FAF9A] mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF9A]" />
            <span>Architecture & Pricing Tiers</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF9A]" />
          </motion.div>

          <motion.h2 
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 280, damping: 22 }}
            className="mb-4 text-white"
          >
            <TextRevealByProgress progress={headerProgress} className="text-4xl sm:text-6xl font-bold tracking-tight justify-center">
              Bespoke Solutions.
            </TextRevealByProgress>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
            className="text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Tailored engineering plans designed to scale with your ambition. Choose between one-time project builds or continuous monthly design partnerships.
          </motion.p>
        </div>

        {/* Interactive Scope Billing Switcher Pill */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/5 border border-white/10 p-1.5 rounded-full flex items-center gap-2 relative">
            <button
              onClick={() => {
                sound.playTabSwitch();
                setBillingMode("project");
              }}
              className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 z-10 ${
                billingMode === "project" ? "text-[#0A0A0E]" : "text-neutral-300 hover:text-white"
              }`}
            >
              {billingMode === "project" && (
                <motion.div
                  layoutId="servicesBillingPill"
                  className="absolute inset-0 bg-[#8FAF9A] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">One-Time Build</span>
            </button>

            <button
              onClick={() => {
                sound.playTabSwitch();
                setBillingMode("partner");
              }}
              className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 z-10 ${
                billingMode === "partner" ? "text-[#0A0A0E]" : "text-neutral-300 hover:text-white"
              }`}
            >
              {billingMode === "partner" && (
                <motion.div
                  layoutId="servicesBillingPill"
                  className="absolute inset-0 bg-[#A07CFE] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">Monthly Partner</span>
            </button>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {services.map((service) => (
            <SpotlightCard key={service.title} service={service} billingMode={billingMode} />
          ))}
        </div>
      </div>
    </section>
  );
}

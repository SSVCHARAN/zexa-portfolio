"use client";

import { motion, useScroll } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { ShineBorder } from "./magicui/shine-border";
import { GlareHover } from "./magicui/glare-hover";
import { TextRevealByProgress } from "./magicui/text-reveal";
import { Particles } from "./magicui/particles";

const services = [
  {
    title: "Basic",
    price: "Starting at $999",
    description: "Perfect for small businesses establishing their online presence.",
    features: [
      "Custom Landing Page",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "1 Revision Round",
    ],
    highlighted: false,
  },
  {
    title: "Standard",
    price: "Starting at $2,499",
    description: "Ideal for growing brands needing multi-page architecture.",
    features: [
      "Up to 5 Custom Pages",
      "Advanced Animations & Interactions",
      "CMS Integration",
      "Performance Optimization",
      "3 Revision Rounds",
    ],
    highlighted: true,
  },
  {
    title: "Premium",
    price: "Custom Quote",
    description: "Comprehensive digital experience for enterprise clients.",
    features: [
      "Unlimited Custom Pages",
      "E-commerce Functionality",
      "Custom Web Apps (React/Next.js)",
      "Premium 3D/Canvas Elements",
      "Dedicated Support & Maintenance",
    ],
    highlighted: false,
  },
];

export default function Services() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start 85%", "start 30%"]
  });

  return (
    <section id="services" className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-[var(--color-sage-green-light)]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Background Particles */}
      <Particles 
        className="absolute inset-0 z-0 pointer-events-none"
        quantity={250}
        ease={80}
        color="#8FAF9A"
        size={1.5}
        refresh
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
        <motion.h2 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <TextRevealByProgress progress={headerProgress} className="text-4xl md:text-5xl font-bold tracking-tight justify-center">
            Our Services
          </TextRevealByProgress>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto"
        >
          Tailored solutions designed to meet your specific business goals. We don&apos;t just build websites; we build digital experiences.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            className="h-full"
          >
            {(() => {
              const CardContent = (
                <div className="relative p-8 rounded-3xl border flex flex-col h-full bg-white/40 dark:bg-white/5 backdrop-blur-md border-[var(--foreground)]/10 shadow-lg w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {service.title === "Standard" && (
                    <ShineBorder shineColor="var(--foreground)" />
                  )}
                  {service.title === "Premium" && (
                    <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                  )}
                  {service.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--color-sage-green)] text-[#18181B] text-xs font-bold uppercase tracking-wider rounded-full shadow-md z-20">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-8 relative z-10 text-left w-full">
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-sm mb-4 text-[var(--foreground)]/70">
                      {service.description}
                    </p>
                    <div className="text-3xl font-extrabold">{service.price}</div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow relative z-10 text-left w-full">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                        <div className="mt-0.5 rounded-full p-1 bg-[var(--foreground)]/10 text-[var(--foreground)]">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-[var(--foreground)]/80">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                    className="relative z-10 w-full py-4 rounded-xl font-bold transition-all duration-300 bg-transparent border border-[var(--foreground)]/20 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  >
                    Get Started
                  </button>
                </div>
              );

              return service.title === "Premium" ? (
                <GlareHover className="w-full h-full rounded-3xl" width="100%" height="100%" color="#8FAF9A" opacity={0.15} duration={600}>
                  {CardContent}
                </GlareHover>
              ) : CardContent;
            })()}
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}

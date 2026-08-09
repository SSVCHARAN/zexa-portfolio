"use client";

import { motion, useScroll, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { TextRevealByProgress } from "./magicui/text-reveal";
import { Highlighter } from "./magicui/highlighter";
import { Particles } from "./magicui/particles";
import { Magnetic } from "./magicui/magnetic";

export default function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "center center"]
  });

  return (
    <section ref={targetRef} id="about" className="py-24 relative overflow-hidden bg-[#121215]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 280, damping: 22 }
            }
          >
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#8FAF9A] mb-3">About Us</h2>
            <h3 className="mb-6">
              <TextRevealByProgress progress={scrollYProgress} className="text-4xl md:text-5xl font-bold leading-tight">
                We build digital experiences that inspire and perform.
              </TextRevealByProgress>
            </h3>
            <p className="text-lg text-neutral-300 mb-8 font-light leading-relaxed">
              Zexa Designs was founded on a simple principle: digital presence should be both incredibly beautiful and highly effective. We are a boutique agency specializing in high-end web design, combining cutting-edge technology with timeless aesthetic principles.
            </p>
            
            <div className="space-y-6">
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { x: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex gap-4 items-center"
              >
                <div className="text-4xl font-black text-[#8FAF9A]">9</div>
                <div>
                  <h4 className="font-bold text-xl mb-0.5">Premium Showcases</h4>
                  <p className="text-sm text-neutral-400">Meticulously crafted digital experiences</p>
                </div>
              </motion.div>
              <div className="w-full h-[1px] bg-white/10" />
              <motion.div 
                whileHover={shouldReduceMotion ? {} : { x: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex gap-4 items-center"
              >
                <div className="text-4xl font-black text-[#A07CFE]">100%</div>
                <div>
                  <h4 className="font-bold text-xl mb-0.5">Custom Architecture</h4>
                  <p className="text-sm text-neutral-400">Zero generic templates used</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Why Zexa Card with Spring Physics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={shouldReduceMotion ? {} : { y: -6 }}
            viewport={{ once: true }}
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", stiffness: 280, damping: 22, delay: 0.15 }
            }
            className="bg-[#18181B] text-white border border-white/15 p-10 md:p-12 rounded-3xl shadow-2xl relative"
          >
            <h3 className="text-3xl font-bold mb-8">
              Why Choose{" "}
              <Highlighter action="underline" color="#8FAF9A">
                Zexa
              </Highlighter>?
            </h3>
            
            <ul className="space-y-6">
              {[
                { title: "Bespoke Design", desc: "No generic templates. Every pixel is crafted specifically for your brand's unique identity." },
                { title: "Premium Aesthetics", desc: "We focus on micro-interactions and smooth fluid animations that make a site feel expensive." },
                { title: "Modern Tech Stack", desc: "Built with Next.js 16 and Tailwind CSS v4, ensuring lightning-fast load times and unmatched SEO." },
                { title: "End-to-End Partnership", desc: "From wireframes to final deployment, we handle the entire process with meticulous care." }
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  whileHover={shouldReduceMotion ? {} : { x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex gap-4 items-start"
                >
                  <Magnetic strength={0.25} className="shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#8FAF9A] mt-1" />
                  </Magnetic>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

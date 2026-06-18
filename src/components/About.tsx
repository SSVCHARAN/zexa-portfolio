"use client";

import { motion, useScroll } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { TextRevealByProgress } from "./magicui/text-reveal";
import { Highlighter } from "./magicui/highlighter";

export default function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "center center"]
  });

  return (
    <section ref={targetRef} id="about" className="py-24 relative overflow-hidden bg-[var(--color-deep-olive)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-[var(--color-soft-cream)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-sage-green)] mb-3">About Us</h2>
            <h3 className="mb-6">
              <TextRevealByProgress progress={scrollYProgress} className="text-4xl md:text-5xl font-bold leading-tight">
                We build digital experiences that inspire and perform.
              </TextRevealByProgress>
            </h3>
            <p className="text-lg text-[var(--color-soft-cream)]/80 mb-8 font-light">
              Zexa Designs was founded on a simple principle: digital presence should be both incredibly beautiful and highly effective. We are a boutique agency specializing in high-end web design, combining cutting-edge technology with timeless aesthetic principles.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-4xl font-light text-[var(--color-sage-green-light)]">10+</div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Years Experience</h4>
                  <p className="text-sm text-white/60">Across web design and development</p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/10" />
              <div className="flex gap-4">
                <div className="text-4xl font-light text-[var(--color-sage-green-light)]">50+</div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Projects Delivered</h4>
                  <p className="text-sm text-white/60">For clients around the globe</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why Zexa Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[var(--color-soft-cream)] text-[#18181B] p-10 md:p-12 rounded-3xl shadow-2xl relative"
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
                { title: "Premium Aesthetics", desc: "We focus on the micro-interactions and smooth fluid animations that make a site feel expensive." },
                { title: "Modern Tech Stack", desc: "Built with Next.js and Tailwind, ensuring lightning-fast load times and unmatched SEO." },
                { title: "End-to-End Partnership", desc: "From wireframes to final deployment, we handle the entire process with meticulous care." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-deep-olive)] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-[#18181B]/70">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

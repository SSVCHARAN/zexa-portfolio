"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { LineShadowText } from "./magicui/line-shadow-text";
import { GlareHover } from "./magicui/glare-hover";
import { RainbowButton } from "./magicui/rainbow-button";
import { Particles } from "./magicui/particles";

export default function Contact() {
  return (
    <footer id="contact" className="relative pt-24 pb-0 px-4 md:px-8 border-t border-[var(--foreground)]/10 overflow-hidden bg-[#18181B] text-[var(--color-soft-cream)]">
      <Particles 
        className="absolute inset-0 z-0 pointer-events-none"
        quantity={200}
        ease={80}
        color="#8FAF9A"
        size={1.5}
        refresh
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Let&apos;s create <br/>something <LineShadowText className="text-[var(--color-sage-green)] italic" shadowColor="white">extraordinary.</LineShadowText></h2>
              <p className="text-lg text-[var(--foreground)]/70 max-w-md">
                Ready to elevate your digital presence? Reach out to discuss your next project with Zexa Designs.
              </p>
            </div>
            
            <div className="mt-12 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/50 mb-1">Email</h4>
                <a href="mailto:zexabuilds@gmail.com" className="text-xl md:text-2xl font-medium hover:text-[var(--color-sage-green)] transition-colors">zexabuilds@gmail.com</a>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/50 mb-1">Phone</h4>
                <div className="flex flex-col gap-1">
                  <a href="tel:+917337036740" className="text-xl md:text-2xl font-medium hover:text-[var(--color-sage-green)] transition-colors">+91 73370 36740</a>
                  <a href="tel:+919666637481" className="text-xl md:text-2xl font-medium hover:text-[var(--color-sage-green)] transition-colors">+91 96666 37481</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/50 mb-1">Social</h4>
                <div className="flex gap-4">
                  <a href="https://instagram.com/zexa.hq" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-[var(--color-sage-green)] transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full"
          >
            <GlareHover className="w-full rounded-3xl" width="100%" color="#8FAF9A" opacity={0.12} duration={650}>
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-[var(--foreground)]/10 shadow-xl w-full">
                <form 
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const name = (document.getElementById("name") as HTMLInputElement).value;
                    const email = (document.getElementById("email") as HTMLInputElement).value;
                    const message = (document.getElementById("message") as HTMLTextAreaElement).value;
                    window.location.href = `mailto:zexabuilds@gmail.com?subject=New Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nContact Email: ' + email)}`;
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-white/70 pl-1">Name</label>
                      <input type="text" id="name" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-sage-green)] transition-shadow" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-white/70 pl-1">Email</label>
                      <input type="email" id="email" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-sage-green)] transition-shadow" placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-xs font-bold uppercase tracking-widest text-white/70 pl-1">Interested In</label>
                    <select id="service" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-sage-green)] transition-shadow appearance-none">
                      <option className="bg-[#18181B] text-white">Basic Website</option>
                      <option className="bg-[#18181B] text-white">Standard Package</option>
                      <option className="bg-[#18181B] text-white">Premium Web App</option>
                      <option className="bg-[#18181B] text-white">Other / Custom</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/70 pl-1">Message</label>
                    <textarea id="message" rows={4} className="w-full bg-transparent dark:bg-black/20 border border-[var(--foreground)]/20 rounded-xl px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-sage-green)] transition-shadow resize-none" placeholder="Tell us about your project..."></textarea>
                  </div>

                  <RainbowButton type="submit" className="w-full py-4 text-[var(--background)] dark:text-[#18181B] font-bold text-base hover:opacity-90 transition-opacity">
                    Send Message <Send className="w-4 h-4" />
                  </RainbowButton>
                </form>
              </div>
            </GlareHover>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--foreground)]/10 text-sm text-[var(--foreground)]/60 relative z-10">
          <p>© {new Date().getFullYear()} Zexa Designs. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--foreground)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--foreground)]">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Big ZEXA Gradient Text */}
      <div className="w-full mt-12 flex justify-center items-end pointer-events-none select-none relative z-0 translate-y-[15%]">
        <h1 className="text-[28vw] leading-[0.75] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-sage-green)]/30 to-transparent">
          ZEXA
        </h1>
      </div>
    </footer>
  );
}

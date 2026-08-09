"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function KineticCursor() {
  const [hoverState, setHoverState] = useState<{ isHovered: boolean; isTextHovered: boolean }>({
    isHovered: false,
    isTextHovered: false,
  });
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 28 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const lastTarget = useRef<EventTarget | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    const handleElementHover = (e: MouseEvent) => {
      if (e.target === lastTarget.current) return;
      lastTarget.current = e.target;

      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = !!target.closest("a, button");
      const isText = !!target.closest("h1, h2, h3, h4, p, span, label, a, button");

      setHoverState((prev) => {
        if (prev.isHovered === interactive && prev.isTextHovered === isText) return prev;
        return { isHovered: interactive, isTextHovered: isText };
      });
    };

    window.addEventListener("mouseover", handleElementHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleElementHover);
    };
  }, [mouseX, mouseY, isVisible, shouldReduceMotion]);

  if (shouldReduceMotion || !isVisible) return null;

  const { isHovered, isTextHovered } = hoverState;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block mix-blend-difference">
      {/* Precision Optical Magnifying Lens Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 2.5 : isTextHovered ? 2.0 : 1,
          backgroundColor: isTextHovered || isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          borderColor: isTextHovered || isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.6)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white flex items-center justify-center pointer-events-none"
      />

      {/* Center Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isTextHovered || isHovered ? 0 : 1,
          opacity: isTextHovered || isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white pointer-events-none"
      />
    </div>
  );
}

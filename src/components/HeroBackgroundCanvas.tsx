"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export default function HeroBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisibleOnScreen = true;
    const dpr = typeof window !== "undefined" ? Math.max(1.5, window.devicePixelRatio || 1) : 1;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleOnScreen = entry.isIntersecting;
        if (isVisibleOnScreen && !animationFrameId) {
          render();
        } else if (!isVisibleOnScreen && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Mouse tracking for background constellation activation
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleOnScreen) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Generate constellation nodes
    const nodeCount = Math.floor(Math.min(width, 1400) / 24);
    const nodes: Node[] = Array.from({ length: nodeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: 1.2 + Math.random() * 1.5,
      baseAlpha: 0.15 + Math.random() * 0.35,
    }));

    const render = () => {
      if (!isVisibleOnScreen) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background radial cursor aura glow
      if (mouseX > 0 && mouseY > 0) {
        const auraGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 320);
        auraGrad.addColorStop(0, "rgba(143, 175, 154, 0.12)");
        auraGrad.addColorStop(0.5, "rgba(160, 124, 254, 0.05)");
        auraGrad.addColorStop(1, "rgba(10, 10, 14, 0)");
        ctx.fillStyle = auraGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update and render constellation nodes & connector lines
      nodes.forEach((node, i) => {
        if (!shouldReduceMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        // Mouse distance check
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = distToMouse < 160;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, isNearMouse ? node.radius * 1.8 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNearMouse ? "#8FAF9A" : `rgba(243, 244, 246, ${node.baseAlpha})`;
        if (isNearMouse) {
          ctx.shadowColor = "#8FAF9A";
          ctx.shadowBlur = 10;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes to cursor
        if (isNearMouse) {
          const alpha = (1 - distToMouse / 160) * 0.6;
          const grad = ctx.createLinearGradient(node.x, node.y, mouseX, mouseY);
          grad.addColorStop(0, `rgba(143, 175, 154, ${alpha})`);
          grad.addColorStop(1, `rgba(160, 124, 254, ${alpha * 0.5})`);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8 + alpha;
          ctx.stroke();
        }

        // Connect node to adjacent nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = other.x - node.x;
          const ndy = other.y - node.y;
          const nodeDist = Math.sqrt(ndx * ndx + ndy * ndy);

          if (nodeDist < 100) {
            const lineAlpha = (1 - nodeDist / 100) * 0.12;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

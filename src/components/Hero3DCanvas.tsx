"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisibleOnScreen = true;
    let isHovering = false;
    const dpr = typeof window !== "undefined" ? Math.max(1.5, window.devicePixelRatio || 1) : 1;

    let width = 450;
    let height = 450;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;

      // High-DPI Retina Crisp Rendering
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // IntersectionObserver to pause RAF loop when scrolled out of view
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

    // Mouse & Touch tracking for 3D rotation bias & magnetic energy tendrils
    let mouseCanvasX = width / 2;
    let mouseCanvasY = height / 2;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const updatePointerPosition = (clientX: number, clientY: number) => {
      if (!isVisibleOnScreen) return;
      const rect = canvas.getBoundingClientRect();
      mouseCanvasX = clientX - rect.left;
      mouseCanvasY = clientY - rect.top;

      const cx = width / 2;
      const cy = height / 2;
      const nx = (mouseCanvasX - cx) / cx;
      const ny = (mouseCanvasY - cy) / cy;

      isHovering = mouseCanvasX >= 0 && mouseCanvasX <= width && mouseCanvasY >= 0 && mouseCanvasY <= height;
      targetRotY = nx * 1.3;
      targetRotX = -ny * 1.3;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointerPosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointerPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerLeave = () => {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handlePointerLeave, { passive: true });
    canvas.addEventListener("touchstart", handleTouchMove, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handlePointerLeave, { passive: true });
    canvas.addEventListener("touchcancel", handlePointerLeave, { passive: true });

    // 3D Icosahedron Vertices (Golden ratio phi)
    const phi = (1 + Math.sqrt(5)) / 2;
    const scale = Math.min(width, height) * 0.28;

    const rawVertices: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(([x, y, z]) => {
      const length = Math.sqrt(x * x + y * y + z * z);
      return [(x / length) * scale, (y / length) * scale, (z / length) * scale];
    });

    const edges: [number, number][] = [
      [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
      [1, 5], [1, 7], [1, 8], [1, 9],
      [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
      [3, 4], [3, 6], [3, 8], [3, 9],
      [4, 5], [4, 9], [4, 11],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9], [10, 11]
    ];

    // Inner orbital ring particles
    const particleCount = 32;
    const particles = Array.from({ length: particleCount }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: scale * (0.8 + Math.random() * 0.6),
      baseSpeed: (0.005 + Math.random() * 0.01) * (Math.random() > 0.5 ? 1 : -1),
      yOffset: (Math.random() - 0.5) * scale * 0.4,
      size: 1.5 + Math.random() * 2,
    }));

    let autoAngle = 0;

    const render = () => {
      if (!isVisibleOnScreen) return;

      // Apply DPR transform scale for ultra-sharp canvas rendering
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const speedMult = isHovering ? 2.2 : 1.0;
      autoAngle += (shouldReduceMotion ? 0.002 : 0.006) * speedMult;
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      const currentRotX = autoAngle * 0.5 + rotX;
      const currentRotY = autoAngle + rotY;

      // Project 3D points
      const projected: { x: number; y: number; z: number }[] = rawVertices.map(([vx, vy, vz]) => {
        let x1 = vx * Math.cos(currentRotY) - vz * Math.sin(currentRotY);
        let z1 = vz * Math.cos(currentRotY) + vx * Math.sin(currentRotY);
        let y2 = vy * Math.cos(currentRotX) - z1 * Math.sin(currentRotX);
        let z2 = z1 * Math.cos(currentRotX) + vy * Math.sin(currentRotX);

        const perspective = 600 / (600 + z2);
        return {
          x: x1 * perspective + width / 2,
          y: y2 * perspective + height / 2,
          z: z2,
        };
      });

      // Draw Edges with crisp high-DPI stroke gradients
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const opacity = Math.max(0.15, Math.min(0.9, (avgZ + scale) / (scale * 2.2))) * (isHovering ? 1.2 : 1.0);

        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        gradient.addColorStop(0, `rgba(143, 175, 154, ${opacity})`);
        gradient.addColorStop(1, `rgba(160, 124, 254, ${opacity * 0.85})`);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = (isHovering ? 2.0 : 1.5) * Math.max(0.6, (avgZ + scale) / (scale * 2));
        ctx.stroke();
      });

      // Draw Vertices with glowing energy halos & cursor/fingertip tendrils
      projected.forEach((p) => {
        const alpha = Math.max(0.25, Math.min(1, (p.z + scale) / (scale * 2)));

        // Magnetic Energy Connector Lines to Mouse Cursor / Touch Fingertip
        if (isHovering) {
          const dx = mouseCanvasX - p.x;
          const dy = mouseCanvasY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const tendrilAlpha = (1 - dist / 150) * 0.85;
            const tendrilGrad = ctx.createLinearGradient(p.x, p.y, mouseCanvasX, mouseCanvasY);
            tendrilGrad.addColorStop(0, `rgba(143, 175, 154, ${tendrilAlpha})`);
            tendrilGrad.addColorStop(1, `rgba(160, 124, 254, ${tendrilAlpha * 0.6})`);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseCanvasX, mouseCanvasY);
            ctx.strokeStyle = tendrilGrad;
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, isHovering ? 4.8 : 3.8, 0, Math.PI * 2);
        ctx.fillStyle = isHovering ? "#A07CFE" : `rgba(143, 175, 154, ${alpha})`;
        ctx.shadowColor = isHovering ? "#A07CFE" : "#8FAF9A";
        ctx.shadowBlur = isHovering ? 18 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render Floating Orbital Ring Particles
      particles.forEach((pt) => {
        pt.angle += pt.baseSpeed * speedMult;
        const currentRadius = pt.radius * (isHovering ? 1.15 : 1.0);
        const px = Math.cos(pt.angle) * currentRadius;
        const pz = Math.sin(pt.angle) * currentRadius;

        let x1 = px * Math.cos(currentRotY) - pz * Math.sin(currentRotY);
        let z1 = pz * Math.cos(currentRotY) + px * Math.sin(currentRotY);
        let y2 = pt.yOffset * Math.cos(currentRotX) - z1 * Math.sin(currentRotX);
        let z2 = z1 * Math.cos(currentRotX) + pt.yOffset * Math.sin(currentRotX);

        const perspective = 600 / (600 + z2);
        const screenX = x1 * perspective + width / 2;
        const screenY = y2 * perspective + height / 2;
        const pAlpha = Math.max(0.15, Math.min(0.95, (z2 + scale) / (scale * 2.2)));

        ctx.beginPath();
        ctx.arc(screenX, screenY, isHovering ? pt.size * 1.3 : pt.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 124, 254, ${pAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handlePointerLeave);
      canvas.removeEventListener("touchstart", handleTouchMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handlePointerLeave);
      canvas.removeEventListener("touchcancel", handlePointerLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="w-full h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] relative flex items-center justify-center pointer-events-auto touch-none">
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
    </div>
  );
}

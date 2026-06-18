"use client"

import React, { type CSSProperties, type HTMLAttributes } from "react"
import { motion, type MotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

interface LineShadowTextProps
  extends Omit<HTMLAttributes<HTMLElement>, keyof MotionProps>, MotionProps {
  children: string
  shadowColor?: string
  as?: React.ElementType
}

export function LineShadowText({
  children,
  shadowColor = "black",
  className,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const targetElement =
    (motion as unknown as Record<string, React.ElementType>)[
    Component as string
    ] || motion.span

  return React.createElement(
    targetElement,
    {
      style: { "--shadow-color": shadowColor } as CSSProperties,
      className: cn(
        "relative z-0 inline-flex",
        "after:absolute after:top-[0.04em] after:left-[0.04em] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
        "after:-z-10 after:bg-[size:0.06em_0.06em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className
      ),
      "data-text": children,
      ...props,
    },
    children
  )
}

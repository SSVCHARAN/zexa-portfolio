"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 50%"],
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0 min-h-[100vh] py-20 flex items-center", className)}>
      <span className={"flex flex-wrap text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)]/20"}>
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </span>
    </div>
  )
}

export const TextRevealByProgress: FC<{ progress: MotionValue<number>, children: string, className?: string, revealRange?: number }> = ({ progress, children, className, revealRange = 1 }) => {
  const words = children.split(" ")
  return (
    <span className={cn("flex flex-wrap text-inherit", className)}>
      {words.map((word, i) => {
        const start = (i / words.length) * revealRange
        const end = start + (1 / words.length) * revealRange
        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </span>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative mx-1 lg:mx-2">
      <span className="absolute opacity-20">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-inherit"}
      >
        {children}
      </motion.span>
    </span>
  )
}

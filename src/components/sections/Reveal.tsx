"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * The one scroll-reveal used across the homepage: a short rise and fade that
 * fires once when the element enters the viewport.
 *
 * It is `whileInView` with `viewport={{ once: true }}` rather than a
 * hand-rolled IntersectionObserver, and `useReducedMotion` collapses it to a
 * plain render — no transform, no opacity ramp — when the visitor has asked
 * for less motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** Seconds. Used to stagger siblings in a grid. */
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef } from "react";
import { useIsMobile } from "./motion";

export interface Step {
  title: string;
  text: string;
}

/**
 * The three booking steps, tied together by a dotted stencil line that is
 * drawn as you scroll. The line only ever grows, so it plays once.
 */
export function Steps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const drawn = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > drawn.get()) drawn.set(v);
  });

  return (
    <ol ref={ref} className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
      {/* vertical on phones, horizontal from md up */}
      <motion.span
        aria-hidden="true"
        className="stencil-line stencil-line-v md:hidden"
        style={{ scaleY: reduce ? 1 : drawn }}
      />
      <motion.span
        aria-hidden="true"
        className="stencil-line stencil-line-h hidden md:block"
        style={{ scaleX: reduce ? 1 : drawn }}
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-5 md:flex-col md:gap-4">
          <motion.span
            aria-hidden="true"
            className="lettering stamp-number relative z-10 w-16 shrink-0 text-7xl text-bone md:w-auto md:self-start md:text-8xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.35, rotate: -6 }}
            whileInView={
              reduce
                ? { opacity: 1 }
                : { opacity: [0, 1, 1, 1], scale: [1.35, 0.94, 1.02, 1], rotate: [-6, 2, -1, 0] }
            }
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: mobile ? 0.35 : 0.5, ease: "easeOut", delay: i * 0.15 }}
          >
            {i + 1}
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: mobile ? 0.35 : 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 + 0.12 }}
          >
            <h3 className="text-xl font-bold [font-stretch:92%] sm:text-2xl">
              <span className="sr-only">Passo {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2 max-w-[34ch] text-base leading-relaxed text-bone/85">{step.text}</p>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}

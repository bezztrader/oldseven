"use client";

import { motion, useReducedMotion } from "motion/react";
import { useIsMobile } from "./motion";

/*
 * Old-school flash ornaments drawn as single-weight linework. Each stroke is
 * "tattooed" on with pathLength (stroke-dasharray) the first time it is seen.
 */

type Kind = "swallow" | "dagger" | "rose" | "banner";

const ART: Record<Kind, { viewBox: string; paths: string[] }> = {
  swallow: {
    viewBox: "0 0 64 48",
    paths: [
      // body, head to forked tail
      "M58 17c-3-2-7-2-10 0-5 3-11 6-18 7-7 1-13 4-17 9l-9 11 13-6-3 9 8-11c5-5 12-7 19-8 7-1 13-4 17-9",
      // upper wing sweeping back
      "M44 19C40 11 31 5 19 3c6 5 10 10 12 17",
      // lower wing
      "M40 23c-3 7-9 12-17 15 8 1 15-2 21-8",
      // beak and eye
      "M58 17l4 1-4 2",
      "M52 17.5h.01",
    ],
  },
  dagger: {
    viewBox: "0 0 96 24",
    paths: [
      // blade with fuller
      "M38 8h44l12 4-12 4H38z",
      "M42 12h36",
      // crossguard with curled ends
      "M38 3c-2 0-3 1-3 3v12c0 2 1 3 3 3",
      "M35 4c-2-1-4 0-4 2M35 20c-2 1-4 0-4-2",
      // grip with wraps, then pommel
      "M13 9h22v6H13z",
      "M18 9v6M23 9v6M28 9v6",
      "M13 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    ],
  },
  rose: {
    viewBox: "0 0 64 64",
    paths: [
      // outer bloom
      "M32 10c9-2 17 4 17 13 4 7 0 16-8 19-6 3-13 3-19 0-8-3-12-12-8-19 0-9 9-15 18-13z",
      // inner spiral
      "M32 18c6 0 9 5 6 10-3 4-9 3-10-1-1-3 1-5 4-5 2 0 3 2 2 3",
      // petal folds
      "M17 27c4 8 11 12 21 11M47 25c-3 6-8 9-15 9",
      // stem and leaves
      "M32 42v18",
      "M32 52c-5-5-12-5-16-1 5 4 11 4 16 1z",
      "M32 48c5-5 12-6 16-2-4 4-11 5-16 2z",
    ],
  },
  banner: {
    viewBox: "0 0 128 36",
    paths: [
      // front ribbon
      "M20 6h88v18H20z",
      // left tail and fold
      "M20 12H4l6 7-6 7h22v-2",
      "M20 24l6 2",
      // right tail and fold
      "M108 12h16l-6 7 6 7h-22v-2",
      "M108 24l-6 2",
    ],
  },
};

export function FlashOrnament({
  kind,
  className = "",
  delay = 0,
}: {
  kind: Kind;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const art = ART[kind];
  const duration = mobile ? 0.7 : 1.1;
  return (
    <svg
      aria-hidden="true"
      viewBox={art.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {art.paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          vectorEffect="non-scaling-stroke"
          initial={reduce ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
          whileInView={reduce ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{
            pathLength: { duration, ease: [0.45, 0, 0.2, 1], delay: delay + i * (duration * 0.22) },
            opacity: { duration: 0.01, delay: delay + i * (duration * 0.22) },
          }}
        />
      ))}
    </svg>
  );
}

/** Section divider: a needle line runs out from the ornament on both sides. */
export function FlashDivider({ kind }: { kind: Exclude<Kind, "banner"> }) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const line = {
    initial: reduce ? { opacity: 0 } : { scaleX: 0 },
    whileInView: reduce ? { opacity: 1 } : { scaleX: 1 },
    viewport: { once: true, margin: "0px 0px -8% 0px" },
    transition: { duration: mobile ? 0.6 : 0.9, ease: [0.45, 0, 0.2, 1] as const, delay: 0.35 },
  };
  const wide = kind === "dagger";
  return (
    <div aria-hidden="true" className="mx-auto flex max-w-[90rem] items-center gap-5 px-4 py-8 text-bone sm:px-8">
      <motion.span {...line} className="h-px flex-1 origin-right bg-[var(--rule)]" />
      <FlashOrnament kind={kind} className={wide ? "h-9 w-36 shrink-0" : "size-16 shrink-0"} />
      <motion.span {...line} className="h-px flex-1 origin-left bg-[var(--rule)]" />
    </div>
  );
}

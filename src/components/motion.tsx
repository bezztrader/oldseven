"use client";

import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { type ComponentProps, type ReactNode, useSyncExternalStore } from "react";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Transforms are dropped for visitors who ask for reduced motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Phones get shorter animations and no parallax or magnetic effects. */
export function useIsMobile() {
  return useMedia("(max-width: 767px)");
}

/** Desktop with a real mouse: the only place for magnetic and parallax effects. */
export function useFinePointerDesktop() {
  return useMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
}

/** True while the first-visit stamp intro is on screen; entrances wait for it. */
export function introDelay() {
  if (typeof document === "undefined") return 0;
  return document.documentElement.dataset.intro === "1" ? 0.85 : 0;
}

/** Fades content up once as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const mobile = useIsMobile();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: mobile ? 14 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: mobile ? 0.4 : 0.6, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}

/** Hero title: each word rises out of its own baseline, one after another. */
export function WordsTitle({ words, className }: { words: string[]; className?: string }) {
  const mobile = useIsMobile();
  const start = introDelay() + 0.25;
  return (
    <>
      {words.map((word, i) => (
        // pb/pr leave room for the red sign-painter shade inside the mask
        <span key={word} className={`block overflow-hidden pr-[0.08em] pb-[0.08em] ${className ?? ""}`}>
          <motion.span
            className="block"
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: mobile ? 0.45 : 0.6, ease: EASE_OUT, delay: start + i * 0.09 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Section titles: unmasked left to right as they enter the viewport. */
export function MaskHeading({ id, children }: { id: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  // negative insets keep the offset red shade visible once revealed
  const shown = "inset(-15% -8% -20% -2%)";
  return (
    <motion.h2
      id={id}
      className="lettering text-[clamp(2.5rem,9vw,5rem)] text-bone"
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(-15% 100% -20% -2%)" }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: shown }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: mobile ? 0.5 : 0.75, ease: EASE_OUT }}
    >
      {children}
    </motion.h2>
  );
}

export function MotionAnchor(props: ComponentProps<typeof motion.a>) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", duration: 0.25, bounce: 0.2 }}
      {...props}
    />
  );
}

"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { useFinePointerDesktop, useIsMobile } from "./motion";

const TAP = { scale: 0.97 };
const MAGNET = { stiffness: 260, damping: 18, mass: 0.6 };
const PULL = 0.28; // share of the pointer offset the button follows
const MAX_PULL = 10; // px

/**
 * Shared button shell: magnetic on desktop mice, and on hover an ink fill
 * rises from the bottom edge (scaleY from origin-bottom).
 */
function InkButton({
  href,
  className,
  fillClassName,
  children,
}: {
  href: string;
  className: string;
  fillClassName: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const magnetic = useFinePointerDesktop() && !reduce;
  const mobile = useIsMobile();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, MAGNET);
  const y = useSpring(my, MAGNET);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!magnetic) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * PULL;
    const dy = (e.clientY - (r.top + r.height / 2)) * PULL;
    mx.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx)));
    my.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy)));
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      whileHover="hover"
      whileTap={TAP}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={magnetic ? { x, y } : undefined}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      <motion.span
        aria-hidden="true"
        className={`ink-fill absolute inset-x-0 -bottom-2 -top-2 -z-10 origin-bottom ${fillClassName}`}
        variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
        transition={{ duration: mobile ? 0.25 : 0.38, ease: [0.65, 0, 0.35, 1] }}
      />
      {children}
    </motion.a>
  );
}

/** Solid WhatsApp-green booking button: every booking path ends here. */
export function WhatsAppCTA({
  label = "Agende pelo WhatsApp",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <InkButton
      href={WHATSAPP_URL}
      fillClassName="bg-[var(--bone)]"
      className={`btn-whatsapp inline-flex min-h-15 items-center gap-3 rounded-md px-5 text-base font-extrabold tracking-wide whitespace-nowrap uppercase sm:px-7 sm:text-lg ${className}`}
    >
      <WhatsAppIcon className="size-7 shrink-0 transition-transform duration-200 ease-out group-hover:-rotate-12" />
      <span>{label}</span>
      <span className="sr-only">(abre o WhatsApp em nova aba)</span>
    </InkButton>
  );
}

/** Instagram button in the studio's accent, official glyph plus the handle. */
export function InstagramButton({ compact = false }: { compact?: boolean }) {
  return (
    <InkButton
      href={INSTAGRAM_URL}
      fillClassName="bg-[var(--bone)]"
      className={`btn-instagram inline-flex min-h-12 items-center gap-2.5 rounded-md font-bold transition-colors duration-300 hover:text-[var(--wall)] ${
        compact ? "px-3.5 text-sm sm:px-4 sm:text-base" : "px-5 text-base"
      }`}
    >
      <InstagramIcon className="size-5 shrink-0 sm:size-6" />
      <span>{INSTAGRAM_HANDLE}</span>
      <span className="sr-only">no Instagram (abre em nova aba)</span>
    </InkButton>
  );
}

const BUZZ_EVERY = 6; // seconds between "machine switching on" buzzes

/** Floating WhatsApp button on every screen; label beside it from md up. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agende agora pelo WhatsApp (abre em nova aba)"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-3 sm:right-6 sm:bottom-6"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <motion.span
        aria-hidden="true"
        className="fab-label hidden rounded-md px-4 py-2.5 text-sm font-extrabold tracking-wide uppercase md:block"
        variants={{ rest: { x: 0 }, hover: { x: -4 } }}
        transition={{ type: "spring", duration: 0.3, bounce: 0.25 }}
      >
        Agende agora
      </motion.span>
      <motion.span
        className="relative flex size-16"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.08 }, tap: { scale: 0.94 } }}
        transition={{ type: "spring", duration: 0.3, bounce: 0.25 }}
      >
        {reduce ? null : (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[var(--wa)]"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 1.3, ease: "easeOut", repeat: Infinity, repeatDelay: BUZZ_EVERY - 1.3, delay: 2.15 }}
          />
        )}
        {/* the buzz: 150ms of tiny jitter, like a tattoo machine switching on */}
        <motion.span
          className="fab relative flex size-16 items-center justify-center rounded-full"
          animate={reduce ? undefined : { x: [0, -1.5, 1.5, -1.5, 1.5, -1, 0], rotate: [0, -3, 3, -3, 3, -1, 0] }}
          transition={{ duration: 0.15, ease: "linear", repeat: Infinity, repeatDelay: BUZZ_EVERY - 0.15, delay: 2 }}
        >
          <WhatsAppIcon className="relative size-9" />
        </motion.span>
      </motion.span>
    </motion.a>
  );
}

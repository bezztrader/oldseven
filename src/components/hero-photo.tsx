"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useFinePointerDesktop } from "./motion";

/**
 * Hero photo. The ink-spill reveal is a CSS keyframe (it must start at first
 * paint, before hydration); Motion adds a light parallax on desktop only.
 * Source is 720×1280: full-bleed only where the screen is narrower than that;
 * from lg up it sits in a frame no wider than its native width.
 */
export function HeroPhoto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useFinePointerDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const parallax = desktop && !reduce;

  return (
    <motion.figure
      ref={ref}
      className="hero-frame lg:col-span-6 lg:col-start-7 lg:row-start-1"
      style={parallax ? { y } : undefined}
    >
      <div className="hero-photo ink-reveal">
        <Image
          src="/images/hero-jason.png"
          alt="Tatuagem realista em preto e cinza na coxa: Jason Voorhees, a máscara de hóquei e uma tira de filme com o título Friday the 13th"
          width={720}
          height={1280}
          preload
          fetchPriority="high"
          quality={90}
          sizes="100vw"
          className="h-full w-full object-cover object-[50%_28%]"
        />
        <span aria-hidden="true" className="hero-shade" />
        <span aria-hidden="true" className="grain" />
      </div>
      <figcaption className="hero-caption">Sexta-feira 13 · coxa · preto e cinza</figcaption>
    </motion.figure>
  );
}

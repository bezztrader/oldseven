/** Four-point flash star used as the separator between styles. */
function Star() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[0.6em] shrink-0 fill-current">
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" />
    </svg>
  );
}

/**
 * Endless flash-sheet ribbon of the studio's styles. A CSS keyframe loop
 * (compositor-only transform) that pauses on hover; still when the visitor
 * asks for reduced motion.
 */
export function StyleMarquee({ items }: { items: string[] }) {
  const copy = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-[0.6em] px-[0.6em] whitespace-nowrap">
          <span>{item}</span>
          <Star />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee relative -my-3 overflow-hidden py-3">
      <div className="marquee-band">
        <p className="sr-only">Estilos: {items.join(", ")}</p>
        <div aria-hidden="true" className="marquee-track flex w-max">
          {copy}
          {copy}
        </div>
      </div>
    </div>
  );
}

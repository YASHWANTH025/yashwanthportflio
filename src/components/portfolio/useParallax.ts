import { useEffect, useRef } from "react";

/**
 * Subtle scroll parallax: moves the element at `speed` × scrollY.
 * Negative speed drifts upward as you scroll down. Disabled for reduced motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.1) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}

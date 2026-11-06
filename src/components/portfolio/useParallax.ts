import { useEffect, useRef } from "react";

/**
 * Subtle scroll parallax: moves the element at `speed` × scrollY.
 * Negative speed drifts upward as you scroll down. Disabled for reduced motion.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.1, fadeOut = false) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const update = () => {
      if (preference.matches) {
        cancelAnimationFrame(raf);
        raf = 0;
        ref.current?.style.removeProperty("transform");
        ref.current?.style.removeProperty("opacity");
        return;
      }
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const element = ref.current;
        if (!element) return;
        const section = element.closest("section") ?? element;
        const bounds = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(bounds.height, 1)));
        element.style.transform = `translate3d(0, ${progress * window.innerHeight * speed}px, 0)`;
        if (fadeOut) element.style.opacity = String(1 - progress);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    preference.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      preference.removeEventListener("change", update);
      cancelAnimationFrame(raf);
    };
  }, [fadeOut, speed]);
  return ref;
}

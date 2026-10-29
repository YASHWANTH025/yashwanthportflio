import { useEffect, useRef } from "react";

/**
 * Scroll-linked progress (0–1) of a tall section as it moves through the
 * viewport. Reports through a callback (no React state per frame) so the
 * consumer can write transforms directly. Disabled for reduced motion.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>(onProgress: (progress: number) => void) {
  const ref = useRef<T | null>(null);
  const callbackRef = useRef(onProgress);
  callbackRef.current = onProgress;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const progress = total > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)) : 0;
        callbackRef.current(progress);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

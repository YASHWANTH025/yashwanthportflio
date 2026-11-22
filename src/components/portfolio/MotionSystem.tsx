import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

export function MotionSystem({ children }: { children: ReactNode }) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let progressFrame = 0;

    const updateScrollProgress = () => {
      if (progressFrame) return;
      progressFrame = window.requestAnimationFrame(() => {
        progressFrame = 0;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          scrollableHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight)) : 0;
        progressRef.current?.style.setProperty("--scroll-progress", String(progress));
      });
    };

    const syncMotionPreference = () => {
      if (preference.matches) {
        lenis?.destroy();
        lenis = null;
        return;
      }

      if (!lenis) {
        lenis = new Lenis({
          autoRaf: true,
          duration: 1.15,
          easing: (progress) => 1 - Math.pow(1 - progress, 4),
          anchors: true,
        });
      }

      if (document.body.style.overflow === "hidden") {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    const scrollLockObserver = new MutationObserver(syncMotionPreference);
    scrollLockObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    preference.addEventListener("change", syncMotionPreference);
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    syncMotionPreference();
    updateScrollProgress();

    return () => {
      scrollLockObserver.disconnect();
      preference.removeEventListener("change", syncMotionPreference);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      window.cancelAnimationFrame(progressFrame);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <div ref={progressRef} aria-hidden="true" className="scroll-progress" />
      {children}
    </>
  );
}

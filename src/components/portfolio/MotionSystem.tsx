import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function MotionSystem({ children }: { children: ReactNode }) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

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
    syncMotionPreference();

    return () => {
      scrollLockObserver.disconnect();
      preference.removeEventListener("change", syncMotionPreference);
      lenis?.destroy();
    };
  }, []);

  return children;
}

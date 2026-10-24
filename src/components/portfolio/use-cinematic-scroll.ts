import { useEffect } from "react";

/** Scroll choreography: smooth scrolling, hero intro, parallax, project 3D scaling. */
export function useCinematicScroll(onReady: () => void) {
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (reduced) {
        onReady();
        return;
      }

      const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        // Intro sequence
        const intro = gsap.timeline({ delay: 0.15, onStart: onReady });
        intro
          .from(".hero-bg", { opacity: 0, scale: 1.08, duration: 1.8, ease: "power2.out" })
          .from(".hero-word > span", { yPercent: 110, duration: 1.1, stagger: 0.05, ease: "expo.out" }, 0.35)
          .from(".hero-kicker", { opacity: 0, y: 14, duration: 0.8 }, 0.6)
          .from(".hero-support > *", { opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.9)
          .from(".hero-bottom", { opacity: 0, duration: 0.8 }, 1.4);

        const header = document.querySelector(".site-header");
        ScrollTrigger.create({ start: 80, end: "max", onToggle: (self) => header?.classList.toggle("is-compact", self.isActive) });

        // Hero exits as you scroll
        gsap.to(".hero-content", {
          yPercent: -18, opacity: 0, scale: 0.94, ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
        });

        // Typography parallax and scale
        gsap.utils.toArray<HTMLElement>(".section-title, .contact-title, .education-degree").forEach((el) => {
          gsap.fromTo(el, { y: 80, opacity: 0.2 }, {
            y: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: el, start: "top 95%", end: "top 45%", scrub: true },
          });
        });

        // Project visuals: small to large, rotate through 3D space
        gsap.utils.toArray<HTMLElement>(".project-block").forEach((block) => {
          const visual = block.querySelector(".technical-visual");
          const copy = block.querySelectorAll(".project-copy > *");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: block, start: "top 85%", end: "center center", scrub: 1 },
          });
          tl.from(block.querySelector(".technical-visual__grid"), { opacity: 0, ease: "none" })
            .fromTo(visual, { scale: 0.95, rotateX: 10, y: 60 }, { scale: 1, rotateX: 0, y: 0, ease: "power2.out" }, 0)
            .from(copy, { opacity: 0, y: 40, stagger: 0.12, ease: "power2.out" }, 0.15)
            .from(block.querySelectorAll(".technical-visual__point"), { scale: 0, stagger: 0.08 }, 0.4);

          const core = block.querySelector<HTMLElement>(".technical-visual__core");
          if (core) gsap.set(core, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
          const onMove = (e: MouseEvent) => {
            const r = (visual as HTMLElement).getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(core, { x: x * 30, y: y * 30, rotateY: x * 16, rotateX: -y * 16, duration: 0.8, ease: "power3.out", overwrite: "auto" });
          };
          visual?.addEventListener("mousemove", onMove as EventListener);
        });

        // Horizontal movement
        gsap.to(".focus-marquee", {
          xPercent: -35, ease: "none",
          scrollTrigger: { trigger: ".focus-section", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".skill-wall > div, .cert-row, .process-row").forEach((row, index) => {
          gsap.from(row, {
            x: index % 2 ? 60 : -60, opacity: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          });
        });
        gsap.from(".experience-year", {
          scale: 0.6, opacity: 0, ease: "none",
          scrollTrigger: { trigger: "#experience", start: "top 85%", end: "top 30%", scrub: true },
        });
      });

      const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
      const onAnchor = (event: Event) => {
        const href = (event.currentTarget as HTMLAnchorElement).getAttribute("href");
        if (!href || href === "#") return;
        event.preventDefault();
        lenis.scrollTo(href === "#top" ? 0 : href, { offset: 0 });
      };
      anchors.forEach((a) => a.addEventListener("click", onAnchor));

      cleanup = () => {
        anchors.forEach((a) => a.removeEventListener("click", onAnchor));
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [onReady]);
}

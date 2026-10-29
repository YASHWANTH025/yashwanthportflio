import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import introAsset from "@/assets/portfolio-intro.mp4.asset.json";
import compatibleIntroAsset from "@/assets/portfolio-intro.webm.asset.json";

/* The film plays once per browser session; in-site navigation back home skips it. */
const INTRO_SESSION_KEY = "portfolio-intro-played";

export function PortfolioIntro({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"playing" | "leaving" | "done">("playing");
  const [started, setStarted] = useState(false);
  const [introChecked, setIntroChecked] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(8);
  const displayedRef = useRef(0);
  const finishingRef = useRef(false);
  const finishFallbackRef = useRef(0);

  /* Readiness signals only ever raise the target; the counter never jumps backward. */
  const raiseTarget = useCallback((value: number) => {
    targetRef.current = Math.max(targetRef.current, value);
  }, []);

  const finish = useCallback(() => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    targetRef.current = 100;
    /* Fallback so a hidden tab (no animation frames) can never trap the visitor. */
    finishFallbackRef.current = window.setTimeout(() => {
      setPhase((current) => (current === "playing" ? "leaving" : current));
    }, 600);
  }, []);

  useEffect(() => {
    setIntroChecked(true);
    try {
      if (window.sessionStorage.getItem(INTRO_SESSION_KEY)) {
        setPhase("done");
        return;
      }
    } catch { /* Storage unavailable — the intro plays normally. */ }
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) {
      setPhase("done");
      return;
    }
    const video = videoRef.current;
    if (video) void video.play().then(() => setStarted(true)).catch(() => { /* Skip remains available when autoplay is blocked. */ });
    if (document.readyState === "complete") raiseTarget(80);
    else window.addEventListener("load", () => raiseTarget(80), { once: true });
    const timeout = window.setTimeout(finish, 30000);
    const handlePreference = () => { if (preference.matches) setPhase("done"); };
    preference.addEventListener("change", handlePreference);
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(finishFallbackRef.current);
      preference.removeEventListener("change", handlePreference);
    };
  }, [finish, raiseTarget]);

  /* Hybrid counter: creeps smoothly toward the readiness target, completes at 100%. */
  useEffect(() => {
    if (phase !== "playing") return;
    let raf = 0;
    const tick = () => {
      if (!finishingRef.current && targetRef.current < 90) targetRef.current += 0.02;
      const target = targetRef.current;
      displayedRef.current = Math.min(displayedRef.current + Math.max((target - displayedRef.current) * 0.12, 0.15), target);
      const shown = Math.floor(displayedRef.current);
      setProgress((current) => (current === shown ? current : shown));
      if (finishingRef.current && displayedRef.current >= 99.5) {
        setProgress(100);
        setPhase("leaving");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timeout = window.setTimeout(() => setPhase("done"), 700);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch { /* Storage unavailable — the intro simply plays again next visit. */ }
  }, [phase]);

  return (
    <>
      <div inert={phase !== "done"} aria-hidden={phase !== "done" ? true : undefined}>{children}</div>
      {introChecked && phase !== "done" && (
        <section className="portfolio-intro" data-phase={phase} aria-label="Portfolio introduction">
          <div className="portfolio-intro__composition">
            <video
              ref={videoRef}
              className="portfolio-intro__video"
              autoPlay muted playsInline preload="auto"
              disablePictureInPicture
              aria-label="Cinematic 3D opening animation"
              onLoadedMetadata={() => raiseTarget(30)}
              onCanPlay={() => raiseTarget(55)}
              onPlaying={() => { setStarted(true); raiseTarget(70); }}
              onTimeUpdate={() => setStarted(true)}
              onEnded={finish}
              onError={finish}
            >
              <source src={introAsset.url} type="video/mp4" />
              <source src={compatibleIntroAsset.url} type="video/webm" />
            </video>
            <p className="portfolio-intro__name" data-started={started}>YASHWANTH A M</p>
          </div>
          <p className="portfolio-intro__counter" aria-hidden="true">{String(progress).padStart(2, "0")}%</p>
          <Button variant="ghost" className="portfolio-intro__skip" onClick={finish}>
            Skip Intro <ArrowRight aria-hidden="true" />
          </Button>
        </section>
      )}
    </>
  );
}

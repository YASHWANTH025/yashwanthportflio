import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import introAsset from "@/assets/portfolio-intro.mp4.asset.json";
import compatibleIntroAsset from "@/assets/portfolio-intro.webm.asset.json";

export function PortfolioIntro({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"playing" | "leaving" | "done">("playing");
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finish = useCallback(() => setPhase((current) => current === "playing" ? "leaving" : current), []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) {
      setPhase("done");
      return;
    }
    const video = videoRef.current;
    if (video) void video.play().catch(() => { /* Skip remains available when autoplay is blocked. */ });
    const timeout = window.setTimeout(finish, 30000);
    const handlePreference = () => { if (preference.matches) setPhase("done"); };
    preference.addEventListener("change", handlePreference);
    return () => {
      window.clearTimeout(timeout);
      preference.removeEventListener("change", handlePreference);
    };
  }, [finish]);

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

  return (
    <>
      <div inert={phase !== "done"} aria-hidden={phase !== "done" ? true : undefined}>{children}</div>
      {phase !== "done" && (
        <section className="portfolio-intro" data-phase={phase} aria-label="Portfolio introduction">
          <div className="portfolio-intro__composition">
            <video
              ref={videoRef}
              className="portfolio-intro__video"
              autoPlay muted playsInline preload="auto"
              disablePictureInPicture
              aria-label="Cinematic 3D opening animation"
              onPlaying={() => setStarted(true)}
              onEnded={finish}
              onError={finish}
            >
              <source src={introAsset.url} type="video/mp4" />
              <source src={compatibleIntroAsset.url} type="video/webm" />
            </video>
            <p className="portfolio-intro__name" data-started={started}>YASHWANTH A M</p>
          </div>
          <Button variant="ghost" className="portfolio-intro__skip" onClick={finish}>
            Skip Intro <ArrowRight aria-hidden="true" />
          </Button>
        </section>
      )}
    </>
  );
}
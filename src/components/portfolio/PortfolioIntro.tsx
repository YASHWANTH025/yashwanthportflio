import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicAsset } from "@/lib/public-asset";

type IntroPhase = "playing" | "leaving" | "done";
type PlaybackIssue = "autoplay-blocked" | "unavailable";

const INTRO_EXIT_DURATION_MS = 1400;
let hasEnteredPortfolioInCurrentDocument = false;

export function PortfolioIntro({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>(() =>
    hasEnteredPortfolioInCurrentDocument ? "done" : "playing",
  );
  const [playbackIssue, setPlaybackIssue] = useState<PlaybackIssue | null>(null);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const enterPortfolio = useCallback(() => {
    if (phase !== "playing") return;
    hasEnteredPortfolioInCurrentDocument = true;
    videoRef.current?.pause();
    setPhase("leaving");
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;

    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const playVideo = () => {
      if (motionPreference.matches) {
        video.pause();
        return;
      }

      void video
        .play()
        .catch(() =>
          setPlaybackIssue((current) => (current === "unavailable" ? current : "autoplay-blocked")),
        );
    };
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        video.pause();
        return;
      }

      playVideo();
    };

    playVideo();
    motionPreference.addEventListener("change", handleMotionPreference);
    return () => motionPreference.removeEventListener("change", handleMotionPreference);
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(
      () => setPhase("done"),
      reducedMotion ? 0 : INTRO_EXIT_DURATION_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  return (
    <>
      <div inert={phase !== "done"} aria-hidden={phase !== "done" ? true : undefined}>
        {children}
      </div>
      {phase !== "done" && (
        <section className="portfolio-intro" data-phase={phase} aria-label="Portfolio introduction">
          <div className="portfolio-intro__composition">
            {playbackIssue === "unavailable" ? (
              <p className="portfolio-intro__video-message" role="status">
                The introduction video is unavailable, but you can still enter the portfolio.
              </p>
            ) : (
              <video
                ref={videoRef}
                className="portfolio-intro__video"
                src={publicAsset("/portfolio-intro.mp4")}
                muted
                playsInline
                preload="metadata"
                disablePictureInPicture
                aria-label="Cinematic 3D opening animation"
                onTimeUpdate={(event) => {
                  const { currentTime, duration } = event.currentTarget;
                  if (Number.isFinite(duration) && duration > 0) {
                    setProgress(Math.min(100, Math.floor((currentTime / duration) * 100)));
                  }
                }}
                onEnded={() => {
                  setProgress(100);
                  enterPortfolio();
                }}
                onPlaying={() => setPlaybackIssue(null)}
                onError={() => setPlaybackIssue("unavailable")}
              />
            )}
            {playbackIssue === "autoplay-blocked" && (
              <p className="portfolio-intro__video-message" role="status">
                Video playback was blocked. You can still enter the portfolio.
              </p>
            )}
            <p className="portfolio-intro__name">YASHWANTH A M</p>
            <Button className="portfolio-intro__enter" onClick={enterPortfolio}>
              Enter Portfolio <ArrowRight aria-hidden="true" />
            </Button>
            {playbackIssue !== "unavailable" && (
              <div
                className="portfolio-intro__progress"
                role="progressbar"
                aria-label="Intro video progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div className="portfolio-intro__progress-track" aria-hidden="true">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <span aria-hidden="true">{progress}</span>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

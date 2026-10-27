import { Starfield } from "./Starfield";
import { useParallax } from "./useParallax";
import { profile } from "@/lib/resume";
import { ProfessionalRole } from "./ProfessionalRole";

export function Hero() {
  const planetRef = useParallax(-0.12);
  const orbitRef = useParallax(0.07);
  const contentRef = useParallax(-0.05);

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-hero px-5">
      <Starfield />
      {/* Planet rim light on the right, as in the reference — drifts slower than scroll */}
      <div ref={planetRef} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[94%] top-1/2 h-[130vmax] w-[130vmax] -translate-y-1/2 rounded-full bg-planet md:left-[78%]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-[-10vmax] top-1/2 h-[90vmax] w-[30vmax] -translate-y-1/2 rounded-full bg-glow/10 blur-[120px]" />
      {/* Orbit line with satellites — drifts slightly with scroll */}
      <div ref={orbitRef} aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[min(900px,120vw)] w-[min(900px,120vw)] -translate-x-1/2 -translate-y-[45%] animate-orbit rounded-full border border-foreground/10">
          {[0, 60, 140, 220, 300].map((d) => (
            <span key={d} className="absolute left-1/2 top-0 h-full w-0" style={{ transform: `rotate(${d}deg)` }}>
              <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-foreground shadow-glow" />
            </span>
          ))}
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto max-w-[1000px] pt-24 text-center">
        <p className="hero-fade mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground" style={{ animationDelay: "0.05s" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow" /> {profile.name} · {profile.location.split(",")[0]}
        </p>
        <h1 className="hero-headline text-halo text-foreground">
          <span className="hero-line">
            <span style={{ animationDelay: "0.15s" }}>Turning Ideas</span>
          </span>
          <span className="hero-line">
            <span style={{ animationDelay: "0.3s" }}>Into Reality.</span>
          </span>
        </h1>
        <ProfessionalRole />
        <div className="hero-fade mt-10 mb-28 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.65s" }}>
          <a href="#projects" className="rounded-xl bg-primary px-7 py-3.5 text-[17px] font-medium text-primary-foreground shadow-glow transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            View my work
          </a>
          <a href={`mailto:${profile.email}`} className="rounded-xl border border-border bg-secondary/70 px-7 py-3.5 text-[17px] font-medium text-foreground transition-colors hover:bg-surface-2">
            Get in touch
          </a>
        </div>
      </div>

      <div aria-hidden className="hero-fade pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3" style={{ animationDelay: "1.2s" }}>
        <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Scroll to explore</span>
        <span className="scroll-indicator" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

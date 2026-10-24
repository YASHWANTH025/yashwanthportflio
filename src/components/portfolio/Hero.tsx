import { Starfield } from "./Starfield";
import { profile } from "@/lib/resume";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-hero px-5">
      <Starfield />
      {/* Planet rim light on the right, as in the reference */}
      <div aria-hidden className="pointer-events-none absolute left-[94%] top-1/2 md:left-[78%] h-[130vmax] w-[130vmax] -translate-y-1/2 rounded-full bg-planet" />
      <div aria-hidden className="pointer-events-none absolute right-[-10vmax] top-1/2 h-[90vmax] w-[30vmax] -translate-y-1/2 rounded-full bg-glow/10 blur-[120px]" />
      {/* Orbit line with satellites */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[min(900px,120vw)] w-[min(900px,120vw)] -translate-x-1/2 -translate-y-[45%] animate-orbit rounded-full border border-foreground/10">
        {[0, 60, 140, 220, 300].map((d) => (
          <span key={d} className="absolute left-1/2 top-0 h-full w-0" style={{ transform: `rotate(${d}deg)` }}>
            <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-foreground shadow-glow" />
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1000px] pt-24 text-center">
        <p className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground" data-visible="true">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow" /> {profile.name} · {profile.location.split(",")[0]}
        </p>
        <h1 className="text-halo text-[clamp(2.6rem,7vw,5.6rem)] font-normal leading-[1.05] tracking-[-0.02em] text-foreground">
          A full-stack developer who makes ideas{" "}
          <span className="relative inline-block text-foreground/80">
            ship
            <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-foreground/70 to-transparent" />
          </span>
          .
        </h1>
        <p className="mx-auto mt-7 max-w-[620px] text-[clamp(1rem,1.6vw,1.3rem)] leading-relaxed text-muted-foreground">
          IT graduate building web apps, offline-first mobile apps, REST APIs and AI-enabled tools with React, Node.js, Java and Flutter.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#projects" className="rounded-xl bg-primary px-7 py-3.5 text-[17px] font-medium text-primary-foreground shadow-glow transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            View my work
          </a>
          <a href={`mailto:${profile.email}`} className="rounded-xl border border-border bg-secondary/70 px-7 py-3.5 text-[17px] font-medium text-foreground transition-colors hover:bg-surface-2">
            Get in touch
          </a>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

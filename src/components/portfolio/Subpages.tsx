import { Link } from "@tanstack/react-router";
import { ArrowLeft, Award, Trophy } from "lucide-react";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Sections";
import { Starfield } from "./Starfield";
import { Reveal } from "./Reveal";
import { achievements, certifications } from "@/lib/resume";

function Subpage({
  eyebrow,
  title,
  blurb,
  children,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden px-5 pb-14 pt-40 md:pt-48">
          <Starfield />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-glow/10 blur-[140px]" />
          <Reveal className="mx-auto max-w-[900px]">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
            <h1 className="page-headline text-halo text-foreground">{title}</h1>
            <p className="mt-5 max-w-[560px] text-lg text-muted-foreground">{blurb}</p>
          </Reveal>
        </section>
        <section className="px-5 pb-24">
          <div className="mx-auto max-w-[1280px]">{children}</div>
          <Reveal delay={100} className="mx-auto mt-16 max-w-[1280px]">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/70 px-6 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft size={16} /> Back to portfolio
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function CertificationsPage() {
  return (
    <Subpage
      eyebrow="Certifications"
      title="Credentials."
      blurb="Industry certifications earned while studying and building — the fundamentals behind the projects."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal
            key={c.name}
            delay={i * 80}
            className="card-hover rounded-2xl border border-border bg-card-grad p-6 hover:border-foreground/20"
          >
            <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Award size={16} /> {c.by}</span>
              <span className="font-mono text-xs">{c.year}</span>
            </div>
            <p className="mt-4 text-lg leading-snug">{c.name}</p>
          </Reveal>
        ))}
      </div>
    </Subpage>
  );
}

export function AchievementsPage() {
  return (
    <Subpage
      eyebrow="Achievements"
      title="Highlights."
      blurb="Competitions, training and activities alongside the degree."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal
            as="li"
            key={a}
            delay={i * 80}
            className="card-hover flex gap-4 rounded-2xl border border-border bg-card-grad p-6 hover:border-foreground/20"
          >
            <span className="mt-0.5 shrink-0 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <p className="text-[15px] leading-relaxed text-foreground/90">{a}</p>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={140} className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Trophy size={16} /> More coming as the final year wraps up.
      </Reveal>
    </Subpage>
  );
}

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, GraduationCap, Mail, MapPin, Phone, Trophy } from "lucide-react";
import { Reveal } from "./Reveal";
import { AssistantDemo } from "./AssistantDemo";
import { achievements, certifications, education, experience, profile, projects, skills } from "@/lib/resume";
import { cn } from "@/lib/utils";

function Eyebrow({ children }: { children: string }) {
  return <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-accent">{children}</p>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-gradient text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.02em]">{children}</h2>;
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-section px-5 py-28 md:py-36">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <Eyebrow>About</Eyebrow>
          <H2>I build products that explain themselves.</H2>
          <p className="mx-auto mt-6 max-w-[620px] text-lg leading-relaxed text-muted-foreground">{profile.summary}</p>
        </Reveal>
        <Reveal className="mt-16" delay={150}>
          <AssistantDemo />
        </Reveal>
      </div>
    </section>
  );
}

function ProjectVisual({ id }: { id: string }) {
  if (id === "insight")
    return (
      <div className="mx-auto w-[210px] rounded-[28px] border border-border bg-background p-3 shadow-card">
        <div className="rounded-2xl bg-surface p-4">
          <p className="text-xs text-muted-foreground">This month</p>
          <p className="text-2xl font-light">₹12,480</p>
          <div className="mt-4 flex h-20 items-end gap-1.5">
            {[40, 65, 35, 80, 55, 90].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-foreground/70" style={{ height: `${h}%`, opacity: 0.35 + i * 0.1 }} />
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {["Morning run", "Read 20 min"].map((t, i) => (
              <div key={t} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-xs">
                {t} <span className="text-accent">🔥 {7 - i * 3}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  if (id === "portal")
    return (
      <div className="rounded-xl border border-border bg-background p-4 shadow-card">
        <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground"><span>Department reports</span><span className="rounded bg-secondary px-2 py-0.5">Export PDF</span></div>
        {["Computer Science", "Information Tech", "Mechanical", "Civil"].map((d, i) => (
          <div key={d} className="flex items-center gap-3 border-t border-border py-2.5 text-sm">
            <span className="flex-1">{d}</span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-foreground/70" style={{ width: `${90 - i * 18}%` }} /></div>
          </div>
        ))}
      </div>
    );
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-card">
      <p className="text-xs text-muted-foreground">Resume vs. role</p>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative grid h-20 w-20 place-items-center rounded-full" style={{ background: "conic-gradient(var(--foreground) 0 78%, var(--secondary) 78% 100%)" }}>
          <div className="grid h-16 w-16 place-items-center rounded-full bg-background text-xl font-light">78</div>
        </div>
        <div className="space-y-1.5 text-xs text-muted-foreground"><p>✓ 12 matched skills</p><p>• 3 missing keywords</p><p>• 4 recommendations</p></div>
      </div>
    </div>
  );
}

function ProjectBlock({ p, index, total }: { p: (typeof projects)[number]; index: number; total: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article ref={ref} data-visible={visible} className="project-block border-t border-border py-20 md:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={cn(index % 2 === 1 && "lg:order-2")}>
          <p className="reveal-fade font-mono text-sm text-muted-foreground" data-visible={visible}>
            0{index + 1} — 0{total}
          </p>
          <h3 className="text-gradient mt-4 text-[clamp(1.9rem,3.5vw,3rem)] font-normal leading-[1.1] tracking-[-0.02em]">{p.title}</h3>
          <p className="mt-3 text-lg text-muted-foreground">{p.tagline}</p>
          <ol className="mt-9 space-y-4">
            {p.points.map((pt, fi) => (
              <li key={pt} className="project-feature flex gap-4 text-[15px] leading-relaxed text-foreground/85" style={{ transitionDelay: `${200 + fi * 110}ms` }}>
                <span className="mt-0.5 shrink-0 font-mono text-xs text-accent">{String(fi + 1).padStart(2, "0")}</span>
                {pt}
              </li>
            ))}
          </ol>
          <div className="project-feature mt-9 flex flex-wrap gap-2" style={{ transitionDelay: `${200 + p.points.length * 110}ms` }}>
            {p.stack.map((s) => (
              <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{s}</span>
            ))}
          </div>
        </div>
        <div className={cn("project-visual-sticky", index % 2 === 1 && "lg:order-1")}>
          <div className="project-visual rounded-3xl border border-border bg-surface p-6 shadow-card md:p-10">
            <div className="animate-float"><ProjectVisual id={p.id} /></div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden px-5 py-28 md:py-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[500px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-glow/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="max-w-[700px]">
          <Eyebrow>Projects</Eyebrow>
          <H2>Selected work, end to end.</H2>
        </Reveal>
        <div className="mt-6">
          {projects.map((p, i) => (
            <ProjectBlock key={p.id} p={p} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="px-5 py-28 md:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Experience</Eyebrow>
          <H2>Learning by building.</H2>
          <div className="mt-10 rounded-2xl border border-border bg-card-grad p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><GraduationCap size={16} /> Education</div>
            <p className="mt-3 text-lg">{education.degree}</p>
            <p className="mt-1 text-sm text-muted-foreground">{education.school}</p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">{education.period} · CGPA {education.cgpa}</p>
          </div>
        </Reveal>
        <ol className="relative border-l border-border pl-8">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.role} delay={i * 120} className="relative mb-14 last:mb-0">
              <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-foreground shadow-glow" />
              <p className="font-mono text-xs text-muted-foreground">{e.period}</p>
              <h3 className="mt-2 text-2xl font-normal">{e.role}</h3>
              <p className="text-accent">{e.org}</p>
              <ul className="mt-4 space-y-2">
                {e.points.map((pt) => <li key={pt} className="leading-relaxed text-muted-foreground">{pt}</li>)}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="px-5 py-28 md:py-36">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-[700px] text-center">
          <Eyebrow>Skills</Eyebrow>
          <H2>A toolkit across the stack.</H2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 70} className="rounded-2xl border border-border bg-card-grad p-6 transition-colors hover:border-foreground/20">
              <h3 className="text-lg font-medium">{g.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => <span key={s} className="rounded-md bg-secondary px-2.5 py-1 text-sm text-foreground/85">{s}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Award size={16} /> Certifications</div>
            <ul className="mt-4 divide-y divide-border">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-4 py-3">
                  <span>{c.name}<span className="block text-sm text-muted-foreground">{c.by}</span></span>
                  <span className="font-mono text-xs text-muted-foreground">{c.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Trophy size={16} /> Achievements & activities</div>
            <ul className="mt-4 divide-y divide-border">
              {achievements.map((a) => <li key={a} className="py-3">{a}</li>)}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden px-5 py-32 md:py-44">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[78%] -z-10 aspect-square w-[160vmax] -translate-x-1/2 rotate-90 rounded-full bg-planet" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[700px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/10 blur-[120px]" />
      <Reveal className="mx-auto max-w-[760px] text-center">
        <h2 className="text-halo text-[clamp(2.2rem,5.5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.03em]">Let's build something together.</h2>
        <p className="mx-auto mt-6 max-w-[520px] text-lg text-muted-foreground">Open to full-stack, frontend and mobile developer roles.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-[17px] font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">
            <Mail size={18} /> Email me
          </a>
          <a href="/YI.pdf" download className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/70 px-7 py-3.5 text-[17px] font-medium transition-colors hover:bg-surface-2">
            Download resume <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-foreground"><Phone size={14} /> {profile.phone}</a>
          <span className="inline-flex items-center gap-2"><MapPin size={14} /> {profile.location}</span>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href={`mailto:${profile.email}`} className="hover:text-foreground">{profile.email}</a>
      </div>
    </footer>
  );
}

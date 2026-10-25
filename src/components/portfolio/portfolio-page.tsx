import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useCinematicScroll } from "./use-cinematic-scroll";
import { ArrowDown, ArrowRight, Download, Mail, Menu, Phone, X } from "lucide-react";

import { achievements, certifications, education, experience, profile, projects, skills } from "@/lib/resume";
import { Button } from "@/components/ui/button";

const navigation = [
  ["About", "about"],
  ["Work", "work"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Contact", "contact"],
] as const;

function SystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animation = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(242, 238, 228, .15)";
      context.lineWidth = 1;

      const cx = width * 0.56;
      const cy = height * 0.46;
      const base = Math.min(width, height) * 0.15;
      for (let ring = 1; ring <= 4; ring += 1) {
        context.beginPath();
        context.ellipse(cx, cy, base * ring, base * ring * 0.62, -0.2, 0, Math.PI * 2);
        context.stroke();
      }

      const count = 26;
      for (let index = 0; index < count; index += 1) {
        const angle = (index / count) * Math.PI * 2 + frame * 0.0014 * (index % 2 ? 1 : -1);
        const radius = base * (1.05 + (index % 4) * 0.97);
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.62;
        context.fillStyle = index % 7 === 0 ? "rgba(222, 126, 61, .9)" : "rgba(242, 238, 228, .62)";
        context.beginPath();
        context.arc(x, y, index % 7 === 0 ? 2.5 : 1.4, 0, Math.PI * 2);
        context.fill();
        if (index % 5 === 0) {
          context.beginPath();
          context.moveTo(cx, cy);
          context.lineTo(x, y);
          context.stroke();
        }
      }
      context.fillStyle = "rgba(222, 126, 61, .95)";
      context.beginPath();
      context.arc(cx, cy, 4, 0, Math.PI * 2);
      context.fill();

      frame += 1;
      if (!reduced) animation = requestAnimationFrame(draw);
    };
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}

function SectionLabel({ children }: { children: ReactNode }) {
  const [number, ...rest] = String(children).split(" — ");
  return (
    <p className="section-label">
      <span className="section-label__num">{number}</span>
      <span className="section-label__rule" aria-hidden="true" />
      {rest.join(" — ")}
    </p>
  );
}

const projectVisuals = {
  resumeai: { variant: "ai", code: "AI / 01", caption: "RESUME ANALYSIS SYSTEM" },
  insight: { variant: "mobile", code: "SYNC / 02", caption: "OFFLINE-FIRST TRACKER" },
  portal: { variant: "portal", code: "DATA / 03", caption: "STRUCTURED REPORT SYSTEM" },
} as const;

function TechnicalVisual({ projectId }: { projectId: string }) {
  const visual = projectVisuals[projectId as keyof typeof projectVisuals] ?? projectVisuals.portal;
  return (
    <div className={`technical-visual technical-visual--${visual.variant}`} aria-hidden="true">
      <div className="technical-visual__grid" />
      <div className="technical-visual__axis technical-visual__axis--x" />
      <div className="technical-visual__axis technical-visual__axis--y" />
      <div className="technical-visual__core">
        <span>{visual.code}</span>
      </div>
      <span className="technical-visual__point technical-visual__point--one" />
      <span className="technical-visual__point technical-visual__point--two" />
      <span className="technical-visual__point technical-visual__point--three" />
      <p>{visual.caption}</p>
    </div>
  );
}

const HeroScene = lazy(() => import("./hero-scene"));

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return false;
    (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const ACCENT_WORDS = new Set(["ideas", "ship."]);

function HeroWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span className="hero-word" key={`${word}-${index}`}>
          <span className={ACCENT_WORDS.has(word.toLowerCase()) ? "hl" : undefined}>{word}</span>{" "}
        </span>
      ))}
    </>
  );
}

export function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [ready, setReady] = useState(false);
  const [use3D, setUse3D] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const markReady = useCallback(() => setReady(true), []);
  useCinematicScroll(markReady);

  useEffect(() => {
    const heading = nameRef.current;
    const container = heading?.parentElement;
    if (!heading || !container) return;
    const fitName = () => {
      heading.style.removeProperty("font-size");
      const range = document.createRange();
      range.selectNodeContents(heading);
      const textWidth = range.getBoundingClientRect().width;
      const available = heading.clientWidth;
      if (textWidth > available && available > 0) {
        const size = parseFloat(getComputedStyle(heading).fontSize);
        heading.style.fontSize = `${(size * available) / textWidth * 0.99}px`;
      }
    };
    const observer = new ResizeObserver(fitName);
    observer.observe(container);
    let mounted = true;
    document.fonts.ready.then(() => {
      if (mounted) fitName();
    });
    fitName();
    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setUse3D(!reduced && window.innerWidth >= 768 && hasWebGL());
    const fallback = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
    const onScroll = () => {
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sections = navigation
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-25% 0px -60%" },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <main className="overflow-clip bg-background text-foreground">
      <div className={ready ? "site-loader is-done" : "site-loader"} aria-hidden="true">
        <span className="opening-mark">
          YA<span className="hl">.</span>
        </span>
        <i />
      </div>
      <div data-scroll-progress className="fixed inset-x-0 top-0 z-[70] h-px origin-left scale-x-0 bg-accent" />
      <header className="site-header">
        <a href="#top" className="site-mark" aria-label="Yashwanth A M, back to top">
          <span className="site-mark__text">
            YA<span className="hl">.</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? "nav-link is-active" : "nav-link"}>
              {label}
            </a>
          ))}
        </nav>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu />
        </Button>
      </header>

      <div className={menuOpen ? "mobile-menu is-open" : "mobile-menu"} aria-hidden={!menuOpen}>
        <Button variant="ghost" size="icon" className="absolute right-5 top-5" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X />
        </Button>
        <nav aria-label="Mobile navigation">
          {navigation.map(([label, id], index) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </nav>
      </div>

      <section id="top" className="hero-section">
        <div className="hero-bg" aria-hidden="true">
          {use3D ? (
            <SceneBoundary fallback={<SystemCanvas />}>
              <Suspense fallback={<SystemCanvas />}>
                <HeroScene />
              </Suspense>
            </SceneBoundary>
          ) : (
            <SystemCanvas />
          )}
        </div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-introduction">
            <div className="hero-kicker">
              <span className="status-dot" /> FULL-STACK DEVELOPER · B.TECH IT GRADUATE
            </div>
            <h1 ref={nameRef} className="hero-name">
              YASHWANTH A M<span className="hero-name__period">.</span>
            </h1>
            <p className="hero-title">
              <HeroWords text="A full-stack developer who makes ideas ship." />
            </p>
            <div className="hero-support">
              <p>{profile.summary}</p>
              <div className="hero-actions">
                <Button variant="editorial" size="editorial" asChild>
                  <a href="#work">
                    VIEW MY WORK <ArrowDown />
                  </a>
                </Button>
                <Button variant="editorialOutline" size="editorial" asChild>
                  <a href="#contact">CONTACT ME</a>
                </Button>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <span>{profile.location}</span>
            <a href="#about">
              Scroll to explore <ArrowDown size={14} />
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="light-section section-space">
        <div className="page-grid" data-reveal>
          <SectionLabel>01 — About</SectionLabel>
          <h2 className="section-title lg:col-span-6">I build products that explain themselves.</h2>
          <p className="body-large about-copy lg:col-span-5 lg:col-start-8">{profile.summary}</p>
          <div className="about-index lg:col-span-12">
            <span>Based in</span>
            <strong>{profile.location}</strong>
          </div>
        </div>
      </section>

      <section className="dark-section section-space">
        <div className="page-grid" data-reveal>
          <SectionLabel>02 — How I work</SectionLabel>
          <h2 className="section-title lg:col-span-8 lg:col-start-5">
            From idea
            <br />
            to interface
            <br />
            to system.
          </h2>
          <div className="process-list lg:col-span-10 lg:col-start-3">
            {[
              ["01", "Think", "Understand the problem, requirements and constraints."],
              ["02", "Build", "Create responsive interfaces and reliable application logic."],
              ["03", "Refine", "Test APIs, manage code with Git and improve the result."],
            ].map(([number, title, text]) => (
              <div className="process-row" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="light-section section-space">
        <div className="page-grid" data-reveal>
          <SectionLabel>03 — Selected work</SectionLabel>
          <h2 className="section-title lg:col-span-8 lg:col-start-5">Projects built to solve real problems.</h2>
        </div>
        {projects.map((project, index) => (
          <article className={index % 2 ? "project-block project-block--reverse" : "project-block"} data-reveal key={project.id}>
            <div className="project-visual-sticky">
              <TechnicalVisual projectId={project.id} />
            </div>
            <div className="project-copy">
              <div>
                <span>Project 0{index + 1}</span>
                <span>{project.tagline}</span>
              </div>
              <h3>{project.title}</h3>
              <ul className="project-features">
                {project.points.map((point, i) => (
                  <li key={point}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {point}
                  </li>
                ))}
              </ul>
              <p className="project-stack">{project.stack.join(" · ")}</p>
            </div>
          </article>
        ))}
      </section>

      <section id="experience" className="accent-section section-space">
        <div className="page-grid" data-reveal>
          <SectionLabel>04 — Experience</SectionLabel>
          {experience.map((entry) => (
            <div className="experience-entry lg:col-span-12" key={entry.role}>
              <div className="experience-year lg:col-span-3 lg:col-start-2">{entry.period.slice(0, 4)}</div>
              <div className="experience-copy lg:col-span-7 lg:col-start-6">
                <p>{entry.period}</p>
                <h2>{entry.role}</h2>
                <h3>{entry.org}</h3>
                <ul>
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="dark-section section-space">
        <div className="page-grid" data-reveal>
          <SectionLabel>05 — Technology</SectionLabel>
          <h2 className="section-title lg:col-span-8 lg:col-start-5">
            Tools I use
            <br />
            to build.
          </h2>
          <div className="skill-wall lg:col-span-11 lg:col-start-2">
            {skills.map((skill) => (
              <div key={skill.group}>
                <span>{skill.group}</span>
                <p>{skill.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="light-section section-space">
        <div className="page-grid" data-reveal>
          <SectionLabel>06 — Certifications</SectionLabel>
          <div className="cert-list lg:col-span-9 lg:col-start-4">
            {certifications.map((cert, index) => (
              <div className="cert-row" key={cert.name}>
                <span>0{index + 1}</span>
                <h3>{cert.name}</h3>
                <p>{cert.by}</p>
                <strong>{cert.year}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="education-section section-space">
        <div className="page-grid" data-reveal>
          <SectionLabel>07 — Education</SectionLabel>
          <div className="lg:col-span-10 lg:col-start-2">
            <p className="education-degree">
              B.Tech
              <br />
              Information Technology
            </p>
            <div className="education-meta">
              <p>
                {education.school}
                <br />
                Bengaluru
              </p>
              <p>{education.period}</p>
              <p>
                CGPA
                <br />
                {education.cgpa}
              </p>
            </div>
            <ul className="achievement-list">
              {achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="focus-section">
        <div className="focus-marquee" aria-hidden="true">
          Learning. Building. Evolving. Learning. Building. Evolving.
        </div>
        <div className="page-grid section-space relative z-10" data-reveal>
          <SectionLabel>08 — Current direction</SectionLabel>
          <p className="body-large lg:col-span-5 lg:col-start-7">
            Open to full-stack, frontend and mobile developer roles — eager to contribute to a dynamic software development team while
            continuously learning and growing.
          </p>
        </div>
      </section>

      <section id="contact" className="contact-section section-space">
        <div className="page-grid" data-reveal>
          <SectionLabel>09 — Contact</SectionLabel>
          <h2 className="contact-title lg:col-span-11 lg:col-start-2">
            Let&apos;s build
            <br />
            something together.
          </h2>
          <p className="body-large lg:col-span-5 lg:col-start-7">
            Available to connect about software development opportunities and collaborative technical work.
          </p>
          <div className="contact-actions lg:col-span-10 lg:col-start-2">
            <Button variant="editorial" size="editorial" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail /> Email me
              </a>
            </Button>
            <Button variant="editorialOutline" size="editorial" asChild>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                <Phone /> Call
              </a>
            </Button>
            <Button variant="editorialOutline" size="editorial" asChild>
              <a href="/YI.pdf" download="Yashwanth-AM-Resume.pdf">
                <Download /> Resume
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>{profile.name}</strong>
          <span>Full-Stack Developer · Bengaluru, India</span>
        </div>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <a href="#top">
          Back to top <ArrowRight />
        </a>
      </footer>
    </main>
  );
}

import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const sectionLinks = [
  { hash: "about", label: "About" },
  { hash: "projects", label: "Projects" },
  { hash: "experience", label: "Experience" },
  { hash: "skills", label: "Skills" },
];

const pageLinks = [
  { to: "/certifications", label: "Certifications" },
  { to: "/achievements", label: "Achievements" },
] as const;

/* Placeholder profile URLs — replace with the real GitHub and LinkedIn addresses. */
const socials = [
  { href: "https://github.com/your-github-username", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/your-linkedin-username", label: "LinkedIn", Icon: Linkedin },
];

const socialClass =
  "flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-foreground/80 shadow-[0_1px_0_0_oklch(1_0_0/0.14)_inset,0_8px_24px_-12px_oklch(0_0_0/0.7)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-foreground hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const linkClass = (activeState: boolean) =>
  cn(
    "nav-link text-[15px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
    activeState ? "text-foreground" : "text-foreground/70 hover:text-foreground",
  );
const activeGlow = activeState => (activeState ? { textShadow: "0 0 16px oklch(1 0 0 / 0.35)" } : undefined);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const sections = sectionLinks
      .map((l) => document.querySelector<HTMLElement>(`#${l.hash}`))
      .filter((s): s is HTMLElement => Boolean(s));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-white/5 bg-background/60 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8"
        aria-label="Main"
      >
        <Link to="/" className="site-name shrink-0 text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
          Yashwanth
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {sectionLinks.map((l) => (
            <li key={l.hash}>
              <Link
                to="/"
                hash={l.hash}
                hashScrollIntoView
                className={linkClass(pathname === "/" && active === l.hash)}
                style={activeGlow(pathname === "/" && active === l.hash)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          {pageLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                aria-current={pathname === l.to ? "page" : undefined}
                className={linkClass(pathname === l.to)}
                style={activeGlow(pathname === l.to)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2.5">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className={socialClass}
              >
                <Icon size={20} strokeWidth={1.6} />
              </a>
            ))}
          </div>
          <button
            className="rounded-md p-2 text-foreground lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/5 px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col py-2">
            {sectionLinks.map((l) => (
              <li key={l.hash}>
                <Link to="/" hash={l.hash} hashScrollIntoView onClick={() => setOpen(false)} className="block py-3 text-lg text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
            {pageLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block py-3 text-lg text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

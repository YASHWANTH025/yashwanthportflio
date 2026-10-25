import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/resume";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 md:px-8" aria-label="Main">
        <a href="#top" className="text-xl font-medium tracking-tight text-foreground">
          yashwanth<span className="text-accent">.</span>
        </a>
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link text-[15px] font-medium text-foreground/85 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 md:flex">
          <a href="/YI.pdf" download className="rounded-lg border border-border bg-secondary px-5 py-2.5 text-[15px] font-medium text-secondary-foreground transition-colors hover:bg-surface-2">
            Resume
          </a>
          <a href={`mailto:${profile.email}`} className="rounded-lg bg-primary px-5 py-2.5 text-[15px] font-medium text-primary-foreground transition-shadow hover:shadow-glow">
            Contact me
          </a>
        </div>
        <button
          className="rounded-md p-2 text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-border px-5 pb-6 md:hidden">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lg text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <a href="/YI.pdf" download className="flex-1 rounded-lg border border-border bg-secondary py-3 text-center font-medium">Resume</a>
            <a href={`mailto:${profile.email}`} className="flex-1 rounded-lg bg-primary py-3 text-center font-medium text-primary-foreground">Contact me</a>
          </div>
        </div>
      )}
    </header>
  );
}

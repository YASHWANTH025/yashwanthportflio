import { MousePointer2, Sparkles, FileText, BarChart3, Search } from "lucide-react";

/** Product-style mockup of ResumeAI with an animated cursor + AI guidance tooltip. */
export function AssistantDemo() {
  return (
    <div className="relative mx-auto w-full max-w-[1040px]">
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-16 bottom-0 -z-10 rounded-[50%] bg-glow/15 blur-[100px]"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <div className="ml-4 flex-1 truncate rounded-md bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
            resumeai.app/analysis
          </div>
        </div>
        <div className="grid md:grid-cols-[200px_1fr]">
          <aside className="hidden border-r border-border p-4 md:block">
            {[
              { i: FileText, t: "My resume" },
              { i: Search, t: "Job match" },
              { i: BarChart3, t: "Insights" },
            ].map(({ i: Icon, t }, k) => (
              <div
                key={t}
                className={`mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${k === 1 ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
              >
                <Icon size={15} /> {t}
              </div>
            ))}
          </aside>
          <div className="relative p-5 md:p-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Target role
                </p>
                <p className="mt-1 text-lg font-medium">Frontend Developer</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">ATS score</p>
                <p className="mt-1 text-3xl font-light">
                  78<span className="text-base text-muted-foreground">/100</span>
                </p>
              </div>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-accent/60 to-foreground" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card-grad p-4">
                <p className="text-sm text-muted-foreground">Matched skills</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["React.js", "JavaScript", "REST APIs", "Tailwind"].map((s) => (
                    <span key={s} className="rounded-md bg-secondary px-2 py-1 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative rounded-xl border border-border bg-card-grad p-4">
                <p className="text-sm text-muted-foreground">Missing keywords</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["TypeScript", "Testing", "CI/CD"].map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-dashed border-foreground/25 px-2 py-1 text-xs text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* animated cursor + AI tip */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[18%] top-[22%] hidden sm:block"
            >
              <div className="animate-cursor">
                <MousePointer2 size={22} className="fill-foreground text-foreground drop-shadow" />
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-6 right-6 hidden w-[260px] animate-pop rounded-xl border border-border bg-popover p-4 shadow-card sm:block"
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles size={14} className="text-accent" /> AI suggestion
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Add “TypeScript” to your skills and mention it in your ResumeAI project to improve
                role alignment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

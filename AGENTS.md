<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Portfolio content lives in `src/lib/resume.ts`; sections in `src/components/portfolio/` read from it so resume edits never touch layout code.
- Don't name custom utilities `text-<token>` when a `--color-<token>` exists — Tailwind treats it as a text color (e.g. use `text-halo`, not `text-glow`).
- Keep the opening film in a separate PortfolioIntro wrapper with CDN media, bounded playback and inert underlying content; this preserves the portfolio and prevents intro failures from trapping visitors.

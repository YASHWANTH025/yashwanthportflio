// Deterministic pseudo-random stars so SSR and client markup match.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
const STARS = Array.from({ length: 90 }, (_, i) => ({
  left: rand(i + 1) * 100,
  top: rand(i + 101) * 100,
  size: rand(i + 201) > 0.85 ? 2 : 1,
  delay: rand(i + 301) * 4,
}));

export function Starfield() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground animate-twinkle"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
    </div>
  );
}

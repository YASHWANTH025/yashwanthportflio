import { useEffect, useState } from "react";

const roles = ["Software Engineer", "Full-Stack Developer", "Creative Developer", "UI/UX Designer"];
const roleCycleMs = 2500;

export function ProfessionalRole() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % roles.length), roleCycleMs);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <p className="hero-fade hero-role mx-auto mt-7 max-w-[620px] text-lg leading-relaxed text-muted-foreground md:text-xl" style={{ animationDelay: "0.5s" }}>
      <span className="sr-only">Professional roles: {roles.join(", ")}.</span>
      <span aria-hidden="true" className="hero-role__slot">
        <span key={index} data-role-index={index} className="hero-role__title">{roles[index]}</span>
      </span>
    </p>
  );
}
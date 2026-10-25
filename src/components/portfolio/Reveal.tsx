import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = { up: "reveal", mask: "reveal-mask", fade: "reveal-fade" } as const;

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
  variant?: keyof typeof variants;
}) {
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(variants[variant], className)}
    >
      {children}
    </Tag>
  );
}

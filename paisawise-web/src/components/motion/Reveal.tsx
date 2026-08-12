"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-entry reveal. Children fade and rise, optionally staggered.
 *
 * gsap.matchMedia handles prefers-reduced-motion at the platform level: under
 * `reduce` no tween is created at all and content renders in its final state,
 * rather than animating quickly.
 */
export function Reveal({
  children,
  className,
  stagger = 0.06,
  y = 24,
  selector,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  /** Animate matching descendants instead of the container itself. */
  selector?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) return;
          const targets = selector
            ? scope.current!.querySelectorAll(selector)
            : [scope.current!];
          gsap.from(targets, {
            opacity: 0,
            y,
            duration: 0.7,
            ease: "power3.out",
            stagger,
            scrollTrigger: {
              trigger: scope.current,
              start: "top 85%",
              once: true,
            },
          });
        },
      );
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}

/**
 * Counts up when scrolled into view. Uses Inter tabular figures via `.num`
 * so the width does not jitter as digits change.
 */
export function Counter({
  to,
  format,
  className,
  duration = 1.4,
}: {
  to: number;
  format?: (v: number) => string;
  className?: string;
  duration?: number;
}) {
  const el = useRef<HTMLSpanElement>(null);
  const fmt = format ?? ((v: number) => Math.round(v).toString());

  useGSAP(
    () => {
      const node = el.current;
      if (!node) return;
      node.textContent = fmt(to);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { v: 0 };
        gsap.to(counter, {
          v: to,
          duration,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 90%", once: true },
          onUpdate: () => {
            node.textContent = fmt(counter.v);
          },
        });
      });
      return () => mm.revert();
    },
    { dependencies: [to] },
  );

  return <span ref={el} className={cn("num", className)} />;
}

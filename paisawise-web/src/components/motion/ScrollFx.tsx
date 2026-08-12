"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-linked effects that apply site-wide.
 *
 * Everything here is scrubbed against scroll position rather than played on a
 * timer, so the page never animates on its own and the reader stays in
 * control. The whole set is inside a `no-preference` matchMedia block: under
 * reduced motion no tween is created at all, rather than created and then
 * shortened, so nothing can be left mid-transition.
 *
 * Opt in per element with a data attribute:
 *   data-fx="parallax"  slow drift, for decorative panels
 *   data-fx="rise"      section lifts and settles as it enters
 */
export function ScrollFx() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* Reading-progress bar. Scaled on the compositor, not animated width,
         which would relayout on every frame. */
      if (bar.current) {
        gsap.set(bar.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(bar.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-fx='parallax']").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-fx='rise']").forEach((el) => {
        gsap.from(el, {
          y: 56,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* Section hairlines draw in as they arrive, which makes the grid read
         as structure being built rather than as static borders. */
      gsap.utils.toArray<HTMLElement>("[data-fx='rule']").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 bg-transparent"
    >
      <div ref={bar} className="h-full w-full origin-left bg-accent-fill" />
    </div>
  );
}

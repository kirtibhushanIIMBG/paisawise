"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * A soft gold wash and a thin ring that trail the pointer.
 *
 * Three guards, all of them load-bearing rather than decorative:
 *
 * 1. `(pointer: fine)` only. On a touch screen there is no cursor to follow,
 *    and the listener would fire on every tap for nothing.
 * 2. `prefers-reduced-motion` opts out entirely. A large object chasing the
 *    pointer is exactly the kind of movement that setting exists to stop, so
 *    this returns without ever creating the tweens.
 * 3. `pointer-events: none` on both layers, so nothing on the page becomes
 *    unclickable.
 *
 * The ring tightens over interactive elements, which gives the cursor a job
 * beyond decoration: it signals what can be clicked.
 */
export function CursorGlow() {
  const wash = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const w = wash.current;
        const r = ring.current;
        if (!w || !r) return;

        gsap.set([w, r], { xPercent: -50, yPercent: -50, opacity: 0 });

        /* quickTo keeps one interpolator per axis rather than allocating a
           tween per mousemove. The ring is faster than the wash, so the pair
           reads as one object with weight rather than two dots. */
        const wx = gsap.quickTo(w, "x", { duration: 0.75, ease: "power3.out" });
        const wy = gsap.quickTo(w, "y", { duration: 0.75, ease: "power3.out" });
        const rx = gsap.quickTo(r, "x", { duration: 0.22, ease: "power3.out" });
        const ry = gsap.quickTo(r, "y", { duration: 0.22, ease: "power3.out" });

        let shown = false;
        const onMove = (e: PointerEvent) => {
          if (!shown) {
            shown = true;
            gsap.to([w, r], { opacity: 1, duration: 0.4 });
          }
          wx(e.clientX);
          wy(e.clientY);
          rx(e.clientX);
          ry(e.clientY);

          const interactive = (e.target as Element | null)?.closest?.(
            "a, button, input, select, textarea, [role='tab'], [role='slider']",
          );
          gsap.to(r, {
            scale: interactive ? 1.9 : 1,
            borderColor: interactive
              ? "var(--accent-fill)"
              : "color-mix(in srgb, var(--accent-fill) 45%, transparent)",
            duration: 0.25,
            overwrite: "auto",
          });
        };

        const onLeave = () => {
          shown = false;
          gsap.to([w, r], { opacity: 0, duration: 0.3 });
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        return () => {
          window.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerleave", onLeave);
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div
        ref={wash}
        className="absolute left-0 top-0 h-[26rem] w-[26rem] rounded-full opacity-0 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-fill) 22%, transparent) 0%, transparent 65%)",
        }}
      />
      <div
        ref={ring}
        className="absolute left-0 top-0 size-7 rounded-full border opacity-0"
        style={{ borderColor: "color-mix(in srgb, var(--accent-fill) 45%, transparent)" }}
      />
    </div>
  );
}

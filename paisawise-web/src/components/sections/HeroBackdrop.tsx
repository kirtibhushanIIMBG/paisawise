"use client";

import { useEffect, useState } from "react";
import {
  HERO_FADE_MS,
  HERO_IMAGES,
  HERO_INTERVAL_MS,
} from "@/lib/hero-images";

/**
 * Crossfading photographic backdrop for the hero.
 *
 * Three things this has to do without breaking what is already there:
 *
 * 1. Not cost the headline its contrast. A photograph behind display type is
 *    the classic way to lose it, so the plates sit under a two-part scrim --
 *    a flat wash for the whole section plus a stronger left-weighted gradient
 *    under the copy column. Both are built from theme tokens, so they invert
 *    with the theme rather than assuming a dark ground.
 *
 * 2. Not animate at people who asked it not to. Under `prefers-reduced-motion`
 *    the first plate is shown and the timer never starts: no crossfade, no
 *    interval, nothing running. Auto-advancing imagery is squarely what that
 *    setting exists to stop.
 *
 * 3. Not shift the layout or block the first paint. Every plate is absolutely
 *    positioned and `object-cover`, so there is no reflow as they decode, and
 *    only the first is eager -- the rest have a full interval to arrive.
 *
 * The timer also parks itself while the tab is hidden. Cycling images nobody
 * is looking at just burns decode work and battery.
 */
export function HeroBackdrop() {
  const [index, setIndex] = useState(0);
  const [cycling, setCycling] = useState(false);

  useEffect(() => {
    if (HERO_IMAGES.length < 2) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };

    const sync = () => {
      stop();
      if (query.matches || document.visibilityState === "hidden") {
        setCycling(false);
        return;
      }
      setCycling(true);
      timer = setInterval(
        () => setIndex((i) => (i + 1) % HERO_IMAGES.length),
        HERO_INTERVAL_MS,
      );
    };

    sync();
    query.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      query.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  if (HERO_IMAGES.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((image, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={image.src}
          src={image.src}
          alt=""
          /* Decorative and already hidden from the tree; this keeps it out of
             the tab order and off the a11y tree in older engines too. */
          role="presentation"
          decoding="async"
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "var(--hero-plate-filter)",
            opacity: i === index ? 1 : 0,
            /* Opacity only: a filter or transform here would promote four
               full-bleed layers and cost more than the effect is worth. */
            transition: cycling ? `opacity ${HERO_FADE_MS}ms ease-in-out` : "none",
          }}
        />
      ))}

      {/*
        Scrim.

        The first cut of this was a full-width 74% wash with a 94% gradient
        stacked on top of it, which let about 1.6% of the photograph through
        on the left. The contrast numbers looked excellent for the obvious
        reason: there was effectively no image there.

        So the protection is local now. A soft ellipse sits over the copy
        column and releases quickly, which keeps the headline on a near-solid
        ground while the rest of the frame -- the margins, the band above and
        below the copy, everything right of centre -- shows the photograph at
        roughly 80% strength.
      */}
      <div
        className="absolute inset-0"
        style={{ background: "color-mix(in srgb, var(--bg) var(--hero-wash), transparent)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(72% 82% at 24% 48%," +
            " color-mix(in srgb, var(--bg) var(--hero-scrim-core), transparent) 0%," +
            " color-mix(in srgb, var(--bg) var(--hero-scrim-mid), transparent) 38%," +
            " color-mix(in srgb, var(--bg) var(--hero-scrim-outer), transparent) 66%," +
            " transparent 86%)",
        }}
      />
      {/* Bottom fade, so the hero dissolves into the section hairline below
          rather than stopping at a hard photographic edge. */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />
    </div>
  );
}

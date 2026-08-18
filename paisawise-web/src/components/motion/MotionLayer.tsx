"use client";

import dynamic from "next/dynamic";

/**
 * Defers the two decorative motion layers out of the initial bundle.
 *
 * Both are pure decoration -- aria-hidden, fixed, pointer-driven -- but they
 * live in the root layout, so every route paid for GSAP whether or not it
 * animated anything. Only four of fourteen routes actually use `Reveal`; the
 * other ten (privacy, terms, blog, contact...) were downloading ~52 KB gzipped
 * of animation engine to render static prose.
 *
 * `ssr: false` is safe precisely because neither draws content: nothing is
 * missing from the server-rendered HTML, and nothing shifts when they arrive.
 */
const CursorGlow = dynamic(
  () => import("./CursorGlow").then((m) => m.CursorGlow),
  { ssr: false },
);
const ScrollFx = dynamic(
  () => import("./ScrollFx").then((m) => m.ScrollFx),
  { ssr: false },
);

export function MotionLayer() {
  return (
    <>
      <ScrollFx />
      <CursorGlow />
    </>
  );
}

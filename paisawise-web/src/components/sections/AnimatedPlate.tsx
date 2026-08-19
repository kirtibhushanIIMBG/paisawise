import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A rounded plate with ambient motion drawn in the browser.
 *
 * The landing page carries the filmed plates. These are a different family of
 * motion on purpose — concentric orbits, packets running a rail, bars
 * breathing, a ring leaving the centre — so the product pages read as related
 * to the front door rather than as a repeat of it. Nothing here is a video:
 * it is a few hundred bytes of inline SVG animating transform and opacity,
 * with no network request in the path and nothing to buffer.
 *
 * All four are decorative and sit behind copy, so each one is `aria-hidden`,
 * drawn at low alpha in the accent, and stopped dead by the platform's
 * reduced-motion rule in `globals.css`.
 */

type Variant = "orbit" | "flow" | "bars" | "pulse";

/** Concentric rings turning at different rates. Echoes the PaisaWise mark. */
function Orbit() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="currentColor">
        {[
          { r: 62, w: 1.5, dur: "26s", dash: "3 9", back: false, o: 0.55 },
          { r: 104, w: 1, dur: "38s", dash: "1 14", back: true, o: 0.4 },
          { r: 152, w: 1.5, dur: "52s", dash: "5 18", back: false, o: 0.3 },
          { r: 206, w: 1, dur: "70s", dash: "2 22", back: true, o: 0.22 },
        ].map((ring) => (
          <circle
            key={ring.r}
            className="plate-anim"
            cx="200"
            cy="200"
            r={ring.r}
            strokeWidth={ring.w}
            strokeDasharray={ring.dash}
            opacity={ring.o}
            style={{
              animation: `${ring.back ? "plate-spin-back" : "plate-spin"} ${ring.dur} linear infinite`,
            }}
          />
        ))}
      </g>
      {/* Two markers riding the inner rings, so the rotation is legible even
          where the dash pattern is too fine to track. */}
      <g fill="currentColor">
        <g className="plate-anim" style={{ animation: "plate-spin 26s linear infinite" }}>
          <circle cx="262" cy="200" r="3.5" opacity="0.65" />
        </g>
        <g className="plate-anim" style={{ animation: "plate-spin-back 38s linear infinite" }}>
          <circle cx="200" cy="96" r="2.5" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
}

/** Packets running along rails: money moving between accounts. */
function Flow() {
  const rails = [
    { d: "M -20 70 H 420", dur: "7s", delay: "0s" },
    { d: "M -20 140 H 420", dur: "9s", delay: "1.4s" },
    { d: "M -20 210 H 420", dur: "6.2s", delay: "2.6s" },
    { d: "M -20 280 H 420", dur: "10.5s", delay: "0.7s" },
    { d: "M -20 350 H 420", dur: "8.2s", delay: "3.3s" },
  ];
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="none">
      <g stroke="currentColor" fill="none">
        {rails.map((r) => (
          <g key={r.d}>
            {/* The rail itself, barely there. */}
            <path d={r.d} strokeWidth="1" opacity="0.28" />
            {/* The packet. */}
            <path
              className="plate-packet"
              d={r.d}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.9"
              strokeDasharray="26 654"
              style={{
                animation: `plate-run ${r.dur} linear infinite`,
                animationDelay: r.delay,
              }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** A slow breathing bar chart. */
function Bars() {
  const bars = [22, 54, 34, 78, 46, 92, 38, 66, 28, 58, 44, 84];
  return (
    <svg viewBox="0 0 400 200" className="h-full w-full" preserveAspectRatio="none">
      <g fill="currentColor">
        {bars.map((h, i) => (
          <rect
            key={i}
            className="plate-anim-bottom"
            x={i * 33 + 8}
            y={200 - h * 2}
            width="17"
            height={h * 2}
            rx="7"
            opacity={0.14 + (i % 4) * 0.07}
            style={{
              animation: `plate-breathe ${5 + (i % 5) * 1.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.24}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}

/** Rings leaving the centre: the alert firing. */
function Pulse() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {["0s", "1.6s", "3.2s", "4.8s"].map((delay) => (
          <circle
            key={delay}
            className="plate-anim"
            cx="200"
            cy="200"
            r="150"
            style={{
              animation: "plate-ping 6.4s ease-out infinite",
              animationDelay: delay,
            }}
          />
        ))}
      </g>
      <circle cx="200" cy="200" r="5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

const VARIANTS: Record<Variant, () => ReactNode> = {
  orbit: Orbit,
  flow: Flow,
  bars: Bars,
  pulse: Pulse,
};

export function AnimatedPlate({
  variant = "orbit",
  className,
  tone = "field",
  rounded = "rounded-3xl",
  scrim = true,
  children,
}: {
  variant?: Variant;
  className?: string;
  /** `field` draws on the page ground, `ink` on the dark slab. */
  tone?: "field" | "ink";
  rounded?: string;
  /**
   * Lifts the ground under the copy. A plate with nothing written on it does
   * not need it, and on a small plate it washes the drawing out to nothing —
   * so the decorative ones turn it off.
   */
  scrim?: boolean;
  children?: ReactNode;
}) {
  const Art = VARIANTS[variant];
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        rounded,
        tone === "ink"
          ? "bg-ink-card text-accent-fill"
          : "border border-edge bg-panel text-accent-fill",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Art />
      </div>
      {/* Keeps copy off the busiest part of the drawing without washing the
          motion out entirely.

          It has to hold most of the copy column, not just tint it. The `flow`
          rails are straight horizontals: at a lighter setting they crossed the
          masthead headline and read as stripes ruled through the text rather
          than as anything behind it. Wide and near-opaque over the copy, gone
          by the right edge, so the drawing still shows where nothing is
          written. */}
      {scrim ? (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            tone === "ink"
              ? "radial-gradient(86% 92% at 26% 46%, color-mix(in srgb, var(--ink-card) 96%, transparent) 0%, color-mix(in srgb, var(--ink-card) 72%, transparent) 52%, transparent 84%)"
              : "radial-gradient(86% 92% at 26% 46%, color-mix(in srgb, var(--panel) 96%, transparent) 0%, color-mix(in srgb, var(--panel) 74%, transparent) 52%, transparent 84%)",
        }}
      />
      ) : null}
      {children}
    </div>
  );
}

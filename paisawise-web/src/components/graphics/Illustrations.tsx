"use client";

import { MONTHS, monthTotals } from "@/lib/demo-data";
import { rupees } from "@/lib/format";

/**
 * Original diagrams, drawn as inline SVG.
 *
 * Deliberately not stock photography: pictures of smiling people on a
 * fictional financial product read as invented customers, and the site is
 * already careful not to imply real ones. These are schematic instead, they
 * inherit the theme through CSS custom properties, and they cost about a
 * kilobyte each.
 *
 * They are decorative, so each is aria-hidden and the surrounding copy
 * carries the meaning.
 */

/* Diagram strokes sit on --edge-strong rather than --edge. The hairline that
   is right for a page border is close to invisible as a drawn line. */
const EDGE = "var(--edge-strong)";
const DIM = "var(--dim)";
const INK = "var(--copy)";
const ACCENT = "var(--accent-fill)";
const WARN = "var(--warning)";

/* Problem 1: money leaving through five doors, nothing adding it up. */
export function ScatteredAccounts({ className }: { className?: string }) {
  const nodes = [
    { x: 18, y: 22, label: "Bank" },
    { x: 74, y: 16, label: "Bank" },
    { x: 88, y: 54, label: "Card" },
    { x: 30, y: 66, label: "UPI" },
    { x: 62, y: 82, label: "UPI" },
  ];
  return (
    <svg viewBox="0 0 110 100" className={className} aria-hidden role="presentation">
      {/* the missing centre: an empty socket nothing connects to */}
      <circle
        cx="55" cy="50" r="14"
        fill="none" stroke={EDGE} strokeWidth="1.2" strokeDasharray="3 3"
      />
      <text
        x="55" y="53" textAnchor="middle"
        fontSize="9" fontWeight="600" fill={WARN} fontFamily="var(--font-sans)"
      >
        ?
      </text>
      {nodes.map((n, i) => (
        <g key={i}>
          {/* each stub reaches toward the centre and stops short */}
          <line
            x1={n.x + (55 - n.x) * 0.18}
            y1={n.y + (50 - n.y) * 0.18}
            x2={n.x + (55 - n.x) * 0.55}
            y2={n.y + (50 - n.y) * 0.55}
            stroke={DIM}
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />
          <rect
            x={n.x - 11} y={n.y - 6} width="22" height="12" rx="6"
            fill="var(--panel-alt)" stroke={EDGE} strokeWidth="1.2"
          />
          <text
            x={n.x} y={n.y + 3} textAnchor="middle"
            fontSize="6" fontWeight="600" fill={INK} fontFamily="var(--font-sans)"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* Problem 2: the same five tips handed to everyone. */
export function GenericAdvice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 100" className={className} aria-hidden role="presentation">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 9}, ${i * 9})`} opacity={1 - i * 0.28}>
          <rect
            x="14" y="14" width="66" height="52" rx="7"
            fill="var(--panel-alt)" stroke={EDGE} strokeWidth="1.2"
          />
          {[0, 1, 2, 3].map((r) => (
            <rect
              key={r}
              x="23" y={25 + r * 9} width={r === 3 ? 26 : 44} height="3.5" rx="1.75"
              fill={DIM}
            />
          ))}
        </g>
      ))}
      {/* identical output, three different people */}
      <text
        x="55" y="94" textAnchor="middle"
        fontSize="6.5" fontWeight="600" fill={INK} fontFamily="var(--font-sans)"
      >
        same five tips
      </text>
    </svg>
  );
}

/**
 * Compact dashboard preview for the demo teaser.
 *
 * Reads the same seeded August the /demo route and the hero panel use, so
 * the three never disagree. Drawn by hand rather than with the chart library
 * because it is a still image at this size and does not need axes, a tooltip
 * or a resize observer.
 */
export function DashboardPreview({ className }: { className?: string }) {
  const aug = MONTHS[0];
  const t = monthTotals(aug);
  const pts = aug.timeline;
  const max = Math.max(...pts.map((p) => p.spend));
  const W = 300, H = 92;
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * W} ${H - (p.spend / max) * H}`)
    .join(" ");
  const pace = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * W} ${H - (p.budgetPace / max) * H}`)
    .join(" ");

  return (
    <div
      className={className}
      aria-label="Preview of the PaisaWise dashboard showing August"
      role="img"
    >
      <div className="rounded-2xl border border-edge bg-panel p-3 shadow-2xl shadow-black/30">
        <div className="rounded-xl border border-edge bg-bg p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs text-dim">Spent in August</p>
              <p className="num mt-1 text-2xl font-semibold text-fg">{rupees(t.spent)}</p>
            </div>
            <span className="num inline-flex items-center gap-1 rounded-full bg-warning/12 px-2.5 py-1 text-xs font-semibold text-warning">
              over by {rupees(t.spent - t.budget)}
            </span>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" aria-hidden>
            <defs>
              <linearGradient id="pw-preview-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0.30" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill="url(#pw-preview-fill)" />
            <path d={pace} fill="none" stroke={DIM} strokeWidth="1.5" strokeDasharray="4 4" />
            <path d={path} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-edge pt-4">
            {[
              ["Money in", rupees(aug.income)],
              ["Left over", rupees(t.saved)],
              ["Budget", rupees(t.budget)],
            ].map(([k, v], i) => (
              <div key={k}>
                <p className="text-[0.65rem] uppercase tracking-wider text-dim">{k}</p>
                <p className={`num mt-0.5 text-sm font-semibold ${i === 1 ? "text-positive" : "text-fg"}`}>
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

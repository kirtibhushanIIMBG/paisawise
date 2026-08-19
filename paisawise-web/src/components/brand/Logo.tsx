import { cn } from "@/lib/utils";

/**
 * PaisaWise mark: a piggy bank inside concentric discs.
 *
 * Traced to vector from the supplied raster so it scales, recolours per theme,
 * and stays about 1KB. Two colourways: the default sits on light pages, the
 * `onInk` variant lifts the disc so it separates from the ink background.
 *
 * This file is exempt from the raw-hex lint rule. The shades below are logo
 * artwork rather than interface colour, so they do not belong in the token set.
 */

/* Ring and mid follow the gold accent; the disc stays ink so the white piggy
   keeps its contrast. Kept as literals because this is logo artwork rather
   than interface colour, and the mark must not restyle with the theme. */
const COLOURWAY = {
  light: { base: "#171526", ring: "#8A6508", mid: "#2A2208" },
  ink: { base: "#211B0A", ring: "#E0A020", mid: "#3A2E10" },
} as const;

export function Mark({
  className,
  onInk = false,
  disc = true,
}: {
  className?: string;
  onInk?: boolean;
  disc?: boolean;
}) {
  const c = onInk ? COLOURWAY.ink : COLOURWAY.light;
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="PaisaWise"
    >
      {disc ? <circle cx="50" cy="50" r="50" fill={c.base} /> : null}
      <circle cx="50" cy="50" r="41" fill="none" stroke={c.ring} strokeWidth="1.6" />
      <circle cx="50" cy="50" r="31" fill={c.mid} />

      {/* piggy bank, facing right. Scaled up so it still reads at 32px. */}
      <g transform="translate(50,51.5) scale(1.22) translate(-50,-51.5)">
        <g fill="#FFFFFF">
          <rect x="36" y="44" width="26" height="15.5" rx="7" />
          <rect x="58.5" y="47.6" width="7" height="8.6" rx="2.4" />
          <path d="M54.5 45 L60.6 39.4 L61.8 45.6 Z" />
          <path d="M42.6 44.6 a5.8 5.8 0 0 1 11.6 0 Z" />
          <rect x="39.6" y="58.6" width="4.6" height="4" rx="1.2" />
          <rect x="52" y="58.6" width="4.6" height="4" rx="1.2" />
        </g>
        <path
          d="M36.2 48.6 c-3.4 -0.8 -5.6 1.4 -4.4 3.5 c0.8 1.5 2.9 1.2 3.2 -0.3"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="55.6" cy="50.2" r="1.35" fill={c.mid} />
      </g>
    </svg>
  );
}

/*
  No `onInk` here, unlike Mark. It used to force `text-white` on the first
  half, and its one caller with onInk set is the footer -- whose ground is
  `bg-panel-alt`, near-black in dark but #fbfafd in light. "Paisa" measured
  1.04:1 there: not faint, gone. `text-fg` is already the theme-aware ink, and
  the second half never varied at all, so the prop was choosing between a bug
  and the right answer.

  Mark keeps its own onInk because that swaps a fixed logo colourway rather
  than an interface colour, and must not follow the theme.
*/
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-[1.35rem] font-bold leading-none tracking-[-0.02em]",
        className,
      )}
    >
      <span className="text-fg">Paisa</span>
      <span className="text-accent">Wise</span>
    </span>
  );
}

export function Logo({
  className,
  onInk = false,
  showTagline = false,
}: {
  className?: string;
  onInk?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className="h-9 w-9 shrink-0" onInk={onInk} />
      <span className="flex flex-col">
        <Wordmark />
        {showTagline ? (
          <span
            className={cn(
              // 0.6rem is 9.6px. Uppercase at 0.18em tracking is already hard
              // work to read; below 12px it stops being text and becomes
              // texture, so this is the floor rather than a chosen size.
              "mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.16em]",
              onInk ? "text-copy" : "text-dim",
            )}
          >
            Your personal finance guide
          </span>
        ) : null}
      </span>
    </span>
  );
}

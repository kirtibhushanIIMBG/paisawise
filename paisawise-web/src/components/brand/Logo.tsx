import { cn } from "@/lib/utils";

/**
 * PaisaWise mark: three ascending coin stacks with a trajectory arrow tracing
 * their growth. Paisa (coins) plus wise (guided upward).
 *
 * Geometry is ported from brand/paisawise-mark-nodisc.svg so the site, the
 * pitch deck and the brand folder stay identical.
 */

const COIN_TOP = "#8F76FF";
const COIN_BODY = "#5B3FD6";
const COIN_HI = "#BCA9FF";

function CoinStack({ x, count, base }: { x: number; count: number; base: number }) {
  const rx = 10.5;
  const ry = 4;
  const h = 6;
  const pitch = 9.6;
  return (
    <>
      {Array.from({ length: count }, (_, k) => {
        const cy = base - k * pitch;
        return (
          <g key={k}>
            <rect x={x - rx} y={cy} width={rx * 2} height={h} fill={COIN_BODY} />
            <ellipse cx={x} cy={cy + h} rx={rx} ry={ry} fill={COIN_BODY} />
            <ellipse cx={x} cy={cy} rx={rx} ry={ry} fill={COIN_TOP} />
            <ellipse
              cx={x - rx * 0.34}
              cy={cy - ry * 0.3}
              rx={rx * 0.4}
              ry={ry * 0.34}
              fill={COIN_HI}
              opacity={0.55}
            />
          </g>
        );
      })}
    </>
  );
}

export function Mark({
  className,
  disc = false,
  arrow = "#12B981",
}: {
  className?: string;
  disc?: boolean;
  arrow?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="PaisaWise"
    >
      {disc ? <circle cx="50" cy="50" r="50" fill="#171526" /> : null}
      <CoinStack x={26} count={1} base={67} />
      <CoinStack x={50} count={2} base={67} />
      <CoinStack x={74} count={3} base={67} />
      <path
        d="M 22 53 L 48 42 L 74 28"
        fill="none"
        stroke={arrow}
        strokeWidth={4.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 63 26.5 L 75.5 27 L 74.5 39"
        fill="none"
        stroke={arrow}
        strokeWidth={4.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  onInk = false,
}: {
  className?: string;
  onInk?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-display text-[1.35rem] font-bold leading-none tracking-[-0.02em]",
        className,
      )}
    >
      <span className={onInk ? "text-white" : "text-fg"}>Paisa</span>
      <span className={onInk ? "text-violet-l" : "text-violet"}>Wise</span>
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
      <Mark className="h-8 w-8 shrink-0" />
      <span className="flex flex-col">
        <Wordmark onInk={onInk} />
        {showTagline ? (
          <span
            className={cn(
              "mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em]",
              onInk ? "text-pale" : "text-dim",
            )}
          >
            Your personal finance guide
          </span>
        ) : null}
      </span>
    </span>
  );
}

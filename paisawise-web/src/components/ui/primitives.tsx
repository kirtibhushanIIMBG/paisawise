import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- Button */

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "onInk";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[transform,background-color,border-color,color] duration-200 " +
  "[transition-timing-function:var(--ease-out-expo)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const BUTTON_VARIANT: Record<string, string> = {
  /* Ink on gold, never white. Gold is a light hue: white text over it is
     2.28:1 and fails, ink is 7.87:1. */
  primary: "shine bg-accent-fill text-on-accent hover:bg-accent-fill-h",
  secondary:
    "shine border border-edge-strong bg-panel-alt text-fg hover:border-accent hover:text-accent",
  ghost: "text-copy hover:text-accent",
  /* A white button stays light on hover in both themes. */
  onInk: "bg-white text-ink hover:bg-gold-t",
};

const BUTTON_SIZE: Record<string, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-13 px-8 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(BUTTON_BASE, BUTTON_VARIANT[variant], BUTTON_SIZE[size], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ Card */

/**
 * `panel` is the free-standing rounded card. `cell` is a square tile that
 * belongs to the page's hairline grid: it draws only a right and bottom edge,
 * so a row of them tiles into the frame rails without doubling borders.
 */
export function Card({
  className,
  children,
  variant = "panel",
  as: Tag = "div",
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "panel" | "cell" | "glass";
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  const variants = {
    panel: "rounded-2xl border border-edge bg-panel p-6",
    cell: "border-b border-r border-edge bg-panel/40 p-7 hover:bg-panel",
    glass:
      "rounded-3xl border border-edge bg-panel/70 p-7 backdrop-blur-xl " +
      "[background-image:radial-gradient(80%_60%_at_50%_0%,var(--color-accent-soft-2),transparent)]",
  };
  return (
    <Tag
      className={cn("transition-colors duration-200", variants[variant], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------- Section */

/**
 * A section is a cell in the page grid: it closes with a hairline so the
 * vertical rails from the layout frame read as a continuous structure.
 * `bleed` opts out of the inner padding for sections that draw their own
 * edge-to-edge sub-grid.
 */
export function Section({
  id,
  className,
  tone = "surface",
  bleed = false,
  children,
}: {
  id?: string;
  className?: string;
  tone?: "surface" | "ink" | "alt";
  bleed?: boolean;
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "ink"
      ? "bg-panel-alt text-fg"
      : tone === "alt"
        ? "bg-panel/50"
        : "bg-bg";
  return (
    <section
      id={id}
      className={cn(
        "relative border-b border-edge",
        !bleed && "py-20 md:py-28",
        toneClass,
        className,
      )}
    >
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}

/* ----------------------------------------------------------- SectionHead */

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  onInk = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  onInk?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-4", onInk && "text-accent")}>{eyebrow}</p>
      ) : null}
      {/* Display type is medium weight and falls away toward the bottom-right,
          matching the reference. Body copy never takes the fade. */}
      <h2
        className={cn(
          "text-[clamp(2rem,4.2vw,3.1rem)] font-medium",
          onInk ? "text-white" : "text-fade",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 text-lg leading-relaxed text-copy">{lede}</p>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------------- Badge */

export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "mint" | "warning" | "neutral";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent-soft text-accent",
    mint: "bg-positive/12 text-positive",
    warning: "bg-warning/12 text-warning",
    neutral: "bg-panel-alt text-copy border border-edge",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------- Illustrative label
   Required wherever a number is modelled rather than quoted from the brief. */

export function IllustrationNote({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs italic text-dim", className)}>
      Illustration, not a guarantee.
    </p>
  );
}

/* -------------------------------------------------------------- Stat/KPI */

export function Stat({
  value,
  label,
  onInk = false,
}: {
  value: React.ReactNode;
  label: string;
  onInk?: boolean;
}) {
  return (
    <div>
      <div
        className={cn(
          "num text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-none",
          onInk ? "text-white" : "text-fade",
        )}
      >
        {value}
      </div>
      <div className="mt-2 text-sm text-copy">{label}</div>
    </div>
  );
}

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
  primary: "bg-violet text-white hover:bg-violet-d",
  secondary: "border border-edge bg-panel text-fg hover:border-violet hover:text-violet",
  ghost: "text-copy hover:text-violet",
  onInk: "bg-white text-ink hover:bg-violet-t",
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

export function Card({
  className,
  children,
  as: Tag = "div",
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-edge bg-panel p-6 transition-colors duration-200",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------- Section */

export function Section({
  id,
  className,
  tone = "surface",
  children,
}: {
  id?: string;
  className?: string;
  tone?: "surface" | "ink" | "alt";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "ink"
      ? "bg-ink text-white"
      : tone === "alt"
        ? "bg-panel-alt"
        : "bg-bg";
  return (
    <section id={id} className={cn("py-20 md:py-28", toneClass, className)}>
      <div className="shell">{children}</div>
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
        <p className={cn("eyebrow mb-4", onInk && "text-violet-l")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "text-[clamp(1.9rem,4vw,2.9rem)] font-semibold",
          onInk ? "text-white" : "text-fg",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            onInk ? "text-pale" : "text-copy",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------------- Badge */

export function Badge({
  children,
  tone = "violet",
  className,
}: {
  children: React.ReactNode;
  tone?: "violet" | "mint" | "neutral";
  className?: string;
}) {
  const tones = {
    violet: "bg-accent-soft text-violet",
    mint: "bg-mint/12 text-mint",
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
          "num text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-none",
          onInk ? "text-white" : "text-fg",
        )}
      >
        {value}
      </div>
      <div className={cn("mt-2 text-sm", onInk ? "text-pale" : "text-copy")}>
        {label}
      </div>
    </div>
  );
}

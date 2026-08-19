import Link from "next/link";
import * as React from "react";
import { ArrowRight } from "lucide-react";
import { SectionPhoto } from "@/components/sections/SectionPhoto";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- Button */

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "onInk";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  /**
   * The trailing arrow-in-a-circle. It is the signature of the primary action
   * in this design, so it is a prop on the button rather than something each
   * caller assembles: the pill's asymmetric padding (pl-8 pr-2) only makes
   * sense with the circle present, and getting that pairing wrong by hand is
   * the obvious failure mode.
   */
  arrow?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BUTTON_BASE =
  "group inline-flex items-center justify-center rounded-full font-medium " +
  "transition-[transform,background-color,border-color,color] duration-200 " +
  "[transition-timing-function:var(--ease-out-expo)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const BUTTON_VARIANT: Record<string, string> = {
  /* The pill. Black on light, white on dark — the single high-contrast action
     the layout is built around. */
  primary: "bg-action text-on-action hover:bg-action-h",
  secondary:
    "border border-edge-strong bg-panel text-fg hover:border-fg",
  ghost: "text-copy hover:text-fg",
  /* Sits on the deep-violet card and on photographic plates, where the theme
     ground is not what is behind the button. */
  onInk: "bg-white text-ink hover:bg-white/90",
};

/* Sizes come in pairs: a plain pill, and the same pill with the circle, which
   needs its right padding collapsed so the circle sits inside the shape. */
const BUTTON_SIZE: Record<string, string> = {
  sm: "h-9 gap-2 px-5 text-sm",
  md: "h-11 gap-2 px-7 text-[0.95rem]",
  lg: "h-13 gap-2 px-8 text-base",
};

const BUTTON_SIZE_ARROW: Record<string, string> = {
  sm: "h-9 gap-2 py-1 pl-5 pr-1 text-sm",
  md: "h-11 gap-3 py-1.5 pl-7 pr-1.5 text-[0.95rem]",
  lg: "h-14 gap-3 py-2 pl-8 pr-2 text-base md:text-lg",
};

const DOT_SIZE: Record<string, string> = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-10 w-10",
};

const ARROW_SIZE: Record<string, number> = { sm: 14, md: 16, lg: 20 };

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  arrow = false,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    BUTTON_BASE,
    BUTTON_VARIANT[variant],
    arrow ? BUTTON_SIZE_ARROW[size] : BUTTON_SIZE[size],
    className,
  );

  const body = (
    <>
      {children}
      {arrow ? (
        <span
          aria-hidden
          className={cn(
            "grid shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5",
            DOT_SIZE[size],
            /* On a filled pill the circle is the inverse of the pill; on the
               outlined and white variants it has to invert the other way or
               it disappears into its own button. */
            variant === "primary"
              ? "bg-action-dot text-on-action-dot"
              : variant === "onInk"
                ? "bg-ink text-white"
                : "bg-fg text-bg",
          )}
        >
          <ArrowRight size={ARROW_SIZE[size]} />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }
  /* Default to "button". An HTML button inside a form submits it unless told
     otherwise, which is never what the callers here want by default. */
  return (
    <button type="button" className={classes} {...rest}>
      {body}
    </button>
  );
}

/* ------------------------------------------------------------------ Card */

/**
 * Cards are the structural unit of this design: large rounded plates laid on
 * the field.
 *
 * `panel` is the white plate. `ink` is the deep-violet copy card — white
 * heading, 60% white body — which the layout uses to break up a row of pale
 * cards. `glass` sits over photography. `cell` survives for the grids that
 * still tile rather than float.
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
  variant?: "panel" | "cell" | "glass" | "ink";
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  const variants = {
    panel: "rounded-2xl border border-edge bg-panel p-7",
    ink: "rounded-2xl bg-ink-card p-7 text-on-ink-card",
    cell: "rounded-2xl border border-edge bg-panel/60 p-7 hover:bg-panel",
    glass:
      "rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl",
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
 * A band of the page. The hairline grid this used to draw is gone: structure
 * now comes from the plates and the whitespace between them, so a section is
 * just a padded, full-width run of the field.
 */
export function Section({
  id,
  className,
  tone = "surface",
  bleed = false,
  photo,
  photoPosition,
  photoVariant,
  children,
}: {
  id?: string;
  className?: string;
  tone?: "surface" | "ink" | "alt";
  bleed?: boolean;
  /**
   * A photographic band behind the section. It is a prop rather than a child
   * because the band has to sit outside `.shell` — passed as a child it would
   * be clipped to the shell box and leave the section's vertical padding bare.
   */
  photo?: string;
  photoPosition?: string;
  photoVariant?: "band" | "masthead";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "ink"
      ? "bg-panel-alt text-fg"
      : tone === "alt"
        ? "bg-panel-alt/60"
        : "bg-bg";
  return (
    <section
      id={id}
      className={cn(
        "relative",
        !bleed && "py-20 md:py-24",
        photo && "overflow-hidden",
        toneClass,
        className,
      )}
    >
      {photo ? (
        <SectionPhoto
          src={photo}
          position={photoPosition}
          variant={photoVariant}
        />
      ) : null}
      {bleed ? children : <div className="shell relative z-10">{children}</div>}
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
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      {/* Capped below the hero on purpose. These sat level with the h1, so the
          page opened with no dominant line and every section shouted as loudly
          as the hook. */}
      <h2
        className={cn(
          "text-[clamp(2rem,4.2vw,3rem)] font-medium",
          onInk ? "text-fg" : "text-fg",
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
    neutral: "border border-edge bg-panel text-copy",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
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
          "num text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-none tracking-[-0.03em]",
          onInk ? "text-on-ink-card" : "text-fg",
        )}
      >
        {value}
      </div>
      <div
        className={cn("mt-2 text-sm", onInk ? "text-white/60" : "text-copy")}
      >
        {label}
      </div>
    </div>
  );
}

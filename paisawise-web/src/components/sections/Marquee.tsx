import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * An infinite horizontal marquee.
 *
 * The track renders its children twice and translates 0 -> -50%, which is what
 * makes the loop seamless: at -50% the second copy sits exactly where the
 * first started, so the jump back to 0 is invisible. Everything else is CSS,
 * in `globals.css`, including the reduced-motion stop.
 *
 * The duplicate pass is `aria-hidden`, so a screen reader hears each name once
 * rather than twice.
 */
export function Marquee({
  items,
  duration = "22s",
  className,
  itemClassName,
  masked = true,
}: {
  /**
   * `logo` wins over `style` when it is set: the brand renders as its own
   * mark, and the typeset wordmark is the fallback for brands whose file has
   * not been supplied. See `src/lib/logos.ts`.
   */
  items: readonly { label: string; style?: CSSProperties; logo?: string }[];
  /** Lower is faster. Brands run at 22s, investors at 30s. */
  duration?: string;
  className?: string;
  itemClassName?: string;
  /** Fades both ends, so items enter and leave rather than being cut off. */
  masked?: boolean;
}) {
  return (
    <div
      className={cn("w-full overflow-hidden", masked && "marquee-mask", className)}
    >
      <div
        className="marquee-track"
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {[0, 1].map((pass) => (
          <div key={pass} className="flex items-center" aria-hidden={pass === 1}>
            {items.map((item) =>
              item.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={item.label}
                  src={item.logo}
                  /* The duplicate pass is aria-hidden, so only the first is
                     announced; alt carries the brand name there. */
                  alt={pass === 0 ? item.label : ""}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "h-7 w-auto shrink-0 self-center object-contain",
                    /* Logos arrive in every colour there is. Muting them to
                       the copy weight keeps the row reading as one ribbon
                       rather than as eight competing brands, and stops them
                       fighting the gold accent. */
                    "opacity-70 [filter:grayscale(1)]",
                    itemClassName,
                  )}
                />
              ) : (
                <span
                  key={item.label}
                  className={cn("shrink-0 self-center whitespace-nowrap", itemClassName)}
                  style={item.style}
                >
                  {item.label}
                </span>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The banks and UPI apps PaisaWise reads.
 *
 * Each is set in its own face and weight, which is the point: a row of
 * logotypes set in one typeface reads as a list, and a row of them set in
 * their own reads as a wall of institutions. No real marks are used — these
 * are wordmarks, not logos, so nothing here is passing itself off as a brand
 * asset.
 */
export const BANK_BRANDS = [
  {
    label: "HDFC Bank",
    key: "hdfc",
    style: { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.02em", fontSize: "15px" },
  },
  {
    label: "ICICI",
    key: "icici",
    style: { fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: "13px", textTransform: "uppercase" },
  },
  {
    label: "Google Pay",
    key: "gpay",
    style: { fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600, letterSpacing: "0.01em", fontSize: "15px" },
  },
  {
    label: "PhonePe",
    key: "phonepe",
    style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: "0.12em", fontSize: "13px" },
  },
  {
    label: "Axis Bank",
    key: "axis",
    style: { fontFamily: "Palatino, 'Book Antiqua', serif", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "16px" },
  },
  {
    label: "Paytm",
    key: "paytm",
    style: { fontFamily: "Impact, 'Arial Narrow', sans-serif", fontWeight: 400, letterSpacing: "0.04em", fontSize: "14px" },
  },
  {
    label: "SBI",
    key: "sbi",
    style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "-0.03em", fontSize: "13px" },
  },
  {
    label: "Kotak",
    key: "kotak",
    style: { fontFamily: "'Times New Roman', serif", fontWeight: 400, letterSpacing: "0.02em", fontSize: "15px" },
  },
] as const satisfies readonly { label: string; key: string; style: CSSProperties }[];

/** The credentials row under "who stands behind this". These are claims about
    PaisaWise rather than other companies' brands, so they stay typeset. */
export const CREDENTIAL_BRANDS = [
  {
    label: "SEBI-registered advisors",
    style: { fontFamily: "'Times New Roman', serif", fontWeight: 400, letterSpacing: "0.02em", fontSize: "14px" },
  },
  {
    label: "AMFI CERTIFIED",
    style: { fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: "16px" },
  },
  {
    label: "RBI account aggregator",
    style: { fontFamily: "Impact, sans-serif", fontWeight: 700, letterSpacing: "0.05em", fontSize: "18px" },
  },
  {
    label: "ISO 27001",
    style: { fontFamily: "Georgia, serif", fontWeight: 600, letterSpacing: "-0.02em", fontSize: "17px" },
  },
  {
    label: "256-bit encryption",
    style: { fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700, letterSpacing: "-0.01em", fontSize: "15px" },
  },
  {
    label: "READ-ONLY ACCESS",
    style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "0.06em", fontSize: "14px" },
  },
  {
    label: "NO ADS EVER",
    style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: "0.18em", fontSize: "14px" },
  },
  {
    label: "Cancel anytime",
    style: { fontFamily: "Palatino, 'Book Antiqua', serif", fontWeight: 500, letterSpacing: "0.03em", fontSize: "15px" },
  },
] as const satisfies readonly { label: string; style: CSSProperties }[];

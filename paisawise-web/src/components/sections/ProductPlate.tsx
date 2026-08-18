import { cn } from "@/lib/utils";

/**
 * The photographic plate beside the product phone.
 *
 * All four images are mounted at once and crossfaded by opacity rather than
 * swapped, because a swap on an image the browser has not decoded yet shows a
 * one-frame hole. They are small on purpose -- the card is never wider than
 * about 420 CSS px, so 900px covers a 2x display with room to spare.
 *
 * No copy sits on this, so it takes only a light wash: enough to seat it in
 * the theme, not enough to bleach it the way a full-bleed band has to be.
 */
export function ProductPlate({
  plates,
  active,
  className,
}: {
  plates: readonly { src: string; position: string }[];
  active: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-[1.6rem] border border-edge bg-panel-alt",
        className,
      )}
    >
      {plates.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.src}
          src={p.src}
          alt=""
          role="presentation"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out motion-reduce:transition-none"
          style={{
            objectPosition: p.position,
            opacity: active === i ? 1 : 0,
            filter: "var(--hero-plate-filter)",
          }}
        />
      ))}
      {/* Seats the photograph in the theme and keeps the bottom edge from
          cutting hard against the section ground. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top," +
            " color-mix(in srgb, var(--panel-alt) 62%, transparent) 0%," +
            " color-mix(in srgb, var(--panel-alt) 12%, transparent) 42%," +
            " transparent 100%)",
        }}
      />
      <div className="absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-edge" />
    </div>
  );
}

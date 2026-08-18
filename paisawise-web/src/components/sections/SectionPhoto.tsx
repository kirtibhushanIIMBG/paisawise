/**
 * A photographic band behind a section.
 *
 * Same discipline as the hero backdrop, simplified: one plate, no crossfade,
 * lazy-loaded because none of these are above the fold. It is decorative --
 * the section reads identically with it removed -- so it is aria-hidden and
 * carries no alt text.
 *
 * The scrim is a flat wash plus a left-weighted gradient, because section copy
 * runs from the left edge. Strength is a per-theme token for the same reason
 * the hero's is: mixing toward near-white flattens a photograph, mixing toward
 * near-black deepens it, so the two themes cannot share a number.
 */
export function SectionPhoto({
  src,
  position = "50% 50%",
}: {
  src: string;
  /** object-position, for framing the subject away from the copy. */
  position?: string;
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        role="presentation"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position, filter: "var(--hero-plate-filter)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "color-mix(in srgb, var(--bg) var(--band-scrim), transparent)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right," +
            " var(--bg) 0%," +
            " color-mix(in srgb, var(--bg) 82%, transparent) 46%," +
            " color-mix(in srgb, var(--bg) 42%, transparent) 100%)",
        }}
      />
      {/* Dissolve into the section hairlines above and below. */}
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(to bottom, var(--bg), transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </div>
  );
}

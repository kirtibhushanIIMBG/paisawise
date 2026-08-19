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
  variant = "band",
}: {
  src: string;
  /** object-position, for framing the subject away from the copy. */
  position?: string;
  /**
   * `band` sits behind a full-width section: tall, so it can afford deep
   * dissolves, and heavily scrimmed because copy runs the whole width.
   *
   * `masthead` sits behind a page title. It is about 300px tall, where two
   * 96px dissolves meet in the middle and erase the photograph outright, and
   * its copy is confined to a max-w-3xl column, so the right half of the frame
   * has nothing to protect. Both numbers move, which is why this is one prop
   * describing what the band is rather than two describing how it looks.
   */
  variant?: "band" | "masthead";
}) {
  const masthead = variant === "masthead";
  const fade = masthead ? "h-10" : "h-24";
  const wash = masthead ? "var(--masthead-scrim)" : "var(--band-scrim)";
  /*
    The masthead gradient holds its ground further across and then drops
    harder. Same job -- protect the copy column -- but it has a narrower column
    to protect and more frame to give back.
  */
  const sweep = masthead
    ? "linear-gradient(to right," +
      " var(--bg) 0%," +
      " color-mix(in srgb, var(--bg) 86%, transparent) 40%," +
      " color-mix(in srgb, var(--bg) 26%, transparent) 100%)"
    : "linear-gradient(to right," +
      " var(--bg) 0%," +
      " color-mix(in srgb, var(--bg) 82%, transparent) 46%," +
      " color-mix(in srgb, var(--bg) 42%, transparent) 100%)";

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
        style={{ objectPosition: position, filter: "var(--plate-filter)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `color-mix(in srgb, var(--bg) ${wash}, transparent)` }}
      />
      <div className="absolute inset-0" style={{ background: sweep }} />
      {/* Dissolve into the section hairlines above and below. */}
      <div
        className={`absolute inset-x-0 top-0 ${fade}`}
        style={{ background: "linear-gradient(to bottom, var(--bg), transparent)" }}
      />
      <div
        className={`absolute inset-x-0 bottom-0 ${fade}`}
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </div>
  );
}

/**
 * Background plates for the hero.
 *
 * These are decorative: they sit behind the headline as texture, and the copy
 * above them carries the whole message. That is why they are aria-hidden and
 * carry no alt text -- a screen reader announcing four photo descriptions
 * before the h1 would be noise, not information.
 *
 * These are licensed stock photographs under the Pexels licence (free for
 * commercial use, no attribution required -- credited in HERO-IMAGES.md
 * anyway). Deliberately NOT AI-generated: synthetic people on a finance site
 * would carry provenance marks and a disclosure obligation these do not.
 *
 * TO REPLACE  (see HERO-IMAGES.md for art direction)
 * --------------------------------
 * 1. Drop licensed files into `public/hero/`. Landscape, 2000px wide or more.
 * 2. List them below. Order is the order they cycle in.
 * 3. Delete any placeholder that is left over.
 *
 * Emptying this array is safe: the hero then renders exactly as it did before
 * the backdrop existed, so a missing-photo state is never a broken page.
 *
 * What to shoot for: the subject should sit toward the RIGHT of the frame or
 * be a wide environment. The headline occupies the left half on desktop, and
 * the scrim is heaviest there, so a face placed left gets buried.
 */
export type HeroImage = {
  /** Path under public/. */
  src: string;
  /** Not rendered. Here so the set is documented and reviewable in code. */
  describes: string;
};

export const HERO_IMAGES: readonly HeroImage[] = [
  { src: "/hero/hero-01.jpg", describes: "Working at a laptop at home (Pexels 4307853, mirrored)" },
  { src: "/hero/hero-02.jpg", describes: "Couple reviewing the month together (Pexels 4307939)" },
  { src: "/hero/hero-03.jpg", describes: "Advisor call from the office (Pexels 7580835)" },
  { src: "/hero/hero-04.jpg", describes: "Paying by phone (Pexels 6331260)" },
] as const;

/** How long each plate holds before crossfading to the next. */
export const HERO_INTERVAL_MS = 6000;
/** Length of the crossfade itself. Must match the CSS duration. */
export const HERO_FADE_MS = 1400;

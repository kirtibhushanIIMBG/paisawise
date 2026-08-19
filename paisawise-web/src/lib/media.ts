/**
 * Motion and still plates used by the large rounded panels.
 *
 * These are the open-source assets from the Halo reference. They are
 * decorative: every panel that carries one reads identically with it removed,
 * which is why they are aria-hidden and carry no alt text.
 *
 * All three are remote. That is a deliberate trade — they are large, they are
 * below or at the fold, and none of them block first paint — but it does mean
 * a panel is only as reliable as the CDN. Each one therefore sits on a solid
 * `--panel-alt` ground, so a plate that never arrives leaves a plain card
 * rather than a hole.
 */

export const MEDIA = {
  /** Coins settling into a field of flowers. Carries the home hero. */
  heroLoop:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4",
  /** A bank facade in the same palette. Carries the use-case panel. */
  institutionLoop:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4",
  /** Still plate for the wide feature card. */
  growthStill:
    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85",
} as const;

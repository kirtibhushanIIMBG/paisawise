# Photography

Every photograph on the site: where it came from, what it is licensed under, and
what had to be measured to make it usable.

## Hero backdrop plates

Four licensed stock photographs, cycled behind the hero headline.

## Sources and licence

All four are from [Pexels](https://www.pexels.com) under the [Pexels licence](https://www.pexels.com/license/):
free for commercial use, modification allowed, no attribution required. Credited
here anyway because knowing where an asset came from is worth more than the
licence strictly demands.

| Plate | Pexels ID | Scene | Note |
|---|---|---|---|
| `hero-01.jpg` | [4307853](https://www.pexels.com/photo/4307853/) | Working at a laptop at home | mirrored horizontally |
| `hero-02.jpg` | [4307939](https://www.pexels.com/photo/4307939/) | Couple reviewing the month together | |
| `hero-03.jpg` | [7580835](https://www.pexels.com/photo/7580835/) | Advisor call from the office | |
| `hero-04.jpg` | [6331260](https://www.pexels.com/photo/6331260/) | Paying by phone | |

All are cropped to 16:9 and resized to 2000x1125, progressive JPEG, under 250 KB each.

## Product-section plates

Four more, one per step of the pinned product reveal, cycled with the phone
screen. Same Pexels licence.

| Plate | Pexels ID | Step it belongs to | Note |
|---|---|---|---|
| `product-01.jpg` | [8837784](https://www.pexels.com/photo/8837784/) | Everything in one view | mirrored horizontally |
| `product-02.jpg` | [7351633](https://www.pexels.com/photo/7351633/) | A budget from your own history | |
| `product-03.jpg` | [4427852](https://www.pexels.com/photo/4427852/) | Alerts while it still matters | |
| `product-04.jpg` | [6937665](https://www.pexels.com/photo/6937665/) | A certified advisor, every month | |

These are 4:5 portrait at 900x1125 and about 100 KB each -- an order of
magnitude smaller than the hero plates, because the card they sit in is never
wider than roughly 420 CSS px even on a 2x display. All four are mounted at
once and crossfaded by opacity, so all four load; keeping them small is what
makes that affordable.

**Every one is cropped with its subject in the left half.** The phone stands on
the right of the plate, so a centred subject gets its face covered. Two of the
four were re-cropped for exactly this reason, and one was swapped outright.
Rejected along the way: several otherwise good frames of budget planning that
had US dollar bills in shot, which is not a small thing on a page priced in
rupees.

The manifest is `PLATES` at the top of
`src/components/sections/PhoneShowcase.tsx`.

## Why stock and not AI

An earlier pass generated these with Gemini. Those images carried Google's visible
sparkle mark and invisible SynthID, both of which exist to disclose that the
people in them are synthetic. Stripping that from photographs of people who do
not exist, on a page presenting a financial product, is the thing the mark is
there to prevent -- and it would not have worked, since SynthID survives cropping
and re-compression.

Licensed photographs of real people avoid the question entirely, and came in at
2000px instead of the 1024px cap on the Gemini web UI.

## Page mastheads and blog covers

Fifteen more, from [Unsplash](https://unsplash.com) under the
[Unsplash licence](https://unsplash.com/license): free for commercial use, no
permission needed, no attribution required. Credited here for the same reason
the Pexels plates are.

Pexels was down when these were sourced -- a 522 from its own origin, with the
image CDN unreachable as well -- so the second half of the library comes from a
different provider. Practically the two licences are the same; the difference
that matters is only that these files are documented in a separate table.

### Mastheads (1800x750)

| File | Unsplash ID | Page |
|---|---|---|
| `page-features.jpg` | `photo-1515965885361-f1e0095517ea` | /features |
| `page-how.jpg` | `photo-1684134618795-4b5146cd33f0` | /how-it-works |
| `page-pricing.jpg` | `photo-1706169582307-8ae586631e8a` | /pricing |
| `page-start.jpg` | `photo-1587725835427-a9ff8e559dc3` | /get-started |
| `page-demo.jpg` | `photo-1575318634028-6a0cfcb60c59` | /demo |
| `page-about.jpg` | `photo-1577962917302-cd874c4e31d2` | /about |
| `page-faq.jpg` | `photo-1713947506827-c646da3ad1db` | /faq |
| `page-contact.jpg` | `photo-1760024354746-85e3b40f2e83` | /contact |
| `page-blog.jpg` | `photo-1761323612470-b8de857169e1` | /blog |
| `page-legal.jpg` | `photo-1579445505461-acecf2596190` | /terms and /privacy |
| `section-rm.jpg` | `photo-1577415124269-fc1140a69e91` | the relationship-manager card on /contact |

### Blog covers (1600x900)

One per post, on the index card and again as the post masthead. The manifest is
the `cover` field on each entry in `src/lib/blog.ts`.

| File | Unsplash ID | Post |
|---|---|---|
| `post-spending.jpg` | `photo-1695294504320-6da4e3fb9ae7` | Where your salary goes in the first ten days |
| `post-budget.jpg` | `photo-1762427354397-854a52e0ded7` | 50-30-20 rarely survives an Indian salary slip |
| `post-sip.jpg` | `photo-1560221328-12fe60f83ab8` | SIP without the jargon |
| `post-emergency.jpg` | `photo-1565373679580-fc0cb538f49c` | How much emergency fund is enough |

### Feature thumbnails (560x410)

`feature-*.jpg` are re-crops of plates already listed above, not new sources.
They exist because the box on /features is 240x176 and the shared files put
689 KB on the page to paint 197 KB of pixels.

## Two things that were measured, not guessed

**A masthead cannot take a body band's scrim.** `--band-scrim` is 88% in light,
which is right behind full-width copy and wrong behind a page title. Rendered
with the plate on and again with it hidden, the /pricing masthead reached the
screen at a mean delta of **0.66 out of 255** -- below the film grain, which is
deliberately subliminal. `--masthead-scrim` is 72% light / 60% dark, and the
same measurement now reads 9.17. Every masthead sits between 6 and 15.

**Two of the first picks were unusable at any scrim.** The original /pricing and
/terms images were high-key flatlays; mixing a near-white photograph toward a
near-white ground leaves nothing behind, whatever the percentage. They were
replaced with frames that have tonal range rather than tuned around.

## Replacing them

1. Drop new files into `public/hero/`. Landscape, 2000px wide or more.
2. List them in `src/lib/hero-images.ts` -- that file is the manifest, and the
   order there is the order they cycle in.

Emptying the manifest array is safe: the hero then renders exactly as it did
before the backdrop existed.

## Art direction

- **Subject to the right, or a wide environment.** The scrim is an ellipse over
  the left copy column, so a face placed left gets buried. Plate 1 is mirrored
  for exactly this reason.
- **Low contrast, muted.** These sit behind display type. A busy or bright frame
  fights the copy even through the scrim.
- **Re-measure after changing them.** The scrim tokens (`--hero-scrim-core`,
  `--hero-scrim-mid`, `--hero-scrim-outer`, `--fade-end` in `globals.css`) are
  tuned against these specific plates. Brighter photography needs a stronger
  core in dark mode -- that is not hypothetical, it happened once already.
- **Keep them under ~250 KB each.** Only the first is eager-loaded.

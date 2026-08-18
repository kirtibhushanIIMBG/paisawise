# Hero backdrop plates

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

## Why stock and not AI

An earlier pass generated these with Gemini. Those images carried Google's visible
sparkle mark and invisible SynthID, both of which exist to disclose that the
people in them are synthetic. Stripping that from photographs of people who do
not exist, on a page presenting a financial product, is the thing the mark is
there to prevent -- and it would not have worked, since SynthID survives cropping
and re-compression.

Licensed photographs of real people avoid the question entirely, and came in at
2000px instead of the 1024px cap on the Gemini web UI.

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

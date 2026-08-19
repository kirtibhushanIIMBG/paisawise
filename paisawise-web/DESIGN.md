# PaisaWise design system

The site is built from **large rounded plates laid on a quiet field**. Structure
comes from those plates and the whitespace between them — not from rules,
borders, or a hairline grid.

Gold is the theme. It fills the primary pill, carries eyebrows and marks, and
drives the charts.

## The two themes

Both are real. Light is the default, and ships on the bare `<html>` tag so it
survives JavaScript being off; the inline script in `layout.tsx` only ever
*adds* `dark`, so there is no flash in either direction.

|            | Light                | Dark                 |
| ---------- | -------------------- | -------------------- |
| Field      | `#f5f5f5`            | `#09090b`            |
| Ink        | `#171526`            | `#ffffff`            |
| Plate card | `#171526`            | `#1f1b33` (lifts)    |
| Pill       | gold, ink label      | gold, ink label      |

The pill stays gold in both. It is the brand mark as much as it is a control.

## Tokens

Three layers, in `src/app/globals.css`:

1. `@theme` — raw palette. Never referenced by a component directly.
2. `:root` / `.dark` — the semantic layer (`--bg`, `--fg`, `--copy`, `--accent`,
   `--action`, `--ink-card`, …). This is the only place a raw colour is bound.
3. `@theme inline` — exposes the semantic layer to Tailwind as `bg-bg`,
   `text-copy`, `bg-action`, and so on.

Components use layer 3. If you find yourself writing a hex value in a `.tsx`
file, the token is missing.

### Copy on plates is its own pair of tokens

`--plate-fg` / `--plate-copy` exist because the media clips are pale in **both**
themes. Light can reuse its ink steps unchanged; dark cannot reuse its greys.
Measured on the hero plate:

| Theme | Token used   | Ratio     |
| ----- | ------------ | --------- |
| dark  | `--copy`     | 2.51:1 ✗  |
| dark  | `--plate-copy` | 5.02:1 ✓ |

`--plate-wash` is larger in dark (68%) than in light (30%) for the same reason —
the wash has to work harder to put white on a pale video than to put ink on it.

A **photograph** needs far more than a clip does: the clips are uniformly pale,
while a photograph puts bright faces and windows exactly where a line of body
copy lands. So `MediaPanel` takes `scrim="strong"` (used by every photographic
masthead), which holds the ground almost solid across the copy column and then
releases so the right of the frame still shows the picture.

Judge these by the **worst decile** of the background behind the text, not the
median — the median hid a lede sitting at 2.38:1 over the bright half of a
photograph while reporting a comfortable 4.59:1 overall.

## The gold tint

The stock clips ship lavender — measured across the hero plate, 87% of the
saturated pixels sit between 230° and 270°. `--media-gold` rotates them onto
the brand.

`hue-rotate(155deg)` is measured, not guessed: CSS `hue-rotate` is a linear
matrix approximation rather than a true HSL rotation, so input and output
angles do not agree. Sampling the rendered frame at each step:

| filter | resulting hue | reads as |
| ------ | ------------- | -------- |
| 130deg | 20° | peach |
| 145deg | 30° | amber |
| **155deg** | **40°** | **gold** — `#e0a020` is 38.6° |
| 165deg | 50° | yellow-green |
| 175deg | 60° | olive |

It is a **prop on the plate** (`gold`), never a blanket filter. The same
rotation over a photograph of a person turns skin green, so the content pages
carrying real photography must not receive it.

## Motion: two families, kept apart

**Filmed plates** (`MediaPanel` + `src/lib/media.ts`) carry the landing page —
the hero, and the advisor panel. Remote clips, so every plate sits on a solid
`--panel-alt` ground: a clip that never arrives leaves a plain card, not a hole.

**Drawn plates** (`AnimatedPlate`) carry the product and system pages. Four
variants, inline SVG, animating transform and opacity only:

| Variant | What it is                    | Used for                       |
| ------- | ----------------------------- | ------------------------------ |
| `orbit` | concentric rings, echoes the mark | product reveal, legal, goals |
| `flow`  | packets running a rail        | account sync, how-it-works     |
| `bars`  | a breathing bar chart         | budgeting, pricing             |
| `pulse` | a ring leaving the centre     | alerts, get-started            |

The two families never share an asset. That is deliberate: the landing page and
the product pages should read as related, not as a repeat.

Both stop under `prefers-reduced-motion`. The `flow` packets *hide* rather than
freeze — stopped, a packet parks at the start of its rail and reads as a stray
dash rather than as motion turned off.

## Components

| Component      | Role                                                     |
| -------------- | -------------------------------------------------------- |
| `Button`       | the pill. `arrow` adds the circle; the asymmetric padding only makes sense with it, so it is a prop rather than a call-site assembly |
| `Card`         | `panel` (white), `ink` (the dark slab), `cell`, `glass`   |
| `Section`      | a padded band of the field                                |
| `MediaPanel`   | rounded plate carrying a video or still, copy over it     |
| `AnimatedPlate`| rounded plate carrying a drawn animation                  |
| `PageMasthead` | the top plate of every route below home                   |
| `Marquee`      | infinite loop; track renders twice, translates 0 → −50%   |

`PageMasthead` decides copy colour from the plate — photo gets ink over a scrim,
drawn gets white on the slab — so the two can never disagree. That decision used
to be made by hand on each page, and drifted.

## Type

Inter Tight carries headings, Inter carries body and every numeral (`.num`, for
tabular figures). Headings are `font-medium` (500/600) at most — never bolder —
with `-0.03em` tracking, `-0.04em` on `h1`. That negative tracking is what makes
the face read as intended; it is set in `@layer base`, not per component.

> The reference calls for TT Norms Pro, which is commercial. Inter Tight is the
> closest free equivalent and holds its shape at this tracking.

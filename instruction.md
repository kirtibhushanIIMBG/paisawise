# Instruction: Refine the PaisaWise Sales Pitch Deck

You are refining a sales pitch deck for a Sales & Business Development course activity.
Work through the steps in order. Do not skip Step 1 — everything downstream depends on it.

---

## Mission

Turn `PaisaWise_Pitch_Deck (1).pptx` into a deck that wins a **5-minute, 3-person sales pitch**.

### Hard constraints

| Constraint | Value |
|---|---|
| Slide count | **exactly 5** — no more, no fewer |
| Runtime | 5 minutes (300s), speaker notes must total 290–300s |
| Presenters | **3 pitchers**, each with named slides and a scripted hand-off |
| Aspect | 16:9, 13.333″ × 7.5″ |
| Fonts | **Aptos family only** (Black / SemiBold / Regular / Light) — modern, and ships with Office on Mac + Windows so it survives being opened on another machine. Do **not** use Calibri or Cambria; they date the deck. |
| Build method | **python-pptx directly.** Do **not** author HTML and convert it. |
| Factual grounding | Every claim traces to `1.jpeg` or `2.jpeg`. The single exception is the payback block on slide 4, which must carry a visible *illustrative scenario* label. |
| Output | new file `PaisaWise_Pitch_Deck_v2.pptx` — leave the original untouched |

---

## Step 1 — Read the two source images

Read both with the Read tool before doing anything else.

**`1.jpeg` — the assignment brief.** Transcribed below as a cross-check; if your reading differs, trust the image.

> **Personal Finance Coaching App — PaisaWise Personal Finance Coach**
> - AI-driven budgeting app that syncs with all linked bank accounts and UPI apps
> - Personalized monthly savings goals generated from the user's actual spending pattern
> - One-on-one virtual coaching call each month with a certified financial advisor
> - Real-time overspending alerts and personalized SIP/mutual fund nudges based on risk profile
> - Price: ₹499/month or ₹4,999/year; ₹999 one-time onboarding fee waived for bank customers
> - Competing product in market: free tracking apps (no live coaching, ad-supported, generic tips)
> - **Buyer:** Salaried professional (25–35) introduced directly by a bank relationship manager after a routine branch visit

**`2.jpeg` — the handwritten go-to-market pre-work.**

> **Lead sources:** (i) bank relationship managers — partnership with banks/corporates; (ii) bank branches — customers visiting the branch; (iii) internet; (iv) LinkedIn — target working professionals
> **Buyer persona:** age 25–35 · salaried · middle to upper-middle income · earns regularly but struggles with budgeting · knows about SIPs but lacks confidence · doesn't know where the money is going
> **Pain points:** (i) poor visibility of spending; (ii) generic financial advice
> **USP:** AI + personalization + human financial advisor
> **Ideal lead:** stable income + multiple financial transactions + wants to save/invest + lacks personalized guidance

Note the two pain points are **two**, not six. The deck must reflect that weighting.

---

## Step 2 — Audit the existing deck

```bash
python3 -c "from pptx import Presentation; ..."   # text + shape geometry
soffice --headless --convert-to pdf --outdir <tmp> "PaisaWise_Pitch_Deck (1).pptx"
pdftoppm -r 90 -png <tmp>/*.pdf slide
```

Then **read the rendered PNGs**. The known baseline defects, already confirmed:

| # | Defect |
|---|---|
| 1 | Cover slide is a logo with no argument — burns ~35s of a 300s pitch |
| 2 | Problem slide flattens 2 core pains into 6 equal-weight cards |
| 3 | All 5 speaker-note slides are empty — fatal for a timed 3-person pitch |
| 4 | No ask / CTA; the deck ends on a tagline |
| 5 | Dead vertical space on slide 4 between y≈5.3″ and y≈6.7″ |
| 6 | ₹499 is stated but never justified against a free competitor |
| 7 | Solution cards have a hollow middle (title pinned top, body pinned bottom) |
| 8 | Cambria/Calibri throughout — dated |

---

## Step 3 — Brand assets

The identity lives in `brand/`. Use it; do not invent a second style.

- `paisawise-logo-horizontal.png` / `-reverse.png` — mark + wordmark + tagline
- `paisawise-logo-stacked.png` / `-reverse.png`
- `paisawise-mark.png` (ink disc) / `-reverse.png` (lighter disc, for dark grounds) / `-nodisc.png`
- `paisawise-mark.svg` and variants — vector sources

**Mark concept:** three ascending coin stacks (1 / 2 / 3 coins) with a trajectory arrow tracing their growth — *paisa* (coins) plus *wise* (guided upward). Coins in violet, arrow in mint, on an ink disc. **Wordmark:** `PaisaWise`, Aptos Black, "Paisa" in ink (white on dark) and "Wise" in violet.

Slide 1 gets the reverse lockup at hero scale; slides 2–5 get the small standard mark for brand persistence.

### Palette (locked)

Indigo-ink and electric violet, with mint reserved for positives. Violet carries the AI story, which is the product's actual differentiator. **No colour outside this table may appear anywhere in the deck** — the previous build drifted into seven off-palette greys.

| Token | Hex | Use |
|---|---|---|
| Ink | `#171526` | cover ground, emphasis bands, headlines |
| Ink 2 | `#241F3D` | raised surface on ink, reverse disc |
| Ink 3 | `#3A3163` | border / divider on ink |
| Surface | `#F6F5FA` | light slide ground (slides 2–5) |
| Card | `#FFFFFF` | cards on surface |
| Card alt | `#FBFAFD` | alternating table row |
| Border | `#E6E3F0` | card border, table header (left) |
| Body | `#5A5474` | body text on light |
| Muted | `#9A94B8` | secondary text, negative-column icons |
| Pale | `#C9C3E4` | body text on ink |
| Violet | `#6C4CF1` | primary accent, eyebrows, pricing band |
| Violet light | `#9B85FF` | accent on ink ground |
| Violet tint | `#EFEAFF` | icon badges, PaisaWise table column |
| Violet tint 2 | `#F5F2FF` | alternating PaisaWise row |
| Mint | `#12B981` | positive only — check marks, the gain figure |

### Type scale

| Role | Font | Size |
|---|---|---|
| Cover hook | Aptos Black | 40–44pt |
| Slide headline | Aptos Black | 26–30pt |
| Card title | Aptos SemiBold | 13–14pt |
| Body | Aptos | 10.5–13pt |
| Eyebrow | Aptos SemiBold, tracked | 11–12pt |
| Micro / footnote | Aptos Light | 8.5–9.5pt |

### Slide rhythm

**Slide 1 is the dark hero cover on ink. Slides 2–5 are all light on surface — identical ground, identical card treatment, identical band treatment.** The body of the deck must read as one continuous system; only the cover is allowed to differ.

Band rule, applied consistently: every emphasis band (quotes on 2 and 4, the USP on 3, the ask on 5) is **ink with white text**. The one exception is the pricing band on slide 5, which is **violet** — the money moment earns the accent.

---

## Step 4 — Slide blueprint

### Slide 1 · HOOK COVER — Pitcher 1, ~20s — dark

The question is the hero, not the logo. Hero PaisaWise lockup, then:

> **You earn well.**
> **But do you know where your money goes?**

("where your money goes?" in violet.) One supporting line, then three chips — AI-Powered · Personalized · Human-Backed — and a footer agenda strip naming what each of the three pitchers covers. Drop the old "Sales Pitch Deck • Digital Finance Coaching Platform" footer; it tells the audience nothing.

### Slide 2 · THE PROBLEM — Pitcher 1, ~80s — dark

- **Left:** buyer-persona card, straight from `2.jpeg` — 25–35, salaried, middle to upper-middle income, regular bank + UPI activity, knows about SIPs but lacks confidence.
- **Right:** the **two** hero pain cards, given real width and a consequence line each:
  1. *Poor visibility of spending* — money moves across several accounts and UPI apps; by month-end there is no single answer to "where did it go?"
  2. *Generic financial advice* — free apps serve identical tips to everyone; nothing accounts for how this person actually spends.
- **Below:** the four secondary pains demoted to small chips — struggles to save · low investing confidence · no time to plan · alerts arrive too late. Nothing is lost; the hierarchy is restored.
- **Band:** *"The problem isn't earning money. It's knowing what to do with it."*

### Slide 3 · THE SOLUTION — Pitcher 2, ~100s — light

`PaisaWise` + the USP line *AI intelligence + Personalization + Human financial guidance*. Six feature cards, 3×2. Rebuild the card interior so icon, title and body form **one tight block** — no hollow middle.

One dashboard · AI-driven budgeting · Personalized savings goals · Real-time overspending alerts · SIP/MF nudges matched to risk · Monthly 1-on-1 certified advisor call.

Close with the USP band.

### Slide 4 · WHY PAISAWISE — Pitcher 3, ~55s — light

Comparison table, **5 rows** (fold "basic expense tracking" into "shows where money went" — same objection):

| Free tracking apps | PaisaWise |
|---|---|
| Shows where money went | Tells you what to do next |
| Generic insights | Personalized to your spending |
| No live coaching | Monthly 1-on-1 advisor call |
| No proactive alerts | Real-time overspending alerts |
| Limited investment guidance | SIP/MF nudges matched to your risk |

Beside it, the **illustrative payback block** — this is what kills the price objection before the price is even named:

```
YOUR COST                        ₹499/month  ≈  ₹16/day
IF PAISAWISE HELPS YOU SAVE
just 5% of a ₹60,000 salary   =  ₹3,000/month
                                 6× what it costs
```

The label *illustrative scenario — not a guarantee* must sit directly beneath it, small and muted. Do not present it as a claim. Finish with one row of benefit chips.

### Slide 5 · THE CLOSE — Pitcher 3, ~45s — dark

- **Ideal lead** (from `2.jpeg`): stable income · multiple financial transactions · wants to save/invest · lacks personalized guidance · willing to pay for professional support.
- **Lead sources:** bank relationship managers (bank/corporate partnerships) · bank branch walk-ins · LinkedIn working professionals · internet/digital · referrals.
- **Pricing band:** ₹499/month · ₹4,999/year · ≈₹16/day · ₹999 onboarding waived for bank customers.
- **The ask** — the deck currently has none, and this is the largest single scoring gap:

> *"You came in through your relationship manager, so your ₹999 onboarding fee is already waived. Shall we set up your first advisor call this week?"*

Grounded entirely in the brief's own scenario. Invent no product terms — no free trial, no discount that isn't in `1.jpeg`.

---

## Step 5 — Speaker notes

Every slide gets notes. This is the largest single improvement over the current deck, which has none.

Each note contains, in order:

1. `PITCHER n · target MM:SS` and a running cumulative time
2. A script written at ~140 wpm that actually fits the budget
3. A **hand-off line** where the speaker changes (end of slide 2, end of slide 3)
4. Slide 5 additionally carries an objection-handling cheat sheet for Q&A:
   - *"Why pay when free apps are available?"* → free apps are ad-supported, generic, and have no live coaching; PaisaWise is the only one with a certified advisor monthly
   - *"Is my bank data safe?"* → read-only sync, bank-grade encryption, no transaction authority
   - *"What if I don't use it?"* → monthly plan, and the advisor call each month is the forcing function
   - *"₹4,999 upfront is a lot"* → ₹499 monthly exists precisely for that; the annual plan saves ~₹1,000

Timing budget: P1 ≈ 100s (slides 1–2) · P2 ≈ 100s (slide 3) · P3 ≈ 100s (slides 4–5).

---

## Step 6 — Build

Use **python-pptx directly**. No HTML intermediate.

- Start from `Presentation()`, set `slide_width = Inches(13.333)`, `slide_height = Inches(7.5)`, and use the blank layout.
- Build every element as a native shape — rounded rectangles for cards, textboxes for copy, lines for rules. Native shapes stay editable in PowerPoint, which matters if the deck needs a last-minute change before presenting.
- Icons: render a small consistent line-icon set (24×24 viewBox, uniform stroke) to transparent PNG via cairosvg, then `add_picture`. Keep one stroke weight across the whole deck.
- Logo: `add_picture` from `brand/`.
- Set speaker notes via `slide.notes_slide.notes_text_frame.text`.
- Grid: 0.60″ margins, 12.13″ usable width. Snap cards to a shared column grid; never eyeball a position that a neighbour already establishes.

---

## Step 7 — Verify

Do not report done until all of these pass.

1. **Structure** — exactly 5 slides; 13.333″ × 7.5″; all 5 notes slides non-empty.
2. **Geometry** — no shape exceeds 7.5″ vertically or 13.333″ horizontally; no two text shapes overlap.
3. **Visual** — convert to PDF, render to PNG, and **read all five images**. Confirm against the Step 2 defect table: hook on slide 1, two hero pains on slide 2, no hollow cards on slide 3, payback block filling slide 4's dead band with its illustrative label, explicit ask on slide 5.
4. **Fonts** — assert no run uses Calibri or Cambria.
5. **Timing** — sum the note timings; must land in 290–300s.
6. **Sourcing** — every factual claim traces to `1.jpeg` or `2.jpeg`; the only unsourced numbers sit inside the labelled payback block.
7. `officecli` lint pass over the output file.

# Instruction: Build the PaisaWise Website

Build a complete, interactive, production-quality marketing and product website for **PaisaWise**, an AI personal-finance coaching app for the Indian market.

Work through the steps in order. Step 1 is not optional; everything downstream depends on it.

---

## 0. Mission and hard constraints

Build it as though it were a real company's website. It is a mock, but nothing about the craft should be.

| Constraint | Value |
|---|---|
| Stack | **Next.js (App Router) + TypeScript + Tailwind v4 + shadcn/ui** |
| Scope | Full site, 13 routes (see §5). Not a landing page. |
| Interactive | Four required builds (see §8). All must work, not be screenshots. |
| Narrative | **PAS-led**, StoryBrand + Cialdini overlay, AIDA CTA ladder (see §4) |
| Brand | Locked. Inherit tokens from the existing deck. Do not invent a new palette. |
| Fonts | Clash Display + Inter. **Read §6.2 before choosing anything else.** |
| Responsive | Mobile-first. Must be correct at 375 / 768 / 1440. |
| Accessibility | WCAG 2.1 AA. Keyboard navigable. `prefers-reduced-motion` honoured. |
| Performance | Lighthouse ≥ 90 on Performance and Accessibility. |
| Honesty | Non-negotiable, see §10. |
| Copy | Banned-pattern list in §7.1 is enforced by a lint step. |

---

## 1. Read the sources first

Four inputs live in this directory. Read them before writing any code.

- **`1.jpeg`**: the product brief
- **`2.jpeg`**: handwritten go-to-market pre-work
- **`instruction.md`**: the pitch-deck spec. **The positioning, persona, USP and objection handling are already settled there. Inherit them. Do not re-invent the product.**
- **`brand/`**: logo lockups and SVG mark
- **`build_deck.py`**: the palette block is the source of truth for colour

Transcribed below as a cross-check. If your reading of the images differs, trust the images.

### From `1.jpeg` (the brief)

> **PaisaWise Personal Finance Coach**
> - AI-driven budgeting app that syncs with all linked bank accounts and UPI apps
> - Personalized monthly savings goals generated from the user's actual spending pattern
> - One-on-one virtual coaching call each month with a certified financial advisor
> - Real-time overspending alerts and personalized SIP/mutual fund nudges based on risk profile
> - Price: **₹499/month or ₹4,999/year; ₹999 one-time onboarding fee waived for bank customers**
> - Competitor: free tracking apps (no live coaching, ad-supported, generic tips)
> - **Buyer:** salaried professional 25–35, introduced by a bank relationship manager after a routine branch visit

### From `2.jpeg` (go-to-market)

> **Lead sources:** bank relationship managers (bank/corporate partnerships) · bank branch walk-ins · internet · LinkedIn (working professionals)
> **Persona:** 25–35 · salaried · middle to upper-middle income · earns regularly but struggles with budgeting · knows about SIPs but lacks confidence · doesn't know where the money goes
> **Pain points:** (i) poor visibility of spending (ii) generic financial advice
> **USP:** AI + personalization + human financial advisor
> **Ideal lead:** stable income + multiple financial transactions + wants to save/invest + lacks personalized guidance

**The two pain points are two, not six.** The site must weight them that way, exactly as the deck does.

---

## 2. Reference teardown

Two sites were researched as anchors. Between them they cover both halves of what PaisaWise is. **Do not visit or reference paisawise.com.**

### Origin Financial (useorigin.com): closest product analog
AI advisor + subscription + personal finance.

| Borrow | Don't borrow |
|---|---|
| Feature sections that each open with a verb phrase (`Simplify your money`, `Grow your money`, `Forecast your future`) | Their palette or logo |
| Every feature block anchored by a **real UI visual**, not an icon | Their `$1 for 1 year` loss-leader offer; our pricing is fixed by the brief |
| One repeated offer line, stated in hero and again at the close | Blog-heavy homepage |
| A single unchanging primary CTA verb across the whole page | |
| Testimonials with star ratings, four across | |

### Jupiter Money (jupiter.money): closest Indian-context analog
Indian neobank. This is where the site learns to feel Indian rather than translated.

| Borrow | Don't borrow |
|---|---|
| ₹ and **lakh/crore** formatting throughout | Their product breadth (cards, loans, insurance) |
| UPI-native language; UPI treated as a first-class account type | Rewards/gamification mechanics |
| Social proof placed immediately under the hero (`Trusted by 30 Lakh+ Indians`) | **Any real bank partner logo or regulator claim**, see §10 |
| A 10-question FAQ accordion doing real objection work | |
| Footer calculator hub | |
| A visible compliance/disclosure block; it is what makes an Indian fintech read as legitimate | |

**Supporting patterns:** subscription-tier presentation from Monarch/Copilot pricing pages (monthly default, annual toggle showing the saving). 2026 fintech design direction: dark mode, bold display type, warmer palettes, mobile-first.

---

## 3. The buyer, in one line

A 25–35 salaried professional who earns well, has money scattered across three or four bank accounts and a couple of UPI apps, cannot say where it went at month end, knows he should be investing, and has nobody personalising the advice. He met PaisaWise through his bank relationship manager.

Write every page to that person. Second person, not third.

---

## 4. Marketing spine

This is the part that makes the site sell rather than merely exist. The section order is **not** a design preference; it is a conversion argument.

**PAS** (Problem → Agitate → Solve) drives the order, because the pitch deck is already PAS-shaped and the two should reinforce each other.
**StoryBrand** casts the visitor as hero and PaisaWise as guide. This is the correction to the usual fintech mistake of making the product the hero.
**Cialdini** justifies the trust, proof and commitment blocks.
**AIDA** governs the CTA ladder: soft CTA high on the page, hard CTA low.

### Homepage section map

| # | Section | PAS / SB7 role | Cialdini | CTA strength |
|---|---|---|---|---|
| 1 | Hero | **P**, name the problem as a question | none | soft: `See where your money goes` |
| 2 | Trust strip | SB7 guide credibility | social proof | none |
| 3 | Cost of inaction | **A**, agitate, quantified | loss aversion | none |
| 4 | Product reveal | **S**, solve; SB7 *guide* | authority | soft |
| 5 | How it works, 3 steps | SB7 *plan* | commitment | medium |
| 6 | Live dashboard demo | Desire, show don't tell | none | medium: `Try the demo` |
| 7 | Payback calculator | Desire, visitor proves value to themselves | consistency | medium |
| 8 | vs free apps | objection handling | none | none |
| 9 | Testimonials | proof | social proof | none |
| 10 | Security & trust | risk reversal | authority | none |
| 11 | Pricing | **Action** | scarcity, honestly framed | hard: `Start with PaisaWise` |
| 12 | FAQ | residual objections | none | none |
| 13 | Final CTA | **Action**, the RM-waiver ask | reciprocity | hard |

**Annotate this in the code.** Every section component opens with a comment naming its role:

```tsx
{/* PAS:AGITATE · Cialdini:loss-aversion · no CTA. Tension must not resolve here */}
```

Also produce **`MARKETING_RATIONALE.md`** alongside the site: the table above, expanded, with a paragraph per section explaining the choice. This is what makes the work defensible in a viva.

### The one CTA rule
Primary CTA verb is **the same everywhere**: `Get started`. Secondary is `Book a call`, which maps to the RM channel from the brief. Never introduce a third primary verb.

---

## 5. Sitemap

| Route | Purpose | Framework weight |
|---|---|---|
| `/` | Long-form homepage, full PAS arc | all |
| `/features` | Six features in depth, one section each | Solve |
| `/how-it-works` | The 3-step plan, expanded | SB7 plan |
| `/pricing` | Plans, payback calculator, pricing FAQ | Action |
| `/demo` | Interactive mock dashboard | Desire |
| `/get-started` | Risk-profile quiz → persona → lead capture | Action |
| `/about` | Story, mission, team | SB7 guide |
| `/faq` | Full objection handling | objections |
| `/contact` | Lead capture, RM channel, branch finder mock | Action |
| `/blog`, `/blog/[slug]` | 3–4 seeded posts. Adds product-site realism. | authority |
| `/privacy`, `/terms` | Real structure, mock content | trust |

Nav: sticky header, Products dropdown, mobile sheet. Footer: five columns plus the §10 disclosure block.

---

## 6. Design system

### 6.1 Colour: locked, inherited from the deck

Copy verbatim from the palette block in `build_deck.py`. Do not adjust.

| Token | Hex | Use |
|---|---|---|
| `ink` | `#171526` | dark ground, headlines |
| `ink-2` | `#241F3D` | raised surface on ink |
| `ink-3` | `#3A3163` | border/divider on ink |
| `surface` | `#F6F5FA` | light page ground |
| `card` | `#FFFFFF` | cards on surface |
| `card-alt` | `#FBFAFD` | alternating rows |
| `border` | `#E6E3F0` | card borders |
| `body` | `#5A5474` | body text on light |
| `muted` | `#9A94B8` | secondary text |
| `pale` | `#C9C3E4` | body text on ink |
| `violet` | `#6C4CF1` | **primary accent** |
| `violet-l` | `#9B85FF` | accent on ink |
| `violet-t` | `#EFEAFF` | accent tint |
| `violet-t2` | `#F5F2FF` | accent tint alt |
| `mint` | `#12B981` | **positives only**: gains, checkmarks, success |

Ship as Tailwind v4 `@theme` CSS variables in `app/globals.css`. Implement dark mode by remapping tokens, not by hard-coding a second palette. Mint is reserved: never use it decoratively.

### 6.2 Typography: verified, do not substitute blindly

Aptos (used in the deck) is a document font and does not belong on the web. The audience is 25–35, so the type should read like a consumer app they already use.

**Glyph coverage was verified with fontTools. These are measured facts, not preferences:**

| Font | ₹ `U+20B9` | `tnum` | Weights | Verdict |
|---|---|---|---|---|
| **Satoshi** | **MISSING** | n/a | n/a | **Rejected.** Would render tofu on every price. |
| **Clash Display** | yes | **no** | 200–700 var | Display only |
| General Sans | yes | no | 200–700 var | Display alternative |
| **Inter** | yes | **yes** | 100–900 var | Body, UI, and all numerals |
| Plus Jakarta Sans | yes | yes | 200–800 var | Single-family fallback |

**Use: Clash Display for headings, Inter for everything else.** Both are free and self-hostable. Clash Display is from Fontshare / Indian Type Foundry, which is a small brand argument worth making for an Indian product.

Two rules that follow directly from the table:

1. **Numbers are always Inter.** Clash Display has no `tnum`, so every ₹ figure, calculator output, chart label and animated counter must be Inter with `font-variant-numeric: tabular-nums`. Set a `.num` utility class and use it everywhere money appears. Without this, counters jitter as they animate and table columns will not align.
2. **Verify before you commit.** If you swap either family, check `U+20B9` and `tnum` first with fontTools or `fc-list`. Do not discover a missing rupee sign at QA.

Load both through `next/font` (`next/font/local` for Clash Display, `next/font/google` for Inter) so they self-host, avoid a third-party runtime request, and produce no layout shift.

Scale: `text-6xl/none` display → `text-4xl` section head → `text-xl` sub → `text-base` body → `text-sm` caption. Tighten display tracking to `-0.02em`.

### 6.3 Logo

Inline the mark as a React SVG component built from `brand/paisawise-mark-nodisc.svg`. It is clean primitive geometry (three violet coin stacks, mint trajectory arrow) and recolours cleanly via `currentColor` on the arrow. Use the PNG lockups in `brand/` only for OG/social images and the favicon.

### 6.4 Components and motion

shadcn/ui: `button card accordion tabs dialog sheet navigation-menu slider badge avatar input form tooltip carousel separator chart`. Pull them via the **shadcn MCP** (`search_items_in_registries`, then `get_add_command_for_items`) rather than hand-writing.

Motion: 150–250 ms UI transitions, `cubic-bezier(0.16, 1, 0.3, 1)`. Scroll work via GSAP ScrollTrigger. Everything wrapped so `prefers-reduced-motion: reduce` disables transforms and shows final state immediately.

---

## 7. Copy

Write like a person who knows the product, not like a brochure.

### 7.1 Banned patterns, enforced by lint

The pitch deck went through a de-slopping pass. Carry the same rules here.

- **No em dashes.** Use periods, commas or colons.
- **No "not X, but Y" antithesis.** It is the most recognisable AI cadence. One instance maximum across the entire site.
- **No abstract adjective triads** (`AI-Powered · Personalized · Human-Backed`). Replace with concrete facts (`Syncs banks + UPI`, `Certified advisor monthly`, `₹499 a month`).
- **Banned words:** `actual`, `actually`, `really`, `seamless`, `empower`, `leverage`, `unlock`, `elevate`, `robust`, `journey`, `revolutionary`, `game-changing`, `cutting-edge`.
- No emoji in UI copy.
- Vary sentence and card lengths. Uniform copy blocks read as generated.

Write `scripts/lint-copy.mjs` that greps the built output for these and exits non-zero on a hit. Run it in verification.

### 7.2 Voice
Second person. Present tense. Indian English. Rupees written `₹1,23,456` (Indian digit grouping: use `Intl.NumberFormat('en-IN')`, never `en-US`). Large counts in lakh where natural.

---

## 8. The four interactive builds

All four must genuinely work. Seed all fake data deterministically in `lib/demo-data.ts` so renders are stable and testable.

### 8.1 Payback calculator
Lives on `/` and `/pricing`.

- Input: monthly salary slider, ₹20,000 → ₹3,00,000, step ₹5,000, default ₹60,000.
- Second input: savings-rate slider, 2% → 15%, default 5%.
- Output: monthly saving, PaisaWise cost (₹499), net gain, and a multiple (`6× what it costs you`).
- Animate the number transitions with a spring counter. Inter + `tabular-nums`.
- Reuse the deck's exact math so the pitch and the site agree: `₹60,000 × 5% = ₹3,000/month vs ₹499 = ~6×`.
- **Must carry a visible `Illustration, not a guarantee.` label.**
- Acceptance: dragging the slider updates all four outputs within one frame; no layout shift as digits change.

### 8.2 Mock dashboard (`/demo`)
The "show, don't tell" moment.

- Category donut (Food, Rent, Transport, Shopping, Bills, Other)
- 30-day spend timeline, area chart
- Budget-progress bars per category, one deliberately over budget
- A live overspending alert card that animates in on load
- Linked-accounts strip: 3 banks + 2 UPI apps, all fictional
- Month switcher that swaps datasets

Use Recharts via shadcn `chart`. **Load the `dataviz` skill before writing any chart code.** Colour, axis and legend rules come from there, not from Recharts defaults. Charts must be readable in both themes and must not rely on colour alone.

Acceptance: all charts render at 375px wide without overflow; the over-budget category is visually distinct without using red/green alone.

### 8.3 Risk-profile quiz (`/get-started`)
Mirrors the real onboarding and captures lead intent.

- 4 questions: monthly income band, savings today, investing experience, primary goal.
- One question per screen, progress bar, back navigation, keyboard operable.
- Output: a persona card (`The Steady Earner`), a suggested SIP nudge, and a soft lead-capture form.
- Persist answers in `sessionStorage` so a refresh does not lose progress.
- Acceptance: completable by keyboard alone; result is deterministic for a given answer set.

### 8.4 Scroll storytelling
GSAP ScrollTrigger. Load `gsap-skills:gsap-scrolltrigger` and `gsap-skills:gsap-react` before writing it. Use the `useGSAP` hook and proper cleanup, not raw `useEffect`.

- Pinned phone mockup on the product-reveal section, cycling through app screens as the user scrolls
- Counter reveals on the trust strip
- Staggered fade-and-rise on section entry, 60ms stagger
- A progress rail on `/how-it-works`

Acceptance: 60fps on a mid-range laptop; every animation disabled under `prefers-reduced-motion`; no ScrollTrigger instance leaks on route change.

---

## 9. Build order and which skill to use when

Do not skip the skill loads. Each one carries rules you will otherwise get wrong.

| Phase | Do | Skill / tool |
|---|---|---|
| 1 | Scaffold Next.js + Tailwind v4 + TS, wire tokens and fonts | none |
| 2 | Information architecture, UX patterns, copy formulas | `ui-ux-pro-max` |
| 3 | Visual direction, avoid templated defaults | `frontend-design` |
| 4 | Pull real components | **shadcn MCP** |
| 5 | Charts, **before** any chart code | `dataviz` |
| 6 | Scroll work | `gsap-skills:gsap-scrolltrigger`, `gsap-react` |
| 7 | Micro-interactions | `motion-dev-animations` |
| 8 | Functional QA, screenshots, flows | `webapp-testing` |
| 9 | Core Web Vitals, Lighthouse | `web-perf` |

`21st` MCP is available for generating a component shadcn does not cover. **No third-party skill installation is needed. The local arsenal already covers this brief.** Do not install unvetted skills from a marketplace to fill a gap you have not confirmed exists.

Suggested structure:

```
app/(marketing)/…      route groups for marketing pages
app/demo/              dashboard
app/get-started/       quiz
components/sections/   one file per homepage section, each annotated per §4
components/ui/         shadcn
components/brand/      Logo, Mark
lib/demo-data.ts       seeded fake data
lib/format.ts          Intl.NumberFormat('en-IN') helpers
scripts/lint-copy.mjs
MARKETING_RATIONALE.md
```

---

## 10. Honesty constraints, non-negotiable

PaisaWise is a fictional product built for a college assignment. A fintech site is precisely the kind of thing that does harm when faked convincingly. Build it to look professional; do not build it to deceive.

- **Persistent footer line**, present on every route: *"PaisaWise is a fictional product created for an academic project. It is not a real financial service and does not offer real financial advice."*
- **No invented regulatory identifiers.** No RBI, SEBI, AMFI, DICGC or IRDAI registration numbers. No "regulated by" claims.
- **No real bank, partner or press logos.** If a trust strip needs logos, use clearly fictional names.
- **Testimonials must be visibly labelled illustrative** and use invented names. Never present a fabricated quote as a real customer's.
- **Every ₹ figure** either traces to `1.jpeg` or sits behind an "Illustration" label. The only real numbers are ₹499, ₹4,999 and ₹999.
- **Forms are inert.** No real credential or payment collection, no live payment integration. Submitting shows a mock confirmation.
- No fake user counts presented as fact. If the design wants social proof volume, label it as illustrative.

These are not optional polish. If a section cannot work without breaking one of them, redesign the section.

---

## 11. Verification

Do not report done until every item passes.

1. `npm run build` succeeds with no type errors.
2. All 13 routes render; no console errors.
3. **Playwright (`webapp-testing`)** walks all three interactive flows: drag the calculator and assert outputs change; load `/demo` and assert every chart renders; complete the quiz by keyboard and assert the result card.
4. Screenshots at 375 / 768 / 1440 for every route; no horizontal scroll at any width.
5. Lighthouse ≥ 90 Performance and Accessibility on `/` and `/pricing` (`web-perf`).
6. `prefers-reduced-motion: reduce` disables all motion and content is fully visible.
7. Full keyboard pass: visible focus rings, no traps, logical tab order.
8. `node scripts/lint-copy.mjs` exits 0: zero em dashes, zero banned words.
9. Colour tokens diffed against the palette block in `build_deck.py`; they must match exactly.
10. Every §10 honesty constraint confirmed present, especially the footer disclaimer on all 13 routes.
11. `MARKETING_RATIONALE.md` covers every section in the §4 table.

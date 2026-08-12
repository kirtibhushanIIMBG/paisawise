# Marketing rationale

Why the PaisaWise site is ordered the way it is. Every section on the homepage
serves a named role, and this document is the defence of each choice.

## Why PAS leads

Four frameworks are in play. They are not alternatives, they operate at
different levels.

| Framework | What it governs here |
|---|---|
| **PAS** (Problem, Agitate, Solve) | The order of the homepage sections |
| **StoryBrand SB7** | Who the hero is, and what role the brand plays |
| **Cialdini** | Why the trust, proof and commitment blocks exist at all |
| **AIDA** | The strength of the call to action at each scroll depth |

PAS leads rather than AIDA because the audience arrives **problem-aware but
solution-unaware**. The brief states the buyer is introduced by a bank
relationship manager after a branch visit, so they already know they have a
money problem. They do not know a product like this exists. AIDA spends its
first stage manufacturing attention, which is wasted on someone already
worried about their spending. PAS opens by naming the problem they walked in
with, which earns the right to the rest of the page.

The pitch deck for this product is already PAS-shaped. Using the same spine on
the site means a prospect who sees the pitch and then visits the site meets one
argument twice rather than two arguments once.

## StoryBrand: the customer is the hero

The standard fintech mistake is making the product the hero: "PaisaWise is an
award-winning AI platform." SB7 inverts this. The visitor is the hero with a
problem; the brand is the **guide** with a plan.

This shows up concretely:

- The H1 is a question about **the visitor's** money, not a product claim.
- The product-reveal heading is *"You do not need more willpower. You need the
  month in front of you"*, which addresses the visitor's self-blame rather than
  listing features.
- Section 5 is literally the SB7 *plan*: three steps, fifteen minutes. A plan
  reduces the perceived risk of the transaction.
- The failure state is implied rather than screamed. The agitate section
  describes what continues to happen if nothing changes, without catastrophising.

## Section-by-section

| # | Section | PAS / SB7 | Cialdini | CTA |
|---|---|---|---|---|
| 1 | Hero | **Problem**, framed as a question | none | soft |
| 2 | Trust strip | SB7 guide credibility | social proof | none |
| 3 | Two problems | **Agitate** | loss aversion | none |
| 4 | Product reveal (pinned) | **Solve**, SB7 guide | authority | soft |
| 5 | How it works | SB7 plan | commitment | medium |
| 6 | Demo teaser | Desire | none | medium |
| 7 | Payback calculator | Desire | consistency | medium |
| 8 | Versus free apps | Objection handling | none | none |
| 9 | Testimonials | Proof | social proof | none |
| 10 | Security | Risk reversal | authority | none |
| 11 | Pricing | **Action** | scarcity, honest | hard |
| 12 | FAQ | Residual objections | none | none |
| 13 | Final CTA | **Action** | reciprocity | hard |

Each section component in `src/components/sections/` and `src/app/page.tsx`
opens with a comment naming its role, so the code and this document cannot
drift apart.

### 1. Hero, and why the CTA is deliberately weak

*"You earn well. So where does it all go?"*

A question, not a claim. It states the problem in the visitor's own words and
makes no assertion the visitor can dispute. The chips beneath are three
**concrete facts** (syncs banks and UPI, certified advisor monthly, ₹499 a
month), not adjectives. An earlier draft used *AI-Powered, Personalized,
Human-Backed*, which is three abstractions that survive no scrutiny and read as
generated. Concrete beats abstract at the top of a page where trust is lowest.

The primary CTA here is soft on purpose. Asking for the sale before stating the
problem is the most common landing-page error. AIDA's *action* stage belongs at
section 11, after desire has been built.

### 3. Agitate, with no escape hatch

The agitate section carries **no CTA**. This is deliberate and is the section
most often got wrong. Tension has to sit unresolved for a moment; offering the
solution in the same breath collapses the discomfort that motivates the scroll.

There are exactly **two** problems, because the source research named two:
poor visibility of spending, and generic financial advice. An earlier version
of the pitch deck diluted these into six equal-weight cards, which flattened the
hierarchy. The four secondary complaints appear as small chips below, explicitly
framed as downstream of the two above.

Cialdini's **loss aversion** operates through framing: the copy describes money
already leaving, not money that could be gained. Losses are felt roughly twice
as strongly as equivalent gains.

### 7. The calculator, and why it converts

This is the highest-leverage element on the page, for a reason worth stating
plainly: **the visitor produces the argument themselves.**

Cialdini's **commitment and consistency** principle holds that people act in
line with conclusions they reached on their own far more reliably than with
conclusions handed to them. A static claim of "6× return" is a claim to be
doubted. A slider the visitor drags to their own salary produces a number they
computed, and people rarely argue with their own arithmetic.

It also handles the price objection *before* the price section, so by the time
₹499 appears at section 11 it has already been contextualised as roughly
₹16 a day against a modelled saving.

The block carries a visible *Illustration, not a guarantee* label. This is an
honesty requirement, and it costs less credibility than it saves. An unlabelled
projection on a finance site invites scepticism about everything else.

### 8. Objection handling before proof

The comparison table answers the single question the buyer is really holding:
*there is a free app on my phone, why pay?* The brief names the competitor as
free, ad-supported tracking apps with no live coaching, so the table is a direct
response to a named competitor rather than a straw man.

The closing line does the real work: *"Free apps are ad-supported: they earn
when you scroll. PaisaWise earns only when you renew."* This reframes the
comparison from price to **incentive alignment**, which is a stronger argument
than any feature row above it.

### 9 and 10. Proof, then risk reversal

Social proof is placed **after** the argument, not before. Testimonials shown to
someone who does not yet understand the product are decoration. Shown to someone
who has just done the payback arithmetic, they answer "does this work for people
like me?"

All testimonials are visibly labelled as illustrative. Fabricated proof
presented as real is both dishonest and, in a graded academic context, a needless
risk.

The security section is **risk reversal**: it removes the last reason to say no
before the price appears. *"We can see your money. We can never move it."*

### 11. Pricing, and honest scarcity

One plan, two billing periods. No tier gates the advisor call, because the
advisor is the differentiator and hiding it behind a premium tier would
undermine the entire positioning.

Cialdini's **scarcity** appears only in its honest form: the ₹999 onboarding
waiver for bank-relationship-manager referrals. That is a real term from the
brief, not a fake countdown timer. Manufactured urgency on a financial product
damages trust more than it accelerates a decision.

### 13. The close, and reciprocity

*"You came in through your relationship manager, so the ₹999 onboarding fee is
waived. Shall we book your first advisor call this week?"*

This is the pitch deck's closing ask, reused verbatim. It works through
**reciprocity**: something has already been given (the waiver), which creates
mild obligation. It is also specific. "Get in touch" is not a close; "shall we
book your first advisor call this week" names the next action and a timeframe.

## The one-CTA rule

Two verbs across the entire site: **Get started** (primary) and **Book a call**
(secondary, mapping to the relationship-manager channel from the brief). No
third verb is introduced on any route.

Every additional CTA verb splits attention and forces a decision the visitor did
not ask to make. One primary action, repeated, compounds.

## Copy constraints

The site is written to avoid the patterns that make marketing copy read as
machine-generated: no em dashes, no "not X, but Y" antithesis, no abstract
adjective triads, and a banned list of filler words. These are enforced
mechanically by `scripts/lint-copy.mjs`, which fails the build if any appear.

The reasoning is commercial rather than stylistic. Copy that reads as generated
signals that nobody at the company cared enough to write it, which is a poor
opening argument for a product asking to be trusted with your bank data.

## What the site deliberately does not do

- **No fake urgency.** No countdown timers, no "only 3 spots left".
- **No invented social proof at scale.** No "trusted by 50,000 Indians", because
  it is not true and the claim is checkable.
- **No regulatory theatre.** No invented RBI or SEBI registration numbers, no
  bank partner logos. A fintech site that fakes these convincingly is the exact
  thing that causes harm.
- **No dark patterns.** The cancel terms are stated on the pricing page rather
  than buried in the FAQ.

Every one of these would measurably lift a conversion rate in the short term.
All of them are excluded because the product is fictional and the site must not
function as a real financial service.

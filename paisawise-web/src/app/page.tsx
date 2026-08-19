import Link from "next/link";
import { Check, X, Star, ShieldCheck, Lock, BadgeCheck, XCircle } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { PhoneShowcase } from "@/components/sections/PhoneShowcase";
import { PaybackCalculator } from "@/components/interactive/PaybackCalculator";
import { MediaPanel } from "@/components/sections/MediaPanel";
import { Marquee, BANK_BRANDS, CREDENTIAL_BRANDS } from "@/components/sections/Marquee";
import { Reveal, Counter } from "@/components/motion/Reveal";
import {
  ScatteredAccounts,
  GenericAdvice,
  DashboardPreview,
} from "@/components/graphics/Illustrations";
import { Button, Card, Section, SectionHead, Badge } from "@/components/ui/primitives";
import { MEDIA } from "@/lib/media";
import { withLogos } from "@/lib/logos";
import {
  COMPARISON,
  FAQS,
  HOW_IT_WORKS,
  PRICE,
  TESTIMONIALS,
  TRUST_POINTS,
} from "@/lib/site";
import { rupees, rupeesExact } from "@/lib/format";

export default function Home() {
  return (
    <>
      {/* 1 · PAS:PROBLEM — the question is the hero */}
      <Hero />

      {/* 2 · The rails the product runs on. This sat inside the hero plate to
             begin with, which is where the reference puts it — but the lower
             third of that video is a dense field of flowers, and grey wordmarks
             laid over it measured under 2:1. It reads here, and the hero keeps
             its own copy uncrowded. */}
      <Section className="pb-2 pt-10 md:pb-4 md:pt-12">
        <p className="mb-5 text-sm text-dim">
          Reads every account and UPI app you already use
        </p>
        <Marquee items={withLogos(BANK_BRANDS)} duration="22s" itemClassName="mx-8 text-copy" />
      </Section>

      {/* 3 · Cialdini:social-proof — guide credibility, immediately after the
             hook. Four plates on the field rather than the old hairline cells:
             this design carries structure with plates and whitespace. */}
      <Section className="py-14 md:py-16">
        <Reveal
          selector="[data-stat]"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { to: 4, suffix: "", label: "Accounts linked on average" },
            { to: 12, suffix: " months", label: "Of history read on day one" },
            { to: 1, suffix: " call", label: "With a certified advisor, monthly" },
            { to: PRICE.monthly, prefix: "₹", label: "A month, cancel anytime" },
          ].map((s) => (
            <div
              key={s.label}
              data-stat
              className="rounded-2xl border border-edge bg-panel px-7 py-8"
            >
              <div className="num text-[clamp(1.7rem,3.4vw,2.4rem)] font-medium leading-none tracking-[-0.03em] text-fg">
                {s.prefix}
                <Counter to={s.to} />
                {s.suffix}
              </div>
              <p className="mt-2.5 text-sm leading-snug text-copy">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* 4 · The signature two-column open, then the plate grid underneath.
             Heading and its action on the left, the claim on the right at
             display size — the reference's "Meet USD Halo." block. */}
      <Section>
        <Reveal className="mb-14 grid items-start gap-12 md:mb-16 md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-medium text-fg">
              Meet PaisaWise.
            </h2>
            <div className="mt-8">
              <Button href="/features" arrow>
                Discover it
              </Button>
            </div>
          </div>
          <p className="text-2xl leading-relaxed text-copy md:text-3xl">
            An AI budgeting app that reads every account you own and puts a
            certified financial advisor on a call with you every month.
          </p>
        </Reveal>

        <Reveal
          selector="[data-plate]"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* The wide plate carries the still; the two plum cards break up a
              row that would otherwise be four pale boxes. */}
          <MediaPanel
            data-plate
            image={MEDIA.growthStill}
            gold
            rounded="rounded-2xl"
            className="flex min-h-80 flex-col justify-between p-7 sm:col-span-2"
          >
            <h3 className="text-2xl font-medium leading-snug text-ink">
              Savings that compound
            </h3>
            <p className="max-w-xs text-base text-ink/70">
              A target set from what you actually earn and spend, recalculated
              every time your cash flow moves.
            </p>
          </MediaPanel>

          <Card
            data-plate
            variant="ink"
            className="flex min-h-80 flex-col justify-between"
          >
            <h3 className="text-2xl font-medium leading-snug text-white">
              Always linked,
              <br />
              never touched.
            </h3>
            <p className="text-base text-white/60">
              Read-only access to every bank and UPI app. We can see the money.
              We can never move it.
            </p>
          </Card>

          <Card
            data-plate
            variant="ink"
            className="flex min-h-80 flex-col justify-between"
          >
            <h3 className="text-2xl font-medium leading-snug text-white">
              Fully
              <br />
              automated
            </h3>
            <p className="text-base text-white/60">
              No spreadsheet to keep up. The budget rebuilds itself from your
              spending while you get on with the month.
            </p>
          </Card>
        </Reveal>
      </Section>

      {/* 5 · The credentials row. Same marquee mechanism as the hero, slower. */}
      <Section className="py-10 md:py-12">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-4">
          <p className="text-base leading-relaxed text-copy">
            Built on regulated rails
            <br />
            and certified advice.
          </p>
          <div className="md:col-span-3">
            <Marquee
              items={CREDENTIAL_BRANDS}
              duration="30s"
              itemClassName="mx-10 text-copy"
            />
          </div>
        </div>
      </Section>

      {/* 6 · PAS:AGITATE · Cialdini:loss-aversion — no CTA, tension must not
             resolve here */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="The problem"
            title="Two problems. Everything else follows from them."
            lede="You are 25 to 35, salaried, and doing fine on paper. The trouble starts somewhere between the salary landing and the month ending."
          />
        </Reveal>

        <Reveal selector="[data-pain]" className="mt-14 grid gap-4 lg:grid-cols-2">
          {[
            {
              n: "01",
              title: "You cannot see where it goes",
              body: "Money moves across three or four bank accounts and a couple of UPI apps. Nothing adds it up. At month end there is no single place that answers the question, so you guess, and the guess is usually wrong.",
            },
            {
              n: "02",
              title: "The advice you get is written for everyone",
              body: "Free apps hand the same five tips to five million people. None of it knows that you front-load the month, or that your rent moved last quarter, or that you have been sitting on a surplus since June without investing it.",
            },
          ].map((p) => {
            const Art = p.n === "01" ? ScatteredAccounts : GenericAdvice;
            return (
              <Card key={p.n} data-pain className="flex flex-col p-8">
                <span className="num text-sm font-medium text-accent">{p.n}</span>
                <h3 className="mt-4 text-2xl font-medium text-fg">{p.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-copy">{p.body}</p>
                <Art className="mt-8 h-48 w-full" />
              </Card>
            );
          })}
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-wrap gap-2.5">
            {[
              "Struggles to save",
              "Low investing confidence",
              "No time to plan",
              "Alerts arrive too late",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-edge bg-panel px-4 py-2 text-sm text-copy"
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-dim">
            These four come up in every first call. All of them are downstream of
            the two above, which is why PaisaWise fixes those first.
          </p>
        </Reveal>
      </Section>

      {/* 7 · PAS:SOLVE · SB7:guide — pinned scroll product reveal */}
      <PhoneShowcase />

      {/* 8 · The tall media panel. Copy column left, one large plate right —
             the reference's "Use modes" block, carrying the advisor pitch. */}
      <Section>
        <Reveal className="grid items-start gap-8 md:grid-cols-2">
          <div className="md:pr-12 md:pt-2">
            <p className="eyebrow mb-2">PaisaWise in practice</p>
            <h2 className="text-[clamp(2.6rem,5vw,3.75rem)] font-medium leading-none text-fg">
              The advisor
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-copy">
              The part no free app offers. Every month you sit with a certified
              financial advisor who has already read your dashboard, so the call
              starts at the decision rather than at the explanation.
            </p>
          </div>

          <MediaPanel
            video={MEDIA.institutionLoop}
            gold
            className="min-h-[38rem] lg:min-h-[45rem]"
          >
            <div className="relative p-10 md:p-12">
              <h3 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-plate-fg">
                Certified, monthly
              </h3>
              <p className="mt-5 max-w-md text-base text-plate-copy">
                A one-on-one video call to go through your numbers. Your advisor
                adjusts the budget, sets the savings target, and tells you what
                to do with the surplus — matched to your risk profile, not to
                what pays us.
              </p>
              <div className="mt-8">
                <Button href="/features" variant="onInk" arrow>
                  Know more
                </Button>
              </div>
            </div>
          </MediaPanel>
        </Reveal>
      </Section>

      {/* 9 · SB7:plan · Cialdini:commitment — three steps makes the change
             feel small */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="How it works"
            title="Set up once, in about fifteen minutes"
            lede="The plan is short on purpose. A long onboarding is where good intentions go to die."
          />
        </Reveal>
        <Reveal
          selector="[data-step]"
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {HOW_IT_WORKS.map((s) => (
            <Card key={s.step} data-step className="relative p-8">
              <span className="num text-4xl font-medium tracking-[-0.03em] text-accent">
                {s.step}
              </span>
              <h3 className="mt-4 text-xl font-medium text-fg">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-copy">{s.body}</p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-10">
          <Button href="/how-it-works" variant="secondary">
            See the full setup
          </Button>
        </Reveal>
      </Section>

      {/* 10 · AIDA:desire — show the product working.
             The preview does the persuading; the copy only frames it. */}
      <Section tone="alt">
        <Reveal className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead
              eyebrow="Live demo"
              title="Look at a real month before you pay for one"
              lede="A full working dashboard with a sample month loaded. Switch months, watch the categories move, see the alert fire."
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/demo" size="lg" arrow>
                Open the demo
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                See pricing
              </Button>
            </div>
            <p className="mt-6 text-sm text-dim">
              No sign-up, no card, no bank connection to look around.
            </p>
          </div>
          <div data-fx="parallax">
            <DashboardPreview />
          </div>
        </Reveal>
      </Section>

      {/* 11 · AIDA:desire · Cialdini:consistency — the visitor proves the value
              themselves */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="The math"
            title={`Does ${rupees(PRICE.monthly)} a month pay for itself?`}
            lede={`That is about ${rupeesExact(PRICE.perDay)} a day. Here is the arithmetic, with your numbers rather than ours.`}
          />
        </Reveal>
        <Reveal className="mt-12">
          <PaybackCalculator />
        </Reveal>
      </Section>

      {/* 12 · objection handling — the free-app question, answered head on */}
      <Section tone="alt">
        <Reveal>
          <SectionHead
            eyebrow="Why not a free app"
            title="Free apps track. PaisaWise coaches."
            lede="You already have a tracking app on your phone. Here is the part it does not do."
          />
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-2xl border border-edge">
          <div className="grid grid-cols-2">
            <div className="bg-panel px-5 py-4 text-sm font-medium text-dim md:px-8">
              Free tracking apps
            </div>
            <div className="bg-ink-card px-5 py-4 text-sm font-medium text-white md:px-8">
              PaisaWise
            </div>
          </div>
          {COMPARISON.map((row, i) => (
            <div
              key={row.free}
              className={`grid grid-cols-2 border-t border-edge ${
                i % 2 ? "bg-panel-alt/60" : "bg-panel"
              }`}
            >
              <div className="flex items-center gap-3 px-5 py-4 md:px-8">
                <X size={15} className="shrink-0 text-dim" aria-hidden />
                <span className="text-sm text-copy">{row.free}</span>
              </div>
              <div className="flex items-center gap-3 border-l border-edge px-5 py-4 md:px-8">
                <Check size={15} className="shrink-0 text-positive" aria-hidden />
                <span className="text-sm font-medium text-fg">
                  {row.paisawise}
                </span>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-8">
          <p className="max-w-3xl text-copy">
            Free apps are ad-supported: they earn when you scroll. PaisaWise earns
            only when you renew, which means the incentive is to make you better
            off rather than to keep you looking at a screen.
          </p>
        </Reveal>
      </Section>

      {/* 13 · Cialdini:social-proof — labelled illustrative, see the note below */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Members"
            title="What people say after the first quarter"
          />
        </Reveal>
        <Reveal
          selector="[data-quote]"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} data-quote className="flex flex-col">
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    aria-hidden
                    className={
                      i < t.rating ? "fill-accent-fill text-accent-fill" : "text-edge"
                    }
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-copy">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-edge pt-4">
                <p className="text-sm font-medium text-fg">{t.name}</p>
                <p className="text-xs text-dim">{t.role}</p>
              </div>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-6">
          <Badge tone="neutral">
            Illustrative testimonials written for an academic project
          </Badge>
        </Reveal>
      </Section>

      {/* 14 · risk reversal · Cialdini:authority */}
      <Section tone="alt">
        <Reveal>
          <SectionHead
            eyebrow="Security"
            title="We can see your money. We can never move it."
            lede="Every objection about data ends up in the same place, so here is the answer before you ask."
          />
        </Reveal>
        <Reveal
          selector="[data-trust]"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_POINTS.map((t, i) => {
            const Icon = [ShieldCheck, Lock, XCircle, BadgeCheck][i];
            return (
              <Card key={t.label} data-trust>
                <Icon size={20} className="text-accent" aria-hidden />
                <h3 className="mt-4 font-medium text-fg">{t.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-copy">{t.note}</p>
              </Card>
            );
          })}
        </Reveal>
      </Section>

      {/* 15 · AIDA:action — pricing, the first hard CTA */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Pricing"
            title="One plan. Everything included."
            lede="No tiers, no upsell on the advisor call. The only choice is whether you pay monthly or yearly."
            align="center"
          />
        </Reveal>

        <Reveal className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          <Card className="p-8">
            <p className="text-sm font-medium text-dim">Monthly</p>
            <p className="mt-3">
              <span className="num text-5xl font-medium tracking-[-0.03em] text-fg">
                {rupees(PRICE.monthly)}
              </span>
              <span className="ml-1 text-copy">/month</span>
            </p>
            <p className="mt-3 text-sm text-copy">
              About {rupeesExact(PRICE.perDay)} a day. Cancel whenever you like.
            </p>
            <Button href="/get-started" variant="secondary" className="mt-8 w-full">
              Start monthly
            </Button>
          </Card>

          <Card variant="ink" className="relative p-8">
            <Badge className="absolute -top-3 left-8">
              Saves {rupees(PRICE.yearlySaving)}
            </Badge>
            <p className="text-sm font-medium text-white/60">Yearly</p>
            <p className="mt-3">
              <span className="num text-5xl font-medium tracking-[-0.03em] text-white">
                {rupees(PRICE.yearly)}
              </span>
              <span className="ml-1 text-white/60">/year</span>
            </p>
            <p className="mt-3 text-sm text-white/60">
              The same product, {rupees(PRICE.yearlySaving)} cheaper over twelve
              months.
            </p>
            <Button href="/get-started" variant="onInk" className="mt-8 w-full">
              Start yearly
            </Button>
          </Card>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-4xl">
          {/* px-8 to match the plan cards above: the two boxes share a left
              edge, so a 24px inset under a 32px one reads as a misalignment. */}
          <div className="rounded-2xl border border-edge bg-panel px-8 py-6">
            <p className="text-sm text-copy">
              <span className="font-medium text-fg">
                {rupees(PRICE.onboarding)} onboarding fee
              </span>{" "}
              covers account linking and your first financial review. It is waived
              if your bank relationship manager introduced you to PaisaWise.
            </p>
          </div>
          <p className="mt-6 text-center text-sm text-copy">
            Not sure which fits?{" "}
            <Link
              href="/get-started"
              className="font-medium text-fg underline underline-offset-4"
            >
              Answer four questions
            </Link>{" "}
            and we will tell you where to start.
          </p>
        </Reveal>
      </Section>

      {/* 16 · residual objections. The closing ask lives in the footer, which
              is on every route, so this section ends on the FAQ rather than
              repeating the CTA twice in one screen. */}
      <Section tone="alt">
        <Reveal>
          <SectionHead eyebrow="Questions" title="The ones people ask on the first call" />
        </Reveal>
        <Reveal
          selector="[data-faq]"
          className="mt-12 grid gap-4 lg:grid-cols-2"
        >
          {FAQS.slice(0, 4).map((f) => (
            <Card key={f.q} data-faq>
              <h3 className="font-medium text-fg">{f.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-copy">{f.a}</p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-8">
          <Button href="/faq" variant="secondary">
            All questions
          </Button>
        </Reveal>
      </Section>
    </>
  );
}

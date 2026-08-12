import Link from "next/link";
import { ArrowRight, Check, X, Star, ShieldCheck, Lock, BadgeCheck, XCircle } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { PhoneShowcase } from "@/components/sections/PhoneShowcase";
import { PaybackCalculator } from "@/components/interactive/PaybackCalculator";
import { Reveal, Counter } from "@/components/motion/Reveal";
import {
  ScatteredAccounts,
  GenericAdvice,
  DashboardPreview,
} from "@/components/graphics/Illustrations";
import { Button, Card, Section, SectionHead, Badge } from "@/components/ui/primitives";
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

      {/* 2 · Cialdini:social-proof — guide credibility, immediately after the hook.
             Edge-to-edge cells: the dividers are the page grid, not card borders.
             -mr-px tucks the last column's edge under the frame rail. */}
      <section className="border-b border-edge bg-panel-alt">
        <Reveal
          selector="[data-stat]"
          className="-mr-px grid grid-cols-2 md:grid-cols-4"
        >
          {[
            { to: 4, suffix: "", label: "Accounts linked on average" },
            { to: 12, suffix: " months", label: "Of history read on day one" },
            { to: 1, suffix: " call", label: "With a certified advisor, monthly" },
            { to: 499, prefix: "₹", label: "A month, cancel anytime" },
          ].map((s) => (
            <div
              key={s.label}
              data-stat
              className="border-b border-r border-edge px-6 py-8 last:border-b-0 md:border-b-0 md:px-8"
            >
              <div className="num text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-none text-fg">
                {s.prefix}
                <Counter to={s.to} />
                {s.suffix}
              </div>
              <p className="mt-2.5 text-sm leading-snug text-copy">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 3 · PAS:AGITATE · Cialdini:loss-aversion — no CTA, tension must not resolve here */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="The problem"
            title="Two problems. Everything else follows from them."
            lede="You are 25 to 35, salaried, and doing fine on paper. The trouble starts somewhere between the salary landing and the month ending."
          />
        </Reveal>

        <Reveal selector="[data-pain]" className="mt-14 grid gap-6 lg:grid-cols-2">
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
              <Card key={p.n} data-pain className="flex flex-col border-edge p-8">
                <span className="num text-sm font-bold text-accent">{p.n}</span>
                <h3 className="mt-4 text-2xl font-semibold text-fg">{p.title}</h3>
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

      {/* 4 · PAS:SOLVE · SB7:guide — pinned scroll product reveal */}
      <PhoneShowcase />

      {/* 5 · SB7:plan · Cialdini:commitment — three steps makes the change feel small */}
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
          className="mt-14 grid overflow-hidden rounded-2xl border border-edge md:grid-cols-3"
        >
          {HOW_IT_WORKS.map((s) => (
            <Card key={s.step} data-step variant="cell" className="relative p-8">
              <span className="num text-4xl font-semibold text-accent">
                {s.step}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-fg">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-copy">{s.body}</p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-10">
          <Button href="/how-it-works" variant="secondary">
            See the full setup
            <ArrowRight size={16} />
          </Button>
        </Reveal>
      </Section>

      {/* 6 · AIDA:desire — show the product working.
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
              <Button href="/demo" size="lg">
                Open the demo
                <ArrowRight size={18} />
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

      {/* 7 · AIDA:desire · Cialdini:consistency — the visitor proves the value themselves */}
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

      {/* 8 · objection handling — the free-app question, answered head on */}
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
            <div className="bg-panel px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-dim md:px-8">
              Free tracking apps
            </div>
            <div className="bg-panel-alt px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-fg md:px-8">
              PaisaWise
            </div>
          </div>
          {COMPARISON.map((row, i) => (
            <div
              key={row.free}
              className={`grid grid-cols-2 border-t border-edge ${
                i % 2 ? "bg-panel-alt" : "bg-panel"
              }`}
            >
              <div className="flex items-center gap-3 px-5 py-4 md:px-8">
                <X size={15} className="shrink-0 text-dim" aria-hidden />
                <span className="text-sm text-copy">{row.free}</span>
              </div>
              <div className="flex items-center gap-3 border-l border-edge bg-accent-soft-2 px-5 py-4 md:px-8">
                <Check size={15} className="shrink-0 text-positive" aria-hidden />
                <span className="text-sm font-semibold text-fg">
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

      {/* 9 · Cialdini:social-proof — labelled illustrative, see the note below */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Members"
            title="What people say after the first quarter"
          />
        </Reveal>
        <Reveal
          selector="[data-quote]"
          className="mt-12 grid overflow-hidden rounded-2xl border border-edge sm:grid-cols-2 lg:grid-cols-4"
        >
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} data-quote variant="cell" className="flex flex-col">
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    aria-hidden
                    className={
                      i < t.rating
                        ? "fill-accent text-accent"
                        : "text-edge"
                    }
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-copy">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-edge pt-4">
                <p className="text-sm font-semibold text-fg">{t.name}</p>
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

      {/* 10 · risk reversal · Cialdini:authority */}
      <Section tone="ink" className="bg-panel-alt">
        <Reveal>
          <SectionHead
            eyebrow="Security"
            title="We can see your money. We can never move it."
            lede="Every objection about data ends up in the same place, so here is the answer before you ask."
            onInk
          />
        </Reveal>
        <Reveal
          selector="[data-trust]"
          className="mt-12 grid overflow-hidden rounded-2xl border border-edge sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_POINTS.map((t, i) => {
            const Icon = [ShieldCheck, Lock, XCircle, BadgeCheck][i];
            return (
              <Card key={t.label} data-trust variant="cell">
                <Icon size={20} className="text-accent" aria-hidden />
                <h3 className="mt-4 font-semibold text-fg">{t.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-copy">{t.note}</p>
              </Card>
            );
          })}
        </Reveal>
      </Section>

      {/* 11 · AIDA:action — pricing, the first hard CTA */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="Pricing"
            title="One plan. Everything included."
            lede="No tiers, no upsell on the advisor call. The only choice is whether you pay monthly or yearly."
            align="center"
          />
        </Reveal>

        <Reveal className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <Card className="p-8">
            <p className="text-sm font-semibold text-dim">Monthly</p>
            <p className="mt-3">
              <span className="num text-5xl font-bold text-fg">
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

          <Card className="relative border-accent bg-accent-soft-2 p-8">
            <Badge className="absolute -top-3 left-8">
              Saves {rupees(PRICE.yearlySaving)}
            </Badge>
            <p className="text-sm font-semibold text-accent">Yearly</p>
            <p className="mt-3">
              <span className="num text-5xl font-bold text-fg">
                {rupees(PRICE.yearly)}
              </span>
              <span className="ml-1 text-copy">/year</span>
            </p>
            <p className="mt-3 text-sm text-copy">
              The same product, {rupees(PRICE.yearlySaving)} cheaper over twelve
              months.
            </p>
            <Button href="/get-started" className="mt-8 w-full">
              Start yearly
            </Button>
          </Card>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-4xl">
          <div className="rounded-2xl border border-edge bg-panel-alt p-6">
            <p className="text-sm text-copy">
              <span className="font-semibold text-fg">
                {rupees(PRICE.onboarding)} onboarding fee
              </span>{" "}
              covers account linking and your first financial review. It is waived
              if your bank relationship manager introduced you to PaisaWise.
            </p>
          </div>
          <p className="mt-6 text-center text-sm text-copy">
            Not sure which fits?{" "}
            <Link href="/get-started" className="font-semibold text-accent underline underline-offset-4">
              Answer four questions
            </Link>{" "}
            and we will tell you where to start.
          </p>
        </Reveal>
      </Section>

      {/* 12 · residual objections */}
      <Section tone="alt">
        <Reveal>
          <SectionHead eyebrow="Questions" title="The ones people ask on the first call" />
        </Reveal>
        <Reveal
          selector="[data-faq]"
          className="mt-12 grid overflow-hidden rounded-2xl border border-edge lg:grid-cols-2"
        >
          {FAQS.slice(0, 4).map((f) => (
            <Card key={f.q} data-faq variant="cell">
              <h3 className="font-semibold text-fg">{f.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-copy">{f.a}</p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-8">
          <Button href="/faq" variant="secondary">
            All questions
            <ArrowRight size={16} />
          </Button>
        </Reveal>
      </Section>

      {/* 13 · AIDA:action · Cialdini:reciprocity — the RM waiver ask, straight from the brief */}
      <section className="relative overflow-hidden py-28 md:py-36">
        {/* Grid floor and bloom, borrowed from the reference. Decorative only. */}
        <div aria-hidden className="gridfloor absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-18rem] left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full opacity-40 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, var(--accent-fill) 0%, transparent 70%)",
          }}
        />
        <div className="shell relative text-center">
          <Reveal>
            <h2 className="text-fade mx-auto max-w-3xl text-[clamp(2rem,4.6vw,3.2rem)] font-medium">
              Your salary already arrived. The question is what it does next.
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-copy">
              If your relationship manager introduced you, the{" "}
              {rupees(PRICE.onboarding)} onboarding fee is already waived. Book
              your first advisor call and start there.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/get-started" size="lg">
                Get started
                <ArrowRight size={18} />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Book a call
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

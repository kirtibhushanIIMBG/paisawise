import type { Metadata } from "next";
import { PageMasthead } from "@/components/sections/PageMasthead";
import { AnimatedPlate } from "@/components/sections/AnimatedPlate";
import Link from "next/link";
import { Check } from "lucide-react";
import { PaybackCalculator } from "@/components/interactive/PaybackCalculator";
import { Reveal } from "@/components/motion/Reveal";
import { Badge, Button, Card, Section, SectionHead } from "@/components/ui/primitives";
import { Marquee, CREDENTIAL_BRANDS } from "@/components/sections/Marquee";
import { MediaPanel } from "@/components/sections/MediaPanel";
import { FEATURES, FAQS, PRICE, COMPARISON } from "@/lib/site";
import { rupees, rupeesExact } from "@/lib/format";

export const metadata: Metadata = {
  title: "Pricing",
  description: `PaisaWise costs ${rupees(PRICE.monthly)} a month or ${rupees(PRICE.yearly)} a year. Every feature on every plan, including the monthly advisor call.`,
};

export default function PricingPage() {
  return (
    <>
      <PageMasthead
        motion="bars"
        eyebrow="Pricing"
        title="One plan. The advisor is never an upsell."
        lede="Most finance apps put the human behind a premium tier. Here the only decision is monthly or yearly."
      />

      <Section className="pb-10 md:pb-12">
        <Reveal className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-medium text-fg">
              One plan.
              <br />
              No tiers.
            </h2>
            <div className="mt-8">
              <Button href="/get-started" arrow>
                Find your plan
              </Button>
            </div>
          </div>
          <p className="text-2xl leading-relaxed text-copy md:text-3xl">
            About <span className="num text-fg">{rupeesExact(PRICE.perDay)}</span>{" "}
            a day for the app, the alerts and a certified advisor on a call every
            month. The only decision is monthly or yearly.
          </p>
        </Reveal>
      </Section>

      {/* AIDA:action — the two plans */}
      <Section className="py-10 md:py-12">
        {/* min-w-0: grid items default to min-width:auto, so a single line that
            cannot shrink drags the whole track past the viewport. */}
        <div className="mx-auto grid max-w-4xl gap-6 [&>*]:min-w-0 md:grid-cols-2">
          <Reveal>
            <Card className="h-full p-6 sm:p-8 md:p-10">
              <p className="text-sm font-medium text-dim">Monthly</p>
              <p className="mt-4">
                <span className="num text-5xl font-medium tracking-[-0.03em] text-fg sm:text-6xl">
                  {rupees(PRICE.monthly)}
                </span>
                <span className="ml-2 text-copy">/month</span>
              </p>
              <p className="mt-4 text-copy">
                About {rupeesExact(PRICE.perDay)} a day. No lock-in, cancel from
                settings whenever you like.
              </p>
              <Button href="/get-started" variant="secondary" className="mt-8 w-full">
                Start monthly
              </Button>
            </Card>
          </Reveal>

          <Reveal>
            <Card variant="ink" className="relative h-full p-6 sm:p-8 md:p-10">
              <Badge className="absolute -top-3 left-8">
                Saves {rupees(PRICE.yearlySaving)}
              </Badge>
              <p className="text-sm font-medium text-white/60">Yearly</p>
              <p className="mt-4">
                <span className="num text-5xl font-medium tracking-[-0.03em] text-white sm:text-6xl">
                  {rupees(PRICE.yearly)}
                </span>
                <span className="ml-2 text-white/60">/year</span>
              </p>
              <p className="mt-4 text-white/60">
                Works out to about{" "}
                <span className="num">{rupees(Math.round(PRICE.yearly / 12))}</span>{" "}
                a month. Same product, {rupees(PRICE.yearlySaving)} cheaper.
              </p>
              <Button href="/get-started" variant="onInk" className="mt-8 w-full">
                Start yearly
              </Button>
            </Card>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-8 max-w-4xl">
          {/* Horizontal inset tracks the plan cards above -- the two share a
              left edge, so a different one reads as a misalignment. */}
          <Card className="bg-panel-alt px-6 sm:px-8 md:px-10">
            <p className="text-copy">
              <span className="font-medium text-fg">
                A one-time {rupees(PRICE.onboarding)} onboarding fee
              </span>{" "}
              covers account linking and your first financial review.{" "}
              <span className="font-medium text-accent">
                It is waived if your bank relationship manager introduced you.
              </span>
            </p>
          </Card>
        </Reveal>

        {/* what is included */}
        <Reveal className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-lg font-medium text-fg">
            Included on both plans
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f.slug} className="flex gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-positive" aria-hidden />
                <span>
                  <span className="block font-medium text-fg">{f.title}</span>
                  <span className="block text-sm text-copy">{f.short}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* The free-app objection, in the same table the home page uses. */}
      <Section tone="alt">
        <Reveal>
          <SectionHead
            eyebrow="Why not a free app"
            title="Free apps track. PaisaWise coaches."
            lede="You already have a tracking app on your phone. This is the part it does not do."
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
                <span className="text-sm text-copy">{row.free}</span>
              </div>
              <div className="flex items-center gap-3 border-l border-edge px-5 py-4 md:px-8">
                <Check size={15} className="shrink-0 text-positive" aria-hidden />
                <span className="text-sm font-medium text-fg">{row.paisawise}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* The advisor, on a plate — the thing the price actually buys. */}
      <Section>
        <Reveal className="grid items-start gap-8 md:grid-cols-2">
          <div className="md:pr-12 md:pt-2">
            <p className="eyebrow mb-2">What the price buys</p>
            <h2 className="text-[clamp(2.4rem,5vw,3.5rem)] font-medium leading-none text-fg">
              A person,
              <br />
              every month
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-copy">
              Every other line on this page is software. This one is a certified
              financial advisor who has read your dashboard before the call, and
              it is included at both prices rather than sold as a tier.
            </p>
          </div>
          <MediaPanel
            image="/hero/section-advisor.jpg"
            imagePosition="72% 40%"
            scrim="strong"
            className="min-h-[30rem] lg:min-h-[36rem]"
          >
            <div className="relative p-10 md:p-12">
              <h3 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-medium leading-tight text-plate-fg">
                Thirty minutes
              </h3>
              <p className="mt-5 max-w-md text-base text-plate-copy">
                You agree one or two changes for the month ahead — small enough
                that they actually happen. If a SIP makes sense, it is sized on
                the call against the surplus you have been sitting on.
              </p>
              <div className="mt-8">
                <Button href="/contact" arrow>
                  Book a call
                </Button>
              </div>
            </div>
          </MediaPanel>
        </Reveal>
      </Section>

      {/* Cialdini:consistency — the visitor does the arithmetic themselves */}
      <Section tone="alt">
        <Reveal>
          <SectionHead
            eyebrow="The math"
            title="Work out whether it pays for itself"
            lede="Your numbers, not ours. This is the same arithmetic your advisor uses on the first call."
          />
        </Reveal>
        <Reveal className="mt-12">
          <PaybackCalculator />
        </Reveal>
      </Section>

      <Section className="py-10 md:py-12">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-4">
          <p className="text-base leading-relaxed text-copy">
            Funded by subscriptions,
            <br />
            so you are the customer.
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

      <Section>
        <Reveal>
          <SectionHead eyebrow="Pricing questions" title="Before you decide" />
        </Reveal>
        <Reveal className="mt-10 grid gap-5 lg:grid-cols-2">
          {FAQS.filter((f) =>
            ["Why pay", "₹4,999", "What if I do not", "What is the ₹999"].some((k) =>
              f.q.startsWith(k),
            ),
          ).map((f) => (
            <Card key={f.q}>
              <h3 className="font-medium text-fg">{f.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-copy">{f.a}</p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-8">
          <p className="text-copy">
            More questions are answered on the{" "}
            <Link href="/faq" className="font-medium text-accent underline underline-offset-4">
              FAQ page
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      <section className="px-4 py-10 md:px-6">
        <AnimatedPlate variant="flow" tone="ink" className="px-7 py-16 md:px-14 md:py-20">
        <div className="relative z-10 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(1.7rem,3.8vw,2.6rem)] font-medium text-white">
              Not sure which plan fits?
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/60">
              Four questions and we will tell you where to start, and whether
              investing should wait a couple of months.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/get-started" size="lg" arrow>
                Find where to start
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                size="lg"
                className="border border-white/25 text-white hover:bg-white/10"
              >
                Talk to someone
              </Button>
            </div>
          </Reveal>
        </div>
        </AnimatedPlate>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PaybackCalculator } from "@/components/interactive/PaybackCalculator";
import { Reveal } from "@/components/motion/Reveal";
import { Badge, Button, Card, Section, SectionHead } from "@/components/ui/primitives";
import { FEATURES, FAQS, PRICE } from "@/lib/site";
import { rupees, rupeesExact } from "@/lib/format";

export const metadata: Metadata = {
  title: "Pricing",
  description: `PaisaWise costs ${rupees(PRICE.monthly)} a month or ${rupees(PRICE.yearly)} a year. Every feature on every plan, including the monthly advisor call.`,
};

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-edge bg-panel-alt py-14 md:py-20">
        <div className="shell max-w-3xl">
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] font-semibold text-fg">
            One plan. The advisor is never an upsell.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-copy">
            Most finance apps put the human behind a premium tier. Here the only
            decision is monthly or yearly.
          </p>
        </div>
      </section>

      {/* AIDA:action — the two plans */}
      <Section>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8 md:p-10">
              <p className="text-sm font-semibold text-dim">Monthly</p>
              <p className="mt-4">
                <span className="num text-6xl font-bold text-fg">
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
            <Card className="relative h-full border-accent bg-accent-soft-2 p-8 md:p-10">
              <Badge className="absolute -top-3 left-8">
                Saves {rupees(PRICE.yearlySaving)}
              </Badge>
              <p className="text-sm font-semibold text-accent">Yearly</p>
              <p className="mt-4">
                <span className="num text-6xl font-bold text-fg">
                  {rupees(PRICE.yearly)}
                </span>
                <span className="ml-2 text-copy">/year</span>
              </p>
              <p className="mt-4 text-copy">
                Works out to about{" "}
                <span className="num">{rupees(Math.round(PRICE.yearly / 12))}</span>{" "}
                a month. Same product, {rupees(PRICE.yearlySaving)} cheaper.
              </p>
              <Button href="/get-started" className="mt-8 w-full">
                Start yearly
              </Button>
            </Card>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-8 max-w-4xl">
          <Card className="bg-panel-alt">
            <p className="text-copy">
              <span className="font-semibold text-fg">
                A one-time {rupees(PRICE.onboarding)} onboarding fee
              </span>{" "}
              covers account linking and your first financial review.{" "}
              <span className="font-semibold text-accent">
                It is waived if your bank relationship manager introduced you.
              </span>
            </p>
          </Card>
        </Reveal>

        {/* what is included */}
        <Reveal className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-lg font-semibold text-fg">
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
              <h3 className="font-semibold text-fg">{f.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-copy">{f.a}</p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-8">
          <p className="text-copy">
            More questions are answered on the{" "}
            <Link href="/faq" className="font-semibold text-accent underline underline-offset-4">
              FAQ page
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      <section className="bg-panel-alt py-20 text-white md:py-28">
        <div className="shell text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(1.7rem,3.8vw,2.6rem)] font-semibold">
              Not sure which plan fits?
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-copy">
              Four questions and we will tell you where to start, and whether
              investing should wait a couple of months.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/get-started" variant="onInk" size="lg">
                Find where to start
                <ArrowRight size={18} />
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="border border-edge bg-transparent text-white hover:border-accent hover:bg-panel"
              >
                Talk to someone
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

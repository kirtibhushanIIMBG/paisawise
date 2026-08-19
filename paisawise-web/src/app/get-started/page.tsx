import type { Metadata } from "next";
import { PageMasthead } from "@/components/sections/PageMasthead";
import { AnimatedPlate } from "@/components/sections/AnimatedPlate";
import { Button, Section } from "@/components/ui/primitives";
import { RiskQuiz } from "@/components/interactive/RiskQuiz";

export const metadata: Metadata = {
  title: "Find where to start",
  description:
    "Four questions. We tell you which of the three starting points fits, what your first month looks like, and whether investing should wait.",
};

export default function GetStartedPage() {
  return (
    <>
      <PageMasthead
        motion="pulse"
        eyebrow="Four questions"
        title="Where should you start?"
        lede="Nobody needs all six features on day one. Answer these and we will tell you which part of PaisaWise to switch on first, and whether investing should wait a couple of months."
      />

      <section className="py-12 md:py-16">
        <div className="shell max-w-4xl">
          <RiskQuiz />
        </div>
      </section>

      <Section className="py-10 md:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "4", l: "Questions, and none about your PAN" },
            { v: "2 min", l: "To get a plan built from your answers" },
            { v: "₹0", l: "To take it. No card, no sign-up" },
            { v: "15 min", l: "To link accounts, once you decide" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-edge bg-panel px-7 py-8">
              <div className="num text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-none tracking-[-0.03em] text-fg">
                {s.v}
              </div>
              <p className="mt-2.5 text-sm leading-snug text-copy">{s.l}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <AnimatedPlate variant="orbit" tone="ink" className="px-7 py-16 md:px-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(1.8rem,3.8vw,2.6rem)] font-medium text-white">
              Rather talk it through?
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/60">
              A certified advisor will go through the same four questions with
              you on a call, before you subscribe to anything.
            </p>
          </div>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg" arrow>
              Book a call
            </Button>
            <Button
              href="/pricing"
              variant="ghost"
              size="lg"
              className="border border-white/25 text-white hover:bg-white/10"
            >
              See pricing
            </Button>
          </div>
        </AnimatedPlate>
      </Section>
    </>
  );
}

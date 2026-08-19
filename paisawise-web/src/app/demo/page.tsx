import type { Metadata } from "next";
import { PageMasthead } from "@/components/sections/PageMasthead";
import { AnimatedPlate } from "@/components/sections/AnimatedPlate";
import { Dashboard } from "@/components/interactive/Dashboard";
import { Button } from "@/components/ui/primitives";
import { PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";

export const metadata: Metadata = {
  title: "Live demo",
  description:
    "A full PaisaWise dashboard with a sample month loaded. Switch months, watch the categories move, see the overspending alert fire.",
};

export default function DemoPage() {
  return (
    <>
      <PageMasthead
        motion="bars"
        eyebrow="Sample data, no sign-up"
        title="A real month, before you pay for one"
        lede={
          <>
            This is the dashboard a member sees on the first of the month. The
            numbers belong to a made-up salaried professional on a base of{" "}
            <span className="num">{rupees(82000)}</span> a month, with three bank
            accounts and two UPI apps linked. Switch months to watch every figure
            move: July carried variable pay, June was short a reimbursement.
          </>
        }
      />

      <section className="py-12 md:py-16" aria-labelledby="dashboard-heading">
        <div className="shell">
          {/* The dashboard's card titles are h3. Without this the page ran
              h1 -> h3, and a screen reader's heading list showed a gap. It is
              visually hidden because the section above already says it in
              display type. */}
          <h2 id="dashboard-heading" className="sr-only">
            Sample dashboard
          </h2>
          <Dashboard />
        </div>
      </section>

      <section className="px-4 py-10 md:px-6">
        <AnimatedPlate variant="orbit" tone="ink" className="px-7 py-16 md:px-14 md:py-20">
        <div className="relative z-10 text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.7rem,3.6vw,2.5rem)] font-medium text-white">
            Yours would look like this by the end of week one
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/60">
            Linking takes about fifteen minutes. The first advisor call happens in
            your opening month, and the {rupees(PRICE.onboarding)} onboarding fee
            is waived if your relationship manager sent you.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/get-started" size="lg" arrow>
              Get started
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
        </div>
        </AnimatedPlate>
      </section>
    </>
  );
}

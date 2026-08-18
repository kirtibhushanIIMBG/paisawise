import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Dashboard } from "@/components/interactive/Dashboard";
import { Button, Badge } from "@/components/ui/primitives";
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
      <section className="border-b border-edge bg-panel-alt py-14 md:py-20">
        <div className="shell">
          <Badge tone="neutral">Sample data, no sign-up</Badge>
          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.2rem)] font-semibold text-fg">
            A real month, before you pay for one
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-copy">
            This is the dashboard a member sees on the first of the month. The
            numbers belong to a made-up salaried professional on a base of{" "}
            <span className="num">{rupees(82000)}</span> a month, with three bank
            accounts and two UPI apps linked. Switch months to watch every figure
            move: July carried variable pay, June was short a reimbursement.
          </p>
        </div>
      </section>

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

      <section className="border-t border-edge bg-panel-alt py-20 text-fg md:py-24">
        <div className="shell text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold">
            Yours would look like this by the end of week one
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-copy">
            Linking takes about fifteen minutes. The first advisor call happens in
            your opening month, and the {rupees(PRICE.onboarding)} onboarding fee
            is waived if your relationship manager sent you.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/get-started" size="lg">
              Get started
              <ArrowRight size={18} />
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              See pricing
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

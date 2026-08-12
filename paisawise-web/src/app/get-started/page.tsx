import type { Metadata } from "next";
import { RiskQuiz } from "@/components/interactive/RiskQuiz";

export const metadata: Metadata = {
  title: "Find where to start",
  description:
    "Four questions. We tell you which of the three starting points fits, what your first month looks like, and whether investing should wait.",
};

export default function GetStartedPage() {
  return (
    <>
      <section className="border-b border-edge bg-panel-alt py-14 md:py-20">
        <div className="shell max-w-3xl">
          <p className="eyebrow">Four questions</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] font-semibold text-fg">
            Where should you start?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-copy">
            Nobody needs all six features on day one. Answer these and we will tell
            you which part of PaisaWise to switch on first, and whether investing
            should wait a couple of months.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="shell max-w-4xl">
          <RiskQuiz />
        </div>
      </section>
    </>
  );
}

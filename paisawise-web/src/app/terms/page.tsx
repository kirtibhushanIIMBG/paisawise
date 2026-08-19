import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button, Section } from "@/components/ui/primitives";
import { PageMasthead } from "@/components/sections/PageMasthead";
import { PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";

/* TRUST · the counterpart to /privacy. Same structure, same notice at the top,
   and the pricing clause quotes only the three figures from the brief. */

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "Subscription terms, cancellation, the scope of advisor calls, and what PaisaWise does not do. Written as a placeholder for a fictional service built as a college project.",
};

const LAST_UPDATED = "2 August 2026";

type Clause = { heading: string; paras: string[]; list?: string[] };

const CLAUSES: Clause[] = [
  {
    heading: "1. The agreement",
    paras: [
      "These terms would govern your use of the PaisaWise website, mobile app and advisor calls. By creating an account you would be agreeing to them, and if you disagreed with any part the correct response would be to stop using the service.",
    ],
  },
  {
    heading: "2. Who can subscribe",
    paras: [
      "You need to be eighteen or older, resident in India, and able to enter into a contract. You also need at least one bank account or UPI app you are willing to link, because a personal finance coach with nothing to read is of no use to you.",
    ],
  },
  {
    heading: "3. Your account",
    paras: [
      "You are responsible for keeping your login credentials to yourself. Tell us quickly if you think someone else has access, and we will suspend the account while it is sorted out.",
      "One subscription covers one person. Household or joint use would need a separate plan, which does not exist yet.",
    ],
  },
  {
    heading: "4. Pricing and billing",
    paras: [
      `PaisaWise costs ${rupees(PRICE.monthly)} a month or ${rupees(PRICE.yearly)} a year. A one-time onboarding fee of ${rupees(PRICE.onboarding)} covers account linking and your first financial review, and it is waived if a bank relationship manager referred you.`,
      "The monthly plan renews every month until you stop it. The annual plan renews every twelve months. Prices quoted here are the only prices on this site, and any other rupee figure you see is labelled as an illustration.",
      "If a price changes, existing members would be told at least thirty days before the change reached their renewal date.",
    ],
  },
  {
    heading: "5. Cancellation",
    paras: [
      "The monthly plan has no lock-in. Cancel from settings and it runs to the end of the period you have paid for, after which nothing further is charged.",
      "For the annual plan, a cancellation inside the first thirty days is refunded in full, less the onboarding fee where it was charged. After thirty days the plan runs to the end of its term.",
    ],
  },
  {
    heading: "6. Advisor calls: what is included",
    paras: [
      "Your subscription includes one scheduled call each month with a certified financial advisor who has read your dashboard beforehand. Calls run to thirty minutes and are booked from inside the app.",
      "An unused call does not roll over into the following month. If an advisor has to reschedule, the call is offered again within the same month.",
    ],
  },
  {
    heading: "7. What PaisaWise does not do",
    paras: [
      "This clause matters more than most, so it is written plainly.",
    ],
    list: [
      "We do not move your money. Access to every linked account is read-only, and there is no transfer facility in the product.",
      "We do not execute trades or buy funds for you. When a SIP is suggested, you place it yourself through your own broker or fund platform.",
      "We do not earn commission from any fund house or product manufacturer. Subscriptions are the only revenue.",
      "We do not offer tax filing, legal advice, insurance underwriting or credit.",
      "Guidance is based on the information you provide and the accounts you link. If either is incomplete, the guidance will be too.",
    ],
  },
  {
    heading: "8. Your responsibilities",
    paras: [
      "Keep your linked accounts current, tell your advisor when your income or obligations change, and read the alerts. The product can see the numbers, and it cannot see the reason your spending doubled in November.",
      "Decisions about your money remain yours. Nothing in the app or on a call is a direction to act, and market-linked investments can lose value.",
    ],
  },
  {
    heading: "9. Content and intellectual property",
    paras: [
      "The software, the written material and the brand belong to PaisaWise. Your financial data belongs to you, and you can export or delete it at any time as set out in the privacy policy.",
    ],
  },
  {
    heading: "10. Availability and changes",
    paras: [
      "We aim to keep the service running continuously, and we will not promise a number we cannot hold to. Bank connections occasionally break at the bank's end, and when they do the app tells you which account has stopped syncing.",
      "Features may be added, changed or withdrawn. If something you are paying for is withdrawn, you would be told before it happened.",
    ],
  },
  {
    heading: "11. Limitation of liability",
    paras: [
      "In a real agreement this clause would set out the limits of what PaisaWise is liable for, capped by reference to the fees you have paid, and it would be reviewed by a lawyer before publication. This version is a placeholder and has no legal effect.",
    ],
  },
  {
    heading: "12. Governing law",
    paras: [
      "A real version of this document would name the governing law and the courts with jurisdiction over any dispute. This one deliberately does not, because inventing a jurisdiction clause for a fictional company would give a coursework page an authority it should not have.",
    ],
  },
  {
    heading: "13. Contact",
    paras: [
      "Questions about these terms go to hello@paisawise.example, a placeholder address for an academic project. The contact page carries the same routes in a form.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageMasthead
        motion="orbit"
        eyebrow="Legal"
        title="Terms of use"
        lede={<span className="num">Last updated {LAST_UPDATED}</span>}
      />

      <Section className="py-14 md:py-20">
        <div className="max-w-[46rem]">
          <div className="flex gap-4 rounded-2xl border border-edge bg-accent-soft p-5 md:p-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p className="font-medium text-fg">
                This is coursework, and it is not a legal agreement
              </p>
              <p className="mt-2 leading-relaxed text-copy">
                PaisaWise is a fictional product created for a college
                assignment. There is no company to contract with, no
                subscription to buy, and no clause below carries any legal
                effect. The section headings follow what a subscription
                fintech would need to cover, and the wording is a plausible
                placeholder written by a student.
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-11">
            {CLAUSES.map((clause) => (
              <section key={clause.heading}>
                <h2 className="text-[clamp(1.25rem,2.4vw,1.6rem)] font-medium text-fg">
                  {clause.heading}
                </h2>
                {clause.paras.map((para) => (
                  <p
                    key={para}
                    className={`mt-4 text-[1.02rem] leading-[1.75] text-copy${
                      /\d/.test(para) ? " num" : ""
                    }`}
                  >
                    {para}
                  </p>
                ))}
                {clause.list ? (
                  <ul className="mt-5 space-y-3">
                    {clause.list.map((item) => (
                      <li
                        key={item}
                        className="border-l-2 border-edge pl-4 text-[1.02rem] leading-[1.7] text-copy"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <hr className="mt-14 border-edge" />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="secondary" href="/privacy">
              Read the privacy policy
            </Button>
            <p className="text-sm text-dim">
              Pricing in plain language sits on the{" "}
              <Link
                href="/pricing"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                pricing page
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

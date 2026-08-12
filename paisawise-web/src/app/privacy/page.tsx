import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Badge, Button, Section } from "@/components/ui/primitives";

/* TRUST · real structure, placeholder content. The academic-project notice sits
   above the first clause so nobody can read three sections before finding it. */

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How PaisaWise would handle account data, spending history and advisor call notes. Written as a placeholder for a fictional service built as a college project.",
};

const LAST_UPDATED = "2 August 2026";

type Clause = { heading: string; paras: string[]; list?: string[] };

const CLAUSES: Clause[] = [
  {
    heading: "1. Who this policy covers",
    paras: [
      "This policy describes how PaisaWise would handle information about you when you visit the website, create an account, link a bank account or UPI app, and speak to an advisor. It applies to the website and the mobile app together, because both read the same records.",
      "Where this policy says we, it means PaisaWise. Where it says you, it means the person whose money is being looked at.",
    ],
  },
  {
    heading: "2. What we collect",
    paras: [
      "Three kinds of information, collected for three different reasons.",
    ],
    list: [
      "Details you give us: your name, email address, mobile number, city, and the answers you provide in the risk-profile setup.",
      "Account information we read: transaction history, balances, category labels and payee names from the bank accounts and UPI apps you link. Read-only, and only for the accounts you choose to connect.",
      "Product usage: which screens you open, which alerts you dismiss, and whether you attended your monthly advisor call. This is used to improve the product and to know when a member has gone quiet.",
    ],
  },
  {
    heading: "3. What we do with it",
    paras: [
      "Your transaction history is what makes the budget yours rather than a template, so most of it goes into generating your monthly plan, your savings target and your overspending alerts.",
      "Your advisor reads a summary of the same data before each monthly call. Notes taken during the call are stored against your account so the next advisor does not start from zero.",
      "We also use aggregated, de-identified patterns to improve the categorisation model. Aggregated means your rows are counted alongside everyone else's and cannot be traced back to you.",
    ],
  },
  {
    heading: "4. Read-only access, and what that rules out",
    paras: [
      "PaisaWise connects to your accounts in read-only mode. We can see the money and we cannot move it. There is no facility in the product to initiate a transfer, place a trade, or authorise a payment on your behalf, and no member of staff can do it either.",
      "We never ask for your net banking password, card CVV, UPI PIN or a one-time password. If anyone claiming to be from PaisaWise asks for one, they are not from PaisaWise.",
    ],
  },
  {
    heading: "5. Who we share it with",
    paras: [
      "We do not sell your data, and we do not run advertising on the platform, so there is no advertising network receiving anything about you.",
      "Data is shared in three narrow cases: with the certified advisor assigned to your account, with the infrastructure providers who host and secure the service under contract, and where a law or a court order requires it. If a bank relationship manager referred you, they are told whether the referral converted and nothing else about your finances.",
    ],
  },
  {
    heading: "6. How long we keep it",
    paras: [
      "Transaction history is retained while your account is open, because a budget built on three months of data is worse than one built on twelve. Advisor call notes are retained for the life of the account.",
      "When you delete your account, the linked-account tokens are revoked immediately and the connection stops. Remaining records are removed within thirty days, except where a record has to be retained to meet a legal or accounting obligation.",
    ],
  },
  {
    heading: "7. Security",
    paras: [
      "Data is encrypted in transit and at rest. Access by staff is limited to the people who need it for the task in front of them, and access to member records is logged.",
      "No system is perfect. If a breach affected your data, we would tell you what happened, what was exposed and what to do about it, rather than waiting for you to read about it elsewhere.",
    ],
  },
  {
    heading: "8. Your rights",
    paras: [
      "You can see the data held about you, export it, correct it, or delete your account, all from settings and at any time. You can also disconnect a single linked account without closing the rest of your profile.",
      "If you would rather ask a person, the contact page has the routes.",
    ],
  },
  {
    heading: "9. Cookies and similar technologies",
    paras: [
      "The site uses cookies to keep you signed in and to remember whether you chose the light or dark theme. Where analytics are used, they are configured to measure page performance rather than to build a profile of you across other websites.",
    ],
  },
  {
    heading: "10. Children",
    paras: [
      "PaisaWise is built for salaried adults and is not intended for anyone under eighteen. We do not knowingly create accounts for minors.",
    ],
  },
  {
    heading: "11. Changes to this policy",
    paras: [
      "If this policy changes in a way that affects what we collect or who sees it, we would email you before the change takes effect rather than quietly updating the date at the top.",
    ],
  },
  {
    heading: "12. Contact",
    paras: [
      "Questions about this policy go to hello@paisawise.example, which is a placeholder address for an academic project. The contact page has a form that behaves the same way.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Section tone="ink" className="py-14 md:py-20">
        <div className="max-w-3xl">
          <Badge tone="violet">Legal</Badge>
          <h1 className="mt-6 text-[clamp(2rem,4.8vw,3.2rem)] font-semibold text-fg">
            Privacy policy
          </h1>
          <p className="num mt-5 text-sm text-copy">Last updated {LAST_UPDATED}</p>
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        <div className="max-w-[46rem]">
          <div className="flex gap-4 rounded-2xl border border-edge bg-accent-soft p-5 md:p-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p className="font-semibold text-fg">
                This is coursework, and it is not a legal agreement
              </p>
              <p className="mt-2 leading-relaxed text-copy">
                PaisaWise is a fictional product created for a college
                assignment. No company exists behind this page, no data is
                collected anywhere on this site, and nothing below has any legal
                effect. The structure follows what a real privacy policy for a
                service like this would need to cover, and the wording is a
                plausible placeholder written by a student.
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-11">
            {CLAUSES.map((clause) => (
              <section key={clause.heading}>
                <h2 className="text-[clamp(1.25rem,2.4vw,1.6rem)] font-semibold text-fg">
                  {clause.heading}
                </h2>
                {clause.paras.map((para) => (
                  <p key={para} className="mt-4 text-[1.02rem] leading-[1.75] text-copy">
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
            <Button variant="secondary" href="/terms">
              Read the terms
            </Button>
            <p className="text-sm text-dim">
              Or go back to the{" "}
              <Link href="/faq" className="font-semibold text-accent underline-offset-4 hover:underline">
                FAQ
              </Link>
              , where the data questions are answered in shorter form.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

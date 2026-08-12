import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FOOTER_NAV, DISCLAIMER, PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";

export function Footer() {
  return (
    <footer className="border-t border-ink-3 bg-ink text-pale">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo onInk showTagline />
            <p className="mt-5 text-sm leading-relaxed text-pale">
              AI budgeting with a certified financial advisor attached.{" "}
              <span className="num">{rupees(PRICE.monthly)}</span> a month.
            </p>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-l">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-pale transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclosure block. Required on every route: the site is a mock and a
            convincing fintech page is exactly the thing that misleads if faked. */}
        <div className="mt-14 space-y-4 rounded-2xl border border-ink-3 bg-ink-2 p-6">
          <p className="text-sm font-semibold text-white">Academic project notice</p>
          <p className="max-w-4xl text-sm leading-relaxed text-pale">{DISCLAIMER}</p>
          <p className="max-w-4xl text-sm leading-relaxed text-muted">
            PaisaWise is not registered with any financial regulator and holds no
            banking, advisory or investment licence. No bank, payment provider or
            financial institution is affiliated with this project. Product
            testimonials shown on this site are illustrative and were written as
            part of the coursework. Any figure other than the stated subscription
            prices is a worked example rather than a projection or promise.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-ink-3 pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Built as a Sales and Business Development coursework submission.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

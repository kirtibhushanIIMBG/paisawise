import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FOOTER_NAV, DISCLAIMER, PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";

export function Footer() {
  return (
    <footer className="border-t border-edge bg-panel-alt text-copy">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo onInk showTagline />
            <p className="mt-5 text-sm leading-relaxed text-copy">
              AI budgeting with a certified financial advisor attached.{" "}
              <span className="num">{rupees(PRICE.monthly)}</span> a month.
            </p>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-copy transition-colors hover:text-fg"
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
        <div className="mt-14 space-y-4 rounded-2xl border border-edge bg-panel p-6">
          <p className="text-sm font-semibold text-fg">Academic project notice</p>
          <p className="max-w-4xl text-sm leading-relaxed text-copy">{DISCLAIMER}</p>
          <p className="max-w-4xl text-sm leading-relaxed text-dim">
            PaisaWise is not registered with any financial regulator and holds no
            banking, advisory or investment licence. No bank, payment provider or
            financial institution is affiliated with this project. Product
            testimonials shown on this site are illustrative and were written as
            part of the coursework. Any figure other than the stated subscription
            prices is a worked example rather than a projection or promise.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-edge pt-8 text-sm text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>Built as a Sales and Business Development coursework submission.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-fg">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-fg">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

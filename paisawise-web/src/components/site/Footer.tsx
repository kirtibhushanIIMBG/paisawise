import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FOOTER_NAV, PRICE } from "@/lib/site";
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
      </div>
    </footer>
  );
}

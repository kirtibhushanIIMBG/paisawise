import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/primitives";
import { FOOTER_NAV, PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";

export function Footer() {
  return (
    <footer className="bg-bg pb-10 pt-20">
      <div className="shell">
        {/* The closing ask, on the deep-violet plate. It is the last thing on
            every route, so it repeats the offer rather than assuming the
            visitor read the page they arrived on. */}
        <div className="relative overflow-hidden rounded-3xl bg-ink-card px-8 py-14 md:px-14 md:py-16">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2rem,4vw,2.9rem)] font-medium text-white">
              Find out where it actually goes.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
              Link your accounts, get a plan built from your own spending, and
              sit with a certified advisor every month.{" "}
              <span className="num">{rupees(PRICE.monthly)}</span> a month, no
              lock-in.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/get-started" variant="onInk" size="lg" arrow>
                Get started
              </Button>
              <Button
                href="/demo"
                size="lg"
                className="border border-white/25 text-white hover:bg-white/10"
                variant="ghost"
              >
                See the dashboard
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo showTagline />
            <p className="mt-5 text-sm leading-relaxed text-copy">
              AI budgeting with a certified financial advisor attached.{" "}
              <span className="num">{rupees(PRICE.monthly)}</span> a month.
            </p>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-medium text-fg">{col.heading}</h3>
              {/* py-1 on an inline-block, and a tighter gap to compensate.
                  These are list navigation rather than links inside a
                  sentence, so they owe the 24x24 minimum target; at
                  text-sm they measured 17px tall. */}
              <ul className="mt-3 space-y-0.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-sm text-copy transition-colors duration-200 hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-edge pt-6">
          <p className="text-xs text-dim">
            © {new Date().getFullYear()} PaisaWise
          </p>
        </div>
      </div>
    </footer>
  );
}

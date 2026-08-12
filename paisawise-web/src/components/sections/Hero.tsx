"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";

/*
  PAS:PROBLEM · SB7:hero-is-the-customer · AIDA:attention
  The question is the hero, not the product. No feature is named above the fold.
  CTA is deliberately soft here; the hard ask lives at the pricing and close.
*/

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-hero='line']", {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.09,
          })
          .from("[data-hero='sub']", { y: 18, opacity: 0, duration: 0.7 }, "-=0.5")
          .from("[data-hero='cta']", { y: 14, opacity: 0, duration: 0.6 }, "-=0.45")
          .from(
            "[data-hero='chip']",
            { y: 12, opacity: 0, duration: 0.5, stagger: 0.07 },
            "-=0.4",
          );
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-ink text-white"
      aria-labelledby="hero-heading"
    >
      {/* violet bloom, purely atmospheric */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18rem] h-[36rem] w-[52rem] -translate-x-1/2 rounded-full opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-violet) 0%, rgba(108,76,241,0.35) 45%, transparent 70%)",
        }}
      />
      <div aria-hidden className="grain absolute inset-0 opacity-[0.18]" />

      <div className="shell relative py-24 text-center md:py-32">
        <h1
          id="hero-heading"
          className="mx-auto max-w-5xl text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.02]"
        >
          <span className="block overflow-hidden">
            <span data-hero="line" className="block">
              You earn well.
            </span>
          </span>
          <span className="mt-1 block overflow-hidden">
            <span data-hero="line" className="block">
              So where does it{" "}
              <span className="text-violet-l">all go?</span>
            </span>
          </span>
        </h1>

        <p
          data-hero="sub"
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-pale"
        >
          An AI budgeting app with a certified financial advisor attached. Built
          for salaried professionals who earn well and still cannot answer that
          question.
        </p>

        <div
          data-hero="cta"
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button href="/get-started" variant="onInk" size="lg">
            Get started
            <ArrowRight size={18} />
          </Button>
          <Button
            href="/demo"
            size="lg"
            className="border border-ink-3 bg-transparent text-white hover:border-violet-l hover:bg-ink-2"
          >
            <Play size={16} />
            See the dashboard
          </Button>
        </div>

        {/* Concrete facts, not adjective triads. */}
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {[
            "Syncs your banks and UPI",
            "Certified advisor every month",
            `${rupees(PRICE.monthly)} a month`,
          ].map((chip) => (
            <li
              key={chip}
              data-hero="chip"
              className="rounded-full border border-ink-3 bg-ink-2/70 px-5 py-2.5 text-sm font-medium text-pale backdrop-blur"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

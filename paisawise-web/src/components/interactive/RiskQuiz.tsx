"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { QUIZ, personaFor } from "@/lib/demo-data";
import { PRICE } from "@/lib/site";
import { rupees } from "@/lib/format";
import { Button, Badge, IllustrationNote } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/*
  AIDA:action · SB7:plan · Cialdini:commitment
  Four small commitments produce a recommendation the visitor feels ownership
  of, which converts better than a plan handed to them cold.
*/

const STORAGE_KEY = "pw-quiz";

type Answers = Record<string, number>;

export function RiskQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [restored, setRestored] = useState(false);

  // Restore progress so a refresh does not lose the run.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { answers: Answers; step: number; done: boolean };
        setAnswers(saved.answers ?? {});
        setStep(saved.step ?? 0);
        setDone(Boolean(saved.done));
      }
    } catch {
      /* sessionStorage unavailable, start fresh */
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step, done }));
    } catch {
      /* ignore */
    }
  }, [answers, step, done, restored]);

  // Move focus to the new question so keyboard and screen-reader users follow.
  useEffect(() => {
    headingRef.current?.focus();
  }, [step, done]);

  const question = QUIZ[step];
  const progress = done ? 100 : (step / QUIZ.length) * 100;

  function choose(score: number) {
    const next = { ...answers, [question.id]: score };
    setAnswers(next);
    if (step + 1 < QUIZ.length) setStep(step + 1);
    else setDone(true);
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
    setSubmitted(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const persona = personaFor(total);

  return (
    <div className="overflow-hidden rounded-3xl border border-edge bg-panel">
      {/* progress */}
      <div className="border-b border-edge px-6 py-4 md:px-9">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-fg">
            {done ? "Your result" : `Question ${step + 1} of ${QUIZ.length}`}
          </span>
          {(step > 0 || done) && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm text-copy transition-colors hover:text-accent"
            >
              <RotateCcw size={14} />
              Start over
            </button>
          )}
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-accent-soft"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quiz progress"
        >
          <div
            className="h-full rounded-full bg-accent-fill transition-[width] duration-500 [transition-timing-function:var(--ease-out-expo)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!done ? (
        <div className="px-6 py-9 md:px-9 md:py-11">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-[clamp(1.4rem,3vw,2rem)] font-semibold text-fg outline-none"
          >
            {question.question}
          </h2>
          {question.help ? (
            <p className="mt-2 text-copy">{question.help}</p>
          ) : null}

          <div className="mt-8 space-y-3" role="group" aria-label={question.question}>
            {question.options.map((o) => (
              <button
                key={o.value}
                onClick={() => choose(o.score)}
                className={cn(
                  "group flex w-full items-center justify-between gap-4 rounded-2xl border border-edge bg-bg px-5 py-4 text-left transition-all duration-200",
                  "hover:border-accent hover:bg-accent-soft",
                )}
              >
                <span>
                  <span className="block font-medium text-fg">{o.label}</span>
                  {o.note ? (
                    <span className="mt-0.5 block text-sm text-dim">{o.note}</span>
                  ) : null}
                </span>
                <ArrowRight
                  size={17}
                  className="shrink-0 text-dim transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden
                />
              </button>
            ))}
          </div>

          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-copy transition-colors hover:text-accent"
            >
              <ArrowLeft size={15} />
              Back
            </button>
          ) : null}
        </div>
      ) : (
        <div className="px-6 py-9 md:px-9 md:py-11">
          <Badge>{persona.risk} profile</Badge>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mt-4 text-[clamp(1.5rem,3.4vw,2.2rem)] font-semibold text-fg outline-none"
            data-testid="quiz-result"
          >
            {persona.name}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-copy">{persona.summary}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-edge bg-bg p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-dim">
                Your first month
              </h3>
              <ul className="mt-4 space-y-3">
                {persona.focus.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-copy">
                    <Check size={16} className="mt-0.5 shrink-0 text-positive" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-edge bg-bg p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-dim">
                On investing
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-copy">
                {persona.sipSuggestion}
              </p>
              <IllustrationNote className="mt-4" />
            </div>
          </div>

          {/* lead capture, inert mock */}
          <div className="mt-8 rounded-2xl border border-accent bg-accent-soft p-6">
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <h3 className="font-semibold text-fg">
                  Send this to your advisor before the first call
                </h3>
                <p className="mt-1.5 text-sm text-copy">
                  They will have read it before you dial in, so you skip explaining
                  your own spending.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="quiz-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="quiz-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="num flex-1 rounded-full border border-edge bg-panel px-5 py-3 text-sm text-fg outline-none placeholder:text-dim focus-visible:border-accent"
                  />
                  <Button type="submit">Send my result</Button>
                </div>
                <p className="mt-3 text-xs text-dim">
                  Demo form. Nothing is submitted or stored.
                </p>
              </form>
            ) : (
              <div className="flex items-start gap-3">
                <Check size={20} className="mt-0.5 shrink-0 text-positive" aria-hidden />
                <div>
                  <p className="font-semibold text-fg">That would normally be on its way.</p>
                  <p className="mt-1 text-sm text-copy">
                    This is a demo, so nothing was sent or stored. In the real
                    product your advisor gets the result and books a call within a
                    working day.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/pricing" size="lg">
              See pricing from {rupees(PRICE.monthly)}
              <ArrowRight size={17} />
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              Open the demo dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

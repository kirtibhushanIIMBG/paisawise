import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge, Button, Card, Section, SectionHead } from "@/components/ui/primitives";
import { POSTS, formatPostDate } from "@/lib/blog";

/* AUTHORITY · Cialdini:authority. Nothing sells here. The job is to show that
   the people writing the nudges know the Indian salaried situation in detail. */

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain writing on budgeting, spending visibility, SIPs and emergency funds, for salaried professionals in India who want the reasoning rather than the rule of thumb.",
};

const [featured, ...rest] = POSTS;

function Meta({ post }: { post: (typeof POSTS)[number] }) {
  return (
    <p className="num flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-dim">
      <span>{formatPostDate(post.date)}</span>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
      <span aria-hidden="true">·</span>
      <span>{post.author}</span>
    </p>
  );
}

export default function BlogIndexPage() {
  return (
    <>
      <Section
        tone="ink"
        className="relative overflow-hidden"
        photo="/hero/page-blog.jpg"
        photoPosition="50% 50%"
        photoVariant="masthead"
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <Badge tone="accent">Writing</Badge>
          <h1 className="mt-6 text-[clamp(2rem,5vw,3.2rem)] font-semibold text-fg">
            Money advice that knows what rent costs in a metro
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-copy">
            Four pieces on the two problems every salaried professional we speak
            to describes: no clear view of where the money goes, and no
            confidence about where to put what is left.
          </p>
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        {/* Lead post, given the width its argument needs */}
        <Card className="group relative overflow-hidden p-0 transition-colors duration-200 hover:border-accent">
          {/* Cover. Decorative: the headline underneath already says what the
              post is, so alt text here would only be read out twice. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.cover}
            alt=""
            aria-hidden
            width={1600}
            height={900}
            className="h-44 w-full border-b border-edge object-cover md:h-56"
          />
          <div className="grid md:grid-cols-[1.15fr_0.85fr]">
            <div className="p-7 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="accent">{featured.category}</Badge>
                <span className="text-sm font-semibold text-dim">Latest</span>
              </div>
              <h2 className="mt-5 text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold text-fg">
                <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-copy">{featured.excerpt}</p>
              <div className="mt-6">
                <Meta post={featured} />
              </div>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Read the post
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div className="hidden border-l border-edge bg-panel-alt p-10 md:block">
              <p className="eyebrow">In this piece</p>
              <ul className="mt-5 space-y-3">
                {featured.body
                  .filter(
                    (block): block is { type: "h2"; content: string } =>
                      block.type === "h2",
                  )
                  .map((block) => (
                    <li
                      key={block.content}
                      className="text-[0.95rem] leading-snug text-copy"
                    >
                      {block.content}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* The rest, three across on desktop */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Card
              key={post.slug}
              as="article"
              className="group relative flex h-full flex-col overflow-hidden p-0 transition-colors duration-200 hover:border-accent"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                width={1600}
                height={900}
                className="h-40 w-full border-b border-edge object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <Badge tone="neutral" className="self-start">
                  {post.category}
                </Badge>
                <h2 className="mt-4 text-xl font-semibold leading-snug text-fg">
                  <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-copy">{post.excerpt}</p>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <Meta post={post} />
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        tone="alt"
        className="py-14 md:py-20"
        photo="/hero/section-plan.jpg"
        photoPosition="70% 45%"
      >
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHead
            title="Reading about it is the easy half"
            lede="The four-question setup takes about two minutes and gives you a plan built from your own numbers."
            className="max-w-xl"
          />
          <Button size="lg" href="/get-started" className="shrink-0">
            Get started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>
    </>
  );
}

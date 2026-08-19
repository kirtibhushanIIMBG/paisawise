import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge, Button, Card, Section } from "@/components/ui/primitives";
import { PageMasthead } from "@/components/sections/PageMasthead";
import { AnimatedPlate } from "@/components/sections/AnimatedPlate";
import { Reveal } from "@/components/motion/Reveal";
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
      <PageMasthead
        photo="/hero/page-blog.jpg"
        photoPosition="50% 50%"
        eyebrow="Writing"
        title="Money advice that knows what rent costs in a metro"
        lede="Four pieces on the two problems every salaried professional we speak to describes: no clear view of where the money goes, and no confidence about where to put what is left."
      />

      <Section className="pb-6 pt-10 md:pb-8 md:pt-12">
        <Reveal className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-medium text-fg">
              Four pieces.
              <br />
              No jargon.
            </h2>
            <div className="mt-8">
              <Button href="/get-started" arrow>
                Find your plan
              </Button>
            </div>
          </div>
          <p className="text-2xl leading-relaxed text-copy md:text-3xl">
            Written for a salaried professional in an Indian metro, with the
            rupee figures worked through rather than left as percentages.
          </p>
        </Reveal>
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
                <span className="text-sm font-medium text-dim">Latest</span>
              </div>
              <h2 className="mt-5 text-[clamp(1.6rem,3.2vw,2.3rem)] font-medium text-fg">
                <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-copy">{featured.excerpt}</p>
              <div className="mt-6">
                <Meta post={featured} />
              </div>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent">
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
                <h2 className="mt-4 text-xl font-medium leading-snug text-fg">
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

      <Section>
        <AnimatedPlate variant="bars" tone="ink" className="px-7 py-16 md:px-14 md:py-20">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.9rem,4vw,2.8rem)] font-medium text-white">
                Reading about it is the easy half
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                The four-question setup takes about two minutes and gives you a
                plan built from your own numbers.
              </p>
            </div>
            <Button size="lg" href="/get-started" className="shrink-0" arrow>
              Get started
            </Button>
          </div>
        </AnimatedPlate>
      </Section>
    </>
  );
}

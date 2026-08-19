import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  IllustrationNote,
  Section,
} from "@/components/ui/primitives";
import { POSTS, formatPostDate, getPost, otherPosts } from "@/lib/blog";
import type { BlogBlock } from "@/lib/blog";

/* AUTHORITY · the post earns the right to the CTA at the bottom. No offer
   interrupts the reading. */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/** Prose paragraphs that carry digits switch to Inter tabular figures. */
const hasFigure = (text: string) => /\d/.test(text);

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="mt-12 text-[clamp(1.4rem,2.6vw,1.85rem)] font-semibold text-fg">
        {block.content}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-6 space-y-3.5">
        {block.content.map((item) => (
          <li key={item} className="flex gap-3.5">
            <Check className="mt-1.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span
              className={`text-[1.05rem] leading-relaxed text-copy${
                hasFigure(item) ? " num" : ""
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p
      className={`mt-6 text-[1.05rem] leading-[1.75] text-copy${
        hasFigure(block.content) ? " num" : ""
      }`}
    >
      {block.content}
    </p>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = otherPosts(slug).slice(0, 3);

  return (
    <>
      <Section
        tone="ink"
        className="relative overflow-hidden py-14 md:py-20"
        photo={post.cover}
        photoVariant="masthead"
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-copy transition-colors duration-200 hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All posts
          </Link>
          <div className="mt-7">
            <Badge tone="accent">{post.category}</Badge>
          </div>
          <h1 className="mt-5 text-[clamp(2rem,4.8vw,3.2rem)] font-semibold text-fg">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-copy">{post.excerpt}</p>
          <div className="num mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-copy">
            <span className="font-semibold text-fg">{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>{post.authorRole}</span>
            <span aria-hidden="true">·</span>
            <span>{formatPostDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>
      </Section>

      <Section className="py-14 md:py-20">
        <article className="max-w-[46rem]">
          {post.illustrative ? (
            <div className="mb-10 rounded-xl border border-edge bg-panel-alt px-5 py-4">
              <p className="text-sm leading-relaxed text-copy">
                The rupee figures in this post are worked examples chosen to make
                the arithmetic readable. They describe nobody in particular.
              </p>
              <IllustrationNote className="mt-2" />
            </div>
          ) : null}

          {post.body.map((block, index) => (
            <Block key={`${block.type}-${index}`} block={block} />
          ))}

          <hr className="mt-14 border-edge" />

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm text-dim">Written by</p>
              <p className="mt-1 font-semibold text-fg">{post.author}</p>
              <p className="text-sm text-copy">{post.authorRole}, PaisaWise</p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-dim">
              PaisaWise is a fictional product built for an academic project,
              and this author is invented along with it.
            </p>
          </div>
        </article>
      </Section>

      <Section tone="alt" className="py-14 md:py-20">
        <h2 className="text-2xl font-semibold text-fg">Read next</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {more.map((next) => (
            <Card
              key={next.slug}
              as="article"
              className="group relative flex h-full flex-col overflow-hidden p-0 transition-colors duration-200 hover:border-accent"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={next.cover}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                width={1600}
                height={900}
                className="h-32 w-full border-b border-edge object-cover"
              />
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <Badge tone="neutral" className="self-start">
                  {next.category}
                </Badge>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-fg">
                  <Link href={`/blog/${next.slug}`} className="after:absolute after:inset-0">
                    {next.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-copy">
                  {next.excerpt}
                </p>
                <p className="num mt-5 text-sm text-dim">
                  {next.readingMinutes} min read
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 rounded-2xl border border-edge bg-panel p-6 md:p-8">
          <div className="flex-1 min-w-[16rem]">
            <h2 className="text-xl font-semibold text-fg md:text-2xl">
              Want this applied to your own numbers?
            </h2>
            <p className="mt-2 leading-relaxed text-copy">
              Four questions, about two minutes, and a plan built from what you
              earn and spend.
            </p>
          </div>
          <Button size="lg" href="/get-started" className="shrink-0">
            Get started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </Section>
    </>
  );
}

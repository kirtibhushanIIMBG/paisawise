import type { ReactNode } from "react";
import { MediaPanel } from "@/components/sections/MediaPanel";
import { AnimatedPlate } from "@/components/sections/AnimatedPlate";
import { cn } from "@/lib/utils";

/**
 * The top plate of every route below the home page.
 *
 * One component rather than a pattern copied into a dozen files, because the
 * awkward half of it is the part that kept drifting: whether the copy is ink
 * or white depends on what is behind it, and that was previously decided by
 * hand on each page. Here it follows from the plate — a photograph gets ink
 * copy over a scrim, a drawn animation gets white copy on the dark slab — so
 * the two can never disagree.
 */
export function PageMasthead({
  eyebrow,
  title,
  lede,
  photo,
  photoPosition = "50% 45%",
  motion = "orbit",
  children,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  /** A photographic plate. Omit for a drawn one. */
  photo?: string;
  photoPosition?: string;
  motion?: "orbit" | "flow" | "bars" | "pulse";
  /** Actions, rendered under the lede. */
  children?: ReactNode;
  className?: string;
}) {
  const onPhoto = Boolean(photo);

  const body = (
    <div className="flex h-full items-center px-7 py-14 md:px-14 md:py-20">
      <div className="max-w-3xl">
        {eyebrow ? (
          <div className={cn("text-sm", onPhoto ? "text-plate-copy" : "text-white/60")}>
            {eyebrow}
          </div>
        ) : null}
        <h1
          className={cn(
            "mt-4 text-[clamp(2rem,5vw,3.4rem)] font-medium",
            onPhoto ? "text-plate-fg" : "text-white",
          )}
        >
          {title}
        </h1>
        {lede ? (
          <p
            className={cn(
              "mt-5 text-lg leading-relaxed",
              onPhoto ? "text-plate-copy" : "text-white/60",
            )}
          >
            {lede}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </div>
  );

  return (
    <section className={cn("px-4 pb-8 pt-2 md:px-6", className)}>
      {onPhoto ? (
        <MediaPanel
          image={photo}
          imagePosition={photoPosition}
          scrim="strong"
          rounded="rounded-[1.75rem]"
          className="min-h-[22rem] md:min-h-[26rem]"
        >
          {body}
        </MediaPanel>
      ) : (
        <AnimatedPlate
          variant={motion}
          tone="ink"
          rounded="rounded-[1.75rem]"
          className="min-h-[22rem] md:min-h-[26rem]"
        >
          {body}
        </AnimatedPlate>
      )}
    </section>
  );
}

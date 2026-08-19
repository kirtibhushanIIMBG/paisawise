import type { ReactNode } from "react";
import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A large rounded plate carrying a video or a still, with copy laid over it.
 *
 * This is the shape the whole design hangs on, so the awkward parts are solved
 * once here rather than at each call site:
 *
 * · The plate always has a solid `--panel-alt` ground underneath the media. A
 *   remote video that never arrives then leaves a plain card rather than a
 *   transparent hole punched in the page.
 * · Copy over a photograph is the classic way to lose contrast, so `scrim`
 *   lays a theme-aware wash between the two. It is on by default; panels whose
 *   copy sits clear of the subject can turn it off.
 * · Video is muted, looped and `playsInline`, which is what autoplay requires
 *   on mobile, and `preload="metadata"` so the poster frame costs a few KB
 *   rather than the whole file before the panel is on screen.
 */
export function MediaPanel({
  video,
  image,
  imagePosition = "50% 50%",
  className,
  mediaClassName,
  scrim = true,
  rounded = "rounded-3xl",
  gold = false,
  children,
  ...rest
}: {
  video?: string;
  image?: string;
  imagePosition?: string;
  className?: string;
  mediaClassName?: string;
  /**
   * `true` is the light wash the pale stock clips need. `"strong"` is for a
   * real photograph with copy over it: it holds the ground almost solid
   * across the copy column and then releases, so the right of the frame still
   * shows the picture. A photograph needs far more than a clip does — the
   * clips are uniformly pale, a photograph has bright faces and windows
   * exactly where a line of body copy lands.
   */
  scrim?: boolean | "strong";
  rounded?: string;
  /**
   * Rotate the plate onto the brand gold. The stock clips are lavender; this
   * is opt-in rather than automatic because the same rotation applied to the
   * photography would turn faces green.
   */
  gold?: boolean;
  children?: ReactNode;
  /* Callers tag plates with `data-*` so the scroll reveal can select them,
     so anything else a div takes is forwarded rather than dropped. */
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-panel-alt",
        rounded,
        className,
      )}
      /* Video-related browser extensions inject their own controls into the
         DOM around a <video> before React hydrates — the Video Speed
         Controller family adds a `div.vsc-controller`, which lands between
         this container and the video and reads to React as a mismatched
         child. Nothing here renders differently on server and client, so any
         difference at this node came from outside the app. */
      suppressHydrationWarning
      {...rest}
    >
      {video ? (
        <video
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 h-full w-full object-cover",
            mediaClassName,
          )}
          src={video}
          style={gold ? { filter: "var(--media-gold)" } : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : null}

      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          aria-hidden
          role="presentation"
          alt=""
          src={image}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute inset-0 -z-10 h-full w-full object-cover",
            mediaClassName,
          )}
          style={{
            objectPosition: imagePosition,
            filter: gold
              ? "var(--media-gold) var(--plate-filter)"
              : "var(--plate-filter)",
          }}
        />
      ) : null}

      {scrim ? (
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              scrim === "strong"
                ? "linear-gradient(to right," +
                  " var(--bg) 0%," +
                  " color-mix(in srgb, var(--bg) var(--masthead-scrim), transparent) 62%," +
                  " color-mix(in srgb, var(--bg) calc(var(--masthead-scrim) * 0.42), transparent) 82%," +
                  " transparent 100%)"
                : "linear-gradient(to right," +
                  " color-mix(in srgb, var(--bg) var(--plate-wash), transparent) 0%," +
                  " color-mix(in srgb, var(--bg) calc(var(--plate-wash) * 0.55), transparent) 55%," +
                  " transparent 100%)",
          }}
        />
      ) : null}

      {children}
    </div>
  );
}

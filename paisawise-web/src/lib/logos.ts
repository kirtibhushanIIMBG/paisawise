import fs from "node:fs";
import path from "node:path";

/**
 * Resolves brand logo files that have actually been dropped into
 * `public/logos/`, at build time.
 *
 * Server-only: it reads the filesystem, so it must never be imported from a
 * client component. The marquees that use it are all server-rendered.
 *
 * Why look rather than hard-code the paths: these are third-party trademarks
 * and none of them ship with this repo. If the paths were hard-coded, every
 * missing file would render as a broken image on the front page. Instead the
 * ribbon falls back to the typeset wordmark for any brand whose file is not
 * there, so the page is correct with no logos, all of them, or any subset —
 * and adding one is a file drop with no code change.
 */

const LOGO_DIR = path.join(process.cwd(), "public", "logos");
/** In preference order: vector first, then the raster fallbacks. */
const EXTENSIONS = [".svg", ".webp", ".png", ".jpg"] as const;

function findLogo(key: string): string | undefined {
  for (const ext of EXTENSIONS) {
    const file = `${key}${ext}`;
    try {
      if (fs.existsSync(path.join(LOGO_DIR, file))) return `/logos/${file}`;
    } catch {
      /* unreadable directory is the same as no logo */
    }
  }
  return undefined;
}

export type BrandItem = {
  label: string;
  /** Basename to look for under public/logos, without the extension. */
  key?: string;
  style?: React.CSSProperties;
  logo?: string;
};

/** Attaches `logo` to any brand whose file exists. */
export function withLogos<T extends BrandItem>(items: readonly T[]): T[] {
  return items.map((item) => {
    const logo = item.key ? findLogo(item.key) : undefined;
    return logo ? { ...item, logo } : { ...item };
  });
}

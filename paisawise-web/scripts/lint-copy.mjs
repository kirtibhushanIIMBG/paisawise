#!/usr/bin/env node
/**
 * Copy and palette lint.
 *
 * Enforces the two rules that are easy to state and easy to forget:
 *   1. The site must not read as generated. No em dashes, no antithesis
 *      cadence, no filler adjectives.
 *   2. The palette is locked. No raw hex and no Tailwind default colours.
 *
 * Run: node scripts/lint-copy.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath, not .pathname: the project path contains spaces.
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");

/** Files allowed to contain raw hex: the token definitions and the brand mark. */
const HEX_ALLOWED = [
  "src/app/globals.css",
  "src/components/brand/Logo.tsx",
];

const BANNED_WORDS = [
  "actually",
  "seamless",
  "seamlessly",
  "empower",
  "empowering",
  "leverage",
  "unlock",
  "elevate",
  "robust",
  "revolutionary",
  "game-changing",
  "cutting-edge",
  "best-in-class",
  "world-class",
  "supercharge",
  "effortless",
];

const TAILWIND_DEFAULTS =
  /\b(?:bg|text|border|ring|from|to|via|fill|stroke|divide|outline)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|purple|fuchsia|pink|rose)-\d{2,3}\b/;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if ([".ts", ".tsx", ".css", ".mdx"].includes(extname(p))) out.push(p);
  }
  return out;
}

const problems = [];
function flag(file, line, rule, detail) {
  problems.push({ file, line, rule, detail });
}

for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  const lines = readFileSync(file, "utf8").split("\n");

  let inBlockComment = false;

  lines.forEach((raw, i) => {
    const n = i + 1;
    if (raw.includes("lint-copy-ignore")) return;

    // Comments are not shipped copy. The framework annotations the marketing
    // spec requires ("PAS:AGITATE — no CTA here") live in comments and would
    // otherwise trip every rule below.
    const t = raw.trim();
    const opensBlock = t.includes("/*");
    const closesBlock = t.includes("*/");
    const isComment =
      inBlockComment ||
      opensBlock ||
      t.startsWith("//") ||
      t.startsWith("*") ||
      t.startsWith("{/*");
    if (opensBlock && !closesBlock) inBlockComment = true;
    if (closesBlock) inBlockComment = false;

    if (!isComment) {
      if (raw.includes("—")) flag(rel, n, "em-dash", t.slice(0, 78));

      for (const w of BANNED_WORDS) {
        if (new RegExp(`\\b${w}\\b`, "i").test(raw)) {
          flag(rel, n, `banned:${w}`, t.slice(0, 78));
        }
      }
    }

    const tw = raw.match(TAILWIND_DEFAULTS);
    if (tw) flag(rel, n, "tailwind-default-colour", tw[0]);

    if (!HEX_ALLOWED.includes(rel)) {
      const hex = raw.match(/#[0-9a-fA-F]{6}\b/);
      // ignore SVG gradient ids and url() refs, which are not colours
      if (hex && !raw.includes("url(#")) {
        flag(rel, n, "raw-hex", hex[0]);
      }
    }
  });
}

if (problems.length === 0) {
  console.log("copy lint: PASS — no em dashes, banned words, or off-palette colours.");
  process.exit(0);
}

const byRule = problems.reduce((acc, p) => {
  acc[p.rule] = (acc[p.rule] ?? 0) + 1;
  return acc;
}, {});

console.error(`copy lint: ${problems.length} issue(s)\n`);
for (const p of problems) {
  console.error(`  ${p.file}:${p.line}  [${p.rule}]  ${p.detail}`);
}
console.error("\nby rule:", byRule);
process.exit(1);

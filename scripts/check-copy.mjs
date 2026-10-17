#!/usr/bin/env node
/**
 * check-copy.mjs — the copy gate.
 *
 * Scans src/content/**\/*.ts (content only, never components) for the banned
 * filler vocabulary. The redesign's voice is short and declarative; none of
 * these words survive a rewrite that means anything.
 *
 * Modes:
 *   node scripts/check-copy.mjs            grace period: prints violations,
 *                                          exits 0 with a loud WARN. The copy
 *                                          rewrite is Phase 3; until it lands
 *                                          the old content still carries some
 *                                          of these words and the build must
 *                                          not break on them.
 *   node scripts/check-copy.mjs --strict   exits 1 on any violation. Phase 3
 *                                          flips the verify script to this.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import process from "node:process";

const ROOT = join(import.meta.dirname, "..");
const CONTENT_DIR = join(ROOT, "src", "content");
const STRICT = process.argv.includes("--strict");

/* Multi-word phrases first so the report names the phrase, not a fragment. */
const BANNED = [
  "digital transformation",
  "best-in-class",
  "state-of-the-art",
  "cutting-edge",
  "next-generation",
  "world-class",
  "solutions",
  "solution",
  "leverage",
  "empower",
  "seamless",
  "innovative",
  "synergy",
  "unlock",
  "elevate",
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".ts")) out.push(p);
  }
  return out;
}

let files;
try {
  files = walk(CONTENT_DIR);
} catch {
  console.error(`check-copy: cannot read ${CONTENT_DIR}`);
  process.exit(1);
}

const violations = [];
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const lower = line.toLowerCase();
    for (const word of BANNED) {
      const idx = lower.indexOf(word);
      if (idx === -1) continue;
      /* Word-boundary check so "resolution" does not trip "solution". */
      const before = lower[idx - 1];
      const after = lower[idx + word.length];
      const isWordChar = (c) => c !== undefined && /[a-z0-9]/.test(c);
      if (isWordChar(before) || isWordChar(after)) continue;
      violations.push({
        file: relative(ROOT, file),
        line: i + 1,
        word,
        text: line.trim(),
      });
      break; /* one report per line is enough */
    }
  });
}

if (violations.length === 0) {
  console.log(`check-copy: OK — ${files.length} content files clean.`);
  process.exit(0);
}

for (const v of violations) {
  console.log(`${v.file}:${v.line}  [${v.word}]  ${v.text}`);
}

if (STRICT) {
  console.error(`\ncheck-copy: FAIL — ${violations.length} banned-filler hit(s).`);
  process.exit(1);
}

console.log(
  `\ncheck-copy: WARN (grace period until Phase 3) — ${violations.length} banned-filler hit(s) in the pre-rewrite content. Phase 3 rewrites the copy and flips verify to --strict.`
);
process.exit(0);

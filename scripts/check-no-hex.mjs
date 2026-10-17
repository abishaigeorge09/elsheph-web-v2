#!/usr/bin/env node
/**
 * Design-system gate: no colour literal may appear in a .tsx file.
 *
 * Colour lives in exactly one place, the Layer A palette block in
 * src/app/globals.css. A hex literal in a component is a colour that survives
 * a palette swap, which is the failure mode this check exists to prevent.
 *
 * LEGACY holds the pre-rebuild components that still carry the old palette.
 * They are being replaced phase by phase. The list may only shrink: the check
 * fails if an entry no longer exists, so a deleted file cannot leave a stale
 * exemption behind for the next component to hide under.
 *
 * Run: node scripts/check-no-hex.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath, not .pathname: this repo lives under a path with spaces.
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");

/**
 * Pre-rebuild components still on the old palette. Emptied in Phase 7 with
 * the university rebuild — the last legacy component is gone, and the gate
 * now runs with no exemptions. It stays here (rather than being deleted) so
 * any future exemption has to be added visibly, against this comment.
 */
const LEGACY = new Set([]);

const HEX = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{1,5})?\b/;

/**
 * Strings that must never ship, checked across every file under src/.
 * - The Atlitos entity name: no such company is registered, so naming it
 *   would be a fabricated corporate claim.
 * - "epam": the site passed through a structural clone of another company's
 *   homepage. No trace of that origin may remain in the source.
 */
const FORBIDDEN = [
  { pattern: /Atlitos\s+Life\s+Pvt\.?\s*Ltd/i, why: "unregistered entity name" },
  { pattern: /epam/i, why: "reference to the cloned site's origin" },
];

async function walk(dir, extensions) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, extensions)));
    else if (extensions.some((ext) => entry.name.endsWith(ext))) out.push(full);
  }
  return out;
}

const failures = [];

// A legacy entry that no longer exists is a stale exemption.
for (const entry of LEGACY) {
  if (!existsSync(join(ROOT, entry))) {
    failures.push(
      `stale exemption: ${entry} no longer exists — remove it from LEGACY in scripts/check-no-hex.mjs`,
    );
  }
}

// Forbidden strings: every source file, no exemptions.
for (const file of await walk(SRC, [".ts", ".tsx", ".css"])) {
  const rel = relative(ROOT, file);
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    for (const { pattern, why } of FORBIDDEN) {
      if (pattern.test(line)) {
        failures.push(`${rel}:${index + 1}: ${why} — ${line.trim()}`);
      }
    }
  });
}

// Colour literals: .tsx only, legacy components exempt until replaced.
for (const file of await walk(SRC, [".tsx"])) {
  const rel = relative(ROOT, file);
  if (LEGACY.has(rel)) continue;

  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    // &#39; and friends are HTML entities, not colours.
    const stripped = line.replace(/&#[0-9a-zA-Z]+;/g, "");
    if (HEX.test(stripped)) {
      failures.push(`${rel}:${index + 1}: colour literal — ${line.trim()}`);
    }
  });
}

if (failures.length > 0) {
  console.error("Design-system gate failed:\n");
  for (const failure of failures) console.error(`  ${failure}`);
  console.error(
    `\n${failures.length} problem(s). Colours come from a semantic token in src/app/globals.css; forbidden strings must not ship at all.`,
  );
  process.exit(1);
}

console.log(
  LEGACY.size === 0
    ? "No colour literals in any .tsx — the gate runs with no exemptions."
    : `No colour literals in .tsx outside the ${LEGACY.size} pre-rebuild components awaiting replacement.`,
);

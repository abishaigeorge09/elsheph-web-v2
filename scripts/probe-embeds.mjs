#!/usr/bin/env node
/**
 * probe-embeds.mjs — can each live product site be shown in an iframe?
 *
 * Fetches every `url:` in src/content/products.ts (GET, redirects followed)
 * and reads the two headers that veto framing:
 *   - X-Frame-Options: DENY / SAMEORIGIN  → not embeddable
 *   - Content-Security-Policy: frame-ancestors that excludes other origins
 *     ('none', 'self', or an allowlist)   → not embeddable
 * A network failure also counts as not embeddable — a preview that cannot
 * load must fall back to the generated art, never to a grey box.
 *
 * Prints a table. Re-runnable: `npm run probe:embeds`. The ACTUAL results
 * get stamped into the ledger as `embeddable: true | false` by hand — this
 * script reports, it does not rewrite the ledger, so a flaky network run
 * cannot silently flip a field.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const LEDGER = join(import.meta.dirname, "..", "src", "content", "products.ts");
const TIMEOUT_MS = 15000;

/** Pull { id, url } pairs out of the ledger without executing TS. */
function readProducts() {
  const src = readFileSync(LEDGER, "utf8");
  const out = [];
  const entryRe = /\{[^{}]*?id:\s*"([^"]+)"[\s\S]*?\}/g;
  for (const match of src.matchAll(entryRe)) {
    const urlMatch = match[0].match(/url:\s*"([^"]+)"/);
    if (urlMatch) out.push({ id: match[1], url: urlMatch[1] });
  }
  return out;
}

/**
 * frame-ancestors 'none' or 'self' (or any allowlist that is not '*')
 * blocks our origin. Only a missing directive or a literal * permits us.
 */
function frameAncestorsBlocks(csp) {
  const directive = csp
    .split(";")
    .map((d) => d.trim())
    .find((d) => d.toLowerCase().startsWith("frame-ancestors"));
  if (!directive) return false;
  const sources = directive.split(/\s+/).slice(1).map((s) => s.toLowerCase());
  return !sources.includes("*");
}

async function probe({ id, url }) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "elsheph-embed-probe/1.0" },
    });
    const xfo = res.headers.get("x-frame-options") ?? "";
    const csp = res.headers.get("content-security-policy") ?? "";
    const xfoBlocks = /deny|sameorigin/i.test(xfo);
    const cspBlocks = csp !== "" && frameAncestorsBlocks(csp);
    return {
      id,
      url,
      status: res.status,
      xfo: xfo || "—",
      frameAncestors: cspBlocks ? "blocks" : csp ? "permits" : "—",
      embeddable: res.ok && !xfoBlocks && !cspBlocks,
    };
  } catch (err) {
    return {
      id,
      url,
      status: `ERR ${err.name ?? ""}`.trim(),
      xfo: "—",
      frameAncestors: "—",
      embeddable: false,
    };
  }
}

const products = readProducts();
if (products.length === 0) {
  console.error("probe-embeds: no urls found in the ledger — check the parser.");
  process.exit(1);
}

const results = await Promise.all(products.map(probe));

const pad = (s, n) => String(s).padEnd(n);
console.log(
  pad("id", 20) + pad("status", 10) + pad("x-frame-options", 17) +
    pad("frame-ancestors", 17) + "embeddable",
);
console.log("-".repeat(74));
for (const r of results) {
  console.log(
    pad(r.id, 20) + pad(r.status, 10) + pad(r.xfo, 17) +
      pad(r.frameAncestors, 17) + r.embeddable,
  );
}
console.log(
  `\nprobe-embeds: ${results.filter((r) => r.embeddable).length}/${results.length} embeddable. ` +
    "Stamp these values into products.ts as `embeddable:`.",
);

#!/usr/bin/env node
/**
 * gen-art.mjs — deterministic SVG art for the Porcelain & Sienna redesign.
 *
 * Writes committed, build-authoring-time assets to public/art/:
 *   public/art/products/{id}.svg   1000×1250, one per visibleProducts entry
 *   public/art/hero.svg            2400×1600, espresso-dominant
 *   public/art/insights.svg        1200×900, espresso-dominant
 *
 * Every composition is seeded from a stable string (the product id), so the
 * same id always yields the same art and different ids yield visibly
 * different compositions. Palette is strictly the five brand hexes below —
 * no photos, no people, no offices, nothing fake-case-study-adjacent.
 *
 * No dependencies. Re-run with `node scripts/gen-art.mjs` after adding a
 * product; the output is stable so diffs only appear when inputs change.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const ART_DIR = join(ROOT, "public", "art");
const PRODUCTS_DIR = join(ART_DIR, "products");

/** The whole palette. Nothing outside these five hexes may appear. */
const DEEP = "#582008"; // logo deep brown
const TERRA = "#a05838"; // terracotta
const BRASS = "#c08a4e"; // brass — art gradients only, which is exactly here
const CREAM = "#f6f4ee"; // the measured a16z cream
const ESPRESSO = "#211712"; // near-black espresso

/* ---------------------------------------------------------------- hashing */

/** FNV-1a 32-bit — stable, dependency-free string hash. */
function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/**
 * A tiny seeded PRNG (mulberry32) over the id hash, so each composition can
 * draw several stable values without hand-slicing hash bits.
 */
function rng(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------ svg pieces */

/**
 * feTurbulence grain overlay. `opacity` ~0.06 reads as paper grain, not
 * noise. The seed keeps even the grain deterministic per artwork.
 */
function grain(id, seed, opacity = 0.06) {
  return `
  <filter id="grain-${id}">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed % 997}" stitchTiles="stitch" />
    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.5 0.5 0.5 0 0" />
  </filter>
  <rect width="100%" height="100%" filter="url(#grain-${id})" opacity="${opacity}" />`;
}

/** Gaussian blur filter for the soft-edged ellipse. */
function soft(id, dev) {
  return `<filter id="soft-${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${dev}" /></filter>`;
}

/* ------------------------------------------------------- product artwork */

/**
 * One 1000×1250 composition per product id:
 *   - linear gradient at (hash % 360)°, 2–3 stops at hash-derived positions
 *   - one large soft-edged ellipse in a contrasting palette colour
 *   - a radial glow, then the grain overlay
 */
function productArt(id) {
  const W = 1000;
  const H = 1250;
  const hash = fnv1a(id);
  const rand = rng(hash);

  const angle = hash % 360;
  const rad = (angle * Math.PI) / 180;
  // Gradient vector through the viewBox centre at `angle`.
  const x1 = 50 - Math.cos(rad) * 50;
  const y1 = 50 - Math.sin(rad) * 50;
  const x2 = 50 + Math.cos(rad) * 50;
  const y2 = 50 + Math.sin(rad) * 50;

  // Base gradient: pick one of four palette pairings by hash.
  const pairings = [
    [DEEP, TERRA, ESPRESSO],
    [ESPRESSO, DEEP, TERRA],
    [TERRA, BRASS, DEEP],
    [DEEP, ESPRESSO, TERRA],
  ];
  const [c0, c1, c2] = pairings[hash % pairings.length];

  // 2–3 stops, middle stop position derived from the hash.
  const threeStops = hash % 3 !== 0;
  const midPos = 25 + Math.floor(rand() * 50); // 25–75%
  const stops = threeStops
    ? `<stop offset="0%" stop-color="${c0}" /><stop offset="${midPos}%" stop-color="${c1}" /><stop offset="100%" stop-color="${c2}" />`
    : `<stop offset="0%" stop-color="${c0}" /><stop offset="100%" stop-color="${c2}" />`;

  // One large soft-edged ellipse, placed off-centre by hash.
  const ellipseColor = [BRASS, TERRA, CREAM, BRASS][hash % 4];
  const ecx = Math.round(W * (0.2 + rand() * 0.6));
  const ecy = Math.round(H * (0.2 + rand() * 0.6));
  const erx = Math.round(W * (0.32 + rand() * 0.22));
  const ery = Math.round(erx * (0.55 + rand() * 0.5));
  const erot = Math.round(rand() * 180);
  const eop = ellipseColor === CREAM ? 0.32 : 0.5 + rand() * 0.25;

  // A quiet radial glow anchored to the opposite corner region.
  const gcx = ecx > W / 2 ? 15 : 85;
  const gcy = ecy > H / 2 ? 12 : 88;
  const glowColor = [TERRA, BRASS][hash % 2];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Abstract brand artwork">
  <defs>
    <linearGradient id="base-${id}" x1="${x1.toFixed(1)}%" y1="${y1.toFixed(1)}%" x2="${x2.toFixed(1)}%" y2="${y2.toFixed(1)}%">${stops}</linearGradient>
    <radialGradient id="glow-${id}" cx="${gcx}%" cy="${gcy}%" r="75%">
      <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.55" />
      <stop offset="60%" stop-color="${glowColor}" stop-opacity="0.12" />
      <stop offset="100%" stop-color="${glowColor}" stop-opacity="0" />
    </radialGradient>
    ${soft(id, 70 + Math.round(rand() * 40))}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#base-${id})" />
  <rect width="${W}" height="${H}" fill="url(#glow-${id})" />
  <ellipse cx="${ecx}" cy="${ecy}" rx="${erx}" ry="${ery}" fill="${ellipseColor}" opacity="${eop.toFixed(2)}" filter="url(#soft-${id})" transform="rotate(${erot} ${ecx} ${ecy})" />
  ${grain(id, hash)}
</svg>
`;
}

/* -------------------------------------------------------- fixed artworks */

/** 2400×1600 espresso-dominant panel for the homepage right panel. */
function heroArt() {
  const id = "hero";
  const seed = fnv1a("elsheph-hero");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 1600" role="img" aria-label="Abstract brand artwork">
  <defs>
    <linearGradient id="base-${id}" x1="0%" y1="0%" x2="86%" y2="100%">
      <stop offset="0%" stop-color="${ESPRESSO}" />
      <stop offset="58%" stop-color="${ESPRESSO}" />
      <stop offset="100%" stop-color="${DEEP}" />
    </linearGradient>
    <radialGradient id="glow-a-${id}" cx="78%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${BRASS}" stop-opacity="0.5" />
      <stop offset="55%" stop-color="${BRASS}" stop-opacity="0.1" />
      <stop offset="100%" stop-color="${BRASS}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow-b-${id}" cx="18%" cy="88%" r="80%">
      <stop offset="0%" stop-color="${TERRA}" stop-opacity="0.4" />
      <stop offset="60%" stop-color="${TERRA}" stop-opacity="0.08" />
      <stop offset="100%" stop-color="${TERRA}" stop-opacity="0" />
    </radialGradient>
    ${soft(id, 130)}
  </defs>
  <rect width="2400" height="1600" fill="url(#base-${id})" />
  <rect width="2400" height="1600" fill="url(#glow-a-${id})" />
  <rect width="2400" height="1600" fill="url(#glow-b-${id})" />
  <ellipse cx="1780" cy="520" rx="720" ry="430" fill="${TERRA}" opacity="0.5" filter="url(#soft-${id})" transform="rotate(-18 1780 520)" />
  <ellipse cx="1450" cy="1280" rx="560" ry="300" fill="${BRASS}" opacity="0.28" filter="url(#soft-${id})" transform="rotate(9 1450 1280)" />
  ${grain(id, seed)}
</svg>
`;
}

/** 1200×900 espresso-dominant band artwork for the insights top band. */
function insightsArt() {
  const id = "insights";
  const seed = fnv1a("elsheph-insights");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="Abstract brand artwork">
  <defs>
    <linearGradient id="base-${id}" x1="0%" y1="12%" x2="100%" y2="88%">
      <stop offset="0%" stop-color="${ESPRESSO}" />
      <stop offset="64%" stop-color="${ESPRESSO}" />
      <stop offset="100%" stop-color="${DEEP}" />
    </linearGradient>
    <radialGradient id="glow-${id}" cx="82%" cy="24%" r="80%">
      <stop offset="0%" stop-color="${BRASS}" stop-opacity="0.45" />
      <stop offset="55%" stop-color="${BRASS}" stop-opacity="0.1" />
      <stop offset="100%" stop-color="${BRASS}" stop-opacity="0" />
    </radialGradient>
    ${soft(id, 80)}
  </defs>
  <rect width="1200" height="900" fill="url(#base-${id})" />
  <rect width="1200" height="900" fill="url(#glow-${id})" />
  <ellipse cx="880" cy="640" rx="420" ry="240" fill="${TERRA}" opacity="0.45" filter="url(#soft-${id})" transform="rotate(-12 880 640)" />
  ${grain(id, seed)}
</svg>
`;
}

/* ---------------------------------------------------------------- write */

const { visibleProducts } = await import(
  new URL("../src/content/products.ts", import.meta.url).href
).catch(async () => {
  // Node cannot import .ts directly on older runtimes; fall back to a
  // minimal parse of the ledger for ids of non-unconfirmed products.
  const { readFileSync } = await import("node:fs");
  const src = readFileSync(join(ROOT, "src", "content", "products.ts"), "utf8");
  const entries = [...src.matchAll(/\{\s*id:\s*"([^"]+)"[\s\S]*?status:\s*"([^"]+)"/g)];
  return {
    visibleProducts: entries
      .filter(([, , status]) => status !== "unconfirmed")
      .map(([, id]) => ({ id })),
  };
});

mkdirSync(PRODUCTS_DIR, { recursive: true });

const written = [];
for (const product of visibleProducts) {
  const file = join(PRODUCTS_DIR, `${product.id}.svg`);
  writeFileSync(file, productArt(product.id));
  written.push(file);
}
writeFileSync(join(ART_DIR, "hero.svg"), heroArt());
written.push(join(ART_DIR, "hero.svg"));
writeFileSync(join(ART_DIR, "insights.svg"), insightsArt());
written.push(join(ART_DIR, "insights.svg"));

for (const f of written) console.log("wrote", f.replace(ROOT + "/", ""));
console.log(`gen-art: ${written.length} SVGs.`);

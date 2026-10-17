#!/usr/bin/env node
/**
 * gen-patterns.mjs — the brand pattern library, deterministic like gen-art.mjs.
 *
 * Writes three seamlessly tiling SVGs to public/patterns/:
 *   pattern-crook.svg   216×216  nested concentric arcs/fans echoing the
 *                                shepherd's-crook curl
 *   pattern-ogee.svg    216×216  interlocking pointed-arch diamond lattice
 *                                with small circles at the intersections
 *   pattern-arches.svg  163×217  tall repeated arches (newsletter family)
 *
 * All line-work is single-colour fine strokes in currentColor. The site
 * applies these through `.field-pattern`, which paints them via a CSS mask
 * with the field's own ink — only the stroke ALPHA matters here, so
 * currentColor (black when the file is rasterised standalone) is exact.
 *
 * No dependencies, no randomness: the same run always writes the same bytes.
 * Re-run with `node scripts/gen-patterns.mjs`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "patterns");
mkdirSync(OUT, { recursive: true });

const STROKE = 'fill="none" stroke="currentColor" stroke-width="1"';

/** Round to 2dp so the files stay byte-stable and small. */
const r2 = (n) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ crook */
/* Concentric arc fans centred on every tile corner (each corner's circle
   set continues seamlessly into the neighbouring tile's identical set),
   plus a nested curl of circles at the centre — the crook's spiral read
   as pure geometry. */
function crook() {
  const T = 216;
  const radii = [18, 36, 54, 72, 90, 108];
  const corners = [
    [0, 0],
    [T, 0],
    [0, T],
    [T, T],
  ];
  let body = "";
  for (const [cx, cy] of corners) {
    for (const rr of radii) {
      body += `<circle cx="${cx}" cy="${cy}" r="${rr}" ${STROKE}/>`;
    }
  }
  /* The centre curl: circles shrinking toward an off-centre eye, the way
     the crook's head coils. Fully inside the tile, so it tiles trivially. */
  const curl = [
    [108, 108, 40],
    [104, 104, 30],
    [100, 101, 21],
    [97, 99, 13],
    [95, 98, 6],
  ];
  for (const [cx, cy, rr] of curl) {
    body += `<circle cx="${cx}" cy="${cy}" r="${rr}" ${STROKE}/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216">${body}</svg>`;
}

/* ------------------------------------------------------------------- ogee */
/* An ogee (pointed-arch) diamond joining the four edge midpoints, its
   sides drawn as S-curves; the complementary corner arcs interlock with
   the neighbouring tiles' diamonds; small circles sit at the lattice
   intersections (edge midpoints, so each neighbour completes them). */
function ogee() {
  const T = 216;
  const M = T / 2;
  const k = 34; // S-curve pull
  /* One ogee side from (x1,y1) to (x2,y2): cubic with controls pulled
     perpendicular to the chord, alternating, giving the pointed arch. */
  const side = (x1, y1, x2, y2, sign) => {
    /* unit normal of the chord, pulled to `sign`'s side */
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const nx = (-dy / len) * sign;
    const ny = (dx / len) * sign;
    const c1 = [r2(x1 + dx * 0.25 + nx * k), r2(y1 + dy * 0.25 + ny * k)];
    const c2 = [r2(x2 - dx * 0.25 - nx * k), r2(y2 - dy * 0.25 - ny * k)];
    return `M${x1} ${y1} C${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${x2} ${y2}`;
  };
  const mids = [
    [M, 0],
    [T, M],
    [M, T],
    [0, M],
  ];
  let body = "";
  /* Both pulls of every side: the two S-curve families cross at the edge
     midpoints, forming the pointed diamonds and their interlocked inverse. */
  for (let i = 0; i < 4; i++) {
    const [x1, y1] = mids[i];
    const [x2, y2] = mids[(i + 1) % 4];
    body += `<path d="${side(x1, y1, x2, y2, 1)}" ${STROKE}/>`;
    body += `<path d="${side(x1, y1, x2, y2, -1)}" ${STROKE}/>`;
  }
  /* Small circles at the intersections. Edge-midpoint circles are halved
     by the tile edge and completed by the neighbour. */
  for (const [cx, cy] of mids) {
    body += `<circle cx="${cx}" cy="${cy}" r="5" ${STROKE}/>`;
  }
  body += `<circle cx="${M}" cy="${M}" r="5" ${STROKE}/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216">${body}</svg>`;
}

/* ----------------------------------------------------------------- arches */
/* One tall arch per tile, columns shared with the horizontal neighbour
   (jamb lines sit ON the tile edge), two nested arches inside, a spring
   line and a base line that run edge to edge. */
function arches() {
  const W = 163;
  const H = 217;
  const base = H - 14;
  let body = "";
  const arch = (inset) => {
    const x1 = inset;
    const x2 = W - inset;
    const rr = (x2 - x1) / 2;
    const spring = 14 + inset + rr; // crown clears the tile top by 14+inset
    return `M${x1} ${base} L${x1} ${spring} A${rr} ${rr} 0 0 1 ${x2} ${spring} L${x2} ${base}`;
  };
  for (const inset of [0, 14, 28]) {
    body += `<path d="${arch(inset)}" ${STROKE}/>`;
  }
  /* Base line, edge to edge, and a keystone dot in the crown. */
  body += `<path d="M0 ${base} L${W} ${base}" ${STROKE}/>`;
  body += `<circle cx="${W / 2}" cy="${14 + 10}" r="3" ${STROKE}/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${body}</svg>`;
}

const files = {
  "pattern-crook.svg": crook(),
  "pattern-ogee.svg": ogee(),
  "pattern-arches.svg": arches(),
};

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, name), `${svg}\n`);
  console.log(`wrote public/patterns/${name} (${svg.length} bytes)`);
}

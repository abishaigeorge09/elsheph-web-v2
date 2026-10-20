/**
 * Direction C, "Idea to running": the script the hero performs.
 *
 * Each product's idea sentence and three plan lines are restatements of the
 * product's `description` in src/content/products.ts and nothing more. No
 * feature, user or number appears here that the description does not state.
 *
 * Each wireframe is traced from the real screenshot in public/products/
 * (1280x800): the boxes and lines sit where the screenshot's wordmark,
 * nav, headline, copy, buttons and cards sit, so the Build beat draws the
 * actual layout that the Running beat then resolves into.
 */

import { visibleProducts, type Product } from "@/content/products";

/* ---------------------------------------------------------------- beats */

export type BeatId = "idea" | "plan" | "build" | "running";

export type Beat = { id: BeatId; label: string; ms: number };

export const BEATS: readonly Beat[] = [
  { id: "idea", label: "Idea", ms: 2600 },
  { id: "plan", label: "Plan", ms: 2600 },
  { id: "build", label: "Build", ms: 3200 },
  { id: "running", label: "Running", ms: 4200 },
];

export const CYCLE_MS = BEATS.reduce((sum, beat) => sum + beat.ms, 0);

/** Typing occupies the first part of the Idea beat, then the sentence rests. */
export const TYPE_SHARE = 0.78;

/** Portion of the Build beat during which strokes start (the last stroke still gets its full draw time). */
export const DRAW_STAGGER_MS = 2200;
export const DRAW_STROKE_MS = 800;

export type Position = {
  productIndex: number;
  beatIndex: number;
  beat: Beat;
  /** 0..1 through the current beat. */
  progress: number;
};

export function locate(elapsedMs: number, productCount: number): Position {
  const cycle = Math.floor(elapsedMs / CYCLE_MS);
  const productIndex = cycle % productCount;
  let within = elapsedMs - cycle * CYCLE_MS;
  for (let i = 0; i < BEATS.length; i += 1) {
    const beat = BEATS[i];
    if (within < beat.ms || i === BEATS.length - 1) {
      return {
        productIndex,
        beatIndex: i,
        beat,
        progress: Math.min(1, within / beat.ms),
      };
    }
    within -= beat.ms;
  }
  /* Unreachable: the loop returns on the last beat. */
  return { productIndex, beatIndex: 0, beat: BEATS[0], progress: 0 };
}

/* ------------------------------------------------------------ wireframe */

export type Stroke =
  | { kind: "rect"; x: number; y: number; w: number; h: number; r?: number }
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number }
  | { kind: "circle"; cx: number; cy: number; r: number }
  | { kind: "poly"; points: string };

const R = (x: number, y: number, w: number, h: number, r = 0): Stroke => ({
  kind: "rect",
  x,
  y,
  w,
  h,
  r,
});
const L = (x1: number, y1: number, x2: number, y2: number): Stroke => ({
  kind: "line",
  x1,
  y1,
  x2,
  y2,
});
const C = (cx: number, cy: number, r: number): Stroke => ({
  kind: "circle",
  cx,
  cy,
  r,
});
const P = (points: string): Stroke => ({ kind: "poly", points });

/** The Scripture library page: wordmark, centre toggle, title, copy, a two-column card grid. */
function scriptureCard(ox: number, oy: number, h: number, full: boolean) {
  const out: Stroke[] = [R(ox, oy, 628, h, 6), L(ox + 25, oy + 24, ox + 112, oy + 24), R(ox + 25, oy + 42, 138, 22)];
  if (full) {
    out.push(L(ox + 25, oy + 86, ox + 560, oy + 86), L(ox + 25, oy + 108, ox + 450, oy + 108));
  }
  return out;
}

const WIREFRAMES: Record<string, Stroke[]> = {
  "elsheph-hymn": [
    R(24, 38, 119, 22),
    L(782, 56, 824, 56),
    L(856, 56, 906, 56),
    L(938, 56, 982, 56),
    L(1014, 56, 1070, 56),
    R(1102, 25, 153, 48, 24),
    L(64, 243, 313, 243),
    R(64, 268, 506, 40),
    R(64, 312, 166, 38),
    L(64, 375, 478, 375),
    L(64, 403, 475, 403),
    L(64, 431, 320, 431),
    R(64, 462, 154, 48, 24),
    R(242, 462, 166, 48, 24),
    L(64, 548, 252, 548),
    P("762,160 1100,145 1127,610 787,635"),
    L(776, 162, 800, 634),
    P("808,212 1078,203 1081,283 811,293"),
  ],
  "srm-student-store": [
    R(80, 22, 16, 16),
    L(1056, 30, 1088, 30),
    L(1108, 30, 1154, 30),
    L(1176, 30, 1206, 30),
    R(415, 272, 450, 62),
    R(340, 358, 595, 62),
    L(405, 461, 875, 461),
    L(440, 485, 840, 485),
    R(349, 528, 208, 46),
    R(569, 528, 184, 46),
    R(766, 528, 165, 46),
    L(594, 770, 686, 770),
  ],
  "elsheph-scripture": [
    R(114, 22, 76, 18),
    R(572, 13, 136, 36, 18),
    R(576, 16, 69, 30, 15),
    L(1070, 30, 1105, 30),
    L(1122, 30, 1166, 30),
    L(0, 62, 1280, 62),
    R(114, 195, 209, 34),
    L(114, 255, 575, 255),
    L(114, 282, 575, 282),
    L(114, 309, 218, 309),
    L(114, 392, 220, 392),
    R(1082, 380, 84, 26, 13),
    ...scriptureCard(0, 421, 135, true),
    ...scriptureCard(652, 421, 135, true),
    ...scriptureCard(0, 582, 136, true),
    ...scriptureCard(652, 582, 136, true),
    ...scriptureCard(0, 743, 80, false),
  ],
  "gmv-live": [
    C(48, 32, 16),
    R(78, 22, 78, 20),
    L(428, 32, 500, 32),
    R(520, 14, 112, 36, 18),
    L(653, 32, 699, 32),
    L(735, 32, 763, 32),
    L(1048, 32, 1088, 32),
    R(1108, 14, 140, 36, 18),
    R(562, 177, 156, 28, 14),
    R(362, 235, 556, 66),
    L(357, 340, 923, 340),
    L(376, 368, 904, 368),
    R(445, 414, 199, 48, 24),
    R(656, 414, 178, 48, 24),
    L(560, 661, 720, 661),
    ...[95, 315, 535, 755, 975].flatMap((x) => [R(x, 695, 210, 120, 12), R(x + 15, 708, 48, 16, 8)]),
  ],
};

/* --------------------------------------------------------------- script */

export type Scene = {
  product: Product;
  /** One short sentence: the product's core idea, from its description. */
  idea: string;
  /** Three short plan lines, each a restatement of the description. */
  plan: readonly [string, string, string];
  wireframe: readonly Stroke[];
};

/**
 * Copy per product. Every line below is a restatement of the matching
 * `description` in products.ts. Order is the order the hero plays them in:
 * richest description first.
 */
const SCRIPT: Record<string, Pick<Scene, "idea" | "plan">> = {
  "elsheph-hymn": {
    idea: "A hymn book a whole congregation sings from.",
    plan: [
      "One hymn book, three scripts.",
      "Telugu, transliteration and English.",
      "One page for the congregation.",
    ],
  },
  "srm-student-store": {
    idea: "A campus storefront where students preorder.",
    plan: [
      "A storefront for the campus.",
      "Students register demand first.",
      "Stock follows demand, nothing bought blind.",
    ],
  },
  "elsheph-scripture": {
    idea: "A scripture reading tool.",
    plan: [
      "Scripture, read on the web.",
      "A tool from Elsheph.",
      "Live at scripture.elsheph.com.",
    ],
  },
  "gmv-live": {
    idea: "A marketplace for live hosts.",
    plan: ["A marketplace.", "Built around live hosts.", "From Elsheph."],
  },
};

const ORDER = ["elsheph-hymn", "srm-student-store", "elsheph-scripture", "gmv-live"];

/**
 * The scenes the hero plays, in order. Only products from `visibleProducts`
 * with a live url and a traced wireframe take part, so nothing unconfirmed
 * or unreachable is ever drawn.
 */
export const scenes: readonly Scene[] = ORDER.flatMap((id) => {
  const product = visibleProducts.find((p) => p.id === id);
  const copy = SCRIPT[id];
  const wireframe = WIREFRAMES[id];
  if (!product || !product.url || !copy || !wireframe) return [];
  return [{ product, idea: copy.idea, plan: copy.plan, wireframe }];
});

/**
 * The product ledger.
 *
 * Rules that are not negotiable:
 * 1. `unconfirmed` items must be filtered out before render — use
 *    `visibleProducts`, never the raw `products` array, in a component.
 *    An unconfirmed item must never reach the DOM.
 * 2. `kind: "client"` marks work delivered FOR a client. The UI must frame
 *    those as client projects, not as Elsheph-owned products.
 * 3. Platform claims are literal. BelieversDiary is Android only; nothing in
 *    its copy may imply an iOS release.
 * 4. Atlitos must never be attributed to a "Pvt Ltd" entity anywhere in src/.
 *    No such company is registered, and naming one would be a fabricated
 *    corporate claim. scripts/check-no-hex.mjs enforces this; the exact
 *    forbidden string lives there and deliberately not here, so that the
 *    rule's own wording cannot trip its own check.
 */

export type Status = "live" | "coming-soon" | "unconfirmed";

/** "own" = an Elsheph product. "client" = work delivered for a client. */
export type Kind = "own" | "client";

export type Product = {
  id: string;
  name: string;
  description: string;
  status: Status;
  kind: Kind;
  /** Only set for products that are actually reachable today. */
  url?: string;
  /** Platforms the product genuinely ships on. Omit when it is web-only. */
  platforms?: readonly string[];
  /**
   * Whether the live site permits iframe embedding, as measured by
   * scripts/probe-embeds.mjs (X-Frame-Options / CSP frame-ancestors).
   * Stamped from real probe runs — never guessed. Re-run the probe and
   * restamp if a product's hosting changes. Omitted when there is no URL.
   */
  embeddable?: boolean;
  /** Lucide icon name the UI maps to a component. */
  icon: string;
};

/**
 * TODO(founder): two descriptions below are placeholders pending confirmation
 * — "elsheph-scripture" and "gmv-live". Neither product's positioning was
 * documented anywhere in this repo, so the copy states only what the URL
 * itself establishes. Replace with real copy before launch; do not guess at
 * features, users or scale.
 */
export const products: readonly Product[] = [
  {
    id: "elsheph-scripture",
    name: "Elsheph Scripture",
    description:
      "A scripture reading tool from Elsheph, live at scripture.elsheph.com.",
    status: "live",
    kind: "own",
    url: "https://scripture.elsheph.com",
    /* probed 2026-08-13: X-Frame-Options DENY */
    embeddable: false,
    icon: "BookOpen",
  },
  {
    id: "gosula-store",
    name: "Gosula Store",
    description:
      "A home resale shop. Photograph an item and the listing is drafted, priced and published from that one picture.",
    status: "live",
    kind: "own",
    url: "https://gosulastore.vercel.app",
    /* probed 2026-08-13: no framing headers */
    embeddable: true,
    icon: "ShoppingBag",
  },
  {
    id: "gmv-live",
    name: "GMV.LIVE",
    description: "An Elsheph product, live at gmv.live.",
    status: "live",
    kind: "own",
    url: "https://gmv.live",
    /* probed 2026-08-13: no framing headers */
    embeddable: true,
    icon: "Activity",
  },
  {
    id: "founder-clock",
    name: "Founder Clock",
    description:
      "A shared timezone portal for a distributed founding team. One glance shows who is awake.",
    status: "live",
    kind: "own",
    url: "https://founder-clock.vercel.app",
    /* probed 2026-08-13: no framing headers */
    embeddable: true,
    icon: "Clock",
  },
  {
    id: "srm-student-store",
    name: "SRM Student Store",
    description:
      "A campus preorder storefront. Students register demand before a product is stocked, so nothing is bought blind.",
    status: "live",
    kind: "own",
    url: "https://studentstore.vercel.app",
    /* probed 2026-08-13: no framing headers */
    embeddable: true,
    icon: "GraduationCap",
  },
  {
    id: "elsheph-hymn",
    name: "Elsheph Hymn",
    description:
      "A hymn book in three scripts: Telugu, transliteration and English. A congregation sings from one page.",
    status: "live",
    kind: "client",
    url: "https://hymn.elsheph.com",
    /* probed 2026-08-13: no framing headers */
    embeddable: true,
    icon: "Music",
  },
  {
    id: "jobsudarshan",
    name: "Jobsudarshan",
    description:
      "The online home of Job Sudarshan, a Telugu Christian author and Bible teacher. His books and study resources, in one place.",
    status: "live",
    kind: "client",
    url: "https://jobsudarshan.com",
    /* probed 2026-08-13: no framing headers */
    embeddable: true,
    icon: "Library",
  },
  {
    id: "believersdiary",
    name: "BelieversDiary",
    description:
      "A daily devotional journal on Android. Reading, reflection and prayer, kept in one place.",
    status: "live",
    kind: "own",
    platforms: ["Android"],
    icon: "NotebookPen",
  },
  {
    id: "synth",
    name: "synth",
    description:
      "A voice-first training companion for athletes. Built, not launched.",
    status: "coming-soon",
    kind: "own",
    icon: "Mic",
  },
  {
    id: "follow-me",
    name: "Follow Me",
    description:
      "A travel companion for visitors: find places, plan a route, reach a local guide. Client work; launch waits on client decisions.",
    status: "coming-soon",
    kind: "client",
    icon: "MapPin",
  },
  {
    id: "atlitos",
    name: "Atlitos",
    description: "Sports technology platform.",
    status: "unconfirmed",
    kind: "own",
    icon: "Trophy",
  },
  {
    id: "elsheph-hymn-mobile",
    name: "Elsheph Hymn Mobile",
    description: "Mobile companion to the hymn book.",
    status: "unconfirmed",
    kind: "client",
    icon: "Smartphone",
  },
];

/**
 * Products page copy. Phase 5 renders these; they live here so the page's
 * words sit under the same ledger rules as the product facts.
 */
export const productsPage = {
  h1: "Shipped, live, and in use.",
  stance:
    "Every product on this page exists. Most of them you can open right now.",
  emptyFilter: "Nothing matches. Loosen a filter.",
} as const;

/** The only list a component may render. Unconfirmed items never reach the DOM. */
export const visibleProducts: readonly Product[] = products.filter(
  (product) => product.status !== "unconfirmed",
);

/** Live products with a reachable URL — used by the command palette. */
export const liveProducts: readonly (Product & { url: string })[] =
  visibleProducts.filter(
    (product): product is Product & { url: string } =>
      product.status === "live" && typeof product.url === "string",
  );

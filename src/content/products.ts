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

/** "offline" = a live product whose address is temporarily not serving it. */
export type Status = "live" | "coming-soon" | "offline" | "unconfirmed";

/**
 * "own" = an Elsheph product. "client" = work delivered for a client.
 * "venture" = a separate company of the founder, shown with that label and
 * never presented as an Elsheph product.
 */
export type Kind = "own" | "client" | "venture";

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

export const products: readonly Product[] = [
  {
    id: "gmv-live",
    name: "GMV.LIVE",
    description:
      "A marketplace that matches live shopping hosts with the brands that need them.",
    status: "live",
    kind: "own",
    /* 2026-10-20: gmv.live renders blank; pointing at the working Vercel address for now. */
    url: "https://gmv-live.vercel.app",
    /* probed 2026-08-13: no framing headers */
    embeddable: true,
    icon: "Activity",
  },
  {
    id: "srm-student-store",
    name: "SRM Student Store",
    description:
      "A campus preorder storefront. Students register demand before a product is stocked, so nothing is bought blind.",
    status: "live",
    kind: "own",
    url: "https://studentstore.in",
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
    /* 2026-10-17: jobsudarshan.com redirects to a registrar parking page, so no
       link until the domain points back. Restore url + "live" when it does. */
    status: "offline",
    kind: "client",
    icon: "Library",
  },
  {
    id: "believersdiary",
    name: "BelieversDiary",
    description:
      "A daily devotional journal on Android. Reading, reflection and prayer, kept in one place.",
    status: "live",
    kind: "own",
    /* The product's page, with the Play Store download. Android only. */
    url: "https://believersdiary.vercel.app",
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
    url: "https://synthsports.co",
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
    id: "heypiko",
    name: "HeyPiko",
    description:
      "A tabletop companion that talks with aging parents in Telugu, Hindi and English, keeps their reminders and alerts the family.",
    status: "coming-soon",
    kind: "venture",
    url: "https://heypiko.co",
    icon: "Bot",
  },
  {
    id: "atlitos",
    name: "Atlitos",
    description:
      "A sports super app for athletes, coaches and academies: academy management, AI coaching and performance analytics in one place.",
    status: "coming-soon",
    kind: "own",
    url: "https://atlitos.com",
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

/**
 * The card image: a real screenshot of the product, captured 2026-10-17 into
 * public/products/. Products without a public web page (BelieversDiary,
 * Jobsudarshan while offline) use their app icon; Follow Me uses its approved
 * mockup screens.
 */
export function productImage(product: Product): string {
  return `/products/${product.id}.jpg`;
}

/** The words a card shows for each visible status. */
export const statusLabel: Record<Exclude<Status, "unconfirmed">, string> = {
  live: "Live",
  "coming-soon": "Coming soon",
  offline: "Temporarily offline",
};

/** The top row on /products, in this order. Ids resolve against the visible ledger. */
export const featuredIds = [
  "synth",
  "heypiko",
  "atlitos",
  "believersdiary",
] as const;

/** The only list a component may render. Unconfirmed items never reach the DOM. */
export const visibleProducts: readonly Product[] = products.filter(
  (product) => product.status !== "unconfirmed",
);

export const featuredProducts: readonly Product[] = featuredIds
  .map((id) => visibleProducts.find((p) => p.id === id))
  .filter((p): p is Product => Boolean(p));

/** Live products with a reachable URL — used by the command palette. */
export const liveProducts: readonly (Product & { url: string })[] =
  visibleProducts.filter(
    (product): product is Product & { url: string } =>
      product.status === "live" && typeof product.url === "string",
  );

/**
 * The four focus areas, expanded from services.ts for the /focus/* pages.
 *
 * Provenance rules:
 * - Each area expands the matching service description in the same voice:
 *   what the service IS and HOW it runs. No clients, numbers or case studies
 *   were added — none are attested, so none appear.
 * - `relatedProductIds` must reference real ids in products.ts, and only
 *   mappings that are genuinely true. Client builds sit under Product
 *   Development because that is literally what they were. Areas with no
 *   honest product mapping carry an empty list, and the page renders no
 *   related strip rather than a stretched one.
 * - `accent` is a CSS custom property name from globals.css, never a hex.
 *   Four distinct tints from the brand ramp, one per page.
 */

export type FocusArea = {
  slug: string;
  title: string;
  /** One serif-sized declarative sentence — the two-column editorial's left side. */
  statement: string;
  /** Short paragraphs for the editorial's right side. */
  body: readonly string[];
  /** CSS custom property name, e.g. "--brand". The page's one accent band. */
  accent: string;
  /**
   * The accent band's one line: a short restatement of a fact already in
   * this ledger or the process ledger. Never a new claim.
   */
  band: string;
  /** Ids from products.ts. Only genuinely related products; empty is honest. */
  relatedProductIds: readonly string[];
};

export const focusAreas: readonly FocusArea[] = [
  {
    slug: "product-development",
    title: "Product Development",
    statement: "We take a product from idea to running software.",
    body: [
      "Product development here means the whole arc: scope, design, build, deploy, and stay for what breaks. We start by restating your problem until we can pose it better than you did, then write the plan down and agree on it: what we will make, in what order, and what we will not.",
      "The build runs in short cycles with working software at the end of each one. You see progress, not status reports. Shipping is the midpoint: we watch what the software does in the world and keep making it better.",
      "The products page is the proof. Everything on it exists, and most of it you can open right now: our own products and the ones we built for clients.",
    ],
    accent: "--brand",
    band: "Shipping is the midpoint, not the finish.",
    relatedProductIds: ["global-hymns", "jobsudarshan", "follow-me"],
  },
  {
    slug: "it-services",
    title: "IT Services",
    statement: "The unglamorous work that keeps systems up.",
    body: [
      "Infrastructure, cloud moves, and maintenance are careful work, not clever work. We do them slowly enough to be safe and explain them plainly enough that you always know what changed and why.",
      "The habits are the same ones we hold on our own products: say what we are doing, what it costs, and what went wrong; set dates we can hit, then hit them; build things meant to still be running in five years.",
    ],
    accent: "--brand-deep",
    band: "Built to still be running in five years.",
    relatedProductIds: [],
  },
  {
    slug: "it-staffing",
    title: "IT Staffing",
    statement: "We send people we would hire ourselves.",
    body: [
      "Staffing here is placement, not resume forwarding. Engineers who have shipped join your team for as long as the work lasts, and the bar for who we send is the bar for who we keep.",
      "Because we build products of our own, we know what a shipping engineer looks like from the inside: how they scope, how they handle what breaks, how they finish. That is the filter every placement passes through.",
    ],
    accent: "--brass",
    band: "The bar for who we send is the bar for who we keep.",
    relatedProductIds: [],
  },
  {
    slug: "corporate-ld",
    title: "Corporate L&D",
    statement: "Teams leave having shipped something.",
    body: [
      "Training built around real builds, not slide decks. A program here covers the whole arc (requirements, architecture, build, test, deploy), and every participant does all of it, not one slice.",
      "The certificate rule is the same one our university programs hold: delivery earns it, attendance alone earns nothing. Shipping is the only proof of learning we accept, which is why every program ends with something running.",
    ],
    accent: "--field-olive",
    band: "Delivery earns the certificate. Attendance alone earns nothing.",
    relatedProductIds: [],
  },
];

/** Lookup by slug for the /focus/[slug] route. */
export function getFocusArea(slug: string): FocusArea | undefined {
  return focusAreas.find((area) => area.slug === slug);
}

/** The shared close on every focus page. One line, one button, no form. */
export const focusCta = {
  line: "Tell us what you need built.",
  label: "Start a conversation",
  href: "/about#contact",
} as const;

/**
 * Per-product page copy for /products/[slug].
 *
 * Every line here comes from one of three places: the product's own live
 * page (title and description), the Elsheph Vision deck (October 2026), or
 * the founder's LinkedIn profile text. Nothing is estimated. If a fact is
 * not in one of those, it is not here. `source` names where each entry was
 * read, so the next editor can re-check it.
 *
 * The ledger rules in products.ts still apply: only `visibleProducts` reach
 * the page, client work is framed as client work, BelieversDiary is Android
 * only.
 */

export type ProductDetail = {
  /** One line under the product name. */
  tagline: string;
  /** What it does. Short paragraphs. */
  about: readonly string[];
  /** Who it is for. */
  audience: string;
  /** The honest one-line status. */
  statusNote: string;
  /** Label for the live link button. */
  linkLabel?: string;
  /** Where these facts were read. */
  source: string;
};

export const productDetails: Record<string, ProductDetail> = {
  "gmv-live": {
    tagline: "A marketplace for live shopping hosts and brands.",
    about: [
      "GMV.LIVE matches and manages live shopping hosts for a brand, and gives hosts a place to start hosting live.",
    ],
    audience: "Brands that sell through live shopping, and the hosts who present for them.",
    statusNote: "Live now.",
    linkLabel: "Open GMV.LIVE",
    source: "gmv.live; Elsheph Vision deck, Oct 2026",
  },
  "srm-student-store": {
    tagline: "Campus preorders, so nothing is stocked blind.",
    about: [
      "Students pre-order the first drop, shape what gets made, or help build it. Demand is registered before a product is stocked, so nothing is bought blind.",
    ],
    audience: "Students on the SRM campus.",
    statusNote: "Live now.",
    linkLabel: "Open SRM Student Store",
    source: "studentstore.in; Elsheph Vision deck, Oct 2026",
  },
  "elsheph-hymn": {
    tagline: "A hymn book in three scripts, so a congregation sings from one page.",
    about: [
      "Every hymn appears in Telugu script, transliteration and English. A whole congregation can sing from the same page.",
      "Readers can read, sing and save their favourite hymns.",
      "Built by Elsheph as client work.",
    ],
    audience: "Telugu congregations and the people who sing with them.",
    statusNote: "Live now. Client project.",
    linkLabel: "Open the hymn book",
    source: "hymn.elsheph.com; Elsheph Vision deck, Oct 2026",
  },
  jobsudarshan: {
    tagline: "The online home of a Telugu Christian author and Bible teacher.",
    about: [
      "Job Sudarshan's books and study resources, in one place.",
      "Built by Elsheph as client work.",
    ],
    audience: "Readers and students of Job Sudarshan's books and Bible teaching.",
    statusNote:
      "Shipped for the client. The domain is temporarily not serving the site, so there is no link today.",
    source: "Elsheph Vision deck, Oct 2026; jobsudarshan.com checked 12 Nov 2026",
  },
  believersdiary: {
    tagline: "A daily diary and assembly for believers.",
    about: [
      "A daily devotional journal for the phone. Reading, reflection and prayer are kept in one place.",
      "BelieversDiary is available on Android. There is no iOS version.",
    ],
    audience: "Believers who keep a daily devotional habit.",
    statusNote: "Live now, on Android.",
    linkLabel: "Open the BelieversDiary page",
    source: "believersdiary.vercel.app; Elsheph Vision deck, Oct 2026",
  },
  synth: {
    tagline: "A voice-first training companion for athletes.",
    about: [
      "synth is an AI that reads an athlete's training and says something true about it. It keeps one record, owned by the athlete, that pulls together erg data, Apple Health and Strava.",
      "Computer vision reads splits and the force curve from an ordinary phone photo of a rowing monitor. Answers are honest: a predicted race time with a stated confidence range, and a readiness call on test days.",
      "synth belongs to Elsheph's sports technology work, which is part of Berkeley SkyDeck's Pad-13 programme.",
    ],
    audience: "Athletes who train with data, including rowers.",
    statusNote: "Built, not yet launched.",
    linkLabel: "See the synth site",
    source: "synthsports.co; Elsheph Vision deck, Oct 2026",
  },
  "follow-me": {
    tagline: "A travel companion for visitors.",
    about: [
      "Find places, plan a route and reach a local guide. Follow Me also coordinates tour groups.",
      "Built by Elsheph as client work.",
    ],
    audience: "Visitors to a city, and the guides and tour groups who host them.",
    statusNote:
      "In development. Launch waits on client decisions, so there is no public link yet.",
    source: "Elsheph Vision deck, Oct 2026",
  },
  heypiko: {
    tagline: "The healthcare robot for the world's 1 billion aging parents.",
    about: [
      "HeyPiko is building the healthcare robot for the world's 1 billion aging parents, so families can look after the people they love, wherever they live.",
      "A tabletop companion that talks with parents in Telugu, Hindi and English, keeps their reminders and alerts the family.",
    ],
    audience: "Aging parents, and the families who look after them from near or far.",
    statusNote:
      "In development. HeyPiko is a separate company, founded by Elsheph's founder.",
    linkLabel: "Visit heypiko.co",
    source: "Founder, 12 Nov 2026; heypiko.co",
  },
  atlitos: {
    tagline: "One app for India's athletes, coaches and academies.",
    about: [
      "Academy management, AI coaching and performance analytics, brought together so a club does not run on five disconnected tools.",
      "Courts and gear: booking from real availability, and price comparison for equipment.",
    ],
    audience: "Athletes, coaches and academies in India.",
    statusNote: "In development. The site is open at atlitos.com.",
    linkLabel: "Visit atlitos.com",
    source: "atlitos.com; Elsheph Vision deck, Oct 2026",
  },
};

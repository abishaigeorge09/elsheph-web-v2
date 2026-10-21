/**
 * Site-wide content ledger: identity, navigation, footer, contact channels.
 *
 * Everything here is verified fact. Never add a number, testimonial, logo,
 * client count or endorsement that is not independently confirmed.
 */

export type NavLink = {
  label: string;
  href: string;
  /** True when the href points at another origin. */
  external?: boolean;
};

export type FooterGroup = {
  heading: string;
  links: NavLink[];
};

export const site = {
  /** Registered trading name used across the site. */
  name: "Elsheph Systems",
  legalName: "Elsheph Systems",
  /** Used in the copyright line, alongside the current year. */
  copyrightHolder: "Elsheph Systems",
  tagline: "Make it real.",
  /**
   * Footer tagline slot (Fraunces italic, the a16z "Software Is Eating the
   * World" position). The shell reads `site.footerTagline ?? site.tagline`.
   */
  footerTagline: "From idea to running software.",
  description:
    "Elsheph Systems builds and ships software: its own products, client products, and the engineers who make both.",
  logo: {
    /**
     * The site is committed dark, so the cream knockout is the default
     * wordmark everywhere on the page. It is a true 495x86 crop, so it scales
     * on width with `h-auto` rather than needing object-cover.
     */
    wordmark: "/logos/elsheph-name-light.png",
    /** Dark-ink wordmark, for a light ground. Not used by the dark site. */
    wordmarkDark: "/logos/elsheph-name-cropped.png",
    /** Full lockup (symbol + wordmark), cream knockout, for a dark ground.
        True 485x120 trim, so it scales on height with `w-auto`. */
    full: "/logos/elsheph-full-light.png",
    /** Full lockup in its own colours, for the light ground. The header
        shows this on every page. */
    fullDark: "/logos/elsheph-full-cropped.png",
    symbol: "/logos/elsheph-symbol-light.png",
    /** The mark in its own colours (staff and vine), for a light ground. */
    symbolDark: "/logos/elsheph-symbol-cropped.png",
  },
} as const;

/**
 * The homepage headline, split so one word can take the accent treatment
 * (terracotta italic in the Porcelain & Sienna system).
 *
 * Founder picks at first review — default is #1. The alternates stay here as
 * data-shaped comments so switching is a one-line edit, not a rewrite:
 *
 *   2. { lead: "We ", accent: "ship", trail: " what others pitch." }
 *   3. { lead: "Software that leaves the ", accent: "whiteboard", trail: "." }
 */
export type HeroHeadline = {
  lead: string;
  /** The one word carrying the accent treatment. */
  accent: string;
  trail: string;
};

export const heroHeadline: HeroHeadline = {
  lead: "Make it ",
  accent: "real",
  trail: ".",
};

/** The homepage CTA under the headline. */
export const homeCta: NavLink = {
  label: "Start a conversation",
  href: "/about#contact",
};

export const emails = {
  sales: "sales@elsheph.com",
  contact: "contact@elsheph.com",
} as const;

export const socials: NavLink[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/elshephsystem",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/elshephsystem",
    external: true,
  },
];

/**
 * Primary navigation. Every href must resolve to a real route or a real
 * anchor that exists in the DOM — no placeholder "#" links.
 */
export const navLinks: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "University", href: "/university" },
];

export const primaryCta: NavLink = { label: "Contact", href: "/about#contact" };

/**
 * Anchors the command palette can jump to. The homepage itself is a single
 * non-scrolling viewport now, so every section that used to live there has
 * moved to a real route. Kept next to navLinks so a new section is
 * registered in exactly one place.
 */
export const sectionAnchors: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Insights", href: "/insights" },
  { label: "Newsletters", href: "/newsletters" },
  { label: "Showcase", href: "/showcase" },
  { label: "Internships", href: "/internships" },
  { label: "Product Development", href: "/focus/product-development" },
  { label: "IT Services", href: "/focus/it-services" },
  { label: "IT Staffing", href: "/focus/it-staffing" },
  { label: "Corporate L&D", href: "/focus/corporate-ld" },
  { label: "How We Work", href: "/focus/product-development#process" },
  { label: "About Elsheph", href: "/about#about" },
  { label: "Contact", href: "/about#contact" },
];

export const footerGroups: FooterGroup[] = [
  {
    heading: "Services",
    links: [
      { label: "Product Development", href: "/focus/product-development" },
      { label: "IT Services", href: "/focus/it-services" },
      { label: "IT Staffing", href: "/focus/it-staffing" },
      { label: "Corporate L&D", href: "/focus/corporate-ld" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about#about" },
      { label: "How We Work", href: "/focus/product-development#process" },
      { label: "University Collaboration", href: "/university" },
      { label: "Contact", href: "/about#contact" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "All products", href: "/products" },
      { label: "Insights", href: "/insights" },
      {
        label: "Elsheph Scripture",
        href: "https://scripture.elsheph.com",
        external: true,
      },
      { label: "GMV.LIVE", href: "https://gmv-live.vercel.app", external: true },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: emails.sales, href: `mailto:${emails.sales}`, external: true },
      {
        label: emails.contact,
        href: `mailto:${emails.contact}`,
        external: true,
      },
      ...socials,
    ],
  },
];

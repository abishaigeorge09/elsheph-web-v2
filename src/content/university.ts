/**
 * University page content ledger, created in Phase 3 for the Phase 7 rebuild.
 *
 * Provenance rules:
 * - The stats, testimonials and company names below were founder-attested
 *   this session and are carried over from the legacy UniversityPage
 *   verbatim in their facts. Do not add a number, name or quote without the
 *   same attestation.
 * - The companies are framed as placement outcomes ("Where alumni work"),
 *   not "corporate partners" — the stat label stays as attested, but the
 *   section must not imply formal partnership beyond what is confirmed.
 * - Atlitos is never named here: it is `unconfirmed` in the product ledger.
 *   Offer copy names no products at all.
 * - `university@elsheph.com` was NOT carried over — that inbox is
 *   unconfirmed. All contact routes through the confirmed
 *   `contact@elsheph.com` until the founder confirms the other exists.
 */

export type UniversityStat = {
  value: string;
  label: string;
  sub: string;
};

export type UniversityOffer = {
  title: string;
  description: string;
  /** Lucide icon name the UI maps to a component. */
  icon: string;
};

export type UniversityStep = {
  number: string;
  title: string;
  description: string;
};

export type UniversityTestimonial = {
  quote: string;
  /** Single-letter avatar initial. */
  initial: string;
  attribution: string;
  detail: string;
};

export const universityPage = {
  h1: "Students who ship before they graduate.",
  sub: "Elsheph runs internships and training inside live products. Students write code that users run. That is the whole idea.",
  cta: "Start a partnership",
  formButton: "Send inquiry",
} as const;

/** Founder-attested. Values and labels are fact; subs are voice. */
export const universityStats: readonly UniversityStat[] = [
  {
    value: "350+",
    label: "Students Trained",
    sub: "In structured, hands-on programs",
  },
  {
    value: "12+",
    label: "Corporate Partners",
    sub: "For placement and exposure",
  },
  {
    value: "2",
    label: "Regions With Clients",
    sub: "India and Europe",
  },
  {
    value: "100%",
    label: "Project-Based",
    sub: "Every program ships a real project",
  },
];

export const universityOffers: readonly UniversityOffer[] = [
  {
    title: "Internships inside live products",
    description:
      "Students join a live Elsheph product team and ship code that users run. Not exercises. Releases.",
    icon: "Rocket",
  },
  {
    title: "Training that covers the whole arc",
    description:
      "Requirements, architecture, build, test, deploy. Every student does all of it, not one slice.",
    icon: "Code",
  },
  {
    title: "A path into industry",
    description:
      "Alumni have gone on to placements at large firms. We make the introductions our students have earned.",
    icon: "Briefcase",
  },
  {
    title: "Certification by delivery",
    description:
      "A certificate here means a project shipped. Attendance alone earns nothing.",
    icon: "BadgeCheck",
  },
];

export const universitySteps: readonly UniversityStep[] = [
  {
    number: "01",
    title: "First conversation",
    description:
      "We meet department heads, placement cells and innovation leads, and agree on goals and structure.",
  },
  {
    number: "02",
    title: "Program design",
    description:
      "A curriculum and internship structure built around your students' semester calendar.",
  },
  {
    number: "03",
    title: "Onboarding and execution",
    description:
      "Students join live product teams with mentorship, sprints and regular reviews.",
  },
  {
    number: "04",
    title: "Certification and placement",
    description:
      "Certification issued on delivered work, with placement support and referrals.",
  },
];

/**
 * Founder-attested testimonials, carried over verbatim from the legacy page.
 */
export const universityTestimonials: readonly UniversityTestimonial[] = [
  {
    quote:
      "The internship at Elsheph gave me real shipping experience before I ever stepped into a company. I was writing production code within two weeks.",
    initial: "A",
    attribution: "Program Alumni",
    detail: "Now at Capgemini",
  },
  {
    quote:
      "The program structure is different. It's not just coding exercises. It's ownership. Students own a feature, from design to deployment.",
    initial: "P",
    attribution: "Department Head",
    detail: "Faculty Partner",
  },
];

/**
 * Founder-attested company names, verbatim. Presented as placement outcomes,
 * never as an endorsement or logo wall.
 */
export const universityCompaniesHeading = "Where alumni work";
export const universityCompanies: readonly string[] = [
  "L&T",
  "ServiceNow",
  "Capgemini",
  "Cognizant",
  "Infosys",
  "Accenture",
  "Wipro",
  "TCS",
];

export const universityFormRoles: readonly string[] = [
  "Department Head / HOD",
  "Placement Officer",
  "Innovation / Incubation Cell Lead",
  "Faculty Member",
  "Student",
  "Other",
];

/** All university contact routes through the confirmed general inbox. */
export const universityEmail = "contact@elsheph.com";

/**
 * The internships page speaks to STUDENTS; /university speaks to
 * institutions. Every fact here restates attested university-ledger content
 * — the internship offer, the program arc, certification by delivery. No new
 * numbers, no new claims.
 */
export const internshipsPage = {
  h1: "Internships that ship.",
  sub: "Interns at Elsheph join a live product team and write code that users run. Not exercises, not shadowing. Releases.",
  /** What an intern actually does, restated from the offers/process facts. */
  points: [
    {
      title: "A real team, from day one",
      description:
        "Interns sit inside a live product team with mentorship, sprints and regular reviews, the same rhythm as everyone else.",
    },
    {
      title: "The whole arc, not one slice",
      description:
        "Requirements, architecture, build, test, deploy. The internship covers all of it.",
    },
    {
      title: "Certification by delivery",
      description:
        "A certificate here means a project shipped. Attendance alone earns nothing.",
    },
  ],
  cta: "Ask about the next intake",
  /** Route through the university inquiry form; email is the fallback. */
  formHref: "/university#form",
} as const;

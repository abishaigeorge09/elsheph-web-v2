/**
 * Company pages ledger: About, Careers, Offices.
 *
 * Provenance rules:
 * - About prose expands the vision/mission narrative in values.ts — same
 *   facts, fuller sentences. The values themselves stay in values.ts; the
 *   About page imports both files rather than duplicating either.
 * - Careers carries no invented stats, perks or headcount. Open roles start
 *   empty and the page renders an honest well until real roles exist.
 * - Offices lists the city only. The street address is unverified, so it
 *   does not appear — see the comment on `offices.locations`.
 */

import { emails } from "./site";

export type OpenRole = {
  title: string;
  /** e.g. "Hyderabad" or "Remote". */
  location: string;
  /** One-line summary shown on the card. */
  summary: string;
};

export type OfficeLocation = {
  city: string;
  country: string;
  email: string;
};

export const about = {
  h1: "A small firm that ships.",
  intro: [
    "Elsheph Systems exists for one reason: to be the firm people call when they want software to actually exist. Not a deck, not a roadmap, not a prototype that dies in a demo — software that is live, that users open, that keeps running after everyone has gone home.",
    "The work takes three forms. We build products of our own and keep them running. We build products for clients and stay for what breaks. And we place and train engineers — because the people who make software real are the product too.",
    "Everything on this site follows from that. The products page links to things you can open right now. The team page shows the people who build, as they join it. Where we have nothing real to show yet, the page says so instead of pretending.",
  ],
} as const;

export const careers = {
  h1: "We hire engineers who have shipped.",
  body: [
    "Shipped means a real thing, used by real people, that you carried past the point where it got hard. A repository of started projects is not shipping. One finished one is.",
    "Working here is working close to the metal of the firm. We say what we are doing, what it costs, and what went wrong. We set dates we can hit, then hit them. We build things meant to still be running in five years, and the build runs in short cycles with working software at the end of each one.",
    "You will touch the whole arc — scope, design, build, deploy, and what breaks after — on our own products and on client work. There is no layer of the company where the software is somebody else's problem.",
  ],
  /**
   * TODO(founder): add real roles as `{ title, location, summary }`.
   * Empty is deliberate — the page renders an honest well, not fake listings.
   */
  openRoles: [] as readonly OpenRole[],
  cta: {
    label: "Write to us",
    email: emails.contact,
    line: "No open roles listed does not mean no interest. If you have shipped, say so.",
  },
} as const;

export const offices = {
  h1: "Where we are.",
  intro:
    "One office, one inbox. Write first; the conversation decides whether a visit is worth either of our time.",
  /**
   * City-level only. The street address is unverified, so it stays off the
   * page. TODO(founder): supply the full address if you want it published.
   */
  locations: [
    {
      city: "Hyderabad",
      country: "India",
      email: emails.contact,
    },
  ] as readonly OfficeLocation[],
} as const;

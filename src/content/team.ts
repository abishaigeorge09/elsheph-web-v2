/**
 * The team ledger. Role slots only — no invented people.
 *
 * Rules that are not negotiable:
 * 1. Zero invented names. A slot is a role, not a person. A card renders a
 *    role and the shared slot line until the founder supplies a real person.
 * 2. Founder drops real people in as `{ name, role, section, photo }` — add a
 *    `TeamMember` entry and the page replaces the matching slot. Photos go to
 *    `public/team/`, cropped 1:1 (the grid renders square portraits; an
 *    off-ratio image gets center-cropped and may lose a forehead).
 * 3. Shoot everyone against the SAME backdrop. The a16z audit found their
 *    single-backdrop consistency is the most expensive-looking detail on
 *    their team page — one wall, one light, and a small team photographs
 *    like an institution. Mixed backdrops photograph like a group chat.
 */

export type TeamSection =
  | "Leadership"
  | "Engineering"
  | "Design"
  | "University Programs";

export const teamSections: readonly TeamSection[] = [
  "Leadership",
  "Engineering",
  "Design",
  "University Programs",
];

export type TeamSlot = {
  role: string;
  /** The line the card shows where a name will go. Stance, not apology. */
  slotLabel: string;
  section: TeamSection;
};

/**
 * A real person, once the founder supplies one. None exist in the ledger yet
 * — see rule 2 above for how one arrives.
 */
export type TeamMember = {
  name: string;
  role: string;
  section: TeamSection;
  /** Path under public/, e.g. "/team/firstname-lastname.jpg". 1:1 crop. */
  photo: string;
};

/** One shared slot line, so every waiting card says the same thing. */
export const slotLine = "Joining the page soon.";

export const teamSlots: readonly TeamSlot[] = [
  { role: "Founder", slotLabel: slotLine, section: "Leadership" },
  { role: "Engineering Lead", slotLabel: slotLine, section: "Engineering" },
  { role: "Product Engineer", slotLabel: slotLine, section: "Engineering" },
  { role: "Design Lead", slotLabel: slotLine, section: "Design" },
  {
    role: "University Programs Lead",
    slotLabel: slotLine,
    section: "University Programs",
  },
  {
    role: "Program Mentor",
    slotLabel: slotLine,
    section: "University Programs",
  },
];

/** Real people go here. Empty until the founder sends them. */
export const teamMembers: readonly TeamMember[] = [];

export const teamPage = {
  h1: "The people who ship.",
  intro:
    "Elsheph is a small firm, and that is the point: the people you meet are the people who build. There is no account layer between you and the person writing your software. Real faces land on this page as each of us steps onto it.",
  /** The one real facet: the roles list, derived from the slots. */
  filterLabel: "Role",
  roles: teamSlots.map((slot) => slot.role),
} as const;

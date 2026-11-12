/**
 * The team ledger. Real people only, no invented names.
 *
 * Rules that are not negotiable:
 * 1. Zero invented people. Every entry is a real person who has agreed to be
 *    named. There are no empty role slots: a role nobody holds yet is not
 *    shown.
 * 2. A new team member arrives as `{ name, role, section, photo }`. Photos go
 *    to `public/team/`, cropped 1:1 (the grid renders square portraits; an
 *    off-ratio image gets center-cropped and may lose a forehead).
 * 3. Shoot everyone against the SAME backdrop. One wall, one light, and a
 *    small team photographs like an institution.
 * 4. Advisors are listed by name, title and organisation exactly as on the
 *    Board of Advisors slide (March 2026). No advisor photos exist, so the
 *    advisor cards are text only. Never stand a silhouette in for a face.
 */

export type TeamSection = "Leadership";

export type TeamMember = {
  name: string;
  role: string;
  section: TeamSection;
  /** Path under public/, e.g. "/team/firstname-lastname.jpg". 1:1 crop.
   *  Omit when no photo exists; the card renders as text only. */
  photo?: string;
};

export type Advisor = {
  name: string;
  title: string;
  organisation: string;
};

export const teamMembers: readonly TeamMember[] = [
  {
    name: "Abishai Gosula",
    role: "Founder and CEO",
    section: "Leadership",
    photo: "/team/abishai-gosula.jpg",
  },
  {
    name: "Rajesh Rangisetti",
    role: "Chief Technology Officer (CTO)",
    section: "Leadership",
  },
  {
    name: "Aaron Gosula",
    role: "Chief Operating Officer (COO)",
    section: "Leadership",
  },
  {
    name: "Debora Gosula",
    role: "Product Owner",
    section: "Leadership",
  },
];

export const advisors: readonly Advisor[] = [
  {
    name: "Dr. J A Chowdary",
    title: "Founder and Chairman",
    organisation: "International Startup Foundation",
  },
  {
    name: "Seshadri Vangala",
    title: "Chairman and Group CEO",
    organisation: "IFIN Global Group, SGlobal BV",
  },
  {
    name: "Aravinda De Silva",
    title: "Former Captain, ICC Hall of Fame",
    organisation: "Sri Lanka Cricket",
  },
  {
    name: "Prasad Gundumogula",
    title: "Founder",
    organisation: "Tabhi and Mondee",
  },
  {
    name: "Arun Boda",
    title: "Chief Operating Officer",
    organisation: "ANG Infotech",
  },
  {
    name: "Sathyendra Kumar",
    title: "Co-founder and Director",
    organisation: "International Startup Foundation",
  },
  {
    name: "Ram Alluri",
    title: "CEO and General Manager",
    organisation: "iClickInteractive",
  },
  {
    name: "Amy Peck",
    title: "Founder and CEO",
    organisation: "EndeavorXR",
  },
];

export const teamPage = {
  h1: "The people behind Elsheph.",
  intro:
    "Elsheph is a small firm, and that is the point: the person you meet is the person who builds. There is no account layer between you and the person writing your software.",
  advisorsHeading: "Board of Advisors",
} as const;

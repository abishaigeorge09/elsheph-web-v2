/**
 * More in development: the other projects Elsheph engineers are building.
 * Every project on the Interns Kickoff deck's "Portfolio overview" and "More
 * products we have built" slides appears here, apart from client work, the
 * products already shown on the Products page, and Elsheph Scripture and
 * Gosula Store, which the founder removed.
 *
 * Founder Clock and Gosula Store moved to the Products page on 12 Nov 2026
 * (Amma). Family Studio is left out: it is Raja's own, not Elsheph's.
 *
 * Every one-liner is the wording of the Elsheph Interns Kickoff deck
 * (23 October 2026, "Portfolio overview" and "More products we have built"),
 * lightly completed into a sentence. A link is added only when the page was
 * opened and returned 200 on 12 November 2026. No status beyond that is
 * claimed: the deck calls several of these live and others in progress, so the
 * page uses the founder's wording, "In development", for all of them and
 * lets a link speak for the public ones.
 */

export type LabProject = {
  name: string;
  oneLiner: string;
  /** Present only when the page is public and was checked. */
  url?: string;
  /** Shown for collaborative projects. */
  note?: string;
};

export const labProjects: readonly LabProject[] = [
  { name: "Faith Animation", oneLiner: "Turns scripture or a sermon into an animated video.", url: "https://faith-animation.vercel.app" },
  { name: "AidByFaith", oneLiner: "A Christian resource finder.", url: "https://aidbyfaith.vercel.app", note: "Collaborative" },
  { name: "Callsheet", oneLiner: "A marketplace for film crews." },
  { name: "SportScout", oneLiner: "Find sports gear fast." },
  { name: "FundMyGame", oneLiner: "Funding for student athletes." },
  { name: "RowIQ", oneLiner: "Rowing analytics." },
  { name: "Benji", oneLiner: "AI coaching from video." },
  { name: "BracketForge", oneLiner: "Tournament brackets." },
  { name: "SkillForge", oneLiner: "Skills for students." },
  { name: "Upskill", oneLiner: "A personal upskilling coach." },
  { name: "LaunchPad", oneLiner: "A startup incubation platform." },
  { name: "PrayerLink", oneLiner: "Prayer and gatherings." },
  { name: "ChurchSite", oneLiner: "A church website builder." },
  { name: "FamSync", oneLiner: "A family calendar and notes." },
  { name: "Handtext", oneLiner: "Turns text into handwriting." },
  { name: "Salon AR", oneLiner: "An AR haircut try-on." },
  { name: "Watchman", oneLiner: "A focus tool for macOS." },
  { name: "Variance", oneLiner: "Quant interview prep.", note: "Collaborative" },
];

export const labCopy = {
  heading: "More in development",
  intro:
    "What else Elsheph engineers are building. A locked padlock means the project is not public yet. An open one links to a page you can visit.",
  status: "In development",
} as const;

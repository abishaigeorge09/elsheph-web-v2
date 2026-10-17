/**
 * Vision, mission and values. Rewritten in Phase 3 to the redesign voice.
 *
 * Deliberately omitted: the four counters the old VisionMission section
 * animated ("3 Projects", "20+ Team", "10000+ Connects", "98% Satisfaction").
 * None of them are backed by evidence, so none of them go on the page.
 * Do not reintroduce a stat here without a source.
 */

export type Value = {
  name: string;
  description: string;
  /** Lucide icon name the UI maps to a component. */
  icon: string;
};

export type Principle = {
  title: string;
  description: string;
};

export const aboutEyebrow = "About";
export const aboutHeading = "A small firm that ships";

export const vision = {
  title: "Vision",
  description:
    "Be the firm people call when they want software to actually exist.",
  icon: "Eye",
} as const;

export const mission = {
  title: "Mission",
  description:
    "Build real products, place real engineers, and teach by shipping.",
  icon: "Zap",
} as const;

/**
 * The narrative band's statement: the vision, split so one phrase can take the
 * accent treatment. It is `vision.description` verbatim, only partitioned —
 * change the vision above and change this with it.
 */
export const narrative = {
  lead: "Be the firm people call when they want software to ",
  accent: "actually exist",
  trail: ".",
} as const;

export const values: readonly Value[] = [
  {
    name: "Transparency",
    description:
      "We say what we are doing, what it costs, and what went wrong.",
    icon: "Eye",
  },
  {
    name: "Reliability",
    description: "We set dates we can hit, then hit them.",
    icon: "CircleCheck",
  },
  {
    name: "Long-term thinking",
    description:
      "We build things meant to still be running in five years.",
    icon: "Clock",
  },
];

/**
 * @deprecated The operating-principles list is filler and Phase 6 stops
 * rendering it. The export stays only so the current About section keeps
 * compiling until then; do not wire it into anything new.
 */
export const principles: readonly Principle[] = [
  {
    title: "Quality First",
    description: "Work gets checked before it goes out.",
  },
  {
    title: "Client-Centric",
    description: "We aim at your outcome, not our invoice.",
  },
  {
    title: "Innovation Driven",
    description: "We adopt new tools when they earn it.",
  },
  {
    title: "Continuous Improvement",
    description: "Every project should leave us slightly better at this.",
  },
];

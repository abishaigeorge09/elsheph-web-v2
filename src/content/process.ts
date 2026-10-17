/**
 * How Elsheph works: the four engagement steps. Rewritten in Phase 3 to the
 * redesign voice — short, declarative, concrete. The step count and order are
 * unchanged; no new claims were added.
 */

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  /** Lucide icon name the UI maps to a component. */
  icon: string;
};

export const processEyebrow = "Process";
export const processHeading = "How we work";

export const processSteps: readonly ProcessStep[] = [
  {
    number: "01",
    title: "Understand the problem",
    description:
      "We ask until we can restate your problem better than you posed it. Then we write it down and agree on it.",
    icon: "Lightbulb",
  },
  {
    number: "02",
    title: "Design the build",
    description:
      "A plan you can read: what we will make, in what order, and what we will not.",
    icon: "PenTool",
  },
  {
    number: "03",
    title: "Build and ship",
    description:
      "Short cycles, working software at the end of each one. You see progress, not status reports.",
    icon: "Settings",
  },
  {
    number: "04",
    title: "Stay and improve",
    description:
      "Shipping is the midpoint. We watch what the software does in the world and make it better.",
    icon: "Zap",
  },
];

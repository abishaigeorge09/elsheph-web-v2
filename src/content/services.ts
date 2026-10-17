/**
 * The four offerings. The service names are fact; the descriptions were
 * rewritten in Phase 3 to the redesign voice — short, declarative, concrete.
 * No new claims were added.
 */

export type Service = {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name the UI maps to a component. */
  icon: string;
};

export const servicesEyebrow = "Services";
export const servicesHeading = "Four ways to hire us";

export const services: readonly Service[] = [
  {
    id: "product-development",
    title: "Product Development",
    description:
      "We take a product from idea to running software: scope, design, build, deploy, and stay for what breaks.",
    icon: "Boxes",
  },
  {
    id: "it-services",
    title: "IT Services",
    description:
      "Infrastructure, cloud moves, and the unglamorous work that keeps systems up. We do it carefully and explain it plainly.",
    icon: "ShieldCheck",
  },
  {
    id: "it-staffing",
    title: "IT Staffing",
    description:
      "Engineers who have shipped, placed on your team for as long as the work lasts. We send people we would hire ourselves.",
    icon: "Users",
  },
  {
    id: "corporate-l-and-d",
    title: "Corporate L&D",
    description:
      "Training built around real builds, not slide decks. Teams leave having shipped something, because that is the only proof of learning.",
    icon: "BookOpen",
  },
];

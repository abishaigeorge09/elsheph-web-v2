/**
 * "In their words": short, exact excerpts from public LinkedIn posts about
 * Elsheph, each attributed and linked. Collected 12 November 2026 from the
 * founder's LinkedIn and a LinkedIn search for Elsheph.
 *
 * Rules: an item appears only with its post URL; quotes are exact substrings
 * of the post; nothing is paraphrased inside quotation marks. Items waiting
 * for a URL (the Elbert Technology launch post, the Symbiosis Institute of
 * Technology posts, the Berkeley SkyDeck post) are held until one is supplied.
 */

export type LinkedInMention = {
  quote: string;
  who: string;
  role: string;
  context: string;
  url: string;
};

export const linkedInMentions: readonly LinkedInMention[] = [
  {
    quote: "\u2026officially launched at T-Hub on 24th December 2025",
    who: "Elbert Technology",
    role: "Technology partner",
    context: "On delivering the first milestone of the Jobsudarshan site, built with Elsheph",
    url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7409979958690869250/",
  },
  {
    quote:
      "We were delighted to host the Elsheph Internship Drive at Symbiosis Institute, Hyderabad!",
    who: "Symbiosis Institute of Technology, Hyderabad",
    role: "University partner",
    context: "On hosting Elsheph's internship drive",
    url: "https://www.linkedin.com/feed/update/urn:li:share:7453679681184366593/",
  },
  {
    quote:
      "Our team at Elsheph just wrapped up our Internship drive with students at Symbiosis.",
    who: "Abishai Gosula",
    role: "Founder and CEO, Elsheph",
    context: "On the internship drive at Symbiosis Institute of Technology, Hyderabad",
    url: "https://www.linkedin.com/posts/abishai-george-e-gosula_our-team-at-elsheph-just-wrapped-up-our-internship-share-7453817329596944384-HAcb",
  },
  {
    quote:
      "…the code reviews that taught more than any course could, and for trusting me with real problems instead of toy ones.",
    who: "Khushhal Kumar Bansal",
    role: "Software Engineer Intern",
    context: "On working on synth at Elsheph",
    url: "https://www.linkedin.com/posts/khushhal-kumar-bansal-8b1756392_internship-softwareengineer-fullstackdeveloper-ugcPost-7491207085611933696-wagz",
  },
  {
    quote:
      "…for their mentorship, support, and for providing an environment where I can continuously learn and grow.",
    who: "Kartikeya Sorout",
    role: "Software Engineer Intern",
    context: "On working on synth at Elsheph",
    url: "https://www.linkedin.com/posts/kartikeya-sorout_internship-softwareengineer-fullstackdeveloper-ugcPost-7490800328536289280-0SX0",
  },
];

export const linkedInCopy = {
  heading: "In their words",
  intro:
    "Short excerpts from public LinkedIn posts about working with Elsheph. Each links to the post.",
} as const;

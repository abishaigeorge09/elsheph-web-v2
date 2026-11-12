/**
 * Recognition and programmes. Only items that a company document in
 * ~/Documents/Ventures/Elsheph proves, or that a public page confirms.
 *
 * Held back until a source is opened and read (see the hand-off list):
 * the ISF Junicorn award, the Berkeley
 * SkyDeck programme, Chitkara CIIF (an application, not an incubation),
 * the Symbiosis MoU (no signed copy on file), and the NUS workshop result.
 */

export type RecognitionItem = {
  title: string;
  body: string;
  /** Short date or period shown beside the title. */
  when: string;
  /** What proves it. Linked when a public page exists. */
  evidence: { label: string; url?: string };
};

export const recognition: readonly RecognitionItem[] = [
  {
    title: "Collider Cup XVIII, UC Berkeley SCET",
    body: "At the Sutardja Center for Entrepreneurship & Technology's Collider Cup XVIII, GMV.live took 2nd Place and People's Choice, and synth won Most Innovative Technology. Abishai Gosula, Elsheph's founder, is named on both teams.",
    when: "May 2026",
    evidence: {
      label: "SCET: Collider Cup XVIII winners announced",
      url: "https://scet.berkeley.edu/connect/news/collider-cup-xviii-winners-announced-with-three-teams-advancing-to-pad-13",
    },
  },
  {
    title: "DPIIT-recognised startup",
    body: "Elsheph Systems India Private Limited is recognised by the Department for Promotion of Industry and Internal Trade, Government of India, under the Startup India programme. Recognition number DIPP271424.",
    when: "Recognised 2026",
    evidence: { label: "DPIIT recognition certificate (company document)" },
  },
  {
    title: "Incorporated in Hyderabad",
    body: "Elsheph Systems India Private Limited is a company limited by shares under the Companies Act 2013, with its registered office in Hyderabad, Telangana.",
    when: "August 2024",
    evidence: { label: "Certificate of Incorporation (company document)" },
  },
  {
    title: "Incubated at Geenovate Foundation, GCET",
    body: "Elsheph is incubated at the Geenovate Foundation technology business incubator at Geethanjali College of Engineering and Technology, under an incubation agreement.",
    when: "Agreement dated 5 August 2026",
    evidence: { label: "Incubation agreement (company document)" },
  },
  {
    title: "GAIN Fund grant",
    body: "Elsheph received a milestone-based grant from the Geethanjali Assistance for Innovation (GAIN) Fund.",
    when: "Received August 2026",
    evidence: { label: "GAIN Fund agreement and bank statement (company documents)" },
  },
];

export const recognitionPage = {
  h1: "Recognition and programmes",
  intro:
    "What other institutions have put on record about Elsheph. Each entry names its evidence, and nothing appears here that we cannot show.",
  note: "More will be added as each one is documented. Press and awards appear here once we hold the source.",
} as const;

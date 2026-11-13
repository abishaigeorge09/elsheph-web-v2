/**
 * Insights articles. Each is written from Elsheph's own documents (the Elsheph
 * Vision deck of October 2026, the Young People Programme kickoff of 23 October
 * 2026, the company registrations) or from a product's own public page, and
 * lists those sources at the foot. Where an Elsheph document has no public
 * link, the source line names the document and carries no link.
 *
 * Not written, because the files hold no such text: lessons from UC Berkeley
 * SCET or SkyDeck, and first-person lessons from working with student
 * engineers. Those wait for the founders' own words.
 */

import type { Article } from "./articleTypes";

export function formatArticleDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const articles: readonly Article[] = [
  {
    slug: "a-studio-that-trains-the-engineers-who-build-its-products",
    title: "A product studio that trains the engineers who build its products",
    summary:
      "Elsheph began as twenty years of mentoring and became a studio where students learn on live products. Why we built it this way, and how we measure it.",
    tag: "Company",
    date: "2026-11-12",
    author: "Elsheph Systems",
    readingMinutes: 4,
    body: [
      { type: "h2", text: "Twenty years before the company" },
      {
        type: "p",
        text: "Elsheph did not start as a company. It started as a family and its community mentoring young people from villages into city jobs. By the family's own count, that work touched 1,000 lives and helped more than 200 young people into work. It was done with no budget and no outside funding.",
      },
      {
        type: "p",
        text: "The limit was hours. Evenings moved roughly ten young people a year into work, and a thousand were still waiting.",
      },
      {
        type: "quote",
        text: "We were never short of love. We were short of hours.",
        attribution: "Dr Emmanuel Gosula, AMEN Conference 2026",
      },
      { type: "h2", text: "Character is not enough on its own" },
      {
        type: "p",
        text: "The mentors' view was that character opens the door and capability keeps you in the room. A good heart still needs a real skill. So the question became how to give a skill to far more than ten people a year.",
      },
      { type: "h2", text: "The answer: real products, run for real users" },
      {
        type: "p",
        text: "Elsheph is a product studio with three parts, and each feeds the others.",
      },
      {
        type: "list",
        items: [
          "Our own products: faith and publishing tools, commerce, sports technology and productivity.",
          "Client products, built end to end for clients in India and Europe, from first specification to production and support.",
          "The engineers who make both: students and graduates trained on those live products, then placed in the industry or into our own teams.",
        ],
      },
      {
        type: "p",
        text: "The training is project based. Every student joins a team on a product that real users depend on. The code they write ships, and certification is issued on delivered work, with placement support behind it. Nothing is a classroom simulation.",
      },
      {
        type: "p",
        text: "Two design choices keep this from depending on any one person. Cohorts teach cohorts, and the curriculum is written down. The people who train students are the same people shipping the products.",
      },
      { type: "h2", text: "Where it stands" },
      {
        type: "p",
        text: "Elsheph Systems was incorporated in Hyderabad in August 2024 and is a DPIIT-recognised startup. We have shipped 8 products and have 3 in development. More than 350 students have been trained in hands-on programmes, and we work with more than 12 corporate partners for placement and exposure.",
      },
      { type: "h2", text: "How we judge ourselves" },
      {
        type: "p",
        text: "Our own measure is not how many we trained. It is how many are paid for technical work who otherwise would not have been. That is a harder number to produce than a headcount, and it is the one we are working toward.",
      },
    ],
    sources: [
      { label: "Elsheph Vision deck, October 2026 (company document)" },
      { label: "Elsheph university programme page", url: "https://elsheph.com/university" },
      { label: "Elsheph products", url: "https://elsheph.com/products" },
      {
        label:
          "Certificate of Incorporation, 14 August 2024, and DPIIT recognition DIPP271424 (company documents)",
      },
    ],
  },
  {
    slug: "inside-the-16-week-young-people-programme",
    title: "Inside the 16-week Young People Programme",
    summary:
      "How the first batch of ten engineers is trained: three weeks of foundations, a specialist track, integration, then a team capstone that ships a full product.",
    tag: "Training",
    date: "2026-11-12",
    author: "Elsheph Systems",
    readingMinutes: 4,
    body: [
      {
        type: "p",
        text: "The Elsheph Young People Programme kicked off on 23 October 2026. The first batch has 10 engineers and 7 industry mentors, and the goal is for the batch to be product-ready by January 2027. This is a progress report on a programme that is under way, not a results report. We will publish results when there are results.",
      },
      { type: "h2", text: "Four phases over 16 weeks" },
      {
        type: "list",
        items: [
          "Weeks 1 to 3, Foundations: how the web works, programming logic, Git and GitHub, the software lifecycle with Agile and Scrum, and data structures.",
          "Weeks 4 to 9, Track specialisation: each engineer goes deep on one track.",
          "Weeks 10 to 12, Integration: API contracts, CI/CD and testing, so separate pieces work as one system.",
          "Weeks 13 to 16, Team capstone: each team ships a full product.",
        ],
      },
      {
        type: "p",
        text: "Every week includes stand-ups, demos and code reviews. Alongside the code, each engineer builds a CV and a GitHub portfolio and sits mock interviews.",
      },
      { type: "h2", text: "A complete team needs five roles" },
      {
        type: "p",
        text: "There are eight tracks. Five are core, because together they make a complete product team: Frontend, Backend, API and Middleware, QA and Testing, and DevOps and Cloud. Three are optional: Mobile Apps, AI and ML, and UI and UX Design. Each trainee picks a first and second choice.",
      },
      { type: "h2", text: "Pods, not lectures" },
      {
        type: "p",
        text: "Work happens in small pods with one mentor each, on real products. Nothing merges without review, and every pod demos weekly. The standard is written plainly: work is complete only after it passes QA.",
      },
      {
        type: "p",
        text: "We ask three things of every engineer: show up, make one reviewable contribution a week, and communicate.",
      },
      { type: "h2", text: "What comes after" },
      {
        type: "p",
        text: "Certification is issued on delivered work, with placement support behind it. Our success measure is paid technical work that would not otherwise have happened. For this first batch, that is what we will report on.",
      },
    ],
    sources: [
      { label: "Elsheph Interns Kickoff, 23 October 2026 (company document)" },
      { label: "Elsheph Vision deck, October 2026 (company document)" },
      { label: "Elsheph university programme page", url: "https://elsheph.com/university" },
    ],
  },
  {
    slug: "faith-and-publishing-tools-for-telugu-readers",
    title: "Faith and publishing tools: a hymn book, a diary and a publisher's shop",
    summary:
      "Three products from Elsheph's faith and publishing work: Global Hymns, Croire and the Job Sudarshan online shop. What each was for and where each stands.",
    tag: "Products",
    date: "2026-11-12",
    author: "Elsheph Systems",
    readingMinutes: 4,
    body: [
      { type: "h2", text: "Global Hymns: one page for a whole congregation" },
      {
        type: "p",
        text: "The problem was specific. Young people in Telugu congregations often cannot read Telugu script. Believers abroad, in the Netherlands, the UK and New Zealand, cannot pronounce the lyrics. And around 500 songs were locked in print.",
      },
      {
        type: "p",
        text: "Global Hymns puts every hymn in three scripts side by side: Telugu, transliteration and English. A whole congregation sings from one page. The book holds more than 500 hymns, readers can save their favourites, and a Dutch edition is planned. It was built as client work with Elbert Technology and launched on 15 April 2026.",
      },
      {
        type: "p",
        text: "The web app is live at hymn.elsheph.com. Android and iOS apps were scoped in the original proposal and are the next step.",
      },
      { type: "h2", text: "Croire: a social journal for Christians" },
      {
        type: "p",
        text: "Croire, called BelieversDiary until November 2026, is a social journal for Christians. Write what God is doing, pray with your church family, and walk it out together. It is on Android now, and the iPhone app is coming soon.",
      },
      { type: "h2", text: "Job Sudarshan: a publisher's online shop" },
      {
        type: "p",
        text: "Elsheph and Elbert Technology built the online shop for the books of Dr Job Sudarshan, a Telugu Christian author and Bible teacher, working with his publisher, Yesupadam Publishers. The launch ceremony was held at T-Hub, Hyderabad, on 24 December 2025.",
      },
      {
        type: "p",
        text: "The site's domain is temporarily not serving the shop, so there is no link here today. We will link it again when it is back.",
      },
      { type: "h2", text: "The common thread" },
      {
        type: "p",
        text: "Each product starts from a concrete reader with a concrete obstacle: a congregation that cannot read the script, a church family that wants to pray together, an author whose books need a shop. Each is also a live product that students and engineers at Elsheph can learn on.",
      },
    ],
    sources: [
      { label: "Global Hymns", url: "https://hymn.elsheph.com" },
      { label: "Croire", url: "https://croire-app.vercel.app" },
      { label: "International Hymn Book project proposal, February 2026 (company document)" },
      {
        label:
          "Product Launch Ceremony Schedule, Yesupadam Publishers, 24 December 2025 (company document)",
      },
      { label: "Elsheph Vision deck, October 2026 (company document)" },
    ],
  },
  {
    slug: "sports-technology-atlitos-and-synth",
    title: "Sports technology: Atlitos and synth",
    summary:
      "Two products in Elsheph's sports technology work. Atlitos is an operating system for Indian academies. synth reads an athlete's training and answers honestly.",
    tag: "Products",
    date: "2026-11-12",
    author: "Elsheph Systems",
    readingMinutes: 3,
    body: [
      {
        type: "p",
        text: "Both products below are unfinished, and this article says so. Neither is presented as launched.",
      },
      { type: "h2", text: "Atlitos: one app for Indian sport" },
      {
        type: "p",
        text: "Atlitos is a sports super app for athletes, coaches and academies, built for Indian sport with academies and their coaches at the centre. It brings academy management, AI coaching and performance analytics together, so that a club does not run on five disconnected tools.",
      },
      {
        type: "p",
        text: "It also covers courts and gear: booking from real availability, and price comparison for equipment. Atlitos is in development, and its site is open at atlitos.com.",
      },
      { type: "h2", text: "synth: an honest answer from your own data" },
      {
        type: "p",
        text: "synth is an AI that reads an athlete's training and says something true about it. It keeps one record, owned by the athlete, pulling together erg data, Apple Health and Strava.",
      },
      {
        type: "list",
        items: [
          "Computer vision reads splits and the force curve from an ordinary phone photo of a rowing monitor.",
          "Answers carry a stated confidence: a predicted race time with a confidence range, and a readiness call on test days.",
        ],
      },
      {
        type: "p",
        text: "synth is built and not yet launched. Its site is at synthsports.co.",
      },
      { type: "h2", text: "Why this matters for the studio" },
      {
        type: "p",
        text: "Sports technology is one of the four areas our own products come from, next to faith and publishing, commerce and productivity. Interns work on these products, which is how they learn on live work.",
      },
    ],
    sources: [
      { label: "Atlitos", url: "https://atlitos.com" },
      { label: "synth", url: "https://synthsports.co" },
      { label: "Elsheph Vision deck, October 2026 (company document)" },
    ],
  },
];

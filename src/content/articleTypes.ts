/**
 * Insights article shape.
 *
 * Rules (the founder's):
 * - Every claim comes from Elsheph's own material or a public source that is
 *   linked in `sources`. No invented numbers, quotes, clients or endorsements.
 * - No em dashes, no emojis, concise full sentences.
 * - `date` is the day the article was written, ISO format.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "quote"; text: string; attribution: string };

export type ArticleSource = {
  label: string;
  /** A real, reachable URL. Omit for an Elsheph document that has no public link. */
  url?: string;
};

export type Article = {
  slug: string;
  title: string;
  /** One or two sentences shown in the list and as the meta description. */
  summary: string;
  /** Short topic tag, for example "Training" or "Products". */
  tag: string;
  date: string;
  author: string;
  readingMinutes: number;
  body: readonly ArticleBlock[];
  sources: readonly ArticleSource[];
};

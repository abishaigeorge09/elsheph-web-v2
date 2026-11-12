import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NewsletterBand from "@/components/layout/NewsletterBand";
import { articles, formatArticleDate } from "@/content/articles";
import { linkedInCopy, linkedInMentions } from "@/content/linkedin";
import { emails, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Insights | ${site.name}`,
  description:
    "What Elsheph has built, for whom, what came of it and what we learned. Written from our own work, with sources.",
};

/**
 * The Insights page: the espresso band (the one sanctioned dark scope), then
 * the article list. Every article is written from Elsheph's own material or a
 * public source, and links its sources at the foot of the page.
 */
export default function InsightsPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-page">
      <section className="band-deep relative overflow-hidden pt-[var(--header-height)]">
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 hidden lg:block lg:w-[42%]"
        >
          <Image
            src="/art/insights.svg"
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="shell relative flex min-h-[340px] flex-col justify-center gap-10 py-14 lg:py-0">
          <div className="relative z-10 max-w-xl lg:w-1/2">
            <h1 className="az-h2 text-ink">
              What we built, for whom, and what we learned.
            </h1>
            <p className="mt-5 max-w-md text-[17px] text-ink-mid">
              Written from our own work: the products, the students who build
              them and the clients we ship for. Each piece links its sources.
            </p>
            <a
              href={`mailto:${emails.contact}`}
              className="link-arrow mt-7 text-sm font-semibold text-ink"
            >
              Get notified
            </a>
          </div>

          <div aria-hidden className="relative -mx-8 h-48 lg:hidden">
            <Image
              src="/art/insights.svg"
              alt=""
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="az-h2 text-ink">Field notes</h2>
          <a href={`mailto:${emails.contact}`} className="btn w-fit">
            Subscribe
          </a>
        </div>

        <ul className="mt-12 max-w-[820px]">
          {sorted.map((article, index) => (
            <li
              key={article.slug}
              className={index > 0 ? "border-t border-border" : ""}
            >
              <Link
                href={`/insights/${article.slug}`}
                className="group block py-8"
              >
                <p className="text-[13px] text-muted-foreground">
                  {article.tag} · {formatArticleDate(article.date)} ·{" "}
                  {article.readingMinutes} min read
                </p>
                <h3 className="az-h4 mt-2 text-ink transition-colors group-hover:text-accent">
                  {article.title}
                  <ArrowUpRight
                    className="ml-1 inline size-4 align-baseline"
                    aria-hidden
                  />
                </h3>
                <p className="mt-3 max-w-[62ch] text-[16px] text-ink-mid">
                  {article.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="shell py-16 sm:py-20">
          <h2 className="az-h2 text-ink">{linkedInCopy.heading}</h2>
          <p className="mt-4 max-w-xl text-[16px] text-ink-mid">
            {linkedInCopy.intro}
          </p>
          <div className="mt-10 grid gap-px md:grid-cols-3">
            {linkedInMentions.map((mention, index) => (
              <figure
                key={mention.url}
                className={`py-6 md:py-0 ${
                  index > 0
                    ? "max-md:border-t max-md:border-border md:border-l md:border-border md:pl-8"
                    : ""
                } ${index < linkedInMentions.length - 1 ? "md:pr-8" : ""}`}
              >
                <blockquote className="font-display text-[19px] leading-[1.45] text-ink italic">
                  &ldquo;{mention.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-[13px] text-ink-mid">
                  <span className="font-semibold text-ink">{mention.who}</span>
                  , {mention.role}. {mention.context}.{" "}
                  <a
                    href={mention.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-ink underline decoration-border-strong underline-offset-4 hover:text-accent"
                  >
                    LinkedIn post
                    <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBand />
    </div>
  );
}

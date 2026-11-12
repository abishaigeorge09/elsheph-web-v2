import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import NewsletterBand from "@/components/layout/NewsletterBand";
import { articles, formatArticleDate } from "@/content/articles";
import { site } from "@/content/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: site.name };
  return {
    title: `${article.title} | ${site.name}`,
    description: article.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div className="bg-page">
      <article className="shell pt-[calc(var(--header-height)+48px)] pb-20">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All insights
        </Link>

        <p className="mt-8 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {article.tag} · {formatArticleDate(article.date)} ·{" "}
          {article.readingMinutes} min read
        </p>
        <h1 className="az-h1 mt-4 max-w-3xl text-ink">{article.title}</h1>
        <p className="mt-5 max-w-2xl text-[19px] text-ink-mid">
          {article.summary}
        </p>
        <p className="mt-5 text-sm text-muted-foreground">
          By {article.author}
        </p>

        <div className="mt-12 max-w-[680px] space-y-6 text-[18px] leading-relaxed text-ink-mid">
          {article.body.map((block, index) => {
            switch (block.type) {
              case "h2":
                return (
                  <h2 key={index} className="az-h3 pt-6 text-ink">
                    {block.text}
                  </h2>
                );
              case "list":
                return (
                  <ul key={index} className="list-disc space-y-2 pl-6">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="border-l-2 border-border-strong pl-5 text-ink"
                  >
                    <p>{block.text}</p>
                    <footer className="mt-2 text-sm text-muted-foreground">
                      {block.attribution}
                    </footer>
                  </blockquote>
                );
              default:
                return <p key={index}>{block.text}</p>;
            }
          })}
        </div>

        <section className="mt-16 max-w-[680px] border-t border-border pt-8">
          <h2 className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Sources
          </h2>
          <ul className="mt-4 space-y-2 text-[15px]">
            {article.sources.map((source) => (
              <li key={source.label}>
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-ink underline decoration-border-strong underline-offset-4 hover:text-accent"
                  >
                    {source.label}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                ) : (
                  <span className="text-ink-mid">{source.label}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      </article>
      <NewsletterBand />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NewsletterBand from "@/components/layout/NewsletterBand";
import { articles, formatArticleDate } from "@/content/articles";
import { advisors, teamMembers } from "@/content/team";
import { featuredProducts, statusLabel } from "@/content/products";
import { emails, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Elsheph at a glance | ${site.name}`,
  description:
    "What Elsheph is, the proof so far, the products, the people and how to reach us. One page for partners, investors and hires.",
};

/** The company's headline facts. One source, so the numbers match everywhere. */
const proof: readonly { value: string; label: string; note: string }[] = [
  { value: "8", label: "Products shipped", note: "3 more in development" },
  { value: "350+", label: "Students trained", note: "In hands-on programmes" },
  { value: "12+", label: "Corporate partners", note: "For placement and exposure" },
  { value: "2", label: "Regions with clients", note: "India and Europe" },
];

const facts: readonly { label: string; value: string }[] = [
  { label: "Company", value: "Elsheph Systems India Private Limited" },
  { label: "Incorporated", value: "August 2024, Hyderabad" },
  { label: "Recognition", value: "DPIIT-recognised startup, DIPP271424" },
];

const parts: readonly { title: string; body: string }[] = [
  {
    title: "Our own products",
    body: "Faith and publishing tools, commerce, sports technology and productivity, conceived, built and run by Elsheph.",
  },
  {
    title: "Client products",
    body: "Built end to end for clients in India and Europe, from first specification to production and support.",
  },
  {
    title: "The engineers who make both",
    body: "Students and graduates trained on those live products, then placed in the industry or into our own teams.",
  },
];

export default function OverviewPage() {
  const latest = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  return (
    <div className="bg-page">
      <section className="shell pt-[calc(var(--header-height)+64px)] pb-16">
        <h1 className="az-h1 max-w-3xl text-ink">
          A product studio that trains the engineers who build its products.
        </h1>
        <p className="mt-6 max-w-2xl text-[19px] text-ink-mid">
          Elsheph builds software that is live and in use, for itself and for
          clients, and trains young engineers by putting them on that work.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/about#contact" className="btn">
            Start a conversation
          </Link>
          <Link href="/products" className="link-arrow text-sm font-semibold text-ink">
            See the products
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <dl className="shell grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label}>
              <dd className="font-display text-[44px] leading-none text-ink">
                {item.value}
              </dd>
              <dt className="mt-3 text-[13px] font-semibold tracking-[0.12em] text-ink uppercase">
                {item.label}
              </dt>
              <p className="mt-1 text-sm text-ink-mid">{item.note}</p>
            </div>
          ))}
        </dl>
        <dl className="shell grid gap-6 border-t border-border py-8 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-[15px] text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell py-16 md:py-24">
        <h2 className="az-h3 text-ink">What we do</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {parts.map((part, index) => (
            <div key={part.title}>
              <span
                aria-hidden
                className="font-display text-[32px] leading-none text-brand"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="az-h4 mt-4 text-ink">{part.title}</h3>
              <p className="mt-3 text-[16px] text-ink-mid">{part.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="shell py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="az-h3 text-ink">Products</h2>
            <Link href="/products" className="link-arrow text-sm font-semibold text-ink">
              All products
            </Link>
          </div>
          <ul className="mt-8 max-w-[820px]">
            {featuredProducts.map((product, index) => (
              <li
                key={product.id}
                className={index > 0 ? "border-t border-border" : ""}
              >
                <Link
                  href={`/products/${product.id}`}
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
                >
                  <span className="text-[17px] font-semibold text-ink transition-colors group-hover:text-accent">
                    {product.name}
                  </span>
                  <span className="text-sm text-ink-mid">
                    {product.status === "unconfirmed"
                      ? ""
                      : statusLabel[product.status]}
                    {product.kind === "venture" ? " · Founder's venture" : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="shell py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="az-h3 text-ink">People</h2>
            <Link href="/team" className="link-arrow text-sm font-semibold text-ink">
              The team and advisors
            </Link>
          </div>
          <p className="mt-6 max-w-2xl text-[17px] text-ink-mid">
            {teamMembers[0].name} leads Elsheph as {teamMembers[0].role}.{" "}
            {advisors.length} advisors sit on our Board of Advisors, from
            founders and chief executives to a former international captain.
          </p>
        </div>
      </section>

      <section className="shell py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="az-h3 text-ink">Recent writing</h2>
          <Link href="/insights" className="link-arrow text-sm font-semibold text-ink">
            All insights
          </Link>
        </div>
        <ul className="mt-8 max-w-[820px]">
          {latest.map((article, index) => (
            <li
              key={article.slug}
              className={index > 0 ? "border-t border-border" : ""}
            >
              <Link href={`/insights/${article.slug}`} className="group block py-6">
                <p className="text-[13px] text-muted-foreground">
                  {article.tag} · {formatArticleDate(article.date)}
                </p>
                <p className="az-h4 mt-2 text-ink transition-colors group-hover:text-accent">
                  {article.title}
                  <ArrowUpRight className="ml-1 inline size-4" aria-hidden />
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-mid">
          Recognition and programmes on record are listed on the{" "}
          <Link href="/showcase" className="underline underline-offset-4 hover:text-accent">
            recognition page
          </Link>
          .
        </p>
      </section>

      <section className="border-t border-border">
        <div className="shell py-16 md:py-24">
          <h2 className="az-h3 text-ink">Work with us</h2>
          <p className="mt-6 max-w-2xl text-[17px] text-ink-mid">
            Clients, university partners, investors and engineers who have
            shipped: write to us, and a person replies.
          </p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                General and partners
              </dt>
              <dd className="mt-1.5 text-[16px]">
                <a href={`mailto:${emails.contact}`} className="text-ink underline underline-offset-4 hover:text-accent">
                  {emails.contact}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Sales
              </dt>
              <dd className="mt-1.5 text-[16px]">
                <a href={`mailto:${emails.sales}`} className="text-ink underline underline-offset-4 hover:text-accent">
                  {emails.sales}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Office
              </dt>
              <dd className="mt-1.5 text-[16px] text-ink">Hyderabad, India</dd>
            </div>
          </dl>
          <Link href="/about#contact" className="btn mt-10 inline-flex">
            Start a conversation
          </Link>
        </div>
      </section>

      <NewsletterBand />
    </div>
  );
}

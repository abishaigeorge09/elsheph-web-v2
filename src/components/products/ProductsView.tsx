"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import ProductEmbed from "@/components/products/ProductEmbed";
import {
  productImage,
  productsPage,
  statusLabel,
  visibleProducts,
  type Kind,
  type Product,
  type Status,
} from "@/content/products";

type StatusFilter = "all" | Status;
type KindFilter = "all" | Kind;

const liveProducts = visibleProducts.filter((p) => p.status === "live");

/**
 * The Products page — the light translation of the a16z reference's Portfolio
 * mode (`.research/a16z-shots/portfolio.jpg`): a serif headline on the warm
 * ground, a horizontal scroll-snap strip of large 4:5 featured tiles carrying
 * a real screenshot of each product, then a cream band with underline-selects and
 * a white-card grid of everything.
 *
 * Deliberate divergences from the reference, both structural:
 * 1. The reference's portfolio mode is navy-dark; this one stays on the light
 *    system. The colour moves INTO the cards — each tile is full-bleed
 *    product screenshot, rather than onto the page ground.
 * 2. Filters are Status and Kind only. The reference filters by Sort, Focus
 *    Area, Stage and Search; Elsheph's ledger holds no such facets, and
 *    controls over data that does not exist would be fake UI.
 *
 * Ledger rules enforced here:
 * - `visibleProducts` is the only array rendered; `unconfirmed` entries never
 *   reach this component, let alone the DOM.
 * - `kind: "client"` renders an explicit CLIENT WORK / CLIENT PROJECT tag so
 *   client work is never read as an Elsheph-owned product.
 * - Platform claims are literal: BelieversDiary captions LIVE · ANDROID and
 *   nothing implies iOS or web for it.
 */

/** The featured-strip caption: platform truth or the client-work frame. */
function stripCaption(product: Product): string {
  if (product.kind === "client") return "Client work";
  const platform = product.platforms ? product.platforms.join(" · ") : "Web";
  return `Live · ${platform}`;
}

function FeaturedCard({
  product,
  embedAllowed,
}: {
  product: Product;
  embedAllowed: boolean;
}) {
  const inner = (
    <>
      {/* Living thumbnail: the real live site for embeddable products, the
          screenshot for everything else. ProductEmbed decides, and its
          screenshot base doubles as skeleton and fallback. */}
      <ProductEmbed
        url={product.url}
        embeddable={product.embeddable}
        name={product.name}
        artSrc={productImage(product)}
        allow={embedAllowed}
      />
      {/* Text over art or a live page always needs the scrim. */}
      <div className="art-scrim absolute inset-0" aria-hidden />
      <div className="relative p-5">
        <p className="over-art-title font-display text-[22px] leading-tight font-normal">
          {product.name}
        </p>
        <p className="over-art-caption mt-1.5 text-[11px] font-medium tracking-[0.14em] uppercase">
          {stripCaption(product)}
        </p>
      </div>
    </>
  );

  const className =
    "group snap-item relative flex aspect-[4/5] w-[240px] flex-col justify-end overflow-hidden sm:w-[280px] lg:w-[320px]";

  return product.url ? (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${product.name}, opens in a new tab`}
    >
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

/** An a16z underline-select: label, native select, hairline underneath. */
function UnderlineSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <label className="flex shrink-0 items-baseline gap-3 text-xs text-muted-foreground">
      <span className="font-medium tracking-[0.14em] uppercase">{label}</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none border-0 border-b border-border-strong bg-transparent py-1.5 pr-7 pl-0 text-sm text-ink outline-none focus-visible:border-accent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-1 size-3.5 -translate-y-1/2 text-muted-foreground"
        />
      </span>
    </label>
  );
}

function GridCard({
  product,
  embedAllowed,
}: {
  product: Product;
  embedAllowed: boolean;
}) {
  const isClient = product.kind === "client";
  const card = (
    <div className="group flex h-full flex-col rounded-[2px] border border-border bg-raised p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong">
      {/* Living thumbnail (or art) — see ProductEmbed for the rules. */}
      <div className="relative -mx-6 -mt-6 mb-5 aspect-[5/2] overflow-hidden">
        <ProductEmbed
          url={product.url}
          embeddable={product.embeddable}
          name={product.name}
          artSrc={productImage(product)}
          allow={embedAllowed}
        />
      </div>

      <p className="text-[15px] font-semibold text-ink">{product.name}</p>
      <p className="mt-2 flex-1 text-sm text-ink-mid">{product.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {product.status === "live" ? (
          <span className="bg-accent-quiet px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-accent uppercase">
            Live
          </span>
        ) : product.status !== "unconfirmed" ? (
          <span className="bg-raised-2 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-ink-mid uppercase">
            {statusLabel[product.status]}
          </span>
        ) : null}
        {isClient ? (
          <span className="border border-border-strong px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-ink-mid uppercase">
            Client project
          </span>
        ) : null}
        {product.platforms ? (
          <span className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            {product.platforms.join(" · ")}
          </span>
        ) : null}
        {product.url ? (
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-ink-mid transition-colors group-hover:text-accent">
            Visit
            <ArrowUpRight className="size-3" aria-hidden />
          </span>
        ) : null}
      </div>
    </div>
  );

  return product.url ? (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {card}
    </a>
  ) : (
    card
  );
}

export default function ProductsView() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [kind, setKind] = useState<KindFilter>("all");

  /* PERFORMANCE GUARD (spec): at 390px-class widths the featured strip is
     art tiles only — no iframes on mobile, data cost — and the grid may
     lazy-embed at most its FIRST THREE embeddable cards, art for the rest.
     Desktop lazy-embeds everywhere (the IntersectionObserver inside
     ProductEmbed caps how many live pages exist at once). Starts true (no
     embeds) so the server render and a slow hydration are the cheap path. */
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const apply = () => setIsMobile(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const filtered = useMemo(
    () =>
      visibleProducts.filter(
        (p) =>
          (status === "all" || p.status === status) &&
          (kind === "all" || p.kind === kind),
      ),
    [status, kind],
  );

  return (
    <div className="bg-page">
      {/* Hero */}
      <div className="shell pt-[calc(var(--header-height)+64px)] pb-10">
        <h1 className="az-h1 max-w-3xl text-ink">{productsPage.h1}</h1>
        <p className="mt-5 max-w-xl text-[17px] text-ink-mid">
          {productsPage.stance}
        </p>
      </div>

      {/* Featured strip — live products only, the reference's IPO strip. */}
      <div className="snap-row shell gap-6 pb-16">
        {liveProducts.map((product) => (
          <FeaturedCard
            key={product.id}
            product={product}
            embedAllowed={!isMobile}
          />
        ))}
      </div>

      {/* All products — the cream band with underline-selects and the grid. */}
      <div className="border-t border-border bg-surface">
        <div className="shell pt-14 pb-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="az-h3 text-ink">All products</h2>

            {/* 390px: the filter row scrolls sideways rather than wrapping. */}
            <div className="flex gap-8 overflow-x-auto pb-1">
              <UnderlineSelect
                label="Status"
                value={status}
                onChange={(v) => setStatus(v as StatusFilter)}
                options={[
                  { value: "all", label: "All" },
                  { value: "live", label: "Live" },
                  { value: "coming-soon", label: "Coming soon" },
                  ...(visibleProducts.some((p) => p.status === "offline")
                    ? [{ value: "offline", label: statusLabel.offline }]
                    : []),
                ]}
              />
              <UnderlineSelect
                label="Kind"
                value={kind}
                onChange={(v) => setKind(v as KindFilter)}
                options={[
                  { value: "all", label: "All" },
                  { value: "own", label: "Elsheph" },
                  { value: "client", label: "Client work" },
                ]}
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(() => {
              /* Mobile cap: only the first 3 embeddable cards may embed. */
              let embedRank = 0;
              return filtered.map((product) => {
                const canEmbed = Boolean(product.embeddable && product.url);
                const rank = canEmbed ? embedRank++ : -1;
                return (
                  <article key={product.id} className="h-full">
                    <GridCard
                      product={product}
                      embedAllowed={!isMobile || (canEmbed && rank < 3)}
                    />
                  </article>
                );
              });
            })()}
          </div>

          {filtered.length === 0 ? (
            <div className="awaiting mt-10">
              <p className="awaiting-note">{productsPage.emptyFilter}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

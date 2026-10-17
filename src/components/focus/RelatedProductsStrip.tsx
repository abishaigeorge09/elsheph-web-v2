"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ProductEmbed from "@/components/products/ProductEmbed";
import {
  productImage,
  statusLabel,
  visibleProducts,
  type Product,
} from "@/content/products";

/**
 * The focus pages' related-products strip: a compact row of living
 * thumbnails for the products genuinely built under that practice.
 *
 * Rules carried over from ProductsView (E3):
 * - Ids resolve against `visibleProducts` only, so an id that has slipped to
 *   `unconfirmed` in the ledger silently drops out rather than rendering.
 * - PERFORMANCE GUARD: at 390px-class widths every tile is art only —
 *   `allow={false}` into ProductEmbed, no iframes on mobile. Desktop
 *   lazy-embeds via ProductEmbed's own IntersectionObserver.
 * - `kind: "client"` is always captioned, so client work is never read as an
 *   Elsheph-owned product; platform/status captions stay literal.
 *
 * The parent decides whether this section exists at all (empty
 * relatedProductIds render nothing, heading included).
 */

function caption(product: Product): string {
  const status =
    product.status === "unconfirmed" ? "" : statusLabel[product.status];
  return product.kind === "client" ? `${status} · Client work` : status;
}

export default function RelatedProductsStrip({
  ids,
}: {
  ids: readonly string[];
}) {
  const products = ids
    .map((id) => visibleProducts.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  /* Starts true so the server render and slow hydrations take the cheap
     art-only path, same as ProductsView. */
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const apply = () => setIsMobile(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const card = (
          <div className="group flex h-full flex-col rounded-[2px] border border-border bg-raised transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong">
            {/* Living thumbnail (or art) — ProductEmbed decides. */}
            <div className="relative aspect-[5/2] overflow-hidden">
              <ProductEmbed
                url={product.url}
                embeddable={product.embeddable}
                name={product.name}
                artSrc={productImage(product)}
                allow={!isMobile}
              />
            </div>
            <div className="flex flex-1 items-baseline gap-3 p-5">
              <p className="text-[15px] font-semibold text-ink">
                {product.name}
              </p>
              <p className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                {caption(product)}
              </p>
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
            key={product.id}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            {card}
          </a>
        ) : (
          <div key={product.id} className="h-full">
            {card}
          </div>
        );
      })}
    </div>
  );
}

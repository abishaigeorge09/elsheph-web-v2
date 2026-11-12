import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import NewsletterBand from "@/components/layout/NewsletterBand";
import { productDetails } from "@/content/productDetails";
import {
  productImage,
  statusLabel,
  visibleProducts,
} from "@/content/products";
import { site } from "@/content/site";

/**
 * One page per product: what it does, who it is for, where it stands, and the
 * live link when there is one. Copy lives in content/productDetails.ts.
 * Only `visibleProducts` resolve, so an unconfirmed product is a 404.
 */

export function generateStaticParams() {
  return visibleProducts.map((product) => ({ slug: product.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = visibleProducts.find((p) => p.id === slug);
  const detail = productDetails[slug];
  if (!product || !detail) return { title: site.name };
  return {
    title: `${product.name} | ${site.name}`,
    description: detail.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = visibleProducts.find((p) => p.id === slug);
  const detail = productDetails[slug];
  if (!product || !detail || product.status === "unconfirmed") notFound();

  const isClient = product.kind === "client";

  return (
    <div className="bg-page">
      <div className="shell pt-[calc(var(--header-height)+48px)] pb-10">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All products
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="bg-accent-quiet px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-accent uppercase">
            {statusLabel[product.status]}
          </span>
          {isClient ? (
            <span className="border border-border-strong px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-ink-mid uppercase">
              Client project
            </span>
          ) : null}
          {product.kind === "venture" ? (
            <span className="border border-border-strong px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-ink-mid uppercase">
              Founder&apos;s venture
            </span>
          ) : null}
          {product.platforms ? (
            <span className="text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              {product.platforms.join(" · ")}
            </span>
          ) : null}
        </div>

        <h1 className="az-h1 mt-5 max-w-3xl text-ink">{product.name}</h1>
        <p className="mt-5 max-w-xl text-[17px] text-ink-mid">
          {detail.tagline}
        </p>
      </div>

      <div className="shell pb-16">
        <div className="relative aspect-[8/5] w-full max-w-[1040px] overflow-hidden border border-border bg-raised-2">
          <Image
            src={productImage(product)}
            alt={`${product.name}`}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <section className="shell grid gap-x-16 gap-y-10 pb-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="az-h4 text-ink">What it does</h2>
          <div className="prose mt-5 space-y-5 text-[17px] text-ink-mid lg:max-w-[640px]">
            {detail.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <dl className="space-y-8 lg:col-span-5">
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Who it is for
            </dt>
            <dd className="mt-2 text-[17px] text-ink">{detail.audience}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Status
            </dt>
            <dd className="mt-2 text-[17px] text-ink">{detail.statusNote}</dd>
          </div>
          {detail.links && detail.links.length > 0 ? (
            <div>
              <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                On the record
              </dt>
              <dd className="mt-2 space-y-2 text-[15px]">
                {detail.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-1.5 text-ink underline decoration-border-strong underline-offset-4 hover:text-accent"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="mt-1 size-3.5 shrink-0" aria-hidden />
                  </a>
                ))}
              </dd>
            </div>
          ) : null}
          {product.url && detail.linkLabel ? (
            <div>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center gap-2"
              >
                {detail.linkLabel}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          ) : null}
        </dl>
      </section>

      <NewsletterBand />
    </div>
  );
}

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import NewsletterBand from "@/components/layout/NewsletterBand";
import RelatedProductsStrip from "@/components/focus/RelatedProductsStrip";
import { focusAreas, focusCta, getFocusArea } from "@/content/focus";
import { processHeading, processSteps } from "@/content/process";
import { site } from "@/content/site";

/**
 * The four focus-area pages (E6) — the audit's "core template, tinted".
 *
 * A category page stays inside the core template and takes exactly ONE
 * accent event. Anatomy, top to bottom:
 *   1. Cream ground (the default page ground — no dark field).
 *   2. Serif h1 at the shared 42px scale, generous padding past the header.
 *   3. The two-column editorial: the ledger's `statement` as a large serif
 *      line on the left, `body` paragraphs at weight 300 on the right;
 *      stacks below lg.
 *   4. product-development only: the four process steps (id="process" — the
 *      old /about#process anchor re-points here). Composition call: the
 *      process describes an engagement arc, which is literally what product
 *      development is, so it mounts on that one page rather than as a strip
 *      on all four.
 *   5. The one accent event: a full-width band on the area's accent token.
 *      Each of the four areas carries a DIFFERENT token (--brand,
 *      --brand-deep, --brass, --field-olive). Ink is handled by the
 *      .accent-band-dark/.accent-band-light scopes in globals.css (contrast
 *      measured there); the band sets text in --color-ink only.
 *   6. Related products, only when the ledger maps any (a compact
 *      ProductEmbed strip — currently product-development alone). Areas
 *      with an empty list render no section at all, heading included.
 *   7. CTA close: one serif line + the one .btn, to /about#contact.
 *   8. NewsletterBand penultimate; SiteFooter arrives from the layout.
 */

/* Which ink scope each accent token takes. Contrast measured in
   globals.css at the .accent-band-* definition: cream ink clears --brand
   (4.74:1), --brand-deep (11.5:1) and --field-olive (5.4:1); --brass needs
   dark ink (6.0:1). Zero hex anywhere — tokens only. */
const LIGHT_ACCENTS: ReadonlySet<string> = new Set(["--brass"]);

export function generateStaticParams() {
  return focusAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getFocusArea(slug);
  if (!area) return { title: site.name };
  return {
    title: `${area.title} | ${site.name}`,
    description: area.statement,
  };
}

export default async function FocusAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getFocusArea(slug);
  if (!area) notFound();

  const bandScope = LIGHT_ACCENTS.has(area.accent)
    ? "accent-band-light"
    : "accent-band-dark";

  return (
    <div className="bg-page">
      {/* 1–2: cream ground, the serif h1 alone at the shared scale. */}
      <div className="shell pt-[calc(var(--header-height)+64px)] pb-14 md:pb-16">
        <h1 className="az-h1 max-w-[20ch] text-ink">{area.title}</h1>
      </div>

      {/* 3: the two-column editorial — statement left, body right. */}
      <section className="shell grid gap-x-16 gap-y-10 pb-20 md:pb-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="az-h3 max-w-[24ch] text-ink">{area.statement}</p>
        </div>
        <div className="prose space-y-6 text-[17px] text-ink-mid lg:col-span-7 lg:max-w-[640px]">
          {area.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* 4: the process, mounted on its natural home only. Keeps the
          legacy #process anchor alive at its new address. */}
      {area.slug === "product-development" ? (
        <section id="process" className="border-t border-border">
          <div className="shell py-16 md:py-24">
            <h2 className="az-h2 max-w-[20ch] text-ink">{processHeading}</h2>
            <ol className="mt-12 max-w-[720px]">
              {processSteps.map((step, index) => (
                <li
                  key={step.number}
                  className={index > 0 ? "border-t border-border" : ""}
                >
                  <div className="flex gap-8 py-8 sm:gap-12">
                    <span
                      aria-hidden
                      className="font-display text-[32px] leading-none font-normal text-brand"
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3 className="az-h4 text-ink">{step.title}</h3>
                      <p className="mt-3 text-[15px] text-ink-mid">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* 5: the one accent event. Ground = the area's token via --accent-bg;
          ink via the accent-band scope. Text is --color-ink ONLY (see the
          contrast note in globals.css — ink-mid fails on --brand). */}
      <section
        className={bandScope}
        style={{ "--accent-bg": `var(${area.accent})` } as CSSProperties}
      >
        <div className="shell py-20 md:py-28">
          <p className="az-h2 max-w-[26ch] text-ink">{area.band}</p>
        </div>
      </section>

      {/* 6: related products — only when the ledger maps any. */}
      {area.relatedProductIds.length > 0 ? (
        <section className="shell py-16 md:py-24">
          <h2 className="az-h3 text-ink">Built under this practice</h2>
          <div className="mt-10">
            <RelatedProductsStrip ids={area.relatedProductIds} />
          </div>
        </section>
      ) : null}

      {/* 7: the CTA close. */}
      <section className="border-t border-border">
        <div className="shell py-16 md:py-20">
          <p className="az-h3 max-w-[28ch] text-ink">{focusCta.line}</p>
          <a href={focusCta.href} className="btn mt-8">
            {focusCta.label}
          </a>
        </div>
      </section>

      {/* 8: penultimate site-wide band; footer comes from the layout. */}
      <NewsletterBand />
    </div>
  );
}

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import DarkChrome from "@/components/layout/DarkChrome";
import NewsletterBand from "@/components/layout/NewsletterBand";
import Contact from "@/components/sections/Contact";
import { about } from "@/content/company";
import { mission, values, vision } from "@/content/values";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: site.description,
};

/**
 * The About page — the manifesto treatment from the audited spec.
 *
 * One oxblood field with the ogee pattern at the LOUD setting (0.4) carries
 * the hero (a full viewport holding nothing but the hero-scale seal) and the
 * "Who we are" prose from the company ledger, with vision and mission as two
 * serif pull-quotes closing the field. Then the values band: the stone field
 * entered through a darker-taupe gradient edge, the three values numbered as
 * large serif statements — a manifesto being read, not cards. The page ends
 * on cream with the Contact section, whose form logic is untouched and whose
 * #contact anchor every menu CTA still targets. Services and the process
 * moved to the /focus pages in E6.
 */
export default function AboutPage() {
  return (
    <div>
      <DarkChrome />

      {/* The oxblood field: hero + who-we-are + pull-quotes, one continuous
          painted ground with the ogee lattice showing through at 0.4. */}
      <div
        className="field-oxblood field-pattern"
        style={
          {
            "--pattern-url": 'url("/patterns/pattern-ogee.svg")',
            "--pattern-opacity": 0.4,
          } as CSSProperties
        }
      >
        <div className="relative">
          {/* HERO — one full viewport, the seal alone at hero scale,
              painted in the field's ink via the currentColor mask. */}
          <section className="flex min-h-dvh items-center justify-center">
            <span
              role="img"
              aria-label={`${site.name} seal`}
              className="seal-mark size-[280px] text-ink sm:size-[380px] lg:size-[455px]"
            />
          </section>

          {/* WHO WE ARE — the ledger's intro prose on an ~880px measure.
              Keeps the legacy #about anchor (footer + search palette). */}
          <section id="about" className="shell pb-20 md:pb-28">
            <h1 className="az-h1 max-w-[24ch] text-ink">{about.h1}</h1>
            <div className="prose mt-8 max-w-[880px] space-y-6 text-ink-mid">
              {about.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Vision and mission as two serif pull-quotes, closing the
                oxblood field before the stone band takes over. */}
            <div className="mt-20 grid gap-x-16 gap-y-12 border-t border-line pt-14 lg:grid-cols-2">
              {[vision, mission].map((statement) => (
                <figure
                  key={statement.title}
                  className="border-l-2 border-line-strong pl-8"
                >
                  <blockquote className="az-h3 text-ink">
                    {statement.description}
                  </blockquote>
                  <figcaption className="mt-4 text-xs font-semibold tracking-[0.16em] text-ink-mid uppercase">
                    {statement.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* VALUES — the stone band, entered through the darker-taupe gradient
          edge. Each value: Fraunces numeral, the value set as a large serif
          statement, its one-sentence description. Generous vertical rhythm;
          no cards, no rules between them. */}
      <section className="field-stone">
        <div className="fade-taupe-top" aria-hidden />
        <div className="shell pt-6 pb-24 md:pb-32">
          <ol>
            {values.map((value, index) => (
              <li key={value.name} className="py-12 md:py-16">
                <span
                  aria-hidden
                  className="font-display text-[56px] leading-none text-brand md:text-[72px]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="az-h2 mt-5 max-w-[880px] text-ink">
                  {value.name}
                </p>
                <p className="prose mt-4 max-w-[640px] text-[17px] text-ink-mid">
                  {value.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services and HowWeWork moved to the /focus pages in E6: each
          service is now a full page under /focus/*, and the four process
          steps live on /focus/product-development#process. Every link that
          targeted /about#services or /about#process was re-pointed there. */}

      {/* Contact — form logic untouched; /about#contact is the site-wide
          target. Ends the page on cream, clear of the dark fields. */}
      <Contact />

      {/* Penultimate block site-wide: the newsletter band, above the footer. */}
      <NewsletterBand />
    </div>
  );
}

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import DarkChrome from "@/components/layout/DarkChrome";
import NewsletterBand from "@/components/layout/NewsletterBand";
import {
  internshipsPage,
  universitySteps,
  universityTestimonials,
  universityEmail,
} from "@/content/university";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Internships | ${site.name}`,
  description: internshipsPage.sub,
};

/**
 * The Internships page — the olive field (the Programs family colour) with
 * the crook pattern at the whisper setting. Speaks to students where
 * /university speaks to institutions.
 *
 * Every fact restates attested university-ledger content: the offer points,
 * the four-step arc, and the attested student quote. Nothing is invented.
 */
export default function InternshipsPage() {
  const studentQuote = universityTestimonials[0];

  return (
    <>
      <div
        className="field-olive field-pattern"
        style={
          {
            "--pattern-url": 'url("/patterns/pattern-crook.svg")',
            "--pattern-opacity": 0.05,
          } as CSSProperties
        }
      >
        <DarkChrome />
        <div className="relative">
          <div className="shell pt-[calc(var(--header-height)+64px)] pb-20">
            {/* No eyebrow — the serif headline stands alone. */}
            <h1 className="az-h1 max-w-[18ch] text-ink">{internshipsPage.h1}</h1>
            <p className="mt-6 max-w-[640px] text-[19px] leading-relaxed font-light text-ink">
              {internshipsPage.sub}
            </p>
          </div>

          {/* What an intern actually does — ruled rows, the dark-field list
              treatment the careers page established. */}
          <div className="shell pb-20">
            <div className="max-w-[880px] divide-y divide-line border-y border-line">
              {internshipsPage.points.map((point) => (
                <div
                  key={point.title}
                  className="grid gap-2 py-7 sm:grid-cols-[240px_1fr] sm:gap-10"
                >
                  <h2 className="font-display text-[21px] text-ink">
                    {point.title}
                  </h2>
                  <p className="text-[16px] leading-relaxed text-ink-mid">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The program arc, from the university ledger. */}
          <div className="shell pb-20">
            <h2 className="az-h2 text-ink">How a term runs</h2>
            <ol className="mt-10 max-w-[720px] space-y-9">
              {universitySteps.map((step) => (
                <li
                  key={step.number}
                  className="grid grid-cols-[64px_1fr] items-baseline gap-6"
                >
                  <span className="font-display text-[32px] text-accent tabular-nums">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[21px] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-ink-mid">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* The attested student quote — one voice, not a wall. */}
          <div className="shell pb-24">
            <figure className="max-w-[720px] border-l-2 border-accent pl-8">
              <blockquote className="font-display text-[22px] leading-relaxed text-ink italic">
                &ldquo;{studentQuote.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-ink-mid">
                {studentQuote.attribution} · {studentQuote.detail}
                {studentQuote.url ? (
                  <>
                    {" · "}
                    <a
                      href={studentQuote.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-accent"
                    >
                      LinkedIn post
                    </a>
                  </>
                ) : null}
              </figcaption>
            </figure>
          </div>

          {/* CTA close. */}
          <div className="shell pb-24">
            <div className="flex flex-col items-start gap-6 border-t border-line pt-12 sm:flex-row sm:items-center sm:justify-between">
              <p className="az-h3 max-w-[24ch] text-ink">
                {internshipsPage.cta}
              </p>
              <div className="flex items-center gap-6">
                <Link href={internshipsPage.formHref} className="btn">
                  Send an inquiry
                </Link>
                <a
                  href={`mailto:${universityEmail}`}
                  className="link-arrow text-sm font-semibold text-accent"
                >
                  {universityEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsletterBand />
    </>
  );
}

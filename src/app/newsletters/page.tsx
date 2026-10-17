import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { emails, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Newsletters | ${site.name}`,
  description:
    "One letter, written when there is something worth reading. No content calendar.",
};

/**
 * The Newsletters page — the audit's one-page-where-the-pattern-IS-the-page
 * move: the greige field with the arches tile at FULL strength, edge to
 * edge. The pattern is TONE-ON-TONE (.pattern-emboss — the ground nudged
 * toward ink), so at opacity 1 it reads as blind-embossed print stock the
 * type sits comfortably on, not accent-coloured wiring fighting the text.
 * Cards sit translucent so the print shows through them.
 *
 * ONE real card: Field Notes. Its cadence is stated honestly in prose — no
 * invented frequency, no fake second newsletter, no empty ghost cards. The
 * page is deliberately short: heading, the card, done — no dead pattern
 * field padding the height out.
 */
export default function NewslettersPage() {
  return (
    <div
      className="field-greige field-pattern pattern-emboss"
      style={
        {
          "--pattern-url": 'url("/patterns/pattern-arches.svg")',
          "--pattern-opacity": 1,
          "--pattern-size": "163px",
        } as CSSProperties
      }
    >
      <div className="relative">
        <div className="shell pt-[calc(var(--header-height)+64px)] pb-28">
          {/* No eyebrow — the serif headline stands alone. */}
          <h1 className="az-h1 text-ink">Newsletters</h1>
          <p className="prose mt-6 max-w-[650px] text-[17px] text-ink-mid">
            One letter, from the people doing the building. It goes out when
            there is something worth reading, and stays quiet when there is
            not.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="newsletter-plate flex flex-col p-8 sm:p-10">
              <h2 className="az-h3 text-ink">Field Notes</h2>
              <p className="prose mt-4 text-[15px] text-ink-mid">
                Notes from the build: what shipped, what broke, and what we
                would do again. Written when there is something worth
                reading, never on a content calendar.
              </p>
              <a
                href={`mailto:${emails.contact}`}
                className="link-arrow mt-8 w-fit text-[15px] font-semibold text-ink transition-colors hover:text-accent"
              >
                Get notified
              </a>
            </article>

            {/* DORMANT(newsletter): the card path for future letters. When a
                second real newsletter exists, add it here with the same
                anatomy — serif title, honest cadence in prose, real mailto.
                Nothing renders before the letter is real.

            <article className="newsletter-plate flex flex-col p-8 sm:p-10">
              <h2 className="az-h3 text-ink">{title}</h2>
              <p className="prose mt-4 text-[15px] text-ink-mid">
                {cadenceStatedHonestly}
              </p>
              <a
                href={`mailto:${emails.contact}`}
                className="link-arrow mt-8 w-fit text-[15px] font-semibold text-ink transition-colors hover:text-accent"
              >
                Get notified
              </a>
            </article>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

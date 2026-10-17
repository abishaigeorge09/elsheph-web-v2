import type { CSSProperties } from "react";
import { emails } from "@/content/site";

/**
 * The site-wide newsletter band — the penultimate block (above SiteFooter)
 * on the core content pages: /products, /insights, /about, /university,
 * /team, /careers.
 *
 * NOT mounted on: `/` (its footer is baked into the hero viewport),
 * `/newsletters` (redundant on its own page), `/offices` (short page —
 * founder's call later).
 *
 * Anatomy, from the audit: the greige field with the arches tile at full
 * strength and a ~220px tile, deliberately shifted 75px off-register at the
 * top seam (the print detail — `.field-pattern-offset`); over it an 880px
 * floating card on the field's own ground at slight translucency with a 2px
 * blur. The subscribe action is a real mailto — no fake email-capture form
 * (forms are a later phase).
 *
 * The light-field scope re-points the semantic tokens back at the light
 * ramp, so the band holds unchanged inside the dark-field pages too.
 */
export default function NewsletterBand() {
  return (
    <section
      className="field-greige field-pattern field-pattern-offset pattern-emboss"
      style={
        {
          "--pattern-url": 'url("/patterns/pattern-arches.svg")',
          "--pattern-opacity": 1,
          "--pattern-size": "163px",
        } as CSSProperties
      }
    >
      <div className="relative flex min-h-[410px] items-center justify-center px-6 py-16 sm:px-8">
        <div className="newsletter-card w-full max-w-[880px] p-10 text-center sm:p-14">
          <h2 className="az-h2 text-ink">Real work, written down.</h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[17px] text-ink-mid">
            One letter when there is something worth reading. No calendar, no
            filler.
          </p>
          <a href={`mailto:${emails.contact}`} className="btn mt-8">
            Get notified
          </a>
        </div>
      </div>
    </section>
  );
}

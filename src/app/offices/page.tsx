import type { Metadata } from "next";
import type { CSSProperties } from "react";
import DarkChrome from "@/components/layout/DarkChrome";
import { offices } from "@/content/company";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Offices | ${site.name}`,
  description: offices.intro,
};

/**
 * The Offices page — the oxblood field with the ogee lattice at the LOUD
 * setting (0.4), the audit's offices anatomy: a 2-col grid (1-col mobile) of
 * 10% white plates with the pattern showing through, text set in the RIGHT
 * half of each plate, the left half deliberately empty.
 *
 * ONE card, from the ledger: Hyderabad, India, the real contact address.
 * City-level only — no street address until the founder supplies one.
 */
export default function OfficesPage() {
  return (
    <div
      className="field-oxblood field-pattern min-h-dvh"
      style={
        {
          "--pattern-url": 'url("/patterns/pattern-ogee.svg")',
          "--pattern-opacity": 0.4,
        } as CSSProperties
      }
    >
      <DarkChrome />
      <div className="relative">
        <div className="shell pt-[calc(var(--header-height)+64px)] pb-24">
          {/* No eyebrow — the serif headline stands alone. */}
          <h1 className="az-h1 max-w-[20ch] text-ink">{offices.h1}</h1>
          <p className="prose mt-6 max-w-[880px] text-ink-mid">
            {offices.intro}
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {offices.locations.map((location) => (
              <div
                key={location.city}
                className="office-plate grid min-h-[280px] grid-cols-2 p-8 md:min-h-[340px] md:p-10"
              >
                {/* Left half deliberately empty — the plate detail. The
                    pattern reads through the 10% white. */}
                <div aria-hidden />
                <div className="flex flex-col justify-end">
                  <h2 className="az-h3 text-ink">{location.city}</h2>
                  <p className="mt-1 text-[15px] text-ink-mid">
                    {location.country}
                  </p>
                  <a
                    href={`mailto:${location.email}`}
                    className="link-underline mt-6 w-fit text-[15px] break-all text-ink transition-colors hover:text-accent"
                  >
                    {location.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

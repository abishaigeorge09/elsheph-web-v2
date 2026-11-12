import type { Metadata } from "next";
import type { CSSProperties } from "react";
import DarkChrome from "@/components/layout/DarkChrome";
import NewsletterBand from "@/components/layout/NewsletterBand";
import { careers } from "@/content/company";
import { values } from "@/content/values";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Careers | ${site.name}`,
  description: careers.h1,
};

/**
 * The Careers page — the espresso field with the crook pattern at the
 * whisper setting (0.05), the same treatment family as /team.
 *
 * Everything rendered comes from the company and values ledgers. There are
 * no invented stats, perks or roles: `openRoles` is empty by design and the
 * page renders an honest well with the real contact CTA. The role-card path
 * below is built and dormant — when the founder adds a role to the ledger it
 * renders with zero changes here.
 */
export default function CareersPage() {
  return (
    <>
    <div
      className="field-espresso field-pattern min-h-dvh"
      style={
        {
          "--pattern-url": 'url("/patterns/pattern-crook.svg")',
          "--pattern-opacity": 0.05,
        } as CSSProperties
      }
    >
      <DarkChrome />
      <div className="relative">
        <div className="shell pt-[calc(var(--header-height)+64px)] pb-24">
          {/* No eyebrow — the serif headline stands alone. */}
          <h1 className="az-h1 max-w-[20ch] text-ink">{careers.h1}</h1>
          <div className="prose mt-8 max-w-[880px] space-y-6 text-ink-mid">
            {careers.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* How we work here — the values ledger's strings, verbatim.
              Tight ruled rows, no new claims. */}
          <section className="mt-16 border-t border-line pt-12">
            <h2 className="az-h3 text-ink">How we work here</h2>
            <dl className="mt-8 max-w-[720px]">
              {values.map((value, index) => (
                <div
                  key={value.name}
                  className={`flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-10 ${
                    index > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="w-44 shrink-0 text-sm font-semibold text-ink">
                    {value.name}
                  </dt>
                  <dd className="text-[15px] text-ink-mid">
                    {value.description}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Open roles. The ledger holds none, so the well below states
              that honestly; the card grid renders the moment it does. */}
          <section className="mt-16 border-t border-line pt-12">
            <h2 className="az-h3 text-ink">Open roles</h2>

            {careers.openRoles.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {careers.openRoles.map((role) => (
                  <article
                    key={role.title}
                    className="border border-line p-8"
                  >
                    <h3 className="az-h4 text-ink">{role.title}</h3>
                    <p className="mt-1 text-xs tracking-[0.14em] text-ink-mid uppercase">
                      {role.location}
                    </p>
                    <p className="mt-4 text-[15px] text-ink-mid">
                      {role.summary}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 max-w-[720px]">
                <p className="font-display text-[26px] leading-snug text-ink">
                  {careers.hiring.heading}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {careers.hiring.areas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full border border-border-strong px-4 py-1.5 text-[14px] font-medium text-ink"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 max-w-[520px] text-[15px] text-ink-mid">
                  {careers.hiring.line}
                </p>
                <a
                  href={`mailto:${careers.hiring.email}`}
                  className="link-arrow mt-4 text-[15px] text-ink transition-colors hover:text-accent"
                >
                  {careers.hiring.email}
                </a>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
    <NewsletterBand />
    </>
  );
}

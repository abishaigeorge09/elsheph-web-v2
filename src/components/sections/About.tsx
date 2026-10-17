import Reveal from "@/components/sections/Reveal";
import { mission, values, vision } from "@/content/values";

/**
 * The foundation: vision and mission as two Fraunces pull-quotes, then the
 * three values as tight ruled rows.
 *
 * Deliberately absent, both by ledger rule:
 * - The four animated counters the pre-rebuild section carried. None of them
 *   had a source, so none of them are here. Do not add a number to this
 *   section without evidence.
 * - The `principles` list. It is deprecated filler and Phase 6 stopped
 *   rendering it; the export stays in values.ts only so nothing else breaks.
 */
export default function About() {
  return (
    <section
      id="about"
      className="border-t border-border bg-page py-16 md:py-24"
    >
      <div className="shell">
        {/* The band's label died with the eyebrow scale; the vision and
            mission statements carry the section themselves. */}
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {[vision, mission].map((statement, index) => (
            <Reveal key={statement.title} delay={index * 0.08}>
              <figure className="border-l-2 border-border-strong pl-8">
                <blockquote className="az-h3 text-ink">
                  {statement.description}
                </blockquote>
                <figcaption className="mt-4 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {statement.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <dl className="mt-16 max-w-[720px]">
            {values.map((value, index) => (
              <div
                key={value.name}
                className={`flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-10 ${
                  index > 0 ? "border-t border-border" : ""
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
        </Reveal>
      </div>
    </section>
  );
}

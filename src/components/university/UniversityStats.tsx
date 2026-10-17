import Reveal from "@/components/sections/Reveal";
import { universityStats } from "@/content/university";

/**
 * The four founder-attested figures on a cream band. Numerals in Fraunces at
 * display size — terracotta is fenced to display sizes, and 44px qualifies —
 * with the ledger's label and sub underneath. Hairlines divide the cells the
 * same way About's services grid does; 2×2 below md, four across above.
 */
export default function UniversityStats() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="shell py-14 md:py-16">
        <Reveal>
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {universityStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`px-2 py-6 md:px-8 md:py-2 ${
                  index % 2 === 1 ? "max-md:border-l max-md:border-border" : ""
                } ${index >= 2 ? "max-md:border-t max-md:border-border" : ""} ${
                  index > 0 ? "md:border-l md:border-border" : ""
                } ${index === 0 ? "md:pl-0" : ""}`}
              >
                <dd className="font-display text-[44px] leading-none font-normal text-brand tabular-nums">
                  {stat.value}
                </dd>
                <dt className="mt-3 text-sm font-semibold text-ink">
                  {stat.label}
                </dt>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {stat.sub}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

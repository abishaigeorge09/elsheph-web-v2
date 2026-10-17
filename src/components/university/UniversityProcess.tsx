import Reveal from "@/components/sections/Reveal";
import { universitySteps } from "@/content/university";

/**
 * How a partnership runs: the ledger's four steps as the same numbered
 * Fraunces list About uses — the steps are genuinely sequential, so the
 * numbers carry meaning and the markup stays an ordered list at every width.
 */
export default function UniversityProcess() {
  return (
    <section className="border-t border-border bg-surface py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <h2 className="az-h2 mt-5 max-w-[20ch] text-ink">
            From first conversation to placement
          </h2>
        </Reveal>

        <ol className="mt-14 max-w-[720px]">
          {universitySteps.map((step, index) => (
            <li
              key={step.number}
              className={index > 0 ? "border-t border-border" : ""}
            >
              <Reveal delay={Math.min(index, 3) * 0.06}>
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
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

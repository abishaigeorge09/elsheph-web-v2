import Reveal from "@/components/sections/Reveal";
import Icon from "@/components/sections/Icon";
import { universityOffers } from "@/content/university";

/**
 * The ledger's four offers, in the same hairline-divided cell pattern as
 * About's services: accent-quiet icon chip, Inter title, the ledger's
 * description. Rules per cell by index, for the same wrapped-grid reason the
 * Services component documents.
 */
export default function UniversityOffers() {
  return (
    <section className="bg-page py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <h2 className="az-h2 mt-5 max-w-[20ch] text-ink">
            Programs built around shipping
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 grid sm:grid-cols-2">
            {universityOffers.map((offer, index) => (
              <article
                key={offer.title}
                className={`border-border py-8 max-sm:border-t max-sm:first:border-t-0 sm:p-10 ${
                  index % 2 === 1 ? "sm:border-l" : ""
                } ${index >= 2 ? "sm:border-t" : ""}`}
              >
                <div className="flex size-10 items-center justify-center bg-accent-quiet">
                  <Icon name={offer.icon} className="size-5 text-accent" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink">
                  {offer.title}
                </h3>
                <p className="mt-3 text-[15px] text-ink-mid">
                  {offer.description}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from "@/components/sections/Reveal";
import {
  universityCompanies,
  universityCompaniesHeading,
  universityTestimonials,
} from "@/content/university";

/**
 * Placement outcomes, not partners: the ledger frames the company names as
 * where alumni ended up, so they render as a quiet row of text chips — no
 * logos, no marquee, no implied endorsement. The two founder-attested
 * testimonials sit alongside as restrained quote cards.
 */
export default function UniversityOutcomes() {
  return (
    <section className="border-t border-border bg-page py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <h2 className="az-h2 mt-5 max-w-[20ch] text-ink">
            {universityCompaniesHeading}
          </h2>
          <ul className="mt-10 flex max-w-[720px] flex-wrap gap-2.5">
            {universityCompanies.map((company) => (
              <li
                key={company}
                className="rounded-full border border-border-strong px-4 py-1.5 text-[13px] font-medium text-muted-foreground"
              >
                {company}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid gap-px border-t border-border md:grid-cols-2">
          {universityTestimonials.map((testimonial, index) => (
            <Reveal key={testimonial.attribution} delay={index * 0.08}>
              <figure
                className={`h-full py-8 md:py-10 ${
                  index % 2 === 1 ? "md:border-l md:border-border md:pl-10" : "md:pr-10"
                } ${index > 0 ? "max-md:border-t max-md:border-border" : ""}`}
              >
                <blockquote className="font-display text-[21px] leading-[1.4] text-ink italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex size-8 items-center justify-center rounded-full bg-accent-quiet text-[13px] font-semibold text-accent"
                  >
                    {testimonial.initial}
                  </span>
                  <span className="text-[13px] text-muted-foreground">
                    {testimonial.attribution} · {testimonial.detail}
                    {testimonial.url ? (
                      <>
                        {" · "}
                        <a
                          href={testimonial.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4 hover:text-accent"
                        >
                          LinkedIn post
                        </a>
                      </>
                    ) : null}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

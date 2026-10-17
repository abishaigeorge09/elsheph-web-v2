import { ArrowDown } from "lucide-react";
import Reveal from "@/components/sections/Reveal";
import { universityPage } from "@/content/university";

/**
 * The espresso invitation band. `.band-deep` re-points the semantic tokens,
 * so everything inside uses the same classes as the light bands and recolours
 * itself — no component-level dark styling exists here.
 */
export default function UniversityCta() {
  return (
    <section className="band-deep">
      <div className="shell py-16 md:py-24">
        <Reveal>
          <h2 className="az-h2 mt-5 max-w-[18ch] text-ink">
            {universityPage.cta}
          </h2>
          <a
            href="#form"
            className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Write to us below
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

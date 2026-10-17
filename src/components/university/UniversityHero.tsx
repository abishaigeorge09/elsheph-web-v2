import Image from "next/image";
import { universityPage } from "@/content/university";

/**
 * University hero, on the light system: eyebrow, the ledger h1 and sub on the
 * left, and the one real photograph on the site as a duotone-treated art
 * panel on the right. At small widths the panel moves above the headline as a
 * full-width top band, so the phone layout opens on the image rather than on
 * a stranded half-column.
 */
export default function UniversityHero() {
  return (
    <section className="bg-page">
      <div className="shell grid gap-10 pt-[calc(var(--header-height)+40px)] pb-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pt-[calc(var(--header-height)+64px)] lg:pb-24">
        {/* PHOTO SLOT: real campus photograph from a partnered program; replace
            with a licensed shot of an actual Elsheph cohort when one exists. */}
        <div className="photo-duotone relative -mx-6 aspect-[16/10] sm:-mx-0 lg:order-last lg:col-span-6 lg:aspect-[4/3]">
          <Image
            src="/university-campus.png"
            alt="University campus"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        </div>

        <div className="lg:col-span-6">
          <h1 className="az-h1 mt-5 max-w-[16ch] text-ink">
            {universityPage.h1}
          </h1>
          <p className="mt-7 max-w-[540px] text-[17px] text-ink-mid">
            {universityPage.sub}
          </p>
        </div>
      </div>
    </section>
  );
}

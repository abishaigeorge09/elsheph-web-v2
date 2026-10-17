import type { Metadata } from "next";
import UniversityHero from "@/components/university/UniversityHero";
import UniversityStats from "@/components/university/UniversityStats";
import UniversityOffers from "@/components/university/UniversityOffers";
import UniversityProcess from "@/components/university/UniversityProcess";
import UniversityOutcomes from "@/components/university/UniversityOutcomes";
import UniversityCta from "@/components/university/UniversityCta";
import UniversityForm from "@/components/university/UniversityForm";
import NewsletterBand from "@/components/layout/NewsletterBand";
import { universityPage } from "@/content/university";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `University | ${site.name}`,
  description: universityPage.sub,
};

/**
 * The university page on the light system, rebuilt in Phase 7. Every string
 * comes from src/content/university.ts; the bands alternate ground and cream
 * the same way About does, with the one espresso invitation band before the
 * form. The hero reserves the fixed header's height itself.
 */
export default function UniversityRoute() {
  return (
    <div className="bg-page">
      <UniversityHero />
      <UniversityStats />
      <UniversityOffers />
      <UniversityProcess />
      <UniversityOutcomes />
      <UniversityCta />
      <UniversityForm />
      <NewsletterBand />
    </div>
  );
}

import type { Metadata } from "next";
import DarkChrome from "@/components/layout/DarkChrome";
import NewsletterBand from "@/components/layout/NewsletterBand";
import TeamView from "@/components/team/TeamView";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Team | ${site.name}`,
  description:
    "The people who build at Elsheph Systems. Real faces land here as each of us steps onto the page.",
};

export default function TeamPage() {
  return (
    <>
      {/* Dark top field: swap the header chrome to the cream treatment
          while un-scrolled (E3's low-contrast wordmark flag, fixed in E4). */}
      <DarkChrome />
      <TeamView />
      <NewsletterBand />
    </>
  );
}

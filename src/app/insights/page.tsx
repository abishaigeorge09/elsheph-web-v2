import type { Metadata } from "next";
import Image from "next/image";
import NewsletterBand from "@/components/layout/NewsletterBand";
import { emails, site } from "@/content/site";

export const metadata: Metadata = {
  title: `Insights | ${site.name}`,
  description: "Writing and updates from Elsheph. Nothing published yet.",
};

/**
 * The Insights page — the light-system translation of the a16z reference's
 * News & Content mode (`.research/a16z-shots/news.jpg`): a bounded espresso
 * band up top (via `.band-deep`, the one sanctioned dark scope), then a warm
 * body with the reference's header row — serif heading left, bordered
 * SUBSCRIBE button right — over the article area.
 *
 * Elsheph has published nothing, so nothing is invented:
 * - The reference's carousel (with its "1 / 7" counter) is NOT reproduced.
 *   A carousel with zero real slides would be a lie the UI tells on its own;
 *   the band holds one honest statement and the generated art instead.
 * - The article area is a single `.awaiting` well. Filters and a right rail
 *   are NOT built over zero content; see the spec comment at the well.
 *
 * NOTE(ledger): the strings on this page are page-level copy hardcoded here,
 * not ledger entries — `src/content/` is owned by Phase 3 and was not to be
 * touched in this phase. Fold them into a content file in a later ledger
 * consolidation pass.
 */
export default function InsightsPage() {
  return (
    <div className="bg-page">
      {/* Espresso top band. `.band-deep` re-points the semantic tokens, so
          the eyebrow's accent and every text tone recolour themselves. */}
      {/* The art panel is a child of the SECTION (viewport-wide), not the
          shell, so it genuinely bleeds to the screen's right edge — inside
          the shell it stopped at the container line and left a raw espresso
          gap beyond it at wide viewports. */}
      <section className="band-deep relative overflow-hidden pt-[var(--header-height)]">
        {/* PHOTO SLOT: replace public/art/insights.svg with licensed
            editorial photography, same landscape crop. */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 hidden lg:block lg:w-[42%]"
        >
          <Image
            src="/art/insights.svg"
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="shell relative flex min-h-[340px] flex-col justify-center gap-10 py-14 lg:py-0">
          <div className="relative z-10 max-w-xl lg:w-1/2">
            <h1 className="az-h2 text-ink">
              Writing is coming. Slowly, on purpose.
            </h1>
            <p className="mt-5 max-w-md text-[17px] text-ink-mid">
              We&rsquo;d rather ship products than posts. When we have
              something worth reading, it lands here.
            </p>
            <a
              href={`mailto:${emails.contact}`}
              className="link-arrow mt-7 text-sm font-semibold text-ink"
            >
              Get notified
            </a>
          </div>

          {/* Mobile: the art as a bounded strip below the copy. */}
          <div aria-hidden className="relative -mx-8 h-48 lg:hidden">
            <Image
              src="/art/insights.svg"
              alt=""
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Body — the reference's header row over the article area. */}
      <section className="shell py-16 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="az-h2 text-ink">Field notes</h2>
          <a href={`mailto:${emails.contact}`} className="btn w-fit">
            Subscribe
          </a>
        </div>

        {/* SPEC(articles): when real articles exist, this well is replaced
            by the audit's article-list anatomy:
              - each row: tag in truffle/muted (13px), then an optional small
                "New" badge on a brand-quiet ground (--color-accent-quiet)
                reserved for genuinely recent posts
              - serif headline ~19px (az-h4 register), ink, the row's link
              - byline 13px muted (author + date), under the headline
              - rows separated by 1px hairline dividers (--color-line)
              - below the list, a LOAD MORE action as the one outline button
                style (.btn) — only once more rows actually exist
            A right rail of topic filters comes only when there are enough
            posts to filter. Nothing is built before at least one article is
            real; controls over zero content are fake UI. */}
        {/* Centred, capped-measure well — standalone blocks sit centred in
            the shell rather than hugging the left rail, the reference's
            composition rule for content that stands alone. */}
        <div className="awaiting mx-auto mt-12 max-w-[650px] text-center">
          <div>
            <p className="awaiting-note">No articles yet. No filler either.</p>
            <p className="mt-3 text-sm text-muted-foreground">
              The subscribe button reaches a real inbox in the meantime.
            </p>
          </div>
        </div>
      </section>

      {/* Penultimate block site-wide: the newsletter band, above the footer. */}
      <NewsletterBand />
    </div>
  );
}

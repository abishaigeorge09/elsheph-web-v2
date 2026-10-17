import Image from "next/image";
import Link from "next/link";
import { footerGroups, site, emails } from "@/content/site";
import SocialChips from "@/components/layout/SocialChips";

/**
 * The site-wide footer, on the light system: cream (--surface) ground, top
 * hairline, the DARK wordmark. Link structure is Elsheph's own, taken from
 * the live site: Services, Company, Products, Connect.
 *
 * The bottom row carries the tagline slot in Fraunces italic — the a16z
 * "Software Is Eating the World" position. It prefers a `footerTagline`
 * field on the ledger (being added by the copy pass) and falls back to
 * `site.tagline` so this file never blocks on that landing.
 *
 * The reference clone's footer carried another company's sub-brand names.
 * Those are gone and must not come back — this footer names only Elsheph
 * properties and Elsheph channels.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();
  const tagline =
    (site as typeof site & { footerTagline?: string }).footerTagline ??
    site.tagline;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            {/* Dark-ink wordmark — the default on light ground. */}
            <Image
              src={site.logo.wordmarkDark}
              alt={site.name}
              width={495}
              height={86}
              className="h-[34px] w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>

            <div className="mt-8 flex flex-col gap-2">
              <a
                href={`mailto:${emails.sales}`}
                className="link-underline text-sm text-ink-mid transition-colors hover:text-accent"
              >
                {emails.sales}
              </a>
              <a
                href={`mailto:${emails.contact}`}
                className="link-underline text-sm text-ink-mid transition-colors hover:text-accent"
              >
                {emails.contact}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4 lg:gap-12">
            {footerGroups.map((group) => (
              <div key={group.heading}>
                {/* Serif heading, not an eyebrow — the label style is dead. */}
                <h2 className="font-display text-[17px] text-ink">
                  {group.heading}
                </h2>
                <ul className="mt-6 space-y-3">
                  {group.links.map((link) => (
                    <li key={`${group.heading}-${link.label}`}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target={
                            link.href.startsWith("mailto:")
                              ? undefined
                              : "_blank"
                          }
                          rel="noopener noreferrer"
                          className="link-underline text-sm text-ink-mid transition-colors hover:text-accent"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="link-underline text-sm text-ink-mid transition-colors hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 border-t border-border pt-8 md:grid md:grid-cols-3 md:items-center">
          <p className="text-sm text-faint">
            © {year} {site.copyrightHolder}. All rights reserved.
          </p>
          {/* The tagline slot — Fraunces italic, centred. */}
          <p className="font-display text-[15px] italic text-muted-foreground md:text-center">
            {tagline}
          </p>
          <div className="flex items-center md:justify-end">
            <SocialChips />
          </div>
        </div>
      </div>
    </footer>
  );
}

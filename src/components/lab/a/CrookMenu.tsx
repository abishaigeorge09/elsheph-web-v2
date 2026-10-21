"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { footerGroups, homeCta, navLinks, site } from "@/content/site";
import styles from "./crook.module.css";

/**
 * The full-screen menu: every link in site.ts (primary nav, the four footer
 * groups, the CTA) on the espresso band. Eases in and stops; the close button
 * takes focus on open and Escape closes.
 */
export default function CrookMenu({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className={`${styles.menu} band-deep`}
    >
      <div className="flex min-h-full flex-col px-6 pt-4 pb-10 sm:px-10 lg:px-14">
        <div className="flex h-14 items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.08em] uppercase">
            {site.name}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={styles.menuClose}
            aria-label="Close menu"
          >
            Close
            <svg
              viewBox="0 0 20 20"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        <div className="mt-8 grid gap-10 md:mt-14 md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] md:gap-8">
          <nav aria-label="Primary" className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.menuLink}
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={homeCta.href}
              className={`${styles.cta} mt-5 self-start`}
              onClick={onClose}
            >
              {homeCta.label}
              <svg
                viewBox="0 0 20 20"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 10h13M11 5l5 5-5 5" />
              </svg>
            </Link>
          </nav>

          {footerGroups.map((group) => (
            <nav
              key={group.heading}
              aria-label={group.heading}
              className="flex flex-col gap-3"
            >
              <span className={styles.menuHeading}>{group.heading}</span>
              {group.links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-ink-mid transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="text-[15px] text-ink-mid transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          ))}
        </div>

        <p className="mt-auto pt-10 font-display text-[15px] italic text-ink-mid">
          {site.footerTagline}
        </p>
      </div>
    </div>
  );
}

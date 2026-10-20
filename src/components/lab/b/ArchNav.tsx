"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  footerGroups,
  homeCta,
  navLinks,
  primaryCta,
  sectionAnchors,
  site,
  type NavLink,
} from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Every link group the menu must reach. Nothing in site.ts is left out. */
const menuGroups: { heading: string; links: NavLink[] }[] = [
  { heading: "Pages", links: [...navLinks, primaryCta] },
  { heading: "Go to", links: sectionAnchors },
  ...footerGroups,
];

function MenuLink({ link, onPick }: { link: NavLink; onPick: () => void }) {
  const className =
    "lb-focus inline-block rounded-sm py-1 text-[15px] leading-snug text-ink-mid transition-colors duration-200 hover:text-ink";
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={onPick}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className} onClick={onPick}>
      {link.label}
    </Link>
  );
}

/**
 * The slim arch-topped pill: seal, the primary links, the CTA and a Menu
 * button that opens a full-screen espresso sheet reaching every link in
 * site.ts. The sheet eases in and stops; under reduced motion it cuts.
 */
export default function ArchNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  const duration = reduce ? 0 : 0.36;

  return (
    <>
      <div className="lb-drop relative z-20 flex justify-center px-4 pt-4">
        <nav aria-label="Primary" className="lb-pill">
          <Link
            href="/"
            className="lb-focus flex items-center gap-2 rounded-full pr-2 pl-1"
            aria-label={`${site.name} home`}
          >
            <span className="seal-mark size-8 text-brand-deep" aria-hidden />
            <span className="hidden text-[12px] font-semibold tracking-[0.12em] text-ink uppercase sm:inline">
              {site.name}
            </span>
          </Link>

          <span className="mx-1 hidden h-5 w-px bg-line md:block" aria-hidden />

          <ul className="hidden items-center md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="lb-pill-link lb-focus">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={homeCta.href}
            className="lb-cta lb-focus ml-1 hidden md:inline-flex"
          >
            {homeCta.label}
            <span aria-hidden className="font-light">
              ⟶
            </span>
          </Link>

          <button
            ref={openerRef}
            type="button"
            className="lb-pill-link lb-focus ml-1 gap-2"
            aria-expanded={open}
            aria-controls="lb-menu"
            onClick={() => setOpen(true)}
          >
            <span className="burger-box" aria-hidden>
              <span className="burger-bar burger-top" />
              <span className="burger-bar burger-bot" />
            </span>
            Menu
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="lb-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="band-deep fixed inset-0 z-50 overflow-y-auto"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 8 }}
            transition={{ duration, ease: EASE }}
          >
            <div className="shell flex min-h-dvh flex-col pt-5 pb-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="seal-mark size-9 text-accent" aria-hidden />
                  <span className="text-[12px] font-semibold tracking-[0.12em] text-ink uppercase">
                    {site.name}
                  </span>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  className="lb-focus inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink transition-colors duration-200 hover:border-line-strong hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  <span aria-hidden className="text-lg leading-none">
                    ×
                  </span>
                  Close
                </button>
              </div>

              <div className="mt-10 grid flex-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {menuGroups.map((group, index) => (
                  <motion.section
                    key={group.heading}
                    aria-labelledby={`lb-menu-${index}`}
                    initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.5,
                      ease: EASE,
                      delay: reduce ? 0 : 0.08 + index * 0.05,
                    }}
                  >
                    <h2
                      id={`lb-menu-${index}`}
                      className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-accent uppercase"
                    >
                      {group.heading}
                    </h2>
                    <ul className="flex flex-col gap-1">
                      {group.links.map((link) => (
                        <li key={`${group.heading}-${link.href}`}>
                          <MenuLink link={link} onPick={() => setOpen(false)} />
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
                <p className="font-display text-xl text-ink-mid italic">
                  {site.footerTagline}
                </p>
                <Link
                  href={homeCta.href}
                  className="lb-cta lb-focus inline-flex"
                  onClick={() => setOpen(false)}
                >
                  {homeCta.label}
                  <span aria-hidden className="font-light">
                    ⟶
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

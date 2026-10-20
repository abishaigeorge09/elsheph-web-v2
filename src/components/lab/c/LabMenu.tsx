"use client";

import { useEffect, useRef } from "react";
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

const EASE = [0.2, 0, 0, 1] as const;

/**
 * Every link in site.ts, grouped. The first column is the primary nav plus
 * the two CTAs; the footer groups follow; the last column is whatever the
 * section anchors add that no earlier group already lists.
 */
function groups(): { heading: string; links: NavLink[] }[] {
  const out = [
    { heading: "Pages", links: [...navLinks, homeCta, primaryCta] },
    ...footerGroups.map((g) => ({ heading: g.heading, links: [...g.links] })),
  ];
  const seen = new Set(out.flatMap((g) => g.links.map((l) => l.href)));
  const rest = sectionAnchors.filter((l) => !seen.has(l.href));
  if (rest.length) out.push({ heading: "Elsewhere", links: rest });
  return out;
}

function MenuLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const cls =
    "inline-block py-1 text-[15px] text-ink-mid hover:text-ink focus-visible:text-ink";
  if (link.external) {
    return (
      <a href={link.href} className={cls} onClick={onNavigate}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls} onClick={onNavigate}>
      {link.label}
    </Link>
  );
}

export default function LabMenu({
  open,
  onClose,
  returnFocus,
}: {
  open: boolean;
  onClose: () => void;
  returnFocus: React.RefObject<HTMLButtonElement | null>;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const opener = returnFocus.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, onClose, returnFocus]);

  const duration = reduced ? 0 : 0.32;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="band-deep fixed inset-0 z-50 flex flex-col overflow-y-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration, ease: EASE }}
        >
          <div className="flex h-14 shrink-0 items-center justify-between px-5 sm:h-16 sm:px-8">
            <span className="font-display text-lg text-ink">{site.name}</span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="btn h-10 px-5"
            >
              Close
            </button>
          </div>
          <nav
            aria-label="All pages"
            className="grid flex-1 content-start gap-x-10 gap-y-8 px-5 pt-6 pb-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3"
          >
            {groups().map((g) => (
              <div key={g.heading}>
                <h2 className="mb-2 border-b border-line pb-2 font-display text-xl text-ink">
                  {g.heading}
                </h2>
                <ul className="flex flex-col">
                  {g.links.map((l) => (
                    <li key={`${g.heading}-${l.href}-${l.label}`}>
                      <MenuLink link={l} onNavigate={onClose} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <p className="shrink-0 px-5 pb-6 font-display text-base italic text-ink-mid sm:px-8">
            {site.footerTagline}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

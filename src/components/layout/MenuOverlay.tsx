"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { site, socials } from "@/content/site";
import { services } from "@/content/services";

type MenuOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Where focus returns on close: the header hamburger. */
  finalFocus?: React.RefObject<HTMLButtonElement | null>;
};

type SubLink = { label: string; href: string };

type ParentId = "focus" | "content" | "programs" | "company";

type Parent = { id: ParentId; label: string; links: SubLink[] };

/**
 * The drawer menu — the audit's anatomy, replacing the old full-screen
 * espresso overlay. A left panel (420px at xl, 320px at lg, full width
 * below) on the --panel cream, over a 20% black scrim; the page stays
 * visible and unblurred, and the header stays live above both.
 *
 * Base UI's dialog primitive still sits underneath for portal, focus trap,
 * scroll lock, Esc and scrim-click dismissal; the skin and the second panel
 * are ours. Chevroned parents slide panel two out to the right (below lg it
 * covers the full-width panel one, with a back affordance); switching
 * parents while it is open cross-fades panel two's contents in place — the
 * keyed remount runs the .drawer-panel2-content fade.
 *
 * The ✕ rides the top-right of the OUTERMOST open panel: panel one's ✕
 * yields to panel two's while a section is open. Route change closes the
 * drawer (SiteHeader watches the pathname). Social glyphs pin bottom-left
 * of panel one.
 *
 * All hrefs below are the approved full-company routes; most target pages
 * arrive in later phases (E3+) and are linked now per the plan.
 */
export default function MenuOverlay({
  open,
  onOpenChange,
  finalFocus,
}: MenuOverlayProps) {
  const pathname = usePathname();
  const [openParent, setOpenParent] = useState<ParentId | null>(null);

  /** Focus-area links derive from the services ledger; only the corporate
      L&D slug is shortened per the approved route map. */
  const focusHref = (id: string) =>
    id === "corporate-l-and-d" ? "/focus/corporate-ld" : `/focus/${id}`;

  const flat: SubLink[] = [
    { label: "Products", href: "/products" },
    { label: "Team", href: "/team" },
  ];

  const parents: Parent[] = [
    {
      id: "focus",
      label: "Focus Areas",
      links: services.map((service) => ({
        label: service.title,
        href: focusHref(service.id),
      })),
    },
    {
      id: "content",
      label: "Content",
      links: [
        { label: "Field Notes", href: "/insights" },
        { label: "Newsletters", href: "/newsletters" },
        { label: "Showcase", href: "/showcase" },
      ],
    },
    {
      id: "programs",
      label: "Programs",
      links: [
        { label: "University", href: "/university" },
        { label: "Internships", href: "/internships" },
      ],
    },
    {
      id: "company",
      label: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Offices", href: "/offices" },
        { label: "Contact", href: "/about#contact" },
      ],
    },
  ];

  const active = (href: string) => {
    const base = href.split("#")[0];
    return base !== "" && (pathname === base || pathname.startsWith(`${base}/`));
  };

  const activeParent = parents.find((parent) => parent.id === openParent);

  /* Reset panel two so reopening starts at level one. */
  const handleOpenChange = (next: boolean) => {
    if (!next) setOpenParent(null);
    onOpenChange(next);
  };

  const close = () => handleOpenChange(false);

  /* The installed lucide build carries no brand glyphs, so the two social
     marks are drawn inline: outline strokes in currentColor, 18px. */
  const socialIcon = (label: string) =>
    label === "LinkedIn" ? (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-[18px]"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 10.5V17" />
        <path d="M8 7.2v.1" />
        <path d="M12 17v-4a2.4 2.4 0 0 1 4.8 0v4" strokeLinecap="round" />
      </svg>
    ) : (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-[18px]"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.2 6.8v.1" />
      </svg>
    );

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        {/* 20% black scrim; the page behind stays visible, not blurred.
            A click on it dismisses via the primitive. */}
        <Dialog.Backdrop className="drawer-scrim" />

        <Dialog.Popup
          finalFocus={finalFocus}
          aria-label="Site menu"
          className="drawer"
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            {site.name} navigation
          </Dialog.Description>

          {/* PANEL ONE */}
          <div className="flex h-full flex-col overflow-y-auto pt-[114px] pb-8 pl-8 pr-8 xl:pl-14">
            <nav aria-label="Primary" className="flex flex-col items-stretch gap-8">
              {flat.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="drawer-item"
                  data-active={active(link.href) || undefined}
                  onClick={close}
                >
                  {link.label}
                </Link>
              ))}

              {parents.map((parent) => {
                const isOpen = openParent === parent.id;
                return (
                  <button
                    key={parent.id}
                    type="button"
                    className="drawer-item"
                    data-open={isOpen || undefined}
                    data-active={
                      parent.links.some((link) => active(link.href)) || undefined
                    }
                    aria-expanded={isOpen}
                    onClick={() => setOpenParent(isOpen ? null : parent.id)}
                  >
                    {parent.label}
                    <span className="drawer-chevron" aria-hidden />
                  </button>
                );
              })}
            </nav>

            {/* Social glyph row, pinned bottom-left. */}
            <div className="mt-auto flex items-center gap-5 pt-12">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted transition-colors duration-200 hover:text-ink"
                >
                  {socialIcon(social.label)}
                </a>
              ))}
            </div>
          </div>

          {/* Panel one's ✕ — yields to panel two's while a section is open. */}
          {!openParent ? (
            <button
              type="button"
              aria-label="Close menu"
              className="drawer-close"
              onClick={close}
            >
              <span className="drawer-close-glyph" aria-hidden />
            </button>
          ) : null}

          {/* PANEL TWO — slides out right of panel one (over it below lg). */}
          <div className="drawer-panel2-clip">
            <div className="drawer-panel2" data-open={openParent || undefined}>
              {activeParent ? (
                <div
                  key={activeParent.id}
                  className="drawer-panel2-content flex h-full flex-col overflow-y-auto pt-[114px] pb-8 pl-8 pr-8 xl:pl-14"
                >
                  {/* Back affordance for the full-width mobile drawer, where
                      panel two covers panel one entirely. */}
                  <button
                    type="button"
                    className="drawer-sub drawer-back mb-8"
                    onClick={() => setOpenParent(null)}
                  >
                    <span
                      className="drawer-chevron"
                      style={{ transform: "rotate(225deg)" }}
                      aria-hidden
                    />
                    {activeParent.label}
                  </button>

                  <nav
                    aria-label={activeParent.label}
                    className="flex flex-col gap-5"
                  >
                    {activeParent.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="drawer-sub"
                        onClick={close}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <button
                    type="button"
                    aria-label="Close menu"
                    className="drawer-close"
                    onClick={close}
                  >
                    <span className="drawer-close-glyph" aria-hidden />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

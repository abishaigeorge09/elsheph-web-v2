"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuOverlay from "@/components/layout/MenuOverlay";
import SearchPill from "@/components/layout/SearchPill";
import {
  getDarkField,
  getDarkFieldServer,
  subscribeDarkField,
} from "@/components/layout/darkField";
import { site } from "@/content/site";

/**
 * The site-wide bar, on the audit's geometry: fixed, hamburger hard left,
 * absolutely centred wordmark, search hard right. The full nav lives behind
 * the hamburger in the left DRAWER (MenuOverlay); search is the in-header
 * pill (SearchPill) — the magnifier expands in place, no overlay, no dim,
 * no scroll lock.
 *
 * The site is light-first, so on interior routes the bar is transparent over
 * the warm-white ground with the DARK wordmark and ink icons. The homepage is
 * the exception: its whole viewport is full-bleed dark hero media, so while
 * `data-home` is set and the bar is transparent, the wordmark swaps to the
 * cream knockout and the icons + search pill flip to the deep ramp
 * (globals.css Layer E3). The homepage cannot scroll, so that is its only
 * state; the guard remains anyway.
 *
 * Scroll behaviour: transparent under 24px of scroll; past it, a
 * `data-scrolled` attribute (toggled by a passive listener) gives the bar a
 * 92% warm-white blur and a bottom hairline — styles in globals.css Layer E3.
 *
 * Drawer and search pill are mutually exclusive: opening either closes the
 * other. ⌘K / Ctrl+K toggles the pill from anywhere; the listener lives here
 * so it can enforce the exclusivity. The header itself stays visible ABOVE
 * the drawer's scrim (header z-200, scrim z-150).
 */
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const burgerRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    setSearchOpen(false);
    setMenuOpen(true);
  };

  const setSearch = (open: boolean) => {
    if (open) setMenuOpen(false);
    setSearchOpen(open);
  };

  useEffect(() => {
    /* Founder rule: the bar and its controls are ALWAYS legible. The
       legible ground appears on the first real scroll movement (6px), not
       after a 24px dead zone — at rest the transparent state is only ever
       shown over surfaces the chrome mechanisms already handle (media on
       the homepage, dark fields via data-dark-field). */
    const onScroll = () => setScrolled(window.scrollY >= 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ⌘K / Ctrl+K: toggle the search pill (closing the drawer if it is up). */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchOpen((wasOpen) => {
          if (!wasOpen) setMenuOpen(false);
          return !wasOpen;
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  /* Route change closes the drawer and collapses the pill — done as a
     during-render state adjustment so it never paints over the new route. */
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (menuOpen) setMenuOpen(false);
    if (searchOpen) setSearchOpen(false);
  }

  const isHome = pathname === "/";
  /* Dark-field pages (/team, /about, /careers, /offices) mount <DarkChrome/>,
     which flips this via the darkField store — the generalised ground
     detection. While such a page is un-scrolled, the transparent bar sits
     over espresso/oxblood, so the wordmark takes the cream knockout and the
     icons the deep ramp (CSS side: `:root[data-dark-field]` in Layer E3). */
  const darkField = useSyncExternalStore(
    subscribeDarkField,
    getDarkField,
    getDarkFieldServer,
  );
  /* Over a dark ground (home media or a dark field, bar transparent):
     cream knockout wordmark. */
  const overMedia = (isHome || darkField) && !scrolled;

  return (
    <>
      <header
        className="site-header fixed inset-x-0 top-0 z-[200] h-[var(--header-height)]"
        data-scrolled={scrolled || undefined}
        data-home={isHome || undefined}
      >
        <div className="shell relative flex h-full items-center">
          {/* Hamburger, hard left: two drawn 18px bars. */}
          <button
            ref={burgerRef}
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="-ml-1 flex size-9 shrink-0 items-center justify-center text-ink transition-colors duration-150 hover:text-accent"
          >
            <span className="burger-box" aria-hidden="true">
              <span className="burger-bar burger-top" />
              <span className="burger-bar burger-bot" />
            </span>
          </button>

          {/* Centred wordmark, absolutely positioned against the bar's own
              relative box so hamburger/search width never pushes it
              off-centre. Hidden on small screens while the pill is open —
              308px of pill plus the wordmark cannot share a 390px bar. */}
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
              searchOpen ? "hidden sm:block" : ""
            }`}
          >
            <Image
              src={overMedia ? site.logo.wordmark : site.logo.wordmarkDark}
              alt={site.name}
              width={495}
              height={86}
              priority
              className="h-[22px] w-auto sm:h-[26px]"
            />
          </Link>

          {/* Search, hard right: magnifier that expands into the pill. */}
          <SearchPill open={searchOpen} onOpenChange={setSearch} />
        </div>
      </header>

      {/* No spacer: the homepage hero is full-bleed under the transparent
          bar, and every other route reserves the bar's height itself
          (`pt-[var(--header-height)]`). `scroll-padding-top` in globals.css
          keeps in-page anchor targets landing below the bar. */}

      <MenuOverlay
        open={menuOpen}
        onOpenChange={setMenuOpen}
        finalFocus={burgerRef}
      />
    </>
  );
}

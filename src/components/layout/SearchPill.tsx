"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { navLinks, sectionAnchors, emails } from "@/content/site";
import { liveProducts } from "@/content/products";

type SearchPillProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Result = {
  title: string;
  /** One-line description under the serif title, written as a continuing
      sentence where natural — the audit's writing trick. */
  desc: string;
  href: string;
  external?: boolean;
};

/**
 * The in-header search — the audit's behaviour, replacing the full-screen
 * SearchOverlay. The magnifier expands IN PLACE into a ~308×36 pill inside
 * the header bar; a frosted typeahead panel drops directly below at exactly
 * the pill's width. No backdrop, no dim, no scroll lock — the page stays
 * live behind it.
 *
 * The index is the one the overlay held: every route, every real section
 * anchor, every product that is actually live (`liveProducts` is
 * pre-filtered), and the two contact addresses. Filtering is a plain
 * case-insensitive substring match over title + description.
 *
 * Keyboard: ↑↓ move the active row, Enter opens, Esc collapses the pill.
 * Click-outside collapses. The × clears the query first, then closes.
 * ⌘K handling lives in SiteHeader (which owns the open state so menu and
 * search stay mutually exclusive).
 */
export default function SearchPill({ open, onOpenChange }: SearchPillProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  /* Page and section descriptions are fixed UI copy that reads as the
     title's continuing sentence; product rows reuse the ledger's own
     descriptions. House copy rules: no em dashes, no invented claims. */
  const pageDesc: Record<string, string> = {
    Products: "Everything we have shipped, live and clickable.",
    Insights: "Field notes, when we have something worth reading.",
    About: "A small firm that ships, and how it works.",
    University: "Programs built around shipping real software.",
    "Product Development": "From idea to running software.",
    "IT Services": "The unglamorous work that keeps systems up.",
    "IT Staffing": "We send people we would hire ourselves.",
    "Corporate L&D": "Teams leave having shipped something.",
    "How We Work": "An engagement, step by step.",
    "About Elsheph": "Who we are, in plain terms.",
    Contact: "Tell us what you want built.",
  };

  const index = useMemo<Result[]>(() => {
    const pages: Result[] = navLinks.map((link) => ({
      title: link.label,
      desc: pageDesc[link.label] ?? "",
      href: link.href,
    }));
    const sections: Result[] = sectionAnchors
      .filter((anchor) => !navLinks.some((l) => l.label === anchor.label))
      .map((anchor) => ({
        title: anchor.label,
        desc: pageDesc[anchor.label] ?? "",
        href: anchor.href,
      }));
    const products: Result[] = liveProducts.map((product) => ({
      title: product.name,
      desc: product.description,
      href: product.url ?? "/products",
      external: Boolean(product.url),
    }));
    const contact: Result[] = [emails.sales, emails.contact].map((email) => ({
      title: email,
      desc: "Reaches a real inbox.",
      href: `mailto:${email}`,
      external: true,
    }));
    return [...pages, ...sections, ...products, ...contact];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return index.slice(0, 6);
    return index
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [index, query]);

  const active = Math.min(activeIndex, Math.max(results.length - 1, 0));

  const collapse = () => {
    setQuery("");
    setActiveIndex(0);
    onOpenChange(false);
  };

  const go = (result: Result) => {
    collapse();
    if (result.external) {
      window.open(result.href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(result.href);
  };

  /* Focus the input whenever the pill opens (button click or ⌘K). */
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /* Click outside the pill + panel collapses. */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) collapse();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && results.length > 0) {
      event.preventDefault();
      go(results[active]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      collapse();
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        aria-label="Search (Command K)"
        aria-expanded={false}
        className="header-search ml-auto flex size-9 items-center justify-center text-ink transition-colors duration-150 hover:text-accent"
      >
        <Search className="size-[18px]" />
      </button>
    );
  }

  return (
    <div ref={rootRef} className="relative ml-auto">
      <div className="search-pill">
        <Search className="size-[15px] shrink-0 opacity-70" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search pages and products…"
          aria-label="Search pages and products"
          autoComplete="off"
          spellCheck={false}
        />
        {/* × clears the query first, then collapses the pill. */}
        <button
          type="button"
          aria-label={query ? "Clear search" : "Close search"}
          onClick={() => (query ? setQuery("") : collapse())}
          className="flex size-5 shrink-0 items-center justify-center opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="size-[14px]" />
        </button>
      </div>

      {/* Typeahead panel: exactly the pill's width, frosted, hairline rows. */}
      {results.length > 0 ? (
        <div className="search-panel" role="listbox" aria-label="Search results">
          {results.map((result, i) => (
            <button
              key={`${result.href}-${result.title}`}
              type="button"
              role="option"
              aria-selected={i === active}
              data-active={i === active || undefined}
              className="search-row"
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => go(result)}
            >
              <span className="search-row-title block">{result.title}</span>
              {result.desc ? (
                <span className="search-row-desc block">{result.desc}</span>
              ) : null}
            </button>
          ))}
        </div>
      ) : (
        <div className="search-panel">
          <p className="search-row search-row-desc">Nothing matches that.</p>
        </div>
      )}
    </div>
  );
}

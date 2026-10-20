"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { heroHeadline, homeCta, site } from "@/content/site";
import {
  productImage,
  statusLabel,
  visibleProducts,
  type Product,
} from "@/content/products";
import ArchNav from "./ArchNav";
import "./lab-b.css";

/** Timeline, in ms from mount. */
const ARM_AT = 1500; /* entrance done: the first arch opens, caption fades in */
const CYCLE_MS = 5000; /* the open window moves to the next arch */
const HOLD_AFTER_TOUCH_MS = 8000; /* a user scroll on mobile pauses the cycle */

const windows: readonly Product[] = visibleProducts;

/* Captures whose subject sits in the centre (an app icon, a mockup fan)
   are cropped on centre; web pages carry their headline on the left, so
   their windows look a third of the way in. Values are percentages of the
   image's own width, read by lab-b.css as --lb-x. */
const centredCaptures = new Set(["believersdiary", "jobsudarshan", "follow-me"]);
const cropX = (product: Product): string =>
  centredCaptures.has(product.id) ? "-50%" : "-36%";

/** One line that says what the viewer is looking at without inventing anything. */
function frameLabel(product: Product): string {
  const who = product.kind === "client" ? "Client work" : "Elsheph product";
  const platform = product.platforms?.length
    ? `, ${product.platforms.join(" and ")}`
    : "";
  return `${who}${platform}. ${statusLabel[product.status as keyof typeof statusLabel]}.`;
}

/**
 * The signature: a row of the brand's arches standing on a floor line, each
 * one a window onto a real product screenshot that pans slowly. The open
 * arch is taller and wider, carries a name plate at its foot, and the
 * caption at the top right names it in full. Hover or focus takes over the
 * cycle; leaving hands it back.
 */
export default function ArchedWindows() {
  const [active, setActive] = useState(0);
  const [armed, setArmed] = useState(false);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const touchTimer = useRef<number | null>(null);
  const userScrolling = useRef(false);

  /* Reduced motion: no entrance, no cycle. The still composition is the
     armed one, so arm immediately. */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setArmed(true), reduced ? 0 : ARM_AT);
    return () => window.clearTimeout(id);
  }, [reduced]);

  /* The cycle: runs only once armed, never under reduced motion, and never
     while a hand or a focus ring is on the row. */
  useEffect(() => {
    if (!armed || reduced || held) return;
    const id = window.setInterval(
      () => setActive((current) => (current + 1) % windows.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [armed, reduced, held]);

  /* Below md the row scrolls; bring the open arch into view when the cycle
     (not the user) moved it. */
  useEffect(() => {
    const row = rowRef.current;
    if (!row || !armed || userScrolling.current) return;
    if (row.scrollWidth <= row.clientWidth + 1) return;
    const arch = row.children[active] as HTMLElement | undefined;
    if (!arch) return;
    row.scrollTo({
      left: Math.max(0, arch.offsetLeft - 20),
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, armed, reduced]);

  /* A user scroll on the snap row pauses the cycle for a while and lets the
     nearest arch become the open one once the row settles. */
  const onRowPointerDown = useCallback(() => {
    const row = rowRef.current;
    if (!row || row.scrollWidth <= row.clientWidth + 1) return;
    userScrolling.current = true;
    setHeld(true);
    if (touchTimer.current) window.clearTimeout(touchTimer.current);
    touchTimer.current = window.setTimeout(() => {
      userScrolling.current = false;
      setHeld(false);
    }, HOLD_AFTER_TOUCH_MS);
  }, []);

  const onRowScroll = useCallback(() => {
    const row = rowRef.current;
    if (!row || !userScrolling.current) return;
    const left = row.scrollLeft + 20;
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    Array.from(row.children).forEach((child, index) => {
      const distance = Math.abs((child as HTMLElement).offsetLeft - left);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  }, []);

  const product = windows[active];

  return (
    <section className="lb-root">
      <ArchNav />

      {/* Headline left, caption right, on the shell rail. */}
      <div className="shell relative z-10 mt-4 grid w-full items-start gap-x-10 gap-y-4 md:mt-8 md:grid-cols-12 md:gap-y-0">
        <div className="md:col-span-7">
          <h1
            className="lb-rise font-display text-[clamp(2.75rem,1.4rem+5vw,6rem)] leading-[1.02] font-[380] tracking-[-0.015em] text-ink"
            style={{ animationDelay: "120ms" }}
          >
            {heroHeadline.lead}
            <em className="text-brand">{heroHeadline.accent}</em>
            {heroHeadline.trail}
          </h1>
          <p
            className="lb-rise mt-4 max-w-[520px] text-[15px] leading-relaxed text-ink-mid md:text-[17px]"
            style={{ animationDelay: "260ms" }}
          >
            {site.name} builds software and ships it: our own products, client
            products, and the engineers who make both. Each window below opens
            onto something we built.
          </p>
          <Link
            href={homeCta.href}
            className="lb-rise link-arrow lb-focus mt-4 inline-flex rounded-sm text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover md:hidden"
            style={{ animationDelay: "360ms" }}
          >
            {homeCta.label}
          </Link>
        </div>

        <div
          className="lb-caption md:col-span-5 md:justify-self-end md:pt-3 md:text-right"
          data-armed={armed || undefined}
        >
          <div key={product.id} className="lb-cap">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-faint uppercase">
              In the window, {String(active + 1).padStart(2, "0")} of{" "}
              {String(windows.length).padStart(2, "0")}
            </p>
            <h2 className="mt-1.5 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-tight font-[420] text-ink">
              {product.name}
            </h2>
            <p className="mt-2 max-w-[420px] text-[14px] leading-relaxed text-ink-mid md:ml-auto md:text-[15px]">
              {product.description}
            </p>
            <p className="mt-2 hidden text-[12px] text-faint md:block">
              {frameLabel(product)}
            </p>
            {product.url ? (
              <a
                href={product.url}
                target="_blank"
                rel="noreferrer"
                className="link-arrow lb-focus mt-3 inline-flex rounded-sm text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                Visit {product.name}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* The arches. The row takes whatever height is left; the floor line
          closes the screen. */}
      <div
        ref={rowRef}
        className="lb-row"
        data-armed={armed || undefined}
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => {
          if (!userScrolling.current) setHeld(false);
        }}
        onPointerDown={onRowPointerDown}
        onScroll={onRowScroll}
        onFocus={() => setHeld(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setHeld(false);
          }
        }}
      >
        {windows.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="lb-arch"
            data-active={index === active || undefined}
            aria-pressed={index === active}
            aria-label={`Look into ${item.name}`}
            style={{
              animationDelay: `${420 + index * 70}ms`,
            }}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span className="lb-ring lb-ring-2" aria-hidden />
            <span className="lb-ring lb-ring-1" aria-hidden />
            <span className="lb-glass">
              {/* Plain img by design: the window crops and pans a fixed
                  1280x800 capture, which next/image's sizing fights. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={productImage(item)}
                alt={`${item.name}, as it runs`}
                draggable={false}
                style={
                  {
                    animationDelay: `${-index * 2300}ms`,
                    "--lb-x": cropX(item),
                  } as React.CSSProperties
                }
              />
              <span className="lb-plate">
                <span className="block font-display text-[15px] leading-tight">
                  {item.name}
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="lb-floor w-full" aria-hidden />

      <div className="shell flex w-full items-center justify-between py-3">
        <p className="font-display text-[14px] text-ink-mid italic">
          {site.footerTagline}
        </p>
        <p className="hidden text-[11px] text-faint sm:block">
          © {new Date().getFullYear()} {site.copyrightHolder}
        </p>
      </div>
    </section>
  );
}

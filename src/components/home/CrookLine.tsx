"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroHeadline, homeCta, site, socials } from "@/content/site";
import { productImage, visibleProducts } from "@/content/products";
import { buildGeometry, type Geometry } from "./crookGeometry";
import styles from "./crook.module.css";

/**
 * The home page, "The Crook line": one non-scrolling viewport.
 *
 * One continuous stroke, drawn on load: it starts at the hook's tip, coils
 * into the shepherd's crook from the seal, runs down the staff, sweeps across
 * the screen and settles as the rule beneath the site header. The curl frames
 * the headline; real product screenshots ride the sweep as plates and slide
 * along it with the pointer (a slow drift on touch). Everything eases to a
 * stop; reduced motion shows the finished composition at once. The header is
 * the site-wide SiteHeader, fixed above.
 *
 * Timeline (ms from load):
 *  200  stroke begins; the crook is complete by ~1400, the sweep by ~2150,
 *       the bar reaches the left edge at 3200
 * 1300  headline lines rise (two lines, 120 apart)
 * 1750  lede and CTA rise
 * 1900  plates fade in along the sweep, 110 apart
 * 2700  vine leaves settle on the staff
 * 3000  footer row fades in
 */

/* The plates: the products with a screenshot worth showing at thumbnail
   size. Only ledger products; links go to the product's own url. */
const PLATE_IDS = [
  "elsheph-scripture",
  "gmv-live",
  "srm-student-store",
  "elsheph-hymn",
  "synth",
] as const;

const plates = PLATE_IDS.map((id) => visibleProducts.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const LEAF_LEFT = "M0 0 C-22 -4 -34 -20 -36 -34 C-18 -30 -4 -16 0 0 Z";
const LEAF_RIGHT = "M0 0 C22 -4 34 -20 36 -34 C18 -30 4 -16 0 0 Z";

function useViewport() {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useLayoutEffect(() => {
    const measure = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return size;
}

export default function CrookLine() {
  const size = useViewport();
  const geo: Geometry | null = useMemo(
    () => (size ? buildGeometry(size.w, size.h) : null),
    [size],
  );

  const sweepRef = useRef<SVGPathElement | null>(null);
  const plateRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  /* Plates ride the sweep. The frame loop lerps a shared offset toward the
     pointer's target (or a slow sine drift on touch) and writes positions
     straight to style, so React never re-renders per frame. */
  useEffect(() => {
    const path = sweepRef.current;
    if (!path || !geo) return;
    const count = geo.narrow ? 3 : plates.length;
    const total = path.getTotalLength();
    /* Where along the sweep each plate sits at rest. */
    const lo = geo.narrow ? 0.2 : 0.12;
    const hi = geo.narrow ? 0.7 : 0.82;
    const span = hi - lo;
    /* How far the pointer (or the drift) can push the plates along the
       sweep, in path fraction. Small enough that the top plate never reaches
       the bar and the last plate never leaves the viewport. */
    const reach = geo.narrow ? 0.035 : 0.06;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(hover: none)");

    let target = 0;
    let current = 0;
    let raf = 0;
    let running = true;
    const start = performance.now();

    const place = () => {
      for (let i = 0; i < count; i += 1) {
        const node = plateRefs.current[i];
        if (!node) continue;
        const rest = count === 1 ? 0.5 : lo + (span * i) / (count - 1);
        const t = Math.min(0.98, Math.max(0.02, rest + current));
        const p = path.getPointAtLength(t * total);
        const q = path.getPointAtLength(Math.min(total, t * total + 6));
        const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
        /* Follow the tangent a quarter of the way, within 8 degrees, so the
           plates lean with the line without reading as askew. */
        const tilt = Math.max(-8, Math.min(8, angle * 0.25));
        node.style.setProperty("--x", `${p.x.toFixed(1)}px`);
        node.style.setProperty("--y", `${p.y.toFixed(1)}px`);
        node.style.setProperty("--r", `${tilt.toFixed(2)}deg`);
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      if (touch.matches) {
        target = reach * Math.sin((now - start) / 5200);
      }
      const diff = target - current;
      if (Math.abs(diff) > 0.0004) {
        current += diff * 0.07;
        place();
      } else if (current !== target) {
        current = target;
        place();
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      if (reduced.matches) return;
      target = (event.clientX / window.innerWidth - 0.5) * 2 * reach;
    };

    place();
    if (!reduced.matches) {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(frame);
    }
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [geo]);

  const year = new Date().getFullYear();
  const narrow = geo?.narrow ?? false;
  const plateW = narrow
    ? 112
    : Math.max(124, Math.min(156, (size?.w ?? 1440) * 0.105));

  return (
    <div className={styles.root}>
      {/* The line. Rendered once the viewport is measured; the stroke's
          draw animation starts on mount. */}
      {geo ? (
        <svg
          className={styles.lineLayer}
          viewBox={`0 0 ${size!.w} ${size!.h}`}
          width={size!.w}
          height={size!.h}
          aria-hidden
        >
          <path ref={sweepRef} d={geo.sweep} fill="none" stroke="none" />
          <path className={styles.thread} d={geo.d} pathLength={1} />
          {geo.leaves.map(([x, y, k, mirrored], i) => (
            <path
              key={i}
              className={styles.leaf}
              d={mirrored ? LEAF_RIGHT : LEAF_LEFT}
              transform={`translate(${x} ${y}) scale(${k})`}
              style={{ animationDelay: `${2700 + i * 90}ms` }}
            />
          ))}
        </svg>
      ) : null}

      {/* The headline, in the hollow of the crook. */}
      {geo ? (
        <div
          className="absolute z-10"
          style={{ left: geo.copy.left, top: geo.copy.top, width: geo.copy.width }}
        >
          <h1 className={styles.headline}>
            <span
              className={`${styles.rise} block`}
              style={{ ["--d" as string]: "1300ms" }}
            >
              {heroHeadline.lead.trim()}
            </span>
            <span
              className={`${styles.rise} block`}
              style={{ ["--d" as string]: "1420ms" }}
            >
              <em>{heroHeadline.accent}</em>
              {heroHeadline.trail}
            </span>
          </h1>
          <p
            className={`${styles.lede} ${styles.rise} mt-5 sm:mt-7`}
            style={{ ["--d" as string]: "1750ms" }}
          >
            {site.description}
          </p>
          <div
            className={`${styles.rise} mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-8`}
            style={{ ["--d" as string]: "1850ms" }}
          >
            <Link href={homeCta.href} className={styles.cta}>
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
            <Link href="/products" className={`${styles.quiet} link-arrow`}>
              See the products
            </Link>
          </div>
        </div>
      ) : null}

      {/* The plates, riding the sweep. */}
      {geo
        ? plates.slice(0, narrow ? 3 : plates.length).map((product, i) => {
            const href = product.url ?? "/products";
            const external = Boolean(product.url);
            return (
              <a
                key={product.id}
                ref={(node) => {
                  plateRefs.current[i] = node;
                }}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={`${styles.plate} z-10`}
                style={{
                  ["--plate-w" as string]: `${plateW}px`,
                  ["--d" as string]: `${1900 + i * 110}ms`,
                }}
                aria-label={`${product.name}: ${product.description}`}
              >
                <Image
                  src={productImage(product)}
                  alt={`Screenshot of ${product.name}`}
                  width={1280}
                  height={800}
                  sizes="160px"
                />
                <span className={styles.plateLabel} aria-hidden>
                  {product.name}
                </span>
              </a>
            );
          })
        : null}

      {/* Footer row, baked into the viewport, with the official mark. */}
      <footer
        className={`${styles.fade} absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 px-6 pb-5 sm:px-10 sm:pb-7 lg:px-14`}
        style={{ ["--d" as string]: "3000ms" }}
      >
        <div className="flex items-center gap-3">
          <Image
            src={site.logo.symbolDark}
            alt=""
            width={271}
            height={402}
            unoptimized
            className="h-9 w-auto"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-[0.08em] text-ink uppercase">
              {site.name}
            </span>
            <span className="hidden font-display text-[14px] italic text-ink-mid sm:inline">
              {site.footerTagline}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.navLink} text-[12px]`}
              >
                {social.label}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-faint">
            © {year} {site.copyrightHolder}
          </p>
        </div>
      </footer>
    </div>
  );
}

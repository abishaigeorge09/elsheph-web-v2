"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * ProductEmbed — a living thumbnail of a live product site.
 *
 * For a product the probe stamped `embeddable: true`, this renders the real
 * homepage in an iframe at 1280×800 desktop size, scaled down with
 * `transform: scale()` to fill whatever slot the parent gives it — a
 * glimpse of the live site, not an interactive frame (`pointer-events:
 * none`, so clicks pass through to the card's own anchor).
 *
 * Layering: the product's generated art renders as the base layer always.
 * It is the loading skeleton (the live page cross-fades in over it once
 * `onLoad` fires) AND the automatic fallback — if the iframe has not loaded
 * within 8 seconds, or the product is not embeddable, or it has no URL, the
 * art simply stays. No broken grey frame can ever render.
 *
 * Cost control:
 * - The iframe mounts only when the slot is within ~200px of the viewport
 *   (IntersectionObserver) and unmounts again when it leaves, capping how
 *   many live pages exist at once.
 * - `loading="lazy"` and a `sandbox` keep each frame cheap and contained.
 * - PERFORMANCE GUARD (spec): on 390px mobile the featured strip passes
 *   `allow={false}` — art tiles only, no iframes, data cost — and the grid
 *   allows embeds for at most its first 3 embeddable cards; every other
 *   card renders art. Desktop embeds lazily everywhere. The `allow` prop is
 *   computed by ProductsView.
 */

const FRAME_WIDTH = 1280;
const LOAD_TIMEOUT_MS = 8000;

export default function ProductEmbed({
  url,
  embeddable,
  name,
  artSrc,
  allow = true,
}: {
  url?: string;
  embeddable?: boolean;
  name: string;
  /** The generated art, e.g. `/art/products/{id}.svg`. */
  artSrc: string;
  /** Parent-computed performance gate (mobile rules). */
  allow?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);
  const [inView, setInView] = useState(false);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const wantsEmbed = Boolean(allow && embeddable && url && !failed);

  /* Slot measurement — the scale is slotWidth / 1280, and the frame is given
     exactly enough page height to fill the slot after scaling. */
  useEffect(() => {
    const node = rootRef.current;
    if (!node || !wantsEmbed) return;
    const measure = () =>
      setSize({ w: node.clientWidth, h: node.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [wantsEmbed]);

  /* Mount the iframe near the viewport only; unmount when it leaves. */
  useEffect(() => {
    const node = rootRef.current;
    if (!node || !wantsEmbed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          loadedRef.current = false;
          setLoaded(false);
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [wantsEmbed]);

  /* The 8s fallback clock: an iframe that never fires onLoad (blocked,
     unreachable, silently refused) flips this card to art for good. */
  useEffect(() => {
    if (!wantsEmbed || !inView || loaded) return;
    const timer = setTimeout(() => {
      if (!loadedRef.current) setFailed(true);
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [wantsEmbed, inView, loaded]);

  const scale = size ? size.w / FRAME_WIDTH : 0;

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {/* Art base: skeleton while the live page loads, fallback forever if
          it never does. */}
      <Image src={artSrc} alt="" fill unoptimized className="object-cover" />

      {wantsEmbed && inView && size && scale > 0 ? (
        <iframe
          src={url}
          title={`Live preview of ${name}`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          aria-hidden
          tabIndex={-1}
          className="pointer-events-none absolute top-0 left-0 border-0 transition-opacity duration-500"
          style={{
            width: FRAME_WIDTH,
            height: Math.ceil(size.h / scale),
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            opacity: loaded ? 1 : 0,
          }}
          onLoad={() => {
            loadedRef.current = true;
            setLoaded(true);
          }}
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}

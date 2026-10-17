"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site, heroHeadline, homeCta } from "@/content/site";
import SocialChips from "@/components/layout/SocialChips";
import { heroSlides, type HeroSlide } from "@/content/heroMedia";

/**
 * A hero slide that is a LIVE SITE — the same scaled-iframe technique as
 * ProductEmbed, full-bleed: the frame renders at 1280 CSS px wide and is
 * scaled to the viewport, pointer-inert, with the slide's fallback art
 * painted beneath so nothing is ever blank. If the page has not loaded
 * within 8s (or errors), `onFail` tells the carousel to skip this slide.
 */
function HeroEmbedSlide({
  slide,
  active,
  failed,
  onFail,
}: {
  slide: Extract<HeroSlide, { type: "embed" }>;
  active: boolean;
  failed: boolean;
  onFail: () => void;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [loaded, setLoaded] = useState(false);

  /* The slide layer is the viewport; measure it for the scale. */
  useEffect(() => {
    const node = rootRef.current;
    if (!node || failed) return;
    const measure = () =>
      setSize({ w: node.clientWidth, h: node.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [failed]);

  /* 8s fallback clock — a frame that never loads takes this slide out of
     the rotation. */
  useEffect(() => {
    if (failed || loaded) return;
    const timer = setTimeout(() => {
      if (!loadedRef.current) onFail();
    }, 8000);
    return () => clearTimeout(timer);
  }, [failed, loaded, onFail]);

  const scale = size ? size.w / 1280 : 0;

  return (
    <div
      ref={rootRef}
      className="hero-slide overflow-hidden"
      data-active={active || undefined}
    >
      {/* Fallback art beneath: the skeleton while the site loads, and the
          ground if it never does. (Plain img — same reasoning as the image
          slides above: SVG source, object-cover.) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.fallbackSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!failed && size && scale > 0 ? (
        <iframe
          src={slide.url}
          title={`Live view of ${slide.name}`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          aria-hidden
          tabIndex={-1}
          className="pointer-events-none absolute top-0 left-0 border-0 transition-opacity duration-700"
          style={{
            width: 1280,
            height: Math.ceil(size.h / scale),
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            opacity: loaded ? 1 : 0,
          }}
          onLoad={() => {
            loadedRef.current = true;
            setLoaded(true);
          }}
          onError={onFail}
        />
      ) : null}
      {/* Live sites are mostly white; the global 22% veil is not enough for
          the cream header chrome, so an embed slide dims itself further. */}
      <div className="art-veil-embed absolute inset-0" aria-hidden />
    </div>
  );
}

/**
 * The homepage: still ONE non-scrolling `h-dvh` viewport — the a16z signature,
 * confirmed by measurement (`scrollHeight === innerHeight`, scrollY stuck at
 * 0) — but now in a16z's actual hero mode: FULL-BLEED dark media behind the
 * headline, not a split panel. The media layer is an auto-advancing crossfade
 * carousel driven by the manifest in src/content/heroMedia.ts (the founder
 * drops files into public/hero-media/ and lists them there). No controls of
 * any kind: no arrows, no dots, no counter, no pause — 7s per slide, 1200ms
 * crossfade, looping forever. A single slide never transitions.
 *
 * Videos play muted/inline/looping, never with audio; the 7s timer advances
 * regardless of clip length, so behaviour stays predictable. Under
 * prefers-reduced-motion the crossfade collapses to a hard cut (globals.css)
 * and videos are paused on their first frame instead of autoplaying.
 *
 * Text over the media reads through the `.band-media` scope — the .band-deep
 * token re-pointing without the opaque ground — so every colour in here is a
 * semantic class and no --deep-* literal appears. The .art-scrim (bottom-up
 * espresso gradient) plus a faint full .art-veil keep the headline and the
 * transparent header legible over any slide.
 *
 * The footer stays baked into the same viewport (ConditionalFooter skips this
 * route). All copy renders from the ledgers; nothing is written here.
 */
export default function HomeHero() {
  const year = new Date().getFullYear();
  const [active, setActive] = useState(0);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  /* Embed slides that failed to load drop out of the rotation — the
     carousel never shows a blank. Held in a ref-mirrored state so the
     interval callback always sees the current set. */
  const [failed, setFailed] = useState<ReadonlySet<number>>(new Set());
  const failedRef = useRef(failed);
  useEffect(() => {
    failedRef.current = failed;
  }, [failed]);

  const nextFrom = useCallback((current: number) => {
    const n = heroSlides.length;
    let next = (current + 1) % n;
    while (failedRef.current.has(next) && next !== current) {
      next = (next + 1) % n;
    }
    return next;
  }, []);

  const markFailed = useCallback(
    (index: number) => {
      setFailed((prev) => new Set(prev).add(index));
      /* If the failed slide is showing, move off it now rather than letting
         it sit until the timer fires. */
      setActive((current) => (current === index ? nextFrom(index) : current));
    },
    [nextFrom],
  );

  /* The 7s advance timer, skipping failed slides. With fewer than two
     slides there is nothing to advance, so no timer runs and no transition
     can ever fire. */
  useEffect(() => {
    if (heroSlides.length < 2) return;
    const id = setInterval(() => setActive((current) => nextFrom(current)), 7000);
    return () => clearInterval(id);
  }, [nextFrom]);

  /* Reduced motion: pause every video on its first frame rather than
     autoplaying. Applied in an effect (not by toggling the autoPlay prop) so
     the server and client render identical markup. */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      for (const video of videoRefs.current.values()) {
        if (query.matches) {
          video.pause();
          video.currentTime = 0;
        } else if (video.paused) {
          void video.play().catch(() => {});
        }
      }
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-page">
      {/* Full-bleed media layer: every slide covers the whole viewport;
          data-active drives the crossfade (globals.css .hero-slide). */}
      <div aria-hidden className="absolute inset-0">
        {heroSlides.map((slide, index) =>
          slide.type === "embed" ? (
            <HeroEmbedSlide
              key={slide.url}
              slide={slide}
              active={index === active}
              failed={failed.has(index)}
              onFail={() => markFailed(index)}
            />
          ) : slide.type === "video" ? (
            <video
              key={slide.src}
              ref={(node) => {
                if (node) videoRefs.current.set(slide.src, node);
                else videoRefs.current.delete(slide.src);
              }}
              className="hero-slide"
              data-active={index === active || undefined}
              src={slide.src}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              tabIndex={-1}
            />
          ) : (
            /* Plain img by design: founder-dropped files of arbitrary
               format/size; object-cover is the predictable path and
               next/image refuses SVG sources. */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={slide.src}
              className="hero-slide"
              data-active={index === active || undefined}
              src={slide.src}
              alt={slide.alt ?? ""}
            />
          ),
        )}
        {/* Legibility layers: faint even veil over everything (keeps the
            transparent header's cream chrome readable), then the bottom-up
            scrim under the headline. */}
        <div className="art-veil absolute inset-0" />
        <div className="art-scrim absolute inset-0" />
      </div>

      {/* Everything textual sits over dark media, so the whole column reads
          the deep ramp via .band-media — semantic classes only below. */}
      <div className="band-media relative z-10 flex h-full w-full flex-col justify-end">
        {/* Headline block, bottom-left ON THE SHELL RAIL — the reference
            sets its hero copy on the same centred container line as every
            interior page, not at the viewport edge. Founder positioning fix. */}
        <div className="shell w-full pb-6 md:pb-10">
          {/* No eyebrow — founder decision. The headline stands alone, on
              the hero-only larger cut of the flattened scale. */}
          <h1
            className="az-h1 az-h1-hero hero-rise max-w-[560px] text-ink"
            style={{ animationDelay: "80ms" }}
          >
            {heroHeadline.lead}
            <em className="text-accent">{heroHeadline.accent}</em>
            {heroHeadline.trail}
          </h1>
          <Link
            href={homeCta.href}
            className="link-arrow hero-rise mt-6 text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
            style={{ animationDelay: "160ms" }}
          >
            {homeCta.label}
          </Link>
        </div>

        {/* Footer row, baked into the same viewport. The real SiteFooter is
            hidden on this route by ConditionalFooter; the tagline lives there
            too, so it may drop out of this row below md without losing its
            only home. */}
        {/* Footer lockup, per the reference: seal + wordmark side by side,
            the tagline on its own line BELOW the lockup; on the right the
            circular social chips with the legal line beneath them. */}
        <div className="shell flex w-full flex-wrap items-end justify-between gap-x-8 gap-y-4 pb-5 md:pb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              {/* The seal, in currentColor via the mask helper — cream here
                  because the row sits inside .band-media. */}
              <span className="seal-mark size-9 text-ink" aria-hidden />
              <span className="text-sm font-semibold tracking-[0.08em] text-ink uppercase">
                {site.name}
              </span>
            </div>
            <span className="hidden font-display text-[15px] italic text-ink-mid md:inline">
              {site.footerTagline}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2.5 sm:items-end">
            <SocialChips />
            <p className="text-xs text-faint">
              © {year} {site.copyrightHolder}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

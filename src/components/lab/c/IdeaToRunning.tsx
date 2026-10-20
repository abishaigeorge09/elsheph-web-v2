"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { homeCta, site } from "@/content/site";
import { productImage, statusLabel } from "@/content/products";
import {
  BEATS,
  CYCLE_MS,
  TYPE_SHARE,
  locate,
  scenes,
  type Position,
} from "@/components/lab/c/script";
import Wireframe from "@/components/lab/c/Wireframe";
import LabMenu from "@/components/lab/c/LabMenu";
import "./lab-c.css";

/**
 * Direction C, "Idea to running".
 *
 * The page performs the tagline "From idea to running software." on a loop,
 * one cycle per live product, in four beats: the idea is typed, scoped into
 * three plan lines, drawn as a hairline wireframe of the real screen, then
 * resolved into the real screenshot with a Visit link. The four beat labels
 * are the progress rail, and the rail is the nav strip.
 *
 * One rAF clock drives everything; the rail fills are written straight to
 * the DOM so the component only re-renders when a beat, a typed character
 * or a plan line changes. Under prefers-reduced-motion the clock never
 * starts and the page is the first product's Running beat, complete.
 */

type Frame = {
  pos: Position;
  chars: number;
  planShown: number;
  /** Which product's screenshot the frame holds; only swaps on a Running beat. */
  imageIndex: number | null;
};

const STILL: Frame = {
  pos: { productIndex: 0, beatIndex: 3, beat: BEATS[3], progress: 1 },
  chars: Number.MAX_SAFE_INTEGER,
  planShown: 3,
  imageIndex: 0,
};

const INITIAL: Frame = {
  pos: { productIndex: 0, beatIndex: 0, beat: BEATS[0], progress: 0 },
  chars: 0,
  planShown: 0,
  imageIndex: null,
};

function planCount(progress: number) {
  if (progress < 0.08) return 0;
  if (progress < 0.38) return 1;
  if (progress < 0.68) return 2;
  return 3;
}

function frameAt(elapsed: number, prevImage: number | null): Frame {
  const pos = locate(elapsed, scenes.length);
  const idea = scenes[pos.productIndex].idea;
  const { beatIndex, progress } = pos;
  const chars =
    beatIndex === 0
      ? Math.min(idea.length, Math.floor((progress / TYPE_SHARE) * idea.length))
      : idea.length;
  const planShown = beatIndex === 0 ? 0 : beatIndex === 1 ? planCount(progress) : 3;
  const imageIndex = beatIndex === 3 ? pos.productIndex : prevImage;
  return { pos, chars, planShown, imageIndex };
}

const CAPTION: Record<string, string> = {
  idea: "Writing the idea.",
  plan: "Scoping it.",
  build: "Drawing the first screen.",
};

export default function IdeaToRunning() {
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState<Frame>(INITIAL);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const baseRef = useRef<number | null>(null);
  const frameRef = useRef<Frame>(INITIAL);

  const still = reduced === true;
  const live = still ? STILL : frame;
  const scene = scenes[live.pos.productIndex];
  const beat = live.pos.beat.id;

  /* Rail fills: written straight to the DOM, every frame. */
  const paintRail = useCallback((pos: Position) => {
    fillRefs.current.forEach((el, slot) => {
      if (!el) return;
      /* Two rails (desktop and mobile) share the ref list, offset by BEATS.length. */
      const i = slot % BEATS.length;
      const v = i < pos.beatIndex ? 1 : i === pos.beatIndex ? pos.progress : 0;
      el.style.transform = `scaleX(${v})`;
    });
  }, []);

  useEffect(() => {
    if (reduced !== false) {
      if (reduced) paintRail(STILL.pos);
      return;
    }
    let raf = 0;
    const tick = (now: number) => {
      if (baseRef.current === null) baseRef.current = now;
      if (now < baseRef.current) return;
      const prev = frameRef.current;
      const next = frameAt(now - baseRef.current, prev.imageIndex);
      if (
        next.pos.productIndex !== prev.pos.productIndex ||
        next.pos.beatIndex !== prev.pos.beatIndex ||
        next.chars !== prev.chars ||
        next.planShown !== prev.planShown
      ) {
        frameRef.current = next;
        setFrame(next);
      }
      paintRail(next.pos);
    };
    const loop = (now: number) => {
      tick(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    /* Timer fallback: a tab without compositor frames (hidden, or headless
       under a virtual clock) still advances the performance. */
    const timer = window.setInterval(() => tick(performance.now()), 40);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
    };
  }, [reduced, paintRail]);

  /* Rail click: jump to that beat of the current product. */
  const jump = useCallback(
    (beatIndex: number) => {
      if (still) return;
      const now = performance.now();
      const target =
        frameRef.current.pos.productIndex * CYCLE_MS +
        BEATS.slice(0, beatIndex).reduce((s, b) => s + b.ms, 0);
      baseRef.current = now - target;
    },
    [still],
  );

  /* Product index click: jump to the Idea beat of that product. */
  const jumpTo = useCallback(
    (productIndex: number) => {
      if (still) return;
      baseRef.current = performance.now() - productIndex * CYCLE_MS;
    },
    [still],
  );

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const typed = scene.idea.slice(0, live.chars);
  const typing = !still && beat === "idea";
  /* The screenshot only swaps source once a Running beat begins, so the
     previous product's image fades out before the next one is loaded in. */
  const imageScene = live.imageIndex === null ? null : scenes[live.imageIndex];
  const running = beat === "running";
  const product = scene.product;

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-page text-ink">
      {/* Static summary for assistive tech; the performance below is aria-hidden. */}
      <div className="sr-only">
        <h1>{site.footerTagline}</h1>
        <p>
          The hero plays each product in four beats: idea, plan, build, running.
        </p>
        <ul>
          {scenes.map((s) => (
            <li key={s.product.id}>
              {s.product.name}. Idea: {s.idea} Plan: {s.plan.join(" ")}
            </li>
          ))}
        </ul>
      </div>

      {/* Nav strip: wordmark, the beat rail, menu, CTA. */}
      <header className="shrink-0 border-b border-line">
        <div className="flex h-14 items-center gap-3 px-5 sm:h-16 sm:gap-6 sm:px-8">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Image
              src={site.logo.wordmarkDark}
              alt={site.name}
              width={495}
              height={86}
              priority
              className="h-[18px] w-auto sm:h-[22px]"
            />
          </Link>

          <Rail
            activeIndex={live.pos.beatIndex}
            onJump={jump}
            fillRefs={fillRefs}
            className="hidden flex-1 md:flex"
          />

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            {/* .btn sets display itself, so the breakpoint lives on a wrapper. */}
            <span className="hidden sm:block">
              <Link href={homeCta.href} className="btn h-10 px-5">
                {homeCta.label}
              </Link>
            </span>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="h-9 px-2 text-[13px] text-ink-mid hover:text-ink sm:h-10 sm:px-3"
            >
              Menu
            </button>
          </div>
        </div>
        <Rail
          activeIndex={live.pos.beatIndex}
          onJump={jump}
          fillRefs={fillRefs}
          className="flex h-10 items-center px-5 md:hidden"
          mobile
        />
      </header>

      {/* The stage. */}
      <main className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-5 px-5 pt-4 pb-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-1 lg:gap-12 lg:pt-8 lg:pb-8">
        <section className="flex min-h-0 flex-col" aria-label="The current product, idea to running">
          <p className="font-display text-[15px] italic text-muted-foreground sm:text-base">
            {site.footerTagline}
          </p>

          <div className="mt-3 lg:my-auto lg:py-8" aria-hidden="true">
            <p className="min-h-[2.2em] font-display text-[clamp(1.7rem,1rem+2.4vw,3rem)] leading-[1.08] tracking-[-0.01em] text-ink">
              <span>{typed}</span>
              {typing ? (
                <span className="labc-caret ml-0.5 inline-block h-[0.85em] w-px translate-y-[0.1em] bg-accent" />
              ) : null}
            </p>

            <ol className="mt-4 lg:mt-7">
              {scene.plan.map((line, i) =>
                i < live.planShown ? (
                  <li
                    key={`${product.id}-${i}`}
                    className="labc-rise grid grid-cols-[2.25rem_1fr] items-baseline border-t border-line py-2 text-[15px] leading-snug text-ink-mid sm:py-2.5 sm:text-base"
                  >
                    <span className="font-display text-sm text-faint">{i + 1}</span>
                    <span>{line}</span>
                  </li>
                ) : null,
              )}
              {live.planShown === 3 ? <li className="border-t border-line" /> : null}
            </ol>
          </div>

          <div className="mt-5 sm:hidden">
            <Link href={homeCta.href} className="btn h-10 w-full">
              {homeCta.label}
            </Link>
          </div>

          <ul
            className="mt-auto hidden flex-wrap gap-x-4 gap-y-1 pt-6 text-[13px] lg:flex"
            aria-label="Products in the loop"
          >
            {scenes.map((s, i) => {
              const current = i === live.pos.productIndex;
              return (
                <li key={s.product.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={current ? "true" : undefined}
                    className={`border-b py-0.5 ${
                      current
                        ? "border-ink text-ink"
                        : "border-transparent text-faint hover:text-ink-mid"
                    }`}
                  >
                    {s.product.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* The screen: blank sheet, then wireframe, then the real thing. */}
        <section
          className="flex min-h-0 flex-col items-center justify-start [container-type:size] lg:justify-center"
          aria-label="The product screen"
        >
          <div className="w-[min(100%,calc((100cqh_-_56px)*1.6))]">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line-strong bg-raised shadow-sm">
              <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center border-b border-line bg-surface px-3 text-[11px] text-faint">
                <span className="truncate">
                  {running ? product.url : "about:blank"}
                </span>
              </div>
              <div className="absolute inset-0 top-7">
                <div
                  className={`labc-sheet labc-ease absolute inset-0 transition-opacity duration-500 ${
                    beat === "idea" || beat === "plan" ? "opacity-100" : "opacity-0"
                  }`}
                />
                {/* Plan: the layout appears as faint guides. Build: it is drawn solid over them. */}
                {beat === "plan" || beat === "build" ? (
                  <div
                    className={`labc-ease absolute inset-0 transition-opacity duration-700 ${
                      live.planShown > 0 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Wireframe strokes={scene.wireframe} drawing={false} guides title={product.name} />
                  </div>
                ) : null}
                {beat === "build" || running ? (
                  <div
                    className={`labc-ease absolute inset-0 transition-opacity duration-700 ${
                      running ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <Wireframe
                      strokes={scene.wireframe}
                      drawing={beat === "build" && !still}
                      title={product.name}
                    />
                  </div>
                ) : null}
                {imageScene ? (
                  <Image
                    src={productImage(imageScene.product)}
                    alt={`${imageScene.product.name}, the live screen`}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    priority={live.imageIndex === 0}
                    className={`labc-ease object-cover object-top transition-opacity duration-700 ${
                      running ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : null}
              </div>
            </div>

            <div className="mt-3 flex h-8 items-baseline gap-x-3 text-[13px] sm:text-sm">
              {running ? (
                <div key={product.id} className="labc-rise flex min-w-0 flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-lg text-ink">{product.name}</span>
                  <span className="text-muted-foreground">
                    {statusLabel[product.status as keyof typeof statusLabel]}
                  </span>
                  {product.url ? (
                    <a
                      href={product.url}
                      className="link-arrow text-accent"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit
                    </a>
                  ) : null}
                </div>
              ) : (
                <span className="text-faint">{CAPTION[beat]}</span>
              )}
            </div>
          </div>
        </section>
      </main>

      <LabMenu open={menuOpen} onClose={closeMenu} returnFocus={menuButtonRef} />
    </div>
  );
}

/** The four beat labels with a hairline track each; the fill is painted by the clock. */
function Rail({
  activeIndex,
  onJump,
  fillRefs,
  className,
  mobile = false,
}: {
  activeIndex: number;
  onJump: (i: number) => void;
  fillRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  className: string;
  mobile?: boolean;
}) {
  const offset = mobile ? BEATS.length : 0;
  return (
    <nav aria-label="Idea to running" className={className}>
      <ol className="mx-auto flex w-full max-w-md items-end gap-3 sm:gap-4">
        {BEATS.map((b, i) => {
          const active = i === activeIndex;
          return (
            <li key={b.id} className="min-w-0 flex-1">
              <button
                type="button"
                onClick={() => onJump(i)}
                aria-current={active ? "step" : undefined}
                className="block w-full text-left"
              >
                <span
                  className={`labc-ease block text-[12px] leading-none transition-colors duration-300 sm:text-[13px] ${
                    active ? "text-ink" : "text-faint"
                  }`}
                >
                  {b.label}
                </span>
                <span className="relative mt-2 block h-px overflow-hidden bg-line">
                  <span
                    ref={(el) => {
                      fillRefs.current[i + offset] = el;
                    }}
                    className="absolute inset-0 origin-left bg-ink"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

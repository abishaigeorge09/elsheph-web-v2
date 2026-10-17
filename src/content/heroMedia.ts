/**
 * HERO MEDIA MANIFEST — the homepage's full-bleed background carousel.
 *
 * HOW TO ADD A SLIDE (founder workflow):
 *   1. Drop the file into `public/hero-media/` in this repo.
 *   2. Add one line to the `heroSlides` array below, e.g.
 *        { src: "/hero-media/factory-floor.webp", type: "image", alt: "Assembly line" },
 *        { src: "/hero-media/reel.mp4", type: "video" },
 *   3. That's it. The homepage crossfades through the array in order,
 *      advancing every 7 seconds, looping forever. No controls are shown.
 *
 * RECOMMENDED FORMATS:
 *   - Images: webp or jpg, 16:9 or wider, 2560px wide is plenty.
 *   - Video: mp4 (H.264) or webm, 16:9 or wider, ≤10MB, no audio needed
 *     (it plays muted always). Keep clips short — they loop.
 *   - Everything renders `object-cover` over the full viewport, so edges
 *     crop on narrow screens: keep the subject centred.
 *
 * The array ships with one entry — the committed generated artwork — so the
 * page never renders an empty background. Replace or extend it with real
 * photography/footage whenever it exists.
 */

export type HeroSlide =
  | {
      /** Public path, e.g. "/hero-media/site-visit.webp". */
      src: string;
      type: "image" | "video";
      /** Images only; decorative media may omit it. */
      alt?: string;
    }
  | {
      /**
       * A live glimpse of real work: the named site rendered full-bleed by
       * the same scaled-iframe technique as the product embeds — pointer
       * inert, lazy, and skipped by the carousel if it fails to load, with
       * `fallbackSrc` painted beneath so the slide is never blank. Only use
       * a URL the embed probe stamped `embeddable: true` in products.ts.
       */
      type: "embed";
      url: string;
      /** Names the frame for assistive tech and the iframe title. */
      name: string;
      /** Art painted under (and instead of) the frame while it loads. */
      fallbackSrc: string;
    };

export const heroSlides: readonly HeroSlide[] = [
  /* Founder decision (2026-08-14): the original Elsheph site's hero — the
     mountain road down to the lake — as the ONE slide for now. More slides
     return when the founder uploads them (workflow at the top of this file).
     With a single slide the carousel timer never starts. */
  {
    src: "/hero.jpg",
    type: "image",
    alt: "A mountain road descending toward a blue lake",
  },
];

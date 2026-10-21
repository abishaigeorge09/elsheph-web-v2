/**
 * The home composition, in viewport pixels.
 *
 * The official staff (public/logos/elsheph-symbol-cropped.png, 271x402) is
 * the anchor. The terracotta line grows out of the staff's foot, sweeps
 * across the screen with the product plates riding it, and settles as a
 * thin rule beneath the site header. Two segments joined into one path so
 * the browser draws them as a single stroke.
 */
export type Geometry = {
  /** The whole stroke: sweep then bar. */
  d: string;
  /** The sweep alone: the segment the product plates ride. */
  sweep: string;
  /** The staff image box, in px. */
  staff: { left: number; top: number; width: number; height: number };
  /** Where the bar settles: the header's bottom edge. */
  navY: number;
  /** Where the headline block sits, in px. */
  copy: { left: number; top: number; width: number };
  narrow: boolean;
};

/* The cropped mark's aspect and where the staff's foot sits inside it,
   measured from the PNG's alpha (foot centre at x=128, y=352 of 271x402). */
export const STAFF_ASPECT = 271 / 402;
const FOOT_X = 128 / 271;
const FOOT_Y = 352 / 402;

const n = (v: number) => Math.round(v * 10) / 10;

export function buildGeometry(W: number, H: number): Geometry {
  const narrow = W < 760;
  /* Matches --header-height in globals.css (60px under 640px, else 72px). */
  const navY = W <= 640 ? 60 : 72;

  const height = narrow
    ? Math.max(150, Math.min(0.24 * H, 210))
    : Math.max(280, Math.min(0.46 * H, 440));
  const width = n(height * STAFF_ASPECT);

  const cx = narrow ? W - 16 - width / 2 : 0.47 * W;
  const top = narrow ? navY + 0.045 * H : navY + 0.07 * H;
  const left = n(cx - width / 2);

  const footX = n(left + width * FOOT_X);
  const footY = n(top + height * FOOT_Y);

  let sweep: string;
  let bar: string;

  if (narrow) {
    /* Down from the foot, a low curve across the lower third, and out the
       left edge; the stroke re-enters at the top as the bar. */
    const lowY = n(0.76 * H);
    const p1x = n(0.5 * W);
    sweep =
      `M${footX} ${footY} C${footX} ${n(footY + 0.18 * H)} ${n(footX - 0.05 * W)} ${lowY} ${p1x} ${lowY} ` +
      `C${n(0.24 * W)} ${lowY} ${n(0.07 * W)} ${n(0.72 * H)} -12 ${n(0.62 * H)}`;
    bar = `M-12 ${navY} L${W + 12} ${navY}`;
  } else {
    /* A dip below the foot, then the rise through the right half, arriving
       at the bar already running leftward. */
    const lowY = n(Math.min(0.8 * H, H - 120));
    const p1x = n(cx + 0.18 * W);
    const endX = n(0.86 * W);
    sweep =
      `M${footX} ${footY} C${footX} ${n(footY + 0.2 * H)} ${n(cx + 0.04 * W)} ${lowY} ${p1x} ${lowY} ` +
      `C${n(0.86 * W)} ${lowY} ${n(1.03 * W)} ${n(navY + 0.02 * H)} ${endX} ${navY}`;
    bar = `M${endX} ${navY} L-12 ${navY}`;
  }

  /* Both begin with M (they are measured on their own); joined with L so the
     whole thing stays one continuous stroke. */
  const d = `${sweep} L${bar.slice(1)}`;

  const copyLeft = narrow ? 24 : n(Math.max(56, 0.07 * W));
  const copy = narrow
    ? { left: copyLeft, top: n(top + 8), width: n(left - copyLeft - 14) }
    : {
        left: copyLeft,
        top: n(top + 0.06 * H),
        width: n(left - copyLeft - 36),
      };

  return { d, sweep, staff: { left, top: n(top), width, height: n(height) }, navY, copy, narrow };
}

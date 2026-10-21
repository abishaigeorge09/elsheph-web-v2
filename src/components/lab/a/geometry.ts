/**
 * The one line, in viewport pixels.
 *
 * Three segments joined into a single path so the browser draws them as one
 * stroke: the crook (traced from public/brand/seal.svg, drawn from the hook's
 * tip outward and down the staff), the sweep (foot of the staff across the
 * screen to the top-right corner), and the bar (the nav's underline, run
 * right to left until it leaves the viewport).
 */
export type Geometry = {
  /** The whole stroke. */
  d: string;
  /** The sweep alone: the segment the product plates ride. */
  sweep: string;
  /** Leaves from the seal, each as [x, y, scale, mirrored]. */
  leaves: [number, number, number, boolean][];
  navY: number;
  /** Where the headline block sits, in px. */
  copy: { left: number; top: number; width: number };
  narrow: boolean;
};

/* The seal's crook, reversed so the stroke starts at the hook's tip:
   M214 168 C206 196 165 190 168 158 C172 112 240 118 240 168 L240 352.
   Staff is x=240; the curl's leftmost point is x=165, its top ~y=114. */
const SEAL_STAFF_X = 240;
const SEAL_TOP_Y = 114;
const SEAL_CURL_W = 75;
const SEAL_STAFF_END = 352;

const n = (v: number) => Math.round(v * 10) / 10;

export function buildGeometry(W: number, H: number): Geometry {
  const narrow = W < 760;
  const navY = narrow ? 60 : 72;

  const curlW = narrow
    ? Math.min(0.3 * W, 120)
    : Math.max(96, Math.min(0.115 * W, 178, 0.19 * H));
  const s = curlW / SEAL_CURL_W;
  const sx = narrow ? W - 34 : 0.4 * W;
  const top = narrow ? 0.11 * H : 0.16 * H;

  const X = (x: number) => n(sx + (x - SEAL_STAFF_X) * s);
  const Y = (y: number) => n(top + (y - SEAL_TOP_Y) * s);

  const tipY = Y(168);
  const footY = Y(SEAL_STAFF_END);

  const crook =
    `M${X(214)} ${tipY} C${X(206)} ${Y(196)} ${X(165)} ${Y(190)} ${X(168)} ${Y(158)} ` +
    `C${X(172)} ${Y(112)} ${X(240)} ${Y(118)} ${X(240)} ${tipY} L${X(240)} ${footY}`;

  let sweep: string;
  let bar: string;

  if (narrow) {
    /* Down from the foot, a low curve across the bottom third, and out the
       left edge; the stroke re-enters at the top as the bar. */
    const p1x = n(0.5 * W);
    const p1y = n(footY + 0.17 * H);
    sweep =
      `M${sx} ${footY} C${sx} ${n(footY + 0.09 * H)} ${n(sx - 0.2 * W)} ${n(footY + 0.17 * H)} ${p1x} ${p1y} ` +
      `C${n(0.22 * W)} ${p1y} ${n(0.06 * W)} ${n(footY + 0.12 * H)} -12 ${n(footY + 0.02 * H)}`;
    bar = `M-12 ${navY} L${W + 12} ${navY}`;
  } else {
    /* A dip below the foot, then the rise through the right half, arriving
       at the bar already running leftward. */
    const p1x = n(sx + 0.24 * W);
    const p1y = n(footY + 0.02 * H);
    const endX = n(0.86 * W);
    sweep =
      `M${sx} ${footY} C${sx} ${n(footY + 0.1 * H)} ${n(sx + 0.12 * W)} ${n(footY + 0.14 * H)} ${p1x} ${p1y} ` +
      `C${n(0.84 * W)} ${n(footY - 0.12 * H)} ${n(1.02 * W)} ${navY} ${endX} ${navY}`;
    bar = `M${endX} ${navY} L-12 ${navY}`;
  }

  /* Sweep and bar begin with M (they are measured on their own); joined to
     the crook with L so the whole thing stays one continuous stroke. */
  const d = `${crook} L${sweep.slice(1)} L${bar.slice(1)}`;

  /* On narrow screens the staff hugs the right edge, so every leaf hangs on
     the left and stays small enough to clear the copy column. */
  const k = narrow ? s * 0.42 : s * 0.58;
  const leaves: Geometry["leaves"] = [
    [X(240), Y(318), k, false],
    [X(240), Y(268), k, !narrow],
    [X(240), Y(228), k, false],
  ];

  const copy = narrow
    ? { left: 24, top: n(tipY + 30), width: n(sx - 24 - 52) }
    : {
        left: n(Math.max(56, 0.07 * W)),
        top: n(tipY + 0.045 * H),
        width: n(sx - Math.max(56, 0.07 * W) - 28),
      };

  return { d, sweep, leaves, navY, copy, narrow };
}

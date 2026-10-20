import {
  DRAW_STAGGER_MS,
  type Stroke,
} from "@/components/lab/c/script";

/**
 * The Build beat: the product's screen, traced from its real screenshot,
 * drawn in hairlines. Each shape carries pathLength="1" so a single CSS dash
 * rule animates every kind of stroke; the stagger is an inline --d per shape
 * so the drawing runs top to bottom in reading order.
 */
export default function Wireframe({
  strokes,
  drawing,
  guides = false,
  title,
}: {
  strokes: readonly Stroke[];
  /** True while the Build beat runs; false renders the finished drawing. */
  drawing: boolean;
  /** Faint static guides (the Plan beat) instead of the drawn hairlines. */
  guides?: boolean;
  title: string;
}) {
  const n = Math.max(1, strokes.length - 1);
  return (
    <svg
      viewBox="0 0 1280 800"
      className={`absolute inset-0 h-full w-full ${
        guides ? "text-faint opacity-40" : "text-accent"
      } ${drawing ? "labc-draw" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={guides ? 1 : 1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-hidden={guides || undefined}
      aria-label={guides ? undefined : `Wireframe of the ${title} screen`}
      style={{ vectorEffect: "non-scaling-stroke" }}
    >
      {strokes.map((s, i) => {
        const style = {
          ["--d" as string]: `${Math.round((i / n) * DRAW_STAGGER_MS)}ms`,
          vectorEffect: "non-scaling-stroke" as const,
        };
        const common = { "data-stroke": "", pathLength: 1, style, key: i };
        switch (s.kind) {
          case "rect":
            return <rect {...common} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.r ?? 0} />;
          case "line":
            return <line {...common} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />;
          case "circle":
            return <circle {...common} cx={s.cx} cy={s.cy} r={s.r} />;
          case "poly":
            return <polygon {...common} points={s.points} />;
        }
      })}
    </svg>
  );
}

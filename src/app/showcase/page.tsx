import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Showcase | ${site.name}`,
  description:
    "Work from Elsheph's interns and designers. When a piece ships, it gets a page.",
};

/**
 * The Showcase page — the stone field with the ogee lattice at the loud
 * setting (0.4), painted in the terracotta display accent so it reads warm
 * on the light ground.
 *
 * There is no shipped showcase work yet, so the page holds its stance and
 * one honest awaiting well — centred at a capped measure, the composition
 * rule for standalone blocks. Zero fake entries.
 */
export default function ShowcasePage() {
  return (
    <div
      className="field-stone field-pattern min-h-dvh"
      style={
        {
          "--pattern-url": 'url("/patterns/pattern-ogee.svg")',
          "--pattern-opacity": 0.4,
          "--pattern-ink": "var(--color-brand)",
        } as CSSProperties
      }
    >
      <div className="relative">
        <div className="shell pt-[calc(var(--header-height)+64px)] pb-24">
          {/* No eyebrow — the serif headline stands alone. */}
          <h1 className="az-h1 text-ink">Showcase</h1>
          <p className="prose mt-6 max-w-[650px] text-[17px] text-ink-mid">
            Work from our interns and designers lands here. When a piece
            ships, it gets a page.
          </p>

          {/* SPEC(showcase-grid): when real work exists, the well below is
              replaced by a 3-col grid (1-col mobile, 16px gap) of square-
              cornered cards on the stone field, each carrying:
                - image: the piece itself, landscape crop, no decoration
                - title: serif, az-h4
                - maker: the real person's name, 15px ink-mid
                - term: when it was made (e.g. "Summer 2026"), 13px muted
              Cards link to the piece's own page. Nothing renders before at
              least one piece is real and its maker has agreed to be named. */}
          <div className="awaiting mx-auto mt-14 max-w-[650px] text-center">
            <div>
              <p className="awaiting-note">Nothing to show yet.</p>
              <p className="mt-3 text-sm text-muted-foreground">
                The first shipped piece takes this space. Nothing gets staged
                to fill it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

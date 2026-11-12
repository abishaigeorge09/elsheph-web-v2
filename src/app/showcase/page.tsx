import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { recognition, recognitionPage } from "@/content/recognition";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Recognition | ${site.name}`,
  description:
    "Recognition, registrations and programmes on record for Elsheph Systems, each with its evidence.",
};

/**
 * Recognition and programmes: the stone field with the ogee lattice, then a
 * ruled list. Every entry names the document or page that proves it.
 */
export default function RecognitionPage() {
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
          <h1 className="az-h1 text-ink">{recognitionPage.h1}</h1>
          <p className="prose mt-6 max-w-[650px] text-[17px] text-ink-mid">
            {recognitionPage.intro}
          </p>

          <ul className="mt-14 max-w-[820px]">
            {recognition.map((item, index) => (
              <li
                key={item.title}
                className={index > 0 ? "border-t border-border" : ""}
              >
                <div className="py-8">
                  <p className="text-[13px] text-muted-foreground">
                    {item.when}
                  </p>
                  <h2 className="az-h4 mt-2 text-ink">{item.title}</h2>
                  <p className="mt-3 max-w-[62ch] text-[16px] text-ink-mid">
                    {item.body}
                  </p>
                  <p className="mt-3 text-[13px] text-muted-foreground">
                    Evidence:{" "}
                    {item.evidence.url ? (
                      <a
                        href={item.evidence.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-ink underline decoration-border-strong underline-offset-4 hover:text-accent"
                      >
                        {item.evidence.label}
                        <ArrowUpRight className="size-3" aria-hidden />
                      </a>
                    ) : (
                      item.evidence.label
                    )}
                  </p>
                  {item.more?.map((link) => (
                    <p key={link.url} className="mt-1 text-[13px] text-muted-foreground">
                      Also:{" "}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-ink underline decoration-border-strong underline-offset-4 hover:text-accent"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3" aria-hidden />
                      </a>
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-[650px] text-sm text-muted-foreground">
            {recognitionPage.note}
          </p>
        </div>
      </div>
    </div>
  );
}

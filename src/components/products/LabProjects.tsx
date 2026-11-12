"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { labCopy, labProjects, type LabProject } from "@/content/lab";

/**
 * The lab grid. Each card carries a padlock. Locked means not public yet; open
 * means there is a page to visit. When the grid scrolls into view the locked
 * padlocks click shut one after another, and a locked one lifts a little on
 * hover or focus. Reduced-motion visitors get the static state.
 */

function Padlock({ open, delay }: { open: boolean; delay: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="lab-lock shrink-0"
      data-open={open ? "true" : "false"}
      style={{ ["--lock-delay" as string]: `${delay}ms` }}
    >
      <g className="lab-shackle">
        <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
      </g>
      <rect x="5" y="11" width="14" height="9.5" rx="2" />
      <path d="M12 14.8v2.4" />
    </svg>
  );
}

function Card({ project, index }: { project: LabProject; index: number }) {
  const open = Boolean(project.url);
  const inner = (
    <div className="lab-card group flex h-full flex-col rounded-[2px] border border-border bg-raised p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[15px] font-semibold text-ink">{project.name}</p>
        <span className={open ? "text-accent" : "text-ink-mid"}>
          <Padlock open={open} delay={(index % 6) * 90} />
        </span>
      </div>
      <p className="mt-2 flex-1 text-sm text-ink-mid">{project.oneLiner}</p>
      <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
        <span className="text-muted-foreground">
          {open ? "Public" : "In the lab"}
        </span>
        {project.note ? (
          <span className="text-muted-foreground">· {project.note}</span>
        ) : null}
        {open ? (
          <span className="ml-auto inline-flex items-center gap-1 text-ink-mid transition-colors group-hover:text-accent">
            Visit
            <ArrowUpRight className="size-3" aria-hidden />
          </span>
        ) : null}
      </div>
    </div>
  );
  return project.url ? (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
      aria-label={`${project.name}, opens in a new tab`}
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function LabProjects() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="shell py-16 md:py-24">
      <h2 className="az-h3 text-ink">{labCopy.heading}</h2>
      <p className="mt-4 max-w-2xl text-[16px] text-ink-mid">{labCopy.intro}</p>
      <div
        ref={ref}
        data-in={inView ? "true" : "false"}
        className="lab-grid mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {labProjects.map((project, index) => (
          <Card key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

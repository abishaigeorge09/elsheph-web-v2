"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import {
  advisors,
  teamMembers,
  teamPage,
  type Advisor,
  type TeamMember,
} from "@/content/team";

/**
 * The Team page: the espresso field with the crook pattern at the whisper
 * setting (0.05), per the audited spec.
 *
 * Everything rendered here comes from the team ledger, which holds real
 * people only. Team members get a square portrait card; advisors get a
 * text-only card, because no advisor photos exist and a silhouette would
 * read as a placeholder.
 *
 * Card anatomy (from the audit): exact 1:1 portrait, name line, role line
 * (small, quieter). The one interaction: hover flips the name line to the
 * field's accent. Nothing else moves.
 */

function MemberCard({ member }: { member: TeamMember }) {
  if (!member.photo) {
    return (
      <div className="group border-t border-border pt-4">
        <p className="font-display text-[19px] leading-snug text-ink transition-colors duration-150 group-hover:text-accent">
          {member.name}
        </p>
        <p className="mt-1.5 text-xs text-ink-mid">{member.role}</p>
      </div>
    );
  }
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      <p className="mt-3 text-[15px] font-medium text-ink transition-colors duration-150 group-hover:text-accent">
        {member.name}
      </p>
      <p className="mt-0.5 text-xs text-ink-mid">{member.role}</p>
    </div>
  );
}

function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <div className="group border-t border-border pt-4">
      <p className="font-display text-[19px] leading-snug text-ink transition-colors duration-150 group-hover:text-accent">
        {advisor.name}
      </p>
      <p className="mt-1.5 text-xs text-ink-mid">{advisor.title}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {advisor.organisation}
      </p>
    </div>
  );
}

export default function TeamView() {
  return (
    <div
      className="field-espresso field-pattern min-h-dvh"
      style={
        {
          "--pattern-url": 'url("/patterns/pattern-crook.svg")',
          "--pattern-opacity": 0.05,
        } as CSSProperties
      }
    >
      <div className="relative">
        <div className="shell pt-[calc(var(--header-height)+64px)] pb-24">
          {/* No eyebrow: the serif headline stands alone. */}
          <h1 className="az-h1 text-ink">{teamPage.h1}</h1>
          <p className="prose mt-6 max-w-[980px] text-ink-mid">
            {teamPage.intro}
          </p>

          <section className="mt-14 border-t border-border pt-10">
            <h2 className="az-h3 text-ink">Leadership</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {teamMembers.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="az-h3 text-ink">{teamPage.advisorsHeading}</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {advisors.map((advisor) => (
                <AdvisorCard key={advisor.name} advisor={advisor} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

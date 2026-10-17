"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  teamMembers,
  teamPage,
  teamSections,
  teamSlots,
  type TeamMember,
  type TeamSection,
  type TeamSlot,
} from "@/content/team";

/**
 * The Team page — the espresso field with the crook pattern at the whisper
 * setting (0.05), per the audited spec.
 *
 * Everything rendered here comes from the team ledger. The ledger currently
 * holds role SLOTS only — zero invented names — so every card shows the
 * shared duotone placeholder portrait, the shared slot line where a name
 * will go, and the role. The real-person path is built and dormant: when the
 * founder adds a `TeamMember` to the ledger, that person renders FIRST in
 * their section with a real name and photo, and the slot whose role they
 * fill drops out.
 *
 * One filter only — Role, the single real facet the ledger holds. A second
 * facet would be a control over data that does not exist.
 *
 * Card anatomy (from the audit): exact 1:1 portrait, name line, role line
 * (small, quieter), all centered. The one interaction: hover flips the name
 * line to the field's accent. Nothing else moves.
 */

/** A card is either a real person or a waiting slot. */
type Card =
  | { kind: "member"; member: TeamMember }
  | { kind: "slot"; slot: TeamSlot };

function cardRole(card: Card): string {
  return card.kind === "member" ? card.member.role : card.slot.role;
}

function TeamCard({ card }: { card: Card }) {
  const isMember = card.kind === "member";
  return (
    <div className="group text-center">
      {/* EXACT 1:1 portrait. Real people bring a photo cropped square; every
          waiting slot shares the one placeholder file so the grid reads calm. */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={isMember ? card.member.photo : "/team/placeholder.svg"}
          alt={isMember ? card.member.name : ""}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Name line. A slot has no name — it shows the ledger's slot line as
          a stance, set in the serif italic so it cannot be mistaken for a
          person. Hover flips this line to the accent; nothing else moves. */}
      {isMember ? (
        <p className="mt-3 text-[15px] font-medium text-ink transition-colors duration-150 group-hover:text-accent">
          {card.member.name}
        </p>
      ) : (
        <p className="mt-3 font-display text-[15px] italic text-ink transition-colors duration-150 group-hover:text-accent">
          {card.slot.slotLabel}
        </p>
      )}

      {/* Role line: small, quieter. */}
      <p className="mt-0.5 text-xs text-ink-mid">{cardRole(card)}</p>
    </div>
  );
}

/** The a16z underline-select, as on the products page. */
function UnderlineSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <label className="flex w-full items-baseline gap-3 text-xs text-muted-foreground sm:w-auto">
      <span className="font-medium tracking-[0.14em] uppercase">{label}</span>
      <span className="relative flex-1 sm:flex-none">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border-0 border-b border-border-strong bg-transparent py-1.5 pr-7 pl-0 text-sm text-ink outline-none focus-visible:border-accent sm:w-auto"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-1 size-3.5 -translate-y-1/2 text-muted-foreground"
        />
      </span>
    </label>
  );
}

/** Members first, then the slots whose role no member already fills. */
function sectionCards(section: TeamSection): Card[] {
  const members = teamMembers.filter((m) => m.section === section);
  const filledRoles = new Set(members.map((m) => m.role));
  const slots = teamSlots.filter(
    (s) => s.section === section && !filledRoles.has(s.role),
  );
  return [
    ...members.map((member): Card => ({ kind: "member", member })),
    ...slots.map((slot): Card => ({ kind: "slot", slot })),
  ];
}

export default function TeamView() {
  const [role, setRole] = useState("all");

  const sections = useMemo(
    () =>
      teamSections
        .map((section) => ({
          section,
          cards: sectionCards(section).filter(
            (card) => role === "all" || cardRole(card) === role,
          ),
        }))
        .filter(({ cards }) => cards.length > 0),
    [role],
  );

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
          {/* No eyebrow — the serif headline stands alone. */}
          <h1 className="az-h1 text-ink">{teamPage.h1}</h1>
          <p className="prose mt-6 max-w-[980px] text-ink-mid">
            {teamPage.intro}
          </p>

          {/* The one real facet. Full-width on 390px. */}
          <div className="mt-10 flex border-t border-b border-border py-4">
            <div className="flex w-full sm:w-auto">
              <UnderlineSelect
                label={teamPage.filterLabel}
                value={role}
                onChange={setRole}
                options={[
                  { value: "all", label: "All" },
                  ...teamPage.roles.map((r) => ({ value: r, label: r })),
                ]}
              />
            </div>
          </div>

          {sections.map(({ section, cards }) => (
            <section key={section} className="mt-14">
              <h2 className="az-h3 text-ink">{section}</h2>
              {/* 5-up at desktop (~253px cards on the 1328px shell), 2-up at
                  390px; 24px / 16px gaps. */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
                {cards.map((card) => (
                  <TeamCard
                    key={
                      card.kind === "member"
                        ? `member-${card.member.name}`
                        : `slot-${card.slot.role}`
                    }
                    card={card}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

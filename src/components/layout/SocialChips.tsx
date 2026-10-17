import { socials } from "@/content/site";

/**
 * Circular social chips, the a16z footer convention: each glyph sits in a
 * ~34px round chip on a quiet fill, brightening on hover. Reads semantic
 * tokens so the same component holds on cream, espresso, and oxblood fields.
 *
 * Glyphs are drawn inline (the installed lucide build has no brand marks) —
 * the same outline-stroke drawings the drawer uses.
 */
function glyph(label: string) {
  if (label === "LinkedIn") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-4"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 10.5V17" />
        <path d="M8 7.2v.1" />
        <path d="M12 17v-4a2.4 2.4 0 0 1 4.8 0v4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-4"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.1" />
    </svg>
  );
}

export default function SocialChips() {
  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          title={social.label}
          className="flex size-[34px] items-center justify-center rounded-full border border-border bg-raised-2 text-ink-mid transition-colors hover:bg-ink hover:text-page"
        >
          {glyph(social.label)}
        </a>
      ))}
    </div>
  );
}

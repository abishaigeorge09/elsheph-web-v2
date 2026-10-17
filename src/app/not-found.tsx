import Link from "next/link";

/**
 * The 404, on-voice. Header and footer render normally around it (layout.tsx
 * wraps every route; this is not the homepage, so ConditionalFooter shows the
 * full footer). The viewport-height centring accounts for the fixed bar.
 */
export default function NotFound() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-page px-6 pt-[var(--header-height)] text-center">
      <h1 className="az-h1 text-ink">This page shipped nowhere.</h1>
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-mid">
        The address is wrong, or the page is gone. Everything that exists is
        one level up.
      </p>
      <Link
        href="/"
        className="link-underline mt-10 text-[15px] text-accent transition-colors hover:text-accent-hover"
      >
        ← Back to the start
      </Link>
    </section>
  );
}

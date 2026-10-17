import Reveal from "@/components/sections/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import { emails, socials } from "@/content/site";

/**
 * The contact band, on the light system.
 *
 * The form itself is NOT built here — forms and their API routes (and the
 * RLS fix that must land with them) belong to a later phase. The right-hand
 * column holds the mount point for it, and until that phase lands the section
 * still works: the two real Elsheph addresses are live mailto links set large
 * in Fraunces, so nothing on the page is a dead end.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border bg-page py-16 md:py-24"
    >
      <div className="shell">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="az-h2 mt-5 max-w-[16ch] text-ink">
                Tell us what you want{" "}
                <em className="font-display text-brand italic">built</em>
              </h2>

              <p className="mt-6 max-w-md text-[17px] text-ink-mid">
                Send a note about the product, the team you need, or the
                training you are planning. We reply from the address you write
                to.
              </p>

              <div className="mt-10 flex flex-col gap-4">
                <a
                  href={`mailto:${emails.sales}`}
                  className="link-underline w-fit font-display text-2xl text-ink transition-colors hover:text-accent sm:text-3xl"
                >
                  {emails.sales}
                </a>
                <a
                  href={`mailto:${emails.contact}`}
                  className="link-underline w-fit font-display text-2xl text-ink transition-colors hover:text-accent sm:text-3xl"
                >
                  {emails.contact}
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 border-t border-border pt-6">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold tracking-[0.16em] text-ink-mid uppercase transition-colors hover:text-accent"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.08}>
              {/* The real form — validates and writes only through
                  /api/contact (security phase). */}
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

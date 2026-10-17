"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/sections/Reveal";
import {
  universityEmail,
  universityFormRoles,
  universityPage,
} from "@/content/university";

/**
 * The partnership inquiry form, restyled to the token system: a white raised
 * card with a hairline border and the products page's underline inputs.
 *
 * SECURITY PHASE: the browser no longer talks to Supabase. Submission goes
 * to `/api/university`, which validates with the shared zod schema and is
 * the only write path to `university_contacts`. Two traps ride along:
 * a visually-hidden honeypot field (`company`) and a mount timestamp
 * (`startedAt`) the server checks against a minimum plausible fill time.
 */
const inputClass =
  "w-full border-0 border-b border-border-strong bg-transparent py-2 pl-0 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus-visible:border-accent disabled:opacity-50";

const labelClass =
  "block text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase";

export default function UniversityForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    role: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  /* Honeypot value + mount timestamp for the server's traps. */
  const [company, setCompany] = useState("");
  const startedAt = useRef(Date.now());

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);
    setIsSuccess(false);
    try {
      const res = await fetch("/api/university", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          company,
          startedAt: startedAt.current,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setIsSuccess(true);
      setFormData({ name: "", email: "", university: "", role: "", message: "" });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="form" className="bg-page py-16 md:py-24">
      <div className="shell">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="az-h2 mt-5 max-w-[16ch] text-ink">
                Tell us about your students
              </h2>
              <p className="mt-6 max-w-md text-[17px] text-ink-mid">
                Department heads, placement officers, faculty and students all
                write to the same place. We reply from a person, not a queue.
              </p>
              <a
                href={`mailto:${universityEmail}`}
                className="link-underline mt-8 inline-block w-fit font-display text-2xl text-ink transition-colors hover:text-accent"
              >
                {universityEmail}
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <div className="border border-border bg-raised p-8 sm:p-10">
                {isSuccess && (
                  <p
                    role="status"
                    className="mb-8 border border-border-strong p-4 text-sm text-ink"
                  >
                    Thank you. We will be in touch shortly.
                  </p>
                )}
                {formError && (
                  <p
                    role="alert"
                    className="mb-8 border border-destructive p-4 text-sm text-destructive"
                  >
                    {formError}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-9">
                  {/* Honeypot — visually hidden, out of the tab order.
                      Humans never fill it; the server refuses quietly when
                      a bot does. */}
                  <div aria-hidden className="sr-only">
                    <label htmlFor="uni-company">Company</label>
                    <input
                      type="text"
                      id="uni-company"
                      name="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
                    <div>
                      <label htmlFor="uni-name" className={labelClass}>
                        Your name
                      </label>
                      <input
                        type="text"
                        id="uni-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="uni-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        type="email"
                        id="uni-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="uni-university" className={labelClass}>
                        University / institution
                      </label>
                      <input
                        type="text"
                        id="uni-university"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="uni-role" className={labelClass}>
                        Your role
                      </label>
                      <select
                        id="uni-role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className={`${inputClass} cursor-pointer appearance-none`}
                      >
                        <option value="">Select your role</option>
                        {universityFormRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="uni-message" className={labelClass}>
                      What are you planning?
                    </label>
                    <textarea
                      id="uni-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      disabled={isLoading}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-deep px-8 py-4 text-xs font-bold tracking-[0.14em] text-on-accent uppercase transition-colors duration-200 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {isLoading ? "Sending…" : universityPage.formButton}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

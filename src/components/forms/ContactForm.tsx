"use client";

import { useRef, useState } from "react";

/**
 * The contact form, filling the mount point Contact.tsx reserved for it.
 * Posts to `/api/contact` — the only write path to the `contacts` table.
 * Same trap pair as the university form: hidden honeypot + mount timestamp.
 */
const inputClass =
  "w-full border-0 border-b border-border-strong bg-transparent py-2 pl-0 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus-visible:border-accent disabled:opacity-50";

const labelClass =
  "block text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [company, setCompany] = useState("");
  const startedAt = useRef(Date.now());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);
    setIsSuccess(false);
    try {
      const res = await fetch("/api/contact", {
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
      setFormData({ name: "", email: "", message: "" });
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
    <div className="border border-border bg-raised p-8 sm:p-10">
      {isSuccess && (
        <p
          role="status"
          className="mb-8 border border-border-strong p-4 text-sm text-ink"
        >
          Thank you. We reply from a person, not a queue.
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
        {/* Honeypot — visually hidden, out of the tab order. */}
        <div aria-hidden className="sr-only">
          <label htmlFor="contact-company">Company</label>
          <input
            type="text"
            id="contact-company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Your name
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            What do you want built?
          </label>
          <textarea
            id="contact-message"
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
          {isLoading ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}

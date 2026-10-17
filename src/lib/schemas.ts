import { z } from "zod";

/**
 * Form schemas, shared verbatim between the client components and the API
 * routes — the server re-validates everything, so a request that skips the
 * UI entirely still faces the same rules.
 *
 * The two extra fields on every submission are the spam traps:
 * - `company`: a visually-hidden honeypot input. Humans never see it; bots
 *   that autofill every field do. Must be empty.
 * - `startedAt`: epoch ms stamped when the form mounted. A submission that
 *   arrives quicker than a human could plausibly type is refused
 *   server-side.
 */

const trapFields = {
  company: z.string().max(0, "rejected"),
  startedAt: z.number().int().positive(),
};

export const universityInquirySchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  university: z.string().trim().min(2, "Institution is too short").max(200),
  role: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10, "Tell us a little more").max(4000),
  ...trapFields,
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  message: z.string().trim().min(10, "Tell us a little more").max(4000),
  ...trapFields,
});

export type UniversityInquiry = z.infer<typeof universityInquirySchema>;
export type ContactMessage = z.infer<typeof contactSchema>;

/** Minimum plausible human fill time, in ms, enforced server-side. */
export const MIN_FILL_MS = 3000;

import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  subject: z.string().trim().min(3, "Please add a subject").max(150, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactValues = z.infer<typeof contactSchema>;

export type ContactDelivery = "endpoint" | "mailto" | "none";

/** How the form can actually deliver a message with the current configuration. */
export function getContactDelivery(endpoint: string, email: string): ContactDelivery {
  if (endpoint) return "endpoint";
  if (email) return "mailto";
  return "none";
}

/** Builds a mailto: link with the message pre-filled (used when no form endpoint is configured). */
export function buildMailto(to: string, v: ContactValues) {
  const body = `${v.message}\n\n— ${v.name} (${v.email})`;
  return `mailto:${to}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
}

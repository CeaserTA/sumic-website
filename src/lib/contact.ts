/**
 * Contact form submission. The form calls only `submitContactForm()`, so connecting a backend
 * means replacing this function's body (see docs/redesign-plan.md, section 5, for the options).
 */

export const contactSubjects = ['General', 'Services', 'Partnerships', 'Careers'] as const
export type ContactSubject = (typeof contactSubjects)[number]

export interface ContactFormData {
  name: string
  email: string
  /** Optional; empty string when not given. */
  phone: string
  subject: ContactSubject
  message: string
}

export type ContactFormResult = { ok: true } | { ok: false; error: 'network' | 'server' }

/**
 * TODO(backend): send `data` to the chosen endpoint (form service or serverless function, with
 * Turnstile) and map its response to ContactFormResult. Until then this stub only waits briefly
 * and reports success; nothing is sent anywhere.
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactFormResult> {
  void data
  await new Promise((resolve) => setTimeout(resolve, 900))
  return { ok: true }
}

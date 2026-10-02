/**
 * Client testimonials. The live site has none, so this is intentionally empty and the
 * testimonials block stays hidden until real, attributable quotes are added.
 * Never invent testimonials (see AGENTS.md).
 */

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

// TODO: add real client testimonials (quote, name, role, company) with the client's consent.
export const testimonials: readonly Testimonial[] = []

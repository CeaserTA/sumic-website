// SAMPLE DATA – replace with real, consented testimonials before launch.
//
// Entries with `isSample: true` are fictional placeholders for layout work only. They render
// in development (with a "Sample content" badge) and are always excluded from production builds
// via `visibleTestimonials`, so the section stays hidden until real testimonials are added.
// Never invent testimonials for production (see AGENTS.md).

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  /** Fictional placeholder; never shipped to production. */
  isSample?: boolean
}

// TODO: add real client testimonials here (quote, name, role, company), with consent.
const realTestimonials: readonly Testimonial[] = []

// Defined behind import.meta.env.DEV so production builds drop the sample strings entirely.
const sampleTestimonials: readonly Testimonial[] = import.meta.env.DEV
  ? [
      {
        quote:
          'Sample quote: placeholder text showing how a short client testimonial about a website project will look.',
        name: 'Sample Client One',
        role: 'Sample role',
        company: 'Sample Company Ltd',
        isSample: true,
      },
      {
        quote:
          'Sample quote: placeholder text showing how a testimonial about a mobile app will wrap across two or three lines.',
        name: 'Sample Client Two',
        role: 'Sample role',
        company: 'Sample Company Ltd',
        isSample: true,
      },
      {
        quote: 'Sample quote: placeholder text for a third testimonial card.',
        name: 'Sample Client Three',
        role: 'Sample role',
        company: 'Sample Company Ltd',
        isSample: true,
      },
    ]
  : []

export const testimonials: readonly Testimonial[] = [...realTestimonials, ...sampleTestimonials]

/** What the page may render: everything in development, real testimonials only in production. */
export const visibleTestimonials: readonly Testimonial[] = import.meta.env.DEV
  ? testimonials
  : testimonials.filter((testimonial) => !testimonial.isSample)

import { useId } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Testimonial } from '@/content/testimonials'
import { ui } from '@/content/ui'

interface TestimonialsProps {
  title: string
  testimonials: readonly Testimonial[]
}

/**
 * Client quotes. Renders nothing when the list is empty: in production, sample entries are
 * filtered out upstream (visibleTestimonials), so the block stays hidden until real ones exist.
 * In development, sample entries show with a "Sample content" badge.
 */
export function Testimonials({ title, testimonials }: TestimonialsProps) {
  const titleId = useId()
  if (testimonials.length === 0) return null
  const hasSamples = testimonials.some((testimonial) => testimonial.isSample)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <h3 id={titleId} className="text-2xl sm:text-3xl">
          {title}
        </h3>
        {hasSamples && <Badge variant="destructive">{ui.testimonials.sampleBadge}</Badge>}
      </div>
      <ul aria-labelledby={titleId} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} as="li" index={index}>
            <Card className="h-full">
              <CardContent>
                <figure className="flex flex-col gap-4">
                  <blockquote className="text-lg text-pretty text-brand-heading">
                    <p>“{testimonial.quote}”</p>
                  </blockquote>
                  <figcaption className="text-sm">
                    <span className="font-medium text-brand-heading">{testimonial.name}</span>
                    <span className="block">
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}

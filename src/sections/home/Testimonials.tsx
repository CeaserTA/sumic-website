import { useId } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Card, CardContent } from '@/components/ui/card'
import type { Testimonial } from '@/content/testimonials'

interface TestimonialsProps {
  title: string
  testimonials: readonly Testimonial[]
}

/** Client quotes. Renders nothing until real testimonials exist in src/content/testimonials.ts. */
export function Testimonials({ title, testimonials }: TestimonialsProps) {
  const titleId = useId()
  if (testimonials.length === 0) return null

  return (
    <div className="flex flex-col gap-8">
      <h3 id={titleId} className="text-2xl font-bold sm:text-3xl">
        {title}
      </h3>
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
                    <span className="font-semibold text-brand-heading">{testimonial.name}</span>
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

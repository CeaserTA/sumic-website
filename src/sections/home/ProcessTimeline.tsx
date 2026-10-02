import { useId } from 'react'
import { m } from 'motion/react'

import { Reveal } from '@/components/motion/Reveal'
import type { ProcessStep } from '@/content/home'

interface ProcessTimelineProps {
  title: string
  intro: string
  steps: readonly ProcessStep[]
}

const lineTransition = { duration: 1.4, ease: [0.22, 1, 0.36, 1] } as const

/**
 * The live site's development lifecycle. Horizontal on desktop, vertical below lg.
 * The connector draws itself once in view (a transform, so reduced motion shows it static).
 */
export function ProcessTimeline({ title, intro, steps }: ProcessTimelineProps) {
  const titleId = useId()

  return (
    <div className="flex flex-col gap-10">
      <div className="flex max-w-2xl flex-col gap-3">
        <h3 id={titleId} className="text-2xl font-bold sm:text-3xl">
          {title}
        </h3>
        <p className="text-lg text-pretty">{intro}</p>
      </div>

      <div className="relative">
        {/* Connector: vertical track below lg, horizontal from lg. */}
        <div
          aria-hidden="true"
          className="absolute top-5 bottom-5 left-5 w-0.5 bg-brand-line lg:hidden"
        >
          <m.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={lineTransition}
            className="h-full w-full origin-top bg-brand-accent-ink"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute top-5 right-[8%] left-[8%] hidden h-0.5 bg-brand-line lg:block"
        >
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={lineTransition}
            className="h-full w-full origin-left bg-brand-accent-ink"
          />
        </div>

        <ol
          aria-labelledby={titleId}
          className="relative flex flex-col gap-8 lg:grid lg:grid-cols-6 lg:gap-6"
        >
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              index={index}
              className="flex gap-5 lg:flex-col lg:items-center lg:text-center"
            >
              {/* A real sequence, so numbered markers carry meaning here. */}
              <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-background font-heading font-bold text-brand-accent-ink ring-2 ring-brand-accent-ink">
                {index + 1}
              </span>
              <div className="flex flex-col gap-1.5 pt-1.5 lg:pt-0">
                <h4 className="text-lg font-semibold">{step.title}</h4>
                <p className="text-pretty">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  )
}

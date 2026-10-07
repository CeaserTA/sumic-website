import { useId } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import type { ProcessStep } from '@/content/home'

interface ProcessTimelineProps {
  title: string
  intro: string
  steps: readonly ProcessStep[]
  headingLevel?: 2 | 3
}

const headings = {
  2: { Title: 'h2', Step: 'h3', titleClass: 'text-3xl sm:text-4xl lg:text-5xl' },
  3: { Title: 'h3', Step: 'h4', titleClass: 'text-2xl font-bold sm:text-3xl' },
} as const

/**
 * "How we work" — two-column layout:
 *   LEFT  — photo, no border/card, bottom gradient blends into section bg,
 *            height matches the right column exactly via CSS grid stretch.
 *   RIGHT — 3×2 grid of step cards: dark navy background, step number
 *            as a large faded watermark, title and text in white.
 *            Completely different design from any other card on the page.
 */
export function ProcessTimeline({ title, intro, steps, headingLevel = 3 }: ProcessTimelineProps) {
  const titleId = useId()
  const { Title, Step, titleClass } = headings[headingLevel]

  return (
    /* items-stretch so both columns are the same height */
    <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">

      {/* ── LEFT: photo — height driven by the right column ── */}
      <Reveal index={0} className="relative hidden overflow-hidden rounded-3xl lg:block">
        {/*
          h-full fills the grid row height (= height of the right column).
          object-cover + object-center keeps the subject in frame at any ratio.
        */}
        <img
          src="/images/services/how_wework1.jpg"
          alt="Sumic IT Solutions team at work"
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        {/* Bottom-edge gradient fades into the section background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-brand-surface-muted to-transparent"
        />
      </Reveal>

      {/* ── RIGHT: header + step cards ── */}
      <div className="flex flex-col gap-7">

        <div className="flex flex-col gap-2">
          <p className="font-medium text-brand-accent-ink">Our process</p>
          <Title id={titleId} className={titleClass}>{title}</Title>
          <p className="mt-1 text-base text-pretty text-brand-text">{intro}</p>
        </div>

        <ol
          aria-labelledby={titleId}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {steps.map((step, index) => (
            <Reveal key={step.title} as="li" index={index}>
              {/*
                Navy card with a large faded ordinal watermark.
                Hover: slight lift + green top border appears.
                Completely distinct from the white service cards and
                the muted-bg stat rings elsewhere on the page.
              */}
              <div className="group relative h-full overflow-hidden rounded-2xl bg-brand-primary p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/20 hover:ring-1 hover:ring-brand-accent/40 [--ring:var(--brand-accent)]">

                {/* Large faded step number watermark — bottom-right */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -bottom-3 select-none font-heading text-8xl font-bold leading-none text-brand-primary-foreground/8"
                >
                  {index + 1}
                </span>

                {/* Small numbered badge */}
                <span className="mb-3 flex size-6 items-center justify-center rounded-full bg-brand-accent font-heading text-[11px] font-bold text-brand-accent-foreground">
                  {index + 1}
                </span>

                <Step className="mb-1.5 text-sm font-semibold text-brand-primary-foreground transition-colors group-hover:text-brand-accent">
                  {step.title}
                </Step>

                <p className="text-xs leading-relaxed text-brand-primary-foreground/65">
                  {step.text}
                </p>

              </div>
            </Reveal>
          ))}
        </ol>

      </div>
    </div>
  )
}

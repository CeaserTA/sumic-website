import type { LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

export interface Feature {
  title: string
  text: string
  icon?: LucideIcon
}

interface FeatureListProps {
  items: readonly Feature[]
  /** Columns from desktop up (always 1 on phones, 2 on tablets). */
  columns?: 2 | 3 | 4
  /** Surface the list sits on; sets text and icon colours for contrast. */
  tone?: 'light' | 'dark'
  /** Item titles are h3 under a section h2; use 4 when the list sits under an h3. */
  headingLevel?: 3 | 4
  className?: string
}

const columnClasses = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' } as const

/**
 * Icon + title + text items in a responsive grid (e.g. "Why choose us", core values,
 * internship benefits). Titles are h3 (or h4 with headingLevel={4}).
 */
export function FeatureList({
  items,
  columns = 3,
  tone = 'light',
  headingLevel = 3,
  className,
}: FeatureListProps) {
  const dark = tone === 'dark'
  const Title = headingLevel === 4 ? 'h4' : 'h3'

  return (
    <ul className={cn('grid gap-x-8 gap-y-10 sm:grid-cols-2', columnClasses[columns], className)}>
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Reveal key={item.title} as="li" index={index} className="flex flex-col gap-3">
            {Icon && (
              <span
                className={cn(
                  'flex size-11 items-center justify-center rounded-xl',
                  dark
                    ? 'bg-brand-accent text-brand-accent-foreground'
                    : 'bg-brand-accent-ink/10 text-brand-accent-ink',
                )}
              >
                <Icon aria-hidden="true" className="size-5" />
              </span>
            )}
            <Title className={cn('text-xl', dark && 'text-brand-primary-foreground')}>
              {item.title}
            </Title>
            <p className={cn('text-pretty', dark && 'text-brand-primary-foreground/80')}>
              {item.text}
            </p>
          </Reveal>
        )
      })}
    </ul>
  )
}

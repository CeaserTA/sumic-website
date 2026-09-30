import { useId, type ReactNode } from 'react'

import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

type SectionTone = 'default' | 'muted' | 'primary'

interface SectionProps {
  /** Anchor target for nav links; also used for active-link tracking. */
  id: string
  eyebrow?: string
  title?: string
  subtitle?: string
  /** Only the hero should use h1. */
  titleAs?: 'h1' | 'h2'
  tone?: SectionTone
  className?: string
  containerClassName?: string
  children?: ReactNode
}

const toneClasses: Record<SectionTone, string> = {
  default: 'bg-background',
  muted: 'bg-brand-surface-muted',
  // Dark surface: switch the focus ring to green so it stays visible.
  primary: 'bg-brand-primary text-brand-primary-foreground [--ring:var(--brand-accent)]',
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  titleAs: Title = 'h2',
  tone = 'default',
  className,
  containerClassName,
  children,
}: SectionProps) {
  const titleId = useId()
  const dark = tone === 'primary'

  return (
    <section
      id={id}
      // Focusable so in-page navigation can move focus here.
      tabIndex={-1}
      aria-labelledby={title ? titleId : undefined}
      className={cn('py-16 outline-none sm:py-20 lg:py-28', toneClasses[tone], className)}
    >
      <Container className={containerClassName}>
        {(eyebrow ?? title ?? subtitle) && (
          <header className="flex max-w-3xl flex-col gap-3">
            {eyebrow && (
              <p
                className={cn('font-medium', dark ? 'text-brand-accent' : 'text-brand-accent-ink')}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <Title
                id={titleId}
                className={cn(
                  'text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl',
                  dark && 'text-brand-primary-foreground',
                )}
              >
                {title}
              </Title>
            )}
            {subtitle && (
              <p className={cn('text-lg', dark && 'text-brand-primary-foreground/80')}>
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  )
}

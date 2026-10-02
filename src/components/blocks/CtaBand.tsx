import { useId, type ReactNode } from 'react'
import { ArrowRightIcon, MailIcon, PhoneIcon } from 'lucide-react'

import { AppLink } from '@/components/layout/AppLink'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import type { NavLink } from '@/content/site'
import { externalProps, navHref } from '@/lib/nav'
import { cn } from '@/lib/utils'

interface CtaBandProps {
  /** Anchor id (the home page uses "cta"). */
  id?: string
  title: string
  text: string
  primary: NavLink
  secondary?: NavLink
  /** Optional content beside the call to action, e.g. a FAQ card. */
  aside?: ReactNode
}

/** Mail icon for mailto:, phone for tel:, arrow otherwise. */
function LinkIcon({ href }: { href: string }) {
  if (href.startsWith('mailto:')) return <MailIcon data-icon="inline-start" aria-hidden="true" />
  if (href.startsWith('tel:')) return <PhoneIcon data-icon="inline-start" aria-hidden="true" />
  return <ArrowRightIcon data-icon="inline-start" aria-hidden="true" />
}

/**
 * Closing call-to-action band, shared by every page: navy gradient, green only for the
 * primary button and accent line. Deliberately static (no scroll reveal): on short pages it
 * sits in the first viewport, and hidden-until-JS content there would delay LCP.
 */
export function CtaBand({ id, title, text, primary, secondary, aside }: CtaBandProps) {
  const titleId = useId()

  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={titleId}
      className="bg-linear-to-b from-brand-primary to-[color-mix(in_oklab,var(--brand-primary),var(--brand-heading)_55%)] py-12 text-brand-primary-foreground defer-render outline-none [--ring:var(--brand-accent)] sm:py-16 lg:py-22"
    >
      <Container
        className={cn('grid gap-12 lg:items-center lg:gap-16', aside && 'lg:grid-cols-12')}
      >
        <div className={cn('flex flex-col gap-6', aside && 'lg:col-span-7')}>
          <span aria-hidden="true" className="h-1 w-12 rounded-full bg-brand-accent" />
          <h2 id={titleId} className="text-[clamp(2rem,5vw,3.5rem)] text-brand-primary-foreground">
            {title}
          </h2>
          <p className="max-w-xl text-lg text-pretty text-brand-primary-foreground/80 sm:text-xl">
            {text}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg" className="h-12 px-6 text-base">
              <AppLink href={navHref(primary)} {...externalProps(primary)}>
                <LinkIcon href={primary.href} />
                {primary.label}
              </AppLink>
            </Button>
            {secondary && (
              <Button asChild variant="outline-inverse" size="lg" className="h-12 px-6 text-base">
                <AppLink href={navHref(secondary)} {...externalProps(secondary)}>
                  <LinkIcon href={secondary.href} />
                  {secondary.label}
                </AppLink>
              </Button>
            )}
          </div>
        </div>

        {aside && <div className="lg:col-span-5">{aside}</div>}
      </Container>
    </section>
  )
}

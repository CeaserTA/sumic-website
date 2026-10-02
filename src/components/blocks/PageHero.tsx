import { Fragment, useId, type ReactNode } from 'react'

import { AppLink } from '@/components/layout/AppLink'
import { Container } from '@/components/layout/Container'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ui } from '@/content/ui'

export interface Crumb {
  label: string
  /** Omit for the current page (the last crumb). */
  href?: string
}

interface PageHeroProps {
  title: string
  intro?: string
  /** Trail from Home to the current page; the last item is the current page. */
  breadcrumbs: readonly Crumb[]
  /** Optional actions or extra content under the intro. */
  children?: ReactNode
}

/**
 * Inner-page hero: navy, shorter than the home hero, with a breadcrumb and the page's single h1.
 * Static background only (no WebGL), so every inner page paints fast.
 */
export function PageHero({ title, intro, breadcrumbs, children }: PageHeroProps) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className="relative isolate overflow-hidden text-brand-primary-foreground [--ring:var(--brand-accent)]"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero-glow" />
      {/* Echo of the logo swoosh, desktop only. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 200"
        fill="none"
        className="absolute -right-10 bottom-0 -z-10 hidden w-[28rem] text-brand-accent opacity-40 lg:block"
      >
        <path
          d="M20 190 C 110 50, 300 10, 390 110"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>

      <Container className="pt-28 pb-12 sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-18">
        <Breadcrumb aria-label={ui.breadcrumb.label}>
          <BreadcrumbList className="text-brand-primary-foreground/75">
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={crumb.label}>
                {index > 0 && <BreadcrumbSeparator className="text-brand-primary-foreground/50" />}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink asChild className="hover:text-brand-accent">
                      <AppLink href={crumb.href}>{crumb.label}</AppLink>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-brand-primary-foreground">
                      {crumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <h1
          id={titleId}
          className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] text-brand-primary-foreground"
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg text-pretty text-brand-primary-foreground/80 sm:text-xl">
            {intro}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  )
}

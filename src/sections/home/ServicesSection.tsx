import { ArrowUpRightIcon, ClipboardListIcon } from 'lucide-react'

import { serviceIcons } from '@/components/icons/serviceIcons'
import { AppLink } from '@/components/layout/AppLink'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import type { HomeServices } from '@/content/home'
import type { Service } from '@/content/services'
import { ui } from '@/content/ui'
import { externalProps, navHref } from '@/lib/nav'

interface ServicesSectionProps {
  content: HomeServices
  services: readonly Service[]
}

/**
 * Horizontal timeline: all 6 service cards in a single flex row connected
 * by a continuous line with a dot per card. Compact — no wasted vertical space.
 * On mobile the cards stack into a 2-column grid without the timeline line.
 */
export function ServicesSection({ content, services }: ServicesSectionProps) {
  return (
    <Section id="services" eyebrow={content.eyebrow} title={content.title} tone="muted">

      {/* ── Horizontal timeline (desktop) / grid (mobile) ── */}
      <div className="mt-10 lg:mt-12">

        {/* Timeline wrapper — position relative so the connecting line can be absolute */}
        <div className="relative">

          {/* Horizontal connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="absolute top-[2.25rem] right-0 left-0 hidden h-px bg-brand-line lg:block"
          />

          {/* Cards row */}
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:gap-0">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.id]
              const isLast = index === services.length - 1

              return (
                <Reveal key={service.id} as="li" index={index} className="flex flex-1 flex-col">
                  {/* Dot on the line — desktop only */}
                  <div className="mb-4 hidden items-center lg:flex">
                    {/* Left connector (fills space before dot) */}
                    <div className={`h-px flex-1 bg-transparent ${index === 0 ? '' : ''}`} />
                    {/* Dot */}
                    <span
                      aria-hidden="true"
                      className="relative z-10 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-surface ring-2 ring-brand-accent"
                    >
                      <span className="size-2 rounded-full bg-brand-accent" />
                    </span>
                    {/* Right connector */}
                    <div className={`h-px flex-1 ${isLast ? 'bg-transparent' : 'bg-transparent'}`} />
                  </div>

                  {/* Card */}
                  <div
                    className={`
                      group flex h-full flex-col gap-3 rounded-2xl border border-brand-line
                      bg-brand-surface p-4 transition-all
                      hover:border-brand-accent/40 hover:shadow-md hover:shadow-brand-primary/8
                      lg:mx-2 lg:rounded-xl
                    `}
                  >
                    {/* Icon */}
                    <span className="flex size-9 items-center justify-center rounded-lg bg-brand-accent-ink/10 text-brand-accent-ink transition-colors group-hover:bg-brand-accent group-hover:text-brand-accent-foreground">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>

                    {/* Title */}
                    <h3 className="text-sm font-semibold leading-snug text-brand-heading">
                      {service.shortTitle ?? service.title}
                    </h3>

                    {/* Description — hidden on mobile to keep cards tight */}
                    <p className="hidden text-xs leading-relaxed text-brand-text sm:block lg:line-clamp-3">
                      {service.description}
                    </p>

                    {/* Learn more */}
                    <AppLink
                      href={service.href}
                      className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-brand-accent-ink underline-offset-4 transition-colors hover:underline"
                    >
                      {content.learnMore}
                      <span className="sr-only">: {service.shortTitle ?? service.title}</span>
                    </AppLink>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>

      {/* ── Checklist strip ── */}
      <Reveal index={2}>
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-dashed border-brand-line bg-brand-surface p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <ClipboardListIcon
              aria-hidden="true"
              className="mt-0.5 size-6 shrink-0 text-brand-accent-ink"
            />
            <p className="max-w-2xl text-brand-heading">{content.checklist.text}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {content.checklist.links.map((link) => (
              <li key={link.label}>
                <a
                  href={navHref(link)}
                  {...externalProps(link)}
                  className="inline-flex items-center gap-1 rounded-sm font-medium text-brand-primary underline underline-offset-4 transition-colors hover:text-brand-accent-ink"
                >
                  {link.label}
                  <ArrowUpRightIcon aria-hidden="true" className="size-4" />
                  <span className="sr-only">{ui.nav.opensInNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}

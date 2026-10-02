import type { ReactNode } from 'react'
import {
  ArrowUpRightIcon,
  BrainCircuitIcon,
  ChartNoAxesCombinedIcon,
  ClipboardListIcon,
  CodeXmlIcon,
  HeadsetIcon,
  MegaphoneIcon,
  SmartphoneIcon,
  type LucideIcon,
} from 'lucide-react'

import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import type { HomeServices } from '@/content/home'
import type { Service, ServiceId } from '@/content/services'
import { ui } from '@/content/ui'
import { externalProps, navHref } from '@/lib/nav'
import { FeaturedServiceCard, ServiceCard } from '@/sections/home/ServiceCard'
import { GrowthChartVisual, PhoneAppsVisual } from '@/sections/home/ServiceVisuals'

interface ServicesSectionProps {
  content: HomeServices
  services: readonly Service[]
}

const icons: Record<ServiceId, LucideIcon> = {
  'mobile-apps': SmartphoneIcon,
  software: CodeXmlIcon,
  'ai-models': BrainCircuitIcon,
  'data-analysis': ChartNoAxesCombinedIcon,
  'ites-bpo': HeadsetIcon,
  'digital-marketing': MegaphoneIcon,
}

/*
 * Bento layout, in live-site order (3 columns on desktop):
 *   [ mobile apps ········ ][ software ]
 *   [ ai models ][ data    ][ (tall)   ]
 *   [ ites/bpo  ][ digital marketing ·· ]
 */
const FEATURED: ServiceId = 'software'
const spans: Partial<Record<ServiceId, string>> = {
  'mobile-apps': 'md:col-span-2',
  software: 'lg:row-span-2',
  'digital-marketing': 'md:col-span-2',
}

// Visuals fill the right side of the two wide cards (desktop only).
const visuals: Partial<Record<ServiceId, ReactNode>> = {
  'mobile-apps': <PhoneAppsVisual />,
  'digital-marketing': <GrowthChartVisual />,
}

export function ServicesSection({ content, services }: ServicesSectionProps) {
  return (
    <Section id="services" eyebrow={content.eyebrow} title={content.title} tone="muted">
      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
        {services.map((service, index) => {
          return (
            <Reveal key={service.id} as="li" index={index} className={spans[service.id]}>
              {service.id === FEATURED ? (
                <FeaturedServiceCard
                  service={service}
                  icon={icons[service.id]}
                  learnMoreLabel={content.learnMore}
                />
              ) : (
                <ServiceCard
                  service={service}
                  icon={icons[service.id]}
                  learnMoreLabel={content.learnMore}
                  visual={visuals[service.id]}
                />
              )}
            </Reveal>
          )
        })}
      </ul>

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

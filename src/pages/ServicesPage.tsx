import { ArrowUpRightIcon, ClipboardListIcon } from 'lucide-react'

import { CtaBand } from '@/components/blocks/CtaBand'
import { PageHero } from '@/components/blocks/PageHero'
import { serviceIcons } from '@/components/icons/serviceIcons'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { homeCta } from '@/content/home'
import { pageById } from '@/content/pages'
import { checklistForms, services, type ServiceId } from '@/content/services'
import { servicesPage } from '@/content/services-page'
import { ui } from '@/content/ui'
import { FeaturedServiceDetail, ServiceDetail } from '@/sections/services/ServiceDetail'
import { ServiceNav } from '@/sections/services/ServiceNav'

// Same featured service as the home bento: one navy panel breaks up the six sections.
const FEATURED: ServiceId = 'software'

// Standard sections alternate text/image sides, counting only the non-featured ones.
const layouts = new Map(
  services
    .filter((service) => service.id !== FEATURED)
    .map((service, index) => [service.id, index % 2 === 0 ? 'text-first' : 'image-first'] as const),
)

const navItems = services.map((service) => ({
  id: service.anchor,
  label: service.shortTitle ?? service.title,
  icon: serviceIcons[service.id],
}))

/**
 * Services: the six services in depth, each its own anchored section (deep-linked from the home
 * cards and the footer), with an in-page nav, the delivery promise and the checklist forms.
 */
export function ServicesPage() {
  const page = pageById('services')
  const home = pageById('home')
  const { details, includedTitle, navLabel, promise, checklists } = servicesPage

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={page.hero?.intro}
        breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: page.breadcrumb }]}
      />

      <div className="pt-10 pb-6 sm:pt-14 lg:pt-16">
        <Container className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <aside>
            <ServiceNav items={navItems} label={navLabel} />
          </aside>
          <div className="flex flex-col divide-y divide-brand-line">
            {services.map((service, index) => {
              const shared = {
                service,
                detail: details[service.id],
                icon: serviceIcons[service.id],
                includedTitle,
                imageLoading: index === 0 ? ('eager' as const) : ('lazy' as const),
              }
              if (service.id === FEATURED) {
                return <FeaturedServiceDetail key={service.id} {...shared} />
              }
              return <ServiceDetail key={service.id} {...shared} layout={layouts.get(service.id)} />
            })}
          </div>
        </Container>
      </div>

      <Section id="promise">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <span aria-hidden="true" className="h-1 w-12 rounded-full bg-brand-accent-ink" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">{promise.title}</h2>
          <p className="text-xl text-pretty">{promise.text}</p>
        </Reveal>
      </Section>

      <Section id="checklists" tone="muted" title={checklists.title} subtitle={checklists.intro}>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 lg:gap-6">
          {checklistForms.map((form, index) => (
            <Reveal
              key={form.id}
              as="li"
              index={index}
              className="flex flex-col gap-5 rounded-2xl bg-brand-surface p-6 ring-1 ring-brand-line sm:p-8"
            >
              <ClipboardListIcon aria-hidden="true" className="size-7 text-brand-accent-ink" />
              <h3 className="text-xl sm:text-2xl">{form.title}</h3>
              <p className="text-pretty">{form.description}</p>
              <Button asChild size="lg" className="mt-auto h-12 w-fit px-5 text-base">
                <a href={form.href} target="_blank" rel="noopener noreferrer">
                  {checklists.linkLabel}
                  <span className="sr-only">
                    : {form.title} {ui.nav.opensInNewTab}
                  </span>
                  <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
                </a>
              </Button>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={homeCta.title}
        text={homeCta.text}
        primary={homeCta.primary}
        secondary={homeCta.secondary}
      />
    </>
  )
}

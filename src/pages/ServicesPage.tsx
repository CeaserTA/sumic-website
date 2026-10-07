import { useCallback, useEffect, useId, useState } from 'react'
import { ArrowUpRightIcon, ClipboardListIcon } from 'lucide-react'

import { CtaBand } from '@/components/blocks/CtaBand'
import { serviceIcons } from '@/components/icons/serviceIcons'
import { AppLink } from '@/components/layout/AppLink'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { homeCta } from '@/content/home'
import { pageById } from '@/content/pages'
import { checklistForms, services } from '@/content/services'
import { servicesPage } from '@/content/services-page'
import { ui } from '@/content/ui'
import { ServiceTabBar } from '@/sections/services/ServiceTabBar'
import { ServicesPanel } from '@/sections/services/ServicesPanel'

// Anchors the hash can target
const ANCHORS = services.map((s) => s.anchor)
const DEFAULT_ANCHOR = ANCHORS[0]

function anchorFromHash(hash: string): string {
  const id = hash.replace('#', '')
  return ANCHORS.includes(id) ? id : DEFAULT_ANCHOR
}

const tabItems = services.map((service) => ({
  id: service.anchor,
  label: service.shortTitle ?? service.title,
  icon: serviceIcons[service.id],
}))

/**
 * Services page.
 * Hash drives the active service: /services/#mobile-app-development selects that service.
 * Both the overlapping quick-link cards and the panel list update the hash and each other.
 */
export function ServicesPage() {
  const page = pageById('services')
  const home = pageById('home')
  const { details, includedTitle, navLabel, promise, checklists } = servicesPage
  const titleId = useId()

  // ── Hash-driven active service ───────────────────────────────────────────
  // On the server (prerender) there is no window, so start with the default.
  const [activeAnchor, setActiveAnchor] = useState<string>(DEFAULT_ANCHOR)

  useEffect(() => {
    // Initialise from the current hash on mount
    setActiveAnchor(anchorFromHash(window.location.hash))

    function onHashChange() {
      setActiveAnchor(anchorFromHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const handleSelect = useCallback((anchor: string) => {
    setActiveAnchor(anchor)
    // Update the URL hash without a full navigation
    history.replaceState(null, '', `#${anchor}`)
  }, [])

  // ── Panel items ──────────────────────────────────────────────────────────
  const panelItems = services.map((service) => ({
    service,
    detail: details[service.id],
    icon: serviceIcons[service.id],
  }))

  return (
    <>
      {/* ── Hero with photo background ── */}
      <section
        aria-labelledby={titleId}
        className="relative isolate overflow-hidden text-brand-primary-foreground [--ring:var(--brand-accent)]"
      >
        <img
          src="/images/services/01 DSE SUMIC 16.jpg"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(to right, rgba(1,50,80,0.95) 0%, rgba(1,50,80,0.80) 50%, rgba(30,239,15,0.30) 100%)',
          }}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 400 200"
          fill="none"
          className="absolute -right-10 bottom-0 -z-10 hidden w-[28rem] text-brand-accent opacity-40 lg:block"
        >
          <path d="M20 190 C 110 50, 300 10, 390 110" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        </svg>
        <Container className="pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-16">
          <Breadcrumb aria-label={ui.breadcrumb.label}>
            <BreadcrumbList className="text-brand-primary-foreground/75">
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="hover:text-brand-accent">
                  <AppLink href={home.path}>{home.breadcrumb}</AppLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-brand-primary-foreground/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-brand-primary-foreground">{page.breadcrumb}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1
            id={titleId}
            className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] text-brand-primary-foreground"
          >
            {page.hero?.title ?? page.title}
          </h1>
          {page.hero?.intro && (
            <p className="mt-4 max-w-2xl text-lg text-pretty text-brand-primary-foreground/80 sm:text-xl">
              {page.hero.intro}
            </p>
          )}
        </Container>
      </section>

      {/* ── Overlapping quick-link cards ── */}
      <div className="relative z-20 -mt-10 lg:-mt-12">
        <Container>
          <ServiceTabBar
            items={tabItems}
            label={navLabel}
            activeId={activeAnchor}
            onSelect={handleSelect}
          />
        </Container>
      </div>

      {/* ── Interactive services panel ── */}
      <div className="bg-brand-accent/5 py-16 lg:py-24">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">Our services</h2>
            <p className="mt-2 text-lg text-brand-text">
              Explore what we can do for your business.
            </p>
          </div>
          <ServicesPanel
            items={panelItems}
            includedTitle={includedTitle}
            activeAnchor={activeAnchor}
            onSelect={handleSelect}
          />
        </Container>
      </div>

      {/* ── Bottom panel: promise + checklists ── */}
      <div className="bg-brand-surface-muted py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl border border-brand-line bg-brand-surface p-8 lg:p-12">

            <div className="flex flex-col items-center gap-3 text-center">
              <span aria-hidden="true" className="h-1 w-10 rounded-full bg-brand-accent-ink" />
              <h2 className="text-2xl font-semibold sm:text-3xl">{promise.title}</h2>
              <p className="max-w-xl text-base text-pretty text-brand-text">{promise.text}</p>
            </div>

            <div className="my-8 border-t border-brand-line" />

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-semibold sm:text-2xl">{checklists.title}</h3>
                <p className="mt-1 text-base text-brand-text">{checklists.intro}</p>
              </div>
              <ul className="grid gap-4 md:grid-cols-2">
                {checklistForms.map((form, index) => (
                  <Reveal
                    key={form.id}
                    as="li"
                    index={index}
                    className="flex flex-col gap-4 rounded-2xl border border-brand-line bg-brand-surface-muted p-6"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand-accent text-brand-accent-foreground">
                      <ClipboardListIcon aria-hidden="true" className="size-5" />
                    </span>
                    <h4 className="text-lg font-semibold">{form.title}</h4>
                    <p className="text-sm text-pretty text-brand-text">{form.description}</p>
                    <Button asChild size="default" className="mt-auto h-10 w-fit px-5 text-sm">
                      <a href={form.href} target="_blank" rel="noopener noreferrer">
                        {checklists.linkLabel}
                        <span className="sr-only">: {form.title} {ui.nav.opensInNewTab}</span>
                        <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
                      </a>
                    </Button>
                  </Reveal>
                ))}
              </ul>
            </div>

          </div>
        </Container>
      </div>

      <CtaBand
        title={homeCta.title}
        text={homeCta.text}
        primary={homeCta.primary}
        secondary={homeCta.secondary}
      />
    </>
  )
}

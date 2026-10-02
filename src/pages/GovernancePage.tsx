import { ChevronDownIcon } from 'lucide-react'

import { CtaBand } from '@/components/blocks/CtaBand'
import { OrgTree } from '@/components/blocks/OrgTree'
import { PageHero } from '@/components/blocks/PageHero'
import { PeopleGrid } from '@/components/blocks/PeopleGrid'
import { Section } from '@/components/layout/Section'
import { governance } from '@/content/company'
import { homeCta } from '@/content/home'
import { pageById } from '@/content/pages'

/** Governance: structure (chart + text version) and the management team. */
export function GovernancePage() {
  const page = pageById('team')
  const home = pageById('home')
  const { structure, team } = governance

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={page.hero?.intro}
        breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: page.breadcrumb }]}
      />

      <Section id="structure" title={structure.title} subtitle={structure.text}>
        <figure className="mt-10 flex flex-col gap-6 lg:mt-12">
          <div className="rounded-3xl bg-brand-surface p-4 ring-1 ring-brand-line sm:p-8">
            <img
              src={structure.chart.src}
              srcSet={structure.chart.srcSet}
              sizes="(min-width: 1280px) 1150px, 92vw"
              width={structure.chart.width}
              height={structure.chart.height}
              alt={structure.chart.alt}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-5xl"
            />
          </div>
          <figcaption>
            <details className="group max-w-3xl rounded-xl border border-brand-line bg-brand-surface">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 font-medium text-brand-heading">
                {structure.textVersionLabel}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="px-4 pb-5">
                <OrgTree nodes={structure.tree} />
              </div>
            </details>
          </figcaption>
        </figure>
      </Section>

      <Section id="management-team" tone="muted" title={team.title} subtitle={team.intro}>
        <div className="mt-10 lg:mt-12">
          <PeopleGrid people={team.people} />
        </div>
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

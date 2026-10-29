import { useId } from 'react'
import { ClockIcon, LifeBuoyIcon, ShieldCheckIcon } from 'lucide-react'

import { PageHero } from '@/components/blocks/PageHero'
import { Section } from '@/components/layout/Section'
import { checklistCopy } from '@/content/checklists/copy'
import type { ChecklistFormDefinition } from '@/content/checklists/types'
import { pageById, type PageId } from '@/content/pages'
import { ChecklistForm } from '@/sections/checklists/ChecklistForm'

export type ChecklistPageId = Extract<PageId, 'checklist-website' | 'checklist-mobile-app'>

/**
 * A client checklist: the multi-step form beside the Google Form's own introduction.
 * The form comes in as data (src/content/checklists/), loaded with this route only.
 */
export function ChecklistPage({
  pageId,
  form,
}: {
  pageId: ChecklistPageId
  form: ChecklistFormDefinition
}) {
  const page = pageById(pageId)
  const home = pageById('home')
  const services = pageById('services')
  const { intro } = form
  const aboutId = useId()

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={page.hero?.intro}
        breadcrumbs={[
          { label: home.breadcrumb, href: home.path },
          { label: services.breadcrumb, href: services.path },
          { label: page.breadcrumb },
        ]}
      />

      <Section id="checklist" tone="muted">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-8">
            <ChecklistForm form={form} />
          </div>

          <aside aria-labelledby={aboutId} className="lg:col-span-4">
            <div className="flex flex-col gap-5 lg:sticky lg:top-28">
              <h2 id={aboutId} className="text-2xl">
                {checklistCopy.aboutTitle}
              </h2>
              {intro.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-pretty">
                  {paragraph}
                </p>
              ))}
              {intro.list && (
                <div className="flex flex-col gap-2">
                  <p>{intro.list.lead}</p>
                  <ul className="flex list-disc flex-col gap-1 pl-5 marker:text-brand-accent-ink">
                    {intro.list.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {intro.closing && <p className="text-pretty">{intro.closing}</p>}
              <ul className="flex flex-col gap-4 border-t border-brand-line pt-5 text-sm">
                {intro.estimatedTime && (
                  <AboutItem icon={ClockIcon}>{intro.estimatedTime}</AboutItem>
                )}
                <AboutItem icon={ShieldCheckIcon}>{intro.note}</AboutItem>
                <AboutItem icon={LifeBuoyIcon}>{intro.help}</AboutItem>
              </ul>
              <p className="text-sm font-medium text-brand-heading">{intro.signOff}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}

function AboutItem({ icon: Icon, children }: { icon: typeof ClockIcon; children: string }) {
  return (
    <li className="flex gap-3">
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-accent-ink" />
      <span className="text-pretty wrap-anywhere">{children}</span>
    </li>
  )
}

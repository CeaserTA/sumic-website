import { HandshakeIcon, MailIcon } from 'lucide-react'

import { CaseStudyCard } from '@/components/blocks/CaseStudyCard'
import { CtaBand } from '@/components/blocks/CtaBand'
import { PageHero } from '@/components/blocks/PageHero'
import { PartnerLogoGrid } from '@/components/blocks/PartnerLogos'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { homeCta } from '@/content/home'
import { pageById } from '@/content/pages'
import { confirmedPartners } from '@/content/partners'
import { partnershipsPage } from '@/content/partnerships'

/** Partnerships: case studies from the live page, the partner logo grid and a partner CTA. */
export function PartnershipsPage() {
  const page = pageById('partnerships')
  const home = pageById('home')
  const { intro, caseStudies, partners, partnerCta } = partnershipsPage

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={page.hero?.intro}
        breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: page.breadcrumb }]}
      />

      <Section id="projects" eyebrow={intro.eyebrow} title={intro.title} subtitle={intro.text}>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:gap-8">
          {caseStudies.map((study, index) =>
            // The top row sits in the first viewport: render it at once (no reveal, eager image)
            // so the first image can paint as the LCP element without waiting for Motion.
            index < 2 ? (
              <li key={study.id}>
                <CaseStudyCard study={study} imageLoading={index === 0 ? 'eager' : 'lazy'} />
              </li>
            ) : (
              <Reveal key={study.id} as="li" index={index % 2}>
                <CaseStudyCard study={study} />
              </Reveal>
            ),
          )}
        </ul>
      </Section>

      <Section id="partners" tone="muted" title={partners.title} subtitle={partners.intro}>
        <div className="mt-10 lg:mt-14">
          <PartnerLogoGrid partners={confirmedPartners} />
        </div>
      </Section>

      <Section id="partner-with-us">
        <div className="flex flex-col gap-6 rounded-3xl bg-brand-accent-ink/5 p-6 ring-1 ring-brand-accent-ink/25 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-12">
          <div className="flex gap-5">
            <span className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-accent text-brand-accent-foreground sm:flex">
              <HandshakeIcon aria-hidden="true" className="size-7" />
            </span>
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl sm:text-4xl">{partnerCta.title}</h2>
              <p className="max-w-xl text-lg text-pretty">{partnerCta.text}</p>
            </div>
          </div>
          <Button asChild size="lg" className="h-12 w-fit max-w-full shrink-0 px-6 text-base">
            <a href={partnerCta.action.href}>
              <MailIcon data-icon="inline-start" aria-hidden="true" />
              <span className="truncate">{partnerCta.action.label}</span>
            </a>
          </Button>
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

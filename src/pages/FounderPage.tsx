import { ArrowUpRightIcon } from 'lucide-react'

import { CtaBand } from '@/components/blocks/CtaBand'
import { PageHero } from '@/components/blocks/PageHero'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { founder } from '@/content/company'
import { homeCta } from '@/content/home'
import { pageById } from '@/content/pages'
import { ui } from '@/content/ui'

/** Meet the Founder: two-column intro (portrait + name, role, short bio), then the story. */
export function FounderPage() {
  const page = pageById('founder')
  const home = pageById('home')

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={page.hero?.intro}
        breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: page.breadcrumb }]}
      />

      <Section id="profile">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[2rem] bg-linear-to-br from-brand-accent/30 to-brand-primary/20"
              />
              {/* Near the top of the page, so it loads eagerly (likely LCP). */}
              <img
                src={founder.photo.src}
                srcSet={founder.photo.srcSet}
                sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, 92vw"
                width={founder.photo.width}
                height={founder.photo.height}
                alt={founder.photo.alt}
                fetchPriority="high"
                decoding="async"
                className="aspect-square w-full rounded-3xl object-cover object-top shadow-xl shadow-brand-primary/15"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl">{founder.name}</h2>
            <p className="text-lg font-medium text-brand-accent-ink">{founder.role}</p>
            <p className="max-w-prose text-xl leading-relaxed text-pretty text-brand-heading">
              {founder.intro}
            </p>
            <Button asChild variant="default" size="lg" className="mt-2 h-12 w-fit px-5 text-base">
              <a href={founder.website.href} target="_blank" rel="noopener noreferrer">
                {founder.website.label}
                <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
                <span className="sr-only"> {ui.nav.opensInNewTab}</span>
              </a>
            </Button>
          </div>
        </div>
      </Section>

      <Section id="story" tone="muted">
        <div className="mx-auto flex max-w-3xl flex-col gap-12">
          {founder.sections.map((section) => (
            <Reveal
              key={section.title}
              className="flex flex-col gap-4 border-l-2 border-brand-accent-ink pl-6 sm:pl-8"
            >
              <h2 className="text-2xl sm:text-3xl">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-pretty">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          ))}
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

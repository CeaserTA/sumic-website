import {
  ArrowUpRightIcon,
  CompassIcon,
  GraduationCapIcon,
  MailIcon,
  NetworkIcon,
  SproutIcon,
  type LucideIcon,
} from 'lucide-react'

import { CtaBand } from '@/components/blocks/CtaBand'
import { FeatureList } from '@/components/blocks/FeatureList'
import { JobListing } from '@/components/blocks/JobListing'
import { PageHero } from '@/components/blocks/PageHero'
import { SocialIcon } from '@/components/icons/SocialIcon'
import { AppLink } from '@/components/layout/AppLink'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import {
  applicationEmail,
  applicationHref,
  careersPage,
  jobOpenings,
  type InternshipBenefitId,
} from '@/content/careers'
import { homeCta } from '@/content/home'
import { pageById } from '@/content/pages'
import { ui } from '@/content/ui'

const benefitIcons: Record<InternshipBenefitId, LucideIcon> = {
  learning: GraduationCapIcon,
  mentorship: CompassIcon,
  networking: NetworkIcon,
  growth: SproutIcon,
}

/** Careers: why Sumic, current openings (or an empty state), the internship program, how to apply. */
export function CareersPage() {
  const page = pageById('careers')
  const home = pageById('home')
  const { welcome, openings, jobAlerts, generalApplication, internship, howToApply } = careersPage

  const linkedInButton = (
    <Button asChild size="lg" className="h-11 w-fit px-5">
      <a href={jobAlerts.href} target="_blank" rel="noopener noreferrer">
        <SocialIcon platform="linkedin" data-icon="inline-start" className="size-4" />
        {jobAlerts.label}
        <span className="sr-only"> {ui.nav.opensInNewTab}</span>
      </a>
    </Button>
  )

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={page.hero?.intro}
        breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: page.breadcrumb }]}
      />

      <Section id="why-sumic" eyebrow={welcome.eyebrow} title={welcome.title}>
        <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p className="max-w-[40rem] text-2xl leading-snug text-pretty text-brand-heading sm:text-[1.75rem]">
              {welcome.lead}
            </p>
            {welcome.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[40rem] text-lg leading-relaxed text-pretty">
                {paragraph}
              </p>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <h3 className="text-lg">{welcome.valuesTitle}</h3>
              <ul className="flex flex-wrap gap-2">
                {welcome.values.map((value) => (
                  <li
                    key={value}
                    className="rounded-full bg-brand-accent-ink/10 px-4 py-1.5 font-medium text-brand-heading"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Reveal index={1} className="lg:col-span-5">
            <img
              src={welcome.photo.src}
              srcSet={welcome.photo.srcSet}
              sizes="(min-width: 1280px) 460px, (min-width: 1024px) 36vw, 92vw"
              width={welcome.photo.width}
              height={welcome.photo.height}
              alt={welcome.photo.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full rounded-3xl object-cover lg:aspect-[4/5] lg:object-[30%_center]"
            />
          </Reveal>
        </div>
      </Section>

      <Section id="openings" tone="muted" title={openings.title}>
        <div className="mt-10 lg:mt-12">
          {jobOpenings.length > 0 ? (
            <div className="flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
                {jobOpenings.map((job) => (
                  <li key={job.id}>
                    <JobListing job={job} applyLabel={openings.applyLabel} />
                  </li>
                ))}
              </ul>
              {linkedInButton}
            </div>
          ) : (
            <div className="flex flex-col gap-5 rounded-2xl border border-dashed border-brand-line bg-brand-surface p-6 sm:p-10">
              <h3 className="text-2xl">{openings.empty.title}</h3>
              <p className="max-w-2xl text-lg text-pretty">{openings.empty.text}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {linkedInButton}
                <Button asChild variant="outline" size="lg" className="h-11 w-fit px-5">
                  <a href={applicationHref()}>
                    <MailIcon data-icon="inline-start" aria-hidden="true" />
                    {generalApplication.label}
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section id="internships" eyebrow={internship.eyebrow} title={internship.title}>
        <div className="mt-8 flex max-w-[40rem] flex-col gap-4">
          {internship.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
        <h3 className="mt-14 text-2xl sm:text-3xl lg:mt-18">{internship.benefitsTitle}</h3>
        <FeatureList
          className="mt-8"
          columns={4}
          items={internship.benefits.map((benefit) => ({
            ...benefit,
            icon: benefitIcons[benefit.id],
          }))}
          headingLevel={4}
        />
        <p className="mt-12 max-w-3xl border-l-2 border-brand-accent-ink pl-5 text-xl text-pretty text-brand-heading">
          {internship.closing}
        </p>
      </Section>

      <Section id="how-to-apply" tone="muted" title={howToApply.title} subtitle={howToApply.intro}>
        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <ul className="grid gap-3 sm:grid-cols-3">
              {howToApply.programs.map((program) => (
                <li
                  key={program}
                  className="flex min-h-24 items-end rounded-2xl bg-brand-surface p-5 font-heading text-lg leading-tight font-bold text-brand-heading ring-1 ring-brand-line"
                >
                  {program}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 rounded-2xl bg-brand-surface p-6 ring-1 ring-brand-line sm:p-8">
              <dl className="grid gap-x-4 gap-y-2 text-brand-heading sm:grid-cols-[auto_minmax(0,1fr)]">
                <dt className="font-medium">{howToApply.sendTo}</dt>
                <dd className="wrap-anywhere">
                  <a
                    href={`mailto:${applicationEmail.to}`}
                    className="rounded-sm underline underline-offset-4 hover:text-brand-accent-ink"
                  >
                    {applicationEmail.to}
                  </a>
                </dd>
                <dt className="font-medium">{howToApply.ccLabel}</dt>
                <dd className="wrap-anywhere">
                  <a
                    href={`mailto:${applicationEmail.cc}`}
                    className="rounded-sm underline underline-offset-4 hover:text-brand-accent-ink"
                  >
                    {applicationEmail.cc}
                  </a>
                </dd>
              </dl>
              <Button asChild variant="accent" size="lg" className="h-12 w-fit px-6 text-base">
                <a href={applicationHref()}>
                  <MailIcon data-icon="inline-start" aria-hidden="true" />
                  {howToApply.buttonLabel}
                </a>
              </Button>
            </div>
          </div>
          <aside className="flex flex-col gap-4 rounded-2xl bg-brand-primary p-6 text-brand-primary-foreground [--ring:var(--brand-accent)] sm:p-8 lg:col-span-5">
            <h3 className="text-2xl text-brand-primary-foreground">{howToApply.academy.title}</h3>
            <p className="text-pretty text-brand-primary-foreground/85">
              {howToApply.academy.before}
              <AppLink
                href={howToApply.academy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-medium text-brand-accent underline underline-offset-4"
              >
                {howToApply.academy.linkLabel}
                <ArrowUpRightIcon aria-hidden="true" className="ml-0.5 inline size-4" />
                <span className="sr-only"> {ui.nav.opensInNewTab}</span>
              </AppLink>
              {howToApply.academy.after}
            </p>
            <p className="mt-auto text-pretty text-brand-primary-foreground/85">
              {howToApply.closing}
            </p>
          </aside>
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

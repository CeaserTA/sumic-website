import {
  ArrowRightIcon,
  GaugeIcon,
  HandshakeIcon,
  OrbitIcon,
  TargetIcon,
  TelescopeIcon,
  UsersRoundIcon,
  WrenchIcon,
  type LucideIcon,
} from 'lucide-react'

import { CtaBand } from '@/components/blocks/CtaBand'
import { FeatureList } from '@/components/blocks/FeatureList'
import { PageHero } from '@/components/blocks/PageHero'
import { PartnerLogoGrid } from '@/components/blocks/PartnerLogos'
import { StatementCard } from '@/components/blocks/StatementCard'
import { AppLink } from '@/components/layout/AppLink'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { about, type AboutPhoto, type WhyChooseUsId } from '@/content/about'
import { homeCta } from '@/content/home'
import { pageById } from '@/content/pages'
import { confirmedPartners } from '@/content/partners'
import { ProcessTimeline } from '@/sections/home/ProcessTimeline'
import { StatsRow } from '@/sections/home/StatsRow'

const whyIcons: Record<WhyChooseUsId, LucideIcon> = {
  '360': OrbitIcon,
  'client-centricity': HandshakeIcon,
  'domain-expertise': WrenchIcon,
  'time-to-market': GaugeIcon,
  'a-class-team': UsersRoundIcon,
}

/**
 * About: a calmer, deeper read than the home page. Story with a photo and milestones, a photo
 * band, then objectives, stats, lifecycle, partners and why choose us (shared home components).
 */
export function AboutPage() {
  const page = pageById('about')
  const home = pageById('home')
  const { story, milestones, band, objectives, stats, lifecycle, partners, whyChooseUs } = about

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={page.hero?.intro}
        breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: page.breadcrumb }]}
      />

      <Section id="history" eyebrow={story.eyebrow} title={story.title}>
        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p className="max-w-[40rem] text-2xl leading-snug text-pretty text-brand-heading sm:text-[1.75rem]">
              {story.lead}
            </p>
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[40rem] text-lg leading-relaxed text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
          <Reveal index={1} className="lg:col-span-5">
            <div className="relative lg:sticky lg:top-28">
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 -z-10 h-2/3 w-2/3 rounded-3xl bg-brand-accent/25"
              />
              <img
                src={story.photo.src}
                srcSet={story.photo.srcSet}
                sizes="(min-width: 1280px) 460px, (min-width: 1024px) 36vw, 92vw"
                width={story.photo.width}
                height={story.photo.height}
                alt={story.photo.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[3/2] w-full rounded-3xl object-cover lg:aspect-[4/5] lg:object-[30%_center]"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-8 lg:mt-28">
          <h3 className="text-2xl sm:text-3xl">{milestones.title}</h3>
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.items.map((milestone, index) => (
              <Reveal
                key={milestone.year}
                as="li"
                index={index}
                className="flex flex-col gap-3 border-t border-brand-line pt-5"
              >
                <span className="font-heading text-4xl leading-none font-bold tracking-[-0.02em] text-brand-accent-ink">
                  {milestone.year}
                </span>
                <p className="text-pretty text-brand-heading">{milestone.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <PhotoBand photo={band.photo} text={band.quote} />

      <Section id="objectives" tone="muted" eyebrow={objectives.eyebrow} title={objectives.title}>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:gap-6">
          <Reveal>
            <StatementCard statement={objectives.vision} icon={TelescopeIcon} />
          </Reveal>
          <Reveal index={1}>
            <StatementCard statement={objectives.mission} icon={TargetIcon} />
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-6 lg:mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl">{objectives.valuesTitle}</h3>
            <AppLink
              href={objectives.meaningLink.href}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-sm font-medium text-brand-accent-ink underline decoration-brand-accent-ink/40 underline-offset-4 transition-colors hover:text-brand-primary"
            >
              {objectives.meaningLink.label}
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </AppLink>
          </div>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {objectives.values.map((value, index) => (
              <Reveal
                key={value}
                as="li"
                index={index}
                className="flex min-h-28 items-end rounded-2xl bg-brand-surface p-5 ring-1 ring-brand-line sm:min-h-36 sm:p-6"
              >
                <span className="font-heading text-xl font-bold tracking-[-0.02em] break-words text-brand-heading sm:text-3xl">
                  {value}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="statistics" eyebrow={stats.eyebrow} title={stats.title}>
        <div className="mt-12 lg:mt-16">
          <StatsRow stats={stats.items} />
        </div>
      </Section>

      <Section id="lifecycle" tone="muted">
        <ProcessTimeline
          title={lifecycle.title}
          intro={lifecycle.intro}
          steps={lifecycle.steps}
          headingLevel={2}
        />
      </Section>

      <Section id="partners" title={partners.title} subtitle={partners.intro}>
        <div className="mt-10 lg:mt-14">
          <PartnerLogoGrid partners={confirmedPartners} />
        </div>
      </Section>

      <Section
        id="why-choose-us"
        tone="muted"
        title={whyChooseUs.title}
        subtitle={whyChooseUs.intro}
      >
        <FeatureList
          className="mt-12 lg:mt-16"
          items={whyChooseUs.items.map((item) => ({ ...item, icon: whyIcons[item.id] }))}
        />
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

/**
 * Full-width real photo, unobscured, with one line of copy on a solid navy card that overlaps
 * its lower edge (text never sits on the photo, so contrast holds at every width). The muted
 * background continues into the objectives section below.
 */
function PhotoBand({ photo, text }: { photo: AboutPhoto; text: string }) {
  return (
    <div className="bg-brand-surface-muted defer-render">
      <img
        src={photo.src}
        srcSet={photo.srcSet}
        sizes="100vw"
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className="h-[18rem] w-full object-cover object-[center_70%] sm:h-[26rem] lg:h-[34rem]"
      />
      <Container className="relative -mt-16 sm:-mt-24">
        <div className="max-w-3xl rounded-3xl bg-brand-primary p-7 shadow-xl shadow-brand-primary/20 sm:p-10 lg:p-12">
          <span aria-hidden="true" className="mb-6 block h-1 w-12 rounded-full bg-brand-accent" />
          <p className="text-2xl leading-snug font-medium text-pretty text-brand-primary-foreground sm:text-3xl lg:text-4xl">
            {text}
          </p>
        </div>
      </Container>
    </div>
  )
}

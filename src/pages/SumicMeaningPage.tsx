import { CtaBand } from '@/components/blocks/CtaBand'
import { PageHero } from '@/components/blocks/PageHero'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { sumicMeaning } from '@/content/company'
import { homeCta } from '@/content/home'
import { pageById } from '@/content/pages'

/** How the name is built: the kept letters of each name, large, then the result. Decorative. */
function NameComposition() {
  const { names, result } = sumicMeaning.origin
  return (
    <div
      aria-hidden="true"
      className="relative isolate overflow-hidden rounded-3xl bg-brand-primary p-8 text-brand-primary-foreground sm:p-10"
    >
      <svg
        viewBox="0 0 400 200"
        fill="none"
        className="absolute -right-16 -bottom-10 -z-10 w-80 text-brand-accent opacity-30"
      >
        <path
          d="M20 190 C 110 50, 300 10, 390 110"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col gap-5">
        {names.map((part) => (
          <div key={part.name} className="flex flex-col gap-1">
            <p className="text-5xl leading-none font-bold tracking-[-0.03em] sm:text-6xl">
              <span className={part.name === 'Cirus' ? 'text-brand-accent' : undefined}>
                {part.kept}
              </span>
              <span className="text-brand-primary-foreground/30">
                {part.name.slice(part.kept.length)}
              </span>
            </p>
            {part.note && <p className="text-sm text-brand-primary-foreground/70">{part.note}</p>}
          </div>
        ))}
        <span className="h-px w-full bg-brand-primary-foreground/20" />
        <p className="text-6xl leading-none font-bold tracking-[-0.03em] sm:text-7xl">
          {result.slice(0, -1)}
          <span className="text-brand-accent">{result.slice(-1)}</span>
        </p>
      </div>
    </div>
  )
}

export function SumicMeaningPage() {
  const page = pageById('sumic-meaning')
  const home = pageById('home')
  const { lead, origin, meaning, story } = sumicMeaning

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={page.hero?.intro}
        breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: page.breadcrumb }]}
      />

      <Section id="origin">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <p className="text-2xl leading-snug text-pretty text-brand-heading sm:text-3xl">
              {lead}
            </p>
            <h2 className="text-3xl sm:text-4xl">{origin.title}</h2>
            {origin.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-prose text-lg text-pretty">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal index={1}>
            <NameComposition />
          </Reveal>
        </div>
      </Section>

      <Section id="meaning" tone="primary" title={meaning.title}>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3 lg:mt-14">
          {meaning.words.map((word, index) => (
            <Reveal
              key={word}
              as="li"
              index={index}
              className="flex flex-col gap-4 border-t-2 border-brand-accent pt-6"
            >
              <span className="text-5xl font-bold tracking-[-0.03em] text-brand-primary-foreground lg:text-7xl">
                {word}
              </span>
            </Reveal>
          ))}
        </ul>
        {meaning.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-10 max-w-2xl text-lg text-pretty text-brand-primary-foreground/80 sm:text-xl"
          >
            {paragraph}
          </p>
        ))}
      </Section>

      <Section id="story" tone="muted">
        <ul className="grid gap-5 md:grid-cols-3">
          {story.map((item, index) => (
            <Reveal
              key={item.title}
              as="li"
              index={index}
              className="flex flex-col gap-3 rounded-2xl bg-brand-surface p-6 ring-1 ring-brand-line sm:p-8"
            >
              <span aria-hidden="true" className="h-1 w-10 rounded-full bg-brand-accent-ink" />
              <h2 className="text-2xl">{item.title}</h2>
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-pretty">
                  {paragraph}
                </p>
              ))}
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

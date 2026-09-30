import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Section } from '@/components/layout/Section'
import { homeHero, homePlaceholders, homeSectionIds } from '@/content/home'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

const placeholderTones = {
  about: 'default',
  services: 'muted',
  'sumic-online': 'default',
  proof: 'muted',
  cta: 'primary',
} as const

export function HomePage() {
  const activeSectionId = useActiveSection(homeSectionIds)

  return (
    <>
      <Navbar links={site.nav} cta={site.cta} activeSectionId={activeSectionId} />

      <main id="main" tabIndex={-1} className="outline-none">
        {/* TODO: replace each placeholder with its section in sections/home/. */}
        <Section
          id="hero"
          titleAs="h1"
          title={homeHero.title}
          subtitle={homeHero.subtitle}
          tone="muted"
          className="flex min-h-[80svh] items-center pt-32"
        >
          <PlaceholderNote note={homeHero.note} />
        </Section>

        {homePlaceholders.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            title={section.title}
            tone={placeholderTones[section.id]}
          >
            <PlaceholderNote
              note={section.note}
              dark={placeholderTones[section.id] === 'primary'}
            />
          </Section>
        ))}
      </main>

      <Footer site={site} services={services} />
    </>
  )
}

function PlaceholderNote({ note, dark = false }: { note: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        'mt-10 rounded-xl border border-dashed p-8',
        dark
          ? 'border-brand-primary-foreground/30 text-brand-primary-foreground/75'
          : 'border-brand-line',
      )}
    >
      {note}
    </p>
  )
}

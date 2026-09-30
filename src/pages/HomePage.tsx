import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Section } from '@/components/layout/Section'
import { homeAbout, homeHero, homePlaceholders, homeSectionIds } from '@/content/home'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'
import { AboutSection } from '@/sections/home/AboutSection'
import { HeroSection } from '@/sections/home/HeroSection'

const placeholderTones = {
  services: 'muted',
  'sumic-online': 'default',
  proof: 'muted',
  cta: 'primary',
} as const

export function HomePage() {
  const activeSectionId = useActiveSection(homeSectionIds)

  return (
    <>
      {/* The hero is navy, so the transparent navbar uses white text and the inverse logo. */}
      <Navbar
        links={site.nav}
        cta={site.cta}
        activeSectionId={activeSectionId}
        overlayTone="dark"
      />

      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection content={homeHero} />
        <AboutSection content={homeAbout} products={site.products} />

        {/* TODO: replace each placeholder with its section in sections/home/. */}
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

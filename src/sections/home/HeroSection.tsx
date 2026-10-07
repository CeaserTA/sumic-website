import { useId, useState } from 'react'
import { PauseIcon, PlayIcon } from 'lucide-react'

import { BlurText } from '@/components/effects/BlurText'
import { AppLink } from '@/components/layout/AppLink'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import type { HomeHero } from '@/content/home'
import { ui } from '@/content/ui'
import { useHeavyEffects } from '@/hooks/useHeavyEffects'
import { navHref } from '@/lib/nav'
import { HeroBackground } from '@/sections/home/HeroBackground'
import { HeroServicesStrip } from '@/sections/home/HeroServicesStrip'
import { HeroVisual } from '@/sections/home/HeroVisual'

interface HeroSectionProps {
  content: HomeHero
}

export function HeroSection({ content }: HeroSectionProps) {
  const titleId = useId()
  const effectsEnabled = useHeavyEffects()
  const [backgroundPaused, setBackgroundPaused] = useState(false)

  return (
    <>
      <section
        id="hero"
        tabIndex={-1}
        aria-labelledby={titleId}
        className="relative isolate overflow-hidden text-brand-primary-foreground outline-none [--ring:var(--brand-accent)]"
      >
        <HeroBackground enabled={effectsEnabled} paused={backgroundPaused} />

        {effectsEnabled && (
          <Button
            variant="outline-inverse"
            size="icon-sm"
            onClick={() => setBackgroundPaused((paused) => !paused)}
            aria-pressed={backgroundPaused}
            className="absolute right-3 bottom-3 z-10 size-8 rounded-full border-brand-primary-foreground/25 bg-brand-heading/30 text-brand-primary-foreground/80 opacity-70 backdrop-blur-sm hover:opacity-100 focus-visible:opacity-100 sm:right-5 sm:bottom-5"
          >
            {backgroundPaused ? (
              <PlayIcon className="size-3.5" />
            ) : (
              <PauseIcon className="size-3.5" />
            )}
            <span className="sr-only">
              {backgroundPaused ? ui.heroBackground.play : ui.heroBackground.pause}
            </span>
          </Button>
        )}

        <Container className="grid items-center gap-10 pt-24 pb-16 sm:pt-28 lg:min-h-[min(100svh,56rem)] lg:grid-cols-12 lg:gap-8 lg:pt-32 lg:pb-22">
          <div className="flex flex-col gap-8 lg:col-span-5">
            {/* Display size (max ~76px): the headline is the page's thesis. */}
            <h1
              id={titleId}
              className="text-[clamp(2.5rem,6.5vw,4.75rem)] text-brand-primary-foreground"
            >
              <span className="sr-only">{content.headline}</span>
              <BlurText text={content.headline} delay={90} />
            </h1>

            <p className="max-w-xl text-lg text-pretty text-brand-primary-foreground/80 sm:text-xl">
              {content.lead}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg" className="h-12 px-6 text-base">
                <AppLink href={navHref(content.primaryCta)}>{content.primaryCta.label}</AppLink>
              </Button>
              <Button asChild variant="outline-inverse" size="lg" className="h-12 px-6 text-base">
                <AppLink href={navHref(content.secondaryCta)}>{content.secondaryCta.label}</AppLink>
              </Button>
            </div>

            <p className="flex items-center gap-2.5 text-sm text-brand-primary-foreground/75">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-brand-accent" />
              {content.trustLine}
            </p>
          </div>

          <div className="lg:col-span-7">
            <HeroVisual />
          </div>
        </Container>
      </section>

      <HeroServicesStrip />
    </>
  )
}

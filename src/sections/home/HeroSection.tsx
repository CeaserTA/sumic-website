import { useId } from 'react'

import { BlurText } from '@/components/effects/BlurText'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import type { HomeHero } from '@/content/home'
import { navHref } from '@/lib/nav'
import { HeroBackground } from '@/sections/home/HeroBackground'
import { HeroVisual } from '@/sections/home/HeroVisual'

interface HeroSectionProps {
  content: HomeHero
}

export function HeroSection({ content }: HeroSectionProps) {
  const titleId = useId()

  return (
    <section
      id="hero"
      tabIndex={-1}
      aria-labelledby={titleId}
      className="relative isolate overflow-hidden text-brand-primary-foreground outline-none [--ring:var(--brand-accent)]"
    >
      <HeroBackground />

      <Container className="grid items-center gap-16 pt-28 pb-20 sm:pt-32 lg:min-h-[min(100svh,60rem)] lg:grid-cols-12 lg:gap-10 lg:pt-36 lg:pb-28">
        <div className="flex flex-col gap-8 lg:col-span-7">
          {/* Condensed width axis at display size: the headline is the page's thesis. */}
          <h1
            id={titleId}
            className="text-[clamp(3rem,8.5vw,6.5rem)] leading-[0.92] font-bold tracking-[-0.015em] text-brand-primary-foreground font-stretch-condensed"
          >
            <span className="sr-only">{content.headline}</span>
            <BlurText text={content.headline} delay={90} stepDuration={0.3} />
          </h1>

          <p className="max-w-xl text-lg text-pretty text-brand-primary-foreground/80 sm:text-xl">
            {content.lead}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg" className="h-12 px-6 text-base">
              <a href={navHref(content.primaryCta)}>{content.primaryCta.label}</a>
            </Button>
            <Button asChild variant="outline-inverse" size="lg" className="h-12 px-6 text-base">
              <a href={navHref(content.secondaryCta)}>{content.secondaryCta.label}</a>
            </Button>
          </div>

          <p className="flex items-center gap-2.5 text-sm text-brand-primary-foreground/75">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-brand-accent" />
            {content.trustLine}
          </p>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}

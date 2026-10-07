import { TargetIcon, TelescopeIcon } from 'lucide-react'

import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import type { HomeAbout } from '@/content/home'
import type { Product } from '@/content/site'
import { cn } from '@/lib/utils'

// Product prop kept so the call-site in HomePage doesn't need to change.
interface AboutSectionProps {
  content: HomeAbout
  products: readonly Product[]
}

/**
 * Two-column layout (lg+):
 *   LEFT  — eyebrow, h2, paragraphs, accent divider
 *   RIGHT — vision + mission cards pushed toward the bottom with mt-auto
 *
 * Background: team photo behind the whole section with a white/82 overlay.
 * Cards have reduced padding (p-4) and sit lower in the column so the
 * background photo is visible in the upper-right area.
 */
export function AboutSection({ content }: AboutSectionProps) {
  return (
    <Section id="about" className="relative overflow-hidden">

      {/* Background image layer */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src="/images/services/who_we_are.jpeg"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/82" />
      </div>

      {/* items-stretch so the right col is as tall as the left, giving mt-auto room to work */}
      <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">

        {/* ── LEFT: eyebrow + h2 + paragraphs + divider ── */}
        <div className="flex flex-col gap-6">
          <Reveal index={0}>
            <p className="font-medium text-brand-accent-ink">{content.eyebrow}</p>
          </Reveal>

          <Reveal index={1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl">{content.title}</h2>
          </Reveal>

          <div className="flex flex-col gap-5">
            {content.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} index={index + 2}>
                <p
                  className={cn(
                    'max-w-prose text-pretty',
                    index === 0
                      ? 'text-xl font-medium text-brand-heading'
                      : 'text-base text-brand-text',
                  )}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal index={content.paragraphs.length + 2}>
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-brand-line" />
              <span className="size-1.5 shrink-0 rounded-full bg-brand-accent" />
              <span className="h-px flex-1 bg-brand-line" />
            </div>
          </Reveal>
        </div>

        {/* ── RIGHT: cards pushed to the bottom so the photo shows above them ── */}
        <Reveal index={1} className="flex flex-col">
          {/* Spacer pushes cards to the bottom of the column */}
          <div className="flex-1" />

          <div className="flex flex-col gap-3">
            {[
              { statement: content.vision, icon: TelescopeIcon },
              { statement: content.mission, icon: TargetIcon },
            ].map(({ statement, icon: Icon }) => (
              <div
                key={statement.title}
                className="flex flex-col gap-3 rounded-2xl border border-brand-line bg-brand-surface p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent text-brand-accent-foreground">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-accent-ink">
                    {statement.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-pretty text-brand-heading">
                  {statement.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </Section>
  )
}

import { Section } from '@/components/layout/Section'
import type { HomeProof } from '@/content/home'
import type { Partner } from '@/content/partners'
import type { Testimonial } from '@/content/testimonials'
import { PartnersMarquee } from '@/sections/home/PartnersMarquee'
import { ProcessTimeline } from '@/sections/home/ProcessTimeline'
import { StatsRow } from '@/sections/home/StatsRow'
import { Testimonials } from '@/sections/home/Testimonials'

interface ProofSectionProps {
  content: HomeProof
  partners: readonly Partner[]
  testimonials: readonly Testimonial[]
}

/**
 * "Why Sumic" section.
 * The heading and eyebrow are now owned by StatsRow as a large display
 * headline, so Section renders with no title prop (no duplicate heading).
 */
export function ProofSection({ content, partners, testimonials }: ProofSectionProps) {
  return (
    <Section id="proof" tone="muted">
      <div className="flex flex-col gap-16 lg:gap-20">

        <StatsRow
          eyebrow={content.eyebrow}
          title={content.title}
          stats={content.stats}
        />

        <ProcessTimeline
          title={content.process.title}
          intro={content.process.intro}
          steps={content.process.steps}
        />

        <PartnersMarquee title={content.partnersTitle} partners={partners} />

        <Testimonials title={content.testimonialsTitle} testimonials={testimonials} />

      </div>
    </Section>
  )
}

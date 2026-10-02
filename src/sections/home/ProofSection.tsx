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

/** Stats, process, partners and (once supplied) testimonials. Empty blocks render nothing. */
export function ProofSection({ content, partners, testimonials }: ProofSectionProps) {
  return (
    <Section id="proof" eyebrow={content.eyebrow} title={content.title}>
      <div className="mt-10 flex flex-col gap-16 lg:mt-12 lg:gap-20">
        <StatsRow stats={content.stats} />
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

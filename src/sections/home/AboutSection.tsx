import { TargetIcon, TelescopeIcon } from 'lucide-react'

import { StatementCard } from '@/components/blocks/StatementCard'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import type { HomeAbout } from '@/content/home'
import type { Product } from '@/content/site'
import { cn } from '@/lib/utils'
import { EcosystemPanel } from '@/sections/home/EcosystemPanel'

interface AboutSectionProps {
  content: HomeAbout
  products: readonly Product[]
}

export function AboutSection({ content, products }: AboutSectionProps) {
  return (
    <Section id="about" eyebrow={content.eyebrow} title={content.title}>
      <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-6">
          {content.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph} index={index}>
              <p
                className={cn(
                  'max-w-prose text-pretty',
                  index === 0 ? 'text-xl text-brand-heading' : 'text-lg',
                )}
              >
                {paragraph}
              </p>
            </Reveal>
          ))}

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Reveal index={content.paragraphs.length}>
              <StatementCard statement={content.vision} icon={TelescopeIcon} />
            </Reveal>
            <Reveal index={content.paragraphs.length + 1}>
              <StatementCard statement={content.mission} icon={TargetIcon} />
            </Reveal>
          </div>
        </div>

        <Reveal index={1} className="lg:col-span-6">
          <EcosystemPanel
            title={content.ecosystem.title}
            caption={content.ecosystem.caption}
            products={products}
          />
        </Reveal>
      </div>
    </Section>
  )
}

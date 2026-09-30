import { TargetIcon, TelescopeIcon, type LucideIcon } from 'lucide-react'

import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { HomeAbout, Statement } from '@/content/home'
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
      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
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

function StatementCard({ statement, icon: Icon }: { statement: Statement; icon: LucideIcon }) {
  return (
    <Card className="h-full">
      <CardHeader className="gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-brand-accent text-brand-accent-foreground">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <CardTitle>
          <h3 className="text-lg font-semibold">{statement.title}</h3>
        </CardTitle>
        <CardDescription className="text-base text-brand-text">{statement.text}</CardDescription>
      </CardHeader>
    </Card>
  )
}

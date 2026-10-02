import { useId } from 'react'
import { MailIcon, PhoneIcon } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import type { HomeCta } from '@/content/home'

/**
 * Closing call to action on a brand-green band (navy text, 8.5:1), with a short FAQ whose
 * answers all come from the live site.
 */
export function CtaSection({ content }: { content: HomeCta }) {
  const titleId = useId()
  const faqId = useId()

  return (
    <section
      id="cta"
      tabIndex={-1}
      aria-labelledby={titleId}
      className="bg-brand-accent py-16 text-brand-accent-foreground defer-render outline-none sm:py-20 lg:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="flex flex-col gap-6 lg:col-span-7">
          <h2
            id={titleId}
            className="text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-bold tracking-[-0.01em] text-brand-accent-foreground font-stretch-condensed"
          >
            {content.title}
          </h2>
          <p className="max-w-xl text-lg text-pretty sm:text-xl">{content.text}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <a href={content.primary.href}>
                <MailIcon data-icon="inline-start" aria-hidden="true" />
                {content.primary.label}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 text-base">
              <a href={content.secondary.href}>
                <PhoneIcon data-icon="inline-start" aria-hidden="true" />
                {content.secondary.label}
              </a>
            </Button>
          </div>
        </Reveal>

        {content.faq.length > 0 && (
          <Reveal index={1} className="lg:col-span-5">
            <div className="rounded-2xl bg-brand-surface p-6 text-brand-text shadow-xl shadow-brand-primary/15 sm:p-8">
              <h3 id={faqId} className="mb-2 text-xl font-bold">
                {content.faqTitle}
              </h3>
              <Accordion type="single" collapsible aria-labelledby={faqId}>
                {content.faq.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger className="py-4 text-base text-brand-heading">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-pretty">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  )
}

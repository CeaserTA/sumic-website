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
 * Closing call to action on a navy band (green only for the primary button and accents), with
 * a short FAQ whose answers all come from the live site.
 */
export function CtaSection({ content }: { content: HomeCta }) {
  const titleId = useId()
  const faqId = useId()

  return (
    <section
      id="cta"
      tabIndex={-1}
      aria-labelledby={titleId}
      // Navy band (navy → dark navy); green only for the primary button, accent line and focus.
      className="bg-linear-to-b from-brand-primary to-[color-mix(in_oklab,var(--brand-primary),var(--brand-heading)_55%)] py-12 text-brand-primary-foreground defer-render outline-none [--ring:var(--brand-accent)] sm:py-16 lg:py-22"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="flex flex-col gap-6 lg:col-span-7">
          <span aria-hidden="true" className="h-1 w-12 rounded-full bg-brand-accent" />
          <h2 id={titleId} className="text-[clamp(2rem,5vw,3.5rem)] text-brand-primary-foreground">
            {content.title}
          </h2>
          <p className="max-w-xl text-lg text-pretty text-brand-primary-foreground/80 sm:text-xl">
            {content.text}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg" className="h-12 px-6 text-base">
              <a href={content.primary.href}>
                <MailIcon data-icon="inline-start" aria-hidden="true" />
                {content.primary.label}
              </a>
            </Button>
            <Button asChild variant="outline-inverse" size="lg" className="h-12 px-6 text-base">
              <a href={content.secondary.href}>
                <PhoneIcon data-icon="inline-start" aria-hidden="true" />
                {content.secondary.label}
              </a>
            </Button>
          </div>
        </Reveal>

        {content.faq.length > 0 && (
          <Reveal index={1} className="lg:col-span-5">
            <div className="rounded-2xl bg-brand-surface p-6 text-brand-text shadow-xl shadow-brand-heading/40 [--ring:var(--brand-primary)] sm:p-8">
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

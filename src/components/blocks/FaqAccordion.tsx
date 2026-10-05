import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FaqItem } from '@/content/home'

/** Question/answer accordion (home CTA card, Contact page). Renders nothing for an empty list. */
export function FaqAccordion({
  items,
  labelledBy,
}: {
  items: readonly FaqItem[]
  /** Id of the heading that names the list. */
  labelledBy?: string
}) {
  if (items.length === 0) return null

  return (
    <Accordion type="single" collapsible aria-labelledby={labelledBy}>
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger className="py-4 text-base text-brand-heading">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-base text-pretty">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

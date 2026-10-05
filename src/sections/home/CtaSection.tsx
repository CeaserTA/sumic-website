import { useId } from 'react'

import { CtaBand } from '@/components/blocks/CtaBand'
import { FaqAccordion } from '@/components/blocks/FaqAccordion'
import type { FaqItem, HomeCta } from '@/content/home'

/** Home closing CTA: the shared CtaBand with a FAQ card beside it (answers from the live site). */
export function CtaSection({ content }: { content: HomeCta }) {
  return (
    <CtaBand
      id="cta"
      title={content.title}
      text={content.text}
      primary={content.primary}
      secondary={content.secondary}
      aside={
        content.faq.length > 0 ? <FaqCard title={content.faqTitle} items={content.faq} /> : null
      }
    />
  )
}

function FaqCard({ title, items }: { title: string; items: readonly FaqItem[] }) {
  const titleId = useId()
  return (
    // White card on the navy band, so it restores the navy focus ring.
    <div className="rounded-2xl bg-brand-surface p-6 text-brand-text shadow-xl shadow-brand-heading/40 [--ring:var(--brand-primary)] sm:p-8">
      <h3 id={titleId} className="mb-2 text-xl">
        {title}
      </h3>
      <FaqAccordion items={items} labelledBy={titleId} />
    </div>
  )
}

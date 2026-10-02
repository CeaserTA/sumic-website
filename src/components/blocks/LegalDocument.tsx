import { Fragment } from 'react'

import { Prose } from '@/components/blocks/Prose'
import { AppLink } from '@/components/layout/AppLink'
import type {
  LegalBlock,
  LegalDocument as LegalDocumentData,
  LegalInline,
} from '@/content/legal/types'
import { ui } from '@/content/ui'
import { isInternalRoute } from '@/lib/nav'

function Inline({ parts }: { parts: readonly LegalInline[] }) {
  return parts.map((part, index) => {
    if (typeof part === 'string') return <Fragment key={index}>{part}</Fragment>
    if ('strong' in part) return <strong key={index}>{part.strong}</strong>
    if ('em' in part) return <em key={index}>{part.em}</em>
    const external = !isInternalRoute(part.href) && !part.href.startsWith('#')
    return external ? (
      <a
        key={index}
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        className="wrap-anywhere"
      >
        {part.link}
        <span className="sr-only"> {ui.nav.opensInNewTab}</span>
      </a>
    ) : (
      <AppLink key={index} href={part.href} className="wrap-anywhere">
        {part.link}
      </AppLink>
    )
  })
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 id={block.id}>
          <Inline parts={block.content} />
        </h2>
      )
    case 'h3':
      return (
        <h3>
          <Inline parts={block.content} />
        </h3>
      )
    case 'lead':
      return (
        <p className="text-xl font-medium text-brand-heading">
          <Inline parts={block.content} />
        </p>
      )
    case 'p':
      return (
        <p>
          <Inline parts={block.content} />
        </p>
      )
    case 'ul':
    case 'ol': {
      const List = block.type
      return (
        <List>
          {block.items.map((item, index) => (
            <li key={index}>
              <Inline parts={item} />
            </li>
          ))}
        </List>
      )
    }
  }
}

/** Renders a legal document (verbatim text from src/content/legal) with long-form typography. */
export function LegalDocument({ document }: { document: LegalDocumentData }) {
  return (
    // ~70 characters per line at text-lg in Satoshi (measured; `ch` overshoots in this font).
    <Prose className="max-w-[40rem]">
      {document.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </Prose>
  )
}

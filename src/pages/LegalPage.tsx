import { useMemo } from 'react'

import { CtaBand } from '@/components/blocks/CtaBand'
import { LegalDocument } from '@/components/blocks/LegalDocument'
import { PageHero } from '@/components/blocks/PageHero'
import { TableOfContents } from '@/components/blocks/TableOfContents'
import { Container } from '@/components/layout/Container'
import { homeCta } from '@/content/home'
import type { LegalDocument as LegalDocumentData, LegalInline } from '@/content/legal/types'
import { pageById, type PageId } from '@/content/pages'

export type LegalPageId = Extract<PageId, 'privacy-policy' | 'cookies-policy' | 'terms-of-use'>

const plain = (parts: readonly LegalInline[]) =>
  parts
    .map((part) =>
      typeof part === 'string'
        ? part
        : 'strong' in part
          ? part.strong
          : 'em' in part
            ? part.em
            : part.link,
    )
    .join('')

/**
 * Privacy, cookies and terms: verbatim legal text with a table of contents (sticky on desktop)
 * and a readable measure (~70 characters per line).
 */
export function LegalPage({
  pageId,
  document,
}: {
  pageId: LegalPageId
  /** Loaded per route (see routes/pageModules.ts), so each page ships only its own text. */
  document: LegalDocumentData
}) {
  const page = pageById(pageId)
  const home = pageById('home')
  const toc = useMemo(
    () =>
      document.blocks.flatMap((block) =>
        block.type === 'h2' ? [{ id: block.id, label: plain(block.content) }] : [],
      ),
    [document],
  )

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={document.lastUpdated}
        breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: page.breadcrumb }]}
      />
      <section className="py-12 sm:py-16 lg:py-22">
        <Container className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <aside>
            <TableOfContents items={toc} />
          </aside>
          <LegalDocument document={document} />
        </Container>
      </section>
      <CtaBand
        title={homeCta.title}
        text={homeCta.text}
        primary={homeCta.primary}
        secondary={homeCta.secondary}
      />
    </>
  )
}

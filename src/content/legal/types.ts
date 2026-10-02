/** Inline text: plain, bold, italic or a link. */
export type LegalInline =
  string | { strong: string } | { em: string } | { link: string; href: string }

export type LegalBlock =
  | { type: 'h2'; id: string; content: LegalInline[] }
  | { type: 'h3' | 'p' | 'lead'; content: LegalInline[] }
  | { type: 'ul' | 'ol'; items: LegalInline[][] }

export interface LegalDocument {
  /** Verbatim "Last updated: …" line from the live page. */
  lastUpdated: string
  blocks: LegalBlock[]
}

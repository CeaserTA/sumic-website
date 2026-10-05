import { useId } from 'react'

import type { CaseStudy } from '@/content/partnerships'

/**
 * A partnership project: image, partner, title, text and optional highlights. Content only from
 * the live site (no invented outcomes). The title is an h3, so place cards under a section h2.
 */
export function CaseStudyCard({
  study,
  imageLoading = 'lazy',
}: {
  study: CaseStudy
  /** 'eager' for cards in the first viewport (the first image is often the LCP element). */
  imageLoading?: 'eager' | 'lazy'
}) {
  const titleId = useId()

  return (
    <article
      aria-labelledby={titleId}
      className="flex h-full flex-col overflow-hidden rounded-3xl bg-brand-surface ring-1 ring-brand-line"
    >
      <img
        src={study.image.src}
        srcSet={study.image.srcSet}
        sizes="(min-width: 1280px) 600px, (min-width: 768px) 46vw, 92vw"
        width={study.image.width}
        height={study.image.height}
        alt={study.image.alt}
        loading={imageLoading}
        fetchPriority={imageLoading === 'eager' ? 'high' : undefined}
        decoding="async"
        className="aspect-[3/2] w-full border-b border-brand-line object-cover"
      />
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium">
          <span className="text-brand-accent-ink">{study.partner}</span>
          {study.label && (
            <span className="rounded-full bg-brand-surface-muted px-2.5 py-0.5 text-brand-heading ring-1 ring-brand-line">
              {study.label}
            </span>
          )}
        </p>
        <h3 id={titleId} className="text-2xl text-pretty">
          {study.title}
        </h3>
        {study.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-pretty">
            {paragraph}
          </p>
        ))}
        {study.highlights && study.highlights.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-2">
            {study.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-full bg-brand-accent-ink/10 px-3 py-1 text-sm text-brand-heading"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

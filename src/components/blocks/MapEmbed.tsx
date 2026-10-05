import { ArrowUpRightIcon } from 'lucide-react'

import { ui } from '@/content/ui'

interface MapEmbedProps {
  /** Google Maps embed URL. */
  embedUrl: string
  /** Regular Google Maps link (opens in a new tab). */
  mapUrl: string
  iframeTitle: string
  openLabel: string
}

/**
 * Google map, always shown. The iframe is lazy-loaded, so Google is only contacted when the
 * visitor scrolls near it, and it never delays the page's first paint.
 */
export function MapEmbed({ embedUrl, mapUrl, iframeTitle, openLabel }: MapEmbedProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-surface-muted ring-1 ring-brand-line sm:aspect-[16/9] lg:aspect-[21/9]">
        <iframe
          src={embedUrl}
          title={iframeTitle}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      </div>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 w-fit items-center gap-1.5 self-end rounded-sm font-medium text-brand-primary underline underline-offset-4 transition-colors hover:text-brand-accent-ink"
      >
        {openLabel}
        <ArrowUpRightIcon aria-hidden="true" className="size-4" />
        <span className="sr-only"> {ui.nav.opensInNewTab}</span>
      </a>
    </div>
  )
}

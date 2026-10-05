import { useState } from 'react'
import { ArrowUpRightIcon, MapIcon, MapPinIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ui } from '@/content/ui'

interface MapFacadeProps {
  /** Google Maps embed URL; requested only after "Show map" is pressed. */
  embedUrl: string
  /** Regular Google Maps link (opens in a new tab). */
  mapUrl: string
  iframeTitle: string
  address: string
  note: string
  showLabel: string
  openLabel: string
}

/**
 * Click-to-load map. Until the visitor asks for it, this is a static, code-drawn preview: no
 * request reaches Google (privacy and performance). "Show map" swaps in the embed and moves
 * focus to it. The "Open in Google Maps" link works either way.
 */
export function MapFacade({
  embedUrl,
  mapUrl,
  iframeTitle,
  address,
  note,
  showLabel,
  openLabel,
}: MapFacadeProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-surface-muted ring-1 ring-brand-line max-sm:aspect-square sm:aspect-[16/9] lg:aspect-[21/9]">
        {loaded ? (
          <iframe
            // Mounted only after the button press: move focus here so it isn't lost.
            ref={(frame) => frame?.focus()}
            src={embedUrl}
            title={iframeTitle}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <>
            <MapSketch />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-brand-primary text-brand-accent shadow-lg shadow-brand-primary/25">
                <MapPinIcon aria-hidden="true" className="size-7" />
              </span>
              <address className="max-w-sm rounded-xl bg-brand-surface/90 px-4 py-2 font-medium text-pretty text-brand-heading not-italic">
                {address}
              </address>
              <Button size="lg" className="h-11 px-5" onClick={() => setLoaded(true)}>
                <MapIcon data-icon="inline-start" aria-hidden="true" />
                {showLabel}
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {!loaded && <p className="text-sm">{note}</p>}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-fit items-center gap-1.5 rounded-sm font-medium text-brand-primary underline underline-offset-4 transition-colors hover:text-brand-accent-ink sm:ml-auto"
        >
          {openLabel}
          <ArrowUpRightIcon aria-hidden="true" className="size-4" />
          <span className="sr-only"> {ui.nav.opensInNewTab}</span>
        </a>
      </div>
    </div>
  )
}

/** Decorative street-map impression drawn with brand tokens (no tiles, no requests). */
function MapSketch() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className="absolute inset-0 size-full"
    >
      <g className="text-brand-line" stroke="currentColor">
        {Array.from({ length: 12 }, (_, index) => (
          <path key={`v${index}`} d={`M${index * 70} 0V450`} strokeWidth="1" />
        ))}
        {Array.from({ length: 7 }, (_, index) => (
          <path key={`h${index}`} d={`M0 ${index * 70}H800`} strokeWidth="1" />
        ))}
      </g>
      <g className="text-brand-surface" stroke="currentColor" strokeLinecap="round">
        <path d="M-20 300 C 180 260, 320 330, 520 250 S 760 190, 830 210" strokeWidth="22" />
        <path d="M250 -20 C 280 120, 360 200, 380 470" strokeWidth="14" />
        <path d="M560 -20 C 540 140, 620 300, 600 470" strokeWidth="10" />
      </g>
      <g
        className="text-brand-accent-ink"
        stroke="currentColor"
        strokeLinecap="round"
        opacity="0.35"
      >
        <path d="M-20 300 C 180 260, 320 330, 520 250 S 760 190, 830 210" strokeWidth="3" />
      </g>
    </svg>
  )
}

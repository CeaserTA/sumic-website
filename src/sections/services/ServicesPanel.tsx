import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
} from 'react'
import { ArrowRightIcon, CheckIcon, ChevronDownIcon, type LucideIcon } from 'lucide-react'

import { AppLink } from '@/components/layout/AppLink'
import { Button } from '@/components/ui/button'
import type { ServiceDetail } from '@/content/services-page'
import type { Service } from '@/content/services'
import { useReducedMotionPreference } from '@/hooks/useHeavyEffects'
import { cn } from '@/lib/utils'

export const PANEL_ID = 'services-panel'

interface ServiceItem {
  service: Service
  detail: ServiceDetail
  icon: LucideIcon
}

interface ServicesPanelProps {
  items: ServiceItem[]
  includedTitle: string
  activeAnchor: string
  onSelect: (anchor: string) => void
}

const ORDINALS = ['01', '02', '03', '04', '05', '06']

export function ServicesPanel({
  items,
  includedTitle,
  activeAnchor,
  onSelect,
}: ServicesPanelProps) {
  const reduceMotion = useReducedMotionPreference()
  const panelId = useId()

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.service.anchor === activeAnchor),
  )

  function handleKeyDown(e: KeyboardEvent<HTMLUListElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      onSelect(items[(activeIndex + 1) % items.length].service.anchor)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      onSelect(items[(activeIndex - 1 + items.length) % items.length].service.anchor)
    } else if (e.key === 'Home') {
      e.preventDefault()
      onSelect(items[0].service.anchor)
    } else if (e.key === 'End') {
      e.preventDefault()
      onSelect(items[items.length - 1].service.anchor)
    }
  }

  return (
    <section
      id={PANEL_ID}
      aria-label="Our services"
      className="scroll-mt-28 outline-none"
      tabIndex={-1}
    >
      {/* ══ DESKTOP (lg+) ═══════════════════════════════════════════════════
          items-stretch: all three columns share the same height.
          Nav rows each get flex-1 so they fill the column evenly.
          Image fills its column height via absolute inset-0.
      ════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1.2fr)] lg:items-stretch lg:gap-10">

        {/* LEFT: nav list — rows fill the full column height evenly */}
        <ul
          role="tablist"
          aria-orientation="vertical"
          aria-label="Services"
          onKeyDown={handleKeyDown}
          className="flex flex-col"
        >
          {items.map((item, i) => {
            const Icon = item.icon
            const isCurrent = item.service.anchor === activeAnchor
            const tabId = `${panelId}-tab-${item.service.anchor}`
            const tabPanelId = `${panelId}-panel`
            return (
              <li
                key={item.service.anchor}
                role="presentation"
                className={cn(
                  'flex flex-1',
                  i < items.length - 1 && 'border-b border-brand-line',
                )}
              >
                <button
                  id={tabId}
                  role="tab"
                  aria-selected={isCurrent}
                  aria-controls={tabPanelId}
                  tabIndex={isCurrent ? 0 : -1}
                  onClick={() => onSelect(item.service.anchor)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent',
                    isCurrent
                      ? 'bg-brand-accent/12 font-semibold text-brand-primary'
                      : 'text-brand-text hover:bg-brand-accent/8 hover:text-brand-heading',
                  )}
                >
                  <span className="w-5 shrink-0 font-mono text-[10px] text-brand-text/35">
                    {ORDINALS[i]}
                  </span>
                  <span
                    className={cn(
                      'flex size-6 shrink-0 items-center justify-center rounded-md transition-colors',
                      isCurrent
                        ? 'bg-brand-accent text-brand-accent-foreground'
                        : 'bg-brand-accent/15 text-brand-accent-ink',
                    )}
                  >
                    <Icon aria-hidden="true" className="size-3" />
                  </span>
                  <span className="flex-1 leading-snug">
                    {item.service.shortTitle ?? item.service.title}
                  </span>
                  {isCurrent && (
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-brand-accent-ink"
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* CENTRE: image fills column height via absolute positioning */}
        <div
          id={`${panelId}-panel`}
          role="tabpanel"
          aria-labelledby={`${panelId}-tab-${items[activeIndex].service.anchor}`}
          className="relative overflow-hidden rounded-2xl"
        >
          {items.map((item) => {
            const isCurrent = item.service.anchor === activeAnchor
            return (
              <img
                key={item.service.anchor}
                src={item.detail.image.src}
                srcSet={item.detail.image.srcSet}
                sizes="(min-width: 1024px) 33vw"
                width={item.detail.image.width}
                height={item.detail.image.height}
                alt=""
                loading="lazy"
                decoding="async"
                className={cn(
                  'absolute inset-0 h-full w-full object-cover object-center',
                  reduceMotion
                    ? isCurrent ? 'opacity-100' : 'opacity-0'
                    : cn('transition-opacity duration-300', isCurrent ? 'opacity-100' : 'opacity-0'),
                )}
              />
            )
          })}
        </div>

        {/* RIGHT: description — all rendered, inactive hidden, fades on switch */}
        <div className="relative min-h-0">
          {items.map((item) => {
            const isCurrent = item.service.anchor === activeAnchor
            return (
              <div
                key={item.service.anchor}
                aria-hidden={!isCurrent}
                className={cn(
                  isCurrent ? 'block' : 'pointer-events-none absolute inset-0',
                  reduceMotion
                    ? isCurrent ? '' : 'opacity-0'
                    : cn('transition-opacity duration-300', isCurrent ? 'opacity-100' : 'opacity-0'),
                )}
              >
                <ServiceContent item={item} includedTitle={includedTitle} />
              </div>
            )
          })}
        </div>

      </div>

      {/* ══ MOBILE (<lg): accordion ════════════════════════════════════════ */}
      <div className="flex flex-col divide-y divide-brand-line overflow-hidden rounded-2xl border border-brand-line lg:hidden">
        {items.map((item, i) => (
          <AccordionItem
            key={item.service.anchor}
            item={item}
            index={i}
            isOpen={item.service.anchor === activeAnchor}
            includedTitle={includedTitle}
            onToggle={() =>
              onSelect(
                item.service.anchor === activeAnchor
                  ? items[0].service.anchor
                  : item.service.anchor,
              )
            }
          />
        ))}
      </div>
    </section>
  )
}

/* ─── ServiceContent ───────────────────────────────────────────────────── */

function ServiceContent({
  item,
  includedTitle,
}: {
  item: ServiceItem
  includedTitle: string
}) {
  const Icon = item.icon
  return (
    <div className="flex flex-col">
      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-accent text-brand-accent-foreground">
        <Icon aria-hidden="true" className="size-5" />
      </span>

      <h3 className="mt-5 text-xl font-semibold leading-snug text-brand-heading sm:text-2xl">
        {item.service.id === 'ites-bpo' ? (
          <>
            ITES &amp; BPO{' '}
            <span className="text-base font-normal text-brand-text">
              (IT Enabled Services &amp; Business Process Outsourcing)
            </span>
          </>
        ) : (
          item.service.title
        )}
      </h3>

      {item.detail.paragraphs.map((p, i) => (
        <p
          key={i}
          className={cn(
            'text-pretty',
            i === 0
              ? 'mt-4 text-base font-medium text-brand-heading'
              : 'mt-2.5 text-sm leading-relaxed text-brand-text',
          )}
        >
          {p}
        </p>
      ))}

      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-text/50">
        {includedTitle}
      </p>
      <ul className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2">
        {item.detail.included.map((inc) => (
          <li key={inc} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-accent text-brand-accent-foreground"
            >
              <CheckIcon className="size-2.5" strokeWidth={3} />
            </span>
            <span className="text-sm text-brand-text">{inc}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button asChild variant="accent" size="default" className="h-10 px-5 text-sm">
          <AppLink href="/contact/">Request this service</AppLink>
        </Button>
      </div>
    </div>
  )
}

/* ─── AccordionItem ────────────────────────────────────────────────────── */

function AccordionItem({
  item,
  index,
  isOpen,
  includedTitle,
  onToggle,
}: {
  item: ServiceItem
  index: number
  isOpen: boolean
  includedTitle: string
  onToggle: () => void
}) {
  const Icon = item.icon
  const headingId = `accordion-heading-${item.service.anchor}`
  const regionId = `accordion-panel-${item.service.anchor}`
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect()
      if (rect.top < 80 || rect.top > window.innerHeight * 0.8) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [isOpen])

  return (
    <div ref={ref} className="bg-brand-surface">
      <button
        id={headingId}
        aria-expanded={isOpen}
        aria-controls={regionId}
        onClick={onToggle}
        className={cn(
          'flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent',
          isOpen
            ? 'bg-brand-accent/8 font-semibold text-brand-primary'
            : 'text-brand-text hover:bg-brand-accent/5',
        )}
      >
        <span className="w-6 shrink-0 font-mono text-[10px] text-brand-text/35">
          {ORDINALS[index]}
        </span>
        <span
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors',
            isOpen
              ? 'bg-brand-accent text-brand-accent-foreground'
              : 'bg-brand-accent/15 text-brand-accent-ink',
          )}
        >
          <Icon aria-hidden="true" className="size-3.5" />
        </span>
        <span className="flex-1 leading-snug">
          {item.service.shortTitle ?? item.service.title}
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            'size-4 shrink-0 text-brand-text/40 transition-transform duration-300',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <div
        id={regionId}
        role="region"
        aria-labelledby={headingId}
        className="grid transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-0 px-4 pb-6 pt-3">
            <img
              src={item.detail.image.src}
              srcSet={item.detail.image.srcSet}
              sizes="92vw"
              width={item.detail.image.width}
              height={item.detail.image.height}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-xl"
            />
            <div className="mt-4">
              <ServiceContent item={item} includedTitle={includedTitle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

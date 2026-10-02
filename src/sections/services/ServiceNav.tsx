import { useId, useMemo } from 'react'
import type { LucideIcon } from 'lucide-react'

import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

export interface ServiceNavItem {
  /** Section id on the page. */
  id: string
  label: string
  icon: LucideIcon
}

/**
 * In-page navigation for the Services page: a horizontally scrollable row of chips below lg and
 * a sticky list from lg up that highlights the service being read. Plain #hash links, so the
 * router's ScrollManager scrolls (smoothly, unless reduced motion) and moves focus.
 */
export function ServiceNav({ items, label }: { items: readonly ServiceNavItem[]; label: string }) {
  const titleId = useId()
  const ids = useMemo(() => items.map((item) => item.id), [items])
  const active = useActiveSection(ids)

  return (
    <>
      <nav aria-label={label} className="-mx-4 sm:-mx-6 lg:hidden">
        <ul className="flex snap-x [scrollbar-width:thin] gap-2 overflow-x-auto overscroll-x-contain px-4 pb-2 sm:px-6">
          {items.map((item) => (
            <li key={item.id} className="shrink-0 snap-start">
              <a
                href={`#${item.id}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-surface px-4 text-sm font-medium whitespace-nowrap text-brand-heading ring-1 ring-brand-line transition-colors hover:bg-brand-surface-muted"
              >
                <item.icon aria-hidden="true" className="size-4 text-brand-accent-ink" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <nav
        aria-labelledby={titleId}
        className="sticky top-28 hidden max-h-[calc(100svh-8rem)] overflow-y-auto overscroll-contain lg:block"
      >
        <p id={titleId} className="mb-3 text-sm font-medium text-brand-heading">
          {label}
        </p>
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const current = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={current ? 'location' : undefined}
                  className={cn(
                    'flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm text-brand-text transition-colors hover:bg-brand-surface-muted hover:text-brand-heading',
                    current && 'bg-brand-accent-ink/10 font-medium text-brand-primary',
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={cn(
                      'mt-px size-4 shrink-0',
                      current ? 'text-brand-accent-ink' : 'text-brand-text/70',
                    )}
                  />
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

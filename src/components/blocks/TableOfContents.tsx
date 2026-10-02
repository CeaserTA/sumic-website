import { useEffect, useId, useMemo, useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { ui } from '@/content/ui'
import { cn } from '@/lib/utils'

export interface TocItem {
  id: string
  label: string
}

/** Id of the heading nearest the top of the viewport (a leaf state, so pages stay static). */
function useActiveHeading(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const first = ids.find((id) => visible.has(id))
        if (first) setActive(first)
      },
      { rootMargin: '-15% 0px -70% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}

function TocList({ items, active }: { items: readonly TocItem[]; active: string | null }) {
  return (
    <ol className="flex flex-col gap-0.5 border-l border-brand-line">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? 'location' : undefined}
            className={cn(
              '-ml-px block border-l-2 border-transparent py-1.5 pr-2 pl-4 text-sm text-brand-text transition-colors hover:text-brand-heading',
              active === item.id && 'border-brand-accent-ink font-medium text-brand-primary',
            )}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  )
}

/**
 * "On this page" navigation for long documents: a collapsible list on small screens and a
 * sticky sidebar from lg up. Highlights the section currently being read.
 */
export function TableOfContents({ items }: { items: readonly TocItem[] }) {
  const titleId = useId()
  const ids = useMemo(() => items.map((item) => item.id), [items])
  const active = useActiveHeading(ids)

  return (
    <>
      <details className="group rounded-xl border border-brand-line bg-brand-surface lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 font-medium text-brand-heading">
          {ui.toc.title}
          <ChevronDownIcon
            aria-hidden="true"
            className="size-4 transition-transform group-open:rotate-180"
          />
        </summary>
        <nav aria-label={ui.toc.title} className="px-4 pb-4">
          <TocList items={items} active={active} />
        </nav>
      </details>

      <nav
        aria-labelledby={titleId}
        className="sticky top-28 hidden max-h-[calc(100svh-8rem)] overflow-y-auto overscroll-contain lg:block"
      >
        <p id={titleId} className="mb-3 text-sm font-medium text-brand-heading">
          {ui.toc.title}
        </p>
        <TocList items={items} active={active} />
      </nav>
    </>
  )
}

import type { LucideIcon } from 'lucide-react'

import { useReducedMotionPreference } from '@/hooks/useHeavyEffects'
import { cn } from '@/lib/utils'
import { PANEL_ID } from '@/sections/services/ServicesPanel'

export interface ServiceTabItem {
  id: string
  label: string
  icon: LucideIcon
}

interface ServiceTabBarProps {
  items: readonly ServiceTabItem[]
  label: string
  activeId: string
  onSelect: (id: string) => void
}

/**
 * Overlapping card row under the hero.
 * Active state is controlled by the parent (hash-driven), not by scrollspy.
 * Clicking a card selects the service and scrolls the panel into view.
 */
export function ServiceTabBar({ items, label, activeId, onSelect }: ServiceTabBarProps) {
  const reduceMotion = useReducedMotionPreference()

  function handleClick(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault()
    onSelect(id)
    // Scroll the services panel into view
    const panel = document.getElementById(PANEL_ID)
    if (panel) {
      panel.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' })
    }
  }

  return (
    <nav aria-label={label}>
      {/* Desktop: 6-column grid */}
      <ul className="hidden lg:grid lg:grid-cols-6 lg:gap-4">
        {items.map((item) => (
          <li key={item.id}>
            <ServiceCard
              item={item}
              active={activeId === item.id}
              onClick={handleClick}
            />
          </li>
        ))}
      </ul>

      {/* Mobile/tablet: horizontal scroll */}
      <ul className="flex snap-x gap-3 overflow-x-auto -mx-4 px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
        {items.map((item) => (
          <li key={item.id} className="min-w-[130px] shrink-0 snap-start">
            <ServiceCard
              item={item}
              active={activeId === item.id}
              onClick={handleClick}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ServiceCard({
  item,
  active,
  onClick,
}: {
  item: ServiceTabItem
  active: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void
}) {
  const { id, label, icon: Icon } = item

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={(e) => onClick(e, id)}
      className={cn(
        'flex w-full flex-col items-center gap-2 rounded-2xl bg-brand-surface px-3 py-3 text-center',
        'border shadow-xl transition-all duration-200 hover:-translate-y-1',
        active
          ? 'border-brand-accent ring-2 ring-brand-accent'
          : 'border-brand-line hover:border-brand-accent',
      )}
    >
      <span
        className={cn(
          'flex size-9 items-center justify-center rounded-xl transition-colors',
          active
            ? 'bg-brand-accent text-brand-accent-foreground'
            : 'bg-brand-accent/10 text-brand-accent-ink',
        )}
      >
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <span
        className={cn(
          'text-sm font-medium leading-tight',
          active ? 'text-brand-primary' : 'text-brand-heading',
        )}
      >
        {label}
      </span>
    </button>
  )
}

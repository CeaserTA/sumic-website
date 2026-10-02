import { lazy, Suspense, useRef, useState } from 'react'
import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { NavLink } from '@/content/site'
import { ui } from '@/content/ui'
import { cn } from '@/lib/utils'

const loadSheet = () => import('@/components/layout/MobileNavSheet')
const MobileNavSheet = lazy(() =>
  loadSheet().then((module) => ({ default: module.MobileNavSheet })),
)

interface MobileNavProps {
  links: readonly NavLink[]
  cta: NavLink
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Trigger sits on a dark surface. */
  dark: boolean
}

/**
 * Menu button for screens below lg. The sheet itself (Radix Dialog, Accordion, focus trap,
 * scroll lock) is code-split: it starts loading on hover/focus/touch of the button and renders
 * from the first open on, keeping it out of the startup bundle.
 */
export function MobileNav({ links, cta, open, onOpenChange, dark }: MobileNavProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [requested, setRequested] = useState(false)
  const preload = () => void loadSheet()

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={requested ? 'mobile-nav-sheet' : undefined}
        onPointerEnter={preload}
        onFocus={preload}
        onTouchStart={preload}
        onClick={() => {
          setRequested(true)
          onOpenChange(true)
        }}
        className={cn(
          'size-11 lg:hidden',
          dark && 'text-brand-primary-foreground hover:bg-white/10',
        )}
      >
        <MenuIcon />
        <span className="sr-only">{ui.nav.openMenu}</span>
      </Button>
      {requested && (
        <Suspense fallback={null}>
          <MobileNavSheet
            links={links}
            cta={cta}
            open={open}
            onOpenChange={onOpenChange}
            triggerRef={triggerRef}
          />
        </Suspense>
      )}
    </>
  )
}

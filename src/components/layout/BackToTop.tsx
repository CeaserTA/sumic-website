import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ui } from '@/content/ui'
import { useReducedMotionPreference } from '@/hooks/useHeavyEffects'
import { cn } from '@/lib/utils'

const SHOW_AFTER = 600

/**
 * Floating "back to top" button, bottom-right, shown once the page has scrolled about a screen.
 * Scrolls smoothly (instantly with reduced motion) and moves focus to the top of the main content
 * so keyboard and screen-reader users land at the start of the page. While hidden it is
 * `invisible`, which also removes it from the tab order.
 */
export function BackToTop() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotionPreference()

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > SHOW_AFTER))

  function handleClick() {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      onClick={handleClick}
      className={cn(
        'fixed right-4 bottom-4 z-30 size-11 rounded-full text-brand-primary shadow-lg shadow-brand-primary/15 transition-[opacity,translate,visibility] duration-300 sm:right-6 sm:bottom-6',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0',
      )}
    >
      <ArrowUpIcon />
      <span className="sr-only">{ui.backToTop}</span>
    </Button>
  )
}

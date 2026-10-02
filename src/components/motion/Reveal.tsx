import type { ReactNode } from 'react'
import { m } from 'motion/react'

import { MotionScope } from '@/components/motion/MotionScope'

interface RevealProps {
  children: ReactNode
  /** Position in a group; each step adds a short delay for a staggered entrance. */
  index?: number
  /** Render as a list item when revealing items of a <ul>/<ol>. */
  as?: 'div' | 'li'
  className?: string
}

/**
 * Fades and slightly raises its content the first time it scrolls into view.
 * Under reduced motion, MotionConfig (MotionScope) drops the movement and keeps a plain fade.
 */
export function Reveal({ children, index = 0, as = 'div', className }: RevealProps) {
  const Component = as === 'li' ? m.li : m.div
  return (
    <MotionScope>
      <Component
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        className={className}
      >
        {children}
      </Component>
    </MotionScope>
  )
}

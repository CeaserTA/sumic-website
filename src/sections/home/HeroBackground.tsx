import { lazy, Suspense, useState } from 'react'
import { m } from 'motion/react'

import { cssVarToRgb } from '@/lib/color'

// Own chunk: ogl + shader only download when the effect actually runs.
const Threads = lazy(() =>
  import('@/components/effects/Threads').then((module) => ({ default: module.Threads })),
)

interface HeroBackgroundProps {
  /** Whether the animated layer may run (see useHeavyEffects). */
  enabled: boolean
  /** User pause (WCAG 2.2.2: moving content longer than 5s needs a pause control). */
  paused: boolean
}

/**
 * Hero backdrop: static navy/green gradient first, then (on capable, wide screens without
 * reduced motion) a low-contrast Threads layer, masked away from the headline side.
 */
export function HeroBackground({ enabled, paused }: HeroBackgroundProps) {
  const [color] = useState<[number, number, number]>(
    () => cssVarToRgb('--brand-accent') ?? [1, 1, 1],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-hero-glow" />
      {enabled && (
        <Suspense fallback={null}>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
            className="absolute inset-x-0 top-[18%] bottom-0 [mask-image:linear-gradient(to_right,transparent_35%,black_75%)]"
          >
            <Threads color={color} amplitude={1.2} distance={0.25} paused={paused} />
          </m.div>
        </Suspense>
      )}
    </div>
  )
}

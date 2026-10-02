import { lazy, Suspense, useState } from 'react'

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
          {/* Fades in with CSS (keeps Motion out of the startup bundle); settles at 55% opacity. */}
          <div className="absolute inset-x-0 top-[18%] bottom-0 [mask-image:linear-gradient(to_right,transparent_35%,black_75%)] opacity-55">
            <div className="size-full animate-in delay-300 duration-[1600ms] ease-out fill-mode-both fade-in">
              <Threads color={color} amplitude={1.2} distance={0.25} paused={paused} />
            </div>
          </div>
        </Suspense>
      )}
    </div>
  )
}

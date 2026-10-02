import type { ReactNode } from 'react'
import { LazyMotion, MotionConfig } from 'motion/react'

// Motion's animation engine loads in its own chunk; components inside use `m.*`.
const loadMotionFeatures = () => import('@/lib/motion-features').then((module) => module.default)

/**
 * Motion providers, applied where animation is used (Reveal, ProcessTimeline) instead of around
 * the whole app, so pages without animation (and the home page's critical path) don't load
 * Motion at all. `strict` throws if a full `motion.*` component slips in; every animation follows
 * the user's reduced-motion preference.
 */
export function MotionScope({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

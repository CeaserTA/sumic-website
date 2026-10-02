import { LazyMotion, MotionConfig } from 'motion/react'

import { AppRoutes } from '@/routes/AppRoutes'

// Animation features load in their own chunk after first render; components use `m.*`.
const loadMotionFeatures = () => import('@/lib/motion-features').then((module) => module.default)

/** App shell shared by the client (BrowserRouter, main.tsx) and the prerender (StaticRouter). */
export function App() {
  return (
    // `strict` throws if a full `motion.*` component slips in and re-bloats the bundle.
    <LazyMotion features={loadMotionFeatures} strict>
      {/* Every Motion animation follows the user's reduced-motion preference. */}
      <MotionConfig reducedMotion="user">
        <AppRoutes />
      </MotionConfig>
    </LazyMotion>
  )
}

import { MotionConfig } from 'motion/react'

import { HomePage } from '@/pages/HomePage'

export function App() {
  return (
    // Every Motion animation follows the user's reduced-motion preference.
    <MotionConfig reducedMotion="user">
      <HomePage />
    </MotionConfig>
  )
}

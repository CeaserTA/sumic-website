import { useReducedMotion } from 'motion/react'

import { useMediaQuery } from '@/hooks/useMediaQuery'

// Not in the TS DOM lib yet; both are optional and Chromium-only.
interface NavigatorHints {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return true
  const hints = navigator as Navigator & NavigatorHints
  return (
    hints.connection?.saveData === true ||
    (hints.deviceMemory !== undefined && hints.deviceMemory <= 2) ||
    navigator.hardwareConcurrency <= 2
  )
}

/**
 * Whether heavy visual effects (WebGL/canvas backgrounds) should run.
 * Off for reduced motion, narrow screens (< 768px), data saver and low-end devices.
 */
export function useHeavyEffects(): boolean {
  const reduceMotion = useReducedMotion()
  const wide = useMediaQuery('(min-width: 768px)')
  return !reduceMotion && wide && !isLowEndDevice()
}

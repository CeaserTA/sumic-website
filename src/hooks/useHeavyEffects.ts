import { useSyncExternalStore } from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'

// Not in the TS DOM lib yet; both are optional and Chromium-only.
interface NavigatorHints {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

function isLowEndDevice(): boolean {
  const hints = navigator as Navigator & NavigatorHints
  return (
    hints.connection?.saveData === true ||
    (hints.deviceMemory !== undefined && hints.deviceMemory <= 2) ||
    navigator.hardwareConcurrency <= 2
  )
}

const noSubscribe = () => () => {}

/**
 * Whether heavy visual effects (WebGL/canvas backgrounds) should run.
 * Off for reduced motion, narrow screens (< 768px), data saver and low-end devices.
 * Prerender and hydration assume "off"; the client re-checks right after hydrating.
 */
export function useHeavyEffects(): boolean {
  const reduceMotion = useReducedMotionPreference()
  const wide = useMediaQuery('(min-width: 768px)')
  const lowEnd = useSyncExternalStore(noSubscribe, isLowEndDevice, () => true)
  return !reduceMotion && wide && !lowEnd
}

/** prefers-reduced-motion as a hydration-safe boolean (false during prerender/hydration). */
export function useReducedMotionPreference(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

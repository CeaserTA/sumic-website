// React Bits "CountUp" (https://reactbits.dev), adapted:
// - named export, strict-safe decimal handling
// - reduced motion: renders the final value immediately, no spring
// - the animated digits are aria-hidden; an sr-only copy always holds the final value
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

import { cn } from '@/lib/utils'

interface CountUpProps {
  to: number
  from?: number
  /** Seconds before counting starts once in view. */
  delay?: number
  /** Approximate duration in seconds. */
  duration?: number
  separator?: string
  className?: string
}

function decimalPlaces(value: number): number {
  const decimals = value.toString().split('.')[1]
  return decimals && parseInt(decimals, 10) !== 0 ? decimals.length : 0
}

export function CountUp({
  to,
  from = 0,
  delay = 0,
  duration = 2,
  separator = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration),
  })
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const maxDecimals = Math.max(decimalPlaces(from), decimalPlaces(to))

  // One formatter per component, not one per animation frame.
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        useGrouping: Boolean(separator),
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals,
      }),
    [maxDecimals, separator],
  )
  const format = useCallback(
    (latest: number) => {
      const formatted = formatter.format(latest)
      return separator ? formatted.replace(/,/g, separator) : formatted
    },
    [formatter, separator],
  )

  // Initial (or final, under reduced motion) text.
  useEffect(() => {
    if (ref.current) ref.current.textContent = format(reduceMotion ? to : from)
  }, [format, from, to, reduceMotion])

  useEffect(() => {
    if (!isInView || reduceMotion) return
    const id = setTimeout(() => motionValue.set(to), delay * 1000)
    return () => clearTimeout(id)
  }, [isInView, reduceMotion, motionValue, to, delay])

  useEffect(
    () =>
      springValue.on('change', (latest: number) => {
        if (ref.current) ref.current.textContent = format(latest)
      }),
    [springValue, format],
  )

  return (
    <>
      <span ref={ref} aria-hidden="true" className={cn('tabular-nums', className)} />
      <span className="sr-only">{format(to)}</span>
    </>
  )
}

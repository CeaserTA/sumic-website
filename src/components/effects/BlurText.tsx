// React Bits "BlurText" (https://reactbits.dev), adapted:
// - renders <span>s so it can sit inside a heading (the original renders a <p>)
// - aria-hidden: the parent must carry the full text for assistive tech (e.g. an sr-only copy)
// - Motion's useInView instead of a hand-rolled IntersectionObserver
// - named export, Tailwind classes instead of inline styles
import { useMemo, useRef } from 'react'
import { motion, useInView, type Easing, type Transition } from 'motion/react'

import { cn } from '@/lib/utils'

type Keyframe = Record<string, string | number>

interface BlurTextProps {
  text: string
  /** Delay between segments, in ms. */
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  animationFrom?: Keyframe
  animationTo?: Keyframe[]
  easing?: Easing | Easing[]
  onAnimationComplete?: () => void
  /** Duration of each keyframe step, in seconds. */
  stepDuration?: number
}

function buildKeyframes(from: Keyframe, steps: Keyframe[]) {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((step) => Object.keys(step))])
  const keyframes: Record<string, (string | number)[]> = {}
  for (const key of keys) {
    const values = [from[key], ...steps.map((step) => step[key])]
    // A key missing from a frame holds its previous value.
    let previous = values.find((value) => value !== undefined)
    if (previous === undefined) continue
    const frames: (string | number)[] = []
    for (const value of values) {
      previous = value ?? previous
      frames.push(previous)
    }
    keyframes[key] = frames
  }
  return keyframes
}

export function BlurText({
  text,
  delay = 200,
  className,
  animateBy = 'words',
  direction = 'top',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const segments = animateBy === 'words' ? text.split(' ') : text.split('')

  const from = useMemo<Keyframe>(
    () =>
      animationFrom ?? {
        filter: 'blur(10px)',
        opacity: 0,
        y: direction === 'top' ? -50 : 50,
      },
    [animationFrom, direction],
  )
  const to = useMemo<Keyframe[]>(
    () =>
      animationTo ?? [
        { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
        { filter: 'blur(0px)', opacity: 1, y: 0 },
      ],
    [animationTo, direction],
  )
  const keyframes = useMemo(() => buildKeyframes(from, to), [from, to])

  const stepCount = to.length + 1
  const times = Array.from({ length: stepCount }, (_, i) => i / (stepCount - 1))

  return (
    <span ref={ref} aria-hidden="true" className={cn('flex flex-wrap', className)}>
      {segments.map((segment, index) => {
        const transition: Transition = {
          duration: stepDuration * (stepCount - 1),
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        }
        return (
          <motion.span
            key={index}
            initial={from}
            animate={inView ? keyframes : from}
            transition={transition}
            onAnimationComplete={index === segments.length - 1 ? onAnimationComplete : undefined}
            className="inline-block will-change-[transform,filter,opacity]"
          >
            {segment === ' ' ? ' ' : segment}
            {animateBy === 'words' && index < segments.length - 1 && ' '}
          </motion.span>
        )
      })}
    </span>
  )
}

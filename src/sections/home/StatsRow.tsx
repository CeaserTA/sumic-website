import { useEffect, useRef, useState } from 'react'

import { CountUp } from '@/components/effects/CountUp'
import { Reveal } from '@/components/motion/Reveal'
import type { Stat } from '@/content/home'
import { useReducedMotionPreference } from '@/hooks/useHeavyEffects'

interface StatsRowProps {
  eyebrow: string
  title: string
  stats: readonly Stat[]
}

/**
 * Horizontal band: heading left, thin divider, 4 radial rings right.
 * Compact — section height is determined by the rings (~80px tall).
 */

const ringFills = [85, 60, 5, 95]
const RADIUS = 34
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface RingProps {
  fill: number
  animated: boolean
  delay: number
}

function RadialRing({ fill, animated, delay }: RingProps) {
  const [progress, setProgress] = useState(animated ? 0 : fill)
  const ref = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!animated) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const id = setTimeout(() => setProgress(fill), delay)
        return () => clearTimeout(id)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animated, fill, delay])

  const dashoffset = CIRCUMFERENCE * (1 - progress / 100)

  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" aria-hidden="true">
      <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="currentColor"
        strokeWidth="5" className="text-brand-line" />
      <circle
        ref={ref}
        cx="40" cy="40" r={RADIUS} fill="none" stroke="currentColor"
        strokeWidth="5" strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={dashoffset}
        transform="rotate(-90 40 40)"
        className="text-brand-accent-ink"
        style={{ transition: animated ? 'stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)' : undefined }}
      />
    </svg>
  )
}

export function StatsRow({ eyebrow, title, stats }: StatsRowProps) {
  if (stats.length === 0) return null
  const reduceMotion = useReducedMotionPreference()

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">

      {/* Heading */}
      <div className="flex flex-col gap-2 lg:w-72 lg:shrink-0">
        <p className="font-medium text-brand-accent-ink">{eyebrow}</p>
        <h2 className="text-2xl font-semibold leading-snug text-brand-heading sm:text-3xl">
          {title}
        </h2>
      </div>

      {/* Divider — desktop only */}
      <div aria-hidden="true" className="hidden h-20 w-px shrink-0 bg-brand-line lg:block" />

      {/* 4 rings in a row */}
      <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:flex lg:flex-1 lg:justify-around lg:gap-0">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} index={index} className="flex flex-col items-center gap-2">
            <div className="relative flex items-center justify-center">
              <RadialRing
                fill={ringFills[index % ringFills.length]}
                animated={!reduceMotion}
                delay={index * 150}
              />
              <dd className="absolute font-heading text-base font-bold leading-none tracking-tight text-brand-primary">
                <CountUp to={stat.value} from={stat.from ?? 0} duration={1.4} delay={index * 0.15} />
                <span className="text-sm">{stat.suffix}</span>
              </dd>
            </div>
            <dt className="text-center text-xs font-medium text-brand-text">{stat.label}</dt>
          </Reveal>
        ))}
      </dl>

    </div>
  )
}

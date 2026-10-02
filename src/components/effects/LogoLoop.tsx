// React Bits "LogoLoop" (https://reactbits.dev), adapted and trimmed:
// - horizontal only; items rendered by the caller (renderItem)
// - `paused` is controlled by the parent (hover, focus, pause button); velocity eases to 0
// - duplicate copies are aria-hidden so assistive tech reads each logo once
// - reduced motion: no animation loop (callers should render a static list instead)
// - strict types, named export, Tailwind classes; inline style only for dynamic values
import { useCallback, useEffect, useRef, useState, type Key, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

const SMOOTH_TAU = 0.25
const MIN_COPIES = 2
const COPY_HEADROOM = 2

interface LogoLoopProps<T> {
  items: readonly T[]
  getKey: (item: T) => Key
  renderItem: (item: T) => ReactNode
  /** Pixels per second. */
  speed?: number
  /** Gap between logos, in px. */
  gap?: number
  paused?: boolean
  className?: string
}

export function LogoLoop<T>({
  items,
  getKey,
  renderItem,
  speed = 60,
  gap = 56,
  paused = false,
  className,
}: LogoLoopProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const seqRef = useRef<HTMLUListElement>(null)
  const [seqWidth, setSeqWidth] = useState(0)
  const [copyCount, setCopyCount] = useState(MIN_COPIES)

  const measure = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0
    const sequenceWidth = seqRef.current?.getBoundingClientRect().width ?? 0
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth))
      setCopyCount(Math.max(MIN_COPIES, Math.ceil(containerWidth / sequenceWidth) + COPY_HEADROOM))
    }
  }, [])

  // Re-measure on resize and once every logo image has loaded.
  useEffect(() => {
    const observer = new ResizeObserver(measure)
    if (containerRef.current) observer.observe(containerRef.current)
    if (seqRef.current) observer.observe(seqRef.current)
    const images = [...(seqRef.current?.querySelectorAll('img') ?? [])]
    for (const img of images) {
      if (!img.complete) img.addEventListener('load', measure, { once: true })
    }
    measure()
    return () => {
      observer.disconnect()
      for (const img of images) img.removeEventListener('load', measure)
    }
  }, [measure, items])

  // Animation loop: offset advances with a velocity that eases toward the target.
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  useEffect(() => {
    const track = trackRef.current
    if (!track || seqWidth === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.style.transform = 'translate3d(0, 0, 0)'
      return
    }

    let frame = 0
    let last: number | null = null
    const target = paused ? 0 : speed

    const animate = (timestamp: number) => {
      const delta = last === null ? 0 : Math.max(0, timestamp - last) / 1000
      last = timestamp
      velocityRef.current += (target - velocityRef.current) * (1 - Math.exp(-delta / SMOOTH_TAU))
      offsetRef.current =
        (((offsetRef.current + velocityRef.current * delta) % seqWidth) + seqWidth) % seqWidth
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [paused, speed, seqWidth])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            key={copyIndex}
            ref={copyIndex === 0 ? seqRef : undefined}
            aria-hidden={copyIndex > 0 || undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={getKey(item)}
                // Dynamic value: gap comes from props.
                style={{ paddingRight: gap }}
                className="shrink-0"
              >
                {renderItem(item)}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

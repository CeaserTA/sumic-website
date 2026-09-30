// React Bits "SpotlightCard" (https://reactbits.dev), adapted:
// - pointer position goes into CSS variables via a ref (no re-render per mousemove)
// - glow shows on hover and on keyboard focus inside the card, in CSS only
// - any CSS colour (e.g. a token color-mix), no hard-coded neutral styling
// - named export, className passthrough
import { useRef, type ComponentProps, type PointerEvent } from 'react'

import { cn } from '@/lib/utils'

interface SpotlightCardProps extends ComponentProps<'div'> {
  /** Any CSS colour; defaults to a soft brand-green glow. */
  spotlightColor?: string
}

export function SpotlightCard({
  spotlightColor = 'color-mix(in oklab, var(--brand-accent) 22%, transparent)',
  className,
  children,
  onPointerMove,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    onPointerMove?.(event)
    const el = ref.current
    if (!el || event.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      // Dynamic value: the colour is a prop, so it's passed as a custom property.
      style={{ ['--spot-color' as string]: spotlightColor }}
      className={cn('group/spotlight relative isolate overflow-hidden', className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_var(--spot-x,50%)_var(--spot-y,50%),var(--spot-color),transparent_70%)] opacity-0 transition-opacity duration-500 group-focus-within/spotlight:opacity-100 group-hover/spotlight:opacity-100"
      />
      {children}
    </div>
  )
}

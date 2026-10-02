import { useId, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { PauseIcon, PlayIcon } from 'lucide-react'

import { LogoLoop } from '@/components/effects/LogoLoop'
import { Button } from '@/components/ui/button'
import type { Partner } from '@/content/partners'
import { ui } from '@/content/ui'
import { useReducedMotionPreference } from '@/hooks/useHeavyEffects'

interface PartnersMarqueeProps {
  title: string
  partners: readonly Partner[]
}

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <img
      src={partner.logo.src}
      alt={partner.name}
      width={partner.logo.width}
      height={partner.logo.height}
      decoding="async"
      className="h-11 w-auto max-w-44 object-contain opacity-85 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
    />
  )
}

/**
 * Partner logos. Scrolls as a marquee; pauses on hover, on keyboard focus and with the
 * pause button (WCAG 2.2.2). Reduced motion shows a static, wrapped grid instead.
 * Renders nothing while the list is empty.
 */
export function PartnersMarquee({ title, partners }: PartnersMarqueeProps) {
  const titleId = useId()
  const ref = useRef<HTMLDivElement>(null)
  // Mount the marquee (and fetch its images) only when it approaches the viewport.
  const nearView = useInView(ref, { once: true, margin: '400px 0px' })
  // Hydration-safe (the prerendered HTML assumes motion is allowed).
  const reduceMotion = useReducedMotionPreference()
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  if (partners.length === 0) return null

  return (
    <div
      ref={ref}
      // Focus anywhere in the block (e.g. the pause button) also pauses the loop.
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="flex flex-col gap-8"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 id={titleId} className="text-2xl font-bold sm:text-3xl">
          {title}
        </h3>
        {!reduceMotion && (
          <Button
            variant="outline"
            size="icon-lg"
            onClick={() => setUserPaused((paused) => !paused)}
            aria-pressed={userPaused}
            className="size-11 rounded-full"
          >
            {userPaused ? <PlayIcon /> : <PauseIcon />}
            <span className="sr-only">{userPaused ? ui.marquee.play : ui.marquee.pause}</span>
          </Button>
        )}
      </div>

      {reduceMotion ? (
        <ul
          aria-labelledby={titleId}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        >
          {partners.map((partner) => (
            <li key={partner.name}>
              <PartnerLogo partner={partner} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          role="region"
          aria-labelledby={titleId}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className="min-h-14"
        >
          {nearView && (
            <LogoLoop
              items={partners}
              getKey={(partner) => partner.name}
              renderItem={(partner) => <PartnerLogo partner={partner} />}
              paused={hovered || focused || userPaused}
            />
          )}
        </div>
      )}
    </div>
  )
}

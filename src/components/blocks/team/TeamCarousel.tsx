import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { TeamCard } from '@/components/blocks/team/TeamCard'
import { AppLink } from '@/components/layout/AppLink'
import { Button } from '@/components/ui/button'
import type { Person } from '@/content/company'
import { ui } from '@/content/ui'
import { cn } from '@/lib/utils'

/*
 * The management team, presented three ways. CSS media queries pick one, so the prerendered HTML
 * is the same for everyone and hydration never swaps layouts:
 *   - md+ with motion: a 3D coverflow (Coverflow).
 *   - below md with motion: a swipeable row of full cards with scroll snap (SwipeRow).
 *   - prefers-reduced-motion: a static grid of everyone (StaticGrid).
 * Each starts with `people[startIndex]` in front. Names and roles are always visible on the cards.
 */

interface TeamCarouselProps {
  people: readonly Person[]
  /** Who is in front on load (the founder). */
  startIndex?: number
}

export function TeamCarousel({ people, startIndex = 0 }: TeamCarouselProps) {
  if (people.length === 0) return null

  return (
    <>
      <div className="hidden md:motion-safe:block">
        <Coverflow people={people} startIndex={startIndex} />
      </div>
      <div className="motion-reduce:hidden md:hidden">
        <SwipeRow people={people} startIndex={startIndex} />
      </div>
      <div className="hidden motion-reduce:block">
        <StaticGrid people={people} />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ Coverflow (md+) */

const EASE = 'cubic-bezier(0.56, 0.12, 0.12, 0.98)'

/** Signed distance from the front card, wrapping around (…, -2, -1, 0, 1, 2, …). */
function offsetFrom(index: number, current: number, total: number): number {
  const half = Math.floor(total / 2)
  return ((((index - current + half) % total) + total) % total) - half
}

/**
 * The card's place in the fan: the front card is flat; the next ones turn in 3D towards it,
 * shrink and tuck behind; the rest wait out of sight. Later cards start moving slightly later,
 * so the fan unfolds.
 */
function coverflowStyle(offset: number): CSSProperties {
  const distance = Math.abs(offset)
  const side = Math.sign(offset)
  const place =
    distance === 0
      ? { x: 0, turn: 0, scale: 1 }
      : distance === 1
        ? { x: 56, turn: 45, scale: 0.8 }
        : distance === 2
          ? { x: 98, turn: 40, scale: 0.65 }
          : { x: 110, turn: 20, scale: 0.5 }
  const delay = distance <= 1 ? 60 : distance === 2 ? 90 : 115
  return {
    transform: `perspective(800px) translateX(${side * place.x}%) rotateY(${-side * place.turn}deg) scale(${place.scale})`,
    opacity: distance > 2 ? 0 : 1,
    zIndex: 10 - distance,
    transition: `transform 350ms ${EASE} ${delay}ms, opacity 350ms ${EASE} ${delay}ms`,
  }
}

function Coverflow({ people, startIndex }: Required<TeamCarouselProps>) {
  const listId = useId()
  const [current, setCurrent] = useState(startIndex)
  const [announcement, setAnnouncement] = useState('')
  const total = people.length

  function show(index: number) {
    const next = (index + total) % total
    setCurrent(next)
    const person = people[next]
    if (person) {
      setAnnouncement(ui.teamCarousel.current(person.name, person.role, next + 1, total))
    }
  }

  // Arrow keys work while either button has focus.
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowLeft') show(current - 1)
    else if (event.key === 'ArrowRight') show(current + 1)
    else return
    event.preventDefault()
  }

  const front = people[current]

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Screen readers get the whole team as a list; the stage below is visual only. */}
      <ul id={listId} aria-label={ui.teamCarousel.label} className="sr-only">
        {people.map((person) => (
          <li key={person.name}>
            {person.name}, {person.role}
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="grid w-full overflow-x-clip py-2">
        {people.map((person, index) => {
          const offset = offsetFrom(index, current, total)
          const distance = Math.abs(offset)
          return (
            <div
              key={person.name}
              style={coverflowStyle(offset)}
              className={cn(
                'relative mx-auto w-72 [grid-area:1/1] lg:w-80 xl:w-84',
                distance > 2 && 'pointer-events-none',
              )}
            >
              <TeamCard person={person} nameAs="p" sizes="(min-width: 1280px) 336px, 320px" />
              {distance > 0 && distance <= 2 && (
                // Mouse shortcut: click a side card to bring it to the front. Keyboard users have
                // the buttons and arrow keys below, so this stays out of the tab order.
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => show(index)}
                  className="absolute inset-0 cursor-pointer rounded-2xl"
                >
                  <span className="sr-only">{ui.teamCarousel.show(person.name)}</span>
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div role="group" aria-label={ui.teamCarousel.label} className="flex items-center gap-3">
        <CarouselButton
          direction="previous"
          controls={listId}
          onClick={() => show(current - 1)}
          onKeyDown={handleKeyDown}
        />
        <CarouselButton
          direction="next"
          controls={listId}
          onClick={() => show(current + 1)}
          onKeyDown={handleKeyDown}
        />
        <p role="status" aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>

      <BioSlot person={front} />
    </div>
  )
}

/* ------------------------------------------------------------------ Swipe row (below md) */

function SwipeRow({ people, startIndex }: Required<TeamCarouselProps>) {
  const listId = useId()
  const listRef = useRef<HTMLUListElement>(null)
  const [current, setCurrent] = useState(startIndex)

  // Track the snapped card from the scroll position (passive, once per frame).
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const items = [...list.children]
        const centre = list.scrollLeft + list.clientWidth / 2
        let nearest = 0
        let best = Number.POSITIVE_INFINITY
        items.forEach((item, index) => {
          if (!(item instanceof HTMLElement)) return
          const distance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - centre)
          if (distance < best) {
            best = distance
            nearest = index
          }
        })
        setCurrent(nearest)
      })
    }
    list.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      list.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Start with `startIndex` in view (no-op for the first card).
  useEffect(() => {
    const item = listRef.current?.children[startIndex]
    if (startIndex > 0 && item instanceof HTMLElement) {
      listRef.current?.scrollTo({ left: item.offsetLeft - 16 })
    }
  }, [startIndex])

  function go(index: number) {
    const list = listRef.current
    const item = list?.children[Math.max(0, Math.min(people.length - 1, index))]
    if (!list || !(item instanceof HTMLElement)) return
    // Smooth unless reduced motion (the global CSS safety net sets scroll-behavior: auto).
    list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2 })
  }

  return (
    <div className="flex flex-col gap-6">
      <ul
        ref={listRef}
        id={listId}
        aria-label={ui.teamCarousel.label}
        className="-mx-4 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-4 sm:-mx-6 sm:px-6"
      >
        {people.map((person) => (
          <li key={person.name} className="w-[78%] max-w-80 shrink-0 snap-center">
            <TeamCard person={person} sizes="78vw" />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-3">
        <CarouselButton
          direction="previous"
          controls={listId}
          atEnd={current === 0}
          onClick={() => go(current - 1)}
        />
        <CarouselButton
          direction="next"
          controls={listId}
          atEnd={current === people.length - 1}
          onClick={() => go(current + 1)}
        />
      </div>
      <BioSlot person={people[current]} />
    </div>
  )
}

/* ------------------------------------------------------------------ Static grid (reduced motion) */

function StaticGrid({ people }: { people: readonly Person[] }) {
  return (
    <div className="flex flex-col gap-8">
      <ul aria-label={ui.teamCarousel.label} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <li key={person.name} className="mx-auto w-full max-w-80">
            <TeamCard
              person={person}
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 92vw"
            />
          </li>
        ))}
      </ul>
      {people
        .filter((person) => person.bio)
        .map((person) => (
          <BioSlot key={person.name} person={person} showName />
        ))}
    </div>
  )
}

/* ------------------------------------------------------------------ Shared parts */

function CarouselButton({
  direction,
  controls,
  atEnd = false,
  onClick,
  onKeyDown,
}: {
  direction: 'previous' | 'next'
  controls: string
  /** No further card this way (swipe row): inert but still focusable, so focus isn't lost. */
  atEnd?: boolean
  onClick: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void
}) {
  const Icon = direction === 'previous' ? ChevronLeftIcon : ChevronRightIcon
  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      aria-controls={controls}
      aria-disabled={atEnd || undefined}
      onClick={atEnd ? undefined : onClick}
      onKeyDown={onKeyDown}
      className="size-12 rounded-full bg-brand-surface aria-disabled:opacity-40"
    >
      <Icon aria-hidden="true" />
      <span className="sr-only">{ui.teamCarousel[direction]}</span>
    </Button>
  )
}

/**
 * The front person's bio link (only people with a bio page get one). Fixed height: no jumps.
 * In the static grid nobody is "in front", so the link names the person.
 */
function BioSlot({ person, showName = false }: { person: Person | undefined; showName?: boolean }) {
  return (
    <div className="flex min-h-11 items-center justify-center">
      {person?.bio && (
        <AppLink
          href={person.bio.href}
          className="inline-flex min-h-11 items-center rounded-sm text-sm font-medium text-brand-accent-ink underline underline-offset-4 transition-colors hover:text-brand-primary"
        >
          {person.bio.label}
          <span className={showName ? undefined : 'sr-only'}>: {person.name}</span>
        </AppLink>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled more than `threshold` pixels. A passive scroll listener with
 * one state update per crossing (React skips identical values), so it is cheap and keeps
 * Motion out of the startup bundle for the navbar and back-to-top button.
 * Starts as false (matches the prerendered HTML) and syncs after mount.
 */
export function useScrolledPast(threshold: number): boolean {
  const [past, setPast] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setPast(window.scrollY > threshold)
    }
    const onScroll = () => {
      frame ||= requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [threshold])

  return past
}

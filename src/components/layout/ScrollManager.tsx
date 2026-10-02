import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

// A code-split page renders after its chunk arrives, so a #hash target may not exist yet.
const HASH_WAIT_MS = 3000

/**
 * Client-side navigation housekeeping: on a route change, scroll to the top (or to the #hash
 * target, waiting briefly for a lazy page to render it) and move focus there or to the main
 * content, so screen-reader and keyboard users start at the new page. The first render (a full
 * page load) is left to the browser.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const id = hash ? decodeURIComponent(hash.slice(1)) : ''
    const goTo = (target: HTMLElement) => {
      target.scrollIntoView()
      target.focus({ preventScroll: true })
    }
    const goToTop = () => {
      window.scrollTo(0, 0)
      document.getElementById('main')?.focus({ preventScroll: true })
    }

    const target = id ? document.getElementById(id) : null
    if (target) {
      goTo(target)
      return
    }
    goToTop()
    if (!id) return

    const started = performance.now()
    let frame = requestAnimationFrame(function poll() {
      const late = document.getElementById(id)
      if (late) goTo(late)
      else if (performance.now() - started < HASH_WAIT_MS) frame = requestAnimationFrame(poll)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * Client-side navigation housekeeping: on a route change, scroll to the top (or to the #hash
 * target) and move focus to the main content so screen-reader and keyboard users start at the
 * new page. The first render (a full page load) is left to the browser.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView()
      target.focus({ preventScroll: true })
    } else {
      window.scrollTo(0, 0)
      document.getElementById('main')?.focus({ preventScroll: true })
    }
  }, [pathname, hash])

  return null
}

import { useEffect } from 'react'
import { useLocation } from 'react-router'

import { metaForPath } from '@/routes/meta'

/**
 * Keeps <title>, description, canonical and Open Graph tags in step with client-side
 * navigation. The prerender writes the same values into each page's static HTML.
 */
export function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaForPath(pathname)
    document.title = meta.title
    const set = (selector: string, attribute: string, value: string) =>
      document.head.querySelector(selector)?.setAttribute(attribute, value)
    set('meta[name="description"]', 'content', meta.description)
    set('meta[property="og:title"]', 'content', meta.title)
    set('meta[property="og:description"]', 'content', meta.description)
    set('meta[name="twitter:title"]', 'content', meta.title)
    set('meta[name="twitter:description"]', 'content', meta.description)
    set('meta[property="og:url"]', 'content', meta.canonical)
    set('link[rel="canonical"]', 'href', meta.canonical)
  }, [pathname])

  return null
}

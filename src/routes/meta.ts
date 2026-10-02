import { notFoundPage, pages, pageTitle, SITE_NAME, type PageMeta } from '@/content/pages'

/** Production origin; canonical and Open Graph URLs are absolute. */
export const SITE_URL = 'https://sumicitsolutions.com'

export interface RouteHead {
  title: string
  description: string
  canonical: string
  /** 404 and similar pages must not be indexed. */
  noindex: boolean
}

const strip = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

export function pageForPath(pathname: string): PageMeta | undefined {
  return pages.find((page) => strip(page.path) === strip(pathname))
}

/** Head tags for a path, used by RouteMeta (client) and the prerender script (static HTML). */
export function metaForPath(pathname: string): RouteHead {
  const page = pageForPath(pathname)
  if (!page) {
    return {
      title: pageTitle(notFoundPage.title),
      description: notFoundPage.description,
      canonical: SITE_URL + '/',
      noindex: true,
    }
  }
  return {
    // Home leads with the brand; inner pages lead with the page name.
    title: page.id === 'home' ? `${SITE_NAME} | ${page.title}` : pageTitle(page.title),
    description: page.description,
    canonical: SITE_URL + page.path,
    noindex: false,
  }
}

import type { NavLink } from '@/content/site'

/** Links with a sectionId target a section on the current page (`#id`); others use their href. */
export function navHref(link: NavLink): string {
  return link.sectionId ? `#${link.sectionId}` : link.href
}

export function externalProps(link: NavLink) {
  return link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

/** Dropdown entries; a parent with its own destination gets an overview link first. */
export function dropdownItems(link: NavLink): readonly NavLink[] {
  const children = link.children ?? []
  const hasOverview = Boolean(link.sectionId) || link.href !== '#'
  return hasOverview ? [link, ...children] : children
}

/** Site-relative route handled by the router (not a file, hash, protocol-relative URL). */
export function isInternalRoute(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//') && !/\.[a-z0-9]+($|[?#])/i.test(href)
}

/** Compare paths ignoring a trailing slash, so /about and /about/ match. */
function samePath(a: string, b: string): boolean {
  const strip = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path)
  return strip(a) === strip(b)
}

/** A nav item is active when it, or one of its dropdown children, is the current route. */
export function isActiveLink(link: NavLink, pathname: string): boolean {
  if (isInternalRoute(link.href) && samePath(link.href, pathname)) return true
  return (link.children ?? []).some((child) => isActiveLink(child, pathname))
}

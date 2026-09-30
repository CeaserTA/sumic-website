import type { NavLink } from '@/content/site'

/** While the home page is the only page, links that map to a home section scroll to it. */
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

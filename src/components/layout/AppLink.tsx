import type { ComponentProps } from 'react'
import { Link } from 'react-router'

import { isInternalRoute } from '@/lib/nav'

interface AppLinkProps extends Omit<ComponentProps<'a'>, 'href'> {
  href: string
}

/**
 * One link component for the whole site: internal routes use the router (client-side
 * navigation, prerendered HTML still has a real href); external URLs, mailto:, tel:, files
 * and in-page hashes stay plain anchors. Works with `asChild` (Button, NavigationMenuLink).
 */
export function AppLink({ href, children, ...props }: AppLinkProps) {
  if (isInternalRoute(href)) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

import { lazyWithPreload } from '@/routes/lazyWithPreload'
import { pageForPath } from '@/routes/meta'

// Code-split page modules. Inner pages load as their own chunk; the prerender waits for them,
// so the HTML is complete. main.tsx preloads the current route's chunk before hydrating.
export const PlannedPage = lazyWithPreload(() =>
  import('@/pages/PlannedPage').then((module) => module.PlannedPage),
)

/** Load the page module for `pathname` (if it is code-split) so hydration happens in place. */
export async function preloadRoute(pathname: string): Promise<void> {
  const page = pageForPath(pathname)
  if (page?.status === 'planned') await PlannedPage.preload()
}

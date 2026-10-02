import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router'

import { App } from '@/App'
import { pages } from '@/content/pages'
import { metaForPath, type RouteHead } from '@/routes/meta'

/** Path used to prerender the 404 page (any unmatched path renders NotFoundPage). */
export const NOT_FOUND_PATH = '/__not-found__/'

/** Every route to prerender, plus the 404 page. */
export const prerenderPaths: readonly string[] = [...pages.map((page) => page.path), NOT_FOUND_PATH]

export function headFor(path: string): RouteHead {
  return metaForPath(path)
}

function app(url: string) {
  return (
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  )
}

/**
 * Build-time prerender (scripts/prerender.mjs): static HTML for each route.
 *
 * Two passes: `prerender` waits for every lazy (code-split) chunk the route uses, which leaves
 * those lazy components resolved; `renderToString` then emits plain, in-order HTML. A single
 * `prerender` pass would stream late chunks out of order (hidden segments + inline reveal
 * scripts), which delays first paint.
 */
export async function render(url: string): Promise<string> {
  await prerender(app(url))
  return renderToString(app(url))
}

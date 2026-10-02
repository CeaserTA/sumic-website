import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { prerender } from 'react-dom/static'

import { App } from '@/App'

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

/**
 * Build-time prerender (scripts/prerender.mjs): static HTML for fast first paint.
 *
 * Two passes: `prerender` waits for every lazy (code-split) section to load, which leaves the
 * lazy components resolved; `renderToString` then emits plain, in-order HTML. A single
 * `prerender` pass would stream the late sections out of order (hidden segments + inline
 * reveal scripts), which delays first paint.
 */
export async function render(): Promise<string> {
  await prerender(app)
  return renderToString(app)
}

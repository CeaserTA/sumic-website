import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { App } from '@/App'
import { preloadRoute } from '@/routes/pageModules'

import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production HTML is prerendered per route (scripts/prerender.mjs); dev renders from scratch.
// Before hydrating, load the current route's page chunk so the page renders synchronously and
// React hydrates the prerendered HTML in place (a still-loading lazy page would be re-rendered).
if (root.hasChildNodes()) {
  void preloadRoute(window.location.pathname).then(() => hydrateRoot(root, app))
} else {
  createRoot(root).render(app)
}

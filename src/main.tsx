import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import { App } from '@/App'

import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered at build time (scripts/prerender.mjs); dev renders from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

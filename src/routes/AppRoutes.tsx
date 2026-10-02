import { Suspense } from 'react'
import { Route, Routes } from 'react-router'

import { SiteLayout } from '@/components/layout/SiteLayout'
import { pages } from '@/content/pages'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PlannedPage } from '@/routes/pageModules'

/**
 * Every route on the site. Paths come from src/content/pages.ts (live-site slugs with a trailing
 * slash) and each one is prerendered to dist/<path>/index.html by scripts/prerender.mjs.
 * As pages are built, swap PlannedPage for the real page component here.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        {pages
          .filter((page) => page.status === 'planned')
          .map((page) => (
            <Route
              key={page.id}
              path={page.path}
              element={
                <Suspense fallback={null}>
                  <PlannedPage pageId={page.id} />
                </Suspense>
              }
            />
          ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

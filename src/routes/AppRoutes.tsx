import { Suspense, type ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { SiteLayout } from '@/components/layout/SiteLayout'
import { pages, redirects, type PageId } from '@/content/pages'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import {
  CookiesPolicyPage,
  FounderPage,
  GovernancePage,
  PlannedPage,
  PrivacyPolicyPage,
  SumicMeaningPage,
  TermsOfUsePage,
} from '@/routes/pageModules'

/** The element for each built inner page; pages not listed render PlannedPage. */
function pageElement(id: PageId): ReactNode {
  switch (id) {
    case 'privacy-policy':
      return <PrivacyPolicyPage />
    case 'cookies-policy':
      return <CookiesPolicyPage />
    case 'terms-of-use':
      return <TermsOfUsePage />
    case 'sumic-meaning':
      return <SumicMeaningPage />
    case 'founder':
      return <FounderPage />
    case 'team':
      return <GovernancePage />
    default:
      return <PlannedPage pageId={id} />
  }
}

/**
 * Every route on the site. Paths come from src/content/pages.ts (live-site slugs with a trailing
 * slash) and each one is prerendered to dist/<path>/index.html by scripts/prerender.mjs.
 * Code-split pages live in src/routes/pageModules.ts (with preloadRoute for hydration).
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        {pages
          .filter((page) => page.id !== 'home')
          .map((page) => (
            <Route
              key={page.id}
              path={page.path}
              element={<Suspense fallback={null}>{pageElement(page.id)}</Suspense>}
            />
          ))}
        {redirects.map((redirect) => (
          <Route
            key={redirect.from}
            path={redirect.from}
            element={<Navigate replace to={redirect.to} />}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

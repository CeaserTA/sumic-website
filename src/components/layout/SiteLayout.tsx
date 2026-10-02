import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router'

import { BackToTop } from '@/components/layout/BackToTop'
import { Navbar } from '@/components/layout/Navbar'
import { RouteMeta } from '@/components/layout/RouteMeta'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { services } from '@/content/services'
import { site } from '@/content/site'

const Footer = lazy(() =>
  import('@/components/layout/Footer').then((module) => ({ default: module.Footer })),
)

/**
 * Shared frame for every route: navbar, main landmark, footer, back-to-top button and the
 * route-change helpers. Every page starts with a navy hero, so the transparent navbar uses
 * white text and the inverse logo.
 */
export function SiteLayout() {
  return (
    <>
      <RouteMeta />
      <ScrollManager />
      <Navbar links={site.nav} cta={site.cta} overlayTone="dark" />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Suspense fallback={null}>
        <Footer site={site} services={services} />
      </Suspense>
      <BackToTop />
    </>
  )
}

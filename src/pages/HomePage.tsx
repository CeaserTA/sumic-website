import { lazy, Suspense } from 'react'

import { Navbar } from '@/components/layout/Navbar'
import {
  homeAbout,
  homeCta,
  homeHero,
  homeProducts,
  homeProof,
  homeSectionIds,
  homeServices,
} from '@/content/home'
import { confirmedPartners } from '@/content/partners'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { testimonials } from '@/content/testimonials'
import { useActiveSection } from '@/hooks/useActiveSection'
import { HeroSection } from '@/sections/home/HeroSection'

// Below-the-fold sections load as separate chunks. The prerendered HTML already contains
// them, so there is no visual gap: React hydrates each one once its code arrives.
const AboutSection = lazy(() =>
  import('@/sections/home/AboutSection').then((m) => ({ default: m.AboutSection })),
)
const ServicesSection = lazy(() =>
  import('@/sections/home/ServicesSection').then((m) => ({ default: m.ServicesSection })),
)
const ProductsSection = lazy(() =>
  import('@/sections/home/ProductsSection').then((m) => ({ default: m.ProductsSection })),
)
const ProofSection = lazy(() =>
  import('@/sections/home/ProofSection').then((m) => ({ default: m.ProofSection })),
)
const CtaSection = lazy(() =>
  import('@/sections/home/CtaSection').then((m) => ({ default: m.CtaSection })),
)
const Footer = lazy(() => import('@/components/layout/Footer').then((m) => ({ default: m.Footer })))

/**
 * Navbar plus active-section tracking. Kept separate so scroll-driven state changes never
 * re-render HomePage (and never push updates into sections that are still hydrating).
 */
function SiteNavbar() {
  const activeSectionId = useActiveSection(homeSectionIds)
  return (
    // The hero is navy, so the transparent navbar uses white text and the inverse logo.
    <Navbar links={site.nav} cta={site.cta} activeSectionId={activeSectionId} overlayTone="dark" />
  )
}

export function HomePage() {
  return (
    <>
      <SiteNavbar />

      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection content={homeHero} />
        <Suspense fallback={null}>
          <AboutSection content={homeAbout} products={site.products} />
        </Suspense>
        <Suspense fallback={null}>
          <ServicesSection content={homeServices} services={services} />
        </Suspense>
        <Suspense fallback={null}>
          <ProductsSection content={homeProducts} />
        </Suspense>
        <Suspense fallback={null}>
          <ProofSection
            content={homeProof}
            partners={confirmedPartners}
            testimonials={testimonials}
          />
        </Suspense>
        <Suspense fallback={null}>
          <CtaSection content={homeCta} />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer site={site} services={services} />
      </Suspense>
    </>
  )
}

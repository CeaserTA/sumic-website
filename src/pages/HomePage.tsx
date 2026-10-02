import { lazy, Suspense } from 'react'

import { homeAbout, homeCta, homeHero, homeProducts, homeProof, homeServices } from '@/content/home'
import { confirmedPartners } from '@/content/partners'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { visibleTestimonials } from '@/content/testimonials'
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

/**
 * The home page's sections (the shared SiteLayout provides navbar, main and footer).
 * Keep this component free of state: updates pushed into sections that are still hydrating
 * make React discard their prerendered DOM.
 */
export function HomePage() {
  return (
    <>
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
          testimonials={visibleTestimonials}
        />
      </Suspense>
      <Suspense fallback={null}>
        <CtaSection content={homeCta} />
      </Suspense>
    </>
  )
}

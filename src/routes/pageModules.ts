import { createElement } from 'react'

import type { ChecklistFormDefinition } from '@/content/checklists/types'
import type { LegalDocument } from '@/content/legal/types'
import type { PageId } from '@/content/pages'
import type { ChecklistPageId } from '@/pages/ChecklistPage'
import type { LegalPageId } from '@/pages/LegalPage'
import { lazyWithPreload } from '@/routes/lazyWithPreload'
import { pageForPath } from '@/routes/meta'

// Code-split page modules. Each inner page loads as its own chunk; the prerender waits for them,
// so the HTML is complete. main.tsx preloads the current route's chunk before hydrating.
export const PlannedPage = lazyWithPreload(() =>
  import('@/pages/PlannedPage').then((module) => module.PlannedPage),
)
// Legal pages: the shared LegalPage plus only that route's document text.
function legalPage(pageId: LegalPageId, loadDocument: () => Promise<LegalDocument>) {
  return lazyWithPreload(async () => {
    const [{ LegalPage }, document] = await Promise.all([
      import('@/pages/LegalPage'),
      loadDocument(),
    ])
    return function LegalRoute() {
      return createElement(LegalPage, { pageId, document })
    }
  })
}
export const PrivacyPolicyPage = legalPage('privacy-policy', () =>
  import('@/content/legal/privacy-policy').then((module) => module.privacyPolicy),
)
export const CookiesPolicyPage = legalPage('cookies-policy', () =>
  import('@/content/legal/cookies-policy').then((module) => module.cookiesPolicy),
)
export const TermsOfUsePage = legalPage('terms-of-use', () =>
  import('@/content/legal/terms-of-use').then((module) => module.termsOfUse),
)
export const SumicMeaningPage = lazyWithPreload(() =>
  import('@/pages/SumicMeaningPage').then((module) => module.SumicMeaningPage),
)
export const FounderPage = lazyWithPreload(() =>
  import('@/pages/FounderPage').then((module) => module.FounderPage),
)
export const GovernancePage = lazyWithPreload(() =>
  import('@/pages/GovernancePage').then((module) => module.GovernancePage),
)
export const AboutPage = lazyWithPreload(() =>
  import('@/pages/AboutPage').then((module) => module.AboutPage),
)
export const ServicesPage = lazyWithPreload(() =>
  import('@/pages/ServicesPage').then((module) => module.ServicesPage),
)
export const PartnershipsPage = lazyWithPreload(() =>
  import('@/pages/PartnershipsPage').then((module) => module.PartnershipsPage),
)
export const CareersPage = lazyWithPreload(() =>
  import('@/pages/CareersPage').then((module) => module.CareersPage),
)
export const ContactPage = lazyWithPreload(() =>
  import('@/pages/ContactPage').then((module) => module.ContactPage),
)
// Checklist pages: the shared ChecklistPage plus only that route's form data.
function checklistPage(pageId: ChecklistPageId, loadForm: () => Promise<ChecklistFormDefinition>) {
  return lazyWithPreload(async () => {
    const [{ ChecklistPage }, form] = await Promise.all([
      import('@/pages/ChecklistPage'),
      loadForm(),
    ])
    return function ChecklistRoute() {
      return createElement(ChecklistPage, { pageId, form })
    }
  })
}
export const WebsiteChecklistPage = checklistPage('checklist-website', () =>
  import('@/content/checklists/website').then((module) => module.websiteChecklist),
)
export const MobileAppChecklistPage = checklistPage('checklist-mobile-app', () =>
  import('@/content/checklists/mobile-app').then((module) => module.mobileAppChecklist),
)

const modules: Partial<Record<PageId, { preload: () => Promise<void> }>> = {
  'privacy-policy': PrivacyPolicyPage,
  'cookies-policy': CookiesPolicyPage,
  'terms-of-use': TermsOfUsePage,
  'sumic-meaning': SumicMeaningPage,
  founder: FounderPage,
  team: GovernancePage,
  about: AboutPage,
  services: ServicesPage,
  partnerships: PartnershipsPage,
  careers: CareersPage,
  contact: ContactPage,
  'checklist-website': WebsiteChecklistPage,
  'checklist-mobile-app': MobileAppChecklistPage,
}

/** Load the page module for `pathname` (if it is code-split) so hydration happens in place. */
export async function preloadRoute(pathname: string): Promise<void> {
  const page = pageForPath(pathname)
  if (!page || page.id === 'home') return
  await (modules[page.id] ?? PlannedPage).preload()
}

/**
 * Route metadata for every page: path (live-site slug, trailing slash), browser title,
 * meta description, breadcrumb label and page-hero copy.
 *
 * Source: the live pages at https://sumicitsolutions.com/ (crawled 2026-10-02). Hero copy is the
 * live page's own heading and intro line. `status: 'planned'` pages render the shared PageHero
 * only until their content is built.
 */

export type PageId =
  | 'home'
  | 'about'
  | 'team'
  | 'sumic-meaning'
  | 'founder'
  | 'services'
  | 'partnerships'
  | 'careers'
  | 'contact'
  | 'privacy-policy'
  | 'cookies-policy'
  | 'terms-of-use'

export interface PageMeta {
  id: PageId
  path: string
  /** <title>; the site name is appended (see pageTitle). */
  title: string
  description: string
  /** Short label for breadcrumbs. */
  breadcrumb: string
  status: 'built' | 'planned'
  hero?: { title: string; intro: string }
}

export const SITE_NAME = 'Sumic IT Solutions'

export const pages: readonly PageMeta[] = [
  {
    id: 'home',
    path: '/',
    title: 'Affordable digital solutions for African SMEs',
    description:
      'Sumic IT Solutions builds affordable digital solutions for African SMEs: mobile apps, custom software, AI and data analysis. Based in Kampala since 2019.',
    breadcrumb: 'Home',
    status: 'built',
  },
  {
    id: 'about',
    path: '/about/',
    title: 'About us',
    description:
      'Founded in 2019 in Kampala, Sumic IT Solutions Ltd is a technology and digital transformation company. Our history, vision, mission, values and how we work.',
    breadcrumb: 'About',
    status: 'planned',
    hero: {
      title: 'About us',
      intro: 'A digitally empowered world where technology uplifts businesses and communities.',
    },
  },
  {
    id: 'team',
    path: '/team/',
    title: 'Governance',
    description:
      'Governance structure and management team of Sumic IT Solutions Ltd, committed to the highest standards of governance, integrity, ethics and professionalism.',
    breadcrumb: 'Governance',
    status: 'planned',
    hero: {
      title: 'Governance',
      intro:
        'Sumic IT Solutions Ltd is committed to the highest standards of governance, business integrity, ethics and professionalism.',
    },
  },
  {
    id: 'sumic-meaning',
    path: '/sumic-meaning/',
    title: 'Sumic meaning',
    description:
      'Where the name Sumic comes from and what it stands for: speed, innovation and resilience.',
    breadcrumb: 'Sumic meaning',
    status: 'planned',
    hero: {
      title: 'Sumic meaning',
      intro: 'Unlocking the meaning of Sumic: speed, innovation and resilience.',
    },
  },
  {
    id: 'founder',
    path: '/cirus-sumika/',
    title: 'Meet the founder, Cirus Sumika',
    description:
      'Cirus Sumika, Founder & CEO of Sumic IT Solutions Ltd: techpreneur, mentor and writer.',
    breadcrumb: 'Meet the founder',
    status: 'planned',
    hero: {
      title: 'Meet the founder',
      intro: 'Cirus Sumika, Founder & CEO of Sumic IT Solutions Ltd.',
    },
  },
  {
    id: 'services',
    path: '/services/',
    title: 'Services',
    description:
      'Mobile apps, software development, AI models, data analysis, ITES & BPO and digital marketing from Sumic IT Solutions Ltd.',
    breadcrumb: 'Services',
    status: 'planned',
    hero: {
      title: 'Services',
      intro:
        'Bridging the digital divide and creating sustainable solutions through innovative technologies.',
    },
  },
  {
    id: 'partnerships',
    path: '/sumic-partnerships/',
    title: 'Partnerships',
    description:
      'Collaborations between Sumic IT Solutions Ltd and partners in Uganda, Japan and beyond, from AI healthcare training to travel and team-performance platforms.',
    breadcrumb: 'Partnerships',
    status: 'planned',
    hero: {
      title: 'Sumic partnerships',
      intro: 'Meaningful collaborations that drive innovation and deliver impactful solutions.',
    },
  },
  {
    id: 'careers',
    path: '/careers/',
    title: 'Careers',
    description:
      'Join the Sumic Tribe: careers and the Sumic Internship Program at Sumic IT Solutions Ltd.',
    breadcrumb: 'Careers',
    status: 'planned',
    hero: {
      title: 'Join our team',
      intro:
        'Welcome to the Sumic Tribe: the new creators and visionaries who apply technology in innovative ways to drive progress.',
    },
  },
  {
    id: 'contact',
    path: '/contact/',
    title: 'Contact us',
    description:
      'Request a free consultation or reach Sumic IT Solutions Ltd on New Port Bell Road, Kampala: info@sumicitsolutions.com, +256 200 930 793.',
    breadcrumb: 'Contact',
    status: 'planned',
    hero: {
      title: 'Contact us',
      intro: 'Request a free consultation, or reach us directly.',
    },
  },
  {
    id: 'privacy-policy',
    path: '/privacy-policy/',
    title: 'Privacy policy',
    description: 'How Sumic IT Solutions Ltd collects, uses and protects your personal data.',
    breadcrumb: 'Privacy policy',
    status: 'planned',
    // TODO: the live policy was last updated 5 September 2023; needs review before launch.
    hero: { title: 'Privacy policy', intro: 'Last updated: September 05, 2023' },
  },
  {
    id: 'cookies-policy',
    path: '/cookies-policy/',
    title: 'Cookies policy',
    description: 'What cookies are and how the Sumic IT Solutions website uses them.',
    breadcrumb: 'Cookies policy',
    status: 'planned',
    // TODO: review against what the new site actually stores (no analytics or ad cookies yet).
    hero: { title: 'Cookies policy', intro: 'Last updated: September 05, 2023' },
  },
  {
    id: 'terms-of-use',
    path: '/terms-of-use/',
    title: 'Terms of use',
    description: 'The terms and conditions for using the Sumic IT Solutions website.',
    breadcrumb: 'Terms of use',
    status: 'planned',
    hero: { title: 'Terms of use', intro: 'Last updated: September 05, 2023' },
  },
]

export const notFoundPage = {
  title: 'Page not found',
  description: 'The page you were looking for does not exist or has moved.',
  hero: {
    title: 'Page not found',
    intro: 'The page you were looking for does not exist or has moved.',
  },
}

export function pageTitle(title: string): string {
  return `${title} | ${SITE_NAME}`
}

export function pageById(id: PageId): PageMeta {
  const page = pages.find((candidate) => candidate.id === id)
  if (!page) throw new Error(`Unknown page id: ${id}`)
  return page
}

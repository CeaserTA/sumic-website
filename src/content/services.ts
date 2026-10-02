/**
 * "What We Do" services. Source: https://sumicitsolutions.com/ home page and /services/
 * (both list the same six, fetched 2026-09-30). Titles are verbatim; descriptions are
 * tightened from the /services/ page copy and keep only its claims.
 */

export type ServiceId =
  'mobile-apps' | 'software' | 'ai-models' | 'data-analysis' | 'ites-bpo' | 'digital-marketing'

export interface Service {
  id: ServiceId
  title: string
  /** Compact label for cards, footers and menus, when the title is long. */
  shortTitle?: string
  description: string
  /** The Services page for now. TODO: per-service pages if the company wants them. */
  href: string
}

const SERVICES_PAGE = '/services/'

export const services: readonly Service[] = [
  {
    id: 'mobile-apps',
    title: 'Mobile Application Development',
    description:
      'Custom Android and iOS apps, taken from wireframes to launch. Fast, secure and built to scale as your customer base grows.',
    href: SERVICES_PAGE,
  },
  {
    id: 'software',
    title: 'Software Development',
    description:
      'Tailored web, desktop and enterprise software that automates your workflows, delivered in agile steps and supported after launch.',
    href: SERVICES_PAGE,
  },
  {
    id: 'ai-models',
    title: 'AI Model Development',
    description:
      'Machine learning models trained on your own data, from predictive analytics to automation, so decisions are faster and better informed.',
    href: SERVICES_PAGE,
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    description:
      'We turn your financial and customer data into clear trends, dashboards and forecasts you can plan around.',
    href: SERVICES_PAGE,
  },
  {
    id: 'ites-bpo',
    title: 'ITES & BPO (Information Technology Enabled Services & Business Process Outsourcing)',
    shortTitle: 'ITES & BPO',
    description:
      'Hand off customer support, back-office work, data entry and technical support to a trained team, and keep your focus on the core business.',
    href: SERVICES_PAGE,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description:
      'SEO, social media, content, paid ads and email campaigns built around your goals, with reporting that shows what’s working.',
    href: SERVICES_PAGE,
  },
]

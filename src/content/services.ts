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
  /** Section id on the Services page (`/services/#<anchor>`). */
  anchor: string
  /** Deep link to the service's section on the Services page. */
  href: string
}

const SERVICES_PAGE = '/services/'
const anchored = (anchor: string) => ({ anchor, href: `${SERVICES_PAGE}#${anchor}` })

export const services: readonly Service[] = [
  {
    id: 'mobile-apps',
    title: 'Mobile Application Development',
    description:
      'Custom Android and iOS apps, taken from wireframes to launch. Fast, secure and built to scale as your customer base grows.',
    ...anchored('mobile-app-development'),
  },
  {
    id: 'software',
    title: 'Software Development',
    description:
      'Tailored web, desktop and enterprise software that automates your workflows, delivered in agile steps and supported after launch.',
    ...anchored('software-development'),
  },
  {
    id: 'ai-models',
    title: 'AI Model Development',
    description:
      'Machine learning models trained on your own data, from predictive analytics to automation, so decisions are faster and better informed.',
    ...anchored('ai-model-development'),
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    description:
      'We turn your financial and customer data into clear trends, dashboards and forecasts you can plan around.',
    ...anchored('data-analysis'),
  },
  {
    id: 'ites-bpo',
    title: 'ITES & BPO (Information Technology Enabled Services & Business Process Outsourcing)',
    shortTitle: 'ITES & BPO',
    description:
      'Hand off customer support, back-office work, data entry and technical support to a trained team, and keep your focus on the core business.',
    ...anchored('ites-bpo'),
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description:
      'SEO, social media, content, paid ads and email campaigns built around your goals, with reporting that shows what’s working.',
    ...anchored('digital-marketing'),
  },
]

export interface ChecklistForm {
  id: 'website' | 'mobile-app'
  title: string
  /** Short link label (home services strip). */
  shortLabel: string
  description: string
  href: string
}

/**
 * The two client checklist forms (Google Forms). Source: /services/ "Client Checklist Form".
 * Live wording, tightened in the descriptions.
 */
export const checklistForms: readonly ChecklistForm[] = [
  {
    id: 'website',
    title: 'Website Creation Client Checklist',
    shortLabel: 'Website checklist',
    /** Live: "This form is designed to help us gather all the essential details we need to create a
     *  professional, functional, and visually appealing website tailored to your business needs.
     *  Please take a few minutes to fill it out carefully, your responses will guide our planning,
     *  design, development, and branding process to ensure your website truly represents your
     *  organization and achieves its goals." */
    description:
      'Gives us the details we need to create a professional, functional and visually appealing website for your business. Your answers guide our planning, design, development and branding, so the site truly represents your organization and achieves its goals.',
    href: 'https://forms.gle/tKaBT39AWJqJDHb98',
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Creation Client Checklist',
    shortLabel: 'Mobile app checklist',
    /** Live: "This form is designed to help us understand your mobile application development needs
     *  in detail, from your project goals and desired features to your target users, budget, and
     *  timelines. Please provide as much information as possible. This will help us design and
     *  develop a solution that truly reflects your vision and business goals." */
    description:
      'Helps us understand your mobile app in detail: project goals, desired features, target users, budget and timelines. The more you share, the better the solution reflects your vision and business goals.',
    href: 'https://forms.gle/bmbxCA1CLruqx9fG6',
  },
]

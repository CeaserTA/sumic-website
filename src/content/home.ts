import type { NavLink } from '@/content/site'
import { site } from '@/content/site'

/**
 * Home page copy. Source: https://sumicitsolutions.com/ and /about/ (fetched 2026-09-30).
 * Wording is tightened from the live site; every claim is taken from it.
 */

export type HomeSectionId = 'hero' | 'about' | 'services' | 'sumic-online' | 'proof' | 'cta'

/** Section order on the home page; also used for active-link tracking. */
export const homeSectionIds: readonly HomeSectionId[] = [
  'hero',
  'about',
  'services',
  'sumic-online',
  'proof',
  'cta',
]

export interface HomeHero {
  headline: string
  lead: string
  primaryCta: NavLink
  secondaryCta: NavLink
  trustLine: string
}

export const homeHero: HomeHero = {
  // Live site: "Engineering the Future of Digital Solutions" / "Since 2019".
  // Audience and "affordable" come from /about/: "supported over 150 African businesses with
  // affordable, scalable, and customized digital solutions".
  headline: 'Affordable digital solutions for African SMEs.',
  lead: 'Mobile apps, custom software, AI and data analysis that help growing businesses modernize operations and reach more customers.',
  primaryCta: site.cta,
  secondaryCta: { label: 'Explore services', href: '/services', sectionId: 'services' },
  trustLine: 'Based in Kampala, Uganda. Building since 2019.',
}

export interface Statement {
  title: string
  text: string
}

export interface HomeAbout {
  eyebrow: string
  title: string
  paragraphs: readonly string[]
  vision: Statement
  mission: Statement
  ecosystem: { title: string; caption: string }
}

export const homeAbout: HomeAbout = {
  eyebrow: 'Who we are',
  // Clients and partners across Africa, Asia and Europe (live site, "Who we are?").
  title: 'Built in Kampala. Working across three continents.',
  paragraphs: [
    'Sumic IT Solutions is a technology and digital transformation company, founded in 2019. We build software products, AI-powered platforms and enterprise solutions, and pair them with IT-enabled services and business process outsourcing.',
    'We help organizations modernize operations, expand their market reach and deliver better digital experiences, working with clients and strategic partners across Africa, Asia and Europe.',
    'Alongside client work, we are growing our own technology ecosystem across education, talent and employment, e-commerce, events and enterprise solutions.',
  ],
  // Verbatim from /about/ "Strategic Objectives".
  vision: {
    title: 'Our vision',
    text: 'A digitally empowered world where technology uplifts businesses and communities.',
  },
  mission: {
    title: 'Our mission',
    text: 'To bridge the digital divide and create sustainable solutions through innovative technology.',
  },
  ecosystem: {
    title: 'The Sumic ecosystem',
    caption: 'Products we build and run',
  },
}

export interface HomeServices {
  eyebrow: string
  title: string
  learnMore: string
  checklist: { text: string; links: readonly NavLink[] }
}

export const homeServices: HomeServices = {
  eyebrow: 'What we do',
  title: 'Build, automate and grow with one technology partner.',
  learnMore: 'Learn more',
  // Forms and descriptions from /services/ ("Client Checklist Form" section).
  checklist: {
    text: 'Planning a website or mobile app? Our checklist forms capture your goals, features, users, budget and timelines before we start.',
    links: [
      { label: 'Website checklist', href: 'https://forms.gle/tKaBT39AWJqJDHb98', external: true },
      {
        label: 'Mobile app checklist',
        href: 'https://forms.gle/bmbxCA1CLruqx9fG6',
        external: true,
      },
    ],
  },
}

export interface HomePlaceholder {
  id: Exclude<HomeSectionId, 'hero' | 'about' | 'services'>
  title: string
  note: string
}

// Placeholder content until each section is built. Titles are the live site's headings.
export const homePlaceholders: readonly HomePlaceholder[] = [
  { id: 'sumic-online', title: 'Sumic Online', note: 'TODO: Sumic Online section' },
  { id: 'proof', title: 'Our partners', note: 'TODO: partners and proof section' },
  { id: 'cta', title: 'Talk to us', note: 'TODO: call-to-action section' },
]

import type { NavLink } from '@/content/site'
import { site } from '@/content/site'

/**
 * Home page copy. Source: https://sumicitsolutions.com/ and /about/ (fetched 2026-09-30).
 * Wording is tightened from the live site; every claim is taken from it.
 */

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

export type ProductId = 'talent-kasi' | 'sumic-online'

export interface Screenshot {
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
}

export interface ProductFeature {
  name: string
  /** One line in the product's own wording. */
  description: string
  features: readonly string[]
  href: string
  /** Shown in the browser frame's address bar. */
  domain: string
  linkLabel: string
  /** Real screenshots of the live product (desktop 1440×900, phone 390×844 @2x). */
  screenshots: { desktop: Screenshot; mobile: Screenshot }
}

// Captured from the live product sites on 2026-10-02 (cookie banner dismissed with
// "Reject all"). Originals in brand-originals/products/.
// TODO: re-capture when the products' homepages change.
function productScreenshots(id: string, name: string): ProductFeature['screenshots'] {
  const base = `/brand/products/${id}`
  return {
    desktop: {
      src: `${base}-desktop-1440w.webp`,
      srcSet: `${base}-desktop-720w.webp 720w, ${base}-desktop-1440w.webp 1440w`,
      width: 1440,
      height: 900,
      alt: `${name} homepage on desktop`,
    },
    mobile: {
      src: `${base}-mobile-780w.webp`,
      srcSet: `${base}-mobile-390w.webp 390w, ${base}-mobile-780w.webp 780w`,
      width: 780,
      height: 1688,
      alt: `${name} homepage on a phone`,
    },
  }
}

export interface HomeProducts {
  eyebrow: string
  title: string
  subtitle: string
  items: readonly (ProductFeature & { id: ProductId })[]
}

export const homeProducts: HomeProducts = {
  eyebrow: 'Our products',
  title: 'Beyond client work, we build and run our own platforms.',
  subtitle: 'Two of the products in Sumic’s own technology ecosystem.',
  items: [
    {
      // Source: talentkasi.com (meta description, "How it works", "Features", "Who it’s for").
      id: 'talent-kasi',
      name: 'Talent Kasi',
      description:
        'An AI-powered recruitment and talent management platform that helps organizations attract, screen, evaluate and hire the right talent faster.',
      features: [
        'AI parses every CV, in PDF or DOCX, and ranks applicants with evidence on skills, experience and education.',
        'A public careers page where candidates apply directly.',
        'One hiring dashboard to shortlist, update status and email candidates.',
      ],
      href: 'https://talentkasi.com/',
      domain: 'talentkasi.com',
      linkLabel: 'Visit Talent Kasi',
      screenshots: productScreenshots('talent-kasi', 'Talent Kasi'),
    },
    {
      // Source: sumiconline.com (title and meta description). /about/ also calls it B2B2C.
      id: 'sumic-online',
      name: 'Sumic Online',
      description:
        'A B2B trade portal for global sourcing: one unified B2B and B2C platform across Africa and beyond.',
      features: [
        'Connect with verified suppliers.',
        'Trade with secure transactions.',
        'Access integrated logistics on the same platform.',
      ],
      href: 'https://sumiconline.com/',
      domain: 'sumiconline.com',
      linkLabel: 'Visit Sumic Online',
      screenshots: productScreenshots('sumic-online', 'Sumic Online'),
    },
  ],
}

export interface Stat {
  value: number
  /** CountUp start value (e.g. 2000 for a year). */
  from?: number
  suffix?: string
  label: string
}

export interface ProcessStep {
  title: string
  text: string
}

export interface HomeProof {
  eyebrow: string
  title: string
  stats: readonly Stat[]
  process: { title: string; intro: string; steps: readonly ProcessStep[] }
  partnersTitle: string
  testimonialsTitle: string
}

export const homeProof: HomeProof = {
  eyebrow: 'Why Sumic',
  title: 'A track record built in Kampala since 2019.',
  // Exactly as on the live site (/about/ "Statistics"), per Sumic: shown as-is, no explanations.
  stats: [
    { value: 1, suffix: 'K+', label: 'Satisfied Clients' },
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 5, suffix: '%', label: 'Young Women' },
    { value: 1, suffix: 'M+', label: 'Sumic Visitors' },
  ],
  // Source: /about/ "Our Development Lifecycle" (six steps), tightened.
  process: {
    title: 'How we work',
    intro:
      'Every project follows the same lifecycle, from the first conversation to long-term care.',
    steps: [
      {
        title: 'Planning',
        text: 'We gather everything we need from you to plan a solution that meets your expectations.',
      },
      {
        title: 'Designing',
        text: 'We turn your requirements into a system architecture and choose the technology stack.',
      },
      {
        title: 'Building',
        text: 'Our developers build the system with the languages and methods best suited to it.',
      },
      {
        title: 'Testing',
        text: 'We evaluate quality and fix defects before anything reaches your users.',
      },
      {
        title: 'Deployment',
        text: 'We release the software and check it for deployment issues.',
      },
      {
        title: 'Maintenance',
        text: 'Under a service level agreement, we keep the system performing to its original specification.',
      },
    ],
  },
  partnersTitle: 'Our partners',
  testimonialsTitle: 'What our clients say',
}

export interface FaqItem {
  question: string
  answer: string
}

export interface HomeCta {
  title: string
  text: string
  primary: NavLink
  secondary: NavLink
  faqTitle: string
  faq: readonly FaqItem[]
}

export const homeCta: HomeCta = {
  // /about/ closing band: "Would you like to start a project with us? Sumic IT Solutions Ltd is
  // ready to work with you! … Talk to us Today." with an "Email us" button.
  title: 'Would you like to start a project with us?',
  text: 'Sumic IT Solutions is ready to work with you. Tell us what you want to build.',
  primary: { label: 'Email us', href: `mailto:${site.contact.email}` },
  secondary: { label: `Call ${site.contact.phone.display}`, href: site.contact.phone.href },
  faqTitle: 'Good to know',
  // Every answer comes from live-site content (home, /services/, /about/).
  faq: [
    {
      question: 'Where is Sumic IT Solutions based?',
      answer: `Our office is on New Port Bell Road, Kampala (P.O. Box 172928, Kampala GPO). We work with clients and strategic partners across Africa, Asia and Europe.`,
    },
    {
      question: 'Do you build apps for both Android and iOS?',
      answer:
        'Yes. We build custom mobile apps for Android and iOS and take them from wireframes to deployment.',
    },
    {
      question: 'Do you support software after launch?',
      answer:
        'Yes. Ongoing support is part of our development approach, and maintenance runs under a service level agreement so your system keeps performing to specification.',
    },
    {
      question: 'How do I start a website or mobile app project?',
      answer: `Fill in our website or mobile app checklist form so we understand your goals, features, users, budget and timelines, or email us at ${site.contact.email}.`,
    },
  ],
}

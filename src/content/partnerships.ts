import type { Photo } from '@/content/photos'
import { site } from '@/content/site'
import { mailtoHref } from '@/lib/mailto'

/**
 * Partnerships page copy (/sumic-partnerships/). Source:
 * https://sumicitsolutions.com/sumic-partnerships/ (crawled 2026-10-02). Wording is tightened (live
 * original in a JSDoc comment above each rewrite); every claim is from that page. No outcomes or
 * numbers are added. The live page links none of its partner logos and does not group them.
 */

export interface CaseStudy {
  id: string
  partner: string
  title: string
  /** e.g. "Phases 1–2" for multi-phase engagements. */
  label?: string
  paragraphs: readonly string[]
  highlights?: readonly string[]
  /** The live page's project graphic (3:2). */
  image: Photo
}

// Live project graphics (1536×1024 PNG), converted to WebP. Originals in
// brand-originals/partnerships/.
function projectImage(slug: string, alt: string): Photo {
  const base = `/images/partnerships/${slug}`
  return {
    src: `${base}-1200w.webp`,
    srcSet: `${base}-600w.webp 600w, ${base}-1200w.webp 1200w`,
    width: 1200,
    height: 800,
    alt,
  }
}

export const partnershipsPage = {
  intro: {
    eyebrow: 'Partnerships at Sumic IT Solutions Ltd',
    title: 'Key partnerships',
    /** Live: "At Sumic IT Solutions Ltd., we pride ourselves on fostering meaningful collaborations
     *  that drive innovation and deliver impactful solutions. Here are some of our key
     *  partnerships:" */
    text: 'We pride ourselves on meaningful collaborations that drive innovation and deliver impactful solutions. Here are some of our key partnerships.',
  },
  caseStudies: [
    {
      id: 'fvital',
      partner: 'FVital Inc.',
      title: 'AI-based mobile app for neonatal resuscitation training',
      /** Live: "Together with Fvital Inc., we have developed a mobile application that leverages
       *  Artificial Intelligence (AI) to revolutionize medical training. This app is specifically
       *  designed to support healthcare professionals and doctors in mastering neonatal
       *  resuscitation techniques, a critical skill for saving newborns struggling with breathing
       *  difficulties." / "By combining advanced AI-driven simulations with an intuitive user
       *  interface, this innovation ensures life-saving knowledge is accessible and effective for
       *  the medical community." */
      paragraphs: [
        'Together with FVital Inc., we developed a mobile app that uses artificial intelligence to support healthcare professionals and doctors in mastering neonatal resuscitation: a critical skill for saving newborns with breathing difficulties.',
        'AI-driven simulations and an intuitive interface make this life-saving knowledge accessible and effective for the medical community.',
      ],
      image: projectImage(
        'fvital-neonatal-resuscitation',
        'The FVital training app on two phones, beside a clinician practising neonatal resuscitation on a training mannequin',
      ),
    },
    {
      id: 'eftax',
      partner: 'Eftax Co., Ltd.',
      title: 'Halo Dish app: enhancing Muslim travel experiences',
      /** Live: "In partnership with Eftax Co., Ltd., we developed the Halo Dish App, a game-changer
       *  for Muslim tourists in Japan and Thailand. This application provides a seamless way to
       *  locate: Halal Restaurants, Halal Food Stores, Prayer Spaces" / "The app also incorporates
       *  cutting-edge AI technology, enabling users to scan and detect whether food items meet
       *  Halal requirements, ensuring peace of mind for travelers. With Halo Dish, we are bridging
       *  cultural and dietary needs with technology to enhance travel experiences for the Muslim
       *  community." */
      paragraphs: [
        'In partnership with Eftax Co., Ltd., we developed the Halo Dish app for Muslim tourists in Japan and Thailand.',
        'Its AI lets users scan food items to check whether they meet halal requirements, giving travelers peace of mind and bridging cultural and dietary needs with technology.',
      ],
      highlights: [
        'Halal restaurants',
        'Halal food stores',
        'Prayer spaces',
        'AI halal food check',
      ],
      image: projectImage(
        'eftax-halo-dish',
        'The Halo Dish app on two phones, showing a restaurant list and a food-label scan, beside a traveler using her phone',
      ),
    },
    {
      id: 'japan-ai-akt',
      partner: 'Japan AI Consulting',
      title: 'AKT: AI-based team performance tracking',
      label: 'Phases 1–2',
      paragraphs: [
        /** Live: "Phase 1: AKT PoC. Conducted a Proof of Concept (PoC) for AKT, an AI-driven platform
         *  developed by Japan AI Consulting and implemented locally by Sumic IT Solutions Ltd as its
         *  Implementation Partner and Sales Representative in Uganda." / "The platform aims to track
         *  and enhance team performance, optimize management processes, and foster growth in the
         *  digital age." */
        'Phase 1, proof of concept: we ran a PoC for AKT, an AI-driven platform developed by Japan AI Consulting, as its Implementation Partner and Sales Representative in Uganda. AKT aims to track and enhance team performance, optimize management processes and foster growth.',
        /** Live: "Phase 2: AKT Development. Following the successful PoC, Japan AI Consulting
         *  contracted Sumic IT Solutions Ltd as its Development Partner to contribute to the ongoing
         *  enhancement and feature development of AKT, the AI-Based Team Performance Tracking
         *  Solution." */
        'Phase 2, development: after the successful PoC, Japan AI Consulting contracted us as its Development Partner for the ongoing enhancement and feature development of AKT.',
      ],
      image: projectImage(
        'japan-ai-akt',
        'AKT-View team performance dashboards on a monitor and laptop, with two colleagues reviewing them',
      ),
    },
    {
      id: 'japan-ai-insightbuddy',
      partner: 'Japan AI Consulting',
      title: 'InsightBuddy Extension',
      label: 'Phase 3',
      /** Live: "Phase 3: InsightBuddy Extension Development. Sumic IT Solutions Ltd was contracted
       *  by Japan AI Consulting as a Technical Development Partner to contribute to the development
       *  of InsightBuddy Extension, an AI-powered Chrome extension that enables real-time data
       *  extraction, summarization, and AI-assisted research workflows for professionals." */
      paragraphs: [
        'Japan AI Consulting contracted us as a Technical Development Partner for InsightBuddy Extension: an AI-powered Chrome extension for professionals.',
      ],
      highlights: ['Real-time data extraction', 'Summarization', 'AI-assisted research workflows'],
      image: projectImage(
        'japan-ai-insightbuddy',
        'The InsightBuddy Chrome extension summarizing a research article in a browser window',
      ),
    },
  ] satisfies CaseStudy[],
  partners: {
    // Live heading: "Our Partners".
    title: 'Our partners',
    intro: 'Organizations we collaborate with in Uganda, Japan and beyond.',
  },
  partnerCta: {
    title: 'Partner with us',
    text: 'Interested in collaborating with Sumic IT Solutions? Tell us about your organization and what you’d like to build together.',
    action: {
      label: `Email ${site.contact.email}`,
      href: mailtoHref({ to: site.contact.email, subject: 'Partnership enquiry' }),
    },
  },
}

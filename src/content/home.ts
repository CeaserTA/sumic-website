import { site } from '@/content/site'

export type HomeSectionId = 'hero' | 'about' | 'services' | 'sumic-online' | 'proof' | 'cta'

export interface HomePlaceholder {
  id: Exclude<HomeSectionId, 'hero'>
  title: string
  note: string
}

/** Section order on the home page; also used for active-link tracking. */
export const homeSectionIds: readonly HomeSectionId[] = [
  'hero',
  'about',
  'services',
  'sumic-online',
  'proof',
  'cta',
]

export const homeHero = {
  title: site.tagline,
  subtitle: site.since,
  note: 'TODO: hero section (home page part 2)',
}

// Placeholder content until each section is built. Titles are the live site's headings.
export const homePlaceholders: readonly HomePlaceholder[] = [
  { id: 'about', title: 'Who we are', note: 'TODO: about section' },
  { id: 'services', title: 'What we do', note: 'TODO: services section' },
  { id: 'sumic-online', title: 'Sumic Online', note: 'TODO: Sumic Online section' },
  { id: 'proof', title: 'Our partners', note: 'TODO: partners and proof section' },
  { id: 'cta', title: 'Talk to us', note: 'TODO: call-to-action section' },
]

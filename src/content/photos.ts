/**
 * Real photos of the Sumic office, from the live /careers/ page (2026-08 uploads). Converted to
 * WebP; originals in brand-originals/about/. Used on About and Careers.
 */

export interface Photo {
  src: string
  srcSet: string
  width: number
  height: number
  alt: string
}

export const officePhotos = {
  teamAtWork: {
    src: '/images/about/sumic-team-at-work-1200w.webp',
    srcSet:
      '/images/about/sumic-team-at-work-600w.webp 600w, /images/about/sumic-team-at-work-1200w.webp 1200w',
    width: 1200,
    height: 799,
    alt: 'Two members of the Sumic team working at their desks',
  },
  office: {
    src: '/images/about/sumic-office-1600w.webp',
    srcSet:
      '/images/about/sumic-office-800w.webp 800w, /images/about/sumic-office-1600w.webp 1600w',
    width: 1600,
    height: 1065,
    alt: 'The Sumic IT Solutions office: team members at their desks in front of a Sumic banner',
  },
} satisfies Record<string, Photo>

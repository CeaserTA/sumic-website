/** Interface labels (accessible names, headings) used by layout components. */
export const ui = {
  skipToContent: 'Skip to content',
  nav: {
    label: 'Main',
    homeLink: 'Sumic IT Solutions home',
    openMenu: 'Open menu',
    menuTitle: 'Menu',
    opensInNewTab: '(opens in new tab)',
  },
  heroBackground: {
    pause: 'Pause background animation',
    play: 'Play background animation',
  },
  testimonials: {
    sampleBadge: 'Sample content',
  },
  marquee: {
    pause: 'Pause logo animation',
    play: 'Play logo animation',
  },
  backToTop: 'Back to top',
  breadcrumb: {
    label: 'Breadcrumb',
  },
  notFound: {
    suggestionsTitle: 'Try one of these instead',
  },
  // Development-only marker on routes whose content is not built yet.
  plannedPage: 'Planned page: content is built in a later phase.',
  footer: {
    quickLinks: 'Quick links',
    services: 'What we do',
    contact: 'Get in touch',
    social: 'Follow Sumic',
    legal: 'Legal',
  },
} as const

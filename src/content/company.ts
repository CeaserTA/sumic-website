/**
 * Copy for the company pages: Sumic Meaning, Meet the Founder and Governance.
 * Source: https://sumicitsolutions.com/sumic-meaning/, /cirus-sumika and /team/ (crawled
 * 2026-10-02). Wording is tightened; every claim is from those pages. Team list and photos
 * confirmed current by Sumic, with consent to publish.
 */

export interface TextSection {
  title: string
  paragraphs: readonly string[]
}

/* ------------------------------------------------------------------ Sumic Meaning */

export const sumicMeaning = {
  /** Live: "Welcome to the heart and soul of Sumic IT Solutions Ltd, where our name embodies our
   *  essence. “Sumic” isn't just a word; it's a testament to our culture, values, and unwavering
   *  commitment to innovation and progress." */
  lead: 'Our name is our essence. “Sumic” is a testament to our culture, our values and our commitment to innovation and progress.',
  origin: {
    title: 'The origin of “Sumic”',
    /** Live: "“Sumic” is more than just a name; it's a fusion of two powerful identities: “Sumika”
     *  and “Cirus,” the names of our founder. The larger part of our name is derived from
     *  “Sumika,” which translates to “residence.” This choice of name signifies a strong
     *  foundation upon which we build our vision." */
    paragraphs: [
      '“Sumic” fuses two names of our founder: Sumika and Cirus. The larger part comes from “Sumika”, which translates to “residence”: a strong foundation to build our vision on.',
    ],
    // Visual: the letters each name contributes (SUMI from Sumika, C from Cirus).
    names: [
      { name: 'Sumika', kept: 'Sumi', note: 'translates to “residence”' },
      { name: 'Cirus', kept: 'C', note: '' },
    ],
    result: 'Sumic',
  },
  meaning: {
    title: 'What “Sumic” means',
    /** Live: "At Sumic IT Solutions Ltd, “Sumic” means speed, agility, and innovation. It
     *  represents our promise to move fast and smart in the dynamic landscape of technology and
     *  business. When we say “Sumic,” we mean progress, efficiency, and the relentless pursuit of
     *  excellence." */
    words: ['Speed', 'Agility', 'Innovation'],
    paragraphs: [
      'It is our promise to move fast and smart in a changing world of technology and business. When we say “Sumic”, we mean progress, efficiency and the relentless pursuit of excellence.',
    ],
  },
  story: [
    {
      title: 'A story of resilience',
      /** Live: "Our journey began with challenges that tested our resilience. In previous
       *  startups, our founder, Cirus Sumika, faced setbacks, including being ousted from a
       *  promising venture due to conflicts of interest. But from adversity, Sumika emerged
       *  stronger, more determined, and armed with invaluable experience." */
      paragraphs: [
        'Our journey began with challenges that tested our resilience. In earlier startups, our founder Cirus Sumika faced setbacks, including being ousted from a promising venture over conflicts of interest. He emerged stronger, more determined and armed with invaluable experience.',
      ],
    },
    {
      title: 'The Sumic Tribe',
      /** Live: "Today, we are the Sumic Tribe, a collective of creators and visionaries united by a
       *  shared purpose: to harness technology in innovative ways that drive progress in
       *  business. We believe in the power of collaboration, innovation, and the ability to
       *  transform challenges into opportunities." */
      paragraphs: [
        'Today we are the Sumic Tribe: creators and visionaries united by one purpose, to harness technology in innovative ways that drive progress in business. We believe in collaboration, innovation and turning challenges into opportunities.',
      ],
    },
    {
      title: 'Inspiring the future',
      /** Live: "The meaning of “Sumic” inspires our team and guides our work every day. It's a
       *  reminder of where we came from and a promise of where we're headed. We invite investors,
       *  partners, and prospective team members to join us on this exciting journey. Are you
       *  ready to explore the limitless possibilities of technology-driven innovation? Connect
       *  with us, and let's shape the future together." */
      paragraphs: [
        'The meaning of “Sumic” guides our work every day: a reminder of where we came from and a promise of where we’re headed. We invite investors, partners and future team members to join us. Let’s shape the future together.',
      ],
    },
  ] satisfies TextSection[],
}

/* ------------------------------------------------------------------ Meet the Founder */

export const founder = {
  name: 'Cirus Sumika',
  role: 'Founder & CEO, Sumic IT Solutions Ltd',
  photo: {
    src: '/images/team/cirus-sumika-portrait-1024w.webp',
    srcSet:
      '/images/team/cirus-sumika-portrait-512w.webp 512w, /images/team/cirus-sumika-portrait-1024w.webp 1024w',
    width: 1024,
    height: 1024,
    alt: 'Cirus Sumika, Founder & CEO of Sumic IT Solutions Ltd',
  },
  /** Live: "Cirus Sumika is a visionary techpreneur and mentor who has built a thriving global
   *  career in technology and business innovation." (verbatim) */
  intro:
    'Cirus Sumika is a visionary techpreneur and mentor who has built a thriving global career in technology and business innovation.',
  sections: [
    {
      title: 'From MUBS to Founder & CEO',
      /** Live: "Starting his entrepreneurial journey in 2019 during his time at Makerere University
       *  Business School (MUBS), he is now the Founder & CEO of Sumic IT Solutions Ltd, a prominent
       *  technology firm operating across Africa and Asia." + "The company specializes in mobile
       *  application development, software solutions, digital marketing, and innovative business
       *  solutions for MSMEs & SMEs." */
      paragraphs: [
        'He started his entrepreneurial journey in 2019 while at Makerere University Business School (MUBS). Today he is the Founder & CEO of Sumic IT Solutions Ltd, a prominent technology firm operating across Africa and Asia.',
        'The company specializes in mobile application development, software solutions, digital marketing and innovative business solutions for MSMEs and SMEs.',
      ],
    },
    {
      title: 'Mentoring the next generation',
      /** Live: "Celebrated with numerous awards and accolades for his contributions to innovation,
       *  entrepreneurship, and mentorship, Cirus has inspired and guided over 500,000 youth and
       *  aspiring entrepreneurs across Africa through impactful programs, workshops, and speaking
       *  engagements. His efforts have empowered the next generation to embrace innovation and
       *  entrepreneurship." */
      paragraphs: [
        'Celebrated with numerous awards and accolades for his contributions to innovation, entrepreneurship and mentorship, Cirus has inspired and guided over 500,000 youth and aspiring entrepreneurs across Africa through programs, workshops and speaking engagements, empowering the next generation to embrace innovation and entrepreneurship.',
      ],
    },
    {
      title: 'Writer and advocate',
      /** Live: "He is also a writer and a passionate advocate for leveraging technology to drive
       *  sustainable development. His remarkable story of resilience and creativity has made him a
       *  role model and thought leader in the global tech ecosystem." */
      paragraphs: [
        'He is also a writer and a passionate advocate for using technology to drive sustainable development. His story of resilience and creativity has made him a role model and thought leader in the global tech ecosystem.',
      ],
    },
  ] satisfies TextSection[],
  /** Live: "Explore More" → https://cirussumika.com/ */
  website: {
    label: 'Explore more at cirussumika.com',
    href: 'https://cirussumika.com/',
    external: true,
  },
}

/* ------------------------------------------------------------------ Governance */

export interface TeamImage {
  src: string
  srcSet: string
  width: number
  height: number
}

export interface Person {
  name: string
  role: string
  /** Full-bleed 4:5 portrait (cropped from the square originals in brand-originals/team/). */
  photo: TeamImage
  /**
   * Optional background-removed cut-out (transparent WebP/PNG, 4:5, person standing at the bottom
   * edge). When set, the team card switches to the cut-out style: the person overlaps the name
   * panel, as on the reference design.
   */
  cutout?: TeamImage
  /** Optional link to a bio page (shown under the carousel while this person is in front). */
  bio?: { label: string; href: string }
  /** Optional LinkedIn profile (none are published on the live site yet). */
  linkedin?: string
}

// 4:5 crops (centre, full height) of the 1600×1600 originals, 400w and 800w.
function teamPhoto(file: string): TeamImage {
  return {
    src: `/images/team/${file}-card-800w.webp`,
    srcSet: `/images/team/${file}-card-400w.webp 400w, /images/team/${file}-card-800w.webp 800w`,
    width: 800,
    height: 1000,
  }
}

export interface OrgNode {
  label: string
  children?: readonly OrgNode[]
}

export const governance = {
  structure: {
    title: 'Governance structure',
    /** Live (second sentence of "Governance Structure", verbatim). The first sentence is the hero intro. */
    text: 'Corporate governance is the cornerstone of our business and ensures that we work responsibly.',
    chart: {
      src: '/images/governance/sumic-governance-structure-1600w.webp',
      srcSet:
        '/images/governance/sumic-governance-structure-800w.webp 800w, /images/governance/sumic-governance-structure-1600w.webp 1600w',
      width: 1600,
      height: 1213,
      alt: 'Sumic IT Solutions governance structure chart. A text version follows.',
    },
    textVersionLabel: 'Text version of the governance structure',
    // Read from the chart published on the live /team/ page.
    tree: [
      {
        label: 'Shareholders',
        children: [
          {
            label: 'Advisory Board',
            children: [
              {
                label: 'CEO',
                children: [
                  { label: 'COO', children: [{ label: 'Business Development Lead' }] },
                  {
                    label: 'CTO',
                    children: [
                      {
                        label: 'IT Manager',
                        children: [
                          {
                            label: 'HR Manager',
                            children: [{ label: 'Interns' }, { label: 'Associates' }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'CFO',
                    children: [
                      {
                        label: 'Accountant',
                        children: [
                          {
                            label: 'Product Manager',
                            children: [{ label: 'Production Lead' }, { label: 'Marketing Lead' }],
                          },
                        ],
                      },
                    ],
                  },
                  { label: 'CIO' },
                ],
              },
            ],
          },
        ],
      },
    ] satisfies OrgNode[],
  },
  team: {
    title: 'Management team',
    /** Live (verbatim): "The new creators, visionaries who apply technology in innovative ways to
     *  drive progress in business and the world." */
    intro:
      'The new creators, visionaries who apply technology in innovative ways to drive progress in business and the world.',
    // In front of the carousel on load.
    startWith: 'Cirus Sumika',
    // Order, names and roles as on the live /team/ page.
    people: [
      {
        name: 'Cirus Sumika',
        role: 'Founder & CEO',
        photo: teamPhoto('cirus-sumika'),
        bio: { label: 'Read bio', href: '/cirus-sumika/' },
      },
      {
        name: 'Olive Nankonyoli',
        role: 'Chief Of Operations',
        photo: teamPhoto('olive-nankonyoli'),
      },
      {
        name: 'Julius Mukubya',
        role: 'Business Development Lead',
        photo: teamPhoto('julius-mukubya'),
      },
      { name: 'Mark Musika', role: 'Software Engineer', photo: teamPhoto('mark-musika') },
      { name: 'Rogers Magala', role: 'Software Engineer', photo: teamPhoto('rogers-magala') },
      { name: 'Denis Wawomola', role: 'Software Developer', photo: teamPhoto('denis-wawomola') },
      {
        name: 'Emmanuel Owen Nsubuga',
        role: 'Software Developer',
        photo: teamPhoto('emmanuel-owen-nsubuga'),
      },
      {
        name: 'Ezekiel Abraham Iroot',
        role: 'Software Developer',
        photo: teamPhoto('ezekiel-abraham-iroot'),
      },
      { name: 'Loyce Alinabyona', role: 'Marketing Lead', photo: teamPhoto('loyce-alinabyona') },
    ] satisfies Person[],
  },
}

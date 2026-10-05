import { officePhotos, type Photo } from '@/content/photos'
import { homeAbout, homeProof, type ProcessStep, type Stat, type Statement } from '@/content/home'

/**
 * About page copy (/about/). Source: https://sumicitsolutions.com/about/ (crawled 2026-10-02).
 * Wording is tightened (live original in a JSDoc comment above each rewrite); every claim is from
 * that page. Vision, mission, stats and the lifecycle are shared with the home page.
 */

export interface Milestone {
  year: string
  text: string
}

export type AboutPhoto = Photo

export const about = {
  story: {
    eyebrow: 'Our history',
    title: 'It started with a student looking for a room.',
    /** Live: "Sumic IT Solutions Ltd was founded in 2019 by Cirus Sumika during his time as a
     *  Bachelor of Business Computing student at Makerere University Business School (MUBS). The
     *  company's journey began with an innovative solution inspired by a personal challenge. In
     *  2018, as Cirus joined university, he struggled to find suitable accommodation. This
     *  experience led to the creation of My Hostel Place, a mobile application designed to
     *  digitize accommodation booking for university students, making it easier to search, select,
     *  and book hostels." */
    lead: 'When Cirus Sumika joined Makerere University Business School (MUBS) in 2018, he struggled to find suitable accommodation. So he built My Hostel Place, a mobile app that let university students search, select and book hostels.',
    paragraphs: [
      /** Live: "…Sumic IT Solutions Ltd was founded in 2019 by Cirus Sumika during his time as a
       *  Bachelor of Business Computing student…" / "While the app gained attention during its
       *  pilot phase, the onset of the COVID-19 pandemic disrupted its development. Faced with this
       *  challenge, Sumic pivoted to provide e-commerce solutions that addressed the growing need
       *  for businesses to adapt during the lockdown. This shift resulted in the launch of Sumic
       *  Online, a B2B2C e-commerce platform connecting businesses and consumers seamlessly." */
      'He founded Sumic IT Solutions in 2019, while still a Bachelor of Business Computing student. The app gained attention in its pilot, but the COVID-19 pandemic disrupted its development. Sumic pivoted to e-commerce, helping businesses adapt during the lockdown, and launched Sumic Online, a B2B2C platform connecting businesses and consumers.',
      /** Live: "Originally registered as a general partnership, Sumic transitioned into a limited
       *  company in January 2023, establishing a solid governance structure and professional
       *  management team. The company has since grown into a trusted partner for digital
       *  transformation, offering tailored IT solutions to businesses of all sizes across Uganda
       *  and beyond." */
      'Originally a general partnership, Sumic became a limited company in January 2023, with a solid governance structure and a professional management team. Today we are a trusted digital transformation partner, offering tailored IT solutions to businesses of all sizes across Uganda and beyond.',
      /** Live: "We successfully delivered innovative mobile and web applications as well as
       *  impactful digital transformation projects. On the local front, we are proud to have supported over 150 African businesses with
       *  affordable, scalable, and customized digital solutions, empowering them to grow and
       *  compete in the evolving digital economy" / "We are equally passionate about youth
       *  empowerment and capacity building. Through our internship and mentorship initiatives, we
       *  have trained over 200 interns from various universities in technology and innovation,
       *  with several of them joining our team as full-time staff. Our programs are designed to
       *  prepare young professionals to excel in both local and international markets" */
      'We have delivered mobile and web applications and digital transformation projects, and supported over 150 African businesses with affordable, scalable and customized digital solutions. Through our internship and mentorship programs, we have trained over 200 interns from various universities, and several have joined our team full time.',
    ],
    photo: officePhotos.teamAtWork,
  },
  milestones: {
    title: 'Milestones',
    /** Every year and event is stated on the live page ("Our History"), including: "…being named
     *  Startup of the Year Overall and Startup of the Year in Tech during the Uganda Innovation Week
     *  2022, organized by Startup Uganda, and being honored as the Youth Organization of the Year
     *  2024 by the Private Sector Foundation Uganda." and "In 2025, Sumic IT Solutions Ltd continued
     *  its upward trajectory by expanding our international partnerships, adding two more esteemed
     *  Japanese firms, Lim-Kawano & Company Inc. and KOS LLC to our portfolio alongside existing
     *  collaborators such as FVital Inc., Eftax Co. Ltd, and Japan AI Consulting Cooperation." */
    items: [
      { year: '2018', text: 'Cirus Sumika starts My Hostel Place to digitize hostel booking.' },
      { year: '2019', text: 'Sumic IT Solutions is founded while Cirus studies at MUBS.' },
      {
        year: '2022',
        text: 'Named Startup of the Year Overall and Startup of the Year in Tech at Uganda Innovation Week, organized by Startup Uganda.',
      },
      { year: '2023', text: 'Sumic becomes a limited company in January.' },
      {
        year: '2024',
        text: 'Honored as Youth Organization of the Year by the Private Sector Foundation Uganda.',
      },
      {
        year: '2025',
        text: 'Two more Japanese firms, Lim-Kawano & Company Inc. and KOS LLC, join existing collaborators FVital Inc., Eftax Co. Ltd and Japan AI Consulting Cooperation.',
      },
    ] satisfies Milestone[],
  },
  band: {
    photo: officePhotos.office,
    /** Live: "Our journey is one of growth, resilience, and unwavering commitment to delivering
     *  excellence in technology and innovation." */
    quote:
      'Our journey is one of growth, resilience and commitment to excellence in technology and innovation.',
  },
  objectives: {
    eyebrow: 'Strategic objectives',
    title: 'What we’re working towards',
    vision: homeAbout.vision satisfies Statement,
    mission: homeAbout.mission satisfies Statement,
    valuesTitle: 'Core values',
    // Live: the four values are listed by name only.
    values: ['Innovation', 'Collaboration', 'Integrity', 'Accountability'],
    meaningLink: { label: 'The Sumic meaning', href: '/sumic-meaning/' },
  },
  stats: {
    eyebrow: 'Statistics',
    // Live: "The Impact of Sumic in the Community."
    title: 'The impact of Sumic in the community',
    items: homeProof.stats satisfies readonly Stat[],
  },
  lifecycle: {
    // Live: "Our Development Lifecycle".
    title: 'Our development lifecycle',
    intro: homeProof.process.intro,
    steps: homeProof.process.steps satisfies readonly ProcessStep[],
  },
  partners: {
    title: 'Our partners',
    /** Live (end of "Our History"): "We remain committed to driving innovation, building meaningful
     *  partnerships, and leveraging technology to create a lasting impact in our communities and
     *  the businesses we serve." */
    intro:
      'We remain committed to driving innovation, building meaningful partnerships and using technology to create lasting impact in our communities and the businesses we serve.',
  },
  whyChooseUs: {
    title: 'Why choose us?',
    /** Live: "Using deep domain expertise of our software developers, we create impactful digital
     *  solutions that drive meaningful change with a strategic vision." */
    intro:
      'Our developers’ deep domain expertise goes into digital solutions that drive meaningful change.',
    items: [
      {
        id: '360',
        title: '360 approach',
        /** Live: "From ideation to delivery and ongoing support, we cover the full lifecycle of
         *  enterprise application design, integration and management through our SITS360
         *  framework." (verbatim) */
        text: 'From ideation to delivery and ongoing support, we cover the full lifecycle of enterprise application design, integration and management through our SITS360 framework.',
      },
      {
        id: 'client-centricity',
        title: 'Client-centricity',
        /** Live: "Sumic IT Solution Ltd's boutique format allows us to maintain a highly customized
         *  approach, build a long-term partnership and remain focused on specific tasks at hand." */
        text: 'Our boutique format lets us keep a highly customized approach, build long-term partnerships and stay focused on the task at hand.',
      },
      {
        id: 'domain-expertise',
        title: 'Domain expertise',
        /** Live: "We possess exceptional domain expertise and in-depth knowledge of niche
         *  technologies: from solution architecture to firefighting projects." */
        text: 'Exceptional domain expertise and in-depth knowledge of niche technologies, from solution architecture to firefighting projects.',
      },
      {
        id: 'time-to-market',
        title: 'Time-to-market',
        /** Live: "High level expertise and a number of solutions accelerators enable fast product
         *  rollout, quick customizations, and smooth delivery. As a result, you get reduced
         *  development costs with speedier market entry." */
        text: 'Our expertise and solution accelerators enable fast rollout, quick customization and smooth delivery, so you get lower development costs and a faster market entry.',
      },
      {
        id: 'a-class-team',
        title: 'A-class team',
        /** Live: "With over 3 years of experience, we leverage our deep technology knowledge and
         *  unparalleled software engineering expertise to ensure digital transformation maturity
         *  across the enterprise."
         *  TODO: "over 3 years" is kept as on the live site, but Sumic was founded in 2019. */
        text: 'With over 3 years of experience, we apply deep technology knowledge and software engineering expertise to bring digital transformation maturity across the enterprise.',
      },
    ],
  },
}

export type WhyChooseUsId = (typeof about.whyChooseUs.items)[number]['id']

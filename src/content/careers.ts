import { officePhotos } from '@/content/photos'
import { site } from '@/content/site'
import { mailtoHref } from '@/lib/mailto'

/**
 * Careers page copy (/careers/). Source: https://sumicitsolutions.com/careers/ (crawled
 * 2026-10-02). Wording is tightened (live original in a JSDoc comment above each rewrite); every
 * claim is from that page. The live page lists no open roles.
 */

/* ------------------------------------------------------------------ Applications */

// Exactly as the live page states: "Send your application to: hr@sumicitsolutions.com",
// "CC: careers@sumicitsolutions.com".
export const applicationEmail = {
  to: 'hr@sumicitsolutions.com',
  cc: 'careers@sumicitsolutions.com',
}

/** Subject line for an application: "Application – <role>" or "General application". */
export function applicationSubject(role?: string): string {
  return role ? `Application – ${role}` : 'General application'
}

/** mailto: link to HR (CC careers) with the application subject prefilled. */
export function applicationHref(role?: string): string {
  return mailtoHref({ ...applicationEmail, subject: applicationSubject(role) })
}

/* ------------------------------------------------------------------ Openings */

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Volunteer'

export interface JobOpening {
  id: string
  title: string
  type: JobType
  location: string
  description: string
  /** Defaults to an email to HR with "Application – <title>" as the subject. */
  applyHref?: string
}

/**
 * Current openings. Add only roles Sumic has published; the page shows a "no open roles" state
 * (with the LinkedIn link for job posts) while this list is empty.
 * The live page (2026-10-02) lists none.
 */
export const jobOpenings: readonly JobOpening[] = []

/* ------------------------------------------------------------------ Page copy */

export const careersPage = {
  welcome: {
    // Live: "Welcome To The Sumic Tribe" / "The New Creators, Visionaries who Apply Technology in
    // Innovative Ways to Drive Progress in Business and the World."
    eyebrow: 'Welcome to the Sumic Tribe',
    title: 'Why work at Sumic',
    /** Live: "Are you ready to be part of a team that's redefining the future through
     *  technology-driven innovation?" / "At Sumic IT Solutions Ltd, we're on the lookout for
     *  dynamic individuals who dare to dream, create, and push the boundaries of what's possible.
     *  If you're a visionary who believes in the transformative power of technology, you've come
     *  to the right place. Join us in shaping a brighter tomorrow, one innovation at a time." */
    lead: 'Are you ready to be part of a team that’s redefining the future through technology-driven innovation?',
    paragraphs: [
      'We’re looking for dynamic people who dare to dream, create and push the boundaries of what’s possible. If you believe in the transformative power of technology, you’ve come to the right place.',
      /** Live ("Build Your Future"): "Sumic IT Solutions Ltd is where brilliant people embrace
       *  change and seize opportunities to advance their careers and amplify customer success." */
      'Sumic is where brilliant people embrace change and seize opportunities to advance their careers and amplify customer success.',
    ],
    photo: officePhotos.teamAtWork,
    valuesTitle: 'What we value',
    // The four core values from /about/ ("Strategic Objectives").
    values: ['Innovation', 'Collaboration', 'Integrity', 'Accountability'],
  },
  openings: {
    title: 'Current openings',
    applyLabel: 'Apply',
    empty: {
      title: 'No open roles right now',
      text: 'We post new roles on LinkedIn. Follow Sumic there to see them first, or send us your resume for future opportunities.',
    },
  },
  jobAlerts: {
    /** Live: "Sign up for Job Alerts. Join our Talent Community to get job alerts from Sumic IT
     *  Solutions Ltd delivered to your inbox." with a "Subscribe Now" button that opens the
     *  LinkedIn company page (there is no email sign-up). */
    label: 'Follow Sumic on LinkedIn for job posts',
    href: site.social.find((social) => social.platform === 'linkedin')?.href ?? '',
  },
  generalApplication: {
    // Live: "Send Resume" → hr@.
    label: 'Send your resume',
  },
  internship: {
    eyebrow: 'The Sumic Internship Program',
    title: 'Nurturing talent for a sustainable future',
    /** Live: "At Sumic IT Solutions Ltd, we are more than just a digital transformation solutions
     *  provider in Africa; we are committed to sustainability and social responsibility in every
     *  facet of our business. One of the key ways we manifest this commitment is through our
     *  Internship Programs." / "We believe in nurturing young talent and providing them with the
     *  opportunities they need to flourish and grow. Our internship programs are designed with a
     *  dual purpose: to empower the next generation of professionals with practical experience and
     *  to further our mission of digital transformation in Africa." */
    paragraphs: [
      'We are committed to sustainability and social responsibility in every part of our business, and our internship programs are one of the key ways we show it.',
      'They have a dual purpose: to give the next generation of professionals practical experience, and to further our mission of digital transformation in Africa.',
    ],
    benefitsTitle: 'What sets our internship program apart',
    benefits: [
      {
        id: 'learning',
        title: 'Comprehensive learning',
        /** Live: "Our internship programs are structured to provide students from universities and
         *  tertiary organizations with a holistic understanding of our business practices and the
         *  world of digital transformation. Participants gain hands-on experience working on real
         *  projects under the guidance of seasoned professionals." */
        text: 'Students from universities and tertiary institutions gain a holistic understanding of digital transformation, with hands-on experience on real projects guided by seasoned professionals.',
      },
      {
        id: 'mentorship',
        title: 'Mentorship and guidance',
        /** Live: "We understand that learning doesn't happen in isolation. That's why we provide
         *  dedicated mentors who offer guidance and support throughout the internship. Our mentors
         *  are experienced professionals who are passionate about nurturing talent." */
        text: 'Learning doesn’t happen in isolation. Dedicated mentors, experienced professionals passionate about nurturing talent, support you throughout the internship.',
      },
      {
        id: 'networking',
        title: 'Networking opportunities',
        /** Live: "At Sumic IT Solutions Ltd, we believe that connections are invaluable. Interns
         *  have the opportunity to network with industry experts, other interns, and our staff.
         *  These connections can open doors to future career opportunities." */
        text: 'Network with industry experts, other interns and our staff: connections that can open doors to future career opportunities.',
      },
      {
        id: 'growth',
        title: 'Personal and professional growth',
        /** Live: "We are committed to not only advancing the technical skills of our interns but
         *  also fostering personal growth. Our programs include soft skills training, leadership
         *  development, and a strong emphasis on teamwork." */
        text: 'Beyond technical skills, our programs include soft skills training, leadership development and a strong emphasis on teamwork.',
      },
    ],
    /** Live: "By participating in our internship program, you not only invest in your personal and
     *  professional development but also contribute to the digital transformation journey in
     *  Africa." / "The skills and knowledge you gain here will empower you to be a part of shaping
     *  the future of the continent's technological landscape." */
    closing:
      'By joining, you invest in your own development and contribute to Africa’s digital transformation, with skills that help shape the future of the continent’s technology.',
  },
  howToApply: {
    title: 'How to apply',
    /** Live: "If you are passionate about technology, eager to learn, and ready to make a
     *  difference, Sumic IT Solutions Ltd offers exciting opportunities to help you grow and
     *  thrive." / "We welcome applications for:" */
    intro:
      'If you are passionate about technology, eager to learn and ready to make a difference, we welcome applications for:',
    programs: [
      'Internship Program',
      'Volunteering Program',
      'Graduate Into Entrepreneurship Program',
    ],
    sendTo: 'Send your application to',
    ccLabel: 'CC',
    buttonLabel: 'Email your application',
    academy: {
      title: 'Special entry advantage',
      /** Live: "Students and graduates from the Sumic International Academy receive direct entry
       *  into our Internship, Volunteering, and Graduate Into Entrepreneurship programs. They are
       *  also given first job priority when positions become available at Sumic IT Solutions
       *  Ltd." */
      before: 'Students and graduates of the ',
      linkLabel: 'Sumic International Academy',
      // Live links sumicinternational.academy, which redirects here (same URL as site.products).
      href: 'https://sumicacademy.com/',
      after:
        ' get direct entry into our Internship, Volunteering and Graduate Into Entrepreneurship programs, and first job priority when positions open at Sumic.',
    },
    /** Live: "At Sumic IT Solutions Ltd, we believe that investing in the next generation is not
     *  just a responsibility, it's our commitment to sustainability and progress. Join us in
     *  driving digital transformation in Africa and building a future where innovation thrives." */
    closing:
      'Investing in the next generation is our commitment to sustainability and progress. Join us in driving digital transformation in Africa.',
  },
}

export type InternshipBenefitId = (typeof careersPage.internship.benefits)[number]['id']

import type { ServiceId } from '@/content/services'

/**
 * Services page copy (/services/). Source: https://sumicitsolutions.com/services/ (crawled
 * 2026-10-02). Each description is tightened from the live text, which sits in a JSDoc comment
 * above it; "What's included" lists only items named in that text. Loaded with the Services page
 * chunk only (the short card descriptions for the home page live in services.ts).
 */

export interface ServiceImage {
  src: string
  srcSet: string
  width: number
  height: number
}

export interface ServiceDetail {
  paragraphs: readonly string[]
  included: readonly string[]
  /** The live page's illustration for this service (a branded graphic, 3:2). */
  image: ServiceImage
}

// Live-site illustrations (1500×1000 PNG), converted to WebP. Originals in
// brand-originals/services/. Their lettering repeats the section copy, so they are decorative.
function serviceImage(slug: string): ServiceImage {
  const base = `/images/services/${slug}`
  return {
    src: `${base}-1200w.webp`,
    srcSet: `${base}-600w.webp 600w, ${base}-1200w.webp 1200w`,
    width: 1200,
    height: 800,
  }
}

export const servicesPage = {
  includedTitle: 'What’s included',
  navLabel: 'Services on this page',
  details: {
    'mobile-apps': {
      /** Live: "At Sumic IT Solutions Ltd, we specialize in custom mobile application development for
       *  both Android and iOS platforms. Whether you're a startup or an established enterprise, we
       *  design and build intuitive, performance-driven apps that meet your specific business
       *  needs." / "From wireframes to deployment, we walk with you through every stage, ensuring
       *  responsive design, seamless integration, and a user-friendly interface. Our solutions are
       *  optimized for speed, security, and scalability to give your brand a competitive edge in
       *  the mobile-first world." */
      paragraphs: [
        'We specialize in custom mobile apps for Android and iOS. Whether you’re a startup or an established enterprise, we design and build intuitive, performance-driven apps around your business needs.',
        'From wireframes to deployment, we work with you through every stage. Our apps are optimized for speed, security and scalability, giving your brand a competitive edge in a mobile-first world.',
      ],
      included: [
        'Android and iOS apps',
        'Wireframes through to deployment',
        'Responsive design and a user-friendly interface',
        'Seamless integration',
        'Optimized for speed, security and scalability',
      ],
      image: serviceImage('mobile-app-development'),
    },
    software: {
      /** Live: "Our software development services are designed to transform your ideas into
       *  powerful, functional, and scalable systems. At Sumic IT Solutions Ltd, we develop tailored
       *  desktop, web, and enterprise software that aligns with your operational goals." /
       *  "Whether you're automating internal workflows, developing SaaS platforms, or building
       *  proprietary tools, our agile development approach ensures timely delivery, robust code,
       *  and ongoing support. We focus on user experience, performance, and adaptability to help
       *  your business thrive in the digital age." */
      paragraphs: [
        'We turn your ideas into powerful, functional and scalable systems: tailored desktop, web and enterprise software that fits your operational goals.',
        'Whether you’re automating internal workflows, developing a SaaS platform or building proprietary tools, our agile approach means timely delivery, robust code and ongoing support. We focus on user experience, performance and adaptability.',
      ],
      included: [
        'Desktop, web and enterprise software',
        'Internal workflow automation',
        'SaaS platforms',
        'Proprietary tools',
        'Agile delivery with ongoing support',
      ],
      image: serviceImage('software-development'),
    },
    'ai-models': {
      /** Live: "Artificial Intelligence is reshaping how businesses operate and at Sumic IT Solutions
       *  Ltd, we help you stay ahead through custom AI model development. We build machine learning
       *  models tailored to your data and objectives, including predictive analytics, natural
       *  language processing (NLP), image recognition, recommendation engines, and more." / "Our
       *  team ensures ethical, transparent AI practices and delivers solutions that boost
       *  automation, insights, and decision-making efficiency across your operations." */
      paragraphs: [
        'Artificial intelligence is reshaping how businesses operate. We help you stay ahead with machine learning models tailored to your data and objectives.',
        'Our team follows ethical, transparent AI practices and delivers solutions that improve automation, insight and decision-making across your operations.',
      ],
      included: [
        'Predictive analytics',
        'Natural language processing (NLP)',
        'Image recognition',
        'Recommendation engines',
        'Ethical, transparent AI practices',
      ],
      image: serviceImage('ai-model-development'),
    },
    'data-analysis': {
      /** Live: "Make data your competitive advantage with our comprehensive data analysis services. At
       *  Sumic IT Solutions Ltd, we collect, process, and analyze your business data to identify
       *  trends, reveal patterns, and provide actionable insights." / "From financial data to
       *  customer behavior, our team applies statistical techniques, visualization tools, and
       *  business intelligence platforms to help you understand your performance, forecast future
       *  outcomes, and strategize effectively." */
      paragraphs: [
        'Make data your competitive advantage. We collect, process and analyze your business data to identify trends, reveal patterns and provide actionable insights.',
        'From financial data to customer behavior, we apply statistical techniques, visualization tools and business intelligence platforms so you can understand your performance, forecast outcomes and plan effectively.',
      ],
      included: [
        'Data collection and processing',
        'Trend and pattern analysis',
        'Financial and customer behavior data',
        'Visualization and business intelligence',
        'Forecasting',
      ],
      image: serviceImage('data-analysis'),
    },
    'ites-bpo': {
      /** Live: "Our ITES & BPO services allow businesses to focus on core competencies while we
       *  manage essential IT-driven support functions. Sumic IT Solutions Ltd offers customer
       *  support, back-office operations, data entry, content moderation, and technical support
       *  tailored to your needs." / "With a trained team and modern infrastructure, we ensure
       *  high-quality, cost-effective outsourcing that enhances efficiency, improves turnaround
       *  time, and delivers measurable value. Ideal for businesses seeking to scale smartly without
       *  the operational burden." */
      paragraphs: [
        'Focus on your core business while we manage essential IT-driven support functions, tailored to your needs.',
        'With a trained team and modern infrastructure, we deliver high-quality, cost-effective outsourcing that improves efficiency and turnaround time. Ideal for businesses that want to scale smartly without the operational burden.',
      ],
      included: [
        'Customer support',
        'Back-office operations',
        'Data entry',
        'Content moderation',
        'Technical support',
      ],
      image: serviceImage('ites-bpo'),
    },
    'digital-marketing': {
      /** Live: "At Sumic IT Solutions Ltd, we offer full-suite digital marketing services to help you
       *  connect with your audience, build brand authority, and increase conversions." / "Our
       *  services include SEO, social media management, content creation, PPC campaigns, email
       *  marketing, and analytics reporting. We craft customized strategies based on your business
       *  goals and target audience, ensuring your online presence works for you 24/7." / "With a
       *  balance of creativity and data insights, we help you stay visible, relevant, and
       *  profitable in the digital landscape." */
      paragraphs: [
        'Full-suite digital marketing that helps you connect with your audience, build brand authority and increase conversions.',
        'We craft strategies around your business goals and target audience, so your online presence works for you 24/7. With a balance of creativity and data insight, we help you stay visible, relevant and profitable.',
      ],
      included: [
        'SEO',
        'Social media management',
        'Content creation',
        'PPC campaigns',
        'Email marketing',
        'Analytics reporting',
      ],
      image: serviceImage('digital-marketing'),
    },
  } satisfies Record<ServiceId, ServiceDetail>,
  promise: {
    /** Live heading: "“Timely Quality Products & Services”" */
    title: 'Timely quality products and services',
    /** Live: "Quality results delivered on time, from different professionals of different domains
     *  in the different business sectors." */
    text: 'Quality results, delivered on time by professionals from different domains and business sectors.',
  },
  checklists: {
    title: 'Starting a website or mobile app?',
    intro: 'Fill in a checklist form before we begin. It takes a few minutes and shapes the plan.',
    /** Live button text: "View Form". The accessible name adds the form title. */
    linkLabel: 'Open form',
  },
}

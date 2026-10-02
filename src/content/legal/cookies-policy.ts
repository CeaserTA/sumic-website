import type { LegalDocument } from '@/content/legal/types'

/**
 * Cookies Policy: text verbatim from the live site (crawled 2026-10-02). Do not edit wording.
 * Only structure changed: heading levels, the page title moved to the PageHero, internal links
 * point at the new routes, the dead Microsoft link (kb/278835, 404) is replaced with the current equivalent page, and "What Are Cookies" (/what-are-cookies/) is merged in as the last section.
 */
export const cookiesPolicy: LegalDocument = {
  lastUpdated: 'Last updated: September 05, 2023',
  blocks: [
    {
      type: 'p',
      content: [
        'This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used.',
      ],
    },
    {
      type: 'p',
      content: [
        'Cookies do not typically contain any information that personally identifies a user, but personal information that we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, see our Privacy Policy.',
      ],
    },
    {
      type: 'p',
      content: [
        'We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.',
      ],
    },
    {
      type: 'h2',
      content: ['Interpretation and Definitions'],
      id: 'interpretation-and-definitions',
    },
    {
      type: 'h3',
      content: ['Interpretation'],
    },
    {
      type: 'p',
      content: [
        'The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.',
      ],
    },
    {
      type: 'h3',
      content: ['Definitions'],
    },
    {
      type: 'p',
      content: ['For the purposes of this Cookies Policy:'],
    },
    {
      type: 'ul',
      items: [
        [
          {
            strong: 'Company',
          },
          ' (referred to as either “the Company”, “We”, “Us” or “Our” in this Cookies Policy) refers to Sumic IT Solutions Ltd, Kampala.',
        ],
        [
          {
            strong: 'Cookies',
          },
          ' means small files that are placed on Your computer, mobile device or any other device by a website, containing details of your browsing history on that website among its many uses.',
        ],
        [
          {
            strong: 'Website',
          },
          ' refers to Sumic IT Solutions, accessible from ',
          {
            link: 'https://sumicitsolutions.com/',
            href: '/',
          },
        ],
        [
          {
            strong: 'You',
          },
          ' means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.',
        ],
      ],
    },
    {
      type: 'h2',
      content: ['The use of the Cookies'],
      id: 'the-use-of-the-cookies',
    },
    {
      type: 'h3',
      content: ['Type of Cookies We Use'],
    },
    {
      type: 'p',
      content: [
        'Cookies can be “Persistent” or “Session” Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.',
      ],
    },
    {
      type: 'p',
      content: ['We use both session and persistent Cookies for the purposes set out below:'],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Necessary / Essential Cookies',
        },
      ],
    },
    {
      type: 'p',
      content: ['Type: Session Cookies'],
    },
    {
      type: 'p',
      content: ['Administered by: Us'],
    },
    {
      type: 'p',
      content: [
        'Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Functionality Cookies',
        },
      ],
    },
    {
      type: 'p',
      content: ['Type: Persistent Cookies'],
    },
    {
      type: 'p',
      content: ['Administered by: Us'],
    },
    {
      type: 'p',
      content: [
        'Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.',
      ],
    },
    {
      type: 'h2',
      content: ['Your Choices Regarding Cookies'],
      id: 'your-choices-regarding-cookies',
    },
    {
      type: 'p',
      content: [
        'If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.',
      ],
    },
    {
      type: 'p',
      content: [
        'If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website and some features may not function properly.',
      ],
    },
    {
      type: 'p',
      content: [
        'If You’d like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser.',
      ],
    },
    {
      type: 'p',
      content: [
        'For the Chrome web browser, please visit this page from Google: ',
        {
          link: 'https://support.google.com/accounts/answer/32050',
          href: 'https://support.google.com/accounts/answer/32050',
        },
      ],
    },
    {
      type: 'p',
      content: [
        'For the Internet Explorer web browser, please visit this page from Microsoft: ',
        {
          link: 'https://support.microsoft.com/en-us/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use',
          href: 'https://support.microsoft.com/en-us/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use',
        },
      ],
    },
    {
      type: 'p',
      content: [
        'For the Firefox web browser, please visit this page from Mozilla: ',
        {
          link: 'https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored',
          href: 'https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored',
        },
      ],
    },
    {
      type: 'p',
      content: [
        'For the Safari web browser, please visit this page from Apple: ',
        {
          link: 'https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac',
          href: 'https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac',
        },
      ],
    },
    {
      type: 'p',
      content: ['For any other web browser, please visit your web browser’s official web pages.'],
    },
    {
      type: 'h2',
      content: ['More Information about Cookies'],
      id: 'more-information-about-cookies',
    },
    {
      type: 'p',
      content: [
        'You can learn more about cookies: ',
        {
          link: 'What Are Cookies?',
          href: '#what-are-cookies',
        },
        '.',
      ],
    },
    {
      type: 'h2',
      content: ['Contact Us'],
      id: 'contact-us',
    },
    {
      type: 'p',
      content: ['If you have any questions about this Cookies Policy, You can contact us:'],
    },
    {
      type: 'p',
      content: ['By email: info@sumicitsolutions.com'],
    },
    {
      type: 'p',
      content: [
        'By visiting this page on our website: ',
        {
          link: 'https://sumicitsolutions.com/cookies',
          href: '/cookies-policy/',
        },
      ],
    },
    {
      type: 'p',
      content: ['By phone number: +256 200 930 793'],
    },
    {
      type: 'h2',
      content: ['What are Cookies?'],
      id: 'what-are-cookies',
    },
    {
      type: 'p',
      content: [
        'Cookies are a fundamental aspect of web technology, and they play a crucial role in how websites function and provide a personalized user experience. Here are the details you need to know about cookies for your webpage:',
      ],
    },
    {
      type: 'h3',
      content: ['What Are Cookies?'],
    },
    {
      type: 'p',
      content: [
        'Cookies are small pieces of data that a website stores on a user’s device, typically in the form of text files. These data files contain information about the user’s interactions with the website and can serve various purposes, such as remembering login credentials, tracking user preferences, and enabling personalized content delivery.',
      ],
    },
    {
      type: 'h3',
      content: ['How Do Cookies Work?'],
    },
    {
      type: 'p',
      content: [
        'When a user visits a website, the website’s server sends a request to the user’s browser to store a cookie on their device. The browser then stores this cookie, associating it with the specific website’s domain. The next time the user visits the same website, their browser sends the stored cookie data back to the server. This allows the website to recognize the user and retrieve information relevant to their previous interactions.',
      ],
    },
    {
      type: 'h3',
      content: ['Types of Cookies'],
    },
    {
      type: 'ul',
      items: [
        [
          'Session Cookies: These cookies are temporary and exist only for the duration of a user’s session on a website. They are typically used to store temporary information, like items in a shopping cart, and are deleted when the user closes their browser.',
        ],
        [
          'Persistent Cookies: These cookies have a longer lifespan and remain on the user’s device even after they close their browser. They are often used for purposes like remembering login credentials or user preferences over multiple sessions.',
        ],
        [
          'First-Party Cookies: These cookies are set by the website the user is currently visiting. They are primarily used for site functionality and user experience enhancements.',
        ],
        [
          'Third-Party Cookies: These cookies are set by domains other than the one the user is currently visiting. They are often used for tracking and advertising purposes, such as displaying targeted ads based on the user’s browsing behavior',
        ],
      ],
    },
    {
      type: 'h3',
      content: ['Common Uses of Cookies:'],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Authentication:',
        },
        ' Cookies are frequently used to remember user login sessions, allowing users to stay logged in across multiple pages or visits to a website.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Personalization:',
        },
        ' Cookies can store user preferences, such as language settings or theme preferences, to provide a personalized experience.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Analytics:',
        },
        ' Websites use cookies to collect data on user behavior and gather insights into how users interact with their content.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Shopping Carts:',
        },
        ' E-commerce websites use cookies to maintain shopping cart contents as users browse products and proceed to checkout.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Tracking and Targeting:',
        },
        ' Third-party cookies are often used by advertisers to track user behavior across different websites and deliver targeted ads.',
      ],
    },
    {
      type: 'h3',
      content: ['Privacy Concerns:'],
    },
    {
      type: 'p',
      content: [
        'Cookies have been a topic of privacy concern. To address these concerns, many web browsers now offer privacy features that allow users to block or manage cookies. Additionally, regulations like the European Union’s General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA) have imposed stricter rules on how websites collect and use user data, including cookies.',
      ],
    },
    {
      type: 'h3',
      content: ['How to Manage Cookies:'],
    },
    {
      type: 'ul',
      items: [
        ['Users can manage cookies in their browser settings by blocking or deleting them.'],
        [
          'Websites often include cookie consent pop-ups or banners, allowing users to choose whether to accept cookies.',
        ],
        ['Browser extensions and privacy tools can help users control their cookie settings.'],
      ],
    },
    {
      type: 'p',
      content: [
        'Your webpage about cookies should cover these key points, providing a comprehensive understanding of what cookies are, how they work, their types, common uses, privacy concerns, and ways to manage them. Additionally, you may want to discuss the legal and ethical aspects of cookie usage, especially in light of evolving data privacy regulations.',
      ],
    },
  ],
}

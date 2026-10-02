import type { LegalDocument } from '@/content/legal/types'
import { site } from '@/content/site'

/**
 * Terms of Use: text verbatim from the live site (crawled 2026-10-02). Do not edit wording.
 * Contact email updated to the company's current address (it@sumiconline.com), per the company.
 * Only structure changed: heading levels, the page title moved to the PageHero, internal links
 * point at the new routes.
 */
export const termsOfUse: LegalDocument = {
  lastUpdated: 'Last updated: September 05, 2023',
  blocks: [
    {
      type: 'h2',
      content: ['Terms and Conditions'],
      id: 'terms-and-conditions',
    },
    {
      type: 'p',
      content: ['Please read these terms and conditions carefully before using Our Service.'],
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
      type: 'h2',
      content: ['Definitions'],
      id: 'definitions',
    },
    {
      type: 'p',
      content: ['For the purposes of these Terms and Conditions:'],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Affiliate',
        },
        ' means an entity that controls, is controlled by or is under common control with a party, where “control” means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Country',
        },
        ' refers to: Uganda',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Company',
        },
        ' (referred to as either “the Company”, “We”, “Us” or “Our” in this Agreement) refers to Sumic IT Solutions, New Port Bell Road.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Device',
        },
        ' means any device that can access the Service such as a computer, a cellphone or a digital tablet.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Service',
        },
        ' refers to the Website.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Terms and Conditions',
        },
        ' (also referred as “Terms”) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Third-party Social Media Service',
        },
        ' means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.',
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'Website',
        },
        ' refers to Sumic IT Solutions, accessible from ',
        {
          link: 'https://sumicitsolutions.com/',
          href: '/',
        },
      ],
    },
    {
      type: 'p',
      content: [
        {
          strong: 'You',
        },
        ' means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.',
      ],
    },
    {
      type: 'h2',
      content: ['Acknowledgment'],
      id: 'acknowledgment',
    },
    {
      type: 'p',
      content: [
        'These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.',
      ],
    },
    {
      type: 'p',
      content: [
        'Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.',
      ],
    },
    {
      type: 'p',
      content: [
        'By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.',
      ],
    },
    {
      type: 'p',
      content: [
        'You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.',
      ],
    },
    {
      type: 'p',
      content: [
        'Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.',
      ],
    },
    {
      type: 'h2',
      content: ['Links to Other Websites'],
      id: 'links-to-other-websites',
    },
    {
      type: 'p',
      content: [
        'Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.',
      ],
    },
    {
      type: 'p',
      content: [
        'The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.',
      ],
    },
    {
      type: 'p',
      content: [
        'We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.',
      ],
    },
    {
      type: 'h2',
      content: ['Termination'],
      id: 'termination',
    },
    {
      type: 'p',
      content: [
        'We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.',
      ],
    },
    {
      type: 'p',
      content: ['Upon termination, Your right to use the Service will cease immediately.'],
    },
    {
      type: 'h2',
      content: ['Limitation of Liability'],
      id: 'limitation-of-liability',
    },
    {
      type: 'p',
      content: [
        'Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven’t purchased anything through the Service.',
      ],
    },
    {
      type: 'p',
      content: [
        'To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.',
      ],
    },
    {
      type: 'p',
      content: [
        'Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party’s liability will be limited to the greatest extent permitted by law.',
      ],
    },
    {
      type: 'h2',
      content: ['"AS IS" and "AS AVAILABLE" Disclaimer'],
      id: 'as-is-and-as-available-disclaimer',
    },
    {
      type: 'p',
      content: [
        'The Service is provided to You “AS IS” and “AS AVAILABLE” and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.',
      ],
    },
    {
      type: 'p',
      content: [
        'Without limiting the foregoing, neither the Company nor any of the company’s provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.',
      ],
    },
    {
      type: 'p',
      content: [
        'Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.',
      ],
    },
    {
      type: 'h2',
      content: ['Governing Law'],
      id: 'governing-law',
    },
    {
      type: 'p',
      content: [
        'The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.',
      ],
    },
    {
      type: 'h2',
      content: ['Disputes Resolution'],
      id: 'disputes-resolution',
    },
    {
      type: 'p',
      content: [
        'If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.',
      ],
    },
    {
      type: 'h2',
      content: ['For European Union (EU) Users'],
      id: 'for-european-union-eu-users',
    },
    {
      type: 'p',
      content: [
        'If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.',
      ],
    },
    {
      type: 'h2',
      content: ['United States Legal Compliance'],
      id: 'united-states-legal-compliance',
    },
    {
      type: 'p',
      content: [
        'You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a “terrorist supporting” country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.',
      ],
    },
    {
      type: 'h2',
      content: ['Severability and Waiver'],
      id: 'severability-and-waiver',
    },
    {
      type: 'h3',
      content: ['Severability'],
    },
    {
      type: 'p',
      content: [
        'If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.',
      ],
    },
    {
      type: 'h3',
      content: ['Waiver'],
    },
    {
      type: 'p',
      content: [
        'Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not effect a party’s ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.',
      ],
    },
    {
      type: 'h2',
      content: ['Translation Interpretation'],
      id: 'translation-interpretation',
    },
    {
      type: 'p',
      content: [
        'These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.',
      ],
    },
    {
      type: 'h2',
      content: ['Changes to These Terms and Conditions'],
      id: 'changes-to-these-terms-and-conditions',
    },
    {
      type: 'p',
      content: [
        'We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days’ notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.',
      ],
    },
    {
      type: 'p',
      content: [
        'By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.',
      ],
    },
    {
      type: 'h2',
      content: ['Contact Us'],
      id: 'contact-us',
    },
    {
      type: 'p',
      content: ['If you have any questions about these Terms and Conditions, You can contact us:'],
    },
    {
      type: 'p',
      content: ['By email: ', { link: site.contact.email, href: `mailto:${site.contact.email}` }],
    },
    {
      type: 'p',
      content: [
        'By visiting this page on our website: ',
        {
          link: 'https://sumicitsolutions.com/terms-use',
          href: '/terms-of-use/',
        },
      ],
    },
    {
      type: 'p',
      content: ['By phone number: +256 200 930 793'],
    },
  ],
}

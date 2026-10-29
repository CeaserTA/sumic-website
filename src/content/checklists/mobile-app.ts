import { anyOf, confidentialityNote, helpLine, signOff } from '@/content/checklists/shared'
import type { ChecklistFormDefinition } from '@/content/checklists/types'

/**
 * Mobile App Client Checklist Form.
 * Source: the Google Form (https://forms.gle/bmbxCA1CLruqx9fG6), printed 2026-10-27. Questions,
 * options, order and required flags match it, except these changes approved by Sumic (2026-10-27):
 * - The "1." to "36." numbers are dropped from the labels (ids keep the order: q1 to q36).
 * - Picking "Other (please specify)" (q7, q14, q23) or "Other" (q22) reveals an optional text field.
 * - q13 ("If yes, please share…") shows only after "Yes" to q12.
 * - q36 is one required checkbox (Google: a radio group with the single option "Yes").
 */
export const mobileAppChecklist: ChecklistFormDefinition = {
  id: 'mobile-app',
  title: 'Mobile App Client Checklist Form',
  intro: {
    // The Google Form's second paragraph ("This form is designed…") is the page hero intro.
    paragraphs: [
      'Welcome to Sumic IT Solutions Ltd, mobile application creation client checklist form.',
    ],
    list: {
      lead: 'By filling out this form, you enable our team to:',
      items: [
        'Assess your project requirements accurately',
        'Recommend the most suitable development package',
        'Prepare a customized proposal and quotation',
        'Align timelines and deliverables with your expectations',
      ],
    },
    closing:
      'Please provide as much information as possible. This will help us design and develop a solution that truly reflects your vision and business goals.',
    note: confidentialityNote,
    help: helpLine,
    signOff,
  },
  sections: [
    {
      id: 'basic-information',
      title: 'Basic Information',
      questions: [
        { id: 'q1', type: 'short', label: 'Full Name', required: true, autoComplete: 'name' },
        {
          id: 'q2',
          type: 'short',
          label: 'Company / Organization Name',
          required: true,
          autoComplete: 'organization',
        },
        {
          id: 'q3',
          type: 'short',
          label: 'Designation / Role',
          required: true,
          autoComplete: 'organization-title',
        },
        {
          id: 'q4',
          type: 'short',
          label: 'Email Address',
          required: true,
          format: 'email',
          autoComplete: 'email',
        },
        {
          id: 'q5',
          type: 'short',
          label: 'Phone Number (WhatsApp preferred)',
          required: true,
          format: 'phone',
          autoComplete: 'tel',
        },
        {
          id: 'q6',
          type: 'short',
          label: 'Company Website (if any)',
          format: 'url',
          autoComplete: 'url',
        },
        {
          id: 'q7',
          type: 'multi',
          label: 'How did you hear about Sumic IT Solutions Ltd?',
          required: true,
          options: [
            { label: 'Website' },
            { label: 'Referral' },
            { label: 'Social Media' },
            { label: 'Event' },
            { label: 'Other (please specify)', specify: true },
          ],
        },
      ],
    },
    {
      id: 'project-overview',
      title: 'Project Overview',
      questions: [
        {
          id: 'q8',
          type: 'single',
          label: 'What type of mobile application do you want to develop?',
          required: true,
          options: [
            { label: 'Android' },
            { label: 'iOS' },
            { label: 'Both Android & iOS' },
            { label: 'Not sure yet' },
          ],
        },
        {
          id: 'q9',
          type: 'paragraph',
          label: 'Describe briefly what your app should do.',
          required: true,
        },
        {
          id: 'q10',
          type: 'paragraph',
          label: 'What problem is your app solving or what goal is it meant to achieve?',
          required: true,
        },
        {
          id: 'q11',
          type: 'paragraph',
          label: 'Who are the primary users or target audience for this app?',
          required: true,
        },
        {
          id: 'q12',
          type: 'single',
          label: 'Do you already have a similar app or prototype?',
          required: true,
          options: [{ label: 'Yes' }, { label: 'No' }, { label: 'Not sure yet' }],
        },
        {
          id: 'q13',
          type: 'file',
          label: 'If yes, please share the link or attach screenshots.',
          rules: anyOf(100, 'pdf', 'document', 'image', 'presentation'),
          showIf: { questionId: 'q12', equals: 'Yes' },
        },
      ],
    },
    {
      id: 'key-features',
      title: 'Key Features & Functionalities',
      questions: [
        {
          id: 'q14',
          type: 'multi',
          label: 'What key features do you want in the app?',
          required: true,
          options: [
            { label: 'User registration / login' },
            { label: 'User profile management' },
            { label: 'E-commerce (product listing, cart, checkout)' },
            { label: 'Payment integration (Mobile Money, Visa/Mastercard, etc.)' },
            { label: 'Push notifications' },
            { label: 'Chat / Messaging' },
            { label: 'Booking / Scheduling' },
            { label: 'Location / Map integration' },
            { label: 'Admin Dashboard' },
            { label: 'Analytics / Reporting' },
            { label: 'Multi-language support' },
            { label: 'API integration with external systems' },
            { label: 'Other (please specify)', specify: true },
          ],
        },
        {
          id: 'q15',
          type: 'short',
          label: 'Do you have a preferred design style or color theme?',
          required: true,
        },
        {
          id: 'q16',
          type: 'single',
          label: 'Do you already have UI/UX designs or wireframes?',
          options: [{ label: 'Yes' }, { label: 'No' }, { label: 'Not yet' }],
        },
      ],
    },
    {
      id: 'technical-management',
      title: 'Technical & Management Preferences',
      questions: [
        {
          id: 'q17',
          type: 'single',
          label: 'Do you require backend (database, admin panel, etc.)?',
          required: true,
          options: [{ label: 'Yes' }, { label: 'No' }, { label: 'Not sure' }],
        },
        {
          id: 'q18',
          type: 'short',
          label: 'Do you have hosting or server preferences?',
          required: true,
        },
        {
          id: 'q19',
          type: 'single',
          label:
            'Do you need Sumic IT Solutions Ltd to handle app publishing on Play Store / App Store?',
          required: true,
          options: [{ label: 'Yes' }, { label: 'No' }, { label: 'Not yet sure' }],
        },
        {
          id: 'q20',
          type: 'short',
          label: 'Who will manage content or data entry after launch?',
          required: true,
        },
        {
          id: 'q21',
          type: 'single',
          label: 'Would you like Sumic to provide ongoing maintenance & updates?',
          required: true,
          options: [{ label: 'Yes' }, { label: 'No' }, { label: 'Maybe' }],
        },
      ],
    },
    {
      id: 'business-model',
      title: 'Business Model & Monetization',
      questions: [
        {
          id: 'q22',
          type: 'single',
          label: 'Is your app free, paid, or subscription-based?',
          options: [
            { label: 'Free' },
            { label: 'Paid' },
            { label: 'Subscription-based' },
            { label: 'Other', specify: true },
          ],
        },
        {
          id: 'q23',
          type: 'multi',
          label: 'How do you plan to generate revenue from the app?',
          required: true,
          options: [
            { label: 'Ads' },
            { label: 'In-App Purchases' },
            { label: 'Subscriptions' },
            { label: 'Service Fees / Commissions' },
            { label: 'Not applicable' },
            { label: 'Other (please specify)', specify: true },
          ],
        },
        {
          id: 'q24',
          type: 'single',
          label: 'Do you already have partners or investors for this project?',
          options: [{ label: 'Yes' }, { label: 'No' }, { label: 'In progress' }],
        },
        {
          id: 'q25',
          type: 'paragraph',
          label: 'What are your expected launch goals or milestones?',
          required: true,
        },
      ],
    },
    {
      id: 'timeline-budget',
      title: 'Timeline & Budget',
      questions: [
        {
          id: 'q26',
          type: 'date',
          label: 'When do you want the project to start?',
          required: true,
        },
        { id: 'q27', type: 'date', label: 'What is your target launch date?', required: true },
        {
          id: 'q28',
          type: 'single',
          label: 'What is your estimated budget range?',
          required: true,
          options: [
            { label: 'USD 8,000 - 10,000' },
            { label: 'USD 10,000 - 15,000' },
            { label: 'USD 15,000 - 20,000' },
            { label: 'USD 20,000 - 25,000' },
            { label: 'USD 25,000+' },
          ],
        },
        {
          id: 'q29',
          type: 'single',
          label: 'Would you prefer phased development (MVP first, then full version)?',
          required: true,
          options: [{ label: 'Yes' }, { label: 'No' }],
        },
      ],
    },
    {
      id: 'reference-inspiration',
      title: 'Reference & Inspiration',
      questions: [
        {
          id: 'q30',
          type: 'paragraph',
          label: 'Are there any apps you like and would want us to use as reference?',
          required: true,
        },
        {
          id: 'q31',
          type: 'file',
          label: 'Do you have a logo, brand colors, or identity guidelines to share?',
          rules: anyOf(100, 'pdf', 'document', 'image', 'presentation'),
        },
        {
          id: 'q32',
          type: 'file',
          label: 'Please upload any additional documents, mockups, or concept notes (optional).',
          rules: anyOf(10, 'pdf', 'document', 'image', 'presentation'),
        },
      ],
    },
    {
      id: 'communication',
      title: 'Communication & Follow-Up',
      questions: [
        {
          id: 'q33',
          type: 'multi',
          label: 'What’s your preferred mode of communication?',
          required: true,
          options: [
            { label: 'Email' },
            { label: 'WhatsApp' },
            { label: 'Phone Call' },
            { label: 'Zoom' },
            { label: 'Physical Meeting' },
          ],
        },
        {
          id: 'q34',
          type: 'short',
          label: 'Who should be the main contact person for this project?',
        },
        {
          id: 'q35',
          type: 'paragraph',
          label: 'Any additional notes or clarifications you would like to share?',
        },
        {
          id: 'q36',
          type: 'confirm',
          label: 'I confirm that the information provided is accurate to the best of my knowledge.',
          required: true,
        },
      ],
    },
  ],
}

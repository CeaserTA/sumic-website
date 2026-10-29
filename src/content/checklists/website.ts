import { anyOf, confidentialityNote, helpLine, signOff } from '@/content/checklists/shared'
import type { ChecklistFormDefinition } from '@/content/checklists/types'

/**
 * Website Creation Client Checklist Form.
 * Source: the Google Form (https://forms.gle/tKaBT39AWJqJDHb98), printed 2026-10-27. Questions,
 * options, order and required flags match it, except these changes approved by Sumic (2026-10-27):
 * - Section B: the second "Preferred Fonts / Typography" (a duplicate) is removed.
 * - "Email Address(es)" is required (Google recorded the signed-in account instead).
 * - "If Yes, Provide Domain Name" shows only after "Yes" to "Do You Have a Domain?".
 * - Logo upload accepts PNG, SVG, AI, PDF, JPG and WebP (Google: PDF, document, drawing, image).
 * - "Images or Videos to Include" accepts images and videos (Google: video only, 100 MB) with an
 *   optional link field.
 * - Typo fixes: "(If any, like, brochures" → "(If any, like brochures"; "Any Info documents" →
 *   "Any info documents"; budget options "USD 133 – $267" → "USD 133 – 267" (all six).
 * Section titles are shown in title case (Google: all caps).
 */
export const websiteChecklist: ChecklistFormDefinition = {
  id: 'website',
  title: 'Website Creation Client Checklist Form',
  intro: {
    // The Google Form's second paragraph ("This form is designed…") is the page hero intro.
    paragraphs: [
      'Welcome to Sumic IT Solutions Ltd, website creation client checklist form.',
      'Please take a few minutes to fill it out carefully, your responses will guide our planning, design, development, and branding process to ensure your website truly represents your organization and achieves its goals.',
    ],
    note: confidentialityNote,
    estimatedTime: 'Estimated completion time: 5–8 minutes',
    help: helpLine,
    signOff,
  },
  sections: [
    {
      id: 'business-information',
      title: 'Section A: Business Information',
      questions: [
        {
          id: 'companyName',
          type: 'short',
          label: 'Company / Organization Name',
          required: true,
          autoComplete: 'organization',
        },
        { id: 'tagline', type: 'short', label: 'Business Tagline / Motto' },
        {
          id: 'businessDescription',
          type: 'paragraph',
          label: 'Brief Description of Your Business',
          required: true,
        },
        {
          id: 'productsServices',
          type: 'paragraph',
          label: 'Main Products / Services',
          required: true,
        },
        { id: 'targetAudience', type: 'paragraph', label: 'Target Audience', required: true },
        { id: 'contactNumbers', type: 'short', label: 'Contact Number(s)', autoComplete: 'tel' },
        {
          id: 'emailAddresses',
          type: 'short',
          label: 'Email Address(es)',
          hint: 'Separate several addresses with commas.',
          required: true,
          format: 'emails',
          autoComplete: 'email',
        },
      ],
    },
    {
      id: 'branding-details',
      title: 'Section B: Branding Details',
      questions: [
        {
          id: 'logo',
          type: 'file',
          label: 'Upload Your Logo',
          hint: 'Preferred: PNG/SVG/AI',
          rules: [
            { extensions: ['.png', '.svg', '.ai', '.pdf', '.jpg', '.jpeg', '.webp'], maxMb: 100 },
          ],
        },
        { id: 'brandColors', type: 'short', label: 'Brand Colors (if any)' },
        { id: 'fonts', type: 'short', label: 'Preferred Fonts / Typography' },
        {
          id: 'brandingAssets',
          type: 'file',
          label: 'Upload Other Branding Assets (If any, like brochures, flyers, etc.)',
          rules: anyOf(100, 'pdf', 'document', 'image'),
        },
        {
          id: 'pages',
          type: 'paragraph',
          label: 'List of Pages (e.g., Home, About, Services, Contact, Blog)',
        },
        {
          id: 'media',
          type: 'file',
          label: 'Images or Videos to Include',
          rules: [
            { name: 'Images', extensions: ['.jpg', '.jpeg', '.png', '.webp', '.svg'], maxMb: 10 },
            { name: 'Videos', extensions: ['.mp4', '.mov'], maxMb: 50 },
          ],
          link: {
            label: 'Or paste a link (Google Drive, Dropbox, YouTube)',
            placeholder: 'https://',
          },
        },
        {
          id: 'companyDocuments',
          type: 'file',
          label:
            'Any info documents about the company / organization (e.g., company profile, catalogues)',
          rules: anyOf(100, 'pdf', 'document', 'presentation'),
        },
      ],
    },
    {
      id: 'design-functionality',
      title: 'Section C: Design & Functionality',
      questions: [
        {
          id: 'websiteStyle',
          type: 'short',
          label: 'Preferred Website Style (Modern, Minimal, Corporate, Creative, etc.)',
        },
        { id: 'exampleWebsites', type: 'paragraph', label: 'Example Websites You Like (URLs)' },
        {
          id: 'features',
          type: 'paragraph',
          label: 'Features Needed (e.g., contact form, e-commerce, chatbot, booking system)',
        },
        {
          id: 'integrations',
          type: 'paragraph',
          label: 'Any Special Integrations (e.g., payment gateway, WhatsApp chat, CRM)',
        },
        {
          id: 'languages',
          type: 'single',
          label: 'Languages (Single or Multi-language site)',
          options: [{ label: 'Single' }, { label: 'Multi-language Site' }],
        },
      ],
    },
    {
      id: 'domain-hosting',
      title: 'Section D: Domain & Hosting',
      questions: [
        {
          id: 'hasDomain',
          type: 'single',
          label: 'Do You Have a Domain? (Yes/No)',
          options: [{ label: 'Yes' }, { label: 'No' }],
        },
        {
          id: 'domainName',
          type: 'short',
          label: 'If Yes, Provide Domain Name',
          showIf: { questionId: 'hasDomain', equals: 'Yes' },
        },
        {
          id: 'domainHostingSetup',
          type: 'single',
          label: 'Would You Like Sumic IT Solutions to Handle Domain & Hosting Setup? (Yes/No)',
          options: [{ label: 'Yes' }, { label: 'No' }],
        },
      ],
    },
    {
      id: 'timeline-budget',
      title: 'Section E: Timeline & Budget',
      questions: [
        { id: 'goLiveDate', type: 'date', label: 'Expected Go-Live Date', required: true },
        {
          id: 'budget',
          type: 'single',
          label: 'Budget Range',
          required: true,
          options: [
            { label: 'USD 133 – 267' },
            { label: 'USD 267 – 667' },
            { label: 'USD 667 – 1,067' },
            { label: 'USD 1,067 – 1,467' },
            { label: 'USD 1,467 – 1,867' },
            { label: 'USD 1,867 and above' },
          ],
        },
        {
          id: 'maintenancePlan',
          type: 'single',
          label: 'Maintenance Plan',
          required: true,
          options: [
            { label: 'Weekly' },
            { label: 'Monthly' },
            { label: 'Quarterly' },
            { label: 'Annually' },
          ],
        },
      ],
    },
    {
      id: 'additional-notes',
      title: 'Section F: Additional Notes',
      questions: [
        { id: 'otherRequests', type: 'paragraph', label: 'Any other requests or preferences' },
        {
          id: 'clientName',
          type: 'short',
          label: 'Client Name',
          required: true,
          autoComplete: 'name',
        },
      ],
    },
  ],
}

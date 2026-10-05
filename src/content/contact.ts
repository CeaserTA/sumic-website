import type { ContactSubject } from '@/lib/contact'

/**
 * Contact page copy (/contact/). Source: https://sumicitsolutions.com/contact/ (crawled
 * 2026-10-02): the "Request Free Consultation" form (Name, Email, Message), "Reach Us" details and
 * the Google Maps embed. Business hours are not on the live site, so they are not shown.
 */

export type ContactField = 'name' | 'email' | 'phone' | 'subject' | 'message'

export const contactPage = {
  form: {
    // Live: "Request Free Consultation".
    title: 'Request a free consultation',
    intro: 'Tell us what you need and we’ll get back to you.',
    requiredNote: 'Fields marked * are required.',
    labels: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone (optional)',
      subject: 'Subject',
      message: 'Message',
    } satisfies Record<ContactField, string>,
    placeholders: {
      name: 'Your name…',
      email: 'name@example.com…',
      phone: '+256 700 000 000…',
      message: 'Tell us about your project…',
    },
    subjectLabels: {
      General: 'General enquiry',
      Services: 'Services',
      Partnerships: 'Partnerships',
      Careers: 'Careers',
    } satisfies Record<ContactSubject, string>,
    errors: {
      nameRequired: 'Enter your name.',
      emailRequired: 'Enter your email address.',
      emailInvalid: 'Enter an email address like name@example.com.',
      phoneInvalid: 'Enter a phone number using digits, spaces and an optional +.',
      messageRequired: 'Enter your message.',
      messageShort: 'Add a little more detail (at least 10 characters).',
      summary: (count: number) =>
        count === 1
          ? 'Fix 1 field to send your message.'
          : `Fix ${count} fields to send your message.`,
    },
    // Hidden from people; bots that fill it are dropped (live WPForms used a honeypot too).
    honeypotLabel: 'Leave this field empty',
    submit: 'Send message',
    submitting: 'Sending…',
    success: {
      title: 'Message sent',
      text: 'Thank you. We’ve received your message and will get back to you soon.',
      again: 'Send another message',
    },
    failure:
      'Your message couldn’t be sent. Check your connection and try again, or email us directly.',
  },
  details: {
    // Live: "Get In Touch" / "Reach Us".
    title: 'Reach us',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    socialTitle: 'Follow Sumic',
  },
  map: {
    title: 'Find us',
    open: 'Open in Google Maps',
    iframeTitle: 'Map: Sumic IT Solutions Ltd, New Port Bell Road, Kampala',
    // The live contact page's embed (place: Sumic IT Solutions Ltd.).
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7524076903564!2d32.61445659999999!3d0.3293412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb5ddc2f86b3%3A0xc06eae479fca356b!2sSumic%20IT%20Solutions%20Ltd.!5e0!3m2!1sen!2sug!4v1754856499893!5m2!1sen!2sug',
  },
}

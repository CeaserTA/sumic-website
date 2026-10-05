import { useId, type ReactNode } from 'react'
import { MailIcon, MapPinIcon, PhoneIcon, type LucideIcon } from 'lucide-react'

import { MapEmbed } from '@/components/blocks/MapEmbed'
import { PageHero } from '@/components/blocks/PageHero'
import { SocialIcon } from '@/components/icons/SocialIcon'
import { Section } from '@/components/layout/Section'
import { contactPage } from '@/content/contact'
import { pageById } from '@/content/pages'
import { site } from '@/content/site'
import { ui } from '@/content/ui'
import { ContactForm } from '@/sections/contact/ContactForm'

/**
 * Contact: the consultation form beside the contact details, then the map.
 * No CtaBand: the whole page is the call to action.
 */
export function ContactPage() {
  const page = pageById('contact')
  const home = pageById('home')
  const { details, map } = contactPage
  const { contact } = site
  const socialTitleId = useId()

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={page.hero?.intro}
        breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: page.breadcrumb }]}
      />

      <Section id="get-in-touch">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5 lg:pt-4">
            <h2 className="text-3xl sm:text-4xl">{details.title}</h2>
            <ul className="flex flex-col gap-6">
              <DetailItem icon={MapPinIcon} label={details.addressLabel}>
                <address className="not-italic">
                  {contact.address}
                  <br />
                  {contact.building}
                </address>
              </DetailItem>
              <DetailItem icon={PhoneIcon} label={details.phoneLabel}>
                <a href={contact.phone.href} className={linkClass}>
                  {contact.phone.display}
                </a>
              </DetailItem>
              <DetailItem icon={MailIcon} label={details.emailLabel}>
                <a href={`mailto:${contact.email}`} className={`${linkClass} break-all`}>
                  {contact.email}
                </a>
              </DetailItem>
            </ul>

            <div className="flex flex-col gap-3">
              <h3 id={socialTitleId} className="text-lg">
                {details.socialTitle}
              </h3>
              <ul aria-labelledby={socialTitleId} className="flex flex-wrap gap-2">
                {site.social.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} ${ui.nav.opensInNewTab}`}
                      className="inline-flex size-11 items-center justify-center rounded-full bg-brand-primary/5 text-brand-primary ring-1 ring-brand-line transition-colors hover:bg-brand-primary hover:text-brand-primary-foreground"
                    >
                      <SocialIcon platform={social.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="map" tone="muted" title={map.title}>
        <div className="mt-8 lg:mt-10">
          <MapEmbed
            embedUrl={map.embedUrl}
            mapUrl={contact.mapUrl}
            iframeTitle={map.iframeTitle}
            openLabel={map.open}
          />
        </div>
      </Section>
    </>
  )
}

const linkClass =
  'rounded-sm text-brand-heading underline decoration-brand-line underline-offset-4 transition-colors hover:text-brand-accent-ink hover:decoration-brand-accent-ink'

function DetailItem({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: ReactNode
}) {
  return (
    <li className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent-ink/10 text-brand-accent-ink">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-sm font-medium text-brand-heading">{label}</p>
        <div className="text-lg text-pretty">{children}</div>
      </div>
    </li>
  )
}

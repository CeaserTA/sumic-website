import { useId, type ReactNode } from 'react'
import { ArrowUpRightIcon, MailIcon, MapPinIcon, PhoneIcon, type LucideIcon } from 'lucide-react'

import { SocialIcon } from '@/components/icons/SocialIcon'
import { Container } from '@/components/layout/Container'
import { Logo } from '@/components/layout/Logo'
import { Separator } from '@/components/ui/separator'
import type { Service } from '@/content/services'
import type { SiteContent } from '@/content/site'
import { ui } from '@/content/ui'
import { externalProps, navHref } from '@/lib/nav'
import { cn } from '@/lib/utils'

interface FooterProps {
  site: SiteContent
  services: readonly Service[]
  /** Anchor the services list links to. */
  servicesHref?: string
}

const linkClass =
  'rounded-sm text-brand-primary-foreground/75 transition-colors hover:text-brand-accent'

export function Footer({ site, services, servicesHref = '#services' }: FooterProps) {
  const year = new Date().getFullYear()
  const quickLinksId = useId()
  const servicesId = useId()
  const contactId = useId()
  const socialId = useId()
  const legalId = useId()

  return (
    <footer className="bg-brand-primary text-brand-primary-foreground [--ring:var(--brand-accent)]">
      <Container className="py-16 lg:py-20">
        <div className="flex max-w-4xl flex-col gap-6">
          <span aria-hidden="true" className="h-1 w-12 rounded-full bg-brand-accent" />
          <p className="font-heading text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl">
            {site.vision}
          </p>
        </div>

        <Separator className="my-12 bg-brand-primary-foreground/15 lg:my-16" />

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-4">
            <Logo variant="inverse" className="h-16" />
            <p className="max-w-sm text-brand-primary-foreground/75">{site.summary}</p>
            <div className="flex flex-col gap-3">
              <h2 id={socialId} className="sr-only">
                {ui.footer.social}
              </h2>
              <ul aria-labelledby={socialId} className="flex flex-wrap gap-2">
                {site.social.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} ${ui.nav.opensInNewTab}`}
                      className="inline-flex size-11 items-center justify-center rounded-full bg-brand-primary-foreground/10 text-brand-primary-foreground transition-colors hover:bg-brand-accent hover:text-brand-accent-foreground"
                    >
                      <SocialIcon platform={social.platform} className="size-[1.125rem]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <FooterColumn id={quickLinksId} title={ui.footer.quickLinks} className="lg:col-span-2">
            {site.footer.quickLinks.map((link) => (
              <li key={link.label}>
                <a href={navHref(link)} {...externalProps(link)} className={linkClass}>
                  {link.label}
                  {link.external && <ExternalMark />}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn id={servicesId} title={ui.footer.services} className="lg:col-span-3">
            {services.map((service) => (
              <li key={service.title}>
                <a href={servicesHref} className={linkClass}>
                  {service.shortTitle ?? service.title}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn id={contactId} title={ui.footer.contact} className="lg:col-span-3">
            <ContactItem icon={MapPinIcon}>
              <a
                href={site.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <address className="not-italic">{site.contact.address}</address>
                <span className="sr-only"> {ui.nav.opensInNewTab}</span>
              </a>
            </ContactItem>
            <ContactItem icon={PhoneIcon}>
              <a href={site.contact.phone.href} className={linkClass}>
                {site.contact.phone.display}
              </a>
            </ContactItem>
            <ContactItem icon={MailIcon}>
              <a href={`mailto:${site.contact.email}`} className={cn(linkClass, 'break-all')}>
                {site.contact.email}
              </a>
            </ContactItem>
          </FooterColumn>
        </div>
      </Container>

      <div className="border-t border-brand-primary-foreground/15">
        <Container className="flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-brand-primary-foreground/75">{site.footer.copyright(year)}</p>
          <h2 id={legalId} className="sr-only">
            {ui.footer.legal}
          </h2>
          <ul aria-labelledby={legalId} className="flex flex-wrap gap-x-6 gap-y-2">
            {site.footer.policies.map((link) => (
              <li key={link.label}>
                <a href={navHref(link)} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  )
}

interface FooterColumnProps {
  id: string
  title: string
  className?: string
  children: ReactNode
}

function FooterColumn({ id, title, className, children }: FooterColumnProps) {
  return (
    <div className={className}>
      <h2 id={id} className="mb-5 font-sans text-sm font-semibold text-brand-primary-foreground">
        {title}
      </h2>
      <ul aria-labelledby={id} className="flex flex-col gap-3">
        {children}
      </ul>
    </div>
  )
}

function ContactItem({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-accent" />
      {children}
    </li>
  )
}

function ExternalMark() {
  return (
    <>
      <ArrowUpRightIcon aria-hidden="true" className="ml-1 inline size-3.5 align-[-0.125em]" />
      <span className="sr-only"> {ui.nav.opensInNewTab}</span>
    </>
  )
}

import { useId, type ReactNode } from 'react'
import { CheckIcon, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/motion/Reveal'
import type { ServiceDetail as ServiceDetailContent, ServiceImage } from '@/content/services-page'
import type { Service } from '@/content/services'
import { cn } from '@/lib/utils'

/*
 * One service on the Services page, composed from small parts and exposed as two explicit
 * variants: ServiceDetail (light, text and image side by side from xl, either order) and
 * FeaturedServiceDetail (a navy panel). Each is a <section> with the service's anchor id, so
 * /services/#<anchor> deep-links to it (focusable for ScrollManager).
 */

interface ServiceDetailProps {
  service: Service
  detail: ServiceDetailContent
  icon: LucideIcon
  includedTitle: string
  /** 'eager' for the first section, which can sit in the first viewport. */
  imageLoading?: 'eager' | 'lazy'
}

export function ServiceDetail({
  service,
  detail,
  icon,
  includedTitle,
  imageLoading,
  layout = 'text-first',
}: ServiceDetailProps & {
  /** Which column the image takes from xl up; text always comes first on smaller screens. */
  layout?: 'text-first' | 'image-first'
}) {
  const titleId = useId()

  return (
    <ServiceSection service={service} titleId={titleId} className="py-12 sm:py-14 lg:py-16">
      <div className="grid items-center gap-8 xl:grid-cols-2 xl:gap-12">
        <div className="flex flex-col gap-5">
          <ServiceIcon icon={icon} className="bg-brand-accent-ink/10 text-brand-accent-ink" />
          <ServiceTitle id={titleId} service={service} />
          <ServiceParagraphs paragraphs={detail.paragraphs} />
          <IncludedList
            title={includedTitle}
            items={detail.included}
            titleClassName="text-brand-heading"
            checkClassName="bg-brand-accent-ink/10 text-brand-accent-ink"
          />
        </div>
        <Reveal index={1} className={cn(layout === 'image-first' && 'xl:order-first')}>
          <ServiceIllustration
            image={detail.image}
            loading={imageLoading}
            className="ring-brand-line"
          />
        </Reveal>
      </div>
    </ServiceSection>
  )
}

export function FeaturedServiceDetail({
  service,
  detail,
  icon,
  includedTitle,
  imageLoading,
}: ServiceDetailProps) {
  const titleId = useId()

  return (
    <ServiceSection service={service} titleId={titleId} className="py-4 sm:py-6">
      <div className="relative isolate overflow-hidden rounded-3xl bg-brand-primary p-6 text-brand-primary-foreground [--ring:var(--brand-accent)] sm:p-10 lg:p-12">
        <SwooshArc />
        <div className="flex flex-col gap-5">
          <ServiceIcon icon={icon} className="bg-brand-accent text-brand-accent-foreground" />
          <ServiceTitle
            id={titleId}
            service={service}
            className="max-w-2xl text-brand-primary-foreground"
          />
          <div className="grid gap-8 xl:grid-cols-2 xl:gap-12">
            <div className="flex flex-col gap-6">
              <ServiceParagraphs
                paragraphs={detail.paragraphs}
                className="text-brand-primary-foreground/80"
              />
              <IncludedList
                title={includedTitle}
                items={detail.included}
                titleClassName="text-brand-primary-foreground"
                itemClassName="text-brand-primary-foreground/90"
                checkClassName="bg-brand-accent text-brand-accent-foreground"
              />
            </div>
            <ServiceIllustration
              image={detail.image}
              loading={imageLoading}
              className="self-start ring-brand-primary-foreground/15"
            />
          </div>
        </div>
      </div>
    </ServiceSection>
  )
}

function ServiceSection({
  service,
  titleId,
  className,
  children,
}: {
  service: Service
  titleId: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={service.anchor}
      tabIndex={-1}
      aria-labelledby={titleId}
      className={cn('outline-none', className)}
    >
      {children}
    </section>
  )
}

function ServiceIcon({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={cn('flex size-12 items-center justify-center rounded-xl', className)}>
      <Icon aria-hidden="true" className="size-6" />
    </span>
  )
}

function ServiceTitle({
  id,
  service,
  className,
}: {
  id: string
  service: Service
  className?: string
}) {
  return (
    <h2 id={id} className={cn('text-3xl sm:text-4xl', className)}>
      {service.title}
    </h2>
  )
}

function ServiceParagraphs({
  paragraphs,
  className,
}: {
  paragraphs: readonly string[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-4 text-lg leading-relaxed', className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="max-w-[40rem] text-pretty">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

function IncludedList({
  title,
  items,
  titleClassName,
  itemClassName,
  checkClassName,
}: {
  title: string
  items: readonly string[]
  titleClassName?: string
  itemClassName?: string
  checkClassName?: string
}) {
  const titleId = useId()

  return (
    <div className="flex flex-col gap-3 pt-2">
      <h3 id={titleId} className={cn('text-lg', titleClassName)}>
        {title}
      </h3>
      <ul aria-labelledby={titleId} className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
        {items.map((item) => (
          <li key={item} className={cn('flex items-start gap-3', itemClassName)}>
            <span
              aria-hidden="true"
              className={cn(
                'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full',
                checkClassName,
              )}
            >
              <CheckIcon className="size-3.5" strokeWidth={3} />
            </span>
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The live site's illustration. Decorative: its lettering repeats the section's own copy.
 */
function ServiceIllustration({
  image,
  loading = 'lazy',
  className,
}: {
  image: ServiceImage
  loading?: 'eager' | 'lazy'
  className?: string
}) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes="(min-width: 1280px) 480px, (min-width: 1024px) 70vw, 92vw"
      width={image.width}
      height={image.height}
      alt=""
      loading={loading}
      decoding="async"
      className={cn('aspect-[3/2] w-full rounded-2xl object-cover ring-1', className)}
    />
  )
}

/** Echo of the swoosh in the Sumic logo (decorative). */
function SwooshArc() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 200"
      fill="none"
      className="pointer-events-none absolute -top-6 -right-24 -z-10 w-[26rem] text-brand-accent opacity-25"
    >
      <path
        d="M20 190 C 110 50, 300 10, 390 110"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}

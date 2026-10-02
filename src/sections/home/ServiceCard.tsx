import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { SpotlightCard } from '@/components/effects/SpotlightCard'
import type { Service } from '@/content/services'
import { cn } from '@/lib/utils'

/*
 * Service cards are composed from small parts and exposed as two explicit variants
 * (ServiceCard on light surfaces, FeaturedServiceCard on navy) instead of boolean props.
 * The whole card is clickable through a stretched "Learn more" link.
 */

interface ServiceCardProps {
  service: Service
  icon: LucideIcon
  learnMoreLabel: string
  className?: string
}

interface StandardServiceCardProps extends ServiceCardProps {
  /** Optional decorative visual shown on the right of wide cards (desktop only). */
  visual?: ReactNode
}

export function ServiceCard({
  service,
  icon,
  learnMoreLabel,
  visual,
  className,
}: StandardServiceCardProps) {
  const content = (
    <>
      <ServiceCardIcon icon={icon} className="bg-brand-accent-ink/10 text-brand-accent-ink" />
      <ServiceCardBody service={service} descriptionClassName="text-brand-text" />
      <ServiceCardLink
        service={service}
        label={learnMoreLabel}
        className="text-brand-accent-ink decoration-brand-accent-ink/40"
      />
    </>
  )

  return (
    <ServiceCardFrame className={cn('bg-brand-surface ring-brand-line', className)}>
      {visual ? (
        <div className="flex h-full items-center gap-8">
          <div className="flex h-full min-w-0 flex-1 flex-col gap-5">{content}</div>
          <div aria-hidden="true" className="hidden shrink-0 lg:block">
            {visual}
          </div>
        </div>
      ) : (
        content
      )}
    </ServiceCardFrame>
  )
}

export function FeaturedServiceCard({
  service,
  icon,
  learnMoreLabel,
  className,
}: ServiceCardProps) {
  return (
    <ServiceCardFrame
      // 20% keeps the green link at AA (5.4:1) even at the glow's brightest point.
      spotlightColor="color-mix(in oklab, var(--brand-accent) 20%, transparent)"
      className={cn(
        'bg-brand-primary text-brand-primary-foreground ring-brand-primary [--ring:var(--brand-accent)]',
        className,
      )}
    >
      <OrbitArcs />
      <ServiceCardIcon icon={icon} className="bg-brand-accent text-brand-accent-foreground" />
      <ServiceCardBody
        service={service}
        titleClassName="text-brand-primary-foreground lg:text-3xl"
        descriptionClassName="text-brand-primary-foreground/80 lg:text-lg"
      />
      <ServiceCardLink
        service={service}
        label={learnMoreLabel}
        className="text-brand-accent decoration-brand-accent/50"
      />
    </ServiceCardFrame>
  )
}

function ServiceCardFrame({
  children,
  className,
  spotlightColor,
}: {
  children: ReactNode
  className?: string
  spotlightColor?: string
}) {
  return (
    <SpotlightCard
      spotlightColor={spotlightColor}
      className={cn(
        'flex h-full flex-col gap-5 rounded-2xl p-6 ring-1 transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-primary/10 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring sm:p-8',
        className,
      )}
    >
      {children}
    </SpotlightCard>
  )
}

function ServiceCardIcon({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={cn('flex size-12 items-center justify-center rounded-xl', className)}>
      <Icon aria-hidden="true" className="size-6" />
    </span>
  )
}

function ServiceCardBody({
  service,
  titleClassName,
  descriptionClassName,
}: {
  service: Service
  titleClassName?: string
  descriptionClassName?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className={cn('text-xl text-pretty sm:text-2xl', titleClassName)}>
        {service.shortTitle ?? service.title}
      </h3>
      <p className={cn('max-w-prose text-pretty', descriptionClassName)}>{service.description}</p>
    </div>
  )
}

function ServiceCardLink({
  service,
  label,
  className,
}: {
  service: Service
  label: string
  className?: string
}) {
  return (
    <a
      href={service.href}
      className={cn(
        'mt-auto w-fit rounded-sm font-medium underline underline-offset-4 transition-colors',
        // Stretch the link over the card so the whole card is clickable.
        'after:absolute after:inset-0 after:content-[""]',
        className,
      )}
    >
      {label}
      <span className="sr-only">: {service.shortTitle ?? service.title}</span>
    </a>
  )
}

/** Echo of the swoosh in the Sumic logo. */
function OrbitArcs() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      fill="none"
      // Only on the tall desktop card; on smaller cards it would cross the text.
      className="pointer-events-none absolute -right-16 -bottom-16 -z-10 hidden size-72 text-brand-accent lg:block"
    >
      <circle
        cx="100"
        cy="100"
        r="92"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <path
        d="M30 150 C 60 60, 150 30, 185 80"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

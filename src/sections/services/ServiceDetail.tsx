import { useId } from 'react'
import { CheckIcon, type LucideIcon } from 'lucide-react'

import { AppLink } from '@/components/layout/AppLink'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import type { ServiceDetail as ServiceDetailContent } from '@/content/services-page'
import type { Service } from '@/content/services'
import { cn } from '@/lib/utils'

/**
 * One service section: two-column grid on desktop (text + image, alternating).
 * Each section is full-width with its own padding and a soft alternating background.
 * anchor id + scroll-mt-36 so the sticky tab bar deep-links land correctly.
 */

interface ServiceDetailProps {
  service: Service
  detail: ServiceDetailContent
  icon: LucideIcon
  includedTitle: string
  imageLoading?: 'eager' | 'lazy'
  layout?: 'text-first' | 'image-first'
  index: number
}

export function ServiceDetail({
  service,
  detail,
  icon: Icon,
  includedTitle,
  imageLoading = 'lazy',
  layout = 'text-first',
  index,
}: ServiceDetailProps) {
  const titleId = useId()
  const isEven = index % 2 === 0

  return (
    <section
      id={service.anchor}
      tabIndex={-1}
      aria-labelledby={titleId}
      className={cn(
        'scroll-mt-36 py-16 outline-none lg:py-24',
        isEven ? 'bg-brand-surface-muted' : 'bg-brand-surface',
      )}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* ── Text side ── */}
          <div className={cn('flex flex-col gap-6', layout === 'image-first' && 'lg:order-last')}>

            <span className="flex size-12 items-center justify-center rounded-xl bg-brand-accent-ink/10 text-brand-accent-ink">
              <Icon aria-hidden="true" className="size-6" />
            </span>

            <h2
              id={titleId}
              className="text-3xl sm:text-4xl"
            >
              {service.id === 'ites-bpo' ? (
                <>
                  ITES &amp; BPO{' '}
                  <span className="text-xl font-normal text-brand-text sm:text-2xl">
                    (Information Technology Enabled Services &amp; Business Process Outsourcing)
                  </span>
                </>
              ) : (
                service.title
              )}
            </h2>

            <div className="flex flex-col gap-4">
              {detail.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={cn(
                    'max-w-[40rem] text-pretty',
                    i === 0 ? 'text-lg text-brand-heading' : 'text-base text-brand-text',
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-base font-semibold text-brand-heading">{includedTitle}</h3>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {detail.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-accent-ink/10 text-brand-accent-ink"
                    >
                      <CheckIcon className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-base text-pretty text-brand-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild size="lg" className="h-12 w-fit px-6 text-base">
              <AppLink href="/contact/">Request this service</AppLink>
            </Button>
          </div>

          {/* ── Image side ── */}
          <Reveal index={1} className={cn(layout === 'image-first' && 'lg:order-first')}>
            <img
              src={detail.image.src}
              srcSet={detail.image.srcSet}
              sizes="(min-width: 1024px) 50vw, 92vw"
              width={detail.image.width}
              height={detail.image.height}
              alt=""
              loading={imageLoading}
              decoding="async"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            />
          </Reveal>

        </div>
      </div>
    </section>
  )
}

/** Alias for any legacy import. */
export const FeaturedServiceDetail = ServiceDetail

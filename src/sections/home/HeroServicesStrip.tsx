import { serviceIcons } from '@/components/icons/serviceIcons'
import { AppLink } from '@/components/layout/AppLink'
import { services } from '@/content/services'

/**
 * Strip directly below the hero: all 6 service tiles in a row, no dividers,
 * same navy background as the hero so it reads as one continuous block.
 */
export function HeroServicesStrip() {
  return (
    <div className="bg-brand-primary border-t border-brand-primary-foreground/10">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.id]
            return (
              <li key={service.id}>
                <AppLink
                  href={service.href}
                  className="group flex flex-col gap-1.5 px-4 py-4 transition-colors hover:bg-brand-primary-foreground/5 lg:px-5 lg:py-4"
                >
                  <span className="flex items-center justify-center text-brand-accent sm:justify-start">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold leading-tight text-brand-primary-foreground">
                      {service.shortTitle ?? service.title}
                    </span>
                    <span className="text-xs leading-snug text-brand-primary-foreground/50">
                      {stripDescription(service.description)}
                    </span>
                  </span>
                </AppLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/** Returns just the first short phrase of a description (up to the first comma or full stop). */
function stripDescription(desc: string): string {
  const match = desc.match(/^[^.,]+[.,]?/)
  return match ? match[0].replace(/[.,]$/, '') : desc.slice(0, 50)
}

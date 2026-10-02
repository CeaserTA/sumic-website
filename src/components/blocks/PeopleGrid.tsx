import { SocialIcon } from '@/components/icons/SocialIcon'
import { AppLink } from '@/components/layout/AppLink'
import { Reveal } from '@/components/motion/Reveal'
import type { Person } from '@/content/company'
import { ui } from '@/content/ui'

/**
 * Team members: square photo (same aspect ratio for everyone, lazy-loaded WebP), name, role,
 * and optional bio and LinkedIn links. Names are h3, so place it under a section's h2.
 */
export function PeopleGrid({ people }: { people: readonly Person[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {people.map((person, index) => (
        <Reveal key={person.name} as="li" index={index % 3}>
          <article className="group h-full overflow-hidden rounded-2xl bg-brand-surface ring-1 ring-brand-line transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-primary/10">
            <div className="overflow-hidden bg-brand-surface-muted">
              <img
                src={person.photo.src}
                srcSet={person.photo.srcSet}
                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 30vw, 48vw"
                width={person.photo.width}
                height={person.photo.height}
                alt={`${person.name}, ${person.role}`}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col gap-1 p-4 sm:p-5">
              <h3 className="text-base sm:text-lg">{person.name}</h3>
              <p className="text-sm text-brand-text sm:text-base">{person.role}</p>
              {(person.bio ?? person.linkedin) && (
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {person.bio && (
                    <AppLink
                      href={person.bio.href}
                      className="text-sm font-medium text-brand-accent-ink underline underline-offset-4"
                    >
                      {person.bio.label}
                      <span className="sr-only">: {person.name}</span>
                    </AppLink>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-8 items-center justify-center rounded-full text-brand-primary hover:bg-brand-surface-muted"
                    >
                      <SocialIcon platform="linkedin" className="size-4" />
                      <span className="sr-only">
                        {person.name} on LinkedIn {ui.nav.opensInNewTab}
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  )
}

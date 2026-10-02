import type { Partner } from '@/content/partners'

/**
 * One partner logo, greyscale until hovered. The marquee mounts near view and loads eagerly
 * (lazy images would pop in as the loop slides them in); the static grid loads lazily.
 */
export function PartnerLogo({
  partner,
  loading = 'eager',
}: {
  partner: Partner
  loading?: 'eager' | 'lazy'
}) {
  return (
    <img
      src={partner.logo.src}
      alt={partner.name}
      width={partner.logo.width}
      height={partner.logo.height}
      loading={loading}
      decoding="async"
      className="h-11 w-auto max-w-44 object-contain opacity-85 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
    />
  )
}

/**
 * Static grid of partner logos: the About page, and the home marquee under reduced motion.
 * Render from `confirmedPartners`. Renders nothing while the list is empty.
 */
export function PartnerLogoGrid({
  partners,
  labelledBy,
}: {
  partners: readonly Partner[]
  /** Id of the heading that names the list. */
  labelledBy?: string
}) {
  if (partners.length === 0) return null

  return (
    <ul
      aria-labelledby={labelledBy}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
    >
      {partners.map((partner) => (
        <li
          key={partner.name}
          className="flex h-24 min-w-0 items-center justify-center rounded-2xl bg-brand-surface px-4 ring-1 ring-brand-line [&_img]:max-w-full"
        >
          <PartnerLogo partner={partner} loading="lazy" />
        </li>
      ))}
    </ul>
  )
}

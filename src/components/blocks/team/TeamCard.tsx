import type { ReactNode } from 'react'

import type { Person, TeamImage } from '@/content/company'
import { cn } from '@/lib/utils'

/*
 * One team member: a 4:5 portrait standing on a navy name panel. Two explicit variants, picked by
 * the content: PhotoTeamCard (full-bleed photo, the panel overlaps its lower edge) and
 * CutoutTeamCard (background-removed cut-out that overlaps the panel). Photos are always shown
 * in full colour: no filters or overlays on faces.
 */

interface TeamCardProps {
  person: Person
  /** h3 in lists; a plain paragraph inside the decorative (aria-hidden) coverflow stage. */
  nameAs?: 'h3' | 'p'
  sizes: string
  className?: string
}

/** Chooses the variant: the cut-out style when the person has a cut-out image. */
export function TeamCard(props: TeamCardProps) {
  return props.person.cutout ? (
    <CutoutTeamCard {...props} cutout={props.person.cutout} />
  ) : (
    <PhotoTeamCard {...props} />
  )
}

export function PhotoTeamCard({ person, nameAs, sizes, className }: TeamCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl bg-brand-surface-muted shadow-xl shadow-brand-primary/15',
        className,
      )}
    >
      <TeamImg image={person.photo} sizes={sizes} className="object-cover object-top" />
      <NamePanel person={person} nameAs={nameAs} className="relative -mt-10 rounded-t-2xl" />
    </div>
  )
}

export function CutoutTeamCard({
  person,
  cutout,
  nameAs,
  sizes,
  className,
}: TeamCardProps & { cutout: TeamImage }) {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* The person stands in front of the panel: their lower edge overlaps its top (margin and
          padding percentages are both of the width, so the overlap and the panel padding match). */}
      <TeamImg
        image={cutout}
        sizes={sizes}
        className="relative z-10 -mb-[22%] object-contain object-bottom"
      />
      <NamePanel
        person={person}
        nameAs={nameAs}
        className="rounded-2xl pt-[calc(22%+1rem)] shadow-xl shadow-brand-primary/15"
      />
    </div>
  )
}

function TeamImg({
  image,
  sizes,
  className,
}: {
  image: TeamImage
  sizes: string
  className?: string
}) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      // The name and role are right below, in text.
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn('aspect-[4/5] w-full select-none', className)}
    />
  )
}

function NamePanel({
  person,
  nameAs: Name = 'h3',
  className,
}: {
  person: Person
  nameAs?: 'h3' | 'p'
  className?: string
}): ReactNode {
  return (
    <div className={cn('bg-brand-primary px-5 pt-4 pb-5 text-center', className)}>
      <Name className="font-heading text-xl leading-tight font-bold tracking-[-0.02em] text-balance text-brand-primary-foreground sm:text-2xl">
        {person.name}
      </Name>
      <p className="mt-1.5 text-xs font-medium tracking-[0.14em] text-balance text-brand-accent uppercase sm:text-sm">
        {person.role}
      </p>
    </div>
  )
}

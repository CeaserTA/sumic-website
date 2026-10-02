import type { ProductFeature } from '@/content/home'
import { cn } from '@/lib/utils'

interface ProductScreensProps {
  product: ProductFeature
  /** Which side the phone overlaps, so alternating rows mirror each other. */
  phoneSide: 'start' | 'end'
}

/**
 * Real screenshots of the live product: desktop in a browser frame, mobile in a phone frame.
 * Both are below the fold, so they lazy-load; width/height prevent layout shift.
 */
export function ProductScreens({ product, phoneSide }: ProductScreensProps) {
  const { desktop, mobile } = product.screenshots

  return (
    <figure className="relative mx-auto w-full max-w-xl pb-10 lg:max-w-none">
      <div
        className={cn(
          'overflow-hidden rounded-xl bg-brand-surface shadow-2xl ring-1 shadow-brand-heading/40 ring-brand-primary-foreground/10',
          phoneSide === 'start' ? 'ml-auto w-[92%]' : 'w-[92%]',
        )}
      >
        {/* Browser chrome */}
        <div className="flex h-8 items-center gap-1.5 border-b border-brand-line bg-brand-surface-muted px-3">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-brand-line" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-brand-line" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-brand-line" />
          <span
            translate="no"
            className="ml-3 truncate rounded-full bg-brand-surface px-3 py-0.5 text-xs text-brand-text ring-1 ring-brand-line"
          >
            {product.domain}
          </span>
        </div>
        <img
          src={desktop.src}
          srcSet={desktop.srcSet}
          sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 92vw"
          width={desktop.width}
          height={desktop.height}
          alt={desktop.alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
      </div>

      {/* Phone */}
      <div
        className={cn(
          'absolute bottom-0 w-[30%] max-w-48 rounded-[1.6rem] bg-brand-heading p-1.5 shadow-2xl ring-1 shadow-brand-heading/50 ring-brand-primary-foreground/15',
          phoneSide === 'start' ? 'left-0' : 'right-0',
        )}
      >
        <img
          src={mobile.src}
          srcSet={mobile.srcSet}
          sizes="(min-width: 1024px) 180px, 30vw"
          width={mobile.width}
          height={mobile.height}
          alt={mobile.alt}
          loading="lazy"
          decoding="async"
          className="block aspect-[390/700] h-auto w-full rounded-[1.25rem] object-cover object-top"
        />
      </div>
    </figure>
  )
}

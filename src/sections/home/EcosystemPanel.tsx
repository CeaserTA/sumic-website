import { useId } from 'react'

import type { Product } from '@/content/site'
import { site } from '@/content/site'
import { ui } from '@/content/ui'

interface EcosystemPanelProps {
  title: string
  caption: string
  products: readonly Product[]
}

/** Sumic's own products arranged around the logo, after the live site's ecosystem graphic. */
export function EcosystemPanel({ title, caption, products }: EcosystemPanelProps) {
  const titleId = useId()

  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-brand-primary p-6 text-brand-primary-foreground [--ring:var(--brand-accent)] sm:p-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h3 id={titleId} className="text-2xl text-brand-primary-foreground">
            {title}
          </h3>
          <p className="text-brand-primary-foreground/75">{caption}</p>
        </div>

        <div className="relative isolate">
          {/* Orbit rings centred on the logo (sm and up, where the logo sits in the middle). */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 m-auto hidden size-60 rounded-full border border-dashed border-brand-primary-foreground/20 sm:block"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 m-auto hidden size-72 rounded-full border border-brand-primary-foreground/10 sm:block"
          />
          <div className="mx-auto mb-6 flex size-28 items-center justify-center rounded-full bg-brand-primary-foreground/5 ring-1 ring-brand-primary-foreground/15 sm:absolute sm:inset-0 sm:m-auto">
            <img
              src={site.logo.inverseSrc}
              alt=""
              width={site.logo.width}
              height={site.logo.height}
              loading="lazy"
              decoding="async"
              className="h-14 w-auto"
            />
          </div>

          <ul
            aria-labelledby={titleId}
            className="grid gap-3 sm:grid-cols-2 sm:gap-x-36 sm:gap-y-4"
          >
            {products.map((product) => (
              <li key={product.name} className="sm:even:text-right">
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full flex-col justify-center rounded-xl bg-brand-primary-foreground/5 px-4 py-3 ring-1 ring-brand-primary-foreground/10 transition-colors hover:bg-brand-primary-foreground/10 hover:ring-brand-accent/60"
                >
                  <span translate="no" className="font-semibold">
                    {product.name}
                  </span>
                  <span className="text-sm text-brand-primary-foreground/75">
                    {product.category}
                  </span>
                  <span className="sr-only"> {ui.nav.opensInNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

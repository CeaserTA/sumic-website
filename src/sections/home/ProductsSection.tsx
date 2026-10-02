import { useId } from 'react'
import { ArrowUpRightIcon, CircleCheckIcon } from 'lucide-react'

import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import type { HomeProducts, ProductFeature } from '@/content/home'
import { ui } from '@/content/ui'
import { cn } from '@/lib/utils'
import { ProductScreens } from '@/sections/home/ProductScreens'

interface ProductsSectionProps {
  content: HomeProducts
}

export function ProductsSection({ content }: ProductsSectionProps) {
  return (
    <Section
      id="products"
      eyebrow={content.eyebrow}
      title={content.title}
      subtitle={content.subtitle}
      tone="primary"
      className="bg-hero-glow"
    >
      <div className="mt-10 flex flex-col gap-16 lg:mt-14 lg:gap-24">
        {content.items.map((product, index) => (
          <ProductRow
            key={product.id}
            product={product}
            // Alternate: visual on the right, then on the left.
            visualPosition={index % 2 === 0 ? 'end' : 'start'}
          />
        ))}
      </div>
    </Section>
  )
}

interface ProductRowProps {
  product: ProductFeature
  visualPosition: 'start' | 'end'
}

function ProductRow({ product, visualPosition }: ProductRowProps) {
  const titleId = useId()

  return (
    <article
      aria-labelledby={titleId}
      className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
    >
      <Reveal className={cn('flex flex-col gap-6', visualPosition === 'start' && 'lg:order-2')}>
        <h3
          id={titleId}
          translate="no"
          className="text-3xl font-bold text-brand-primary-foreground sm:text-4xl"
        >
          {product.name}
        </h3>
        <p className="max-w-xl text-lg text-pretty text-brand-primary-foreground/80">
          {product.description}
        </p>
        <ul className="flex max-w-xl flex-col gap-3">
          {product.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <CircleCheckIcon
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-brand-accent"
              />
              <span className="text-brand-primary-foreground/90">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          asChild
          variant="outline-inverse"
          size="lg"
          className="mt-2 h-12 w-fit px-5 text-base"
        >
          <a href={product.href} target="_blank" rel="noopener noreferrer">
            {product.linkLabel}
            <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
            <span className="sr-only"> {ui.nav.opensInNewTab}</span>
          </a>
        </Button>
      </Reveal>
      <Reveal index={1}>
        {/* Phone overlaps on the side facing the text, mirroring between rows. */}
        <ProductScreens product={product} phoneSide={visualPosition === 'end' ? 'start' : 'end'} />
      </Reveal>
    </article>
  )
}

import { ArrowUpRightIcon } from 'lucide-react'

import { AppLink } from '@/components/layout/AppLink'
import { site } from '@/content/site'
import { useReducedMotionPreference } from '@/hooks/useHeavyEffects'

const leftProducts = site.products.slice(0, 3)
const rightProducts = site.products.slice(3, 6)
const cardTops = ['8%', '38%', '68%'] as const
const floatDelays = ['0s', '0.8s', '1.6s', '0.4s', '1.2s', '2s'] as const

interface ProductCardProps {
  name: string
  category: string
  href: string
  floatDelay: string
  reduceMotion: boolean
}

function ProductCard({ name, category, href, floatDelay, reduceMotion }: ProductCardProps) {
  return (
    <AppLink
      href={href}
      style={reduceMotion ? undefined : { animation: 'heroFloat 6s ease-in-out infinite', animationDelay: floatDelay }}
      className="flex w-[172px] items-start justify-between gap-2 rounded-2xl border-[1.5px] border-brand-accent bg-brand-surface px-4 py-3 shadow-lg transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-bold leading-tight text-brand-primary">{name}</span>
        <span className="w-fit rounded-full bg-brand-accent/15 px-2 py-0.5 text-[10px] font-medium text-brand-accent-ink">
          {category}
        </span>
      </div>
      <ArrowUpRightIcon aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand-primary/40" />
    </AppLink>
  )
}

export function HeroVisual() {
  const reduceMotion = useReducedMotionPreference()

  return (
    <>
      {!reduceMotion && (
        <style>{`
          @keyframes heroFloat {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-6px); }
          }
        `}</style>
      )}

      {/* ── DESKTOP ── */}
      <div aria-hidden="true" className="relative hidden lg:block">
        <div className="relative mx-auto" style={{ width: '300px', height: '420px' }}>

          {leftProducts.map((product, i) => (
            <div key={product.name} className="absolute right-[calc(100%-28px)] z-10" style={{ top: cardTops[i] }}>
              <ProductCard name={product.name} category={product.category} href={product.href} floatDelay={floatDelays[i]} reduceMotion={reduceMotion} />
            </div>
          ))}

          <img
            src="/images/services/hero_image.jpg"
            alt="Sumic IT Solutions"
            width={600}
            height={750}
            // @ts-expect-error — fetchpriority valid HTML, not yet in React types
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full rounded-3xl border border-brand-primary-foreground/20 object-cover object-top shadow-2xl shadow-brand-heading/40"
          />

          {rightProducts.map((product, i) => (
            <div key={product.name} className="absolute left-[calc(100%-28px)] z-10" style={{ top: cardTops[i] }}>
              <ProductCard name={product.name} category={product.category} href={product.href} floatDelay={floatDelays[i + 3]} reduceMotion={reduceMotion} />
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="flex flex-col items-center gap-6 lg:hidden">
        <img
          src="/images/services/hero_image.jpg"
          alt="Sumic IT Solutions"
          width={600}
          height={750}
          // @ts-expect-error — fetchpriority valid HTML, not yet in React types
          fetchpriority="high"
          decoding="async"
          className="w-full max-w-sm rounded-3xl border border-brand-primary-foreground/20 object-cover object-top shadow-xl"
        />
        <ul className="grid w-full grid-cols-2 gap-3">
          {site.products.map((product) => (
            <li key={product.name}>
              <AppLink
                href={product.href}
                className="flex h-full flex-col gap-1.5 rounded-2xl border-[1.5px] border-brand-accent bg-brand-surface px-3 py-2.5 shadow-md"
              >
                <span className="text-xs font-bold leading-tight text-brand-primary">{product.name}</span>
                <span className="w-fit rounded-full bg-brand-accent/15 px-2 py-0.5 text-[10px] font-medium text-brand-accent-ink">
                  {product.category}
                </span>
              </AppLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

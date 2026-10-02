import { AppLink } from '@/components/layout/AppLink'
import { site } from '@/content/site'
import { ui } from '@/content/ui'
import { cn } from '@/lib/utils'

interface LogoProps {
  /** `inverse` is the white/green version for dark backgrounds. */
  variant?: 'default' | 'inverse'
  /** Link target; `null` renders the image without a link. */
  href?: string | null
  /** Above-the-fold logos load eagerly with high priority. */
  priority?: boolean
  /** Rendered width hint for srcset selection. */
  sizes?: string
  className?: string
}

export function Logo({
  variant = 'default',
  href = '/',
  priority = false,
  sizes = '(min-width: 1024px) 81px, 64px',
  className,
}: LogoProps) {
  const image = (
    <img
      src={variant === 'inverse' ? site.logo.inverseSrc : site.logo.src}
      srcSet={variant === 'inverse' ? site.logo.inverseSrcSet : site.logo.srcSet}
      sizes={sizes}
      // Inside a link the link's label names it; standalone it needs its own alt.
      alt={href === null ? site.logo.alt : ''}
      width={site.logo.width}
      height={site.logo.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={cn('h-11 w-auto', className)}
    />
  )

  if (href === null) return image

  return (
    <AppLink
      href={href}
      aria-label={ui.nav.homeLink}
      className="inline-flex shrink-0 rounded-md focus-visible:outline-offset-4"
    >
      {image}
    </AppLink>
  )
}

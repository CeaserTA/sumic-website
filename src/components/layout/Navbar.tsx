import { useState } from 'react'
import { m, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRightIcon } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { Logo } from '@/components/layout/Logo'
import { MobileNav } from '@/components/layout/MobileNav'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import type { NavLink } from '@/content/site'
import { ui } from '@/content/ui'
import { dropdownItems, externalProps, navHref } from '@/lib/nav'
import { cn } from '@/lib/utils'

interface NavbarProps {
  links: readonly NavLink[]
  cta: NavLink
  /** Section currently in view; highlights the matching link. */
  activeSectionId?: string | null
  /** Surface behind the navbar before it turns solid. Use `dark` over a navy hero. */
  overlayTone?: 'light' | 'dark'
}

const SOLID_AFTER = 8

export function Navbar({ links, cta, activeSectionId = null, overlayTone = 'light' }: NavbarProps) {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // The bar stays fixed and visible; it only turns solid once the page scrolls.
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > SOLID_AFTER))

  const dark = overlayTone === 'dark' && !solid

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300',
        solid
          ? 'border-brand-line bg-background/85 shadow-[0_1px_12px_-4px] shadow-brand-primary/15 backdrop-blur-md'
          : 'border-transparent bg-transparent',
        dark && 'text-brand-primary-foreground [--ring:var(--brand-accent)]',
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-md bg-background px-4 py-2 font-medium text-brand-heading focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50"
      >
        {ui.skipToContent}
      </a>

      <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <Logo variant={dark ? 'inverse' : 'default'} priority className="h-11 lg:h-14" />

        <NavigationMenu viewport={false} aria-label={ui.nav.label} className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {links.map((link) => (
              <DesktopNavItem
                key={link.label}
                link={link}
                active={!!link.sectionId && link.sectionId === activeSectionId}
                dark={dark}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button asChild variant="accent" size="lg" className="px-3 sm:px-4">
            <a href={navHref(cta)}>{cta.label}</a>
          </Button>
          <MobileNav
            links={links}
            cta={cta}
            activeSectionId={activeSectionId}
            open={mobileOpen}
            onOpenChange={setMobileOpen}
            dark={dark}
          />
        </div>
      </Container>
    </header>
  )
}

interface DesktopNavItemProps {
  link: NavLink
  active: boolean
  dark: boolean
}

function DesktopNavItem({ link, active, dark }: DesktopNavItemProps) {
  const itemClass = cn(
    navigationMenuTriggerStyle(),
    // Active state is the underline only; drop Radix's data-active background.
    'relative bg-transparent data-active:bg-transparent',
    dark &&
      'text-brand-primary-foreground hover:bg-white/10 focus:bg-white/10 data-open:bg-white/10 data-open:hover:bg-white/10 data-open:focus:bg-white/10',
    active && 'font-semibold',
  )
  const indicator = active && (
    <m.span
      layoutId="nav-active-indicator"
      aria-hidden="true"
      className={cn(
        'absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full',
        dark ? 'bg-brand-accent' : 'bg-brand-primary',
      )}
    />
  )

  if (!link.children) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild active={active} className={itemClass}>
          <a
            href={navHref(link)}
            aria-current={active ? 'location' : undefined}
            {...externalProps(link)}
          >
            {link.label}
            {indicator}
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem value={link.label}>
      <NavigationMenuTrigger className={itemClass}>
        {link.label}
        {indicator}
      </NavigationMenuTrigger>
      {/* The dropdown is a light surface, so restore the navy focus ring. */}
      <NavigationMenuContent className="[--ring:var(--brand-primary)]">
        <ul className="flex w-64 flex-col gap-0.5 p-1">
          {dropdownItems(link).map((item) => (
            <li key={item.label}>
              <NavigationMenuLink asChild>
                <a href={navHref(item)} {...externalProps(item)} className="justify-between">
                  {item.label}
                  {item.external && (
                    <>
                      <ArrowUpRightIcon aria-hidden="true" className="text-muted-foreground" />
                      <span className="sr-only">{ui.nav.opensInNewTab}</span>
                    </>
                  )}
                </a>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

import { useRef, type MouseEvent, type RefObject } from 'react'
import { useLocation } from 'react-router'
import { ArrowUpRightIcon } from 'lucide-react'

import { AppLink } from '@/components/layout/AppLink'
import { Logo } from '@/components/layout/Logo'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { NavLink } from '@/content/site'
import { ui } from '@/content/ui'
import { useReducedMotionPreference } from '@/hooks/useHeavyEffects'
import { dropdownItems, externalProps, isActiveLink, isInternalRoute, navHref } from '@/lib/nav'
import { cn } from '@/lib/utils'

export interface MobileNavSheetProps {
  links: readonly NavLink[]
  cta: NavLink
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The menu button in the navbar; focus returns here when the sheet closes. */
  triggerRef: RefObject<HTMLButtonElement | null>
}

const linkClass =
  'flex min-h-11 items-center justify-between gap-2 rounded-lg px-3 text-base font-medium text-brand-heading transition-colors hover:bg-muted'

/**
 * The mobile menu panel (Radix Dialog + Accordion). Loaded on first open by MobileNav, so this
 * code stays out of the startup bundle.
 */
export function MobileNavSheet({
  links,
  cta,
  open,
  onOpenChange,
  triggerRef,
}: MobileNavSheetProps) {
  const reduceMotion = useReducedMotionPreference()
  const { pathname } = useLocation()
  // Section to scroll to once the sheet has closed and released its scroll lock.
  const pendingSection = useRef<string | null>(null)

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, link: NavLink) {
    if (link.sectionId) {
      event.preventDefault()
      pendingSection.current = link.sectionId
    }
    onOpenChange(false)
  }

  function handleCloseAutoFocus(event: Event) {
    const id = pendingSection.current
    const target = id ? document.getElementById(id) : null
    pendingSection.current = null
    if (!target) {
      // No SheetTrigger (the button lives in the navbar), so return focus to it explicitly.
      event.preventDefault()
      triggerRef.current?.focus()
      return
    }
    // Move focus to the section instead of back to the menu button.
    event.preventDefault()
    history.pushState(null, '', `#${id}`)
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    target.focus({ preventScroll: true })
  }

  function renderLink(link: NavLink, nested = false) {
    // Highlight the exact current page (parents with children are accordion triggers).
    const active = isInternalRoute(link.href) && !nested && isActiveLink(link, pathname)
    const current =
      isInternalRoute(link.href) && isActiveLink({ ...link, children: undefined }, pathname)
    return (
      <AppLink
        href={navHref(link)}
        aria-current={current ? 'page' : undefined}
        onClick={(event) => handleLinkClick(event, link)}
        {...externalProps(link)}
        className={cn(
          linkClass,
          nested && 'text-[0.9375rem] font-normal text-brand-text',
          (active || current) && 'bg-brand-surface-muted font-semibold text-brand-primary',
        )}
      >
        {link.label}
        {link.external && (
          <>
            <ArrowUpRightIcon aria-hidden="true" className="size-4 text-muted-foreground" />
            <span className="sr-only">{ui.nav.opensInNewTab}</span>
          </>
        )}
      </AppLink>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-nav-sheet"
        side="right"
        onCloseAutoFocus={handleCloseAutoFocus}
        className="w-[min(22rem,88vw)] gap-0 [--ring:var(--brand-primary)]"
      >
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="sr-only">{ui.nav.menuTitle}</SheetTitle>
          <Logo href={null} className="h-10 self-start" />
        </SheetHeader>

        <nav
          aria-label={ui.nav.label}
          className="flex-1 overflow-y-auto overscroll-contain px-2 py-3"
        >
          <ul className="flex flex-col gap-0.5">
            {links.map((link) =>
              link.children ? (
                <li key={link.label}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={link.label} className="border-none">
                      <AccordionTrigger
                        className={cn(linkClass, 'items-center py-0 hover:no-underline')}
                      >
                        {link.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-1 pl-3 [&_a]:no-underline">
                        <ul className="flex flex-col gap-0.5 border-l border-brand-line pl-2">
                          {dropdownItems(link).map((child) => (
                            <li key={child.label}>{renderLink(child, true)}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
              ) : (
                <li key={link.label}>{renderLink(link)}</li>
              ),
            )}
          </ul>
        </nav>

        <SheetFooter className="border-t">
          <Button asChild variant="accent" size="lg" className="h-11 text-base">
            <AppLink href={navHref(cta)} onClick={(event) => handleLinkClick(event, cta)}>
              {cta.label}
            </AppLink>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

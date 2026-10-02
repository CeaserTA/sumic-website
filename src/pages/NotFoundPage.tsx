import { PageHero } from '@/components/blocks/PageHero'
import { AppLink } from '@/components/layout/AppLink'
import { Button } from '@/components/ui/button'
import { notFoundPage, pageById } from '@/content/pages'
import { site } from '@/content/site'
import { ui } from '@/content/ui'

/** 404: prerendered to dist/404.html and rendered for any unknown client-side route. */
export function NotFoundPage() {
  const home = pageById('home')
  const services = pageById('services')

  return (
    <PageHero
      title={notFoundPage.hero.title}
      intro={notFoundPage.hero.intro}
      breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: notFoundPage.title }]}
    >
      <nav aria-label={ui.notFound.suggestionsTitle} className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="accent" size="lg" className="h-12 px-6 text-base">
          <AppLink href={home.path}>{home.breadcrumb}</AppLink>
        </Button>
        <Button asChild variant="outline-inverse" size="lg" className="h-12 px-6 text-base">
          <AppLink href={services.path}>{services.breadcrumb}</AppLink>
        </Button>
        <Button asChild variant="outline-inverse" size="lg" className="h-12 px-6 text-base">
          <AppLink href={site.cta.href}>{site.cta.label}</AppLink>
        </Button>
      </nav>
    </PageHero>
  )
}

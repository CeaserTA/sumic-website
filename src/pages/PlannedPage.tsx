import { CtaBand } from '@/components/blocks/CtaBand'
import { PageHero } from '@/components/blocks/PageHero'
import { Badge } from '@/components/ui/badge'
import { homeCta } from '@/content/home'
import { pageById, type PageId } from '@/content/pages'
import { ui } from '@/content/ui'

/**
 * Temporary template for routes whose content is built in a later phase: the page's hero
 * (live-site heading and intro) plus the shared CTA band. Development builds show a badge.
 */
export function PlannedPage({ pageId }: { pageId: PageId }) {
  const page = pageById(pageId)
  const home = pageById('home')

  return (
    <>
      <PageHero
        title={page.hero?.title ?? page.title}
        intro={page.hero?.intro}
        breadcrumbs={[{ label: home.breadcrumb, href: home.path }, { label: page.breadcrumb }]}
      >
        {import.meta.env.DEV && <Badge variant="secondary">{ui.plannedPage}</Badge>}
      </PageHero>
      <CtaBand
        title={homeCta.title}
        text={homeCta.text}
        primary={homeCta.primary}
        secondary={homeCta.secondary}
      />
    </>
  )
}

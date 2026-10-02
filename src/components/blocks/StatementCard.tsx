import type { LucideIcon } from 'lucide-react'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Statement } from '@/content/home'

/** Vision / mission card (home "Who we are" and the About page). Title is an h3. */
export function StatementCard({
  statement,
  icon: Icon,
}: {
  statement: Statement
  icon: LucideIcon
}) {
  return (
    // Subtle dark-green tint and border give the two statements more weight than plain cards.
    <Card className="h-full bg-brand-accent-ink/5 ring-brand-accent-ink/25">
      <CardHeader className="gap-4">
        <span className="flex size-12 items-center justify-center rounded-xl bg-brand-accent text-brand-accent-foreground">
          <Icon aria-hidden="true" className="size-6" />
        </span>
        <CardTitle>
          <h3 className="text-xl">{statement.title}</h3>
        </CardTitle>
        <CardDescription className="text-lg text-pretty text-brand-heading">
          {statement.text}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

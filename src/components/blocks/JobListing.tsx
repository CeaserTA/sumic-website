import { useId } from 'react'
import { BriefcaseIcon, MailIcon, MapPinIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { applicationHref, type JobOpening } from '@/content/careers'

/**
 * One open role: title, type, location, short description and an apply link (by default an
 * email to HR, CC careers, with "Application – <title>" as the subject). Title is an h3.
 */
export function JobListing({ job, applyLabel }: { job: JobOpening; applyLabel: string }) {
  const titleId = useId()

  return (
    <article
      aria-labelledby={titleId}
      className="flex flex-col gap-4 rounded-2xl bg-brand-surface p-6 ring-1 ring-brand-line sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:p-8"
    >
      <div className="flex min-w-0 flex-col gap-3">
        <h3 id={titleId} className="text-xl sm:text-2xl">
          {job.title}
        </h3>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-brand-heading">
          <li className="flex items-center gap-1.5">
            <BriefcaseIcon aria-hidden="true" className="size-4 text-brand-accent-ink" />
            {job.type}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPinIcon aria-hidden="true" className="size-4 text-brand-accent-ink" />
            {job.location}
          </li>
        </ul>
        <p className="max-w-prose text-pretty">{job.description}</p>
      </div>
      <Button asChild size="lg" className="h-11 w-fit shrink-0 px-5">
        <a href={job.applyHref ?? applicationHref(job.title)}>
          <MailIcon data-icon="inline-start" aria-hidden="true" />
          {applyLabel}
          <span className="sr-only">: {job.title}</span>
        </a>
      </Button>
    </article>
  )
}

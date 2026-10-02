import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Typography for long-form content (privacy policy, terms, cookies): readable measure,
 * heading rhythm, lists and links. Child selectors keep page markup plain (h2/h3/p/ul/a).
 */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-3xl text-lg leading-relaxed text-brand-text',
        '[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl sm:[&_h2]:text-3xl',
        '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl',
        '[&_p]:my-4 [&_strong]:font-medium [&_strong]:text-brand-heading',
        '[&_li]:my-1.5 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6',
        '[&_a]:font-medium [&_a]:text-brand-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-brand-accent-ink',
        '[&>*:first-child]:mt-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

import { cn } from '@/lib/utils'

/*
 * Small decorative visuals for the wide service cards (desktop only, aria-hidden by the card).
 * Shapes and brand tokens only, no text.
 */

/** Phone outline with a grid of app tiles (Mobile Application Development). */
export function PhoneAppsVisual() {
  const tiles = [
    'bg-brand-accent',
    'bg-brand-primary/15',
    'bg-brand-accent-ink/20',
    'bg-brand-primary/15',
    'bg-brand-primary',
    'bg-brand-accent-ink/20',
    'bg-brand-accent-ink/20',
    'bg-brand-primary/15',
    'bg-brand-accent',
  ]
  return (
    <div className="flex h-48 w-28 flex-col gap-2 rounded-[1.4rem] border-2 border-brand-primary/70 bg-brand-surface p-2.5 shadow-lg shadow-brand-primary/10">
      <span className="mx-auto h-1 w-8 rounded-full bg-brand-primary/40" />
      <div className="grid flex-1 grid-cols-3 content-start gap-2 pt-1">
        {tiles.map((tile, index) => (
          <span key={index} className={cn('aspect-square rounded-md', tile)} />
        ))}
      </div>
      <span className="h-5 rounded-lg bg-brand-surface-muted ring-1 ring-brand-line" />
    </div>
  )
}

/** Rising bars with a trend line (Digital Marketing). */
export function GrowthChartVisual() {
  const bars = ['h-[28%]', 'h-[40%]', 'h-[36%]', 'h-[58%]', 'h-[72%]', 'h-[92%]']
  return (
    <div className="relative flex h-40 w-60 flex-col rounded-xl bg-brand-surface p-4 ring-1 ring-brand-line">
      <div className="relative flex flex-1 items-end gap-2.5 border-b border-brand-line">
        {bars.map((height, index) => (
          <span
            key={height}
            className={cn(
              'flex-1 rounded-t-md',
              height,
              index === bars.length - 1 ? 'bg-brand-accent-ink' : 'bg-brand-primary/15',
            )}
          />
        ))}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          className="absolute inset-0 size-full text-brand-accent-ink"
        >
          <polyline
            points="8,78 25,64 42,66 58,44 75,30 92,8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  )
}

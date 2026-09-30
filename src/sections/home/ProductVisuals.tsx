import { FileTextIcon, MapPinIcon, ShieldCheckIcon, TruckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

/*
 * Decorative product mockups built from skeleton blocks. The only real text is each
 * product's name; everything else is shape, so nothing about the products is invented.
 */

/** Recruiting dashboard: sidebar, ranked applicant list with score bars, and a parsed CV. */
export function TalentKasiVisual({ name }: { name: string }) {
  const scores = ['w-[92%]', 'w-[81%]', 'w-[72%]', 'w-[58%]']

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-lg pb-12 lg:max-w-none">
      <div className="overflow-hidden rounded-2xl bg-brand-surface shadow-2xl ring-1 shadow-brand-heading/40 ring-brand-primary-foreground/10">
        <div className="flex h-9 items-center gap-1.5 border-b border-brand-line bg-brand-surface-muted px-4">
          <span className="size-2.5 rounded-full bg-brand-line" />
          <span className="size-2.5 rounded-full bg-brand-line" />
          <span className="size-2.5 rounded-full bg-brand-line" />
        </div>
        <div className="grid grid-cols-[3rem_1fr] sm:grid-cols-[3.5rem_1fr]">
          <div className="flex flex-col items-center gap-4 bg-brand-primary py-5">
            <span className="size-5 rounded-md bg-brand-accent" />
            <span className="size-4 rounded-sm bg-brand-primary-foreground/30" />
            <span className="size-4 rounded-sm bg-brand-primary-foreground/30" />
            <span className="size-4 rounded-sm bg-brand-primary-foreground/30" />
          </div>
          <div className="flex flex-col gap-4 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span translate="no" className="text-sm font-semibold text-brand-heading">
                {name}
              </span>
              <span className="h-5 w-16 rounded-md bg-brand-accent" />
            </div>
            <ol className="flex flex-col gap-2.5">
              {scores.map((width) => (
                <li
                  key={width}
                  className="flex items-center gap-3 rounded-lg p-2 ring-1 ring-brand-line first:bg-brand-surface-muted"
                >
                  <span className="size-7 shrink-0 rounded-full bg-brand-primary/15" />
                  <span className="flex flex-1 flex-col gap-1.5">
                    <span className="h-2 w-2/3 rounded-full bg-brand-line" />
                    <span className="h-1.5 w-1/3 rounded-full bg-brand-line" />
                  </span>
                  <span className="h-2 w-16 shrink-0 overflow-hidden rounded-full bg-brand-line sm:w-24">
                    <span className={cn('block h-full rounded-full bg-brand-accent-ink', width)} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Parsed CV card */}
      <div className="absolute bottom-0 -left-3 flex w-44 flex-col gap-2 rounded-xl bg-brand-surface p-3 shadow-xl ring-1 shadow-brand-heading/40 ring-brand-line sm:-left-8 sm:w-52">
        <span className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-brand-accent-ink/10 text-brand-accent-ink">
            <FileTextIcon className="size-4" />
          </span>
          <span className="h-2 w-20 rounded-full bg-brand-heading/70" />
        </span>
        <span className="h-1.5 w-full rounded-full bg-brand-line" />
        <span className="h-1.5 w-5/6 rounded-full bg-brand-line" />
        <span className="flex gap-1.5 pt-1">
          <span className="h-4 w-10 rounded-full bg-brand-accent/40" />
          <span className="h-4 w-12 rounded-full bg-brand-accent/40" />
          <span className="h-4 w-8 rounded-full bg-brand-accent/40" />
        </span>
      </div>
    </div>
  )
}

/** Mobile storefront with product tiles, plus secure-payment and delivery-route cards. */
export function SumicOnlineVisual({ name }: { name: string }) {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-lg lg:max-w-none">
      {/* Phone */}
      <div className="absolute inset-y-0 left-[6%] w-[46%] rounded-[2rem] bg-brand-heading p-1.5 shadow-2xl ring-1 shadow-brand-heading/50 ring-brand-primary-foreground/15">
        <div className="flex h-full flex-col gap-3 overflow-hidden rounded-[1.6rem] bg-brand-surface px-3 pt-2 pb-3">
          <span className="mx-auto h-1.5 w-12 rounded-full bg-brand-heading/80" />
          <span translate="no" className="text-xs font-semibold text-brand-heading sm:text-sm">
            {name}
          </span>
          <span className="h-6 rounded-full bg-brand-surface-muted ring-1 ring-brand-line" />
          <div className="grid flex-1 grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((tile) => (
              <span
                key={tile}
                className="flex flex-col gap-1 rounded-lg p-1.5 ring-1 ring-brand-line"
              >
                <span className="flex-1 rounded-md bg-linear-to-br from-brand-primary/80 to-brand-accent-ink/70" />
                <span className="h-1.5 w-3/4 rounded-full bg-brand-line" />
                <span className="h-1.5 w-1/3 rounded-full bg-brand-accent-ink/70" />
              </span>
            ))}
          </div>
          <span className="h-7 rounded-lg bg-brand-accent" />
        </div>
      </div>

      {/* Secure transaction card */}
      <div className="absolute top-[8%] right-0 flex w-[44%] items-center gap-3 rounded-xl bg-brand-surface p-3 shadow-xl ring-1 shadow-brand-heading/40 ring-brand-line">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-accent text-brand-accent-foreground">
          <ShieldCheckIcon className="size-5" />
        </span>
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="h-2 w-full rounded-full bg-brand-heading/70" />
          <span className="h-1.5 w-2/3 rounded-full bg-brand-line" />
        </span>
      </div>

      {/* Logistics route card */}
      <div className="absolute right-[2%] bottom-[10%] flex w-[48%] flex-col gap-3 rounded-xl bg-brand-surface p-3 shadow-xl ring-1 shadow-brand-heading/40 ring-brand-line sm:p-4">
        <div className="flex items-center gap-1.5 text-brand-accent-ink">
          <MapPinIcon className="size-4 shrink-0" />
          <span className="h-0 flex-1 border-t-2 border-dashed border-brand-line" />
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-primary text-brand-primary-foreground">
            <TruckIcon className="size-3.5" />
          </span>
          <span className="h-0 flex-1 border-t-2 border-dashed border-brand-accent-ink/60" />
          <MapPinIcon className="size-4 shrink-0" />
        </div>
        <span className="h-1.5 w-3/4 rounded-full bg-brand-line" />
      </div>
    </div>
  )
}

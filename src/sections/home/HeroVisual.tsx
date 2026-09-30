import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Decorative device composition: a storefront in a browser window plus a mobile app,
 * the two things Sumic builds most. Skeleton blocks only, so it invents no content.
 */
export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-md pb-10 sm:max-w-lg lg:max-w-none"
    >
      {/* Arc echoing the swoosh in the Sumic logo. */}
      <svg
        viewBox="0 0 400 200"
        fill="none"
        className="absolute -top-12 -right-4 w-3/4 text-brand-accent sm:-top-16"
      >
        <path
          d="M20 170 C 110 30, 300 -10, 385 95"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-brand-surface shadow-2xl ring-1 shadow-brand-heading/40 ring-brand-primary-foreground/10"
      >
        <div className="flex h-9 items-center gap-1.5 border-b border-brand-line bg-brand-surface-muted px-4">
          <span className="size-2.5 rounded-full bg-brand-line" />
          <span className="size-2.5 rounded-full bg-brand-line" />
          <span className="size-2.5 rounded-full bg-brand-line" />
          <span className="ml-4 h-5 w-1/2 rounded-full bg-brand-surface ring-1 ring-brand-line" />
        </div>

        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="h-3 w-16 rounded-sm bg-brand-primary" />
            <span className="hidden gap-3 sm:flex">
              <span className="h-2 w-8 rounded-full bg-brand-line" />
              <span className="h-2 w-8 rounded-full bg-brand-line" />
              <span className="h-2 w-8 rounded-full bg-brand-line" />
            </span>
            <span className="h-5 w-14 rounded-md bg-brand-accent" />
          </div>

          <div className="grid grid-cols-5 items-center gap-4">
            <div className="col-span-3 flex flex-col gap-2.5">
              <span className="h-3.5 w-full rounded-sm bg-brand-heading/85" />
              <span className="h-3.5 w-4/5 rounded-sm bg-brand-heading/85" />
              <span className="mt-1 h-2 w-full rounded-full bg-brand-line" />
              <span className="h-2 w-2/3 rounded-full bg-brand-line" />
              <span className="mt-2 h-6 w-20 rounded-md bg-brand-primary" />
            </div>
            <div className="col-span-2 aspect-square rounded-xl bg-linear-to-br from-brand-primary to-brand-accent-ink" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="flex flex-col gap-2 rounded-lg p-2 ring-1 ring-brand-line">
                <span className="aspect-4/3 rounded-md bg-brand-surface-muted" />
                <span className="h-2 w-3/4 rounded-full bg-brand-line" />
                <span className="h-2 w-1/3 rounded-full bg-brand-accent-ink/70" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.8 }}
        className="absolute bottom-0 -left-3 w-[38%] max-w-44 rounded-[1.75rem] bg-brand-heading p-1.5 shadow-2xl ring-1 shadow-brand-heading/50 ring-brand-primary-foreground/15 sm:-left-8"
      >
        <div className="flex flex-col overflow-hidden rounded-[1.4rem] bg-brand-surface">
          <div className="flex h-5 items-center justify-center">
            <span className="h-1.5 w-10 rounded-full bg-brand-heading/80" />
          </div>
          <div className="flex flex-col gap-3 px-3 pt-1 pb-3">
            <span className="h-2.5 w-14 rounded-sm bg-brand-primary" />
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex items-center gap-2">
                <span className="size-8 shrink-0 rounded-md bg-linear-to-br from-brand-primary/80 to-brand-accent-ink/70" />
                <span className="flex flex-1 flex-col gap-1.5">
                  <span className="h-1.5 w-full rounded-full bg-brand-line" />
                  <span className="h-1.5 w-1/2 rounded-full bg-brand-line" />
                </span>
              </div>
            ))}
            <span className="mt-1 h-7 rounded-lg bg-brand-accent" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

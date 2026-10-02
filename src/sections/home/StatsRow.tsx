import { CountUp } from '@/components/effects/CountUp'
import { Reveal } from '@/components/motion/Reveal'
import type { Stat } from '@/content/home'

/** Key figures; each counts up once when it scrolls into view. */
export function StatsRow({ stats }: { stats: readonly Stat[] }) {
  if (stats.length === 0) return null

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
      {stats.map((stat, index) => (
        // The Reveal div is the dt/dd group (a <dl> allows one wrapping div per group).
        // Label comes first in the DOM, the number shows first visually.
        <Reveal
          key={stat.label}
          index={index}
          // column-reverse packs from the bottom; justify-end packs from the top so numbers align.
          className="flex flex-col-reverse justify-end gap-2 border-t-2 border-brand-accent-ink pt-5"
        >
          <dt className="text-pretty text-brand-text">{stat.label}</dt>
          <dd className="font-heading text-5xl leading-none font-bold tracking-[-0.02em] text-brand-primary sm:text-6xl">
            <CountUp to={stat.value} from={stat.from} duration={1.6} delay={index * 0.1} />
            {stat.suffix}
          </dd>
        </Reveal>
      ))}
    </dl>
  )
}

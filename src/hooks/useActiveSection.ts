import { useEffect, useState } from 'react'

/**
 * Returns the id of the section crossing the upper-middle of the viewport.
 * Pass a stable (module-level) array of ids in document order.
 *
 * Tracks elements by id, not by node: sections that mount later (lazy chunks in dev) or are
 * re-created by React (a lazy section re-rendered on the client after prerendering) are
 * re-observed automatically.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const visible = new Set<string>()
    const observed = new Map<string, Element>()

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.target.isConnected) continue
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = ids.find((id) => visible.has(id))
        if (current) setActive(current)
      },
      // A thin band at ~40% of the viewport height decides which section is "in view".
      { rootMargin: '-40% 0px -55% 0px' },
    )

    const sync = () => {
      for (const id of ids) {
        const el = document.getElementById(id)
        const previous = observed.get(id)
        if (el === previous) continue
        if (previous) intersection.unobserve(previous)
        visible.delete(id)
        if (el) {
          intersection.observe(el)
          observed.set(id, el)
        } else {
          observed.delete(id)
        }
      }
    }

    const mutations = new MutationObserver(sync)
    mutations.observe(document.body, { childList: true, subtree: true })
    sync()

    return () => {
      mutations.disconnect()
      intersection.disconnect()
    }
  }, [ids])

  return active
}

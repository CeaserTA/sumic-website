import { useEffect, useState } from 'react'

/**
 * Returns the id of the section crossing the upper-middle of the viewport.
 * Pass a stable (module-level) array of ids in document order.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = ids.find((id) => visible.has(id))
        if (current) setActive(current)
      },
      // A thin band at ~40% of the viewport height decides which section is "in view".
      { rootMargin: '-40% 0px -55% 0px' },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [ids])

  return active
}

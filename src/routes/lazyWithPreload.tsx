import { lazy, type ComponentType } from 'react'

export interface PreloadableComponent<P extends object> {
  (props: P): React.ReactNode
  /** Load the module now; afterwards the component renders without suspending. */
  preload: () => Promise<void>
}

/**
 * React.lazy plus a `preload()`. Once preloaded, the component renders the loaded module
 * directly (no suspension), so main.tsx can preload the current route before hydrating and
 * React hydrates the prerendered HTML in place instead of discarding it.
 */
export function lazyWithPreload<P extends object>(
  load: () => Promise<ComponentType<P>>,
): PreloadableComponent<P> {
  let Loaded: ComponentType<P> | null = null
  const Lazy = lazy(async () => {
    Loaded = await load()
    return { default: Loaded }
  })

  function Component(props: P) {
    return Loaded ? <Loaded {...props} /> : <Lazy {...props} />
  }
  Component.preload = async () => {
    Loaded ??= await load()
  }
  return Component
}

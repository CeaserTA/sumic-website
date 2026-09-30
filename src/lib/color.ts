/**
 * Reads a colour custom property (e.g. `--brand-accent`) from :root and returns it as
 * 0-1 RGB for WebGL, so effects stay in sync with the tokens in index.css.
 * Supports hex values, which is how the brand primitives are defined.
 */
export function cssVarToRgb(name: string): [number, number, number] | null {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const match = /^#([0-9a-f]{6})$/i.exec(value)
  if (!match?.[1]) return null
  const hex = match[1]
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number]
}

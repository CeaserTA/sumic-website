// Post-build step:
// 1. injects the server-rendered App into dist/index.html so the page paints before JS runs
// 2. preloads the critical font file (Satoshi), whose name is content-hashed by Vite
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const indexPath = `${root}dist/index.html`
const ssrDir = `${root}dist-ssr`

const { render } = await import(pathToFileURL(`${ssrDir}/entry-server.js`).href)
let html = await readFile(indexPath, 'utf8')

const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`)
html = html.replace(marker, `<div id="root">${await render()}</div>`)

// Satoshi is the only webfont: one 42 KB variable file for headings and body, used by the
// LCP element (the hero lead paragraph), so it is worth preloading.
const criticalFonts = [/^Satoshi-Variable-.*\.woff2$/]
const assets = await readdir(`${root}dist/assets`)
const preloads = criticalFonts.map((pattern) => {
  const file = assets.find((name) => pattern.test(name))
  if (!file) throw new Error(`prerender: no font matching ${pattern}`)
  return `<link rel="preload" as="font" type="font/woff2" href="/assets/${file}" crossorigin />`
})
html = html.replace('</title>', `</title>\n    ${preloads.join('\n    ')}`)

await writeFile(indexPath, html)
await rm(ssrDir, { recursive: true, force: true })
console.log(`prerender: wrote dist/index.html (+${preloads.length} font preloads)`)

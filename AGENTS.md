# AGENTS.md: Sumic IT Solutions website

Frontend rebuild of https://sumicitsolutions.com/ for Sumic IT Solutions Ltd, a Kampala-based digital
transformation company serving SMEs and MSMEs in Africa.

Stack: Vite + React 19 + TypeScript (strict), Tailwind CSS v4 (CSS-first, `@theme` in
`src/index.css`), shadcn/ui (Radix base), Motion (`motion/react`), lucide-react.

## Commands

| Task          | Command                                                          |
| ------------- | ---------------------------------------------------------------- |
| Dev server    | `npm run dev`                                                    |
| Build         | `npm run build` (type check, client build, SSR build, prerender) |
| Preview build | `npm run preview`                                                |
| Lint          | `npm run lint`                                                   |
| Format        | `npm run format`                                                 |
| Type check    | `npm run typecheck`                                              |

Run `typecheck`, `lint` and `build` before calling any task done.

## Project structure

```
src/
  components/ui/        shadcn primitives (CLI-managed; don't hand-edit unless needed)
  components/effects/   React Bits components (added as source, see below)
  components/layout/    Navbar, MobileNav, Footer, Container, Section, Logo
  components/icons/     brand icons lucide doesn't ship (SocialIcon)
  components/motion/    small Motion helpers (Reveal)
  sections/home/        one file per home page section
  content/              ALL copy and data as typed TS objects
                          site.ts (company, nav, contact), services.ts, partners.ts,
                          home.ts (all home section copy), testimonials.ts, ui.ts (interface labels, a11y names)
  hooks/  lib/  pages/
  entry-server.tsx      build-time prerender entry (see "Rendering and performance")
scripts/prerender.mjs   post-build: injects prerendered HTML and the body-font preload into dist/index.html
public/brand/           logos and brand imagery (pulled from the live site; brand-kit files will replace them)
public/brand/partners/  partner logos
public/brand/products/  real screenshots of Sumic's own products (desktop + phone)
brand-originals/        unmodified source files for everything in public/brand (not served)
```

Import from `src` using the `@/` alias (`@/components/ui/button`).

## Rules

### Code

- TypeScript strict. No `any`, including `as any`. Model unknown data with `unknown` and narrow it.
- Functional components only. Named exports only (no `export default` in `src/`).
- Prefer composition over boolean props: build components from small parts and expose explicit variants (for example `ServiceCard` / `FeaturedServiceCard`), not `featured`/`dark` flags.
- Scroll reveals use `<Reveal>`; inside lists use `<Reveal as="li">` so the markup stays valid.
- Component files use PascalCase (`HeroSection.tsx`). shadcn's kebab-case files in `components/ui/` are the exception.

### Content

- All copy lives in `src/content/`. Sections receive data through props. No hardcoded strings in JSX.
- Interface labels and accessible names ("Open menu", "Skip to content") live in `src/content/ui.ts`.
- Render partners from `confirmedPartners` (it excludes entries whose name is still `TODO:`), never from `partners` directly.
- Content comes from sumicitsolutions.com. **Never invent clients, testimonials, stats or awards.** If something is missing, use a clearly marked `TODO:` placeholder.
- **Sample testimonials never ship.** Fictional testimonials for layout work must have `isSample: true` and be defined inside the `import.meta.env.DEV` branch in `src/content/testimonials.ts`. Render only `visibleTestimonials`, which excludes samples in production. Production builds must contain no sample text, and the testimonials block stays hidden until real, consented testimonials are added to `realTestimonials`. In dev, samples show a "Sample content" badge.

### Styling

- Tailwind utilities only. Inline `style` is allowed only for dynamic values (for example, a computed transform).
- Use brand tokens (`bg-brand-primary`, `text-brand-accent-ink`, `bg-primary`, etc.). **Never write raw hex values in components.** Colours are defined once in `src/index.css`.
- Colour contrast facts:
  - `brand-accent` (#1EEF0F green) fails contrast on white. Use it as a background with `brand-accent-foreground` (navy) text, or on navy backgrounds.
  - For green text or icons on light surfaces, use `brand-accent-ink`.
  - Focus rings use `ring` (navy). On dark surfaces, set `[--ring:var(--brand-accent)]` on the container so rings turn green.
- The primary CTA uses `<Button variant="accent">` (green with navy text), a project addition to the shadcn button.
- Font: **Satoshi** (Indian Type Foundry, ITF Free Font License) for headings and body. It's self-hosted as one variable woff2 file (weights 300–900) in `src/assets/fonts/satoshi/`, with its licence in `LICENSE-FFL.txt`. The licence forbids redistributing the font files, so don't put them in a public repository or font service. Headings: weight 700, letter-spacing -0.02em, line-height 1.05 (set in the base layer; don't override per heading). Body: weight 400, 500 for emphasis. Hero h1 tops out around 76px.
- Vertical rhythm: sections use `py-12 sm:py-16 lg:py-22` (the `Section` component); keep custom bands on the same scale.
- Light mode only for now. Dark mode will override the brand-role and semantic token layers in `src/index.css`; don't hardcode light-only colours in components.

### Responsive

- Mobile-first. Every view must look right at **360px, 768px, 1280px and 1536px**.

### Accessibility

- Semantic HTML and landmarks. Exactly one `h1` per page, with no skipped heading levels.
- Meaningful `alt` text; `alt=""` for decorative images.
- Visible focus states. Never remove an outline without replacing it.
- WCAG AA contrast.
- Full keyboard navigation, including menus, sheets and accordions.

### Animation

- Use Motion for scroll reveals and micro-interactions, via the lightweight `m.*` components (`import { m } from 'motion/react'`). App.tsx wraps everything in `<LazyMotion strict>`, which loads the animation engine as a separate chunk; a full `motion.*` component throws in strict mode.
- Above-the-fold entrance animations (hero headline, hero visual) use CSS keyframes (`animate-blur-in`, `animate-rise-in` in `index.css`) so they start on first paint of the prerendered HTML.
- Every animation respects `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` for Motion, the global CSS safety net for CSS animations).
- Continuous motion longer than 5 seconds (hero background, logo marquee) needs a visible pause control (WCAG 2.2.2).
- Heavy effects (WebGL/canvas backgrounds) are lazy-loaded (`React.lazy` + `Suspense`). At most one heavy effect per viewport.

### Performance

- Images in WebP/AVIF, with explicit `width` and `height`, and `srcSet`/`sizes` when shown much smaller than the file.
- Lazy-load everything below the fold (`loading="lazy"`, `decoding="async"`).
- Target Lighthouse 90+ in every category.

### Rendering and performance

- **Prerendered HTML.** `npm run build` renders the app to static HTML (`src/entry-server.tsx`, `scripts/prerender.mjs`); the client hydrates it (`hydrateRoot` in `main.tsx`). Dev renders client-side only.
- **Hydration must match.** The first client render must equal the server render. Never read `window`, `document`, `navigator` or `matchMedia` during render. Use `useMediaQuery` / `useReducedMotionPreference` / `useHeavyEffects` (they return the server value during hydration, then update), or read in effects and handlers.
- **Below-the-fold sections are lazy chunks** (`React.lazy` + `Suspense` in `HomePage.tsx`). The prerender waits for them, so the HTML is complete.
- **Keep HomePage static.** State that changes after load (like the active nav section) lives in small child components (`SiteNavbar`). Updates pushed into sections that are still hydrating make React throw away their prerendered DOM and re-render them.
- **Below-the-fold blocks use `defer-render`** (`content-visibility: auto`) so the browser skips their layout until they are near view.
- **Measuring:** Lighthouse's default simulated mobile throttling is unreliable against localhost (the JS arrives instantly and gets counted as render-blocking). Measure mobile with `--throttling-method=devtools`, or with PageSpeed Insights on the deployed site.

### Navigation

- The navbar is fixed and always visible. It turns solid with a blur after the page scrolls; it never hides on scroll.

- `NavLink.href` is the canonical page URL. `NavLink.sectionId` maps a link to a home page section; `navHref()` in `src/lib/nav.ts` resolves such links to `#<sectionId>` while the home page is the only page.
- Every home section is a `<Section id=...>`, and its id must be listed in `homeSectionIds` for active-link tracking.

### Product screenshots

- The products section shows real screenshots of each live product (`public/brand/products/`), not drawn mockups. Capture desktop at 1440×900 and phone at 390×844 @2x, dismiss cookie banners with "Reject all", wait for images, then convert to WebP (desktop 1440w/720w, phone 780w/390w). Keep originals in `brand-originals/products/`.
- Re-capture when a product's homepage changes (see the TODO in `src/content/home.ts`).

### React Bits

React Bits is not an npm package. Add components as source with
`npx shadcn@latest add @react-bits/<Component>-TS-TW`, then move them into `src/components/effects/`.
Only add a component when a section needs it.

After adding one:

- **Check `package.json`.** Registry items pin old dependency ranges (BlurText pins `motion@^12` and downgrades Motion). Restore the project's versions.
- **Adapt it to project rules:** named export, no `'use client'`, no `React.FC`, strict-safe indexing, Tailwind classes instead of inline styles, no ref writes during render.
- **WebGL/canvas backgrounds** must use ogl or plain canvas (never three.js). Load them with `React.lazy` + `Suspense` behind `useHeavyEffects()`, which is off for reduced motion, screens under 768px and low-end devices. Always render a static CSS fallback first (see `bg-hero-glow` in `index.css`).
- **Effect colours** come from tokens at runtime via `cssVarToRgb('--brand-accent')`, never hard-coded RGB.

## Agent skills

Project skills are installed in `.claude/skills/` and locked in `skills-lock.json`. Consult them before building UI or reviewing code:

- `frontend-design`: visual direction and typography; avoiding templated designs.
- `vercel-react-best-practices`: React performance rules.
- `vercel-composition-patterns`: component API and composition.
- `web-design-guidelines`: UI/UX/a11y review. Use it **only as a reviewer at the end of a phase**, not while building. It fetches its rules from GitHub at runtime.
- `shadcn`: shadcn CLI, components and styling.

Don't install additional skills without asking the project owner.

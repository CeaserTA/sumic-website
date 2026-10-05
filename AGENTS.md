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
  components/layout/    SiteLayout, Navbar, MobileNav (+ lazy MobileNavSheet), Footer, Container, Section,
                        Logo, AppLink, BackToTop, ScrollManager, RouteMeta
  components/blocks/    shared page blocks: PageHero, CtaBand, FeatureList, Prose, LegalDocument,
                        TableOfContents, OrgTree, team/ (TeamCarousel, TeamCard), StatementCard, PartnerLogos (logo + static grid),
                        CaseStudyCard, JobListing, MapEmbed (lazy Google map), FaqAccordion
  components/icons/     brand icons lucide doesn't ship (SocialIcon); serviceIcons (one icon per service)
  components/motion/    MotionScope (Motion providers) and Reveal
  sections/home/        one file per home page section (StatsRow, ProcessTimeline are reused on About)
  sections/services/    ServiceDetail (+ FeaturedServiceDetail), ServiceNav
  sections/contact/     ContactForm
  content/              ALL copy and data as typed TS objects
                          site.ts (company, nav, contact), services.ts, partners.ts,
                          home.ts (all home section copy), pages.ts (every route: path, title, description,
                          breadcrumb, hero copy) + redirects, company.ts (Sumic meaning, founder, governance + team),
                          about.ts (About page), services-page.ts (Services page long copy, loaded
                          with that page only), partnerships.ts, careers.ts (+ jobOpenings, application
                          mailto helpers), contact.ts, photos.ts (shared office photos), legal/ (privacy, cookies, terms as typed blocks), testimonials.ts,
                          ui.ts (interface labels, a11y names)
  pages/                one component per route (HomePage, PlannedPage, NotFoundPage, ...)
  routes/               AppRoutes (route table), meta.ts (head tags per path), pageModules.ts
                        (code-split page modules + preloadRoute), lazyWithPreload
  hooks/                useActiveSection (in-page nav highlight), useScrolledPast, useMediaQuery, ...
  lib/                  contact.ts (submitContactForm stub + form types), mailto.ts (mailtoHref), nav, utils
  entry-server.tsx      build-time prerender entry (see "Rendering and performance")
scripts/prerender.mjs   post-build: prerenders every route to dist/<path>/index.html (+ 404.html, redirect
                        stubs, sitemap.xml)
docs/redesign-plan.md   site audit, sitemap, redirects, forms and build order for the remaining pages
public/brand/           logos and brand imagery (pulled from the live site; brand-kit files will replace them)
public/brand/partners/  partner logos
public/brand/products/  real screenshots of Sumic's own products (desktop + phone)
public/images/          page photography and diagrams as WebP (team/, governance/, about/, services/,
                        partnerships/)
brand-originals/        unmodified source files for everything in public/brand and public/images (not served)
```

Import from `src` using the `@/` alias (`@/components/ui/button`).

## Rules

### Code

- TypeScript strict. No `any`, including `as any`. Model unknown data with `unknown` and narrow it.
- Functional components only. Named exports only (no `export default` in `src/`).
- Reuse before duplicating: when another page needs a home component, move it to `components/blocks/` or add an explicit variant (e.g. `ProcessTimeline headingLevel={2}` when it is a section of its own).
- Prefer composition over boolean props: build components from small parts and expose explicit variants (for example `ServiceCard` / `FeaturedServiceCard`), not `featured`/`dark` flags.
- Scroll reveals use `<Reveal>`; inside lists use `<Reveal as="li">` so the markup stays valid.
- Component files use PascalCase (`HeroSection.tsx`). shadcn's kebab-case files in `components/ui/` are the exception.

### Content

- All copy lives in `src/content/`. Sections receive data through props. No hardcoded strings in JSX.
- Interface labels and accessible names ("Open menu", "Skip to content") live in `src/content/ui.ts`.
- Render partners from `confirmedPartners` (it excludes entries whose name is still `TODO:`), never from `partners` directly.
- Content comes from sumicitsolutions.com. **Never invent clients, testimonials, stats or awards.** If something is missing, use a clearly marked `TODO:` placeholder.
- Company email is **it@sumiconline.com** everywhere (`site.contact.email`); visible text and `mailto:` must match. The one exception is job applications: HR (`hr@`) with CC `careers@`, exactly as the live Careers page states (`applicationEmail` in careers.ts). Build mailto links with `mailtoHref()` (prefilled subjects: "Partnership enquiry", "Application – <role>" / "General application").
- **Job openings** come only from roles Sumic has published (`jobOpenings` in careers.ts). While the list is empty, Careers shows the "No open roles right now" state with the LinkedIn link.
- Stats are shown exactly as on the live site (`homeProof.stats` in `home.ts`), with no added explanations.
- **Legal text is verbatim.** `src/content/legal/*.ts` hold the live privacy, cookies and terms text as typed blocks (`types.ts`): h2s carry slug ids for the table of contents; the document title lives in the hero and "Last updated" in `lastUpdated`. Only frontend presentation may change, never wording. Each legal route loads only its own document module (`legalPage()` in `routes/pageModules.ts`).
- Rewritten copy (company.ts, about.ts, services-page.ts, services.ts checklist forms) keeps the live original in a JSDoc comment above it, so changes stay reviewable.
- Service lists ("What's included") name only items stated in the live service text.
- Team photos: one 4:5 crop per person (`-card-800w/400w.webp`, `teamPhoto()` in company.ts), always in full colour (no grayscale, duotone or overlays on faces). A person may also get a `cutout` (background-removed, transparent, 4:5, standing on the bottom edge); `TeamCard` then switches to the cut-out style, where the person overlaps the name panel. Card images are `alt=""` because the name and role are right below in text.
- **Governance team carousel** (`TeamCarousel`): a 3D coverflow on md+ (front card flat; neighbours turned in 3D, scaled and tucked behind, 350ms staggered transitions; prev/next buttons and arrow keys; click a side card to bring it forward; a polite announcement; screen readers get the full team as a list), a scroll-snap swipe row on phones (buttons stay visible), and a static grid under reduced motion. CSS media queries pick the variant, so hydration never swaps layouts. Starts with `governance.team.startWith` (the founder) and has no autoplay. A person's `bio` link shows under the carousel only while they're in front.
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

### Forms

- The contact form is frontend only. It submits through `submitContactForm()` in `src/lib/contact.ts` (a typed stub marked `TODO(backend)`); connect a backend by replacing that function only.
- Pattern (follow it for any new form): uncontrolled shadcn inputs (`Field`, `FieldLabel`, `Input`, `Textarea`, `NativeSelect`) with `name`, `autoComplete`, the right `type`/`inputMode`; `noValidate` and validation on submit; inline errors linked with `aria-invalid` + `aria-describedby` (pass `role={undefined}` to `FieldError`, so errors aren't each announced as alerts); focus the first invalid field; one polite `role="status"` region for the error summary, sending and result; fields re-check as they are edited once they've shown an error (not on blur: clearing an error on blur shifts the layout under the pointer). The submit button uses `aria-disabled` while sending (a `disabled` button drops focus). Include the hidden honeypot field.
- **Third-party embeds load lazily.** The Contact page's Google map (`MapEmbed`) is always shown, as an `iframe` with `loading="lazy"`, so Google is contacted only when the visitor scrolls near it and first paint is never delayed. Give every embed a `title`, and keep a plain link alternative ("Open in Google Maps").

### Responsive

- Mobile-first. Every view must look right at **360px, 768px, 1280px and 1536px**.

### Accessibility

- Semantic HTML and landmarks. Exactly one `h1` per page, with no skipped heading levels.
- Meaningful `alt` text; `alt=""` for decorative images.
- Visible focus states. Never remove an outline without replacing it.
- WCAG AA contrast.
- Full keyboard navigation, including menus, sheets and accordions.

### Animation

- Use Motion for scroll reveals and micro-interactions, via the lightweight `m.*` components (`import { m } from 'motion/react'`). There is no app-level provider: wrap animated components in `<MotionScope>` (`LazyMotion strict` + `MotionConfig reducedMotion="user"`), as Reveal and ProcessTimeline do, so pages without animation never load Motion. A full `motion.*` component throws in strict mode.
- Keep Motion off the critical path: no Motion in the navbar, hero or layout. Scroll-position state uses `useScrolledPast(px)` (passive listener), not Motion's `useScroll`; simple fades use CSS transitions.
- Above-the-fold entrance animations (hero headline, hero visual) use CSS keyframes (`animate-blur-in`, `animate-rise-in` in `index.css`) so they start on first paint of the prerendered HTML.
- Every animation respects `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` for Motion, the global CSS safety net for CSS animations).
- Continuous motion longer than 5 seconds (hero background, logo marquee) needs a visible pause control (WCAG 2.2.2).
- Heavy effects (WebGL/canvas backgrounds) are lazy-loaded (`React.lazy` + `Suspense`). At most one heavy effect per viewport.

### Performance

- Images in WebP/AVIF, with explicit `width` and `height`, and `srcSet`/`sizes` when shown much smaller than the file.
- Lazy-load everything below the fold (`loading="lazy"`, `decoding="async"`).
- Target Lighthouse 90+ in every category.

### Rendering and performance

- **Prerendered HTML.** `npm run build` renders the app to static HTML (`src/entry-server.tsx`, `scripts/prerender.mjs`); the client hydrates it (`hydrateRoot` in `main.tsx`). Dev renders client-side only. `entry-server.tsx` exports helpers alongside `render`, so `eslint.config.js` turns off `react-refresh/only-export-components` for that file only.
- **Hydration must match.** The first client render must equal the server render. Never read `window`, `document`, `navigator` or `matchMedia` during render. Use `useMediaQuery` / `useReducedMotionPreference` / `useHeavyEffects` (they return the server value during hydration, then update), or read in effects and handlers.
- **Below-the-fold sections are lazy chunks** (`React.lazy` + `Suspense` in `HomePage.tsx`). The prerender waits for them, so the HTML is complete.
- **Keep pages static.** State that changes after load lives in small leaf components (the navbar, BackToTop), never in page components. Updates pushed into sections that are still hydrating make React throw away their prerendered DOM and re-render them.
- **Code-split pages must be preloadable.** Wrap page modules with `lazyWithPreload` in `src/routes/pageModules.ts` and extend `preloadRoute()`. `main.tsx` preloads the current route's chunk before `hydrateRoot`, so the page hydrates in place.
- **Keep the startup bundle lean.** Anything not needed for first paint is a lazy chunk: below-fold sections, the mobile menu sheet (`MobileNavSheet`, preloaded on hover/focus/touch of the menu button), WebGL effects, page modules.
- **Below-the-fold blocks use `defer-render`** (`content-visibility: auto`) so the browser skips their layout until they are near view.
- **Measuring:** Lighthouse's default simulated mobile throttling is unreliable against localhost (the JS arrives instantly and gets counted as render-blocking). Measure mobile with `--throttling-method=devtools`, or with PageSpeed Insights on the deployed site.

### Navigation

- The navbar is fixed and always visible. It turns solid with a blur after the page scrolls; it never hides on scroll.

- **Routes** come from `src/content/pages.ts`: the live site's slugs **with a trailing slash** (`/about/`), so existing URLs keep working without redirects. Add a page there, then add its route in `src/routes/AppRoutes.tsx`; the prerender and `sitemap.xml` pick it up automatically.
- **Links:** use `<AppLink href>` for every link. It renders a router `<Link>` for internal routes (client-side navigation) and a plain `<a>` for external URLs, `mailto:`, `tel:`, files and `#hash` targets. `NavLink.sectionId` is only for in-page anchors (`navHref()` resolves it to `#id`).
- **Active nav item** comes from the current route (`isActiveLink` in `src/lib/nav.ts`); a dropdown parent is active when one of its children is. The current page link gets `aria-current="page"`.
- **Every page** renders inside `SiteLayout` (navbar, `<main id="main">`, footer, BackToTop). Inner pages start with `<PageHero>` (navy, breadcrumb, the page's single h1) and usually end with `<CtaBand>`.
- **Route changes:** `ScrollManager` scrolls to the top (or the `#hash`) and moves focus to `#main`; `RouteMeta` updates the title, description and canonical. The prerender writes the same head tags into each page's HTML.
- **Redirects** for retired URLs live in `redirects` in `src/content/pages.ts` (e.g. `/what-are-cookies/` → `/cookies-policy/#what-are-cookies`). The app handles them with `<Navigate>`; the prerender writes a stub HTML page (meta refresh, canonical, noindex) for static hosts. Prefer real 301s at the host when it's set up.
- **Long documents** use `<TableOfContents>` (collapsible on mobile, sticky from lg) with a ~70-character measure (`max-w-[40rem]` at text-lg; `ch` overshoots in Satoshi). Long URLs in text get `wrap-anywhere`, and grid columns holding prose use `minmax(0,1fr)` so they can't overflow at 360px.
- **Services deep links:** each service has an `anchor` and `href` (`/services/#mobile-app-development`) in `services.ts`; the home cards, footer and Services page nav all use them. Service sections are focusable (`tabIndex={-1}`) and are not `defer-render`, so anchor jumps land precisely. `ScrollManager` waits (up to 3s) for a lazily rendered page to produce the `#hash` target.
- **In-page navs** (TableOfContents, ServiceNav) use `useActiveSection(ids)` for the current-section highlight (`aria-current="location"`).
- **404:** unknown paths render `NotFoundPage`; the build writes `dist/404.html` (noindex). The host must serve `404.html` with a 404 status for unknown URLs, and serve `/<path>/index.html` for directory URLs (with a trailing-slash redirect).

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

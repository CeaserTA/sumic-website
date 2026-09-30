# AGENTS.md: Sumic IT Solutions website

Frontend rebuild of https://sumicitsolutions.com/ for Sumic IT Solutions Ltd, a Kampala-based digital
transformation company serving SMEs and MSMEs in Africa.

Stack: Vite + React 19 + TypeScript (strict), Tailwind CSS v4 (CSS-first, `@theme` in
`src/index.css`), shadcn/ui (Radix base), Motion (`motion/react`), lucide-react.

## Commands

| Task          | Command             |
| ------------- | ------------------- |
| Dev server    | `npm run dev`       |
| Build         | `npm run build`     |
| Preview build | `npm run preview`   |
| Lint          | `npm run lint`      |
| Format        | `npm run format`    |
| Type check    | `npm run typecheck` |

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
                          home.ts (section ids/placeholders), ui.ts (interface labels, a11y names)
  hooks/  lib/  pages/
public/brand/           logos and brand imagery (pulled from the live site; brand-kit files will replace them)
public/brand/partners/  partner logos
```

Import from `src` using the `@/` alias (`@/components/ui/button`).

## Rules

### Code

- TypeScript strict. No `any`, including `as any`. Model unknown data with `unknown` and narrow it.
- Functional components only. Named exports only (no `export default` in `src/`).
- Component files use PascalCase (`HeroSection.tsx`). shadcn's kebab-case files in `components/ui/` are the exception.

### Content

- All copy lives in `src/content/`. Sections receive data through props. No hardcoded strings in JSX.
- Interface labels and accessible names ("Open menu", "Skip to content") live in `src/content/ui.ts`.
- Render partners from `confirmedPartners` (it excludes entries whose name is still `TODO:`), never from `partners` directly.
- Content comes from sumicitsolutions.com. **Never invent clients, testimonials, stats or awards.** If something is missing, use a clearly marked `TODO:` placeholder.

### Styling

- Tailwind utilities only. Inline `style` is allowed only for dynamic values (for example, a computed transform).
- Use brand tokens (`bg-brand-primary`, `text-brand-accent-ink`, `bg-primary`, etc.). **Never write raw hex values in components.** Colours are defined once in `src/index.css`.
- Colour contrast facts:
  - `brand-accent` (#1EEF0F green) fails contrast on white. Use it as a background with `brand-accent-foreground` (navy) text, or on navy backgrounds.
  - For green text or icons on light surfaces, use `brand-accent-ink`.
  - Focus rings use `ring` (navy). On dark surfaces, set `[--ring:var(--brand-accent)]` on the container so rings turn green.
- The primary CTA uses `<Button variant="accent">` (green with navy text), a project addition to the shadcn button.
- Fonts: `font-heading` / `font-display` (Bricolage Grotesque) for headings and display type; `font-sans` (Atkinson Hyperlegible Next) for everything else.
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

- Use Motion (`import { motion } from 'motion/react'`) for scroll reveals and micro-interactions.
- Every animation respects `prefers-reduced-motion` (use `useReducedMotion()` or `MotionConfig reducedMotion="user"`).
- Heavy effects (WebGL/canvas backgrounds) are lazy-loaded (`React.lazy` + `Suspense`). At most one heavy effect per viewport.

### Performance

- Images in WebP/AVIF, with explicit `width` and `height`.
- Lazy-load everything below the fold (`loading="lazy"`, `decoding="async"`).
- Target Lighthouse 90+ in every category.

### Navigation

- `NavLink.href` is the canonical page URL. `NavLink.sectionId` maps a link to a home page section; `navHref()` in `src/lib/nav.ts` resolves such links to `#<sectionId>` while the home page is the only page.
- Every home section is a `<Section id=...>`, and its id must be listed in `homeSectionIds` for active-link tracking.

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

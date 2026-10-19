# UI audit: Apple design principles

Date: 2026-10-19 · Branch: `ceaser-dev` (includes the `my-branch` merge, `6ccc812`)

This audit checks the site against the [`apple-design`](https://github.com/emilkowalski/skills/tree/main/skills/apple-design)
skill, which condenses Apple's WWDC design talks (fluid interfaces, materials, typography, reduced motion, design
principles) for the web. The skill was used as **inspiration, not a spec**: the brand, layout and visual direction are
unchanged. Each fix below closes a specific gap in response, honesty of affordances, motion or accessibility.

The skill itself was reviewed before use: it is a single markdown file with no scripts, hooks or install steps. It was
**not installed** in `.claude/skills/` (AGENTS.md asks for the project owner's approval first).

## Already in good shape

- **Press feedback on pointer-down.** Buttons nudge on `:active`; `touch-action: manipulation` removes the tap delay.
- **Spatial consistency.** The mobile menu sheet enters and leaves on the same side, over a dimming scrim.
- **Reduced motion is designed, not just switched off.** The team carousel swaps to a static grid, heavy effects are
  skipped, and Motion follows the user setting.
- **Native momentum where it matters.** Phone carousels use scroll snap, so flicks carry real momentum.
- **Display type.** Large headings use tight leading and negative tracking; small uppercase labels use positive tracking.

## Issues found and fixed

| # | Area | Issue | Principle | Fix |
|---|------|-------|-----------|-----|
| 1 | Home hero product cards | Six cards floated on an endless 6 s loop: the slow oscillation (~0.2 Hz) Apple flags for motion sensitivity, with no pause control (WCAG 2.2.2). The float also overrode the hover lift, so hover did nothing. | Reduced motion, Response | Cards hold still; hover lift now works; press settles them (`scale 0.97`). |
| 2 | Home hero product cards | Real, focusable links sat inside an `aria-hidden` wrapper, so keyboard users reached links screen readers couldn't announce. | Familiarity, Accessibility | Removed `aria-hidden`; the cards are a proper list. |
| 3 | Home hero image | `fetchpriority` (lowercase) is not a React prop and was dropped, so the LCP image lost its priority hint. | Craft (performance) | `fetchPriority="high"`. |
| 4 | Services panel, mobile | Tapping the open service didn't close it; it jumped to the first service and scrolled. | Agency, Spatial consistency | Tapping the open item closes it in place. |
| 5 | Services panel, desktop tabs | Arrow keys changed the selection but focus stayed on the old tab (now `tabIndex=-1`). | Familiarity | Focus moves with the selection (roving tabindex). |
| 6 | Services panel | Hidden descriptions and collapsed accordion bodies still contained focusable "Request this service" links. | Accessibility | `inert` on hidden panels. |
| 7 | Services panel | Green focus rings on a light surface (fails 3:1); "What's included" label at 50% opacity (~2.5:1). | Craft, Contrast | Navy base focus outline; full-strength label colour. |
| 8 | Services quick-link cards | Lift on hover, but no feedback on press. | Response | Press settles and scales the card (`active:`), 100 ms. |
| 9 | Team coverflow | Every move waited 60 ms, then eased in slowly, so clicks felt laggy. | Response | Front and neighbour cards move at once with an ease-out; only the outer cards stagger. |
| 10 | Team coverflow | No swipe on touch tablets (md+ shows the coverflow, which only took taps). | Direct manipulation, Momentum | Swipe left/right; a short fast flick counts like a long drag (velocity decides); vertical scroll untouched. |
| 11 | Home services cards | Whole card reacted to hover, but only the small "Learn more" text was clickable. | Familiarity | The whole card is the link's hit area; press feedback and a card-level focus outline. |
| 12 | Home process steps | Non-clickable cards lifted and recoloured on hover, promising a click that did nothing. | Familiarity | Hover effect removed. |
| 13 | Navbar (frosted) | No solid fallback for `prefers-reduced-transparency` or `prefers-contrast: more`; a hard 1px rule plus a shadow. | Materials, Accessibility | Opaque bar under both preferences (plus an edge for more contrast); soft shadow only otherwise; `backdrop-saturate` for a truer material. Same fallback on the hero's pause button. |
| 14 | Hero headline entrance | Words overshot their resting place (bounce) although nothing threw them. | Springs: bounce only with momentum | Same fall-and-blur, settling without overshoot. |
| 15 | Global reduced-motion rule | Every transition was cut to 0.01 ms, including colour and opacity feedback. | Reduced motion ≠ no feedback | Movement is still instant; colour and opacity changes keep their timing as gentle cross-fades. |
| 16 | Heading type | One tracking/leading value for all sizes; small wrapped h3/h4 card titles were cramped at 1.05. | Size-specific tracking and leading | h1/h2 unchanged (-0.02em / 1.05); h3–h6 use -0.01em / 1.2. |
| 17 | Hero services strip | Captions at 50% white on navy (borderline contrast). | Vibrancy: no flat grey text | Raised to 70%. |

## Build fixes made along the way

The merged `my-branch` work failed `npm run typecheck` (13 errors) and `npm run lint` (2 errors), so `npm run build`
couldn't run. Fixed without changing behaviour:

- `StatsRow`: a hook was called after an early return (rules of hooks); unchecked array access. `eyebrow`/`title` are now
  optional, so the About page (whose `Section` already has the heading) no longer gets a duplicate `h2`.
- `ServicesPage`: the active service now reads the URL hash through `useSyncExternalStore` instead of `setState` in an
  effect; the default anchor is typed safely.
- `ServicesPanel`: unchecked array access.

`npm run typecheck`, `npm run lint` and `npm run build` now pass with no warnings.

## Noticed, not changed

These are outside this audit's scope or need a decision from the team:

- **Hardcoded copy** in `ServicesPage` and `ServicesPanel` ("Our services", "Explore what we can do…", "Request this
  service", `/contact/`, the ITES & BPO subtitle) should move to `src/content/` (AGENTS.md: no strings in JSX).
- **Raw colour values** in the Services hero gradient (`rgba(1,50,80,…)`) should use brand tokens.
- **Stat rings** (`ringFills = [85, 60, 5, 95]` in `StatsRow`) draw percentages that aren't data. They can read as
  claims; consider equal decorative rings or none.
- **Services hero photo** (`/images/services/01 DSE SUMIC 16.jpg`) is a JPEG with spaces in the name and no
  `width`/`height`/`srcSet`; the hero image is also a JPEG. AGENTS.md asks for WebP/AVIF with explicit sizes.
- `src/sections/services/ServiceDetail.tsx` is no longer imported anywhere.
- **Sheet animation under reduced motion** appears instantly rather than cross-fading (the shadcn keyframes combine
  slide and fade). Acceptable, but a fade-only variant would match the guidance more closely.

## How to check

- **Reduced motion** (DevTools → Rendering → Emulate `prefers-reduced-motion`): hover colours still fade; nothing slides.
- **Reduced transparency / more contrast** (same panel): scroll the page; the navbar turns opaque.
- **Services page at 360px:** open a service, tap it again; it closes and nothing else opens.
- **Services page at 1280px:** focus a tab, use ↑/↓/Home/End; the focus ring follows the selection.
- **Governance page at 768px with touch emulation:** swipe the team cards; a quick short flick advances one card.

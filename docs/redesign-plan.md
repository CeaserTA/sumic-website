# Redesign plan: remaining pages

Audit of https://sumicitsolutions.com/ (crawled 2026-10-02, one request per second, depth 2 from the
home page) and the plan for rebuilding every page on the new stack.

## 1. Page inventory

13 real pages. The crawl also found WordPress plumbing that will not be rebuilt: `/feed/`,
`/comments/feed/` and `/xmlrpc.php`.

Every page shares the same header, footer and closing band ("Would you like to start a project
with us? … Talk to us Today", Email us), so these are not repeated below.

| Page             | URL                                                | Purpose                                       | Main sections                                                                                                                                                                                                                                                                                                                                                                                 | Content types                           | External links                                                       | Broken / outdated                                                                                                                                                                                                       |
| ---------------- | -------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home             | `/`                                                | Company overview                              | Rebuilt already                                                                                                                                                                                                                                                                                                                                                                               | —                                       | —                                                                    | —                                                                                                                                                                                                                       |
| About            | `/about/`                                          | Company story and principles                  | About Us (vision line) · Our History (≈480 words, 2018–2025) · Strategic Objectives: Vision, Mission, Core Values (Innovation, Collaboration, Integrity, Accountability) · Development Lifecycle (6 steps) · Why Choose Us (360 Approach, Client-Centricity, Domain Expertise, Time-To-Market, A Class-Team) · Statistics (1K+ clients, 50+ projects, 5% "Young Women", 1M+ "Sumic Visitors") | Long text, icon lists, stats, no images | —                                                                    | "With over 3 years of experience" (company founded 2019, so now 7 years). Stats conflict ("over 150 African businesses" in the History text vs 1K+ clients); "5% Young Women" and "1M+ Sumic Visitors" have no context. |
| Governance       | `/team/`                                           | Governance and management team                | Governance Structure (short statement) · Management Team: 9 people with name, role, photo; founder links to bio                                                                                                                                                                                                                                                                               | Short text, people grid, 10 images      | —                                                                    | Team list and photos need confirming as current, with consent to publish.                                                                                                                                               |
| Sumic Meaning    | `/sumic-meaning/`                                  | Brand story                                   | Origin of "Sumic" · Meaning (speed, agility, innovation) · A Story of Resilience · The Sumic Tribe · Inspiring the Future                                                                                                                                                                                                                                                                     | Text only (≈340 words)                  | —                                                                    | Typo in CTA: "Don't get stack" (stuck).                                                                                                                                                                                 |
| Meet the Founder | `/cirus-sumika` (also answers at `/cirus-sumika/`) | Founder bio                                   | Bio (≈160 words) · photo · "Explore More"                                                                                                                                                                                                                                                                                                                                                     | Text, 1 photo                           | cirussumika.com                                                      | Claims "over 500,000 youth" mentored and "numerous awards" (unsourced on this site). Only page without a trailing slash in the nav.                                                                                     |
| Services         | `/services/`                                       | Service detail                                | Intro line · 6 services with 2–3 paragraphs each · "Timely Quality Products & Services" · Website and Mobile App checklist forms                                                                                                                                                                                                                                                              | Text, 6 images, links to Google Forms   | forms.gle (×2)                                                       | Checklist forms return HTTP 401 to an anonymous request: check that they open for signed-out users.                                                                                                                     |
| Partnerships     | `/sumic-partnerships/`                             | Case studies and partner logos                | Intro · FVital (AI neonatal resuscitation training app) · Eftax (Halo Dish app: halal food and prayer spaces in Japan/Thailand) · Japan AI Consulting: Phase 1 AKT PoC, Phase 2 AKT development, Phase 3 InsightBuddy Chrome extension · Our Partners logo grid (18)                                                                                                                          | Long text, 4 project images, 18 logos   | —                                                                    | —                                                                                                                                                                                                                       |
| Careers          | `/careers/`                                        | Recruitment and internships                   | Join Our Team · Build Your Future ("Send Resume" → hr@) · Sign up for Job Alerts ("Subscribe Now" → LinkedIn page) · Sumic Internship Program (why, 4 benefits, impact) · How to Apply: Internship, Volunteering, Graduate Into Entrepreneurship programmes; send to hr@, CC careers@ · Academy entry advantage                                                                               | Text, 3 images, mailto links            | sumicinternational.academy (redirects to sumicacademy.com), LinkedIn | "Job alerts" is only a LinkedIn link, with no real alert sign-up. Academy linked under two domains. No current vacancies listed.                                                                                        |
| Contact          | `/contact/`                                        | Enquiries                                     | Intro · Request Free Consultation form (Name, Email, Message) · Reach Us (address incl. "National ICT Innovation Hub Bldg, 1st Floor", email, phone) · Google Maps embed                                                                                                                                                                                                                      | Form, map iframe                        | Google Maps, share.google                                            | **Bug:** the visible "info@sumicitsolutions.com" link opens `mailto:it@sumiconline.com`. The address detail (Innovation Hub building, 1st floor) is missing from the footer.                                            |
| Privacy Policy   | `/privacy-policy/` (also `/privacy-policy`)        | Legal                                         | Standard template: definitions, data collected, use, retention, transfer, deletion, disclosure, security, children, links, changes, contact                                                                                                                                                                                                                                                   | Long text (≈2,400 words)                | —                                                                    | Last updated 5 Sep 2023; generic template. Must reflect what the new site actually collects (form data, any analytics).                                                                                                 |
| Cookies Policy   | `/cookies-policy/`                                 | Legal                                         | Definitions · cookies used · your choices · more information · contact                                                                                                                                                                                                                                                                                                                        | Text (≈660 words)                       | Browser help pages                                                   | Last updated 5 Sep 2023. **Broken:** Microsoft support link returns 404. The new site sets no cookies yet, so the policy will be inaccurate.                                                                            |
| Terms of Use     | `/terms-of-use/`                                   | Legal                                         | Standard template incl. EU and US sections, governing law, disputes                                                                                                                                                                                                                                                                                                                           | Long text (≈1,600 words)                | —                                                                    | Last updated 5 Sep 2023; generic template, needs legal review.                                                                                                                                                          |
| What Are Cookies | `/what-are-cookies/`                               | Cookie explainer (linked from Cookies Policy) | What/how/types/uses/privacy/managing cookies                                                                                                                                                                                                                                                                                                                                                  | Text (≈580 words)                       | —                                                                    | Generic explainer that duplicates the cookies policy.                                                                                                                                                                   |

Linked assets: Company Profile PDF (`/wp-content/uploads/2026/09/…Vol-8.pdf`, OK), Brand Kit (Google
Drive, OK), product sites (all OK).

## 2. Sitemap and URL structure

Keep every live slug, **with the trailing slash** WordPress uses, so links and search rankings carry
over with no redirects for existing pages.

```
/                         Home
/about/                   About (Who We Are)
/team/                    Governance (keep slug; the label stays "Governance")
/sumic-meaning/           Sumic meaning
/cirus-sumika/            Meet the founder
/services/                Services
/sumic-partnerships/      Partnerships
/careers/                 Careers
/contact/                 Contact
/privacy-policy/          Privacy policy
/cookies-policy/          Cookies policy (absorbs "What are cookies")
/terms-of-use/            Terms of use
/404.html                 Not found (served for unknown URLs, noindex)
```

Checklist Forms stay external Google Forms in the nav (no new page), unless the company wants them
rebuilt on-site (see section 5).

### Redirects (301)

| From                                                                                | To                                     | Why                                                                                        |
| ----------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------ |
| `/cirus-sumika`                                                                     | `/cirus-sumika/`                       | Canonical trailing slash (most hosts do this automatically)                                |
| `/privacy-policy` and any other slug without a slash                                | same path with `/`                     | Canonical trailing slash                                                                   |
| `/what-are-cookies/`                                                                | `/cookies-policy/#what-are-cookies`    | Merged into the cookies policy                                                             |
| `/wp-content/uploads/2026/09/Sumic-IT-Solutions-Ltd-Company-Profile-2026-Vol-8.pdf` | `/downloads/sumic-company-profile.pdf` | Host the PDF on the new site (or keep the old path as a static file and skip the redirect) |
| `/feed/`, `/comments/feed/`                                                         | `/` (or 410 Gone)                      | WordPress feeds no longer exist                                                            |
| `/xmlrpc.php`, `/wp-login.php`, `/wp-admin/*`                                       | 410 Gone                               | WordPress endpoints; returning 410 also deters bots                                        |

The exact format (`_redirects`, `vercel.json`, Nginx rules) depends on the host, so the file gets
written once hosting is chosen.

## 3. Routing (done)

- React Router (declarative mode): `BrowserRouter` on the client, `StaticRouter` in the prerender.
  Routes come from `src/content/pages.ts`; see `src/routes/`.
- `npm run build` prerenders every route to `dist/<path>/index.html`, writes `dist/404.html`
  (noindex) and generates `dist/sitemap.xml`. Each page gets its own title, description, canonical
  and Open Graph tags.
- Pages without content yet render `PlannedPage` (their live-site heading and intro, plus the CTA
  band). In development they show a "Planned page" badge.
- Host requirements: serve `404.html` with status 404, serve `/<path>/index.html` for directory URLs,
  and redirect slashless paths to the trailing-slash version.

## 4. Shared templates and components

Built this phase (`src/components/blocks/`, `src/components/layout/`):

| Component                                            | Use                                                                          |
| ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| `SiteLayout`                                         | Navbar, `<main>`, footer, BackToTop and route-change helpers for every page  |
| `PageHero`                                           | Navy inner-page hero with breadcrumb, h1, intro and an optional actions slot |
| `CtaBand`                                            | The home page's closing band, reusable (optional aside slot)                 |
| `FeatureList`                                        | Icon + title + text grid (Why Choose Us, Core Values, internship benefits)   |
| `Prose`                                              | Long-form typography for the legal pages                                     |
| `Section` (existing)                                 | Content sections with the shared vertical rhythm                             |
| `AppLink`, `BackToTop`, `ScrollManager`, `RouteMeta` | Links, back to top, scroll/focus on navigation, head tags                    |

Identified for later, built with the page that first needs them:

| Component                     | Pages                        | Notes                                                                     |
| ----------------------------- | ---------------------------- | ------------------------------------------------------------------------- |
| `Timeline`                    | About (history)              | A dated history list. The home `ProcessTimeline` covers the lifecycle.    |
| `StatsRow` (existing)         | About                        | Reuse once the stats question is settled                                  |
| `PeopleGrid`                  | Governance                   | Photo, name, role, optional bio link                                      |
| `CaseStudy`                   | Partnerships                 | Image, partner, title, text, optional phases                              |
| `LogoGrid`                    | Partnerships                 | Static grid of `confirmedPartners` (the home marquee stays home-only)     |
| `ContactDetails` + `MapEmbed` | Contact                      | Map loaded on interaction (click to load) to keep performance and privacy |
| `Form` primitives             | Contact, possibly checklists | Wait for the submission decision (section 5)                              |
| `ServiceDetail`               | Services                     | Service with long description and an image                                |

## 5. Forms: how they submit today

| Form                                             | Where             | How it submits                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------ | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Request Free Consultation (Name, Email, Message) | `/contact/`       | **WPForms** (form #308) on WordPress. A standard full-page `POST` (`multipart/form-data`) back to `/contact/`; WordPress processes it on the server and sends the notification email configured in WPForms (recipient not visible from outside). Spam protection is a hidden honeypot field plus a time token; a Turnstile/reCAPTCHA script is referenced but no captcha widget is rendered. |
| Website Creation Client Checklist                | `/services/`, nav | **Google Forms** (`forms.gle/tKaBT39AWJqJDHb98`), external, responses go to the company's Google account                                                                                                                                                                                                                                                                                     |
| Mobile App Creation Client Checklist             | `/services/`, nav | **Google Forms** (`forms.gle/bmbxCA1CLruqx9fG6`), external                                                                                                                                                                                                                                                                                                                                   |
| Job applications / CVs                           | `/careers/`       | No form: `mailto:hr@sumicitsolutions.com` (CC `careers@`)                                                                                                                                                                                                                                                                                                                                    |
| Job alerts                                       | `/careers/`       | No form: "Subscribe Now" links to the LinkedIn company page                                                                                                                                                                                                                                                                                                                                  |

Once WordPress is gone, the contact form needs a new endpoint. Options to decide between:

1. **Form backend service** (e.g. Formspree, Basin, Web3Forms): static-friendly, emails the
   company, spam filtering included. Simplest; a third party processes the data, so the privacy
   policy must say so.
2. **Host serverless function** (Netlify/Vercel/Cloudflare) that emails via the company's mail
   provider (SMTP or API) and checks a Turnstile token. No third-party form service, small amount of
   code to own.
3. **Keep Google Forms** for the two checklists (no change), or rebuild them on-site with option 1
   or 2.

Whichever is chosen: inline validation, accessible errors, a success state, honeypot + Turnstile,
and no `mailto:` form posting.

## 6. Recommended build order

1. **Legal pages** (Privacy, Cookies, Terms): `PageHero` + `Prose` only. Fast, and unblocks the
   footer links. _Needs company/legal review of the 2023 text first._
2. **Text pages:** Sumic Meaning, Meet the Founder, Governance. `PageHero` + `Section` + one new
   component each (`PeopleGrid` for Governance).
3. **About:** history timeline, vision/mission/values (`FeatureList`), lifecycle (reuse), Why Choose
   Us, stats.
4. **Services:** six services in depth + checklist block. Decide whether services get their own
   pages (`/services/<slug>/`) or anchors on one page.
5. **Partnerships:** case studies + logo grid.
6. **Careers:** programmes, how to apply, job alerts.
7. **Contact:** after the forms decision (section 5); details + map + form.

Items 1–2 can be built together in one phase; 3–4 together; 5–7 together.

## 7. Input needed from the company

| Page             | What we need                                                                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| About            | Which client/projects numbers are correct (1K+ clients vs 150 businesses, 50+ projects); whether to keep "5% Young Women" and "1M+ Sumic Visitors" (and what they mean); updated "years of experience" |
| Governance       | Current management team, roles, photos and consent to publish                                                                                                                                          |
| Meet the Founder | Confirm bio claims (500,000 youth, awards) and an up-to-date photo                                                                                                                                     |
| Careers          | Current openings (if any); whether job alerts should be a real sign-up; whether hr@ and careers@ are both still monitored                                                                              |
| Contact          | Which email the form and links should use (info@ vs the mislinked it@sumiconline.com); full address line; form recipient(s); business hours                                                            |
| Legal pages      | Reviewed Privacy, Cookies and Terms text that matches the new site (forms, any analytics), with a new "last updated" date                                                                              |
| Services         | Images for each service (current ones are generic); whether checklists stay Google Forms; confirm the forms open for signed-out users                                                                  |
| Partnerships     | Permission to show case-study images; any newer projects (e.g. Lim-Kawano & Company Inc. and KOS LLC, mentioned on the About page)                                                                     |
| Site-wide        | Partner name for logo CS-P05; brand-kit logo/favicons; hosting choice (for redirects and the form endpoint)                                                                                            |

# FAQ

> **Status:** Active
> **Last updated:** 2026-05-01

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-01 | "Where do team avatars come from?" | Removed (Team section no longer exists). | Team and LaCrypta sections were replaced by the Partners carousel. |
| 2026-05-01 | Header | Migrated to the new doc-header standard. | Per-doc change logs replace the central docs CHANGELOG. |
| 2026-04-30 | — | Initial version. | Capture recurring questions to short-circuit them. |

---

## Why is everything on one page?

The two BitByBit projects (Habits and Arena) live on their own
subdomains, in their own repos. The landing site exists to introduce
the group and send people to the right project. A single rich page is
better for SEO than a tree of thin pages — Google indexes one URL with
strong on-page content rather than several pages competing for the same
keywords.

## Why no `/about` page?

The home **is** the about page. Every section that would normally live
under `/about` (story, projects, partners, open source) is right
there with anchor links from the navbar.

## Why is Spanish the default and not English?

The domain is `.com.ar` and the audience is Argentine first.

## Why no backend?

The landing site has no use for one. Anything user-facing that needs
state or accounts belongs on a project subdomain.

## How do I add a new project to the projects table?

The "Projects" section is currently a comparison table between Habits
and Arena, which lives in `components/about/Projects/`. Adding a third
column means:

1. Update the table layout in `components/about/Projects/index.tsx`
   and its SCSS module.
2. Add translation rows for the new project in
   `messages/es.json` → `about.projects` and `messages/en.json`.
3. Add the new project's external URL to the Footer and the JSON-LD
   `ItemList` in `app/[locale]/page.tsx`.
4. Update `architecture/overview.md` and the home-page screenshot if
   you maintain one.

## How do I add a new partner to the carousel?

Edit the `partners` array in `components/landing/Partners/index.tsx`,
add a `<key>Description` translation key in both
`messages/es.json → landing.partners` and the English equivalent, and
drop the partner logo into `public/images/partners/`. The carousel
duplicates the track automatically — no animation tweaks needed.

## How do I change the color palette?

Edit `styles/_theme.scss`. Both `light` and `dark` maps update; CSS
custom properties regenerate; component styles inherit. No other file
should need to change.

## Can we add analytics?

Only privacy-friendly, cookieless analytics (Plausible, Vercel
Analytics, Cabin, etc.). No GA, no Hotjar, no anything that would need
a cookie banner. Add an ADR before wiring it in.

## Can we add a contact form?

Not without a backend. If we need contact, link out to email or a
GitHub Discussions page. If a real form becomes important, that is its
own ADR — and it probably belongs as a separate, dynamically-rendered
route or even a separate small service.

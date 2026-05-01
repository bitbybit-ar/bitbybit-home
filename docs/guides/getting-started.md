# Getting started

> **Status:** Active
> **Last updated:** 2026-05-01

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-01 | Header | Migrated to the new doc-header standard. | Per-doc change logs replace the central docs CHANGELOG. |
| 2026-04-30 | — | Initial version. | Onboarding flow for new contributors. |

---

How to clone, install, and run the BitByBit landing site locally.

## Prerequisites

- Node.js 20+ (Next.js 16 requirement).
- npm (or pnpm / yarn — examples here use npm).

## Clone and install

```bash
git clone git@github.com:bitbybit-ar/home.git
cd home
cp .env.example .env.local
npm install
```

## Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000>. You will be redirected to `/es` (default
locale). To browse the English version, visit
<http://localhost:3000/en>.

## Build for production

```bash
npm run build
npm run start
```

The build output is fully static for both locales. The OG image route
is rendered on demand at the edge.

## Common commands

| Command | Purpose |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build, fails on TS errors |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint (Next.js + TypeScript rules) |

## Editing copy

All user-facing strings live in `messages/es.json` and
`messages/en.json`. Edit both — never hardcode copy in components.

## Editing the theme

Colors and tokens live in `styles/_theme.scss`. Light and dark are
defined as parallel maps; CSS custom properties are generated from them.
Component SCSS modules consume the tokens via aliases in
`styles/_colors.scss`.

## Where things live

| Path | Purpose |
|---|---|
| `app/[locale]/page.tsx` | The home page (the only page) |
| `app/[locale]/layout.tsx` | Root layout, metadata, JSON-LD, providers |
| `app/sitemap.ts` | Sitemap |
| `app/robots.ts` | robots.txt |
| `app/manifest.ts` | Web app manifest |
| `components/about/` | Story, Projects, OpenSource sections |
| `components/landing/` | Partners carousel, Support section |
| `components/layout/` | Navbar and Footer |
| `components/common/` | Block, Bubble, BlockTower, PixelDissolve |
| `components/icons/` | SVG icons |
| `i18n/` | next-intl routing + request config |
| `lib/` | seo, utils, env, hooks |
| `messages/` | Translations per locale |
| `styles/` | Design tokens, mixins, globals |
| `proxy.ts` | next-intl middleware |
| `docs/` | Internal documentation |

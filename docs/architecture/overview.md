# Architecture overview

> **Status:** Active
> **Last updated:** 2026-05-20

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-20 | Routing, Security | Added NIP-05 verification at `/.well-known/nostr.json` (static file under `public/`, four team identities: `anix`, `wnder`, `fabri`, `fred`). Added a second `headers()` entry in `next.config.ts` scoped to `/.well-known/nostr.json` that sets `Access-Control-Allow-Origin: *`; the existing `/(.*)` security headers (CSP, HSTS, frame-options, etc.) still apply. | Browser-based Nostr clients verify `<name>@bitbybit.com.ar` identities with a cross-origin fetch and fail silently without CORS. Static file under `public/` is the right shape — adding an API route or route handler would violate the static-only rule for this repo. |
| 2026-05-05 | Page structure | Added Obelisk and LaWallet to the `Friends` board, bringing the count from three to five. Obelisk's logo is vendored locally (`public/images/friends/obelisk.png`); LaWallet uses the GitHub-avatar URL pattern (`github.com/lawalletio.png`). The board now wraps to two rows (3 + 2) on tablet/desktop via a `flex-wrap` + `max-width: calc(3 * 240px + 2 * 40px)` cap on `.board`, with a tablet-only shrink to 220px polaroids + 24px gap so the 3-up row still fits at 768px viewports; the mobile scroll-snap carousel is unchanged. | Two more projects in the BitByBit values orbit (Nostr-native chat and a Lightning wallet) deserved a spot on the board. With five polaroids the single-row corkboard overflowed even our 1200px container (5 × 240 + 4 × 40 = 1360px) and made tablet items unreachable inside negative scroll space, so the row had to break into two — splitting 3 + 2 keeps the rotation cycle (`:nth-child(3n + …)`) intact across rows. |
| 2026-05-01 | Page structure | Renamed `Partners` to `Friends`. New polaroid-on-corkboard layout: pre-rotated cards on desktop, CSS-only scroll-snap carousel on mobile (no JS). Added Mapping Bitcoin as the third friend. Anchor `#partners` → `#friends`, i18n namespace `landing.partners` → `landing.friends`. | "Partners" sounded like a business arrangement; the relationship is closer to fellow travelers with shared values. The marquee carousel was disproportionate for a 3-item list, and the polaroid pattern reinforces the "friends, not partners" framing. |
| 2026-05-01 | Page structure | Merged the standalone `OpenSource` section into `Support`. The unified section keeps the org-level CTAs (Zap, Star) and adds a per-project repo row driven by an array — adding a project is one entry, no layout change. | Two adjacent sections were saying the same thing in two voices. One section reads cleaner and scales naturally as new projects ship. |
| 2026-05-01 | Theming | Adopted gray-primary + yellow-secondary palette with arena's decorative tokens preserved. New `gray-*` and `secondary-*` scales, semantic role tokens, dedicated `--focus-ring`, and `Button variant="accent"`. See ADR [0002](decisions/0002-palette.md). | Arena's purple-primary register reads playful; the BitByBit group landing needs a serious tone while keeping the multi-hue logo + Block + Bubble identity shared across sister projects. |
| 2026-05-01 | Header | Migrated to the new doc-header standard. | Per-doc change logs replace the central docs CHANGELOG. |
| 2026-04-30 | Page structure | Replaced Team and LaCrypta sections with a Partners carousel; added Support above the footer. | Partner relationships scale better as a carousel; support CTAs belong on the home page now that we have a Lightning address. |
| 2026-04-30 | — | Initial version. | Document the v0.1.0 scaffold so contributors don't have to read the code to understand intent. |

---

## Table of Contents

1. [What this site is](#what-this-site-is)
2. [Stack](#stack)
3. [Routing](#routing)
4. [Page structure](#page-structure)
5. [SEO surface](#seo-surface)
6. [Security](#security)
7. [Theming](#theming)
8. [What is intentionally not here](#what-is-intentionally-not-here)

---

## What this site is

The BitByBit landing site is a small, fully static, SEO-first marketing
page. There is no backend, no database, no API. The site exists to:

1. Tell visitors who BitByBit is.
2. Send them to the right project subdomain.
3. Rank well on search for the brand and adjacent keywords.

Anything beyond that lives on the project subdomains, not here.

## Stack

- **Next.js 16** (App Router) — Static generation for every locale.
- **next-intl** — Spanish (default) and English; locale routed via
  `app/[locale]/...`.
- **next-themes** — Light/dark mode with system preference, theme
  applied via `data-theme` attribute on `<html>`.
- **SCSS modules** — Per-component styles. Global tokens in
  `styles/_theme.scss` mapped to CSS custom properties.
- **Vercel** — Hobby plan, custom domain `bitbybit.com.ar`.

## Routing

```
/             → 307 redirect to /es (default locale)
/es           → home (4 sections)
/en           → home (4 sections)
/sitemap.xml  → both locales with hreflang alternates
/robots.txt   → allow-all + sitemap pointer
/manifest.webmanifest
/[locale]/opengraph-image.png  → dynamically rendered OG image
/.well-known/nostr.json        → NIP-05 verification (static)
```

There is no other route. Every page is the home page.

The `/.well-known/nostr.json` file lets Nostr clients verify
`<name>@bitbybit.com.ar` identities (NIP-05). It is a plain static file
under `public/.well-known/` — no API route, no route handler — and is
served with `Access-Control-Allow-Origin: *` (see Security) so browser-
based clients can fetch it cross-origin.

## Page structure

The home page renders four sections in this order:

1. **Story** (`<h1>` lives here) — who we are, why "BitByBit".
2. **Projects** — comparison table linking out to habits and arena.
3. **Friends** — projects and communities BitByBit shares values with.
   Polaroid-on-corkboard layout: pre-rotated cards on desktop (a
   physical-photos-pinned-to-a-board feel), CSS-only `scroll-snap`
   horizontal carousel on mobile (each polaroid is a snap target,
   neighbors peek from the edges, native touch handles the swipe —
   no JS).
4. **Support** (sits above the footer) — two-tier layout: a primary
   CTA pair (Lightning zap via a `lightning:` URI + Star-on-GitHub at
   the org level) and a wrapping row of per-project repo links
   (Arena, Habits, …) sourced from a `PROJECT_REPOS` array. Adding a
   new project is one entry in that array — no layout change.

Anchor IDs (`#story`, `#projects`, `#friends`, `#support`) let the
navbar link to sections, and let Google index "jump to section" links
from search results.

## SEO surface

- Per-locale `generateMetadata` produces title, description, keywords,
  OG, Twitter, robots, canonical, and `hreflang` alternates.
- `Organization` and `WebSite` JSON-LD in the layout.
- `ItemList` of `SoftwareApplication` entries (habits, arena) in the
  home page JSON-LD — gives Google explicit pointers to the project
  subdomains.
- Dynamic OG image rendered per locale via `next/og`.
- Sitemap lists `/es` and `/en` with hreflang alternates.

## Security

- HTTPS via Vercel, HSTS preload set.
- CSP set in `next.config.ts` headers — `default-src 'self'`, scripts
  from self, images from `https:` and `data:`. The OG image and font
  hosts are explicitly allowed.
- `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy` locks camera/mic/geo.
- All external links use `target="_blank" rel="noopener noreferrer"`.
- `/.well-known/nostr.json` is the one path that opts in to CORS
  (`Access-Control-Allow-Origin: *`), via a second `headers()` entry in
  `next.config.ts`. The file contains only public keys, so wide-open
  read access is the intended behavior; the rest of the site keeps the
  default same-origin posture.

## Theming

`styles/_theme.scss` defines `light` and `dark` token maps in three
layers, newest at the bottom:

1. **Atomic scales** — `gray-50…gray-900` (slate) and
   `secondary-50…secondary-900` (yellow, anchored at arena's
   `#f7a825 = secondary-500`).
2. **Semantic role tokens** — `--color-primary`, `--color-primary-hover`,
   `--color-secondary`, `--color-secondary-hover`, `--focus-ring`.
   Theme-aware: light mode binds `--color-primary` to `gray-800`, dark
   mode binds it to `gray-200`. Components consume the role tokens, not
   the scales directly.
3. **Decorative + arena-compatibility tokens** — backgrounds, text,
   ceramic, bubble, semantic feedback (`success` / `warning` / `error`
   / `info` / `nostr`), `color-accent` (red), `color-accent-alt`
   (green). Kept identical to arena so copied components render the
   same and the multi-hue logo / Block / Bubble decoration survives.

Each token becomes a CSS custom property on `:root` (light) and
`[data-theme="dark"]`. SCSS aliases live in `styles/_colors.scss`.

A palette swap is a single-file change: edit `_theme.scss`, the rest
follows. The rationale for the gray + yellow split lives in
ADR [0002](decisions/0002-palette.md).

## What is intentionally not here

- No database, ORM, or migrations.
- No authentication or accounts.
- No API routes, server actions, or runtime data fetching.
- No client-side analytics by default. If we add any, they must work
  without cookies and without a banner (e.g., Plausible or Vercel
  Analytics).

If you find yourself reaching for any of the above, you are probably
working on the wrong project — those belong on a project subdomain.

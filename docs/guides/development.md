# Development

> **Status:** Active
> **Last updated:** 2026-05-01

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-01 | Adding a new section to the home page | Updated step 6 to point to per-doc change logs and the root `CHANGELOG.md` instead of the removed `docs/CHANGELOG.md`. | Per-doc change logs replace the central docs CHANGELOG. |
| 2026-04-30 | — | Initial version. | Codify the conventions that arena and habits implicitly follow so this repo doesn't drift. |

---

## Table of Contents

1. [Workflow](#workflow)
2. [Conventions](#conventions)
3. [Testing](#testing)
4. [Formatting](#formatting)
5. [Adding a new section to the home page](#adding-a-new-section-to-the-home-page)

---

## Workflow

1. Branch from `main`. Branch name: `feat/<short>`, `fix/<short>`,
   `docs/<short>`, `chore/<short>`.
2. Make focused commits. One concern per commit.
3. `npm run build` locally before pushing — Vercel will run the same
   build, no surprises.
4. Open a PR. Reference the issue if there is one.
5. Wait for the Vercel preview to be green. Visit the preview URL,
   smoke-test in the browser.
6. Merge to `main`. Vercel deploys automatically.

## Conventions

### TypeScript

- `strict: true`. Do not weaken it.
- No `any`. Use `unknown` and narrow.
- Type-only imports: `import type { Foo } from "..."`.
- Path alias: `@/*` for everything inside the repo. No relative ladders.

### React

- Server Components by default. Add `"use client"` only when you need
  state, effects, or browser APIs.
- Components live next to their styles: `Foo/index.tsx` +
  `Foo/foo.module.scss`.
- Props are typed inline or with a local `interface`; avoid exporting
  prop types unless another file imports them.

### Styles

- SCSS modules per component. No global classes for component styling.
- Tokens come from `styles/_colors.scss` (`var(--color-*)`),
  `_spacing.scss`, `_typography.scss`. Do not hardcode hex or px values
  that already have a token.
- New tokens go in `styles/_theme.scss` for both light and dark.
- Media queries via mixins from `_media-mixins.scss` (`@include
  mobile`, `@include tabletAndUp`, etc.).

### Internationalization

- Every user-facing string goes through `useTranslations()` (client) or
  `getTranslations()` (server).
- Add the key to **both** `messages/es.json` and `messages/en.json` in
  the same PR.
- Keys are camelCase, namespaced by feature (`navbar.story`,
  `landing.partners.title`).

### Accessibility

- One `<h1>` per page. Sections use `<h2>`/`<h3>`.
- Landmark elements: `<header>`, `<nav>`, `<main>`, `<footer>`,
  `<section>` with `aria-labelledby` when helpful.
- Every `<a target="_blank">` carries `rel="noopener noreferrer"` and
  an `aria-label` if the link text alone is ambiguous.
- Every `next/image` has a meaningful `alt`. Decorative images use
  `alt=""` and `aria-hidden="true"` on the wrapper.
- Color contrast: WCAG 2.2 AA minimum. Test with the browser devtools
  contrast checker.

### Performance

- `next/image` for every raster image.
- `priority` only on the hero image, never below the fold.
- Self-host fonts via `next/font` with `display: "swap"`.
- Animations use CSS, not JS, when possible.
- `next/dynamic` for heavy components below the fold.

## Testing

There is no test suite for the landing site — it is small, static, and
the surface area is the rendered HTML. Smoke-test in the browser
before merging:

- Both locales render.
- Theme toggle works (light/dark, persists across reload).
- Locale toggle works and the URL updates.
- All anchor links scroll to the right section.
- All external links open in a new tab and land on the right page.
- View source: confirm JSON-LD blocks are present and well-formed.

If we add a component complex enough to deserve a test, set up Vitest
+ React Testing Library at that point — not before.

## Formatting

- Two-space indent.
- Double quotes in TS, single quotes in SCSS to match the existing
  files.
- Trailing commas in multi-line literals.
- ESLint enforces the rest. Run `npm run lint`.

## Adding a new section to the home page

1. Create `components/<section>/<Name>/index.tsx` and
   `<name>.module.scss`.
2. Add translations under a new namespace in both `messages/*.json`.
3. Render the section in `app/[locale]/page.tsx` inside a `<div
   id="...">` so the navbar can anchor-link to it.
4. Add the anchor to the `SECTIONS` array in
   `components/layout/Navbar/index.tsx`.
5. Add the navbar string to the `navbar` namespace in both message
   files.
6. Append a row to `docs/architecture/overview.md`'s `## Change Log`
   reflecting the new section, and add a bullet under
   `## [Unreleased]` in the **root** `CHANGELOG.md`.

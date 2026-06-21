# Changelog

All notable **product** changes to the BitByBit landing site live here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [SemVer](https://semver.org/spec/v2.0.0.html).

> **Note** — per-document edits live inside each doc's own `## Change Log`
> section (see `docs/_template.md`). This file is for product releases
> only.

## [Unreleased]

### Added

- **BitByBit Run** featured as a fourth BitByBit project — a free,
  web-based multiplayer runner racing game with Nostr login and Lightning
  rewards for the winner (`https://run.bitbybit.com.ar`, repo
  `bitbybit-ar/bitbybit-run`). Added to the "What we're building" cards
  (new blue `info` accent and `variant-info` Button), the footer nav, the
  `Support` contribute-to-a-repo row, and the homepage `ItemList` JSON-LD
  (`GameApplication`). The projects grid now lays out four cards in a
  balanced 2×2 on desktop and tablet, stacked on mobile.
- Motion layer built on `framer-motion`, device-adaptive and honoring
  reduced-motion globally via `<MotionConfig reducedMotion="user">`:
  scroll-triggered section/stagger entrances (`whileInView`) shared from
  `lib/motion/variants.ts`; a hero "spotlight" (staggered headline/subline/
  CTA on mount plus a desktop-pointer-only scroll parallax on the
  BlockTower, gated by the new `useMediaQuery` hook); and `whileHover`/
  `whileTap` micro-interactions on project cards and the hero/Support CTAs.
- **CURSATS** featured as a third BitByBit project — a Lightning checkout
  for teachers and educational creators (`https://cursats.bitbybit.com.ar`,
  repo `bitbybit-ar/bitbybit-cursa`). Added to the "What we're building"
  cards (green `success` accent), the footer nav, the `Support`
  contribute-to-a-repo row, and the homepage `ItemList` JSON-LD. The
  projects grid now lays out three cards (three across on desktop, two on
  tablet, stacked on mobile).
- NIP-05 verification at `bitbybit.com.ar/.well-known/nostr.json` for
  four team identities (`anix`, `wnder`, `fabri`, `fred`), each with a
  shared relay list. Served as a static file under `public/`; a new
  `/.well-known/nostr.json` entry in `next.config.ts` adds the
  `Access-Control-Allow-Origin: *` header browser-based Nostr clients
  need to perform the cross-origin verification fetch.
- Two new friends in the `Friends` section: **Obelisk**
  (`https://obelisk.ar/`) — Discord alternative with Nostr login — and
  **LaWallet** (`https://lawallet.ar/`) — Bitcoin and Lightning wallet
  on Nostr. Obelisk's logo is vendored at
  `public/images/friends/obelisk.png`; LaWallet uses the GitHub-avatar
  pattern (`https://github.com/lawalletio.png?size=256`) like La Crypta.
- **Wapu** (`https://wapu.com.ar`) added to the `Friends` section —
  Lightning settlement to CBU/CVU/alias in Argentina. Mirrors the CURSATS
  landing, which lists Wapu first among its travel companions; logo via
  the GitHub-avatar pattern.
- `Partners` carousel section (`components/landing/Partners`) — auto-
  scrolling marquee of partner logos with hover/focus pause and
  reduced-motion fallback. Initial partners: La Crypta, Nostr WoT.
- `Support` section above the footer (`components/landing/Support`) —
  Lightning zap CTA via `lightning:` URI and Star-on-GitHub CTA. Reads
  `NEXT_PUBLIC_LIGHTNING_ADDRESS` env var.
- Documentation standard codified in `CLAUDE.md` and `docs/_template.md`:
  every doc now carries its own header (Status, Last updated) and inline
  `## Change Log`.
- Gray + yellow palette: gray scale (slate) and yellow scale (anchored
  at arena's `#f7a825`) in `styles/_theme.scss`, semantic role tokens
  (`--color-primary`, `--color-secondary`, `--focus-ring`), and a new
  `<Button variant="accent">` for CTAs. Arena's decorative tokens
  preserved. Rationale in ADR `0002-palette.md`.
- Arena UI primitives copied verbatim: `components/ui/{button,card,
  container,section,toast}` plus the `ToastProvider` wrapper.
- `lib/contexts/theme-context.tsx` (next-themes wrapper, mirrors arena)
  and `lib/hooks/useScrollVisibility.ts` (used by Navbar).
- Navbar scroll-progress bar (gradient sweeps `primary → secondary →
  accent-alt` across the bottom edge as the document scrolls).

### Changed

- BlockTower assembly reworked to framer-motion. All blocks now mount at
  once so the tower reserves its full height on the first frame and no
  longer drifts as it builds (the old `setInterval` insert grew the stack
  mid-build, and `align-items: center` re-centered it each step — the
  wobble that looked broken). Blocks fall and settle on a spring (natural
  landing weight) via a stagger, replacing the CSS `block-drop`/`block-pulse`
  keyframes; the resting glow breathes via framer and is gated to in-view +
  motion-allowed, so nothing composites once the hero scrolls past. `Block`
  lost its now-unused `animation`/`delay` props.
- Hero headline now animates noun by noun. Each unit (Habits / Community /
  Open software) is its own `<word>` rich-text tag rendered as a staggered
  `motion.span`, so the words rise on their own beat instead of the whole
  line fading as one block. The accent noun also gets CURSATS' flowing
  gradient (animated `background-position` over an oversized gradient),
  reduced-motion guarded.
- Home-page section order is now Story → Projects → Friends → Support
  (the `Partners` section was renamed to `Friends` and the standalone
  `Open Source` section was merged into `Support`).
- `Friends` section uses a polaroid-on-corkboard layout: pre-rotated
  cards on desktop with hover-to-straighten, CSS-only `scroll-snap`
  horizontal carousel on mobile (no JS). Mapping Bitcoin
  (mappingbitcoin.com) added as the third friend.
- Support section is now two-tier: org-level CTAs (Zap + Star) plus a
  wrapping row of per-project repo links driven by a `PROJECT_REPOS`
  array. Adding a new project is one entry, no layout change.
- Footer redesigned: top row brand + project links (BitByBit Habits,
  BitByBit Arena, no external-link icons); bottom row GitHub link on
  the left, copyright on the right (`© {year} BitByBit Ar. All rights
  reserved.`). Removed the duplicated navbar links and the standalone
  "Visit Habits / Visit Arena" band.
- Navbar `SECTIONS` updated to match the new four-section layout.
- Project release log moved from `docs/CHANGELOG.md` to repo root
  `CHANGELOG.md`. Per-doc deltas are no longer tracked here.
- `SECURITY.md` and `CODE_OF_CONDUCT.md` folded into `CONTRIBUTING.md`
  (now at the repo root) under "Reporting a vulnerability" and "Code of
  conduct" sections.

### Fixed

- Projects grid no longer strands the third card bottom-left at tablet
  widths (768–1023px): an odd last card now spans both columns and
  centers, guarded by `:nth-child(odd)` so a future even count stays a
  balanced 2×2.
- Responsive polish from a full-page audit: Support CTAs ease their
  220px min-width at tablet so the pair isn't crowded; the Support repo
  chips get a 44px-tall tap target; and the shared `section-padding`
  mixin now uses the `mobile` breakpoint mixin (767px) instead of a
  one-off 768px media query.
- Mobile footer no longer stacks the brand on top of the link list.
  Brand sits on the left, the Habits / Arena / GitHub links form a
  column on the right.
- Mobile `Friends` carousel now lands on the first polaroid (La Crypta)
  on initial render and lets users swipe back to it. The leading
  `padding-inline` made the first item's center-snap target unreachable,
  so `mandatory` snap was skipping it to the second card. First/last
  items now snap to start/end while middle items keep center-snap.

### Removed

- `useScrollReveal` hook and the `.scroll-reveal*` CSS classes in
  `globals.scss` (superseded by the framer-motion `whileInView`
  entrances).
- `Team` and `LaCrypta` sections from the home page (replaced by the
  Partners carousel).
- `OpenSource` section component (merged into the unified `Support`
  section).
- `docs/CHANGELOG.md` (moved to repo root).
- `docs/SECURITY.md` and `docs/CODE_OF_CONDUCT.md` (merged into
  root `CONTRIBUTING.md`).

## [0.1.0] - 2026-04-30

### Added

- Initial scaffold: Next.js 16 App Router, next-intl (es/en, es default),
  next-themes for light/dark mode, SCSS modules + design-token theme.
- Home page composed of five about sections: Story, Projects, Team,
  La Crypta, Open Source — sourced from the BitByBit Arena about page.
- SEO surface: per-locale `generateMetadata`, `Organization` and `WebSite`
  JSON-LD in the layout, `ItemList` of projects on the home, dynamic OG
  image, sitemap, robots, web app manifest, `hreflang` alternates.
- Security headers: HSTS, X-Frame-Options, Referrer-Policy,
  Permissions-Policy, baseline CSP.
- Internal `docs/` template with ROADMAP, ADRs, runbooks, guides —
  designed to be copied across BitByBit projects.

[Unreleased]: https://github.com/bitbybit-ar/home/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/bitbybit-ar/home/releases/tag/v0.1.0

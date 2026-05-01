# 0002. Adopt a gray + yellow palette with arena-derived decoration

- **Date**: 2026-05-01
- **Status**: Accepted
- **Deciders**: BitByBit team
- **Last updated**: 2026-05-01

---

## Change Log

| Date | Section | Change | Reason |
|---|---|---|---|
| 2026-05-01 | — | Initial version. | Document why the home landing diverges from arena's playful palette while keeping its visual primitives. |

---

## Context

The home landing reuses arena's component library — the ceramic surface
mixin, the Block / Bubble decorations, the multi-hue logo, the SCSS
token plumbing. Arena's color identity is intentionally playful: a
saturated purple `#8b5cf6` as the brand primary, gold `#f7a825` as
secondary, red and green as accents. That register fits arena ("public
challenges, badges, zaps") but reads as too playful for the BitByBit
group landing, which needs to introduce the collective and rank well on
search.

We considered three directions:

1. **Slate + Bitcoin orange** — fully restate the brand around bitcoin
   colors. Rejected: drops continuity with arena/habits and forces a
   logo redesign.
2. **Indigo + sand** — desaturated arena. Rejected: too close to arena;
   the tone shift is small.
3. **Gray primary + yellow accent, decoration unchanged** — accepted.
   Most direct path to a "serious" register without breaking the
   visual identity already established across the project family.

## Decision

Adopt a layered palette in `styles/_theme.scss`:

- **Backgrounds, text, ceramic, bubble, and semantic feedback tokens**
  (`success` / `warning` / `error` / `info` / `nostr`) are kept
  identical to arena. Components copied across projects render the
  same.
- **Decorative accents** — purple (logo block), gold, green, red — stay
  in their existing tokens (`color-accent`, `color-accent-alt`, plus
  the static color values consumed by `Block`, `Bubble`, and the
  gradient motto in the footer).
- **Two new design-token scales** are introduced:
  - `gray-50 … gray-900` — slate, cool undertone, same hex both themes.
  - `secondary-50 … secondary-900` — yellow, anchored at arena's gold
    `#f7a825 = secondary-500`, same hex both themes.
- **Semantic role tokens** are theme-aware and route through the scales:
  - `--color-primary` (chrome / text role): `gray-800` light /
    `gray-200` dark — drives default UI surfaces, body links, focus
    states. ~12.6:1 contrast on white, ~14:1 on navy.
  - `--color-primary-hover`: `gray-900` light / `gray-100` dark.
  - `--color-secondary` (CTA surface role): `secondary-500` (`#f7a825`)
    in both themes — consumed by the `ceramic-surface` mixin for the
    yellow CTA button. Button label is dark for AA on yellow.
  - `--color-secondary-hover`: `secondary-600` light / `secondary-400`
    dark.
  - `--focus-ring` (new): `gray-700` light / `gray-300` dark — visible
    gray, decoupled from `--color-primary` so the focus ring stays
    correct if a primary role ever rebinds.
- **Card hover shadows** are neutralized (gray alpha instead of arena's
  purple alpha) so hover glow no longer pushes a brand color the home
  no longer uses.

A new Button variant `accent` (yellow ceramic surface, dark label) is
introduced for the CTA register. The existing `secondary` variant is
preserved for backward parity with arena components but consumers
should prefer `accent` to declare CTA intent.

## Consequences

### Positive

- The page chrome (text, links, default buttons, focus rings) reads as
  serious neutral gray. The colorful brand identity (purple/gold/
  green/red) survives in decoration only — logo, blocks, bubbles,
  gradient motto.
- Single-file palette tuning: the entire scheme lives in
  `_theme.scss`. Components reference role tokens (`$color-primary`,
  `$focus-ring`, etc.) and never hardcode brand hex.
- Arena components copied into home (Button, Card, ToastProvider, …)
  work without modification — the ceramic mixin paints over whatever
  saturated color a role token resolves to.
- The two new scales (gray, yellow) give downstream components proper
  hover/disabled/badge states without one-off magic numbers.

### Negative

- The `secondary` button variant and the new `accent` variant are
  visually identical today. Consumers must distinguish by intent, not
  by what they see — slight cognitive overhead documented in the
  Button component file.
- The gray scale (10 steps × 2 themes via reuse) plus the yellow scale
  add ~20 token rows to `_theme.scss`. The file is still
  single-purpose and readable; the cost is small.
- Diverging from arena's `--color-primary = purple` means future
  copy-paste from arena into home (or vice versa) needs a quick
  visual review for places that assumed the primary token was a
  vibrant brand color. In practice this is rare because arena's
  components consume `$color-primary` for chrome, not for hero
  surfaces.

### Neutral

- Semantic feedback colors (`success`, `warning`, `error`, `info`,
  `nostr`) intentionally point at the same hexes as before, even
  though `warning` (`#f7a825`) and `secondary-500` resolve to the
  same color today. They remain independent vocabularies — a future
  brand-yellow tweak should not shift toast/banner colors.
- Habit projects can adopt this same pattern when they migrate;
  the layered structure is intended to be portable.

## Alternatives considered

- **Single brand color (slate + bitcoin orange) without arena
  decoration**: rejected because the multi-hue logo and Block /
  Bubble palette are already part of the BitByBit visual identity
  shared across sister projects. Dropping the rainbow there would
  force a coordinated redesign across three repos.
- **Yellow as primary directly**: rejected because `#f7a825` against
  `#ffffff` is ~2.7:1 — fails WCAG AA for text. Promoting yellow to
  primary would require always sourcing text-mode primary from a
  darker step (`secondary-700`), which complicates every consumer.
- **Tailwind-style 100–500 scale only**: rejected in favor of the full
  50–900 scale. Same number of tokens as the original proposal once
  you account for the practical hover/disabled tints we ended up
  needing.

## References

- `styles/_theme.scss` — the palette definition.
- `styles/_colors.scss` — SCSS aliases.
- `components/ui/button/button.module.scss` — `variant-accent` block.
- ADR [0001](0001-record-architecture-decisions.md) — the ADR practice
  this record follows.
